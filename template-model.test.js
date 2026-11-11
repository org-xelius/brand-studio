import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizePoster, resolvePoster } from './poster-model.js';
import { TEMPLATES, TEMPLATE_DEFAULTS, upgradePosterTemplate, applyTemplate, setTemplateFormatGroup, applyTemplateLookToFormats } from './template-model.js';

test('current-format edit changes resolved opacity rather than a masked base value; apply look removes competing overrides',()=>{
 const poster=normalizePoster({version:3,compilerVersion:4,layers:{background:{opacity:.9}},formats:{portrait:{layers:{background:{opacity:.2}}}}});
 assert.equal(resolvePoster(poster,'portrait').layers.background.opacity,.2);
 const next=setTemplateFormatGroup(poster,'portrait','layers',{background:{opacity:.5}});
 assert.equal(next.layers.background.opacity,.9);
 assert.equal(resolvePoster(next,'portrait').layers.background.opacity,.5);
 assert.equal(resolvePoster(next,'square').layers.background.opacity,.9);
 const all=applyTemplateLookToFormats(next,'portrait');
 for(const f of ['square','portrait','story','landscape'])assert.equal(resolvePoster(all,f).layers.background.opacity,.5);
 assert.equal(Object.hasOwn(all,'formats'),false);
});

test('compiler4 complete and partial groups are strict, literal and opt-in; old defaults remain byte exact',()=>{
 const old=[{version:2},{version:3},{version:3,compilerVersion:2},{version:3,compilerVersion:3}].map(normalizePoster);
 const bytes=old.map(JSON.stringify),p=normalizePoster({version:3,compilerVersion:4});
 assert.equal(TEMPLATES.length,10);assert.equal(p.composition.layout,'bold-backdrop');assert.equal(p.layers.background.mode,'solid');assert.equal(p.layers.background.opacity,1);assert.equal(p.layers.foreground.opacity,1);assert.equal(p.layers.product.opacity,1);assert.equal(p.cta.width,'poster');assert.equal(p.cta.fill.value,'ink');
 const partial=normalizePoster({...p,formats:{portrait:{layers:{background:{mode:'image',opacity:0},foreground:{opacity:.5},product:{opacity:1}},cta:{width:'column'}}}});
 assert.deepEqual(partial.formats.portrait.layers.foreground,{opacity:.5});assert.equal(resolvePoster(partial,'portrait').layers.foreground.x,.66);
 for(const value of [null,undefined,'0',NaN,Infinity,-.1,1.1])for(const role of ['background','foreground','product'])assert.throws(()=>normalizePoster({...p,layers:{[role]:{opacity:value}}}));
 for(const bad of [{layers:{background:{mode:'photo'}}},{layers:{foreground:{opacity:.5,extra:1}}},{layers:{product:{scale:1}}},{cta:{width:'full'}},{motif:{id:'orbit-v1'}},{composition:{layout:'lateral'}},{details:{surface:'tonal'}},{formats:{story:{compilerVersion:4}}},{formats:{portrait:{motif:{id:'ribbon-v1'}}}}])assert.throws(()=>normalizePoster({...p,...bad}));
 assert.deepEqual(old.map(normalizePoster).map(JSON.stringify),bytes);
});

test('explicit template upgrade preserves inherited image opacity and fonts while removing inactive decoration',()=>{
 const old=normalizePoster({version:3,compilerVersion:3,recipe:'hero',layers:{background:{opacity:.2,blur:4},foreground:{scale:1.2}},composition:{layout:'spread'},motif:{id:'orbit-v1'},details:{surface:'tonal'},typography:{headline:{fontId:'owned',weight:700,size:96,lineHeight:1.3,tracking:.02}},cta:{width:'full',fill:{mode:'custom',value:'#123456'}},formats:{portrait:{recipe:'editorial',layers:{background:{opacity:.7}}}}});
 const before=JSON.stringify(old),p=upgradePosterTemplate(old,true);assert.equal(JSON.stringify(old),before);
 assert.equal(p.composition.layout,'service-sheet');assert.equal(p.layers.background.mode,'image');assert.equal(p.layers.background.opacity,.2);assert.equal(p.layers.foreground.scale,1.2);assert.equal(p.layers.foreground.opacity,1);assert.equal(p.motif.id,'none');assert.equal(p.details.surface,'flat');assert.deepEqual(p.typography.headline,old.typography.headline);assert.equal(p.cta.width,'column');assert.deepEqual(p.cta.fill,old.cta.fill);
 assert.equal(resolvePoster(p,'portrait').layers.background.mode,'solid');assert.equal(resolvePoster(p,'portrait').layers.background.opacity,.7);
 const partial=upgradePosterTemplate({...old,formats:{story:{composition:{density:'compact'},cta:{style:'rounded'}}}},true);assert.equal(resolvePoster(partial,'story').composition.layout,'service-sheet');assert.equal(resolvePoster(partial,'story').cta.width,'column');assert.equal(resolvePoster(partial,'story').cta.style,'rounded');assert.equal(Object.hasOwn(partial.formats.story.composition,'layout'),false);assert.equal(Object.hasOwn(partial.formats.story.cta,'width'),false);
 for(const [from,to]of Object.entries({lateral:'subject-right',broadside:'bold-backdrop',cover:'bold-backdrop',specimen:'image-lead',centered:'centered-announcement',spread:'service-sheet'}))assert.equal(upgradePosterTemplate({version:3,compilerVersion:3,composition:{layout:from}}).composition.layout,to);
});

