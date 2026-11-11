import test from 'node:test';
import assert from 'node:assert/strict';
import { apply } from './index.js';

// These exercise the real Host apply/Fetch handlers, not a reimplementation.
// Storage, credentials, carrier registration, and OpenAI transport are in-memory mocks.
// Authentication/owner admission belongs to Connection's outer carrier and is NOT
// simulated or claimed as verified here. No real credential or network is accessed.
const PRIMARY = 'BRAND_STUDIO_OPENAI_API_KEY';
const FALLBACK = 'OPENAI_API_KEY';
const FAKE_KEY = 'sk-fixture-not-a-real-api-key';
const PNG = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wl6l0sAAAAASUVORK5CYII=';
const DATA_URL = `data:image/png;base64,${PNG}`;
const copy = value => value === undefined ? undefined : structuredClone(value);

async function harness(t, options = {}) {
  const routes = new Map(), keys = new Map(Object.entries(options.keys ?? {}));
  const tables = options.tables ?? new Map([['state', new Map()], ['assets', new Map()]]);
  const cleanups = [], watchers = new Set(), calls = [], credentialWrites = [];
  let closed = false, opened = false, provider = async () => { throw new Error('Unexpected mocked provider request'); };
  let credentialError;
  const domain = {
    table(name) {
      assert.ok(tables.has(name), 'requested table is declared');
      const rows = tables.get(name);
      return {
        get: key => copy(rows.get(key)),
        entries: () => [...rows].map(([key, value]) => [key, copy(value)])[Symbol.iterator](),
        async delete(key) { rows.delete(key); },
        async put(key, value) {
          assert.equal(closed, false, 'no write after domain close');
          if (options.rejectPut?.(name, key, value)) throw new Error('Synthetic storage write failure');
          rows.set(key, copy(value));
          if (name === 'state') for (const watch of [...watchers]) watch(copy(value));
        },
      };
    },
    async close() { closed = true; opened = false; },
  };
  const ctx = {
    storageDomain: {
      get: () => opened ? domain : undefined,
      async open(spec) {
        assert.equal(spec.name, 'brand_studio'); assert.equal(spec.version, 1);
        // Mirror opening validation of existing records against actual declared Zod schemas.
        for (const [name, rows] of tables) for (const value of rows.values()) spec.tables[name].valueSchema.parse(copy(value));
        opened = true; closed = false; return domain;
      },
    },
    credentials: {
      async describe(ref) { if (credentialError) throw credentialError; return { configured: keys.has(ref), writable: true, ...(keys.has(ref) ? { source: 'fixture-store' } : {}) }; },
      async resolve(ref) { if (credentialError) throw credentialError; return keys.has(ref) ? { value: keys.get(ref), source: 'fixture-store' } : undefined; },
      async set(ref, value) { credentialWrites.push({ op: 'set', ref }); keys.set(ref, value); },
      async unset(ref) { credentialWrites.push({ op: 'unset', ref }); keys.delete(ref); },
    },
    connection: { fetch: { register(route) {
      assert.ok(route.path.startsWith('/api/brand-studio/')); assert.deepEqual(route.methods, ['POST']); assert.equal(route.requestBody, 'buffered');
      assert.equal(routes.has(route.path), false); routes.set(route.path, route);
      return () => routes.delete(route.path);
    } } },
    effect(factory) { const dispose = factory(); assert.equal(typeof dispose, 'function'); cleanups.push(dispose); return dispose; },
  };
  // An unconditional network replacement ensures even unexpected code paths cannot
  // contact the real OpenAI service. Node test-context cleanup restores it afterward.
  t.mock.method(globalThis, 'fetch', async (...args) => { calls.push(args); return provider(...args); });
  await apply(ctx);
  let disposed = false;
  async function dispose() {
    if (disposed) return; disposed = true;
    for (const cleanup of [...cleanups].reverse()) await cleanup();
  }
  t.after(dispose);
  async function invoke(endpoint, payload = {}, init = {}) {
    const route = routes.get(`/api/brand-studio/${endpoint}`); assert.ok(route, `route ${endpoint} exists`);
    const request = new Request(`http://fixture.invalid/api/brand-studio/${endpoint}`, {
      method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload), ...init,
    });
    const response = await route.fetch(request);
    return { status: response.status, headers: response.headers, result: await response.json() };
  }
  async function rpc(endpoint, payload = {}) {
    const { result } = await invoke(endpoint, payload); assert.equal(result.ok, true, result.error?.message); return result.value;
  }
  const command = (type, data) => rpc('command', { type, data });
  function waitForState(predicate) {
    const current = tables.get('state').get('main');
    if (predicate(current)) return Promise.resolve(copy(current));
    return new Promise(resolve => {
      const watch = value => { if (predicate(value)) { watchers.delete(watch); resolve(copy(value)); } };
      watchers.add(watch);
    });
  }
  return { rpc, invoke, command, routes, tables, calls, keys, credentialWrites, dispose, waitForState,
    provider: fn => { provider = fn; }, credentialFailure: error => { credentialError = error; }, isClosed: () => closed };
}

