import test from 'node:test';
import assert from 'node:assert/strict';
import { createState, applyCommand, validateState, addAsset, addFont, validateFontRecord, queueJobs, finishJob } from './model.js';
import { resolvePoster } from './poster-model.js';
import { BUNDLED_FONT_METADATA } from './src/font-passports-v3.js';
let serial = 0;
const now = '2026-11-10T10:00:00.000Z', options = { now, id: () => `v3-${++serial}` };
const cmd = (s, type, data) => applyCommand(s, type, data, options);
function fixture() {
  const a = cmd(createState(), 'company.save', { name: 'Alpha' });
  const b = cmd(a.state, 'company.save', { name: 'Beta' });
  const p = cmd(b.state, 'post.save', { companyId: a.id, poster: { version: 3, compilerVersion: 2 }, title: 'Title', headline: 'Exact headline', body: 'Exact body', cta: 'Visit', brief: 'Confirmed direction' });
  return { state: p.state, companyId: a.id, otherId: b.id, postId: p.id };
}
const asset = (companyId, id, role) => ({ companyId, id, role, name: id, bytes: 100, mime: 'image/png', createdAt: now });
const font = (companyId, id = 'font-one') => ({ id, companyId, family: 'Test Sans', catalogId: 'test-sans', source: 'google-fonts', license: 'SIL OFL 1.1', licenseUrl: 'https://example.test/OFL.txt', importedAt: now, faces: [{ weight: 400, style: 'normal', assetId: `${id}-binary`, sha256: 'a'.repeat(64), bytes: 100, mime: 'font/woff2', coverage: [[32,126]] }] });
function receipt(state, overrides = {}) {
  const post = state.posts[0], resolved = resolvePoster(post.poster, post.format);
  const fonts = Object.fromEntries(Object.entries(resolved.typography).map(([role, spec]) => {
    const imported = state.fonts?.find(f => f.id === spec.fontId), face = imported?.faces[0];
    const display = { studio: 'league-spartan-latin-wght-normal.woff2', impact: 'barlow-condensed-latin-800-normal.woff2', clean: 'archivo-latin-wght-normal.woff2' };
    const file = face?.assetId ?? (role === 'headline' ? display[resolved.voice] : resolved.voice === 'clean' ? 'manrope-latin-wght-normal.woff2' : 'source-sans-3-latin-wght-normal.woff2');
    return [role, { fontId: spec.fontId || null, assetId: face?.assetId ?? null, file, sha256: face?.sha256 ?? BUNDLED_FONT_METADATA[file].sha256, style: 'normal', weight: spec.weight ?? (role === 'headline' ? 800 : role === 'body' ? 400 : 600), size: spec.size ?? 50, lineHeight: spec.lineHeight ?? 1, tracking: spec.tracking }];
  }));
  return { pngSha256: 'c'.repeat(64), manifest: { rendererVersion: 3, ...(resolved.compilerVersion === 2 ? { compilerVersion: 2 } : {}), format: post.format, options: resolved, copy: { headline: post.headline || post.title || '', body: post.body, cta: post.cta, kicker: resolved.kicker }, assetReferences: { backgroundAssetId: post.backgroundAssetId || '', foregroundAssetId: post.foregroundAssetId || '', logoAssetId: state.companies[0].logoAssetId || '', productAssetId: post.assetIds.find(id => state.assets.find(a => a.id === id)?.role === 'product') || '' }, fonts, ...overrides } };
}
const snapshot = (s, postId, renderReceipt = receipt(s), extra = {}) => cmd(s, 'design.snapshot', { postId, renderReceipt, ...extra });

