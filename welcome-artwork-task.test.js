import test, { after, mock } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { copyFile, mkdir, mkdtemp, readFile, readdir, realpath, rm, symlink, writeFile } from 'node:fs/promises';
import { basename, dirname, join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';
import { deflateSync } from 'node:zlib';

// Every task runs a copied module in an isolated temporary workspace/package.
// Never touch the real output/welcome-task controls, assets, keys, or provider.
mock.method(globalThis, 'fetch', async () => { throw new Error('Real network is forbidden in these tests'); });
after(() => mock.restoreAll());
const hash = value => createHash('sha256').update(value).digest('hex');
const MODEL = 'gpt-image-2.6-flare';
const FAKE_KEY = 'sk-fixture-not-a-real-secret';
const SECRET_ERROR = `Sensitive upstream data ${FAKE_KEY}`;
const TEMP = await realpath(tmpdir());
const json = value => JSON.stringify(value);
const loadJSON = async path => JSON.parse(await readFile(path, 'utf8'));

function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let i = 0; i < 8; i++) crc = crc & 1 ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1;
  }
  return (crc ^ 0xffffffff) >>> 0;
}
function chunk(type, value) {
  const bytes = Buffer.alloc(value.length + 12);
  bytes.writeUInt32BE(value.length); bytes.write(type, 4); value.copy(bytes, 8);
  bytes.writeUInt32BE(crc32(bytes.subarray(4, bytes.length - 4)), bytes.length - 4);
  return bytes;
}
function png() {
  const header = Buffer.alloc(13); header.writeUInt32BE(1, 0); header.writeUInt32BE(1, 4); header[8] = 8; header[9] = 6;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', header), chunk('IDAT', deflateSync(Buffer.from([0, 0, 0, 0, 255]))), chunk('IEND', Buffer.alloc(0))]);
}
const PNG = png();
const result = bytes => new Response(json({ data: [{ b64_json: bytes.toString('base64') }] }));

async function fixture(t, { directory = true } = {}) {
  const root = await realpath(await mkdtemp(join(TEMP, 'welcome-artwork-test-')));
  // Guard the exact deletion target; never delete a computed/unverified path.
  t.after(async () => {
    assert.equal(dirname(root), TEMP); assert.match(basename(root), /^welcome-artwork-test-/);
    await rm(root, { recursive: true, force: true });
  });
  const moduleFile = join(root, 'task.mjs');
  await copyFile(new URL('./welcome-artwork-task.js', import.meta.url), moduleFile);
  const api = await import(pathToFileURL(moduleFile).href);
  const dir = join(root, 'assets', 'welcome');
  const control = join(root, 'output', 'welcome-task');
  if (directory) { await mkdir(dir, { recursive: true }); await mkdir(control, { recursive: true }); }
  const calls = [], resolutions = [];
  const options = {
    model: MODEL,
    resolveKey: async () => { resolutions.push(true); return { value: FAKE_KEY, ref: 'BRAND_STUDIO_OPENAI_API_KEY' }; },
    fetcher: async (...args) => { calls.push(args); return result(PNG); },
  };
  const approval = { id: api.WELCOME_TASK_ID, approved: true, promptSha256: api.WELCOME_PROMPT_SHA256 };
  return {
    api, dir, control, root, moduleFile, calls, resolutions, options, approval,
    approve: async (value = approval) => writeFile(join(control, 'approved.json'), json(value)),
    run: (overrides = {}) => api.runWelcomeArtworkTask({ ...options, ...overrides }),
    names: async () => [...await readdir(control), ...await readdir(dir)],
    persisted: async () => {
      const contents = [];
      for (const folder of [control, dir]) for (const name of await readdir(folder)) {
        if (name.endsWith('.json')) contents.push(await readFile(join(folder, name), 'utf8'));
      }
      return contents.join('\n');
    },
  };
}

async function assertSpent(f) {
  const before = await f.persisted();
  assert.equal((await f.run()).code, 'attempt-already-claimed');
  assert.equal(await f.persisted(), before, 'a spent attempt never rewrites status or provenance');
}