async function setupCompany(h, name = 'Fixture bakery') {
  return h.command('company.save', { name, description: 'Bread and cakes', color: '#206b57', timezone: 'Africa/Kampala', weekStart: 1, guidelines: 'Clean and welcoming.' });
}
async function setupPost(h, companyId, overrides = {}) {
  return h.command('post.save', { companyId, title: 'Bread spotlight', brief: 'Illustrate freshly baked bread with space for a headline.', headline: 'Fresh bread today', body: 'Made for our neighbourhood', cta: 'Visit us', format: 'portrait', direction: 'spotlight', ...overrides });
}
// Minimal synthetic TTF with actual Unicode cmap12, never a network fixture.
function fixtureFont() {
  const b=Buffer.alloc(68);b.writeUInt32BE(0x10000);b.writeUInt16BE(1,4);b.write('cmap',12);b.writeUInt32BE(28,20);b.writeUInt32BE(40,24);b.writeUInt16BE(1,30);b.writeUInt16BE(3,32);b.writeUInt16BE(10,34);b.writeUInt32BE(12,36);b.writeUInt16BE(12,40);b.writeUInt32BE(28,44);b.writeUInt32BE(1,52);b.writeUInt32BE(32,56);b.writeUInt32BE(126,60);b.writeUInt32BE(1,64);return b;
}
function fontProvider(url, init) {
  assert.equal(init.redirect,'error');assert.equal(init.headers.authorization,undefined);
  if(url.startsWith('https://fonts.googleapis.com/'))return new Response("@font-face {font-family: 'Anton';font-style: normal;font-weight: 400;src: url(https://fonts.gstatic.com/s/anton/v1/fixture.ttf);unicode-range: U+0000-00FF;}");
  if(url.includes('OFL.txt'))return new Response('Copyright Synthetic Test Authors\nSIL OPEN FONT LICENSE Version 1.1');
  assert.equal(url,'https://fonts.gstatic.com/s/anton/v1/fixture.ttf');return new Response(fixtureFont());
}
const jobFinished = state => state.jobs.length > 0 && state.jobs.every(j => !['queued', 'running'].includes(j.status));

