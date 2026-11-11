import test from 'node:test';
import assert from 'node:assert/strict';
import { createState, validateState, applyCommand, queueJobs, updateJob, finishJob, recoverJobs, addAsset, compilePrompt, snapshotForPost, generationSize, localDate } from './model.js';

const NOW = '2026-11-10T10:00:00.000Z';
let count = 0;
const options = { now: NOW, id: () => `test-${++count}` };
function command(state, type, data) { return applyCommand(state, type, data, options); }
function fixture() {
  let state = createState();
  const a = command(state, 'company.save', { name: 'Alpha bakery', description: 'Bread and cakes', timezone: 'Africa/Kampala', color: '#206b57' }); state = a.state;
  const b = command(state, 'company.save', { name: 'Beta bikes', timezone: 'UTC' }); state = b.state;
  const c = command(state, 'campaign.save', { companyId: a.id, name: 'Bread launch', goal: 'Introduce our bread', postsPerWeek: 2, offer: 'Weekend selection', offerExpiry: '2026-12-01', status: 'active' }); state = c.state;
  const d = command(state, 'campaign.save', { companyId: a.id, name: 'Baking tips', goal: 'Explain baking', postsPerWeek: 1 }); state = d.state;
  return { state, companyA: a.id, companyB: b.id, campaignA: c.id, campaignB: d.id };
}
function planned() {
  const f = fixture();
  const plan = command(f.state, 'plan.ensure', { campaignId: f.campaignA, week: '2026-11-09', focus: 'Fresh bread' });
  // Existing regression cases exercise pre-v2 stored posts, not an implicit upgrade.
  for (const post of plan.state.posts) delete post.poster;
  return { ...f, state: plan.state, planId: plan.planId, postId: plan.state.posts[0].id };
}
const request = postIds => ({ postIds, requestId: `request-${++count}`, confirmed: true });
function imageMeta(companyId, id = `asset-${++count}`, role = 'generated') {
  return { id, companyId, name: 'Saved image', role, mime: 'image/png', bytes: 100, createdAt: NOW };
}

