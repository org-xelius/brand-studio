import React, {useEffect, useId, useMemo, useState} from 'react';
import {selectHome} from '../home-model.js';
import {Icon} from './icons.jsx';
import welcomeArtwork from './welcome-artwork.js';
import styles from './home.css';

// THESIS: a compact welcome hands off immediately to real company work, not dashboard theatre.
// OWN-WORLD: native Harness typography, neutral semantic surfaces and the shared action accent.
// STORY: start a design, continue an intended post, inspect a request, or reopen a saved version.
// FIRST VIEWPORT: a modest illustrated welcome, actionable dated rows, then the saved work itself.
// FORM: Operate Home, pinned by the approved v0.4 contract; company artwork stays independent.
// FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md.
const FORMAT_NAMES = {square: 'Square · 1:1', portrait: 'Portrait · 4:5', story: 'Story · 9:16', landscape: 'Landscape · 1.91:1'};
const POST_LABELS = {planned: 'Draft', 'design-ready': 'Needs review', reviewed: 'Reviewed draft'};
const JOB_LABELS = {queued: 'Queued', running: 'Creating image', unknown: 'Outcome unknown'};
function dayLabel(day, long = false) {
  return new Intl.DateTimeFormat(undefined, {month: long ? 'long' : 'short', day: 'numeric', ...(long ? {weekday: 'long'} : {}), timeZone: 'UTC'}).format(new Date(day + 'T12:00:00Z'));
}
function savedDate(value, timezone) {
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return 'Saved version';
  try {return new Intl.DateTimeFormat(undefined, {month: 'short', day: 'numeric', year: 'numeric', timeZone: timezone}).format(date);}
  catch {return new Intl.DateTimeFormat(undefined, {month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC'}).format(date);}
}
function Action({children, onClick, icon, primary = false, ...props}) {
  return <button type="button" className={'bs-button' + (primary ? ' bs-primary' : '')} onClick={onClick} {...props}>{icon && <Icon name={icon}/>} {children}</button>;
}
function PostLink({item, onOpenPost, showDate = false}) {
  const {post, campaign, dateGroup} = item;
  const date = dateGroup === 'today' ? 'Intended today' : dateGroup === 'overdue' ? `Past intended date · ${dayLabel(post.intendedDate)}` : dateGroup === 'upcoming' ? `Intended ${dayLabel(post.intendedDate)}` : 'No intended date';
  return <li className="bs-home-post-item"><button type="button" className="bs-home-post-link" onClick={() => onOpenPost(post.id)}>
    <Icon name={showDate ? 'calendar' : 'edit'} size={18}/>
    <span className="bs-home-row-copy"><strong>{post.title || 'Untitled post'}</strong><span>{campaign?.name || 'One-off design'} · {POST_LABELS[post.status] || 'Draft'}</span>{showDate && <span className={'bs-home-date' + (dateGroup === 'overdue' ? ' bs-home-date-past' : '')}>{date}</span>}</span>
    <Icon name="chevron" size={16}/>
  </button></li>;
}
function RequestLink({item, onOpenPost}) {
  const {job, post} = item;
  return <li className="bs-home-request-item"><button type="button" className="bs-home-request-link" onClick={() => onOpenPost(post.id)}>
    <Icon name={job.status === 'unknown' ? 'warning' : 'clock'} size={18}/>
    <span className="bs-home-row-copy"><strong>{post.title || 'Untitled post'}</strong><span>{JOB_LABELS[job.status]}</span>{job.status === 'unknown' && <span>May have been billed. Check the request before trying again.</span>}</span>
    <Icon name="chevron" size={16}/>
  </button></li>;
}

export default function Home({state, company, onCreate, onOpenPost, onOpenDesign, onWeek, onCampaigns, onSetup, onCompany, renderThumbnail}) {
  const headingId = useId();
  const [now, setNow] = useState(() => new Date().toISOString());
  useEffect(() => {
    const update = () => setNow(new Date().toISOString());
    const timer = setInterval(update, 60000);
    document.addEventListener('visibilitychange', update);
    update();
    return () => {clearInterval(timer); document.removeEventListener('visibilitychange', update);};
  }, []);
  const home = useMemo(() => selectHome(state, company, now), [state, company, now]);
  const current = home.company;
  const hasAside = home.underway.length > 0 || home.tasks.length > 0;
  const title = current ? 'Your next great design starts here.' : 'Make room for your next idea.';
  const openTask = task => {
    if (task.postId) onOpenPost(task.postId);
    else if (task.kind === 'week') onWeek();
    else onCampaigns();
  };
  return <section className="bs-home-page" aria-labelledby={headingId}>
    <style>{styles}</style>
    <div className={'bs-home-welcome' + (welcomeArtwork ? ' bs-home-with-art' : '')}>
      <div className="bs-home-welcome-copy"><h1 id={headingId}>{title}</h1>
        <p>{current ? 'Exact words, your own assets, and a clear path from first draft to reviewed design.' : 'Add a company, keep its look together, and create your first social design.'}</p>
        <div className="bs-home-welcome-actions"><Action primary icon="plus" onClick={() => current ? onCreate() : onCompany()}>{current ? 'New design' : 'Add your first company'}</Action>
          {current && <span className="bs-home-context">{dayLabel(home.today, true)} · {current.timezone || 'UTC'}</span>}
        </div>
      </div>
      {welcomeArtwork && <div className="bs-home-art" aria-hidden="true"><img src={welcomeArtwork} alt="" width="1536" height="1024" decoding="async"/></div>}
    </div>
    {!current ? <div className="bs-home-get-started"><h2>A simple place to start</h2><p>A company name and a little context are enough. Add a reusable campaign when you need one, or make a one-off design.</p><ul><li>Your words stay editable.</li><li>Original assets stay separate from generated images.</li><li>Paid image requests always need your confirmation.</li></ul><Action icon="plus" onClick={() => onCreate()}>Start a design</Action></div> : <>
      <div className={'bs-home-work-grid' + (hasAside ? '' : ' bs-home-work-solo')}>
        <div className="bs-home-focus">
          <section className="bs-home-section" aria-labelledby={headingId + '-posts'}>
            <div className="bs-home-section-head"><div><h2 id={headingId + '-posts'}>Your next posts</h2><p>Intended dates, not a publishing schedule.</p></div><Action icon="calendar" onClick={() => onWeek()}>This week</Action></div>
            {home.due.length ? <><ul className="bs-home-post-list">{home.due.slice(0, 4).map(item => <PostLink key={item.post.id} item={item} onOpenPost={onOpenPost} showDate/>)}</ul>{home.due.length > 4 && <details className="bs-home-more"><summary>{home.due.length - 4} more dated posts</summary><ul className="bs-home-post-list">{home.due.slice(4).map(item => <PostLink key={item.post.id} item={item} onOpenPost={onOpenPost} showDate/>)}</ul></details>}</> : <div className="bs-home-empty"><p>No unfinished posts with an intended date in the next seven days.</p><span>Continue a draft below, or plan a campaign for this week.</span></div>}
          </section>
          {home.resume.length > 0 && <section className="bs-home-section" aria-labelledby={headingId + '-resume'}><div className="bs-home-section-head"><div><h2 id={headingId + '-resume'}>Pick up where you left off</h2><p>Unscheduled drafts and work planned further ahead.</p></div></div><ul className="bs-home-post-list">{home.resume.slice(0, 3).map(item => <PostLink key={item.post.id} item={item} onOpenPost={onOpenPost}/>)}</ul>{home.resume.length > 3 && <details className="bs-home-more"><summary>{home.resume.length - 3} more drafts</summary><ul className="bs-home-post-list">{home.resume.slice(3).map(item => <PostLink key={item.post.id} item={item} onOpenPost={onOpenPost}/>)}</ul></details>}</section>}
        </div>
        {hasAside && <aside className="bs-home-side" aria-label="Next actions and image requests">
          {home.underway.length > 0 && <section className="bs-home-section" aria-labelledby={headingId + '-requests'}><div className="bs-home-section-head"><h2 id={headingId + '-requests'}>Image requests</h2></div><ul className="bs-home-request-list">{home.underway.slice(0, 3).map(item => <RequestLink key={item.job.id} item={item} onOpenPost={onOpenPost}/>)}</ul>{home.underway.length > 3 && <details className="bs-home-more"><summary>{home.underway.length - 3} more requests</summary><ul className="bs-home-request-list">{home.underway.slice(3).map(item => <RequestLink key={item.job.id} item={item} onOpenPost={onOpenPost}/>)}</ul></details>}</section>}
          {home.tasks.length > 0 && <section className="bs-home-section" aria-labelledby={headingId + '-tasks'}><div className="bs-home-section-head"><h2 id={headingId + '-tasks'}>Next steps</h2></div><ul className="bs-home-task-list">{home.tasks.map(task => <li key={task.id}><button type="button" className="bs-home-task-link" onClick={() => openTask(task)}><Icon name={task.kind === 'unknown' || task.kind === 'failed' ? 'warning' : task.kind === 'review' ? 'check' : task.kind === 'week' ? 'calendar' : 'folder'} size={17}/><span className="bs-home-row-copy"><strong>{task.title}</strong><span>{task.detail}</span></span><Icon name="chevron" size={15}/></button></li>)}</ul>{home.failed.length > 0 && <Action icon="settings" onClick={() => onSetup()}>Image setup</Action>}</section>}
        </aside>}
      </div>
      <section className="bs-home-recent" aria-labelledby={headingId + '-recent'}><div className="bs-home-section-head"><div><h2 id={headingId + '-recent'}>Recent designs</h2><p>Saved versions, kept with {current.name}.</p></div></div>
        {home.recent.length ? <ul className="bs-home-gallery">{home.recent.slice(0, 4).map(design => {
          const post = state.posts.find(item => item.id === design.postId), savedPost = design.scene?.post || {...post, ...design};
          const title = savedPost.title || post?.title || 'Untitled design';
          return <li key={design.id}><button type="button" className="bs-home-design" onClick={() => onOpenDesign(design.id)} aria-label={`Open saved design: ${title}`}><span className="bs-home-thumbnail" aria-hidden="true">{renderThumbnail ? renderThumbnail(design) : <span className="bs-home-preview-unavailable"><Icon name="image" size={26}/>Preview unavailable</span>}</span><span className="bs-home-design-copy"><strong>{title}</strong><span>{FORMAT_NAMES[savedPost.format] || 'Saved format'} · {design.reviewed ? 'Reviewed version' : 'Unreviewed version'}</span><span>{savedDate(design.createdAt, current.timezone)}</span></span></button></li>;
        })}</ul> : <div className="bs-home-recent-empty"><Icon name="image" size={24}/><div><h3>Your saved work will live here.</h3><p>Open a draft to shape and review a version. Local previews are never labelled as generated images.</p></div><Action onClick={() => onCreate()} icon="plus">New design</Action></div>}
      </section>
    </>}
  </section>;
}