test('font routes import through mocked providers, retain metadata-only state and reopen offline without credentials', {timeout:5000}, async t => {
  const h=await harness(t),company=await setupCompany(h);h.credentialFailure(new Error('No font operation may access credentials'));h.provider(fontProvider);
  const catalog=await h.rpc('fonts.catalog');assert.equal(catalog.families.length,10);assert.equal(h.calls.length,0);
  const imported=await h.rpc('fonts.import',{companyId:company.id,catalogId:'anton'});assert.equal(h.calls.length,3);assert.equal(imported.state.fonts.length,1);assert.equal(imported.state.assets.length,0);
  const font=imported.state.fonts[0];assert.equal(font.id,imported.fontId);assert.match(font.licenseNotice,/SIL OPEN/);assert.equal(font.faces[0].sha256.length,64);assert.equal(JSON.stringify(imported.state).includes('base64'),false);
  const file=await h.rpc('fonts.file',{fontId:font.id,weight:400});assert.equal(file.dataUrl,`data:font/ttf;base64,${fixtureFont().toString('base64')}`);assert.deepEqual(file.coverage,[[32,126]]);assert.equal(file.sha256,font.faces[0].sha256);
  assert.equal((await h.invoke('asset',{id:font.faces[0].assetId})).result.ok,false);
  const repeat=await h.rpc('fonts.import',{companyId:company.id,catalogId:'anton'});assert.equal(repeat.fontId,font.id);assert.equal(h.calls.length,3);assert.equal(h.tables.get('assets').size,1);
  await h.dispose();const offline=await harness(t,{tables:h.tables});offline.credentialFailure(new Error('Offline font lookup must not touch credentials'));assert.equal((await offline.rpc('fonts.file',{fontId:font.id,weight:400})).sha256,file.sha256);assert.equal(offline.calls.length,0);
});
test('multiple normal weights use separate owned opaque binaries with complete face metadata', {timeout:5000}, async t => {
  const h=await harness(t),company=await setupCompany(h);h.provider((url,init)=>{
    if(url.startsWith('https://fonts.googleapis.com/'))return new Response([400,600,700].map(weight=>`@font-face {font-family: 'Oswald';font-style: normal;font-weight: ${weight};src: url(https://fonts.gstatic.com/s/anton/v1/fixture.ttf);unicode-range: U+0000-00FF;}`).join('\n'));
    return fontProvider(url,init);
  });
  const {state,fontId}=await h.rpc('fonts.import',{companyId:company.id,catalogId:'oswald'});assert.deepEqual(state.fonts[0].faces.map(f=>f.weight),[400,600,700]);assert.equal(h.calls.length,3,'shared provider file downloaded once');assert.equal(h.tables.get('assets').size,3);assert.equal(new Set(state.fonts[0].faces.map(f=>f.assetId)).size,3);
  for(const weight of [400,600,700]){const file=await h.rpc('fonts.file',{fontId,weight});assert.equal(file.weight,weight);assert.equal(file.style,'normal');assert.equal(file.mime,'font/ttf');assert.equal(file.bytes,68);assert.equal(file.sha256,state.fonts[0].faces[0].sha256);}
});
test('font import coalesces duplicates without blocking unrelated mutations or advertising partial cache', {timeout:5000}, async t => {
  const h=await harness(t),company=await setupCompany(h);let entered,release;const started=new Promise(r=>entered=r),gate=new Promise(r=>release=r);t.after(()=>release());h.provider(async(...args)=>{if(args[0].startsWith('https://fonts.googleapis.com/')){entered();await gate;}return fontProvider(...args);});
  const first=h.rpc('fonts.import',{companyId:company.id,catalogId:'anton'});await started;const second=h.rpc('fonts.import',{companyId:company.id,catalogId:'anton'});
  assert.equal((await h.rpc('state')).fonts?.length??0,0);const other=await setupCompany(h,'Concurrent unrelated company');assert.ok(other.id);assert.equal(h.calls.length,1);release();const [a,b]=await Promise.all([first,second]);assert.equal(a.fontId,b.fontId);assert.equal(h.calls.length,3);assert.equal(a.state.fonts.length,1);
});
test('font inputs, malformed provider responses and corrupt/foreign cache fail safely', {timeout:5000}, async t => {
  const h=await harness(t),company=await setupCompany(h);h.provider(fontProvider);
  for(const data of [{companyId:company.id,catalogId:'unknown'},{companyId:'missing',catalogId:'anton'},{companyId:company.id,catalogId:'anton',url:'https://evil.test'}])assert.equal((await h.invoke('fonts.import',data)).result.ok,false);
  assert.equal(h.calls.length,0);h.provider(async()=>new Response('secret invalid CSS'));assert.equal((await h.invoke('fonts.import',{companyId:company.id,catalogId:'anton'})).result.ok,false);assert.equal(h.tables.get('assets').size,0);assert.equal((await h.rpc('state')).fonts?.length??0,0);
  h.provider(fontProvider);const {state,fontId}=await h.rpc('fonts.import',{companyId:company.id,catalogId:'anton'});for(const weight of [300,'400',null])assert.equal((await h.invoke('fonts.file',{fontId,weight})).result.ok,false);
  const id=state.fonts[0].faces[0].assetId,row=h.tables.get('assets').get(id),original=copy(row);row.companyId='foreign';assert.equal((await h.invoke('fonts.file',{fontId,weight:400})).result.ok,false);Object.assign(row,original);row.dataUrl=`data:font/ttf;base64,${Buffer.alloc(row.bytes).toString('base64')}`;assert.equal((await h.invoke('fonts.file',{fontId,weight:400})).result.ok,false);
});
test('failed font metadata persistence cleans binary cache and never advertises a font', {timeout:5000}, async t => {
  let fail=false;const h=await harness(t,{rejectPut:(name)=>fail&&name==='state'}),company=await setupCompany(h);h.provider(fontProvider);fail=true;
  const rejected=await h.invoke('fonts.import',{companyId:company.id,catalogId:'anton'});assert.equal(rejected.result.ok,false);assert.equal(h.tables.get('assets').size,0);assert.equal((await h.rpc('state')).fonts?.length??0,0);assert.equal(JSON.stringify(rejected).includes('Synthetic storage'),false);
});
test('font imports enforce shared 96 MB cap and 24 family cap without partial metadata', {timeout:5000}, async t => {
  const h=await harness(t),company=await setupCompany(h);h.provider(fontProvider);
  for(let i=0;i<12;i++)h.tables.get('assets').set(`occupied-${i}`,{id:`occupied-${i}`,companyId:company.id,dataUrl:DATA_URL,bytes:8*1024*1024});
  const full=await h.invoke('fonts.import',{companyId:company.id,catalogId:'anton'});assert.equal(full.result.ok,false);assert.match(full.result.error.message,/96 MB/);assert.equal(h.tables.get('assets').size,12);assert.equal((await h.rpc('state')).fonts?.length??0,0);assert.equal(h.calls.length,3);
  h.tables.get('assets').clear();const imported=await h.rpc('fonts.import',{companyId:company.id,catalogId:'anton'});await h.dispose();const stored=h.tables.get('state').get('main'),base=stored.fonts[0];
  stored.fonts=Array.from({length:24},(_,i)=>({...copy(base),id:`font-${i}`,catalogId:`fixture-${i}`,faces:base.faces.map(f=>({...f,assetId:`binary-${i}`}))}));
  const capped=await harness(t,{tables:h.tables});const result=await capped.invoke('fonts.import',{companyId:company.id,catalogId:'anton'});assert.equal(result.result.ok,false);assert.match(result.result.error.message,/24/);assert.equal(capped.calls.length,0);assert.ok(imported.fontId);
});
test('new foreground and backdrop upload roles persist through real command route without network', {timeout:5000}, async t => {
  const h=await harness(t),company=await setupCompany(h);for(const role of ['backdrop','foreground']){const saved=await h.command('asset.save',{companyId:company.id,name:role,role,dataUrl:DATA_URL});assert.equal(saved.state.assets.at(-1).role,role);}assert.equal(h.calls.length,0);
});