test('initial state validates, with no image bytes or credentials', () => {
  const state = createState(); assert.equal(validateState(state), state); assert.equal(state.settings.model, 'gpt-image-2.6-flare');
  assert.equal(JSON.stringify(state).includes('data:image'), false);
});
test('week plan is idempotent, preserves user edits, and does not request images', () => {
  const f = planned();
  const edited = command(f.state, 'post.save', { id: f.postId, headline: 'Approved exact words' });
  const again = command(edited.state, 'plan.ensure', { campaignId: f.campaignA, week: '2026-11-09', focus: 'Should not replace' });
  assert.equal(again.planId, f.planId); assert.equal(again.state, edited.state); assert.equal(again.state.posts.length, 2);
  assert.equal(again.state.posts[0].headline, 'Approved exact words'); assert.equal(again.state.jobs.length, 0);
});
test('separate weeks and campaigns get their own posts without changing previous ones', () => {
  const f = planned();
  const next = command(f.state, 'plan.ensure', { campaignId: f.campaignA, week: '2026-11-16' });
  const other = command(next.state, 'plan.ensure', { campaignId: f.campaignB, week: '2026-11-09' });
  assert.equal(other.state.plans.length, 3); assert.equal(other.state.posts.length, 5);
  assert.equal(other.state.posts.filter(p => p.planId === f.planId).length, 2); assert.equal(f.state.plans.length, 1);
});
test('post campaign and plan cannot cross company boundaries', () => {
  const f = planned();
  assert.throws(() => command(f.state, 'post.save', { companyId: f.companyB, campaignId: f.campaignA, brief: 'Invalid cross-company request' }), /another company/);
  assert.throws(() => command(f.state, 'post.save', { companyId: f.companyA, campaignId: f.campaignB, planId: f.planId, brief: 'Bad plan relationship' }), /another campaign/);
  assert.throws(() => command(f.state, 'post.save', { id: f.postId, companyId: f.companyB }), /another company/);
});
test('asset ownership is enforced even when an identifier is known', () => {
  const f = planned(), asset = imageMeta(f.companyB, undefined, 'product');
  const state = addAsset(f.state, asset);
  assert.throws(() => command(state, 'post.save', { id: f.postId, assetIds: [asset.id] }), /another company/);
  assert.throws(() => command(state, 'company.save', { id: f.companyA, name: 'Alpha', logoAssetId: asset.id }), /another company/);
});
test('generation requires explicit consent and has bounded nonduplicate selections', () => {
  const f = planned();
  assert.throws(() => queueJobs(f.state, { postIds: [f.postId], requestId: 'req', confirmed: false }, options), /Confirm/);
  assert.throws(() => queueJobs(f.state, request([f.postId, f.postId]), options), /different posts/);
  assert.throws(() => queueJobs(f.state, request(Array.from({length:9},(_,i)=>`p-${i}`)), options), /1–8/);
});
test('request identifiers deduplicate paid jobs and cannot be reused for another selection', () => {
  const f = planned(), req = request([f.postId]);
  const first = queueJobs(f.state, req, options); const again = queueJobs(first.state, req, options);
  assert.equal(again.existing, true); assert.equal(again.state.jobs.length, 1); assert.equal(again.jobs[0].id, first.jobs[0].id);
  assert.throws(() => queueJobs(first.state, { ...req, postIds: [f.state.posts[1].id] }, options), /different selection/);
  assert.throws(() => queueJobs(first.state, request([f.postId]), options), /already has/);
});
test('paused campaigns do not queue paid work or create new weeks', () => {
  const f = planned(), paused = command(f.state, 'campaign.status', { id: f.campaignA, status: 'paused' });
  assert.throws(() => queueJobs(paused.state, request([f.postId]), options), /not active/);
  assert.throws(() => command(paused.state, 'plan.ensure', { campaignId: f.campaignA, week: '2026-11-16' }), /Activate/);
  const existing = command(paused.state, 'plan.ensure', { campaignId: f.campaignA, week: '2026-11-09' }); assert.equal(existing.planId, f.planId);
});
test('expired offers cannot be used now or for a later intended date', () => {
  const f = planned();
  assert.throws(() => queueJobs(f.state, request([f.postId]), { ...options, now: '2026-12-02T00:00:00Z' }), /expires/);
  const future = command(f.state, 'post.save', { id: f.postId, intendedDate: '2026-12-02' });
  assert.throws(() => queueJobs(future.state, request([f.postId]), options), /expires/);
});
test('job snapshots do not change when the company, campaign or post is edited', () => {
  const f = planned(), queued = queueJobs(f.state, request([f.postId]), options), frozen = JSON.stringify(queued.jobs[0].snapshot);
  let state = command(queued.state, 'company.save', { id: f.companyA, name: 'New business name', guidelines: 'New rules' }).state;
  state = command(state, 'post.save', { id: f.postId, headline: 'Changed message' }).state;
  state = command(state, 'campaign.save', { id: f.campaignA, companyId: f.companyA, name: 'Changed campaign', goal: 'Changed goal' }).state;
  assert.equal(JSON.stringify(state.jobs[0].snapshot), frozen); assert.equal(state.jobs[0].snapshot.company.name, 'Alpha bakery');
});
test('generated output stays bound to its origin and uses exact snapshot wording', () => {
  const f = planned();
  const edited = command(f.state, 'post.save', { id: f.postId, headline: 'Weekend bread', body: 'Exact supporting copy', cta: 'Visit us' });
  const queued = queueJobs(edited.state, request([f.postId]), options);
  const result = finishJob(queued.state, queued.jobs[0].id, imageMeta(f.companyA), options);
  assert.equal(result.design.postId, f.postId); assert.equal(result.design.companyId, f.companyA); assert.equal(result.design.headline, 'Weekend bread');
  assert.equal(result.design.reviewed, false); assert.equal(result.state.jobs[0].status, 'succeeded'); assert.equal(result.state.posts[0].status, 'design-ready');
});
test('local compositor edits make no new job and reset exact-version review', () => {
  const f = planned(), queued = queueJobs(f.state, request([f.postId]), options);
  const done = finishJob(queued.state, queued.jobs[0].id, imageMeta(f.companyA), options);
  const reviewed = command(done.state, 'design.review', { id: done.design.id, reviewed: true });
  const edited = command(reviewed.state, 'design.save', { id: done.design.id, headline: 'New words', format: 'story', cropX: 0.7, cropY: 0.2 });
  assert.equal(edited.state.designs[0].reviewed, false); assert.equal(edited.state.designs[0].format, 'story');
  assert.equal(edited.state.jobs.length, 1); assert.equal(reviewed.state.designs[0].reviewed, true);
  assert.throws(() => command(edited.state, 'design.save', { id: done.design.id, cropX: 2 }), /between/);
});
test('unchanged autosave preserves reviewed/exported status while a content edit resets it', () => {
  const f = planned(), queued = queueJobs(f.state, request([f.postId]), options);
  const done = finishJob(queued.state, queued.jobs[0].id, imageMeta(f.companyA), options);
  let state = command(done.state, 'design.review', {id:done.design.id,reviewed:true}).state;
  state = command(state, 'post.save', {...state.posts[0]}).state;
  assert.equal(state.posts[0].status, 'reviewed');
  state = command(state, 'post.status', {id:f.postId,status:'exported'}).state;
  state = command(state, 'post.save', {...state.posts[0]}).state;
  assert.equal(state.posts[0].status, 'exported');
  assert.equal(command(state, 'post.save', {id:f.postId,headline:'Changed copy'}).state.posts[0].status, 'planned');
});
test('an expired offer blocks a new export but does not rewrite historical images', () => {
  const f = planned(), queued = queueJobs(f.state, request([f.postId]), options);
  const done = finishJob(queued.state, queued.jobs[0].id, imageMeta(f.companyA), options);
  assert.throws(() => applyCommand(done.state, 'post.status', {id:f.postId,status:'exported'}, {...options, now:'2026-12-03T10:00:00Z'}), /expired/);
  assert.equal(done.state.designs.length,1);
});
test('restart does not replay jobs, running becomes unknown and queued becomes safely failed', () => {
  const f = planned(), queued = queueJobs(f.state, request(f.state.posts.map(p => p.id)), options);
  const running = updateJob(queued.state, queued.jobs[0].id, { status: 'running' });
  const recovered = recoverJobs(running, NOW);
  assert.equal(recovered.jobs[0].status, 'unknown'); assert.equal(recovered.jobs[1].status, 'failed'); assert.equal(recovered.jobs.length, 2);
  assert.equal(recoverJobs(recovered, NOW), recovered);
  assert.throws(() => queueJobs(recovered, request([f.postId]), options), /unresolved/);
});
test('busy companies and posts cannot be archived or deleted', () => {
  const f = planned(), queued = queueJobs(f.state, request([f.postId]), options);
  assert.throws(() => command(queued.state, 'company.archive', { id: f.companyA }), /Wait/);
  assert.throws(() => command(queued.state, 'post.delete', { id: f.postId }), /Resolve/);
});
test('one-off path, supported settings, safe dates and time zones validate', () => {
  const f = fixture();
  const post = command(f.state, 'post.save', { companyId: f.companyA, brief: 'Illustrate our bakery', format: 'portrait', direction: 'lifestyle', poster: { version: 3, compilerVersion: 4, layers: { background: { mode: 'image' } } } });
  assert.equal(post.state.posts[0].campaignId, ''); assert.equal(queueJobs(post.state, request([post.id]), options).jobs.length, 1);
  assert.throws(() => command(f.state, 'settings.save', { model: 'https://attacker.test' }), /GPT Image/);
  assert.throws(() => command(f.state, 'company.save', { name: 'Bad zone', timezone: '../../etc' }), /time zone/);
  assert.throws(() => command(f.state, 'plan.ensure', { campaignId: f.campaignA, week: '2026-02-30' }), /valid date/);
  assert.equal(localDate('Africa/Kampala', '2026-11-09T22:00:00Z'), '2026-11-10');
});
test('prompt avoids fake claims and supported sizes never pretend arbitrary aspect generation', () => {
  const f = planned(), prompt = compilePrompt(snapshotForPost(f.state, f.postId));
  assert.match(prompt, /Do not render any words/); assert.match(prompt, /Do not invent product/);
  assert.equal(generationSize('square'), '1024x1024'); assert.equal(generationSize('story'), '1024x1536'); assert.equal(generationSize('landscape'), '1536x1024');
});
test('original product assets remain local, unsupported style-reference influence is refused', () => {
  const f = planned(); let state = addAsset(f.state, imageMeta(f.companyA, 'product-photo', 'product'));
  state = command(state, 'post.save', { id: f.postId, assetIds: ['product-photo'] }).state;
  const queued = queueJobs(state, request([f.postId]), options), done = finishJob(queued.state, queued.jobs[0].id, imageMeta(f.companyA), options);
  assert.equal(done.design.productAssetId, 'product-photo');
  state = addAsset(f.state, imageMeta(f.companyA, 'style-photo', 'reference'));
  state = command(state, 'post.save', { id: f.postId, assetIds: ['style-photo'] }).state;
  assert.throws(() => queueJobs(state, request([f.postId]), options), /Style-reference/);
});