test('absent approval and absent directory are inert: no writes, credentials, or network', async t => {
  for (const directory of [false, true]) {
    const f = await fixture(t, { directory });
    const outcome = await f.run();
    assert.equal(outcome.code, 'approval-missing');
    assert.equal(f.calls.length, 0); assert.equal(f.resolutions.length, 0);
    if (directory) assert.deepEqual(await f.names(), []);
    else { await assert.rejects(readdir(f.dir), { code: 'ENOENT' }); await assert.rejects(readdir(f.control), { code: 'ENOENT' }); }
  }
});

test('approval requires exact task id, prompt hash, strict true, bounded JSON, and regular non-symlink file', async t => {
  const variants = [a => ({ ...a, id: 'different-task' }), a => ({ ...a, promptSha256: '0'.repeat(64) }), a => ({ ...a, approved: 'true' }), a => ({ ...a, approved: false }), () => null];
  for (const variant of variants) {
    const f = await fixture(t); await f.approve(variant(f.approval));
    assert.equal((await f.run()).code, 'approval-invalid-or-unsafe');
    assert.deepEqual(await f.names(), ['approved.json']); assert.equal(f.resolutions.length, 0); assert.equal(f.calls.length, 0);
  }
  for (const text of ['{broken', ' '.repeat(4097)]) {
    const f = await fixture(t); await writeFile(join(f.control, 'approved.json'), text);
    assert.equal((await f.run()).code, 'approval-invalid-or-unsafe'); assert.equal(f.resolutions.length, 0);
  }
  const f = await fixture(t); const target = join(f.root, 'external-approval.json');
  await writeFile(target, json(f.approval)); await symlink(target, join(f.control, 'approved.json'));
  assert.equal((await f.run()).code, 'approval-invalid-or-unsafe'); assert.equal(f.calls.length, 0);
});

test('successful request freezes configured model and fixed parameters before credential resolution; saves original PNG and safe provenance', async t => {
  const f = await fixture(t); await f.approve();
  assert.equal(f.api.WELCOME_PROMPT_SHA256, hash(f.api.WELCOME_PROMPT));
  const outcome = await f.run({
    resolveKey: async () => {
      const claim = await loadJSON(join(f.control, 'attempt.json'));
      const manifest = await loadJSON(join(f.dir, 'manifest.json'));
      assert.equal(claim.status, 'claimed'); assert.equal(claim.parameters.model, MODEL);
      assert.equal(manifest.prompt, f.api.WELCOME_PROMPT);
      return { value: FAKE_KEY, ref: 'BRAND_STUDIO_OPENAI_API_KEY' };
    },
    fetcher: async (url, init) => {
      f.calls.push([url, init]);
      assert.equal(url, 'https://api.openai.com/v1/images/generations'); assert.equal(init.method, 'POST');
      assert.equal(init.redirect, 'error'); assert.equal(init.headers.authorization, `Bearer ${FAKE_KEY}`);
      const request = JSON.parse(init.body);
      assert.deepEqual(request, { model: MODEL, n: 1, size: '1536x1024', quality: 'medium', output_format: 'png', stream: false, prompt: f.api.WELCOME_PROMPT });
      const claim = await loadJSON(join(f.control, 'attempt.json'));
      assert.equal(claim.parametersSha256, hash(json(claim.parameters))); assert.equal(claim.requestSha256, hash(init.body));
      return result(PNG);
    },
  });
  assert.equal(outcome.status, 'succeeded'); assert.equal(f.calls.length, 1); assert.equal(outcome.sha256, hash(PNG));
  assert.equal(outcome.label, 'AI-generated editorial illustration'); assert.equal(outcome.width, 1);
  assert.deepEqual(await readFile(join(f.dir, 'hero.png')), PNG);
  assert.deepEqual(await loadJSON(join(f.control, 'status.json')), outcome);
  assert.equal((await f.persisted()).includes(FAKE_KEY), false); assert.equal((await f.persisted()).includes('b64_json'), false);
  assert.deepEqual((await f.names()).sort(), ['approved.json', 'attempt.json', 'hero.png', 'manifest.json', 'status.json']);
  assert.deepEqual((await readdir(f.dir)).sort(), ['hero.png', 'manifest.json'], 'published assets contain only image/provenance');
  assert.deepEqual((await readdir(f.control)).sort(), ['approved.json', 'attempt.json', 'status.json'], 'approval/claim/status stay in excluded output');
  assert.equal(resolve(f.api.WELCOME_ASSET_DIRECTORY), f.dir); assert.equal(resolve(f.api.WELCOME_CONTROL_DIRECTORY), f.control);
  await assertSpent(f);
  const reloaded = await import(`${pathToFileURL(f.moduleFile).href}?restart=1`);
  assert.equal((await reloaded.runWelcomeArtworkTask({ ...f.options, model: 'gpt-image-changed' })).code, 'attempt-already-claimed');
  assert.equal(f.calls.length, 1);
});

