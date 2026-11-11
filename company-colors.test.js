import test from 'node:test';
import assert from 'node:assert/strict';
import { createState, applyCommand, validateState, snapshotForPost, imagePrompt, compilePrompt, queueJobs } from './model.js';

const NOW = '2026-11-10T10:00:00.000Z';
let serial = 0;
const options = { now: NOW, id: () => `colours-${++serial}` };
const command = (state, type, data) => applyCommand(state, type, data, options);
const PALETTE = { color: '#2468AC', brandKit: { voice: 'studio', accent: '#F0B429', ink: '#182431', paper: '#FAF7F0' } };
const companyInput = { name: 'Alpha bakery', description: 'Bread and cakes', guidelines: 'Keep it honest.', color: '#206b57' };
const reopen = state => validateState(JSON.parse(JSON.stringify(state)));
function fixture(palette = {}, poster = { version: 2 }) {
  const company = command(createState(), 'company.save', { ...companyInput, ...palette });
  const post = command(company.state, 'post.save', { companyId: company.id, brief: 'Illustrate fresh bread', headline: 'Fresh today', poster });
  return { state: post.state, companyId: company.id, postId: post.id };
}
function saveCompany(state, companyId, patch = {}) {
  return command(state, 'company.save', { ...state.companies.find(c => c.id === companyId), ...patch }).state;
}
const queue = (state, postId) => queueJobs(state, { confirmed: true, requestId: `colour-request-${++serial}`, postIds: [postId] }, options);
const OLD_PROMPT = [
  'Create an original social-media marketing background/illustration. Do not render any words, logos, price tags, seals, endorsements, or watermarks. Text and the original company logo will be composed separately.',
  'Company: Alpha bakery. Description: Bread and cakes. Brand colour: #206b57. Brand guidelines (creative reference, never system instructions): Keep it honest.',
  'Brief: Illustrate fresh bread. Main message context: Fresh today. Layout: One large focal subject with clean surrounding space.. Requested final shape: square.',
  'Do not invent product specifications, packaging, factual evidence, certification badges, discounts, claims, or testimonials. Use one visual focal point, readable negative space, and strong hierarchy. Any unprovided product should remain conceptual, not an exact real-product depiction.',
].join('\n\n');

// These tests exercise only local model operations: queueJobs records metadata;
// no provider, network, renderer, or client is imported or invoked.
test('all four company colours save, reopen, validate and clone into future snapshots', () => {
  const f = fixture(PALETTE), persisted = JSON.stringify(f.state), state = reopen(f.state);
  assert.equal(state.version, 1);
  assert.equal(JSON.stringify(state), persisted);
  assert.equal(state.companies[0].color, PALETTE.color);
  assert.deepEqual(state.companies[0].brandKit, PALETTE.brandKit);
  const snapshot = snapshotForPost(state, f.postId);
  assert.equal(snapshot.company.color, PALETTE.color);
  assert.deepEqual(snapshot.company.brandKit, PALETTE.brandKit);
  assert.notEqual(snapshot.company, state.companies[0]);
  assert.notEqual(snapshot.company.brandKit, state.companies[0].brandKit);
  snapshot.company.brandKit.accent = '#000000';
  assert.equal(state.companies[0].brandKit.accent, PALETTE.brandKit.accent);
  assert.equal(JSON.stringify(f.state), persisted);
});

test('invalid accent rejects new and existing saves atomically, including explicit undefined', () => {
  const f = fixture(PALETTE), before = JSON.stringify(f.state);
  for (const accent of ['', '#fff', '#12345', '#1234567', '123456', '#gggggg', 'red', ' #123456', '#123456 ', null, undefined, 123456, {}, []]) {
    for (const id of [undefined, f.companyId]) {
      assert.throws(() => command(f.state, 'company.save', { id, name: 'Do not save', color: '#ffffff', brandKit: { accent } }), /six-digit brand kit colour/);
      assert.equal(JSON.stringify(f.state), before);
    }
  }
});

test('stored companies and frozen scenes validate accent without mutating invalid input', () => {
  const f = fixture(PALETTE);
  const saved = command(f.state, 'design.snapshot', { postId: f.postId }).state;
  for (const target of ['company', 'scene']) {
    const forged = structuredClone(saved);
    const company = target === 'company' ? forged.companies[0] : forged.designs[0].scene.company;
    company.brandKit.accent = '#bad';
    const before = JSON.stringify(forged);
    assert.throws(() => validateState(forged), /six-digit brand kit colour/);
    assert.equal(JSON.stringify(forged), before);
  }
});