function v2Fixture() {
  const f = fixture();
  const created = command(f.state, 'post.save', { companyId: f.companyA, campaignId: f.campaignA, poster: { version: 2 }, headline: 'Websites That\nMean Business', brief: 'A conceptual sculpture', body: 'Exact words', cta: 'Visit us' });
  return { ...f, state: created.state, postId: created.id };
}
function snapshot(state, postId, overrides = {}) { return command(state, 'design.snapshot', { postId, ...overrides }); }

test('v3 new defaults and company voice/v2 campaign look inherit only into new posts; old state remains version 1', () => {
  const f = fixture();
  let state = command(f.state, 'company.save', { id: f.companyA, name: 'Alpha', brandKit: { voice: 'impact', ink: '#121212', paper: '#fefefe' } }).state;
  const first = command(state, 'post.save', { companyId: f.companyA, campaignId: f.campaignA }); state = first.state;
  assert.equal(state.posts[0].poster.voice, 'impact'); assert.equal(state.posts[0].poster.version, 3);
  state = command(state, 'campaign.artDirection', { id: f.campaignA, poster: { version: 2, recipe: 'editorial', voice: 'clean', formats: { story: { cropX: 0.1 } } } }).state;
  const next = command(state, 'post.save', { companyId: f.companyA, campaignId: f.campaignA }); state = next.state;
  assert.equal(state.posts[1].poster.recipe, 'editorial'); assert.equal(state.posts[1].poster.voice, 'clean');
  assert.equal(state.posts[0].poster.voice, 'impact'); assert.equal(state.jobs.length, 0); assert.equal(state.version, 1);
  const plan = command(state, 'plan.ensure', { campaignId: f.campaignA, week: '2026-11-09' });
  assert.equal(plan.state.posts.at(-1).poster.recipe, 'editorial');
  const duplicate = command(plan.state, 'campaign.duplicate', { id: f.campaignA });
  assert.deepEqual(duplicate.state.campaigns.at(-1).artDirection, state.campaigns[0].artDirection);
  assert.deepEqual(command(duplicate.state, 'campaign.save', { ...duplicate.state.campaigns[0], artDirection: undefined }).state.campaigns[0].artDirection, state.campaigns[0].artDirection);
  delete state.posts[0].poster;
  assert.equal(validateState(state), state);
  const legacySaved = command(state, 'post.save', { id: first.id, headline: 'Still legacy' });
  assert.equal('poster' in legacySaved.state.posts[0], false);
  const upgraded = command(legacySaved.state, 'post.save', { id: first.id, poster: { version: 2, recipe: 'showcase' } });
  assert.equal(upgraded.state.posts[0].poster.recipe, 'showcase'); assert.equal('poster' in legacySaved.state.posts[0], false);
});

