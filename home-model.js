// Read-only Home projection. Dates are company-local intended dates, never publishing times.
// Keep this browser-safe: no Host/model commands, timers, network or implicit generation.
const LIVE_POSTS = new Set(['planned', 'design-ready', 'reviewed']);
const OPEN_JOBS = new Set(['queued', 'running', 'unknown']);
const rows = (state, key) => Array.isArray(state?.[key]) ? state[key] : [];
const stamp = value => Number.isFinite(Date.parse(value)) ? Date.parse(value) : 0;
const newest = (items, field = 'createdAt') => items.map((item, index) => ({item, index}))
  .sort((a, b) => stamp(b.item[field]) - stamp(a.item[field]) || b.index - a.index).map(({item}) => item);
const validDay = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)
  && Number.isFinite(Date.parse(value + 'T12:00:00Z'))
  && new Date(value + 'T12:00:00Z').toISOString().slice(0, 10) === value;

export function companyDate(timezone, now) {
  const instant = new Date(now);
  if (!Number.isFinite(instant.getTime())) throw new RangeError('Home requires a valid current instant.');
  let formatter;
  try { formatter = new Intl.DateTimeFormat('en-CA', {timeZone: timezone || 'UTC', year: 'numeric', month: '2-digit', day: '2-digit'}); }
  catch { formatter = new Intl.DateTimeFormat('en-CA', {timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit'}); }
  const parts = Object.fromEntries(formatter.formatToParts(instant).map(part => [part.type, part.value]));
  return `${parts.year}-${parts.month}-${parts.day}`;
}

function dayOffset(day, amount) {
  const date = new Date(day + 'T12:00:00Z');
  date.setUTCDate(date.getUTCDate() + amount);
  return date.toISOString().slice(0, 10);
}

export function companyWeek(today, weekStart = 1) {
  const start = Number.isInteger(weekStart) && weekStart >= 0 && weekStart <= 6 ? weekStart : 1;
  return dayOffset(today, -((new Date(today + 'T12:00:00Z').getUTCDay() - start + 7) % 7));
}

export function intendedDateGroup(date, today) {
  if (!validDay(date)) return 'unscheduled';
  return date < today ? 'overdue' : date === today ? 'today' : 'upcoming';
}

/** All collections retain their original records, including frozen design scenes. */
export function selectHome(state, selectedCompany, now) {
  // Resolve against the current aggregate: a removed/archived stale selection cannot leak work.
  const company = rows(state, 'companies').find(item => item.id === selectedCompany?.id && !item.archived);
  const today = companyDate(company?.timezone || 'UTC', now);
  const week = companyWeek(today, company?.weekStart);
  const empty = {company: null, today, week, campaigns: [], posts: [], due: [], resume: [], underway: [], failed: [], recent: [], tasks: [], overdueCount: 0, todayCount: 0};
  if (!company) return empty;
  const campaigns = rows(state, 'campaigns').filter(item => item.companyId === company.id);
  const campaignById = new Map(campaigns.map(item => [item.id, item]));
  const campaignFor = post => post.campaignId ? campaignById.get(post.campaignId) : null;
  const allPosts = rows(state, 'posts').filter(post => post.companyId === company.id && !post.archived);
  const postById = new Map(allPosts.map(post => [post.id, post]));
  const ownJobs = rows(state, 'jobs').filter(job => job.companyId === company.id && postById.has(job.postId));
  // Uncertain/busy requests stay visible even if their campaign was paused in the meantime.
  const jobPriority = {unknown: 0, running: 1, queued: 2};
  const underway = ownJobs.filter(job => OPEN_JOBS.has(job.status)).map(job => ({job, post: postById.get(job.postId)}))
    .sort((a, b) => jobPriority[a.job.status] - jobPriority[b.job.status] || stamp(a.job.createdAt) - stamp(b.job.createdAt) || a.job.id.localeCompare(b.job.id));
  const waiting = new Set(underway.map(item => item.post.id));
  const posts = allPosts.filter(post => LIVE_POSTS.has(post.status)
    && (!post.campaignId || campaignFor(post)?.status === 'active'));
  const available = posts.filter(post => !waiting.has(post.id));
  const describe = post => ({post, campaign: campaignFor(post), dateGroup: intendedDateGroup(post.intendedDate, today)});
  const due = available.filter(post => validDay(post.intendedDate) && post.intendedDate <= dayOffset(today, 7))
    .sort((a, b) => a.intendedDate.localeCompare(b.intendedDate) || stamp(a.createdAt) - stamp(b.createdAt) || a.id.localeCompare(b.id)).map(describe);
  const dueIds = new Set(due.map(item => item.post.id));
  const resume = newest(available.filter(post => !dueIds.has(post.id)), 'updatedAt').map(describe);
  const latestByPost = new Map();
  for (const job of newest(ownJobs)) if (!latestByPost.has(job.postId)) latestByPost.set(job.postId, job);
  const activePostIds = new Set(posts.map(post => post.id));
  const failed = [...latestByPost.values()].filter(job => job.status === 'failed' && activePostIds.has(job.postId) && !waiting.has(job.postId))
    .map(job => ({job, post: postById.get(job.postId)}));
  // History is useful for paused/completed campaigns, but archived or foreign content is not featured.
  const recent = newest(rows(state, 'designs').filter(design => {
    const post = postById.get(design.postId);
    return design.companyId === company.id && post && (!post.campaignId || (campaignFor(post) && campaignFor(post).status !== 'archived'));
  }));
  const tasks = [], taskPosts = new Set();
  function addTask(task) {
    if (task.postId && taskPosts.has(task.postId)) return;
    if (task.postId) taskPosts.add(task.postId);
    tasks.push(task);
  }
  for (const {job, post} of underway.filter(item => item.job.status === 'unknown')) addTask({id: 'job-' + job.id, kind: 'unknown', postId: post.id, title: `Check image request: ${post.title || 'Untitled post'}`, detail: 'Outcome unknown. It may have been billed; do not retry blindly.'});
  for (const {job, post} of failed) addTask({id: 'failed-' + job.id, kind: 'failed', postId: post.id, title: `Inspect failed request: ${post.title || 'Untitled post'}`, detail: 'Open the post to read the error before deciding what to do.'});
  for (const post of newest(available, 'updatedAt').filter(post => post.status === 'design-ready')) addTask({id: 'review-' + post.id, kind: 'review', postId: post.id, title: `Review ${post.title || 'Untitled post'}`, detail: 'Inspect the current composition before exporting.'});
  // Ordinary continuation already lives in Due/Resume; Next steps is for distinct actions only.
  const activeCampaigns = campaigns.filter(campaign => campaign.status === 'active');
  const plans = rows(state, 'plans').filter(plan => plan.companyId === company.id && plan.week === week);
  if (activeCampaigns.some(campaign => !plans.some(plan => plan.campaignId === campaign.id))) addTask({id: 'plan-week', kind: 'week', title: 'Plan the current week', detail: 'An active campaign has no plan for this company-local week.'});
  if (!activeCampaigns.length) addTask({id: 'campaigns', kind: 'campaigns', title: campaigns.length ? 'Review your campaigns' : 'Create your first campaign', detail: 'Keep a reusable brief for a recurring message.'});
  return {company, today, week, campaigns: activeCampaigns, posts, due, resume, underway, failed, recent, tasks: tasks.slice(0, 3), overdueCount: due.filter(item => item.dateGroup === 'overdue').length, todayCount: due.filter(item => item.dateGroup === 'today').length};
}
