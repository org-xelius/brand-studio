import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { LAYOUTS, MOTIF_OPTIONS, CTA_STYLES, PROFILE_PRESETS, normalizeCompositionProfile, applyCompositionProfile, compositionProfileSha256, motifPlacementForLayout } from './composition-model.js';
import { DEFAULT_POSTER, DEFAULT_POSTER_V3, DEFAULT_POSTER_FLEX, normalizePoster, normalizePosterV3, resolvePoster, upgradePoster, upgradePosterFlexible } from './poster-model.js';
import { layoutPlan } from './src/layout-kernel-flex.js';
const flex = patch => normalizePoster({ version: 3, compilerVersion: 3, ...patch });

test('profile motif placement follows trusted family visual zones in all four native coordinate spaces', () => {
  const native = { square: [1080,1080], portrait: [1080,1350], story: [1080,1920], landscape: [1200,628] };
  for (const {id:layout} of LAYOUTS) for (const [format,[width,height]] of Object.entries(native)) for (const density of ['compact','balanced','generous']) {
    const [x,y,w,h] = layoutPlan(layout,format,density).visual, placement = motifPlacementForLayout(layout,format,density);
    assert.deepEqual(placement,{x:(x+w/2)/1080,y:(y+h/2)/(height/(width/1080)),scale:Math.max(.25,Math.min(1.4,w/650,h/390)),rotation:0});
    assert.ok(placement.x>=0 && placement.x<=1 && placement.y>=0 && placement.y<=1);
    assert.ok(placement.scale>=.25 && placement.scale<=1.4);
  }
  assert.deepEqual(motifPlacementForLayout('spread'),motifPlacementForLayout('spread','square','balanced'));
  assert.ok(motifPlacementForLayout('spread').x<.5,'research spread must place the motif on the left, not the generic right edge');
  for (const args of [['unknown'],['spread','banner'],['spread','square','airy']]) assert.throws(()=>motifPlacementForLayout(...args));
});

test('explicit profile application replaces language ratio groups and materializes placement only while keeping font/image overrides', () => {
  const formats=Object.fromEntries(['square','portrait','story','landscape'].map(format=>[format,{composition:{layout:'cover'},motif:{id:'orbit-v1',opacity:1,x:1,y:1,scale:2,rotation:180},cta:{style:'text'},typography:{headline:{size:123}},layers:{background:{opacity:.42}},cropX:.2,details:{text:'Retained annotation'},textColors:{body:'ink'}}]));
  const input=flex({motif:{id:'ribbon-v1',x:1,y:1,scale:2,rotation:150},formats}), before=JSON.stringify(input);
  const applied=normalizePoster(applyCompositionProfile(input,PROFILE_PRESETS[1].profile,1));
  assert.equal(applied.composition.layout,'spread');assert.deepEqual(Object.fromEntries(['x','y','scale','rotation'].map(k=>[k,applied.motif[k]])),motifPlacementForLayout('spread'));
  for (const format of ['square','portrait','story','landscape']) {
    const partial=applied.formats[format], resolved=resolvePoster(applied,format);
    assert.equal(Object.hasOwn(partial,'composition'),false);assert.equal(Object.hasOwn(partial,'cta'),false);
    assert.equal(resolved.composition.layout,'spread');assert.equal(resolved.motif.id,'decision-junction-v1');assert.equal(resolved.cta.style,'rounded');assert.equal(resolved.motif.opacity,.15);
    if(format==='square')assert.equal(Object.hasOwn(partial,'motif'),false);else assert.deepEqual(partial.motif,motifPlacementForLayout('spread',format));
    for(const key of ['typography','layers','cropX','details','textColors'])assert.deepEqual(partial[key],input.formats[format][key]);
  }
  assert.equal(JSON.stringify(input),before);
});