// Tests in this file deliberately run sequentially: each owns the global fetch mock.
test('Host registers exact routes; state/status and internal failures are sanitised; cleanup removes routes', { timeout: 5000 }, async t => {
  const h = await harness(t);
  assert.equal(h.routes.size, 12);
  const state = await h.rpc('state');
  for (const key of ['companies', 'campaigns', 'plans', 'posts', 'designs', 'jobs', 'assets']) assert.deepEqual(state[key], []);
  assert.equal(state.settings.model, 'gpt-image-2.6-flare');
  assert.deepEqual(await h.rpc('status'), { credentialConfigured: false, credentialRef: PRIMARY, model: 'gpt-image-2.6-flare' });
  const response = await h.invoke('state'); assert.equal(response.headers.get('cache-control'), 'no-store');
  h.credentialFailure(new Error(`Sensitive provider diagnostics: ${FAKE_KEY}`));
  const failed = await h.invoke('status');
  assert.equal(failed.result.ok, false); assert.equal(failed.result.error.code, 'brand-studio/operation-failed');
  assert.equal(JSON.stringify(failed).includes(FAKE_KEY), false);
  assert.equal(h.calls.length, 0);
  await h.dispose(); assert.equal(h.routes.size, 0); assert.equal(h.isClosed(), true);
});

test('malformed JSON, nonobject payloads, and invalid commands are rejected without changing state', { timeout: 5000 }, async t => {
  const h = await harness(t);
  const before = await h.rpc('state');
  const malformed = await h.invoke('command', {}, { body: '{broken' });
  assert.equal(malformed.status, 400); assert.equal(malformed.result.ok, false); assert.match(malformed.result.error.message, /valid JSON/);
  for (const value of [null, [], 'not an object', 42]) {
    const response = await h.invoke('command', value); assert.equal(response.result.ok, false);
  }
  const unknown = await h.invoke('command', { type: 'unsupported', data: {} }); assert.equal(unknown.result.ok, false);
  const invalid = await h.invoke('command', { type: 'company.save', data: { name: '' } }); assert.equal(invalid.result.ok, false);
  assert.deepEqual(await h.rpc('state'), before); assert.equal(h.calls.length, 0);
  // Request.json currently accepts valid JSON regardless of Content-Type. These tests
  // intentionally do not claim a MIME enforcement check that the Host does not have.
});

test('three campaigns maintain separate weekly plans and reopen them idempotently through Fetch routes', { timeout: 5000 }, async t => {
  const h = await harness(t), company = await setupCompany(h), campaigns = [];
  for (const [name, postsPerWeek] of [['Product launch', 2], ['Baking education', 1], ['Seasonal offer', 2]]) {
    const campaign = await h.command('campaign.save', { companyId: company.id, name, goal: `Introduce ${name.toLowerCase()}`, postsPerWeek, status: 'active' }); campaigns.push(campaign.id);
    await h.command('plan.ensure', { campaignId: campaign.id, week: '2026-11-09', focus: 'This week’s approved message' });
  }
  const first = await h.rpc('state'); assert.equal(first.campaigns.length, 3); assert.equal(first.plans.length, 3); assert.equal(first.posts.length, 5); assert.equal(first.jobs.length, 0);
  const reused = await h.command('plan.ensure', { campaignId: campaigns[0], week: '2026-11-09', focus: 'Must not overwrite' });
  assert.equal(reused.existing, true); assert.equal(reused.state.posts.length, 5); assert.equal(reused.state.plans.length, 3);
  assert.equal(reused.planId, first.plans[0].id);
  const other = await setupCompany(h, 'Fixture bicycle shop');
  const forbidden = await h.invoke('command', { type: 'post.save', data: { companyId: other.id, campaignId: campaigns[0], brief: 'Wrong company' } });
  assert.equal(forbidden.result.ok, false); assert.match(forbidden.result.error.message, /another company/);
  await h.command('campaign.status', { id: campaigns[0], status: 'paused' });
  const paused = await h.invoke('command', { type: 'plan.ensure', data: { campaignId: campaigns[0], week: '2026-11-16' } }); assert.equal(paused.result.ok, false);
  assert.equal(h.calls.length, 0);
});

test('uploads remain metadata-only in state, validate image bytes, and cannot attach across companies', { timeout: 5000 }, async t => {
  const h = await harness(t), a = await setupCompany(h), b = await setupCompany(h, 'Other company');
  const upload = await h.command('asset.save', { companyId: a.id, name: 'Original product', role: 'product', dataUrl: DATA_URL });
  assert.ok(upload.assetId); assert.equal(upload.state.assets.length, 1); assert.equal('dataUrl' in upload.state.assets[0], false);
  assert.equal(JSON.stringify(await h.rpc('state')).includes(PNG), false);
  assert.equal((await h.rpc('asset', { id: upload.assetId })).dataUrl, DATA_URL);
  const own = await setupPost(h, a.id, { assetIds: [upload.assetId] }); assert.ok(own.id);
  const wrong = await h.invoke('command', { type: 'post.save', data: { companyId: b.id, brief: 'Use another company product', assetIds: [upload.assetId] } });
  assert.equal(wrong.result.ok, false); assert.match(wrong.result.error.message, /another company/);
  const svg = await h.invoke('command', { type: 'asset.save', data: { companyId: a.id, name: 'Bad SVG', role: 'logo', dataUrl: 'data:image/svg+xml;base64,PHN2Zy8+' } }); assert.equal(svg.result.ok, false);
  const forged = await h.invoke('command', { type: 'asset.save', data: { companyId: a.id, name: 'Fake output', role: 'generated', dataUrl: DATA_URL } }); assert.equal(forged.result.ok, false);
  assert.equal(h.calls.length, 0);
});

