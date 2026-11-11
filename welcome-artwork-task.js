import { createHash } from 'node:crypto';
import { constants } from 'node:fs';
import { lstat, open, realpath } from 'node:fs/promises';
import { join, parse, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const WELCOME_TASK_ID = 'welcome-home-20261110-01';
export const WELCOME_PROMPT = 'Premium editorial studio still life for the welcome area of a professional brand design application. A sculptural, tactile arrangement of blank ivory print cards and folded paper planes, one translucent cobalt-blue acrylic slab and one warm orange material swatch, precise layered composition and beautiful restrained studio lighting, soft grounded shadows, subtle physical texture, cool pearl-neutral background. Objects concentrated in the right two-thirds, generous clean breathing space on the left and around all edges, wide horizontal composition, sophisticated macOS creative-tool sensibility, realistic materials not a UI mockup. No letters, no text, no typography, no logos, no screens, no people, no client brands, no charts, no symbols, no watermark. Decorative editorial illustration, not a real customer project.';
const digest = value => createHash('sha256').update(value).digest('hex');
export const WELCOME_PROMPT_SHA256 = digest(WELCOME_PROMPT);
export const WELCOME_ASSET_DIRECTORY = fileURLToPath(new URL('./assets/welcome/', import.meta.url));
// Controls live in package-local output, excluded from published package files.
export const WELCOME_CONTROL_DIRECTORY = fileURLToPath(new URL('./output/welcome-task/', import.meta.url));
const ASSET_ROOT = resolve(WELCOME_ASSET_DIRECTORY);
const CONTROL_ROOT = resolve(WELCOME_CONTROL_DIRECTORY);
const ENDPOINT = 'https://api.openai.com/v1/images/generations';
const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const MAX_RESPONSE_BYTES = 13 * 1024 * 1024;
const MAX_APPROVAL_BYTES = 4096;
const TIMEOUT_MS = 240000;
const OUTPUT_ROOTS = Object.freeze({ 'attempt.json': CONTROL_ROOT, 'status.json': CONTROL_ROOT, 'manifest.json': ASSET_ROOT, 'hero.png': ASSET_ROOT });
const LABEL = 'AI-generated editorial illustration';
const failure = code => Object.assign(new Error('Welcome artwork task could not complete.'), { taskCode: code });
const ensure = (condition, code) => { if (!condition) throw failure(code); };
const cancelled = signal => ensure(!signal?.aborted, 'aborted');

// This is a fixed, host-only, one-shot task, not a general image/file-write API.
// No directories are created: the parent must create both fixed directories and
// the control approval file after review. Imports and unapproved activation do
// not resolve credentials, contact a provider, or write anything.
async function assertRoot(root) {
  ensure(root === ASSET_ROOT || root === CONTROL_ROOT, 'unsafe-path');
  let current = parse(root).root;
  for (const segment of root.slice(current.length).split('/').filter(Boolean)) {
    current = join(current, segment);
    const info = await lstat(current);
    ensure(info.isDirectory() && !info.isSymbolicLink(), 'unsafe-path');
  }
  ensure(await realpath(root) === root, 'unsafe-path');
}
function outputRoot(name) {
  ensure(Object.hasOwn(OUTPUT_ROOTS, name), 'unsafe-path');
  return OUTPUT_ROOTS[name];
}
async function exists(name) {
  const root = outputRoot(name);
  await assertRoot(root);
  try { await lstat(join(root, name)); return true; }
  catch (error) { if (error.code === 'ENOENT') return false; throw error; }
}
async function readApproval() {
  await assertRoot(CONTROL_ROOT);
  const handle = await open(join(CONTROL_ROOT, 'approved.json'), constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK);
  try {
    const info = await handle.stat();
    ensure(info.isFile() && info.size <= MAX_APPROVAL_BYTES, 'invalid-approval');
    const bytes = Buffer.alloc(MAX_APPROVAL_BYTES + 1);
    const { bytesRead } = await handle.read(bytes, 0, bytes.length, 0);
    ensure(bytesRead <= MAX_APPROVAL_BYTES, 'invalid-approval');
    let approval;
    try { approval = JSON.parse(bytes.subarray(0, bytesRead).toString('utf8')); }
    catch { throw failure('invalid-approval'); }
    ensure(approval?.approved === true && approval.id === WELCOME_TASK_ID && approval.promptSha256 === WELCOME_PROMPT_SHA256, 'invalid-approval');
  } finally { await handle.close(); }
}
async function syncDirectory(root) {
  await assertRoot(root);
  const handle = await open(root, constants.O_RDONLY | constants.O_DIRECTORY | constants.O_NOFOLLOW);
  try { await handle.sync(); } finally { await handle.close(); }
}
async function createExclusive(name, value, onCreate = () => {}) {
  const root = outputRoot(name);
  await assertRoot(root);
  const handle = await open(join(root, name), constants.O_WRONLY | constants.O_CREAT | constants.O_EXCL | constants.O_NOFOLLOW, root === ASSET_ROOT ? 0o644 : 0o600);
  onCreate();
  try { await handle.writeFile(value); await handle.sync(); }
  finally { await handle.close(); }
  await syncDirectory(root);
}
const json = value => `${JSON.stringify(value, null, 2)}\n`;

// A cooperative deadline races both transport and streaming, not just headers.
function abortable(work, signal) {
  return new Promise((accept, reject) => {
    const stop = () => { signal.removeEventListener('abort', stop); reject(failure('aborted')); };
    signal.addEventListener('abort', stop, { once: true });
    // Always observe work, even if cancellation raced its synchronous creation.
    Promise.resolve(work).then(
      value => { signal.removeEventListener('abort', stop); accept(value); },
      error => { signal.removeEventListener('abort', stop); reject(error); },
    );
    if (signal.aborted) stop();
  });
}
const CRC_TABLE = Uint32Array.from({ length: 256 }, (_, n) => {
  for (let i = 0; i < 8; i++) n = n & 1 ? 0xedb88320 ^ (n >>> 1) : n >>> 1;
  return n >>> 0;
});
function crc32(bytes) {
  let value = 0xffffffff;
  for (const byte of bytes) value = CRC_TABLE[(value ^ byte) & 255] ^ (value >>> 8);
  return (value ^ 0xffffffff) >>> 0;
}
function inspectPng(encoded) {
  ensure(typeof encoded === 'string' && encoded.length > 0 && encoded.length <= Math.ceil(MAX_IMAGE_BYTES / 3) * 4 && encoded.length % 4 === 0 && /^[A-Za-z0-9+/]+={0,2}$/.test(encoded), 'invalid-image');
  const bytes = Buffer.from(encoded, 'base64');
  ensure(bytes.length <= MAX_IMAGE_BYTES && bytes.toString('base64') === encoded && bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])), 'invalid-image');
  let at = 8, width, height, data = false, ended = false;
  while (at < bytes.length) {
    ensure(at + 12 <= bytes.length, 'invalid-image');
    const length = bytes.readUInt32BE(at), end = at + 12 + length;
    ensure(end <= bytes.length && crc32(bytes.subarray(at + 4, end - 4)) === bytes.readUInt32BE(end - 4), 'invalid-image');
    const type = bytes.toString('ascii', at + 4, at + 8);
    if (at === 8) {
      ensure(type === 'IHDR' && length === 13, 'invalid-image');
      width = bytes.readUInt32BE(at + 8); height = bytes.readUInt32BE(at + 12);
      ensure(width > 0 && height > 0 && width <= 4096 && height <= 4096 && width * height <= 16 * 1024 * 1024, 'invalid-image');
    } else ensure(type !== 'IHDR', 'invalid-image');
    if (type === 'IDAT') data = true;
    if (type === 'IEND') { ensure(length === 0 && end === bytes.length, 'invalid-image'); ended = true; }
    at = end;
  }
  ensure(data && ended, 'invalid-image');
  return { bytes, width, height };
}