test('brand kit limits, malformed poster options and generated background ownership/roles are enforced atomically', () => {
  const f = v2Fixture(); let state = addAsset(f.state, imageMeta(f.companyA, 'own-background'));
  state = addAsset(state, imageMeta(f.companyB, 'foreign-background'));
  state = addAsset(state, imageMeta(f.companyA, 'own-product', 'product'));
  for (const kit of [null, [], { voice: 'unknown' }, { ink: '#fff' }, { paper: 'red' }, { ink: 'x'.repeat(5000) }, { fonts: [] }]) {
    assert.throws(() => command(state, 'company.save', { id: f.companyA, name: 'Alpha', brandKit: kit }));
  }
  for (const poster of [null, [], { recipe: 'bad' }, { cropX: 5 }, { formats: { story: { version: 2 } } }]) {
    assert.throws(() => command(state, 'post.save', { id: f.postId, poster }));
    assert.throws(() => command(state, 'campaign.artDirection', { id: f.campaignA, poster }));
    assert.throws(() => snapshot(state, f.postId, { poster }));
  }
  assert.throws(() => command(state, 'post.save', { id: f.postId, backgroundAssetId: 'foreign-background' }), /another company/);
  assert.throws(() => command(state, 'post.save', { id: f.postId, backgroundAssetId: 'own-product' }), /role/);
  state = command(state, 'post.save', { id: f.postId, backgroundAssetId: 'own-background' }).state;
  const saved = snapshot(state, f.postId);
  assert.equal(saved.state.designs[0].assetId, 'own-background');
  assert.equal(saved.state.designs[0].scene.post.backgroundAssetId, 'own-background');
  assert.equal(command(saved.state, 'post.save', { id: f.postId, backgroundAssetId: '' }).state.posts[0].status, 'planned');
  assert.equal(f.state.designs.length, 0); assert.equal(f.state.jobs.length, 0);
});