test('credential writes stay in the credential seam, fallback is explicit, and missing consent/key never calls provider', { timeout: 5000 }, async t => {
  const h = await harness(t), company = await setupCompany(h), post = await setupPost(h, company.id);
  const missing = await h.invoke('generate', { postIds: [post.id], requestId: 'missing-key', confirmed: true });
  assert.equal(missing.result.ok, false); assert.equal(h.calls.length, 0);
  const saved = await h.rpc('credential.save', { key: FAKE_KEY });
  assert.deepEqual(saved, { credentialConfigured: true, credentialRef: PRIMARY, model: 'gpt-image-2.6-flare' });
  assert.deepEqual(h.credentialWrites, [{ op: 'set', ref: PRIMARY }]);
  const unconfirmed = await h.invoke('generate', { postIds: [post.id], requestId: 'no-consent', confirmed: false });
  assert.equal(unconfirmed.result.ok, false); assert.equal((await h.rpc('state')).jobs.length, 0); assert.equal(h.calls.length, 0);
  assert.equal(JSON.stringify(await h.rpc('state')).includes(FAKE_KEY), false);
  h.keys.set(FALLBACK, 'sk-fixture-explicit-fallback');
  const deleted = await h.rpc('credential.delete'); assert.equal(deleted.credentialRef, FALLBACK); assert.equal(deleted.credentialConfigured, true);
  assert.equal(h.keys.has(PRIMARY), false); assert.equal(h.keys.has(FALLBACK), true);
  assert.equal(JSON.stringify(deleted).includes('sk-fixture'), false);
});

test('confirmed generation returns a durable job, makes one verified API-shaped call, saves image, and deduplicates replay', { timeout: 5000 }, async t => {
  const h = await harness(t, { keys: { [PRIMARY]: FAKE_KEY } }), company = await setupCompany(h), post = await setupPost(h, company.id, {poster:{version:2}});
  let releaseProvider, providerEntered;
  const entered = new Promise(resolve => { providerEntered = resolve; });
  const release = new Promise(resolve => { releaseProvider = resolve; });
  t.after(() => releaseProvider());
  h.provider(async (url, init) => {
    providerEntered(); await release;
    assert.equal(url, 'https://api.openai.com/v1/images/generations'); assert.equal(init.method, 'POST'); assert.equal(init.headers.authorization, `Bearer ${FAKE_KEY}`);
    const body = JSON.parse(init.body);
    assert.equal(body.model, 'gpt-image-2.6-flare'); assert.equal(body.n, 1); assert.equal(body.size, '1024x1536'); assert.equal(body.quality, 'medium'); assert.equal(body.output_format, 'png'); assert.equal(body.stream, false);
    assert.equal('response_format' in body, false); assert.equal('style' in body, false); assert.match(body.prompt, /Do not invent/);
    return Response.json({ data: [{ b64_json: PNG }] });
  });
  const request = { postIds: [post.id], requestId: 'confirmed-single-design', confirmed: true };
  const queued = await h.rpc('generate', request);
  assert.equal(queued.jobs.length, 1); assert.equal('snapshot' in queued.jobs[0], false); assert.equal(queued.jobs[0].postId, post.id);
  await entered;
  assert.equal(h.calls.length, 1);
  const durable = h.tables.get('state').get('main'); assert.equal(durable.jobs[0].status, 'running'); assert.equal(durable.jobs[0].snapshot.company.id, company.id);
  const replay = await h.rpc('generate', request); assert.equal(replay.existing, true); assert.equal(replay.jobs[0].id, queued.jobs[0].id); assert.equal(h.calls.length, 1);
  const completion = h.waitForState(jobFinished); releaseProvider(); const finished = await completion;
  assert.equal(finished.jobs[0].status, 'succeeded'); assert.equal(finished.designs.length, 1); assert.equal(finished.posts[0].status, 'design-ready');
  const design = finished.designs[0]; assert.equal(design.headline, 'Fresh bread today'); assert.equal(design.companyId, company.id);
  assert.equal((await h.rpc('asset', { id: design.assetId })).dataUrl, DATA_URL);
  assert.equal(design.scene.post.backgroundAssetId, design.assetId);
  await h.command('post.save', { id: post.id, backgroundAssetId: design.assetId });
  await h.command('design.review', { id: design.id, reviewed: true });
  const immutable = await h.invoke('command', { type: 'design.save', data: { id: design.id, headline: 'Cannot mutate' } });
  assert.equal(immutable.result.ok, false); assert.match(immutable.result.error.message, /immutable/);
  const edited = await h.command('post.save', { id: post.id, headline: 'Updated exact wording', format: 'story', poster: { version: 2, cropX: 0.7 } });
  const changed = await h.command('design.snapshot', { postId: post.id, assetId: design.assetId });
  assert.equal(changed.state.designs[1].reviewed, false); assert.equal(changed.state.designs[1].headline, 'Updated exact wording');
  assert.equal(changed.state.designs[0].reviewed, true); assert.equal(changed.state.designs[0].headline, 'Fresh bread today'); assert.equal(h.calls.length, 1);
  const serialised = JSON.stringify(await h.rpc('state')); assert.equal(serialised.includes(PNG), false); assert.equal(serialised.includes(FAKE_KEY), false); assert.equal(serialised.includes('snapshot'), false);
});