test('v3 brand kit and campaign looks inherit only into new posts and preserve old records', () => {
  const f = fixture(), original = structuredClone(f.state.posts[0]);
  let state = cmd(f.state, 'company.save', { id: f.companyId, name: 'Alpha', brandKit: { poster: { version: 3, typography: { cta: { size: 44 } }, details: { motif: 'ribbon' } } } }).state;
  const next = cmd(state, 'post.save', { companyId: f.companyId }); state = next.state;
  assert.deepEqual(state.posts[0], original); assert.equal(state.posts[1].poster.typography.cta.size, 44);
  assert.equal(state.posts[1].poster.details.motif, 'none'); assert.equal(state.posts[1].poster.compilerVersion, 4); assert.equal(state.version, 1);
  state = cmd(state, 'company.save', { id: f.companyId, name: 'Alpha', brandKit: { voice: 'clean' } }).state;
  assert.equal(state.companies[0].brandKit.poster.details.motif, 'ribbon', 'legacy kit controls retain the v3 look');
  const c = cmd(state, 'campaign.save', { companyId: f.companyId, name: 'Campaign', goal: 'Known goal', artDirection: { version: 2, recipe: 'editorial' } });
  const post = cmd(c.state, 'post.save', { companyId: f.companyId, campaignId: c.id });
  assert.equal(post.state.posts.at(-1).poster.version, 3); assert.equal(post.state.posts.at(-1).poster.recipe, 'editorial');
});

test('compiler identity is frozen in scenes and receipts while legacy options remain absent', () => {
  const f = fixture();
  assert.equal(f.state.posts[0].poster.compilerVersion, 2, 'explicit compiler2 fixture retains crisp compilation');
  const legacy = cmd(f.state, 'post.save', { id: f.postId, poster: { version: 3 } }).state;
  assert.equal(Object.hasOwn(legacy.posts[0].poster, 'compilerVersion'), false);
  const old = snapshot(legacy, f.postId), frozenOld = JSON.stringify(old.state.designs[0]);
  assert.equal(Object.hasOwn(old.state.designs[0].scene, 'compilerVersion'), false);
  assert.equal(Object.hasOwn(old.state.designs[0].renderReceipt.manifest, 'compilerVersion'), false);
  assert.equal(JSON.stringify(validateState(JSON.parse(JSON.stringify(old.state))).designs[0]), frozenOld);
  const edited = cmd(old.state, 'post.save', { id: f.postId, headline: 'Still original compiler' }).state;
  assert.equal(Object.hasOwn(edited.posts[0].poster, 'compilerVersion'), false);
  const crisp = cmd(old.state, 'post.save', { id: f.postId, poster: { ...legacy.posts[0].poster, compilerVersion: 2 } }).state;
  const saved = snapshot(crisp, f.postId), scene = saved.state.designs.at(-1).scene;
  assert.equal(scene.compilerVersion, 2); assert.equal(scene.post.poster.compilerVersion, 2);
  assert.equal(saved.state.designs.at(-1).renderReceipt.manifest.compilerVersion, 2);
  assert.equal(JSON.stringify(saved.state.designs[0]), frozenOld, 'new compiler does not migrate frozen old scenes');
  for (const state of [legacy, crisp]) for (const compilerVersion of [1, 3, '2', null]) {
    assert.throws(() => snapshot(state, f.postId, receipt(state, { compilerVersion })), /compiler/);
  }
  assert.throws(() => snapshot(legacy, f.postId, receipt(legacy, { compilerVersion: 2 })), /compiler/);
  const missing = receipt(crisp); delete missing.manifest.compilerVersion;
  assert.throws(() => snapshot(crisp, f.postId, missing), /compiler/);
  for (const compilerVersion of [undefined, 1, 3]) {
    const forged = structuredClone(saved.state); if (compilerVersion === undefined) delete forged.designs.at(-1).scene.compilerVersion;
    else forged.designs.at(-1).scene.compilerVersion = compilerVersion;
    assert.throws(() => validateState(forged), /compiler/);
  }
  const reviewed = cmd(old.state, 'design.review', { id: old.id, reviewed: true }).state;
  const changed = cmd(reviewed, 'post.save', { id: f.postId, poster: { ...legacy.posts[0].poster, compilerVersion: 2 } }).state;
  assert.equal(changed.posts[0].status, 'planned'); assert.equal(changed.designs[0].reviewed, true);
  assert.throws(() => cmd(changed, 'post.status', { id: f.postId, status: 'exported', designId: old.id, pngSha256: receipt(legacy).pngSha256 }), /changed/);
});