test('type-only snapshots freeze company, words, ratio, poster and effective asset choices without jobs', () => {
  const f = v2Fixture(); let state = addAsset(f.state, imageMeta(f.companyA, 'original-logo', 'logo'));
  state = addAsset(state, imageMeta(f.companyA, 'original-screen', 'product'));
  state = command(state, 'company.save', { id: f.companyA, name: 'Alpha', logoAssetId: 'original-logo', brandKit: { voice: 'clean', ink: '#121212', paper: '#ffffff' } }).state;
  state = command(state, 'post.save', { id: f.postId, assetIds: ['original-screen'], poster: { version: 2, formats: { story: { cropX: 0.8, cropY: 0.2, heroScale: 1.1 } } } }).state;
  const first = snapshot(state, f.postId, { format: 'story', headline: 'Frozen\nHeadline' });
  const design = first.state.designs[0], frozen = JSON.stringify(design.scene);
  assert.equal(first.id, design.id); assert.equal(design.assetId, ''); assert.equal(design.logoAssetId, 'original-logo');
  assert.equal(design.productAssetId, 'original-screen'); assert.equal(design.scene.post.productAssetId, 'original-screen');
  assert.equal(design.scene.post.headline, 'Frozen\nHeadline'); assert.equal(design.scene.post.format, 'story');
  assert.equal(design.cropX, 0.8); assert.equal(design.cropY, 0.2); assert.equal(design.reviewed, false);
  assert.equal(first.state.jobs.length, 0); assert.equal(first.state.assets.length, 2);
  state = command(first.state, 'design.review', { id: design.id, reviewed: true }).state;
  assert.notEqual(state.posts[0].status, 'reviewed', 'an override scene does not bless different saved words/ratio');
  state = command(state, 'company.save', { id: f.companyA, name: 'Changed brand', color: '#ff8800' }).state;
  state = command(state, 'post.save', { id: f.postId, headline: 'Changed copy', poster: { recipe: 'editorial' } }).state;
  assert.equal(JSON.stringify(state.designs[0].scene), frozen); assert.equal(state.designs[0].reviewed, true);
  assert.throws(() => command(state, 'design.save', { id: design.id, headline: 'Mutate history' }), /immutable/);
  const second = snapshot(state, f.postId);
  assert.notEqual(second.id, first.id); assert.equal(second.state.designs[1].reviewed, false);
  assert.equal(JSON.stringify(second.state.designs[0].scene), frozen);
});

test('snapshot ownership and all effective asset roles are validated, including forged stored scenes', () => {
  const f = v2Fixture(); let state = f.state;
  for (const [id, company, role] of [['foreign', f.companyB, 'generated'], ['foreign-logo', f.companyB, 'logo'], ['product', f.companyA, 'product'], ['logo', f.companyA, 'logo']]) state = addAsset(state, imageMeta(company, id, role));
  for (const overrides of [{ assetId: 'foreign' }, { logoAssetId: 'foreign-logo' }, { productAssetId: 'foreign' }]) assert.throws(() => snapshot(state, f.postId, overrides), /another company/);
  for (const overrides of [{ assetId: 'logo' }, { logoAssetId: 'product' }, { productAssetId: 'logo' }]) assert.throws(() => snapshot(state, f.postId, overrides), /role/);
  const saved = snapshot(state, f.postId, { logoAssetId: '', productAssetId: '' }).state;
  const tampered = structuredClone(saved); tampered.designs[0].scene.company.id = f.companyB;
  assert.throws(() => validateState(tampered), /ownership/);
  const forged = structuredClone(saved); forged.designs[0].scene.post.poster = undefined;
  assert.throws(() => validateState(forged), /poster/);
  const missing = structuredClone(saved); delete missing.designs[0].scene;
  assert.throws(() => validateState(missing), /identifier/);
});