test('read-only model discovery lists image models without generating or silently changing selection', {timeout:5000}, async t => {
  const h=await harness(t,{keys:{[PRIMARY]:FAKE_KEY}});
  h.provider(async(url,init)=>{assert.equal(url,'https://api.openai.com/v1/models');assert.equal(init.method,'GET');return Response.json({data:[{id:'gpt-image-2'},{id:'gpt-image-1.5'},{id:'chat-secret-other-model'},{id:FAKE_KEY}]});});
  const result=await h.rpc('models.check');assert.deepEqual(result.imageModels,['gpt-image-1.5','gpt-image-2']);assert.equal(result.currentAvailable,false);
  const state=await h.rpc('state');assert.equal(state.settings.model,'gpt-image-2.6-flare');assert.deepEqual(state.settings.imageModels,result.imageModels);assert.equal(state.jobs.length,0);assert.equal(h.calls.length,1);assert.equal(JSON.stringify(state).includes(FAKE_KEY),false);
});
test('verified 2.6 migration fixes rejected legacy default without replaying paid work or changing snapshots', {timeout:5000}, async t => {
  const first=await harness(t,{keys:{[PRIMARY]:FAKE_KEY}}),company=await setupCompany(first),post=await setupPost(first,company.id,{poster:{version:3,compilerVersion:3}});
  await first.command('settings.save',{model:'gpt-image-1'});
  first.provider(async()=>Response.json({error:{code:'invalid_value',param:'model',message:'Invalid image model'}},{status:400}));
  await first.rpc('generate',{postIds:[post.id],requestId:'legacy-model-failure',confirmed:true});await first.waitForState(jobFinished);await first.dispose();
  const stored=first.tables.get('state').get('main');stored.settings.imageModels=['gpt-image-2.6-flare','gpt-image-2.6-sunburst'];stored.settings.modelCatalog={imageModels:stored.settings.imageModels,currentAvailable:false,checkedAt:'2026-11-10T15:00:00Z'};
  const restarted=await harness(t,{tables:first.tables,keys:{[PRIMARY]:FAKE_KEY}}),result=await restarted.rpc('state');
  assert.equal(result.settings.model,'gpt-image-2.6-flare');assert.equal(result.jobs.length,1);assert.equal(result.jobs[0].status,'failed');assert.equal(restarted.tables.get('state').get('main').jobs[0].snapshot.model,'gpt-image-1');assert.equal(restarted.calls.length,0);
  await restarted.command('settings.save',{model:'gpt-image-2.6-sunburst'});assert.equal((await restarted.rpc('state')).settings.model,'gpt-image-2.6-sunburst');assert.equal(restarted.calls.length,0);
});
test('HTTP 400 preserves safe actionable diagnostics and request ID without leaking provider text', {timeout:5000}, async t => {
  const h = await harness(t,{keys:{[PRIMARY]:FAKE_KEY}}), company=await setupCompany(h), post=await setupPost(h,company.id,{poster:{version:3,compilerVersion:3}});
  h.provider(async()=>Response.json({error:{type:'invalid_request_error',code:'unknown_parameter',param:'stream',message:`Unknown parameter stream. Sensitive text ${FAKE_KEY}`}}, {status:400,headers:{'x-request-id':'req_fixture_400'}}));
  await h.rpc('generate',{postIds:[post.id],requestId:'diagnostic-400',confirmed:true});
  const result=await h.waitForState(jobFinished), job=result.jobs[0];
  assert.equal(job.status,'failed');assert.equal(job.httpStatus,400);
  assert.equal(job.providerCode,'unknown_parameter');assert.equal(job.providerParam,'stream');assert.equal(job.providerRequestId,'req_fixture_400');
  assert.match(job.error,/stream/);assert.equal(JSON.stringify(result).includes(FAKE_KEY),false);assert.equal(JSON.stringify(result).includes('Sensitive text'),false);assert.equal(h.calls.length,1);
});
test('provider HTTP failure and transport ambiguity have sanitised durable outcomes and no automatic retry', { timeout: 5000 }, async t => {
  const h = await harness(t, { keys: { [PRIMARY]: FAKE_KEY } }), company = await setupCompany(h);
  const p1 = await setupPost(h, company.id,{poster:{version:3,compilerVersion:3}}), p2 = await setupPost(h, company.id,{poster:{version:3,compilerVersion:3}}), p3 = await setupPost(h, company.id,{poster:{version:3,compilerVersion:3}});
  h.provider(async () => Response.json({ error: { message: `Do not leak: ${FAKE_KEY}` } }, { status: 429 }));
  await h.rpc('generate', { postIds: [p1.id], requestId: 'quota-failure', confirmed: true });
  let settled = await h.waitForState(jobFinished); assert.equal(settled.jobs[0].status, 'failed'); assert.equal(settled.jobs[0].httpStatus, 429); assert.equal(h.calls.length, 1);
  h.provider(async () => { throw new Error(`Socket broke with secret ${FAKE_KEY}`); });
  await h.rpc('generate', { postIds: [p2.id], requestId: 'transport-unknown', confirmed: true });
  settled = await h.waitForState(jobFinished); assert.equal(settled.jobs[1].status, 'unknown'); assert.match(settled.jobs[1].error, /may have been charged/); assert.equal(h.calls.length, 2);
  const retry = await h.invoke('generate', { postIds: [p2.id], requestId: 'dont-retry-unknown', confirmed: true }); assert.equal(retry.result.ok, false); assert.equal(h.calls.length, 2);
  h.provider(async () => Response.json({ error: { message: FAKE_KEY } }, { status: 503 }));
  await h.rpc('generate', { postIds: [p3.id], requestId: 'server-unknown', confirmed: true });
  settled = await h.waitForState(jobFinished); assert.equal(settled.jobs[2].status, 'unknown'); assert.equal(h.calls.length, 3);
  assert.equal(JSON.stringify(await h.rpc('state')).includes(FAKE_KEY), false); assert.equal(settled.designs.length, 0);
});