test('v3 foreground and backdrop ownership roles empty selections and v2 restrictions are strict', () => {
  const f = fixture(); let state = f.state;
  for (const [id, owner, role] of [['fg', f.companyId, 'foreground'], ['bg', f.companyId, 'backdrop'], ['product', f.companyId, 'product'], ['foreign', f.otherId, 'foreground'], ['logo', f.companyId, 'logo']]) state = addAsset(state, asset(owner,id,role));
  for (const data of [{ foregroundAssetId: 'foreign' }, { foregroundAssetId: 'bg' }, { backgroundAssetId: 'fg' }]) assert.throws(() => cmd(state, 'post.save', { id: f.postId, ...data }));
  state = cmd(state, 'post.save', { id: f.postId, foregroundAssetId: 'fg', backgroundAssetId: 'bg', assetIds: ['product'] }).state;
  const saved = snapshot(state, f.postId), design = saved.state.designs[0];
  assert.equal(design.foregroundAssetId, 'fg'); assert.equal(design.scene.post.foregroundAssetId, 'fg'); assert.equal(design.scene.post.backgroundAssetId, 'bg');
  assert.equal(design.productAssetId, 'product'); assert.equal(saved.state.jobs.length, 0);
  assert.throws(() => cmd(state, 'post.save', { id: f.postId, poster: { version: 2 } }), /role/);
  assert.equal(cmd(state, 'post.save', { id: f.postId, foregroundAssetId: '', backgroundAssetId: '' }).state.posts[0].foregroundAssetId, '');
  const forged = structuredClone(saved.state); forged.designs[0].foregroundAssetId = 'product'; assert.throws(() => validateState(forged), /foreground/);
});

test('font metadata is optional bounded immutable cloned and owned across all look entry points', () => {
  const f = fixture(), record = font(f.companyId); let state = addFont(f.state, record);
  assert.equal('fonts' in f.state, false); record.faces[0].bytes = 5; assert.equal(state.fonts[0].faces[0].bytes, 100);
  assert.deepEqual(validateFontRecord(state.fonts[0]), state.fonts[0]);
  assert.throws(() => addFont(state, font(f.companyId)), /exists/);
  assert.throws(() => addFont(state, { ...font(f.companyId, 'duplicate'), faces: structuredClone(state.fonts[0].faces) }), /already imported/);
  const look = { version: 3, typography: { headline: { fontId: 'font-one', weight: 400 } } };
  state = cmd(state, 'post.save', { id: f.postId, poster: look }).state;
  assert.throws(() => cmd(state, 'post.save', { companyId: f.otherId, poster: look }), /another company/);
  assert.throws(() => cmd(state, 'company.save', { id: f.otherId, name: 'Beta', brandKit: { poster: look } }), /another company/);
  const campaign = cmd(state, 'campaign.save', { companyId: f.otherId, name: 'Other', goal: 'Known' });
  assert.throws(() => cmd(campaign.state, 'campaign.artDirection', { id: campaign.id, poster: look }), /another company/);
  assert.throws(() => cmd(state, 'post.save', { id: f.postId, poster: { version: 3, formats: { story: { typography: { body: { fontId: 'missing' } } } } } }), /font no longer/);
  const saved = snapshot(state, f.postId); assert.deepEqual(saved.state.designs[0].scene.fonts, state.fonts);
  assert.notEqual(saved.state.designs[0].scene.fonts, state.fonts);
  const forged = structuredClone(saved.state); forged.designs[0].scene.fonts[0].companyId = f.otherId; assert.throws(() => validateState(forged), /another company/);
});

