import test from 'node:test';
import assert from 'node:assert/strict';
import {companyDate, companyWeek, intendedDateGroup, selectHome} from './home-model.js';

const NOW = '2026-11-10T00:30:00.000Z';
function fixture(timezone = 'UTC') {
  const company = {id: 'a', name: 'Company A', timezone, weekStart: 1, archived: false};
  return {company, state: {companies: [company, {id: 'b', timezone: 'UTC', archived: false}], campaigns: [{id: 'active', companyId: 'a', status: 'active'}, {id: 'paused', companyId: 'a', status: 'paused'}, {id: 'archived', companyId: 'a', status: 'archived'}, {id: 'completed', companyId: 'a', status: 'completed'}, {id: 'foreign', companyId: 'b', status: 'active'}], plans: [], posts: [], designs: [], jobs: []}};
}
function post(id, extra = {}) {return {id, companyId: 'a', campaignId: '', title: id, status: 'planned', format: 'portrait', createdAt: '2026-11-01T10:00:00Z', updatedAt: '2026-11-01T10:00:00Z', intendedDate: '', ...extra};}
function job(id, postId, status, extra = {}) {return {id, postId, companyId: 'a', status, createdAt: '2026-11-10T00:00:00Z', ...extra};}

// Dates are derived from injected instants, not the test machine's current date or zone.
test('company-local today spans UTC day and year boundaries, with safe UTC zone fallback', () => {
  assert.equal(companyDate('UTC', NOW), '2026-11-10');
  assert.equal(companyDate('America/Los_Angeles', NOW), '2026-11-09');
  assert.equal(companyDate('Pacific/Kiritimati', '2026-12-31T12:30:00Z'), '2027-01-01');
  assert.equal(companyDate('Invalid/Zone', NOW), '2026-11-10');
  assert.throws(() => companyDate('UTC', 'not an instant'), RangeError);
});
test('local week honours Monday, Sunday and the local midnight boundary', () => {
  assert.equal(companyWeek('2026-11-08', 1), '2026-11-02');
  assert.equal(companyWeek('2026-11-08', 0), '2026-11-08');
  const f = fixture('America/Los_Angeles');
  assert.equal(selectHome(f.state, f.company, '2026-11-09T07:59:00Z').week, '2026-11-02');
  assert.equal(selectHome(f.state, f.company, '2026-11-09T08:00:00Z').week, '2026-11-09');
});
test('intended dates distinguish past, today, upcoming and undated without inventing schedules', () => {
  assert.equal(intendedDateGroup('2026-11-09', '2026-11-10'), 'overdue');
  assert.equal(intendedDateGroup('2026-11-10', '2026-11-10'), 'today');
  assert.equal(intendedDateGroup('2026-11-11', '2026-11-10'), 'upcoming');
  assert.equal(intendedDateGroup('', '2026-11-10'), 'unscheduled');
  assert.equal(intendedDateGroup('2026-02-30', '2026-11-10'), 'unscheduled');
});
test('due and resume retain older weeks and one-offs but exclude completed, archived and inactive content', () => {
  const f = fixture();
  f.state.posts = [post('old-week', {campaignId: 'active', planId: 'old-plan', intendedDate: '2026-10-01'}), post('today', {intendedDate: '2026-11-10'}), post('next-seven', {intendedDate: '2026-11-17'}), post('later', {intendedDate: '2026-11-18'}), post('one-off'), post('ready', {status: 'design-ready'}), post('reviewed', {status: 'reviewed'}), post('exported', {status: 'exported', intendedDate: '2026-11-10'}), post('posted', {status: 'posted'}), post('paused', {campaignId: 'paused'}), post('archived', {campaignId: 'archived'}), post('done-campaign', {campaignId: 'completed'}), post('foreign-campaign', {campaignId: 'foreign'}), post('foreign-company', {companyId: 'b'}), post('removed-campaign', {campaignId: 'missing'}), post('archived-post', {archived: true})];
  const home = selectHome(f.state, f.company, NOW);
  assert.deepEqual(home.due.map(item => item.post.id), ['old-week', 'today', 'next-seven']);
  assert.deepEqual(new Set(home.resume.map(item => item.post.id)), new Set(['later', 'one-off', 'ready', 'reviewed']));
  assert.equal(home.overdueCount, 1); assert.equal(home.todayCount, 1);
  assert.equal(home.tasks.some(task => task.kind === 'review' && task.postId === 'ready'), true);
});
test('date categorisation follows selected company timezone rather than UTC or browser timezone', () => {
  const f = fixture('America/Los_Angeles'); f.state.posts = [post('local-today', {intendedDate: '2026-11-09'}), post('local-next', {intendedDate: '2026-11-10'})];
  assert.deepEqual(selectHome(f.state, f.company, NOW).due.map(item => item.dateGroup), ['today', 'upcoming']);
});
test('underway uses actual queued/running/unknown statuses and keeps uncertain requests despite later success or paused campaign', () => {
  const f = fixture(); f.state.posts = [post('p'), post('paused-p', {campaignId: 'paused'}), post('b-p', {companyId: 'b'})];
  f.state.jobs = [job('q', 'p', 'queued'), job('r', 'p', 'running'), job('u', 'paused-p', 'unknown'), job('later-success', 'paused-p', 'succeeded', {createdAt: '2026-11-10T00:10:00Z'}), job('foreign', 'b-p', 'running', {companyId: 'b'}), job('wrong-post', 'missing', 'unknown')];
  const home = selectHome(f.state, f.company, NOW);
  assert.deepEqual(home.underway.map(item => item.job.id), ['u', 'r', 'q']);
  assert.equal(home.resume.length, 0);
  assert.equal(home.tasks[0].kind, 'unknown');
  assert.match(home.tasks[0].detail, /may have been billed/);
  assert.equal(home.tasks.some(task => /retry/i.test(task.title)), false);
});
test('latest terminal request wins despite unsorted jobs; old failed requests do not remain as fresh failures', () => {
  const f = fixture(); f.state.posts = [post('p'), post('f'), post('paused-p', {campaignId: 'paused'})];
  f.state.jobs = [job('new', 'p', 'succeeded', {createdAt: '2026-11-10T00:20:00Z'}), job('old', 'p', 'failed'), job('failure', 'f', 'failed'), job('old-tie', 'f', 'succeeded'), job('new-tie', 'f', 'failed'), job('paused-failure', 'paused-p', 'failed')];
  assert.deepEqual(selectHome(f.state, f.company, NOW).failed.map(item => item.job.id), ['new-tie']);
});
test('recent work sorts actual saved versions and retains frozen records rather than rewriting from live posts', () => {
  const f = fixture(); f.state.posts = [post('p', {title: 'Changed draft', status: 'exported'}), post('paused-p', {campaignId: 'paused'}), post('archived-p', {campaignId: 'archived'}), post('b-p', {companyId: 'b'})];
  const frozen = {id: 'new', companyId: 'a', postId: 'p', createdAt: '2026-11-09T12:00:00Z', reviewed: true, scene: {post: {title: 'Frozen exact title', format: 'story'}, company: {name: 'Original brand'}, fonts: [{id: 'frozen-font'}]}};
  f.state.designs = [frozen, {id: 'older', companyId: 'a', postId: 'paused-p', createdAt: '2026-11-01T12:00:00Z'}, {id: 'archived', companyId: 'a', postId: 'archived-p', createdAt: '2026-11-10T12:00:00Z'}, {id: 'foreign', companyId: 'b', postId: 'b-p', createdAt: '2026-11-10T12:00:00Z'}];
  const home = selectHome(f.state, f.company, NOW);
  assert.deepEqual(home.recent.map(design => design.id), ['new', 'older']);
  assert.equal(home.recent[0], frozen); assert.equal(home.recent[0].scene.fonts[0].id, 'frozen-font');
});
test('empty/stale/archived company selections cannot expose another company work', () => {
  const f = fixture(); f.state.posts = [post('p')];
  assert.equal(selectHome(f.state, undefined, NOW).posts.length, 0);
  assert.equal(selectHome(f.state, {id: 'deleted'}, NOW).company, null);
  f.company.archived = true;
  assert.equal(selectHome(f.state, {id: 'a', archived: false}, NOW).company, null);
});
test('next tasks are genuine, bounded, de-duplicated and do not hide a previous unresolved job', () => {
  const f = fixture(); f.state.posts = [post('uncertain', {status: 'design-ready'}), post('ready', {status: 'design-ready', intendedDate: '2026-11-10'}), post('draft'), post('another')];
  f.state.jobs = [job('unknown', 'uncertain', 'unknown')];
  const home = selectHome(f.state, f.company, NOW);
  assert.equal(home.tasks.length, 3);
  assert.deepEqual(home.tasks.map(task => task.kind), ['unknown', 'review', 'week']);
  const postTasks = home.tasks.filter(task => task.postId);
  assert.equal(new Set(postTasks.map(task => task.postId)).size, postTasks.length);
  assert.equal(home.tasks.some(task => task.kind === 'finish' || task.title.startsWith('Continue ')), false);
});
test('ordinary dated and unscheduled drafts stay in their lists without duplicate next-step continuations', () => {
  const f = fixture();
  f.state.posts = [post('today', {intendedDate: '2026-11-10'}), post('undated'), post('reviewed', {status: 'reviewed'})];
  f.state.plans = [{companyId: 'a', campaignId: 'active', week: '2026-11-09'}];
  const home = selectHome(f.state, f.company, NOW);
  assert.deepEqual(home.due.map(item => item.post.id), ['today']);
  assert.deepEqual(new Set(home.resume.map(item => item.post.id)), new Set(['undated', 'reviewed']));
  assert.deepEqual(home.tasks, []);
  assert.deepEqual(home.underway, []);
});
test('planning task uses current company-local week and only active campaigns without a plan', () => {
  const f = fixture(); f.state.plans = [{companyId: 'a', campaignId: 'active', week: '2026-11-09'}];
  assert.equal(selectHome(f.state, f.company, NOW).tasks.some(task => task.kind === 'week'), false);
  f.state.plans[0].week = '2026-11-02';
  assert.equal(selectHome(f.state, f.company, NOW).tasks.some(task => task.kind === 'week'), true);
});
test('selectors never mutate aggregates or generate commands/requests, even when repeatedly derived', () => {
  const f = fixture(); f.state.posts = [post('p', {intendedDate: '2026-11-10'})]; f.state.jobs = [job('q', 'p', 'queued')];
  const before = JSON.stringify(f.state); const originalFetch = globalThis.fetch;
  globalThis.fetch = () => {throw new Error('Selectors must not make requests');};
  function freeze(value) {if (value && typeof value === 'object') {Object.freeze(value); for (const child of Object.values(value)) freeze(child);}}
  freeze(f.state);
  try {for (let i = 0; i < 5; i++) selectHome(f.state, f.company, NOW);}
  finally {globalThis.fetch = originalFetch;}
  assert.equal(JSON.stringify(f.state), before);
});