test('Host v2 inheritance and type-only snapshots freeze brand, support review/export and reopen without calls', { timeout: 5000 }, async t => {
  const h = await harness(t), company = await setupCompany(h);
  await h.command('company.save', { id: company.id, name: 'Original brand', color: '#ff7700', brandKit: { voice: 'impact', ink: '#101010', paper: '#fafafa' } });
  const campaign = await h.command('campaign.save', { companyId: company.id, name: 'Launch', goal: 'Introduce our service' });
  await h.command('campaign.artDirection', { id: campaign.id, poster: { recipe: 'editorial', voice: 'clean', formats: { story: { cropX: 0.8, heroScale: 1.2 } } } });
  const created = await setupPost(h, company.id, { campaignId: campaign.id, format: 'story' });
  assert.equal(created.state.posts[0].poster.recipe, 'editorial'); assert.equal(created.state.posts[0].poster.voice, 'clean');
  // New drafts upgrade inherited looks to v3; explicitly keep this historical v2 fixture.
  await h.command('post.save', {id:created.id,poster:{version:2,recipe:'editorial',voice:'clean',formats:{story:{cropX:0.8,heroScale:1.2}}}});
  const logo = await h.command('asset.save', { companyId: company.id, name: 'Original logo', role: 'logo', dataUrl: DATA_URL });
  await h.command('company.save', { id: company.id, name: 'Original brand', color: '#ff7700', logoAssetId: logo.assetId });
  const snap = await h.command('design.snapshot', { postId: created.id });
  const design = snap.state.designs[0], frozen = copy(design.scene);
  assert.equal(design.assetId, ''); assert.equal(design.scene.post.logoAssetId, logo.assetId); assert.equal(design.cropX, 0.8);
  assert.equal(design.scene.company.brandKit.ink, '#101010'); assert.equal(snap.state.jobs.length, 0);
  const unreviewed = await h.invoke('command', { type: 'post.status', data: { id: created.id, status: 'exported', designId: snap.id } }); assert.equal(unreviewed.result.ok, false);
  await h.command('design.review', { id: snap.id, reviewed: true });
  await h.command('post.status', { id: created.id, status: 'exported', designId: snap.id });
  const edits = await h.command('post.save', { id: created.id, poster: { ...created.state.posts[0].poster, cropX: 0.2 } });
  assert.equal(edits.state.posts[0].status, 'planned'); assert.equal(edits.state.designs[0].reviewed, true);
  const stale = await h.invoke('command', { type: 'post.status', data: { id: created.id, status: 'exported', designId: snap.id } }); assert.equal(stale.result.ok, false);
  const historicalReview = await h.command('design.review', { id: snap.id, reviewed: true }); assert.notEqual(historicalReview.state.posts[0].status, 'reviewed');
  await h.command('company.save', { id: company.id, name: 'Changed brand', color: '#0000ff' });
  const newest = await h.command('design.snapshot', { postId: created.id });
  assert.notEqual(newest.id, snap.id); assert.deepEqual(newest.state.designs[0].scene, frozen); assert.equal(newest.state.designs[1].reviewed, false);
  const changed = await h.invoke('command', { type: 'design.save', data: { id: snap.id, cropX: 0.3 } }); assert.equal(changed.result.ok, false);
  await h.dispose(); const restarted = await harness(t, { tables: h.tables });
  const reopened = await restarted.rpc('state'); assert.equal(reopened.version, 1); assert.deepEqual(reopened.designs[0].scene, frozen);
  assert.equal(reopened.designs[0].reviewed, true); assert.equal(reopened.designs[1].reviewed, false);
  assert.equal(restarted.calls.length, 0); assert.equal(h.calls.length, 0);
});