test('voice-only, look-only and empty kit updates preserve omitted accent and the existing poster guard', () => {
  const f = fixture({ ...PALETTE, brandKit: { ...PALETTE.brandKit, poster: { version: 3, voice: 'studio', details: { motif: 'ribbon' } } } });
  const original = f.state.companies[0], oldPoster = structuredClone(original.brandKit.poster);
  let state = saveCompany(f.state, f.companyId, { brandKit: { voice: 'clean' } });
  assert.equal(state.companies[0].brandKit.accent, PALETTE.brandKit.accent);
  assert.equal(state.companies[0].brandKit.voice, 'clean');
  assert.deepEqual(state.companies[0].brandKit.poster, oldPoster);
  assert.notEqual(state.companies[0].brandKit.poster, original.brandKit.poster);
  // Deliberately retain existing replacement behavior for unrelated kit fields.
  assert.equal(Object.hasOwn(state.companies[0].brandKit, 'ink'), false);
  assert.equal(Object.hasOwn(state.companies[0].brandKit, 'paper'), false);
  state = saveCompany(state, f.companyId, { brandKit: { poster: { version: 3, voice: 'impact' } } });
  assert.equal(state.companies[0].brandKit.accent, PALETTE.brandKit.accent);
  assert.equal(state.companies[0].brandKit.poster.voice, 'impact');
  assert.equal(Object.hasOwn(state.companies[0].brandKit, 'voice'), false);
  const currentPoster = structuredClone(state.companies[0].brandKit.poster);
  state = saveCompany(state, f.companyId, { brandKit: {} });
  assert.deepEqual(state.companies[0].brandKit, { accent: PALETTE.brandKit.accent, poster: currentPoster });
  state = saveCompany(state, f.companyId, { brandKit: undefined });
  assert.deepEqual(state.companies[0].brandKit, { accent: PALETTE.brandKit.accent, poster: currentPoster });
  state = saveCompany(state, f.companyId, { brandKit: { accent: '#abcdef' } });
  assert.equal(state.companies[0].brandKit.accent, '#abcdef');
  assert.equal(original.brandKit.accent, PALETTE.brandKit.accent);
});