test('font metadata rejects malformed faces coverage digests bytes URLs ownership and binary reuse', () => {
  const f = fixture(), good = font(f.companyId);
  for (const patch of [{ source: 'upload' }, { license: 'unknown' }, { licenseUrl: 'javascript:alert(1)' }, { id: '../bad' }, { importedAt: 'yesterday' }, { family: 12 }, { faces: [] }, { unknown: 1 }]) assert.throws(() => validateFontRecord({ ...good, ...patch }));
  for (const patch of [{ style: 'italic' }, { weight: 400.5 }, { weight: 901 }, { sha256: 'x' }, { bytes: 2097153 }, { mime: 'image/png' }, { coverage: [[50,40]] }, { coverage: [[0,100],[90,120]] }, { coverage: [[0xd800,0xdfff]] }, { dataUrl: 'data:font/woff2;base64,AA' }]) assert.throws(() => validateFontRecord({ ...good, faces: [{ ...good.faces[0], ...patch }] }));
  assert.throws(() => addFont(f.state, font('missing-company')), /no longer/);
  const state = addAsset(f.state, asset(f.companyId, 'font-one-binary', 'product'));
  assert.throws(() => addFont(state, good), /binary identifier/);
  let many = f.state;
  for (let n = 0; n < 24; n++) many = addFont(many, { ...font(f.companyId, `font-${n}`), catalogId: `catalog-${n}` });
  assert.throws(() => addFont(many, font(f.companyId, 'font-25')), /24/);
});

test('v3 receipts persist before review, are immutable and identify the exact export bitmap', () => {
  const f = fixture();
  const raw = cmd(f.state, 'design.snapshot', { postId: f.postId });
  assert.throws(() => cmd(raw.state, 'design.review', { id: raw.id, reviewed: true }), /receipt/);
  const input = receipt(f.state), saved = snapshot(raw.state, f.postId, input), before = JSON.stringify(saved.state.designs[1]);
  input.manifest.copy.headline = 'Mutated caller';
  let state = cmd(saved.state, 'design.review', { id: saved.id, reviewed: true }).state;
  assert.equal(state.posts[0].status, 'reviewed');
  assert.throws(() => cmd(state, 'design.save', { id: saved.id, renderReceipt: receipt(state) }), /immutable/);
  for (const hash of [undefined, 'd'.repeat(64)]) assert.throws(() => cmd(state, 'post.status', { id: f.postId, status: 'exported', designId: saved.id, pngSha256: hash }), /exact PNG/);
  state = cmd(state, 'post.status', { id: f.postId, status: 'exported', designId: saved.id, pngSha256: 'c'.repeat(64) }).state;
  assert.equal(state.posts[0].status, 'exported');
  assert.equal(JSON.stringify({ ...state.designs[1], reviewed: false }), before);
  assert.equal(validateState(JSON.parse(JSON.stringify(state))).version, 1);
});

test('v3 receipt rejects stale copy format renderer assets font faces and oversized/nonplain JSON', () => {
  const f = fixture();
  for (const patch of [{ rendererVersion: 2 }, { format: 'story' }, { copy: { headline: 'Stale' } }, { assetReferences: {} }, { assetReferences: { backgroundAssetId: 'foreign', logoAssetId: '', productAssetId: '', foregroundAssetId: '' } }, { padding: 'a'.repeat(131072) }, { padding: new Date() }, { fonts: {} }]) assert.throws(() => snapshot(f.state, f.postId, receipt(f.state,patch)));
  assert.throws(() => snapshot(f.state, f.postId, { ...receipt(f.state), pngSha256: 'invalid' }), /digest/);
  let state = addFont(f.state, font(f.companyId));
  state = cmd(state, 'post.save', { id: f.postId, poster: { version: 3, typography: { headline: { fontId: 'font-one', weight: 400 } } } }).state;
  for (const patch of [{ fontId: 'foreign' }, { assetId: 'other-binary' }, { sha256: 'd'.repeat(64) }, { weight: 700 }]) {
    const r = receipt(state); Object.assign(r.manifest.fonts.headline, patch); assert.throws(() => snapshot(state, f.postId,r), /font/);
  }
});