test('Host snapshot ownership, roles and malformed options fail atomically through command route', { timeout: 5000 }, async t => {
  const h = await harness(t), a = await setupCompany(h), b = await setupCompany(h, 'Other brand');
  const post = await setupPost(h, a.id);
  const logo = await h.command('asset.save', { companyId: a.id, name: 'Logo', role: 'logo', dataUrl: DATA_URL });
  const product = await h.command('asset.save', { companyId: a.id, name: 'Real screenshot', role: 'product', dataUrl: DATA_URL });
  const foreign = await h.command('asset.save', { companyId: b.id, name: 'Foreign product', role: 'product', dataUrl: DATA_URL });
  const before = await h.rpc('state');
  for (const data of [{ assetId: foreign.assetId }, { logoAssetId: foreign.assetId }, { productAssetId: foreign.assetId },
    { assetId: logo.assetId }, { logoAssetId: product.assetId }, { productAssetId: logo.assetId },
    { poster: null }, { poster: { scale: '1' } }, { poster: { formats: { story: { formats: {} } } } }]) {
    const failed = await h.invoke('command', { type: 'design.snapshot', data: { postId: post.id, ...data } }); assert.equal(failed.result.ok, false);
  }
  for (const [type, data] of [['company.save', { id: a.id, name: 'Brand', brandKit: { ink: '#fff' } }],
    ['campaign.artDirection', { id: 'missing', poster: {} }], ['post.save', { id: post.id, backgroundAssetId: product.assetId }]]) {
    const failed = await h.invoke('command', { type, data }); assert.equal(failed.result.ok, false);
  }
  assert.deepEqual(await h.rpc('state'), before); assert.equal(h.calls.length, 0);
});

test('Host reopens pre-v2 state unchanged, preserves v1 prompt and mutable history until explicit upgrade', { timeout: 5000 }, async t => {
  const h = await harness(t, { keys: { [PRIMARY]: FAKE_KEY } }), company = await setupCompany(h), post = await setupPost(h, company.id);
  await h.dispose(); const stored = h.tables.get('state').get('main'); delete stored.posts[0].poster;
  const legacy = await harness(t, { tables: h.tables, keys: { [PRIMARY]: FAKE_KEY } });
  assert.equal('poster' in (await legacy.rpc('state')).posts[0], false);
  await legacy.command('post.save', { id: post.id, headline: 'Legacy exact words' });
  assert.equal('poster' in (await legacy.rpc('state')).posts[0], false);
  legacy.provider(async (url, init) => { assert.equal(JSON.parse(init.body).prompt.includes('V2 commissioned'), false); return Response.json({ data: [{ b64_json: PNG }] }); });
  await legacy.rpc('generate', { postIds: [post.id], requestId: 'legacy-compatibility-generation', confirmed: true });
  const completed = await legacy.waitForState(jobFinished), design = completed.designs[0]; assert.equal('scene' in design, false);
  await legacy.command('design.review', { id: design.id, reviewed: true });
  const edited = await legacy.command('design.save', { id: design.id, headline: 'Local legacy edit', cropX: 0.2 }); assert.equal(edited.state.designs[0].reviewed, false);
  await legacy.command('post.save', { id: post.id, poster: { version: 2, recipe: 'hero' } });
  const upgraded = await legacy.command('design.snapshot', { postId: post.id, assetId: design.assetId });
  assert.equal(upgraded.state.designs[1].scene.version, 2); assert.equal('scene' in upgraded.state.designs[0], false);
  assert.equal(upgraded.state.designs[0].headline, 'Local legacy edit'); assert.equal(legacy.calls.length, 1);
});


test('Host legacy crop autosave persists through actual storage reopen without implicit upgrade or image requests', { timeout: 5000 }, async t => {
  const h = await harness(t), company = await setupCompany(h), post = await setupPost(h, company.id);
  await h.dispose(); delete h.tables.get('state').get('main').posts[0].poster;
  const legacy = await harness(t, { tables: h.tables });
  const saved = await legacy.command('post.save', { id: post.id, cropX: 0.8 });
  assert.equal(saved.state.posts[0].cropX, 0.8); assert.equal('poster' in saved.state.posts[0], false);
  for (const cropX of [-1, 2, null, '0.5']) {
    const failed = await legacy.invoke('command', { type: 'post.save', data: { id: post.id, cropX } }); assert.equal(failed.result.ok, false);
  }
  await legacy.dispose(); const reopened = await harness(t, { tables: h.tables });
  const state = await reopened.rpc('state'); assert.equal(state.posts[0].cropX, 0.8); assert.equal('poster' in state.posts[0], false);
  assert.equal(state.jobs.length, 0); assert.equal(reopened.calls.length, 0); assert.equal(legacy.calls.length, 0);
});

test('Host refuses editorial paid generation and mixed batches atomically before any provider call', { timeout: 5000 }, async t => {
  const h = await harness(t, { keys: { [PRIMARY]: FAKE_KEY } }), company = await setupCompany(h);
  const hero = await setupPost(h, company.id,{poster:{version:3,compilerVersion:3}}), editorial = await setupPost(h, company.id, { poster: { recipe: 'editorial' } });
  const overridden = await setupPost(h, company.id, { format: 'story', poster: { recipe: 'showcase', formats: { story: { recipe: 'editorial' } } } });
  const before = await h.rpc('state');
  for (const [n, postIds] of [[editorial.id], [hero.id, editorial.id], [overridden.id]].entries()) {
    const failed = await h.invoke('generate', { postIds, requestId: `editorial-block-${n}`, confirmed: true });
    assert.equal(failed.result.ok, false); assert.match(failed.result.error.message, /type-only/);
    assert.deepEqual(await h.rpc('state'), before); assert.equal(h.calls.length, 0);
  }
  const local = await h.command('design.snapshot', { postId: editorial.id }); assert.equal(local.state.designs[0].assetId, ''); assert.equal(h.calls.length, 0);
});