test('v2 review/export is version-specific, stale edits and brand changes invalidate readiness, unchanged saves preserve status', () => {
  const f = v2Fixture(), snap = snapshot(f.state, f.postId);
  assert.throws(() => command(snap.state, 'post.status', { id: f.postId, status: 'exported', designId: snap.id }), /Review/);
  assert.throws(() => command(snap.state, 'post.status', { id: f.postId, status: 'exported' }), /specific reviewed/);
  let state = command(snap.state, 'design.review', { id: snap.id, reviewed: true }).state;
  assert.equal(state.posts[0].status, 'reviewed');
  state = command(state, 'post.status', { id: f.postId, status: 'exported', designId: snap.id }).state;
  state = command(state, 'post.save', { ...state.posts[0] }).state; assert.equal(state.posts[0].status, 'exported');
  const unchanged = state;
  for (const overrides of [{ headline: 'Changed' }, { poster: { ...state.posts[0].poster, cropX: 0.7 } }, { poster: { ...state.posts[0].poster, formats: { story: { cropY: 0.1 } } } }, { brief: 'Different brief' }]) {
    state = command(unchanged, 'post.save', { id: f.postId, ...overrides }).state;
    assert.equal(state.posts[0].status, 'planned'); assert.equal(state.designs[0].reviewed, true);
    assert.throws(() => command(state, 'post.status', { id: f.postId, status: 'exported', designId: snap.id }), /changed/);
    state = command(state, 'design.review', { id: snap.id, reviewed: true }).state;
    assert.notEqual(state.posts[0].status, 'reviewed');
  }
  state = command(unchanged, 'company.save', { id: f.companyA, name: 'New brand', color: '#ff8800' }).state;
  assert.throws(() => command(state, 'post.status', { id: f.postId, status: 'exported', designId: snap.id }), /changed/);
  const other = command(unchanged, 'post.save', { companyId: f.companyB, headline: 'Other company', poster: { version: 2 } });
  const otherSnap = snapshot(other.state, other.id);
  assert.throws(() => command(otherSnap.state, 'post.status', { id: f.postId, status: 'exported', designId: otherSnap.id }), /this post/);
});

test('v2 generation freezes queued company/post and effective assets while stale output never reviews current draft', () => {
  const f = v2Fixture(); let state = addAsset(f.state, imageMeta(f.companyA, 'logo', 'logo'));
  state = command(state, 'company.save', { id: f.companyA, name: 'Original brand', logoAssetId: 'logo' }).state;
  state = command(state, 'post.save', { id: f.postId, format: 'story', poster: { version: 2, recipe: 'hero', formats: { story: { cropX: 0.2, cropY: 0.9 } } } }).state;
  const queued = queueJobs(state, request([f.postId]), options);
  state = command(queued.state, 'company.save', { id: f.companyA, name: 'New brand', color: '#ff8800' }).state;
  state = command(state, 'post.save', { id: f.postId, headline: 'Later words' }).state;
  const done = finishJob(state, queued.jobs[0].id, imageMeta(f.companyA), options);
  assert.equal(done.design.scene.company.name, 'Original brand'); assert.equal(done.design.scene.post.headline, 'Websites That\nMean Business');
  assert.equal(done.design.scene.post.logoAssetId, 'logo'); assert.equal(done.design.scene.post.assetId, done.design.assetId);
  assert.equal(done.design.cropX, 0.2); assert.equal(done.design.cropY, 0.9); assert.equal(done.state.posts[0].status, 'planned');
  assert.throws(() => command(done.state, 'design.save', { id: done.design.id, cropX: 0.8 }), /immutable/);
  assert.notEqual(command(done.state, 'design.review', { id: done.design.id, reviewed: true }).state.posts[0].status, 'reviewed');
});