test('every v3 rendering input edit invalidates current review without rewriting historical scene or receipt', () => {
  const f = fixture(), saved = snapshot(f.state, f.postId);
  const reviewed = cmd(saved.state, 'design.review', { id: saved.id, reviewed: true }).state;
  const frozen = JSON.stringify(reviewed.designs[0]);
  for (const patch of [{ headline: 'Changed' }, { brief: 'Changed' }, { title: 'Changed' }, { poster: { ...reviewed.posts[0].poster, layers: { foreground: { rotation: 10 } } } }, { poster: { ...reviewed.posts[0].poster, details: { text: 'Confirmed phrase' } } }, { poster: { ...reviewed.posts[0].poster, typography: { cta: { size: 36 } } } }]) {
    const state = cmd(reviewed, 'post.save', { id: f.postId, ...patch }).state;
    assert.equal(state.posts[0].status, 'planned'); assert.equal(JSON.stringify(state.designs[0]), frozen);
    assert.throws(() => cmd(state, 'post.status', { id: f.postId, status: 'exported', designId: saved.id, pngSha256: 'c'.repeat(64) }), /changed/);
  }
  assert.equal(cmd(reviewed, 'post.save', { ...reviewed.posts[0] }).state.posts[0].status, 'reviewed');
});

test('paid queue blocks v2 ignored backgrounds and all editorial; v3 backdrop jobs freeze resources without changing draft choices', () => {
  const f = fixture(); let state = addAsset(f.state, asset(f.companyId,'original','product'));
  state = addAsset(state, asset(f.companyId,'backdrop','backdrop')); state = addFont(state,font(f.companyId));
  for (const recipe of ['hero','showcase']) {
    const old = cmd(state,'post.save',{ id:f.postId, poster:{version:2,recipe},assetIds:['original'] }).state;
    assert.throws(() => queueJobs(old,{ confirmed:true,postIds:[f.postId],requestId:`ignored-${recipe}` },options),/editable v3 copy/);
  }
  for (const version of [2,3]) {
    const editorial = cmd(state,'post.save',{id:f.postId,poster:{version,recipe:'editorial'}}).state;
    assert.throws(() => queueJobs(editorial,{confirmed:true,postIds:[f.postId],requestId:`editorial-${version}`},options),/type-only/);
  }
  state = cmd(state,'post.save',{id:f.postId,poster:{version:3,recipe:'showcase',typography:{headline:{fontId:'font-one'}}},assetIds:['original'],foregroundAssetId:'original',backgroundAssetId:'backdrop'}).state;
  const queued = queueJobs(state,{confirmed:true,postIds:[f.postId],requestId:'usable'},options);
  assert.equal(queued.jobs[0].snapshot.fonts[0].id,'font-one'); assert.equal(queued.jobs[0].snapshot.assets.length,2);
  state = cmd(queued.state,'post.save',{id:f.postId,headline:'New draft',foregroundAssetId:''}).state;
  const done = finishJob(state,queued.jobs[0].id,asset(f.companyId,'generated','generated'),options);
  assert.equal(done.design.scene.version,3); assert.equal(done.design.scene.post.backgroundAssetId,'generated');
  assert.equal(done.design.foregroundAssetId,'original'); assert.equal(done.design.scene.fonts[0].id,'font-one');
  assert.equal(done.design.renderReceipt,undefined); assert.equal(done.state.posts[0].backgroundAssetId,'backdrop');
  assert.equal(done.state.posts[0].foregroundAssetId,''); assert.equal(done.state.posts[0].status,'planned');
  assert.throws(() => cmd(done.state,'design.review',{id:done.design.id,reviewed:true}),/receipt/);
});


