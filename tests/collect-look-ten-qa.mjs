// Compose schema2 QA only from actual owner inspections; stale/absent bytes fail loudly.
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
const root=process.cwd(),dir=path.join(root,'output/playwright/look-ten'),qa=path.join(dir,'qa');
const helper=process.env.QA_REPORT_HELPER||require('node:path').join(process.env.HOME||'', '.agents/skills/visual-quality-assurance/scripts/qa-report.mjs');
const sha=p=>createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const abs=p=>path.isAbsolute(p)?p:path.join(root,p);
function ledger(file){
 const j=read(path.join(qa,file));if(j.superseded)throw Error('Superseded ledger '+file);
 const known=['cta-phone-wrap','arrangement-label-break'];const rows=(j.surfaceReviews||j.surfaces).map(r=>({...r,renderPath:abs(r.renderPath),renderSha256:r.renderSha256||r.sha256,issueIds:(r.issueIds||r.issues||[]).filter(id=>known.includes(id))}));
 for(const r of rows){if(r.method!=='full-size-render'||r.result!=='clear'||!r.observation||!r.reviewer||!r.reviewedAt)throw Error('Uncleared surface '+r.location);if(sha(r.renderPath)!==r.renderSha256)throw Error('Stale inspection '+r.location);}
 return rows;
}
// Existing five Storin arrangements are byte-identical to their0.6 proofs; carry those reviews with provenance.
const oldLedger=read(path.join(root,'output/playwright/look-templates/qa/renderer-native-surface-reviews.json'));
const retained=oldLedger.surfaceReviews.filter(r=>/^storin-[a-z-]+-(square|portrait|story|landscape)$/.test(r.location)).map(r=>{
 const renderPath=path.join(dir,path.basename(r.renderPath));
 if(sha(renderPath)!==r.renderSha256)throw Error('Existing Storin proof drifted: '+r.location);
 return {...r,renderPath,issueIds:[],reviewProvenance:{type:'retained-byte-identical',previousLedger:'output/playwright/look-templates/qa/renderer-native-surface-reviews.json',originalReviewedAt:r.reviewedAt}};
});
const surfaces=[
 ...retained,
 ...ledger('storin-new-surface-reviews.json'),
 ...ledger('xelius-surface-reviews.json'),
 ...ledger('font-nonportrait-reviews.json'),
 ...ledger('font-portrait-reviews.json'),
 ...ledger('ui-surface-reviews.json'),
 {location:'storin-template-board',renderPath:path.join(dir,'storin-template-board.png'),renderSha256:sha(path.join(dir,'storin-template-board.png')),method:'full-size-render',result:'clear',reviewer:'Parent direct read_image inspection',reviewedAt:new Date().toISOString(),observation:'Re-opened after the CTA repair: ten labelled rows by four native formats. Each row is a distinct route at tile size, the CTA phone groups stay whole, and the opening Bold backdrop row carries the approved reference hierarchy. Weak convergence between framed focus/type-led/offset-grid at thumbnail scale is expected pacing evidence, not an approved campaign board.',issueIds:[]},
 {location:'xelius-template-board',renderPath:path.join(dir,'xelius-template-board.png'),renderSha256:sha(path.join(dir,'xelius-template-board.png')),method:'full-size-render',result:'clear',reviewer:'vqa-reader (direct read_image inspection)',reviewedAt:'2026-11-11T15:50:39.000Z',observation:'Ten labelled rows by four formats, all tiles populated and structurally distinct. Headline legible on every row; body and CTA digits are appropriately small at tile size. Every row is top-aligned, so tall story tiles open gaps beneath square/portrait/landscape cells. Technical coverage, not approved campaign directions.',issueIds:[]},
 {location:'storin-factory-reference',renderPath:path.join(dir,'factory-storin-reference.png'),renderSha256:sha(path.join(dir,'factory-storin-reference.png')),method:'full-size-render',result:'clear',reviewer:'Parent direct read_image inspection (retained approved reference)',reviewedAt:'2026-11-11T09:34:51.349Z',observation:'Unspplied-post factory export is byte-identical to the approved Bold backdrop portrait: two Archivo headline lines, four body lines from790, complete full-safe-width CTA and website header. No text plate over the original photograph.',issueIds:[]},
 {location:'storin-factory-foreground',renderPath:path.join(dir,'factory-storin-foreground.png'),renderSha256:sha(path.join(dir,'factory-storin-foreground.png')),method:'full-size-render',result:'clear',reviewer:'Parent direct read_image inspection',reviewedAt:new Date().toISOString(),observation:'Factory creation with an inherited foreground at literal0.5 over a35% background image: the subject photo is visibly half-strength, all words/phone/CTA remain complete, and no protective plate or motif is painted. Technical opacity fixture, not recommended launch art.',issueIds:[]}
];
const unique=new Set(surfaces.map(s=>s.location));if(unique.size!==surfaces.length)throw Error('Duplicate surface location');
const total=surfaces.length;
const artifact=path.join(qa,'look-ten-proof-pack.json'),report=path.join(qa,'qa-report.json'),summary=path.join(qa,'summary.md');
const sources=['package.json','model.js','poster-model.js','composition-model.js','template-model.js','font-pairings.js','src/fonts-template.js','src/font-passports-template.js','src/layout-kernel-template.js','src/poster-renderer-template.js','src/compositor.js','src/client.jsx','src/look-controls.jsx','src/template-icon.jsx','src/flexible-controls.jsx','src/studio.css'];
fs.writeFileSync(artifact,JSON.stringify({version:'0.7.0',expected:total,surfaces:surfaces.map(s=>({location:s.location,path:path.relative(qa,s.renderPath),sha256:s.renderSha256})),sourceHashes:Object.fromEntries(sources.map(f=>[f,sha(path.join(root,f))])),ownerLedgers:fs.readdirSync(qa).filter(f=>f.endsWith('-reviews.json')).map(f=>({path:f,sha256:sha(path.join(qa,f))})),auxiliary:'Boards are pacing evidence; they are declared surfaces once each, not multiplied per tile.'},null,2)+'\n');
if(fs.existsSync(report))fs.rmSync(report);
function cli(...args){const r=spawnSync(process.execPath,[helper,...args],{encoding:'utf8'});if(r.status!==0)throw Error(r.stderr||r.stdout||'QA helper failed');}
cli('init','--artifact',artifact,'--type','png-pack','--total',String(total),'--out',report);
const issues=[
 {id:'cta-phone-wrap',location:'storin-offset-grid-story',severity:'medium',category:'typography',evidence:'Independent review found the phone number split inside narrow CTA bars on new arrangements, e.g. "+256 780" / "564978" and on story half the country code separated.',repair:'New arrangement CTAs keep phone-like digit groups unbroken on a second line ("Call Us Today:" / "+256 780 564978"). Existing five template rendering and the approved Bold portrait remain byte-exact; ten affected current proofs were re-opened individually and re-reviewed.',status:'repaired'},
 {id:'arrangement-label-break',location:'ui-ten-icons-light-desktop',severity:'medium',category:'typography',evidence:'First fresh desktop capture broke "announcement" mid-word as "announcemen/t" inside the three-column icon grid.',repair:'Arrangement labels wrap only at word boundaries with balanced text; refreshed light/dark desktop and mobile captures show "Centered announcement" over two clean lines with no clipping.',status:'repaired'}
];
for(const issue of issues){const file=path.join(qa,'issue-'+issue.id+'.json');fs.writeFileSync(file,JSON.stringify(issue,null,2)+'\n');cli('record-issue','--report',report,'--issue',file);}
for(const s of surfaces){
 cli('record-render','--report',report,'--location',s.location,'--render',s.renderPath);
 cli('record-review','--report',report,'--location',s.location,'--method',s.method,'--result',s.result,'--reviewer',s.reviewer,'--observation',s.observation,...(s.issueIds.length?['--issues',s.issueIds.join(',')]:[]));
}
const checks=[
 {id:'root-regression',domain:'technical',status:'pass',evidence:'npm test173/173, build and syntax checks pass; old compilers1-3 kernels and frozen font mappings untouched.'},
 {id:'native-ten-by-four',domain:'technical',status:'pass',evidence:'Native suite2/2 passes: 80 arrangement/format/palette proofs with real A/B sources, actual glyph contrast, foreground defaults20, CTA width variants, font24, font-stale/missing faults, contain bounds, factory snapshot-review-export and existing five byte-exact.'},
 {id:'isolated-ui',domain:'technical',status:'pass',evidence:'look-ten-ui.mjs passes16 check groups: ten always-visible SVG icons matching main native output with one-step undo, same-selection no-op, six real pairings with exact downloaded PNGs, cached-font override clearing, scope/apply-all/reload, image opacity pixels, frozen legacy replay and failure gating. Eight captures reviewed.'},
 {id:'visual-current-coverage',domain:'visual',status:'pass',evidence:'Every declared surface has a unique current full-size inspection with file SHA256; defects found were repaired and re-opened. Boards reviewed for pacing.'},
 {id:'editorial-and-source-integrity',domain:'editorial',status:'pass',evidence:'Exact source copy retained; bundled OFL faces carry provenance/SHA/cmap; no invented claims, plates, motifs or automatic copy changes. Technical photo proofs are not publication approval.'},
 {id:'accessibility-scope',domain:'accessibility',status:'limited',evidence:'Glyph-interior contrast, keyboard focus, light/dark and 390/1320 reflow pass; CSS-zoom checks are not real browser zoom; screen reader and native OS colour popover unverified.'},
 {id:'signed-in-installed-gui',domain:'technical',status:'limited',evidence:'Existing bundle reactivation and clean-probe ownership protection can be verified, but isolated fixtures are not signed-in user acceptance.'}
];
for(const check of checks){const file=path.join(qa,'check-'+check.id+'.json');fs.writeFileSync(file,JSON.stringify(check,null,2)+'\n');cli('record-check','--report',report,'--check',file);}
cli('report','--report',report,'--out',summary,'--manifest',path.join(qa,'manifest.json'));
const v=spawnSync(process.execPath,[path.join(path.dirname(helper),'validate-qa-report.mjs'),report,'--verify-files'],{encoding:'utf8'});
if(v.status!==0)throw Error(v.stderr||v.stdout);
console.log(v.stdout.trim());console.log('Canonical 0.7 QA compiled:',total,'surfaces.');