test('partial, corrupt, or symlink attempt marker always prevents replay without reading its contents', async t => {
  for (const content of ['', '{broken', json({ status: 'unknown' })]) {
    const f = await fixture(t); await f.approve(); await writeFile(join(f.control, 'attempt.json'), content);
    await assertSpent(f); assert.equal(f.calls.length, 0); assert.equal(f.resolutions.length, 0);
  }
  const f = await fixture(t); await f.approve(); const external = join(f.root, 'do-not-read');
  await writeFile(external, SECRET_ERROR); await symlink(external, join(f.control, 'attempt.json'));
  assert.equal((await f.run()).code, 'attempt-already-claimed'); assert.equal(f.resolutions.length, 0);
});

test('concurrent activations produce at most one credential lookup and one provider submission', async t => {
  const f = await fixture(t); await f.approve();
  const outcomes = await Promise.all([f.run(), f.run(), f.run()]);
  assert.equal(outcomes.filter(o => o.status === 'succeeded').length, 1);
  assert.equal(f.calls.length, 1); assert.equal(f.resolutions.length, 1); await assertSpent(f);
});

test('pre-existing outputs, including symlinks, block before claiming or resolving credentials', async t => {
  for (const name of ['hero.png', 'manifest.json', 'status.json']) {
    const f = await fixture(t); await f.approve(); const external = join(f.root, 'untouched');
    await writeFile(external, SECRET_ERROR); await symlink(external, join(name === 'status.json' ? f.control : f.dir, name));
    const outcome = await f.run(); assert.equal(outcome.code, 'output-already-exists');
    assert.equal(await readFile(external, 'utf8'), SECRET_ERROR); assert.equal(f.resolutions.length, 0); assert.equal(f.calls.length, 0);
    assert.equal((await f.names()).includes('attempt.json'), false);
  }
});

test('symlinks in either fixed root or its ancestors are rejected without writes or network', async t => {
  for (const segment of ['assets', 'welcome', 'output', 'welcome-task']) {
    const f = await fixture(t, { directory: false }); const external = join(f.root, 'outside');
    await mkdir(external); await writeFile(join(external, 'approved.json'), json(f.approval));
    const isAsset = ['assets', 'welcome'].includes(segment);
    if (isAsset) { await mkdir(f.control, { recursive: true }); await f.approve(); }
    else await mkdir(f.dir, { recursive: true });
    if (segment === 'assets' || segment === 'output') await symlink(external, join(f.root, segment));
    else {
      await mkdir(join(f.root, isAsset ? 'assets' : 'output'));
      await symlink(external, isAsset ? f.dir : f.control);
    }
    assert.equal((await f.run()).code, isAsset ? 'unsafe-path' : 'approval-invalid-or-unsafe');
    assert.deepEqual(await readdir(external), ['approved.json']); assert.equal(f.calls.length, 0); assert.equal(f.resolutions.length, 0);
  }
});

test('approval accidentally shipped in assets is ignored; only excluded output controls can authorize', async t => {
  const f = await fixture(t);
  await writeFile(join(f.dir, 'approved.json'), json(f.approval));
  const outcome = await f.run();
  assert.equal(outcome.code, 'approval-missing'); assert.equal(f.calls.length, 0); assert.equal(f.resolutions.length, 0);
  assert.deepEqual(await readdir(f.control), []); assert.deepEqual(await readdir(f.dir), ['approved.json']);
});