test('flexible catalog has six independent families, eight trusted motifs, six actions and frozen defaults', () => {
  assert.deepEqual(LAYOUTS.map(x=>x.id), ['lateral','broadside','specimen','centered','spread','cover']);
  assert.equal(MOTIF_OPTIONS.length,9); assert.equal(CTA_STYLES.length,6);
  assert.deepEqual(flex(),DEFAULT_POSTER_FLEX); assert.deepEqual(normalizePoster(),DEFAULT_POSTER);
  assert.deepEqual(normalizePosterV3(),DEFAULT_POSTER_V3);
  assert.equal(Object.isFrozen(DEFAULT_POSTER_FLEX.cta.fill),true);
  const a = flex(), b = flex(); a.cta.fill.value='paper'; assert.equal(b.cta.fill.value,'accent');
  for (const key of ['composition','motif','cta','textColors']) for (const compilerVersion of [undefined,2]) {
    const old = {version:3,[key]:{}}; if (compilerVersion) old.compilerVersion=compilerVersion;
    assert.throws(()=>normalizePoster(old),/Unsupported/);
  }
  assert.throws(()=>flex({formats:{story:{compilerVersion:3}}}),/root/);
});

test('all new groups accept literal endpoints and deep merge only partial per-format storage', () => {
  const poster = flex({ motif:{id:'orbit-v1',opacity:0,x:0,y:1,scale:0.25,rotation:-180}, cta:{text:{mode:'custom',value:'#Ab12Cd'},fill:{mode:'custom',value:'#123456'}},
    formats:{story:{composition:{layout:'cover'},motif:{opacity:1,scale:2,rotation:180},cta:{paddingX:0,paddingY:40,fill:{value:'#abcdef'},text:{mode:'auto'}},textColors:{headline:'paper'}}} });
  const before=structuredClone(poster), o=resolvePoster(poster,'story');
  assert.equal(o.motif.opacity,1); assert.equal(o.motif.id,'orbit-v1'); assert.equal(o.motif.rotation,180);
  assert.equal(o.composition.layout,'cover'); assert.equal(o.composition.density,'balanced'); assert.equal(o.cta.style,'strip');
  assert.deepEqual(o.cta.fill,{mode:'custom',value:'#abcdef'}); assert.deepEqual(o.cta.text,{mode:'auto'});
  assert.deepEqual(poster.formats.story.cta.fill,{value:'#abcdef'}); assert.deepEqual(poster,before);
  for (const {id:style} of CTA_STYLES) assert.equal(flex({cta:{style}}).cta.style,style);
});

test('new groups reject coercion, nonfinite values, unknown keys, invalid unions and unsafe colours at root and format', () => {
  const bad = [
    {composition:null},{composition:{layout:'unknown'}},{composition:{version:2}},{composition:{density:'airy'}},{composition:{extra:1}},
    {composition:{profile:{id:'custom',version:1,sha256:'a'.repeat(64),ordinal:-1}}},
    {motif:{id:'ribbon'}},{motif:{opacity:-.01}},{motif:{opacity:1.01}},{motif:{opacity:'0.5'}},{motif:{opacity:NaN}},{motif:{opacity:Infinity}},
    {motif:{x:1.01}},{motif:{y:null}},{motif:{scale:.24}},{motif:{rotation:181}},{motif:{color:'#abcdef'}},{motif:{url:'https://no.test'}},
    {cta:{style:'capsule'}},{cta:{width:'auto'}},{cta:{align:'justify'}},{cta:{paddingX:65}},{cta:{paddingY:-1}},{cta:{arrow:1}},
    {cta:{fill:{mode:'auto'}}},{cta:{fill:{mode:'custom',value:'#fff'}}},{cta:{fill:{mode:'palette',value:'#abcdef'}}},
    {cta:{text:{mode:'auto',value:'ink'}}},{cta:{text:{mode:'custom',value:'red'}}},{cta:{text:{mode:'palette',value:'text'}}},{cta:{text:null}},
    {cta:{fill:{mode:'custom',value:'url(javascript:1)'}}},{cta:{fill:{mode:'custom',value:'#123456',opacity:.5}}},
    {textColors:{cta:'paper'}},{textColors:{headline:'#abcdef'}},{textColors:[]},
  ];
  for(const patch of bad) {
    assert.throws(()=>flex(patch),undefined,JSON.stringify(patch));
    assert.throws(()=>flex({formats:{story:patch}}),undefined,`format ${JSON.stringify(patch)}`);
  }
});

