// Isolated real React/model/native renderer integration. Never connects to the installed GUI.
// Reuse only the existing matrix bootstrap IN MEMORY; do not edit/run its suite or capture loop.
// Execution is intentionally gated until the parent confirms UI/renderer readiness.
import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {build} from 'esbuild';
import {chromium,expect} from '@playwright/test';
import {createState,applyCommand,addAsset,addFont} from '../model.js';
import {DEFAULT_POSTER_FLEX,resolvePoster} from '../poster-model.js';
import {LAYOUTS,CTA_STYLES,PROFILE_PRESETS,motifPlacementForLayout} from '../composition-model.js';
if(process.env.BS_FLEX_UI_READY!=='1')throw Error('Await parent Ready, then run with BS_FLEX_UI_READY=1. No browser was started.');
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const output=path.join(root,'output/playwright/flexible-compositions/ui');
const matrix=await fs.readFile(path.join(root,'tests/ui-v4-matrix.mjs'),'utf8');
const marker="const phase=process.env.BS_UI_MATRIX||'checks';";
if(!matrix.includes(marker))throw Error('Matrix bootstrap boundary changed; inspect before reusing.');
let prefix=matrix.slice(0,matrix.indexOf(marker)).replace(/^import .*\n/gm,'').replace(/^const root=.*\n/m,'');
prefix=prefix.replace("process.env.BS_UI_OUTPUT||'output/playwright/v4-ui'","'output/playwright/flexible-compositions/ui'");
// A strict allowlist prevents even mocked provider/key/catalog/import calls from being hidden by the bootstrap.
const endpointMarker="const endpoint=url.pathname.split('/').at(-1);calls.push(endpoint);let value;";
if(!prefix.includes(endpointMarker))throw Error('API route bootstrap changed; inspect before reusing.');
prefix=prefix.replace(endpointMarker,"const endpoint=url.pathname.split('/').at(-1);calls.push(endpoint);if(!['state','status','command','fonts.file'].includes(endpoint))throw Error('Forbidden flexible UI endpoint: '+endpoint);let value;");
const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
const boot=new AsyncFunction('fs','path','createHash','build','chromium','expect','createState','applyCommand','addAsset','addFont','root',prefix+`
return {page,browser,commands,calls,errors,command,getState:()=>state,
reset:()=>{state=createState();commands.length=0;calls.length=0;},
seedCachedFont:companyId=>{state=addFont(state,{...fontRecord,companyId});return {...fontRecord,companyId};}};`);
const harness=await boot(fs,path,createHash,build,chromium,expect,createState,applyCommand,addAsset,addFont,root);
const {page,browser,commands,calls,errors,command,getState,reset,seedCachedFont}=harness;
reset();
const first=command('company.save',{name:'Flexible studio fixture',description:'Isolated short-copy test company, not a customer claim.',color:'#24314a',timezone:'UTC',weekStart:1,brandKit:{voice:'studio',accent:'#d9aa67',ink:'#161b18',paper:'#f8f7f2'}}).id;
const second=command('company.save',{name:'Independent company fixture',description:'Independent saved design language.',color:'#302d54',timezone:'UTC',compositionProfile:PROFILE_PRESETS[1].profile}).id;
const legacy=command('company.save',{name:'Legacy absent-language fixture',description:'No stored profile or brand kit.',color:'#24314a',timezone:'UTC'}).id;
const main=command('post.save',{companyId:first,title:'Flexible controls specimen',brief:'Local conceptual type-only artwork.',headline:'Clear ideas',body:'Local words.',cta:'Explore',format:'square'}).id;
command('post.save',{id:main,poster:{...DEFAULT_POSTER_FLEX,recipe:'editorial'}});
const old=command('post.save',{companyId:first,title:'Explicit compiler2 specimen',brief:'Preserve the exact old compiler.',headline:'Original words',body:'Saved before upgrade.',cta:'Explore',format:'square',poster:{version:3,compilerVersion:2,recipe:'editorial'}}).id;
const oldDesign=command('design.snapshot',{postId:old}).id;
const frozenOld=JSON.stringify(getState().designs.find(d=>d.id===oldDesign));
const cachedFont=seedCachedFont(first);
const otherBaseline=JSON.stringify(getState().companies.find(c=>c.id===second));
commands.length=0;
const checks=[],metrics=[],captures=[];
const company=id=>getState().companies.find(c=>c.id===id),post=id=>getState().posts.find(p=>p.id===id);
const label=name=>page.getByLabel(name,{exact:true}),button=name=>page.getByRole('button',{name,exact:true});
const dialog=page.getByRole('dialog'),look=page.getByRole('tabpanel',{name:'Look',exact:true});
const family=()=>page.getByRole('group',{name:'Arrangement family',exact:true});
async function settle(){await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));}
async function summary(text){const control=page.locator('summary').filter({hasText:new RegExp('^'+text.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'(?: ·.*)?$')}).first();await expect(control).toBeVisible();if(!await control.evaluate(el=>el.parentElement.open))await control.click();}
async function selectCompany(id){await label('Active company').selectOption(id);await expect(label('Active company')).toHaveValue(id);}
async function openCompany(id=first){await selectCompany(id);await button('Company guidelines').click();await expect(dialog).toBeVisible();await summary('Design language');await expect(label('Company design language')).toBeVisible();}
async function closeDialog(){await button('Close dialog').click();await expect(dialog).toHaveCount(0);}
async function saveCompany(){await dialog.getByRole('button',{name:'Save guidelines',exact:true}).click();await expect(dialog).toHaveCount(0);}
async function openPost(id=main){
  await selectCompany(post(id).companyId);await button('Create').click();
  await page.locator('.bs-post-open').filter({hasText:post(id).title}).click();
  await expect(label('Headline')).toHaveValue(post(id).headline);await waitPaint();
}
async function openLook(){await page.getByRole('tab',{name:'Look',exact:true}).click();await expect(look).toBeVisible();}
async function waitPaint(){await expect(page.locator('.bs-render-status')).toHaveCount(0,{timeout:20000});await settle();}
async function saveDraft(id=main){
  await expect(page.locator('.bs-save')).toHaveText('Saved',{timeout:20000});
  await waitPaint();expect(post(id)).toBeTruthy();
}
async function setRange(name,value){await label(name).fill(String(value));await expect(label(name)).toHaveValue(String(value));}
async function review(id=main){
  await saveDraft(id);const confirmed=page.getByRole('checkbox',{name:'I’ve inspected this format and confirmed the content and assets.',exact:true});
  await expect(confirmed).toBeEnabled({timeout:20000});await confirmed.check();
  const reviewButton=button('Save & review this version');await expect(reviewButton).toBeEnabled({timeout:20000});await reviewButton.click();
  await expect(button('Export reviewed PNG')).toBeEnabled({timeout:20000});
  const d=getState().designs.filter(d=>d.postId===id).at(-1);expect(d.reviewed).toBe(true);expect(d.renderReceipt?.manifest.compilerVersion).toBe(3);return d;
}
async function configure(theme,width,zoom=1){await page.setViewportSize({width,height:width===390?844:1000});await page.evaluate(({theme,zoom})=>{document.documentElement.dataset.dsThemeSource=theme;document.body.toggleAttribute('data-ds-dark-theme',theme==='dark');document.documentElement.style.zoom=String(zoom);},{theme,zoom});await settle();}
async function focusedBounds(control,name,{modal=false}={}){
  await control.focus();await expect(control).toBeFocused();await settle();
  const geometry=await control.evaluate(el=>{const box=node=>{const b=node.getBoundingClientRect();return {left:b.left,right:b.right,top:b.top,bottom:b.bottom,width:b.width,height:b.height};};const d=el.closest('dialog');return {width:innerWidth,height:innerHeight,control:box(el),dialog:d&&box(d),header:d&&box(d.querySelector('.bs-modal-head')),rootOverflow:document.querySelector('.bs').scrollWidth>document.querySelector('.bs').clientWidth+1,dialogOverflow:d?d.scrollWidth>d.clientWidth+1:false};});
  expect(geometry.control.left,name).toBeGreaterThanOrEqual(-.5);expect(geometry.control.right,name).toBeLessThanOrEqual(geometry.width+.5);
  expect(geometry.control.top,name).toBeGreaterThanOrEqual((modal?geometry.header.bottom:0)-.5);expect(geometry.control.bottom,name).toBeLessThanOrEqual((modal?Math.min(geometry.dialog.bottom,geometry.height):geometry.height)+.5);
  expect(geometry.rootOverflow,name).toBe(false);expect(geometry.dialogOverflow,name).toBe(false);metrics.push({name,geometry});
}
try{
  await page.goto('https://brand-studio.test/');page.setDefaultTimeout(10000);
  await expect(button('Company guidelines')).toBeVisible();
  // Legacy omission and company isolation: simply viewing and unchanged saving must not materialize a profile.
  await openCompany(legacy);await expect(label('Company design language')).toHaveValue('');expect(Object.hasOwn(company(legacy),'compositionProfile')).toBe(false);await closeDialog();
  await openCompany(legacy);await saveCompany();expect(Object.hasOwn(company(legacy),'compositionProfile')).toBe(false);expect(Object.hasOwn(commands.at(-1).data,'compositionProfile')).toBe(false);
  await openCompany();await label('Company design language').selectOption('creative-modular');await expect(label('Company design language')).toHaveValue('creative-modular');
  await expect(page.getByRole('checkbox',{name:'Vary new post layouts',exact:true})).toBeChecked();
  await expect(page.getByLabel('Company design language examples',{exact:true}).locator('canvas')).toHaveCount(3);await expect(dialog).toHaveCount(1);
  await expect(label('Company design language')).toHaveValue('creative-modular');await saveCompany();
  expect(company(first).compositionProfile.id).toBe('creative-modular');expect(JSON.stringify(company(second))).toBe(otherBaseline);
  await openCompany();await expect(label('Company design language')).toHaveValue('creative-modular');await closeDialog();
  await openCompany(second);await expect(label('Company design language')).toHaveValue('research-editorial');await closeDialog();
  checks.push('Company language preset preview, save/reopen, legacy omission and independent-company isolation');
  // Use the actual New design action three times. Empty fresh posts can report missing copy; no generation is requested.
  const cycle=[];
  for(let n=0;n<3;n++){
    await selectCompany(first);await page.locator('.bs-home-welcome-actions').getByRole('button',{name:'New design',exact:true}).click();
    await expect(label('Post name')).toBeVisible();await expect.poll(()=>getState().posts.length).toBeGreaterThanOrEqual(3+n);
    const created=getState().posts.at(-1);cycle.push(created.poster.composition.layout);expect(created.poster.compilerVersion).toBe(3);
    await label('Post name').fill('Rotating draft '+n);await saveDraft(created.id);
  }
  expect(cycle).toEqual(['lateral','broadside','specimen']);const cursor=getState().compositionCursors[first];
  await openPost(main);expect(getState().compositionCursors[first]).toBe(cursor);
  await openCompany();await label('Company design language').selectOption('');await saveCompany();expect(Object.hasOwn(company(first),'compositionProfile')).toBe(false);expect(commands.at(-1).data.compositionProfile).toBe(null);
  expect(JSON.stringify(company(second))).toBe(otherBaseline);await openCompany();await expect(label('Company design language')).toHaveValue('');await closeDialog();
  checks.push('Actual unsupplied new posts cycle once; opening a draft does not reroll; explicit no-language selection removes future metadata with null');
  await openCompany();await label('Company design language').selectOption('creative-modular');await saveCompany();
  await openPost();await openLook();await expect(family().getByRole('button')).toHaveCount(6);
  for(const layout of LAYOUTS){await family().getByRole('button',{name:layout.label,exact:true}).click();await expect(family().getByRole('button',{name:layout.label,exact:true})).toHaveAttribute('aria-pressed','true');await saveDraft();expect(post(main).poster.composition.layout).toBe(layout.id);}
  await family().getByRole('button',{name:'Lateral',exact:true}).click();await saveDraft();
  await expect(label('Motif')).toHaveCount(1);expect(await label('Motif').locator('option').count()).toBe(9);await label('Motif').selectOption('orbit-v1');await saveDraft();
  const placementFields=motif=>Object.fromEntries(['x','y','scale','rotation'].map(key=>[key,motif[key]]));
  function expectAnchored(poster){
    expect(placementFields(poster.motif)).toEqual(motifPlacementForLayout(poster.composition.layout,'square',poster.composition.density));
    for(const format of ['square','portrait','story','landscape']){const o=resolvePoster(poster,format);expect(placementFields(o.motif)).toEqual(motifPlacementForLayout(o.composition.layout,format,o.composition.density));}
  }
  expectAnchored(post(main).poster);
  await label('Composition spacing').selectOption('generous');await saveDraft();expectAnchored(post(main).poster);
  await label('Composition spacing').selectOption('balanced');await saveDraft();expectAnchored(post(main).poster);
  // Authored per-format anchor coordinates must not mask an explicit base placement edit.
  await label('Apply art-direction edits to').selectOption('base');await summary('Motif placement');
  await setRange('Motif horizontal position',.23);await saveDraft();
  expect(post(main).poster.motif.x).toBe(.23);for(const format of ['square','portrait','story','landscape'])expect(resolvePoster(post(main).poster,format).motif.x).toBe(.23);
  await family().getByRole('button',{name:'Broadside',exact:true}).click();await saveDraft();
  for(const format of ['square','portrait','story','landscape'])expect(resolvePoster(post(main).poster,format).motif.x).toBe(.23);
  await button('Fit motif to arrangement').click();await saveDraft();expectAnchored(post(main).poster);
  await family().getByRole('button',{name:'Lateral',exact:true}).click();await saveDraft();expectAnchored(post(main).poster);
  checks.push('Base motif x=.23 reaches actual resolved square/portrait/story/landscape despite generated anchor overrides; family change preserves manual x; explicit Fit restores all authored anchors');
  // Move one scoped motif deliberately; family changes must preserve actual resolved manual placement.
  await label('Apply art-direction edits to').selectOption('format');await summary('Motif placement');
  await setRange('Motif horizontal position',.2);await setRange('Motif scale',1.2);await setRange('Motif rotation',37);await setRange('Motif opacity',.5);await saveDraft();
  await family().getByRole('button',{name:'Spread',exact:true}).click();await saveDraft();
  expect(resolvePoster(post(main).poster,'square').motif).toMatchObject({x:.2,scale:1.2,rotation:37,opacity:.5});
  // Keep meaningful explicit typography/image metadata while testing the base/all-format reset.
  await label('Apply art-direction edits to').selectOption('base');await summary('Typography by role');await label('Text role').selectOption('headline');await label('Headline size').fill('72');await label('Headline size').blur();
  await summary('Image layers');await page.getByLabel(/^Backdrop opacity ·/).fill('0.42');await saveDraft();
  const beforeFit=structuredClone(post(main).poster),opacityBeforeFit=Object.fromEntries(['square','portrait','story','landscape'].map(format=>[format,resolvePoster(beforeFit,format).motif.opacity]));
  await button('Fit motif to arrangement').click();await saveDraft();expectAnchored(post(main).poster);
  expect(post(main).poster.typography).toEqual(beforeFit.typography);expect(post(main).poster.layers).toEqual(beforeFit.layers);
  for(const format of ['square','portrait','story','landscape']){const o=resolvePoster(post(main).poster,format);expect(o.motif.rotation).toBe(0);expect(o.motif.opacity).toBe(opacityBeforeFit[format]);expect(o.typography).toEqual(resolvePoster(beforeFit,format).typography);expect(o.layers).toEqual(resolvePoster(beforeFit,format).layers);}
  checks.push('Untouched motif coordinates follow family/density and first None→SVG in all four ratios; scoped manual x=.2/scale/rotation survive family change; explicit Fit resets all four placements/rotation without changing font/image/opacity');
  // Start the remaining independent opacity/CTA checks from recipe defaults, without old scoped opacity masks.
  await button('Reset all formats to recipe').click();await saveDraft();await label('Motif').selectOption('orbit-v1');await saveDraft();expectAnchored(post(main).poster);
  const opacityPngs=[];
  for(const opacity of [0,.5,1]){await setRange('Motif opacity',opacity);await saveDraft();expect(post(main).poster.motif.opacity).toBe(opacity);opacityPngs.push(await page.locator('.bs-canvas-stage canvas').evaluate(c=>c.toDataURL()));await expect(page.getByAltText('Orbit conceptual SVG motif',{exact:true})).toBeVisible();}
  expect(new Set(opacityPngs).size).toBe(3);await label('Motif').selectOption('none');await saveDraft();
  checks.push('All six arrangement selectors change concrete options; one exact Motif picker; literal 0/.5/1 opacity changes native pixels independently');
  // Each CTA style is reviewed through the real bitmap receipt, not a test-only renderer hook.
  for(const {id:style} of CTA_STYLES){
    await label('CTA style').selectOption(style);await label('CTA width').selectOption(style==='strip'?'full':'fit');await label('CTA alignment').selectOption('left');
    await summary('CTA padding and arrow');await setRange('CTA horizontal padding',18);await setRange('CTA vertical padding',12);
    if(style!=='text'){const fillLabel=style==='outline'?'CTA outline colour':'CTA background colour';await label(fillLabel).selectOption('custom');await label(fillLabel+' custom hex').fill('#ffffff');}
    await label('CTA text colour').selectOption(style==='text'||style==='outline'?'auto':'custom');
    if(style!=='text'&&style!=='outline')await label('CTA text colour custom hex').fill('#171717');
    await saveDraft();expect(post(main).poster.cta.paddingX).toBe(18);expect(post(main).poster.cta.paddingY).toBe(12);
    const design=await review(),m=design.renderReceipt.manifest;
    expect(m.cta.style).toBe(style);expect(m.cta.width).toBe(style==='strip'?'full':'fit');expect(m.cta.painted).toBe(true);expect(m.cta.shapeBounds[2]).toBeGreaterThan(0);
    expect(m.cta.fill).toBe(style==='text'?null:'#ffffff');expect(m.protection.textRendering).toBe('fill-only');expect(m.protection.nonCtaBackground).toBe('none');expect(m.protection.textBlocks).toEqual([]);
  }
  // Empty exact CTA copy must remove the shape, text and phantom region from the actual manifest.
  await page.getByRole('tab',{name:'Words',exact:true}).click();await label('What should people do next? (optional)').fill('');await saveDraft();const empty=await review();
  expect(empty.renderReceipt.manifest.cta).toMatchObject({painted:false,fill:null,text:null,shapeBounds:null,textBounds:null});
  await label('What should people do next? (optional)').fill('Explore');await saveDraft();await openLook();
  checks.push('Six CTA styles, custom fill/text colours, fit/full width and padding are frozen in actual reviewed manifests; text-only fill null; empty copy paints no phantom shape');
  await summary('Text colours');for(const role of ['Headline','Body','Brand','Kicker']){await label(role+' text colour').selectOption('paper');await saveDraft();expect(post(main).poster.textColors[role.toLowerCase()]).toBe('paper');await label(role+' text colour').selectOption('auto');await saveDraft();}
  // Scope, reset and undo preserve root/base settings and other format overrides.
  await label('Output format').selectOption('story');await label('Apply art-direction edits to').selectOption('format');await family().getByRole('button',{name:'Cover',exact:true}).click();await saveDraft();
  expect(post(main).poster.composition.layout).toBe('lateral');expect(post(main).poster.formats.story.composition.layout).toBe('cover');
  await summary('Typography by role');await label('Text role').selectOption('body');await label('Body size').fill('28');await label('Body size').blur();
  await summary('Image layers');await page.getByLabel(/^Backdrop opacity ·/).fill('0.42');
  await label('Motif').selectOption('orbit-v1');await label('CTA style').selectOption('pill');await saveDraft();
  const preservedStoryTypography=structuredClone(post(main).poster.formats.story.typography),preservedStoryLayers=structuredClone(post(main).poster.formats.story.layers);
  const beforeReset=structuredClone(post(main).poster);await button('Reset this format').click();await saveDraft();expect(resolvePoster(post(main).poster,'story').composition.layout).toBe('lateral');
  await button('Undo edit').click();await saveDraft();expect(post(main).poster).toEqual(beforeReset);
  await label('Output format').selectOption('square');await label('Apply art-direction edits to').selectOption('base');await saveDraft();await expect(family().getByRole('button',{name:'Lateral',exact:true})).toHaveAttribute('aria-pressed','true');
  checks.push('Independent text-role palette controls; per-format arrangement override; reset and undo restore exact prior poster without changing base/other ratios');
  // The editor preview is one modal with one real native preview. Cancel/Escape never apply changes.
  const beforePreview=structuredClone(post(main).poster),previewCursor=getState().compositionCursors[first];
  await button('Preview company language').click();await expect(dialog).toHaveCount(1);await expect(dialog.locator('canvas')).toHaveCount(1);
  await button('Keep current layout').click();await expect(dialog).toHaveCount(0);expect(post(main).poster).toEqual(beforePreview);
  await button('Preview company language').click();await page.keyboard.press('Escape');await expect(dialog).toHaveCount(0);expect(post(main).poster).toEqual(beforePreview);
  await label('Output format').selectOption('story');await label('Apply art-direction edits to').selectOption('format');await saveDraft();
  await button('Preview company language').click();await expect(dialog.locator('canvas')).toHaveCount(1);await button('Apply company language').click();await expect(dialog).toHaveCount(0);await saveDraft();
  expect(post(main).poster.composition).toEqual(beforePreview.composition);expect(post(main).poster.formats.story.composition.layout).toBe('lateral');
  expect(post(main).poster.formats.story.typography).toEqual(preservedStoryTypography);expect(post(main).poster.formats.story.layers).toEqual(preservedStoryLayers);
  await label('Output format').selectOption('square');await label('Apply art-direction edits to').selectOption('base');await saveDraft();
  await button('Preview company language').click();await button('Apply company language').click();await expect(dialog).toHaveCount(0);await saveDraft();
  for(const key of ['composition','cta'])expect(Object.hasOwn(post(main).poster.formats.story,key)).toBe(false);
  expect(post(main).poster.formats.story.motif).toEqual(motifPlacementForLayout(post(main).poster.composition.layout,'story',post(main).poster.composition.density));
  expect(post(main).poster.formats.story.typography).toEqual(preservedStoryTypography);expect(post(main).poster.formats.story.layers).toEqual(preservedStoryLayers);expect(getState().compositionCursors[first]).toBe(previewCursor);
  await label('Motif').selectOption('none');await saveDraft();
  checks.push('Editor company-language preview uses one real canvas; Keep current layout/Escape do not apply. Scoped apply preserves base; all-format apply replaces stale composition/CTA overrides and anchors fresh per-format motif placement while retaining font/image overrides and company rotation');
  // Cache-only imported family uses the old UI harness binary; no catalogue/import request is made.
  await summary('Typography by role');await label('Text role').selectOption('headline');await label('Headline font family').selectOption(cachedFont.id);await label('Headline size').fill('60');await label('Headline size').blur();await saveDraft();
  const imported=await review();expect(imported.scene.fonts[0].id).toBe(cachedFont.id);expect(imported.renderReceipt.manifest.fonts.headline.sha256).toBe(cachedFont.faces[0].sha256);expect(imported.renderReceipt.manifest.fonts.headline.size).toBe(60);
  await label('Headline font family').selectOption('');await label('Headline size').fill('');await label('Headline size').blur();await saveDraft();
  checks.push('Existing cached-font fixture remains selectable and exact family digest/explicit size bind to the reviewed compiler3 receipt without import/provider calls');
  // Existing compiler2 drafts upgrade explicitly; their frozen history remains byte-identical.
  await openPost(old);await openLook();await expect(family()).toHaveCount(0);await button('Use new design tools').click();await saveDraft(old);expect(post(old).poster.compilerVersion).toBe(3);await expect(family()).toBeVisible();
  expect(JSON.stringify(getState().designs.find(d=>d.id===oldDesign))).toBe(frozenOld);
  await label('Saved design history').selectOption(oldDesign);await expect(page.getByText('Saved version · read only',{exact:true})).toBeVisible();expect(getState().designs.find(d=>d.id===oldDesign).scene.compilerVersion).toBe(2);await button('Return to editable draft').click();
  checks.push('Explicit old compiler2 upgrade exposes new tools without reinterpreting any frozen old scene or historical review');
  // A draft-only profile preview must not repaint or revoke an existing approval while the editor remains mounted.
  await openPost();await openLook();await label('CTA style').selectOption('text');await label('CTA text colour').selectOption('auto');await saveDraft();const approved=await review(),receiptBefore=JSON.stringify(approved.renderReceipt),pngBefore=await page.locator('.bs-canvas-stage canvas').evaluate(c=>c.toDataURL());
  await button('Company guidelines').click();await summary('Design language');await label('Company design language').selectOption('research-editorial');
  expect(await page.locator('.bs-canvas-stage canvas').evaluate(c=>c.toDataURL())).toBe(pngBefore);await expect(button('Export reviewed PNG')).toBeEnabled();await saveCompany();
  // Company save navigates Home and unmounts Editor (existing behaviour). We assert backend eligibility, NOT frontend approval persistence across navigation.
  const backend=applyCommand(getState(),'post.status',{id:main,status:'exported',designId:approved.id,pngSha256:approved.renderReceipt.pngSha256});expect(backend.state.posts.find(p=>p.id===main).status).toBe('exported');expect(JSON.stringify(getState().designs.find(d=>d.id===approved.id).renderReceipt)).toBe(receiptBefore);
  checks.push('Draft profile preview preserves the mounted approved bitmap; committed future-only profile retains backend exact-PNG review eligibility. Company save unmounts Editor; no cross-navigation frontend approval persistence claim');
  // Check intended capture surfaces before beginning the single optional capture batch.
  for(const theme of ['light','dark'])for(const width of [1320,390]){
    await configure(theme,width);await openCompany();await expect(label('Company design language')).toHaveValue('research-editorial');await focusedBounds(label('Company design language'),'Company language '+theme+' '+width,{modal:true});await closeDialog();
    await openPost();await openLook();await focusedBounds(family().getByRole('button',{name:'Lateral',exact:true}),'Arrangement '+theme+' '+width);await focusedBounds(label('CTA style'),'CTA style '+theme+' '+width);await expect(page.locator('.bs')).toHaveAttribute('data-bs-accent','blue');
    if(width===390){for(const control of [family().getByRole('button',{name:'Lateral',exact:true}),label('CTA style')])expect(await control.evaluate(el=>el.getBoundingClientRect().height)).toBeGreaterThanOrEqual(44);}
  }
  await configure('light',390,2);await openCompany();await focusedBounds(label('Company design language'),'Company language 200%-CSS-zoom',{modal:true});await page.keyboard.press('Escape');await expect(dialog).toHaveCount(0);
  await openPost();await openLook();await focusedBounds(family().getByRole('button',{name:'Lateral',exact:true}),'Arrangement 200%-CSS-zoom');await focusedBounds(label('CTA style'),'CTA style 200%-CSS-zoom');
  await page.getByRole('tab',{name:'Look',exact:true}).focus();await page.keyboard.press('ArrowLeft');await expect(page.getByRole('tab',{name:'Words',exact:true})).toBeFocused();await page.keyboard.press('ArrowRight');await expect(page.getByRole('tab',{name:'Look',exact:true})).toBeFocused();
  checks.push('Light/dark desktop/mobile and 390px 200%-CSS-zoom: native focus stays visible, controls remain accessible without horizontal overflow, host-blue controls retained, keyboard tab arrows work');
  expect(calls.every(c=>['state','status','command','fonts.file'].includes(c))).toBe(true);expect(calls.filter(c=>/generate|credential|models|catalog|import|profile/i.test(c))).toEqual([]);expect(commands.every(c=>['company.save','post.save','design.snapshot','design.review'].includes(c.type))).toBe(true);expect(errors).toEqual([]);
  console.log('FLEXIBLE UI POSITIVE CHECKS PASSED; optional single capture batch begins now.');
  if(process.env.BS_FLEX_UI_CAPTURE==='1'){
    for(const [surface,theme,width] of [['company','light',1320],['company','dark',390],['editor','dark',1320],['editor','light',390],['cta','dark',1320],['motif','light',390]]){
      await configure(theme,width);
      if(surface==='company'){await openCompany();await page.locator('.bs-language-previews').scrollIntoViewIfNeeded();await settle();}
      else{await openPost();await openLook();if(surface==='cta'){await label('CTA style').selectOption('pill');await label('CTA background colour').selectOption('accent');await label('CTA text colour').selectOption('auto');await saveDraft();await focusedBounds(label('CTA style'),'Captured CTA style');}else if(surface==='motif'){await label('Motif').selectOption('research-folio-v1');await setRange('Motif opacity',.5);await saveDraft();await focusedBounds(label('Motif'),'Captured SVG motif');}else{await family().scrollIntoViewIfNeeded();await settle();}}
      const filename=`flexible-${surface}-${theme}-${width===390?'mobile':'desktop'}.png`;await page.screenshot({path:path.join(output,filename)});captures.push(filename);if(surface==='company')await closeDialog();
    }
  }
  const report={passed:true,checks,metrics,captures,calls,commandTypes:[...new Set(commands.map(c=>c.type))],scope:'Fresh isolated Chromium, actual React/model/native renderer plus shipped Harness CSS. No authenticated existing-GUI claim. 200% is CSS zoom, not browser zoom. No paid generation/key/provider/network/profile service calls; local company compositionProfile command is domain metadata only. Cached font bytes reused from old local UI fixture. Frontend approval is not claimed to survive navigation/unmount.'};
  await fs.writeFile(path.join(output,'flexible-ui-report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}catch(error){console.error('FLEXIBLE UI FAILURE',await page.locator('body').innerText(),errors);await fs.mkdir(output,{recursive:true});await fs.writeFile(path.join(output,'flexible-ui-failure.json'),JSON.stringify({message:error.message,stack:error.stack,calls,errors,checks},null,2));throw error;}finally{await browser.close();}