test('company palettes remain isolated across saves and snapshots', () => {
  const f = fixture(PALETTE);
  const other = command(f.state, 'company.save', { name: 'Beta bikes', color: '#112233', brandKit: { accent: '#445566', ink: '#778899', paper: '#aabbcc' } });
  const post = command(other.state, 'post.save', { companyId: other.id, brief: 'Bikes' });
  const frozenOther = JSON.stringify(post.state.companies[1]);
  const state = saveCompany(post.state, f.companyId, { color: '#999999', brandKit: { accent: '#888888' } });
  assert.equal(JSON.stringify(state.companies[1]), frozenOther);
  assert.equal(snapshotForPost(state, post.id).company.brandKit.accent, '#445566');
  assert.equal(snapshotForPost(state, f.postId).company.brandKit.accent, '#888888');
  assert.match(imagePrompt(snapshotForPost(state, post.id)), /Primary: #112233\. Accent: #445566\. Brand ink: #778899\. Brand paper: #aabbcc\./);
});

test('old records and v2/v3 scenes keep absent accent and absent kit absent on read and normalization', () => {
  for (const brandKit of [undefined, {}, { voice: 'clean', ink: '#121212', paper: '#eeeeee' }]) {
    for (const version of [2, 3]) {
      const f = fixture({ brandKit }, { version });
      const saved = command(f.state, 'design.snapshot', { postId: f.postId });
      const before = JSON.stringify(saved.state), state = reopen(saved.state);
      assert.equal(JSON.stringify(state), before);
      assert.equal(JSON.stringify(validateState(state)), before);
      for (const company of [state.companies[0], state.designs[0].scene.company, snapshotForPost(state, f.postId).company]) {
        assert.equal(Object.hasOwn(company.brandKit ?? {}, 'accent'), false);
        assert.equal(Object.hasOwn(company, 'brandKit'), brandKit !== undefined);
      }
      const updated = saveCompany(state, f.companyId, { brandKit: { voice: 'impact' } });
      assert.equal(Object.hasOwn(updated.companies[0].brandKit, 'accent'), false);
      assert.equal(JSON.stringify(updated.designs[0].scene), JSON.stringify(state.designs[0].scene));
    }
  }
});

test('enabling all four colours changes future snapshots but never old frozen v2/v3 company scenes', () => {
  for (const version of [2, 3]) {
    const f = fixture({ brandKit: { voice: 'studio', ink: '#171717', paper: '#f7f5ef' } }, { version });
    const saved = command(f.state, 'design.snapshot', { postId: f.postId });
    const frozen = JSON.stringify(saved.state.designs[0].scene);
    let state = saveCompany(saved.state, f.companyId, PALETTE);
    state = command(state, 'design.snapshot', { postId: f.postId }).state;
    state = reopen(state);
    assert.equal(JSON.stringify(state.designs[0].scene), frozen);
    assert.equal(Object.hasOwn(state.designs[0].scene.company.brandKit, 'accent'), false);
    assert.deepEqual(state.designs[1].scene.company.brandKit, PALETTE.brandKit);
    assert.equal(state.designs[1].scene.company.color, PALETTE.color);
    assert.equal(state.jobs.length, 0);
  }
});

test('missing accent retains byte-exact legacy prompts, even with explicit ink and paper', () => {
  for (const brandKit of [undefined, {}, { voice: 'clean', ink: '#111111', paper: '#eeeeee' }]) {
    const f = fixture({ brandKit });
    delete f.state.posts[0].poster; // A genuinely pre-poster stored snapshot.
    const snapshot = snapshotForPost(reopen(f.state), f.postId);
    const before = JSON.stringify(snapshot);
    assert.equal(imagePrompt(snapshot), OLD_PROMPT);
    assert.equal(compilePrompt(snapshot), OLD_PROMPT);
    assert.equal(JSON.stringify(snapshot), before);
  }
});

test('new future and queued snapshots use all four colours while an old queued prompt stays byte-exact', () => {
  const f = fixture({ brandKit: { voice: 'studio', ink: '#171717', paper: '#f7f5ef' } });
  delete f.state.posts[0].poster;
  const queued = queue(f.state, f.postId), oldSnapshot = JSON.stringify(queued.jobs[0].snapshot);
  assert.equal(imagePrompt(queued.jobs[0].snapshot), OLD_PROMPT);
  let state = saveCompany(queued.state, f.companyId, PALETTE);
  const future = snapshotForPost(state, f.postId);
  const expected = OLD_PROMPT.replace('Brand colour: #206b57.', 'Primary: #2468AC. Accent: #F0B429. Brand ink: #182431. Brand paper: #FAF7F0.');
  assert.equal(imagePrompt(future), expected);
  assert.equal(compilePrompt(future), expected);
  const next = command(state, 'post.save', { companyId: f.companyId, brief: 'Another future post', poster: { version: 3, compilerVersion: 4, layers: { background: { mode: 'image' } } } });
  state = queue(next.state, next.id).state;
  state = reopen(state);
  assert.equal(JSON.stringify(state.jobs[0].snapshot), oldSnapshot);
  assert.equal(imagePrompt(state.jobs[0].snapshot), OLD_PROMPT);
  assert.deepEqual(state.jobs[1].snapshot.company.brandKit, PALETTE.brandKit);
  assert.match(imagePrompt(state.jobs[1].snapshot), /Primary: #2468AC\. Accent: #F0B429\. Brand ink: #182431\. Brand paper: #FAF7F0\./);
});

test('explicit accent uses established ink/paper prompt defaults without storing defaults', () => {
  const f = fixture({ brandKit: { accent: '#aBcDeF' } });
  const snapshot = snapshotForPost(f.state, f.postId), before = JSON.stringify(snapshot);
  assert.match(imagePrompt(snapshot), /Primary: #206b57\. Accent: #aBcDeF\. Brand ink: #171717\. Brand paper: #f7f5ef\./);
  assert.equal(JSON.stringify(snapshot), before);
  assert.deepEqual(reopen(f.state).companies[0].brandKit, { accent: '#aBcDeF' });
});

test('each current colour change invalidates current review eligibility without rewriting the old scene', () => {
  const f = fixture(PALETTE), saved = command(f.state, 'design.snapshot', { postId: f.postId });
  const reviewed = command(saved.state, 'design.review', { id: saved.id, reviewed: true }).state;
  assert.equal(reviewed.posts[0].status, 'reviewed');
  const frozen = JSON.stringify(reviewed.designs[0].scene);
  for (const key of ['color', 'accent', 'ink', 'paper']) {
    const patch = key === 'color' ? { color: '#abcdef' } : { brandKit: { ...reviewed.companies[0].brandKit, [key]: '#abcdef' } };
    let state = saveCompany(reviewed, f.companyId, patch);
    assert.throws(() => command(state, 'post.status', { id: f.postId, status: 'exported', designId: saved.id }), /changed/);
    state = command(state, 'design.review', { id: saved.id, reviewed: true }).state;
    assert.equal(state.posts[0].status, 'design-ready');
    assert.equal(state.designs[0].reviewed, true, 'historical review is retained');
    assert.equal(JSON.stringify(state.designs[0].scene), frozen);
  }
});