test('explicit flexible upgrade maps legacy controls once while preserving all authored content and old upgrade-to-2', () => {
  const old=normalizePoster({version:3,compilerVersion:2,recipe:'showcase',typography:{headline:{size:180,fontId:'font-owned'}},details:{motif:'ribbon',strength:0,action:'capsule',text:'Annotation'},formats:{story:{details:{motif:'orbit',strength:1,action:'text'},typography:{body:{size:30}}}}});
  const before=JSON.stringify(old), next=upgradePosterFlexible(old), story=resolvePoster(next,'story');
  assert.equal(next.compilerVersion,3); assert.equal(next.motif.id,'ribbon-v1'); assert.equal(next.motif.opacity,.25); assert.equal(next.cta.style,'pill');
  assert.equal(story.motif.id,'orbit-v1'); assert.equal(story.motif.opacity,.9); assert.equal(story.cta.style,'text');
  assert.equal(next.details.text,'Annotation'); assert.equal(story.typography.headline.size,180); assert.equal(next.typography.headline.fontId,'font-owned');
  assert.deepEqual(upgradePosterFlexible(next),next); assert.equal(JSON.stringify(old),before);
  for(const input of [{version:2}, {version:3}, old]) assert.equal(upgradePoster(input).compilerVersion,2);
  assert.equal(upgradePosterFlexible({version:2}).motif.opacity,.15);
});

test('profile presets select approved company pools and use a stable real SHA256 without IO', () => {
  const [creative,research]=PROFILE_PRESETS.map(x=>normalizeCompositionProfile(x.profile));
  assert.deepEqual(creative.layouts,['lateral','broadside','specimen']); assert.deepEqual(creative.motifs,['proof-marks-v1','responsive-frames-v1','answer-exchange-v1']);
  assert.deepEqual(research.layouts,['centered','spread','cover']); assert.deepEqual(research.motifs,['research-folio-v1','decision-junction-v1','interface-modules-v1']);
  assert.equal(creative.cta.style,'pill'); assert.equal(research.cta.style,'rounded');
  const stable=v=>v && typeof v==='object' ? Array.isArray(v)?v.map(stable):Object.fromEntries(Object.keys(v).sort().map(k=>[k,stable(v[k])])) : v;
  assert.equal(compositionProfileSha256(creative),createHash('sha256').update(JSON.stringify(stable(creative))).digest('hex'));
  const reordered=Object.fromEntries(Object.entries(creative).reverse()); assert.equal(compositionProfileSha256(reordered),compositionProfileSha256(creative));
  const input=flex({typography:{headline:{size:170}}}), before=structuredClone(input), third=normalizePoster(applyCompositionProfile(input,creative,2));
  assert.equal(third.composition.layout,'specimen'); assert.equal(third.motif.id,'answer-exchange-v1'); assert.equal(third.composition.profile.ordinal,2);
  assert.equal(third.composition.profile.sha256,compositionProfileSha256(creative)); assert.equal(third.typography.headline.size,170); assert.deepEqual(input,before);
  assert.equal(applyCompositionProfile(input,{...creative,vary:false},2).composition.layout,'lateral');
});

test('profiles are strictly bounded, unique, palette owned and never silently repaired', () => {
  const good=PROFILE_PRESETS[0].profile;
  for (const patch of [{version:2},{id:'brand-specific'},{layouts:[]},{layouts:['lateral','lateral']},{layouts:['hero']},{motifs:[]},{motifs:['bad']},{motifs:['none','none']},{density:'bad'},{motifOpacity:NaN},{motifOpacity:1.1},{vary:1},{cta:{fill:{mode:'palette',value:'unowned'}}},{unknown:true}]) assert.throws(()=>normalizeCompositionProfile({...good,...patch}));
  for (const bad of [null,[],1,'creative-modular']) assert.throws(()=>normalizeCompositionProfile(bad));
  for (const ordinal of [-1,.5,NaN,Infinity,Number.MAX_SAFE_INTEGER+1]) assert.throws(()=>applyCompositionProfile({},good,ordinal));
});