/**
 * Called once per explicit plugin activation. Approval is a local auditable gate,
 * not a cryptographic consent boundary. A claimed attempt is NEVER re-used,
 * removed, recovered or retried, even if no request reached the provider.
 * Only model is taken from settings; the prompt, endpoint, path and all other
 * request parameters are fixed. fetcher is an offline-test transport seam.
 */
export async function runWelcomeArtworkTask({ model, resolveKey, signal, fetcher = globalThis.fetch }) {
  let claimed = false, submitted = false, providerHttpStatus, reader, body, timer, key;
  const abort = new AbortController();
  const stop = () => abort.abort();
  signal?.addEventListener('abort', stop, { once: true });
  if (signal?.aborted) stop();
  const startedAt = new Date().toISOString();
  const parameters = Object.freeze({ model, n: 1, size: '1536x1024', quality: 'medium', output_format: 'png', stream: false });
  const requestBody = JSON.stringify({ ...parameters, prompt: WELCOME_PROMPT });
  const provenance = {
    id: WELCOME_TASK_ID, prompt: WELCOME_PROMPT, promptSha256: WELCOME_PROMPT_SHA256,
    parameters, parametersSha256: digest(JSON.stringify(parameters)), requestSha256: digest(requestBody),
    provider: 'OpenAI', endpoint: ENDPOINT, label: LABEL, purpose: 'company-agnostic welcome illustration',
    approvedBy: 'explicit user selection; matching local approved.json', startedAt,
    maxAttempts: 1, retryPolicy: 'never',
  };
  async function finish(status, code, extra = {}) {
    const result = { id: WELCOME_TASK_ID, status, code, submitted, mayHaveBeenCharged: submitted, ...extra, finishedAt: new Date().toISOString() };
    if (providerHttpStatus !== undefined) result.providerHttpStatus = providerHttpStatus;
    if (claimed) {
      try { await createExclusive('status.json', json(result)); }
      catch { return { id: WELCOME_TASK_ID, status: 'unknown', code: 'status-save-failed', submitted, mayHaveBeenCharged: submitted }; }
    }
    return result;
  }
  try {
    cancelled(abort.signal);
    // Fail closed on missing/invalid approval or any symlink, with no writes.
    try { await readApproval(); }
    catch (error) {
      return { id: WELCOME_TASK_ID, status: 'inactive', code: error.code === 'ENOENT' ? 'approval-missing' : 'approval-invalid-or-unsafe' };
    }
    cancelled(abort.signal);
    if (await exists('attempt.json')) return { id: WELCOME_TASK_ID, status: 'skipped', code: 'attempt-already-claimed' };
    await assertRoot(ASSET_ROOT);
    ensure(typeof model === 'string' && /^gpt-image-[A-Za-z0-9._-]{1,64}$/.test(model), 'invalid-model');
    for (const name of ['status.json', 'manifest.json', 'hero.png']) ensure(!await exists(name), 'output-already-exists');
    // O_EXCL arbitrates concurrent activations; fsync(file)+fsync(directory)
    // complete BEFORE resolveKey or fetch. A partial claim still blocks replay.
    try { await createExclusive('attempt.json', json({ ...provenance, status: 'claimed' }), () => { claimed = true; }); }
    catch (error) { if (error.code === 'EEXIST' && !claimed) return { id: WELCOME_TASK_ID, status: 'skipped', code: 'attempt-already-claimed' }; throw error; }
    await createExclusive('manifest.json', json(provenance));
    cancelled(abort.signal);
    timer = setTimeout(stop, TIMEOUT_MS);
    key = await abortable(resolveKey(), abort.signal);
    ensure(typeof key?.value === 'string' && key.value.length > 0, 'credential-unavailable');
    cancelled(abort.signal);
    // Mark potential billing before dispatch. All later errors remain spent.
    submitted = true;
    const response = await abortable(fetcher(ENDPOINT, {
      method: 'POST', redirect: 'error', signal: abort.signal,
      headers: { 'content-type': 'application/json', authorization: `Bearer ${key.value}` },
      body: requestBody,
    }), abort.signal);
    key = undefined;
    body = response.body;
    providerHttpStatus = response.status;
    ensure(response.ok && !response.redirected && response.status < 300, 'provider-rejected');
    const length = Number(response.headers.get('content-length') || 0);
    ensure(Number.isFinite(length) && length >= 0 && length <= MAX_RESPONSE_BYTES, 'response-too-large');
    reader = body?.getReader(); ensure(reader, 'invalid-response');
    let size = 0; const chunks = [];
    while (true) {
      const part = await abortable(reader.read(), abort.signal);
      if (part.done) break;
      size += part.value.length;
      ensure(size <= MAX_RESPONSE_BYTES, 'response-too-large');
      chunks.push(part.value);
    }
    let result;
    try { result = JSON.parse(Buffer.concat(chunks).toString('utf8')); }
    catch { throw failure('invalid-response'); }
    ensure(Array.isArray(result.data) && result.data.length === 1, 'invalid-response');
    const image = inspectPng(result.data[0]?.b64_json);
    cancelled(abort.signal);
    await createExclusive('hero.png', image.bytes);
    return await finish('succeeded', 'image-saved', {
      asset: 'hero.png', mime: 'image/png', bytes: image.bytes.length, sha256: digest(image.bytes),
      width: image.width, height: image.height, label: LABEL,
    });
  } catch (error) {
    // Whitelist task-owned codes; raw SDK/transport/provider/filesystem errors,
    // headers, bodies and credentials never enter status files or logs.
    const safeCodes = ['aborted', 'invalid-model', 'unsafe-path', 'output-already-exists', 'invalid-image', 'invalid-response', 'response-too-large', 'provider-rejected', 'credential-unavailable'];
    const code = safeCodes.includes(error?.taskCode) ? error.taskCode : submitted ? 'request-or-save-failed' : 'local-preflight-failed';
    return await finish(submitted ? 'unknown' : 'failed', code);
  } finally {
    clearTimeout(timer); signal?.removeEventListener('abort', stop); key = undefined;
    // Do not await a non-cooperative stream's cancellation during plugin cleanup.
    try { const pending = reader ? reader.cancel() : body?.cancel(); pending?.catch(() => {}); } catch {}
    try { reader?.releaseLock(); } catch {}
    abort.abort();
  }
}