test('missing production asset directory fails before claiming and is never created by helper', async t => {
  const f = await fixture(t, { directory: false });
  await mkdir(f.control, { recursive: true }); await f.approve();
  const outcome = await f.run();
  assert.equal(outcome.status, 'failed'); assert.deepEqual(await readdir(f.control), ['approved.json']);
  await assert.rejects(readdir(f.dir), { code: 'ENOENT' }); assert.equal(f.calls.length, 0); assert.equal(f.resolutions.length, 0);
});

test('existing control claim still skips when production asset directory is absent', async t => {
  const f = await fixture(t, { directory: false });
  await mkdir(f.control, { recursive: true }); await f.approve(); await writeFile(join(f.control, 'attempt.json'), '');
  assert.equal((await f.run()).code, 'attempt-already-claimed');
  await assert.rejects(readdir(f.dir), { code: 'ENOENT' }); assert.equal(f.calls.length, 0); assert.equal(f.resolutions.length, 0);
});

test('invalid configured model does not claim or resolve credentials', async t => {
  const f = await fixture(t); await f.approve();
  const outcome = await f.run({ model: 'https://unapproved-provider.test' });
  assert.equal(outcome.code, 'invalid-model'); assert.deepEqual(await f.names(), ['approved.json']); assert.equal(f.calls.length, 0);
});

test('credential failure consumes approval without a provider request and never persists raw error or key', async t => {
  const f = await fixture(t); await f.approve();
  const outcome = await f.run({ resolveKey: async () => { throw new Error(SECRET_ERROR); } });
  assert.equal(outcome.status, 'failed'); assert.equal(outcome.submitted, false); assert.equal(f.calls.length, 0);
  assert.equal((await f.persisted()).includes(SECRET_ERROR), false); await assertSpent(f);
});

test('HTTP rejection, rate limit, provider failure, redirect, and thrown transport never retry or persist bodies', async t => {
  const transports = [
    ...[401, 429, 500].map(status => async () => new Response(SECRET_ERROR, { status })),
    async () => ({ ok: true, status: 200, redirected: true, body: null }),
    async () => { throw new Error(SECRET_ERROR); },
  ];
  for (const transport of transports) {
    const f = await fixture(t); await f.approve(); let calls = 0;
    const outcome = await f.run({ fetcher: async (...args) => { calls++; return transport(...args); } });
    assert.equal(outcome.status, 'unknown'); assert.equal(outcome.mayHaveBeenCharged, true); assert.equal(calls, 1);
    assert.equal((await f.persisted()).includes(SECRET_ERROR), false); assert.equal((await f.names()).includes('hero.png'), false);
    await assertSpent(f); assert.equal(f.calls.length, 0);
  }
});

test('malformed JSON, URL-only results, multiple results, invalid base64, wrong signature, corrupt/truncated PNG are not saved', async t => {
  const corrupt = Buffer.from(PNG); corrupt[corrupt.length - 1] ^= 1;
  const bodies = [SECRET_ERROR, json({}), json({ data: [{ url: 'https://unapproved.test/image' }] }), json({ data: [{ b64_json: PNG.toString('base64') }, {}] }), json({ data: [{ b64_json: 'bad!!' }] }), json({ data: [{ b64_json: Buffer.from('not png').toString('base64') }] }), json({ data: [{ b64_json: corrupt.toString('base64') }] }), json({ data: [{ b64_json: PNG.subarray(0, 40).toString('base64') }] })];
  for (const body of bodies) {
    const f = await fixture(t); await f.approve();
    const outcome = await f.run({ fetcher: async () => new Response(body) });
    assert.equal(outcome.status, 'unknown'); assert.equal((await f.names()).includes('hero.png'), false);
    assert.equal((await f.persisted()).includes(SECRET_ERROR), false); await assertSpent(f);
  }
});

test('declared and chunked response caps are enforced; oversized PNG never reaches disk', async t => {
  const transports = [
    async () => new Response('{}', { headers: { 'content-length': String(13 * 1024 * 1024 + 1) } }),
    async () => new Response(new ReadableStream({ start(controller) { controller.enqueue(new Uint8Array(13 * 1024 * 1024 + 1)); controller.close(); } })),
    async () => result(Buffer.alloc(8 * 1024 * 1024 + 1)),
  ];
  for (const fetcher of transports) {
    const f = await fixture(t); await f.approve(); const outcome = await f.run({ fetcher });
    assert.equal(outcome.status, 'unknown'); assert.ok(['response-too-large', 'invalid-image'].includes(outcome.code));
    assert.equal((await f.names()).includes('hero.png'), false); await assertSpent(f);
  }
});