test('apply look reflows authored foreground anchors but copies manual poses literally without resetting typography',()=>{
 const base=normalizePoster({version:3,compilerVersion:4,typography:{headline:{size:96,lineHeight:1.4}},layers:{foreground:{opacity:.4}}}),p=applyTemplate(base,'subject-right','portrait');
 // A deliberate font choice made after arrangement selection must survive apply-to-all.
 const sized=setTemplateFormatGroup(p,'portrait','typography',{headline:{size:123,lineHeight:1.3}}),all=applyTemplateLookToFormats(sized,'portrait');
 const expected={square:[823/1080,535/1080],portrait:[823/1080,665/1350],story:[815/1080,960/1920],landscape:[839/1080,291/565.2]};
 for(const[f,[x,y]]of Object.entries(expected)){const o=resolvePoster(all,f);assert.equal(o.layers.foreground.x,x);assert.equal(o.layers.foreground.y,y);assert.equal(o.layers.foreground.opacity,.4);assert.equal(o.typography.headline.size,123);assert.equal(o.typography.headline.lineHeight,1.3);}
 const moved=setTemplateFormatGroup(sized,'portrait','layers',{foreground:{x:.23,scale:1.2,rotation:17}}),manual=applyTemplateLookToFormats(moved,'portrait');assert.equal(Object.hasOwn(manual,'formats'),false);
 for(const f of Object.keys(expected)){const t=resolvePoster(manual,f).layers.foreground;assert.equal(t.x,.23);assert.equal(t.scale,1.2);assert.equal(t.rotation,17);assert.equal(t.opacity,.4);}
});

test('actual template selection places foreground inside the authored visual slot in every format, never generic source defaults',()=>{
 const p=normalizePoster({version:3,compilerVersion:4,layers:{foreground:{opacity:.5,scale:1.5,rotation:20,x:.2,y:.3}}});
 const all=applyTemplate(p,'subject-right','portrait',true);
 const expected={square:[823/1080,535/1080],portrait:[823/1080,665/1350],story:[815/1080,960/1920],landscape:[839/1080,291/565.2]};
 for(const [f,[x,y]]of Object.entries(expected)){const t=resolvePoster(all,f).layers.foreground;assert.equal(t.x,x);assert.equal(t.y,y);assert.equal(t.scale,1);assert.equal(t.rotation,0);assert.equal(t.opacity,.5);}
 const one=applyTemplate(p,'subject-right','portrait');assert.equal(resolvePoster(one,'portrait').layers.foreground.x,823/1080);assert.equal(resolvePoster(one,'square').layers.foreground.x,.2);
});

test('template selection is deterministic and scope-aware and resets role sizing without losing owned font choices or images',()=>{
 const p=normalizePoster({version:3,compilerVersion:4,layers:{background:{mode:'image',opacity:.35},foreground:{opacity:.2},product:{opacity:.5}},typography:{headline:{fontId:'owned',weight:700,size:96,lineHeight:1.3,tracking:.03}},cta:{fill:{mode:'custom',value:'#123456'}},formats:{portrait:{typography:{headline:{size:120,lineHeight:1.5,fontId:'portrait-owned',weight:600}},layers:{background:{opacity:.1}},cta:{width:'fit'}}}});
 const before=JSON.stringify(p),one=applyTemplate(p,'subject-right','portrait');assert.equal(JSON.stringify(p),before);assert.equal(one.composition.layout,'bold-backdrop');
 const o=resolvePoster(one,'portrait');assert.equal(o.composition.layout,'subject-right');assert.equal(o.typography.headline.size,null);assert.equal(o.typography.headline.lineHeight,null);assert.equal(o.typography.headline.fontId,'portrait-owned');assert.equal(o.typography.headline.weight,600);assert.equal(o.typography.headline.tracking,.03);assert.equal(o.scale,1);assert.equal(o.cta.width,'column');assert.equal(o.layers.background.opacity,.1);assert.equal(o.layers.product.opacity,.5);assert.deepEqual(o.cta.fill,p.cta.fill);
 const all=applyTemplate(p,'bold-backdrop','portrait',true);for(const f of ['square','portrait','story','landscape']){const r=resolvePoster(all,f);assert.equal(r.composition.layout,'bold-backdrop');assert.equal(r.cta.width,'poster');assert.equal(r.typography.headline.size,null);assert.equal(r.typography.headline.lineHeight,null);}assert.equal(resolvePoster(all,'portrait').layers.background.opacity,.1);assert.equal(resolvePoster(all,'portrait').typography.headline.fontId,'portrait-owned');
 assert.deepEqual(all,applyTemplate(p,'bold-backdrop','portrait',true));
});