test('recipe-specific v2 commissioning preserves protected originals and v1 prompt remains unchanged', () => {
  const f = v2Fixture(); const prompts = [];
  for (const recipe of ['hero', 'showcase', 'editorial']) {
    const state = command(f.state, 'post.save', { id: f.postId, poster: { recipe } }).state;
    const prompt = compilePrompt(snapshotForPost(state, f.postId)); prompts.push(prompt);
    assert.match(prompt, new RegExp(`recipe ${recipe}`)); assert.match(prompt, /protected local layers/); assert.match(prompt, /Do not render any words/);
  }
  assert.match(prompts[0], /subject on the right/); assert.match(prompts[1], /Do not redraw or invent a website/); assert.match(prompts[2], /structured information/);
  const legacy = planned(), oldPrompt = compilePrompt(snapshotForPost(legacy.state, legacy.postId));
  assert.equal(oldPrompt.includes('V2 commissioned'), false); assert.match(oldPrompt, /Layout: One large focal subject/);
});


test('legacy post crop autosave persists across reload, validates bounds and invalidates status only on change', () => {
  const f = planned(), queued = queueJobs(f.state, request([f.postId]), options);
  const done = finishJob(queued.state, queued.jobs[0].id, imageMeta(f.companyA), options);
  let state = command(done.state, 'design.review', { id: done.design.id, reviewed: true }).state;
  const noCrop = command(state, 'post.save', { id: f.postId });
  assert.equal('cropX' in noCrop.state.posts[0], false); assert.equal(noCrop.state.posts[0].status, 'reviewed');
  state = command(state, 'post.save', { id: f.postId, cropX: 0.75 }).state;
  assert.equal(state.posts[0].cropX, 0.75); assert.equal(state.posts[0].status, 'planned'); assert.equal(state.designs[0].reviewed, true);
  const reloaded = JSON.parse(JSON.stringify(state)); assert.equal(validateState(reloaded), reloaded);
  assert.equal(reloaded.posts[0].cropX, 0.75); assert.equal('poster' in reloaded.posts[0], false);
  state = command(reloaded, 'design.review', { id: done.design.id, reviewed: true }).state;
  assert.equal(command(state, 'post.save', { id: f.postId, cropX: 0.75 }).state.posts[0].status, 'reviewed');
  assert.equal(command(state, 'post.save', { id: f.postId, cropX: 0 }).state.posts[0].cropX, 0);
  assert.equal(command(state, 'post.save', { id: f.postId, cropX: 1 }).state.posts[0].cropX, 1);
  for (const cropX of [-0.01, 1.01, '0.5', null, NaN, Infinity]) {
    assert.throws(() => command(state, 'post.save', { id: f.postId, cropX }), /between 0 and 1/);
    const forged = structuredClone(state); forged.posts[0].cropX = cropX;
    assert.throws(() => validateState(forged), /between 0 and 1/);
  }
  const again = queueJobs(state, request([f.postId]), options);
  assert.equal(finishJob(again.state, again.jobs.at(-1).id, imageMeta(f.companyA), options).design.cropX, 0.75);
});

test('effective editorial recipes block paid queue atomically, including weekly batches and format overrides', () => {
  const f = v2Fixture();
  const editorial = command(f.state, 'post.save', { companyId: f.companyA, campaignId: f.campaignA, brief: 'Helpful guidance', poster: { recipe: 'editorial' } });
  const before = JSON.stringify(editorial.state);
  assert.throws(() => queueJobs(editorial.state, request([editorial.id]), options), /type-only/);
  assert.throws(() => queueJobs(editorial.state, request([f.postId, editorial.id]), options), /type-only/);
  assert.equal(JSON.stringify(editorial.state), before); assert.equal(editorial.state.jobs.length, 0);
  const storyEditorial = command(f.state, 'post.save', { id: f.postId, format: 'story', poster: { recipe: 'hero', formats: { story: { recipe: 'editorial' } } } });
  assert.throws(() => queueJobs(storyEditorial.state, request([f.postId]), options), /type-only/);
  const storyHero = command(f.state, 'post.save', { id: f.postId, format: 'story', poster: { recipe: 'editorial', formats: { story: { recipe: 'hero' } } } });
  assert.equal(queueJobs(storyHero.state, request([f.postId]), options).jobs.length, 1);
  const squareEditorial = command(storyHero.state, 'post.save', { id: f.postId, format: 'square' });
  assert.throws(() => queueJobs(squareEditorial.state, request([f.postId]), options), /type-only/);
  const showcase = command(f.state, 'post.save', { id: f.postId, poster: { recipe: 'showcase' } });
  assert.throws(() => queueJobs(showcase.state, request([f.postId]), options), /editable v3 copy/);
  const legacy = planned(); assert.equal(queueJobs(legacy.state, request([legacy.postId]), options).jobs.length, 1);
});