test('v3 snapshot resource overrides cannot promote differently selected current draft', () => {
  const f = fixture(); let state = addAsset(f.state, asset(f.companyId, 'original-logo', 'logo'));
  state = cmd(state, 'company.save', { id: f.companyId, name: 'Alpha', logoAssetId: 'original-logo' }).state;
  const r = receipt(state); r.manifest.assetReferences.logoAssetId = '';
  const saved = snapshot(state, f.postId, r, { logoAssetId: '' });
  state = cmd(saved.state, 'design.review', { id: saved.id, reviewed: true }).state;
  assert.equal(state.designs[0].reviewed, true); assert.notEqual(state.posts[0].status, 'reviewed');
  assert.throws(() => cmd(state, 'post.status', { id: f.postId, status: 'exported', designId: saved.id, pngSha256: r.pngSha256 }), /changed/);
});
test('stored font binaries cannot alias image records or another imported family', () => {
  const f = fixture(), state = addFont(f.state, font(f.companyId));
  assert.throws(() => addAsset(state, asset(f.companyId, 'font-one-binary', 'product')), /binary identifier/);
  const forged = structuredClone(state); forged.fonts.push({ ...font(f.otherId,'other-font'), faces: structuredClone(state.fonts[0].faces) });
  assert.throws(() => validateState(forged), /binary identifier/);
});


test('explicit role sizes override headline scale and cannot drift in reviewed receipt', () => {
  const f = fixture();
  const state = cmd(f.state, 'post.save', { id: f.postId, poster: { version: 3, scale: 1.15, typography: { headline: { size: 180 }, cta: { size: 38 }, body: { size: 28 } } } }).state;
  assert.equal(snapshot(state, f.postId).state.designs[0].renderReceipt.manifest.fonts.headline.size, 180);
  for (const role of ['headline', 'body', 'cta']) {
    const r = receipt(state); r.manifest.fonts[role].size *= 1.15;
    assert.throws(() => snapshot(state, f.postId, r), /size does not match/);
  }
});


test('all receipt roles reject malformed bundled style files digests and automatic typography', () => {
  const f = fixture();
  for (const role of ['headline', 'body', 'cta', 'kicker', 'brand']) for (const patch of [
    {style:'italic'}, {weight:9999}, {weight:400.5}, {sha256:'not-a-digest'}, {sha256:'d'.repeat(64)},
    {file:'different.woff2'}, {file:''}, {file:'../font.woff2'}, {file:'x'.repeat(181)},
    {size:-1}, {size:0}, {size:401}, {size:'50'}, {lineHeight:0.84}, {lineHeight:2.01},
    {tracking:-0.05}, {tracking:0.21}, {assetId:'not-bundled'},
  ]) {
    const r = receipt(f.state); Object.assign(r.manifest.fonts[role],patch);
    assert.throws(() => snapshot(f.state,f.postId,r),undefined,`${role}: ${JSON.stringify(patch)}`);
  }
});
test('bundled font receipt pins each voice and role to the exact redistributed file', () => {
  const f = fixture();
  for (const voice of ['studio','impact','clean']) {
    const state = cmd(f.state,'post.save',{id:f.postId,poster:{version:3,voice}}).state;
    assert.equal(snapshot(state,f.postId).state.designs[0].renderReceipt.manifest.options.voice,voice);
    const swapped = receipt(state);
    swapped.manifest.fonts.headline = {...swapped.manifest.fonts.body};
    assert.throws(() => snapshot(state,f.postId,swapped),/selected voice and role/);
  }
  const impact = cmd(f.state,'post.save',{id:f.postId,poster:{version:3,voice:'impact'}}).state;
  const r = receipt(impact); r.manifest.fonts.headline.weight = 400;
  assert.throws(() => snapshot(impact,f.postId,r),/weight is unsupported/);
});
test('receipt resolved options are mandatory and reject stale backdrop text scale or nested role edits', () => {
  const f = fixture();
  for (const options of [undefined,null,{}, {...receipt(f.state).manifest.options,scale:0.85},
    {...receipt(f.state).manifest.options,layers:{background:{opacity:0.9,blur:0}}},
    {...receipt(f.state).manifest.options,typography:{headline:{size:120}}},
    {...receipt(f.state).manifest.options,details:{motif:'orbit'}},
  ]) assert.throws(() => snapshot(f.state,f.postId,receipt(f.state,{options})),/options|plain JSON/);
  const reordered = receipt(f.state);
  reordered.manifest.options = Object.fromEntries(Object.entries(reordered.manifest.options).reverse());
  assert.equal(snapshot(f.state,f.postId,reordered).state.designs[0].renderReceipt.pngSha256,reordered.pngSha256);
});