test('abort before approval creates no marker; abort during credentials submits nothing', { timeout: 3000 }, async t => {
  const before = await fixture(t); await before.approve(); const stopped = new AbortController(); stopped.abort();
  assert.equal((await before.run({ signal: stopped.signal })).code, 'aborted'); assert.deepEqual(await before.names(), ['approved.json']);
  const f = await fixture(t); await f.approve(); const abort = new AbortController();
  const outcome = await f.run({ signal: abort.signal, resolveKey: () => { queueMicrotask(() => abort.abort()); return new Promise(() => {}); } });
  assert.equal(outcome.status, 'failed'); assert.equal(outcome.code, 'aborted'); assert.equal(f.calls.length, 0); await assertSpent(f);
});

test('abort races a non-cooperative stalled transport and a stalled body, leaving a spent uncertain attempt', { timeout: 3000 }, async t => {
  for (const stallBody of [false, true]) {
    const f = await fixture(t); await f.approve(); const abort = new AbortController(); let reads = 0;
    const outcome = await f.run({ signal: abort.signal, fetcher: async () => {
      if (!stallBody) { queueMicrotask(() => abort.abort()); return new Promise(() => {}); }
      return { ok: true, status: 200, redirected: false, headers: new Headers(), body: {
        getReader: () => ({
          read() { reads++; queueMicrotask(() => abort.abort()); return new Promise(() => {}); },
          cancel: () => new Promise(() => {}), releaseLock() {},
        }),
      } };
    } });
    assert.equal(reads, stallBody ? 1 : 0);
    assert.equal(outcome.status, 'unknown'); assert.equal(outcome.code, 'aborted'); assert.equal(outcome.submitted, true);
    assert.equal((await f.names()).includes('hero.png'), false); await assertSpent(f);
  }
});

test('240-second deadline aborts the only request and never schedules a retry', { timeout: 3000 }, async t => {
  const f = await fixture(t); await f.approve();
  t.mock.timers.enable({ apis: ['setTimeout'] });
  let entered, calls = 0, requestSignal;
  const started = new Promise(accept => { entered = accept; });
  const pending = f.run({ fetcher: (_url, init) => {
    calls++; requestSignal = init.signal; entered(); return new Promise(() => {});
  } });
  await started; assert.equal(requestSignal.aborted, false);
  t.mock.timers.tick(239999); assert.equal(requestSignal.aborted, false);
  t.mock.timers.tick(1);
  const outcome = await pending;
  assert.equal(requestSignal.aborted, true); assert.equal(outcome.code, 'aborted'); assert.equal(outcome.mayHaveBeenCharged, true);
  t.mock.timers.tick(2400000); assert.equal(calls, 1); await assertSpent(f);
});

test('synchronous abort plus transport rejection remains handled and sanitised', { timeout: 3000 }, async t => {
  const f = await fixture(t); await f.approve(); const abort = new AbortController();
  const outcome = await f.run({ signal: abort.signal, fetcher: () => {
    abort.abort(); return Promise.reject(new Error(SECRET_ERROR));
  } });
  assert.equal(outcome.status, 'unknown'); assert.equal((await f.persisted()).includes(FAKE_KEY), false); await assertSpent(f);
});

test('output collision after submission never overwrites or follows a symlink and never retries', async t => {
  const f = await fixture(t); await f.approve(); const external = join(f.root, 'untouched'); await writeFile(external, SECRET_ERROR);
  const outcome = await f.run({ fetcher: async () => { await symlink(external, join(f.dir, 'hero.png')); return result(PNG); } });
  assert.equal(outcome.status, 'unknown'); assert.equal(await readFile(external, 'utf8'), SECRET_ERROR);
  const status = await loadJSON(join(f.control, 'status.json')); assert.equal(status.mayHaveBeenCharged, true);
  assert.equal(json(status).includes(FAKE_KEY), false); await assertSpent(f);
});
