import test from 'node:test';import assert from 'node:assert/strict';
import { createState, applyCommand, validateState, snapshotForPost, imagePrompt, queueJobs, addAsset } from './model.js';
import { normalizePoster, resolvePoster, DEFAULT_POSTER_FLEX } from './poster-model.js';
import { TEMPLATES } from './template-model.js';
import { PROFILE_PRESETS } from './composition-model.js';
import { TEMPLATE_RESOURCES, templatePlan, templateFlowPlan } from './src/layout-kernel-template.js';
import { BUNDLED_FONT_METADATA } from './src/font-passports-v3.js';
let serial=0;const options={now:'2026-11-11T09:00:00Z',id:()=>`template-${++serial}`},cmd=(s,t,d)=>applyCommand(s,t,d,options);
// Local synthetic manifests exercise metadata binding only, not pixel/contrast certification.
function receipt(s){
 const p=s.posts[0],o=resolvePoster(p.poster,p.format),plan=templatePlan(o.composition.layout,p.format,o.composition.density);
 const font=(role)=>{const file=role==='headline'?'league-spartan-latin-wght-normal.woff2':'source-sans-3-latin-wght-normal.woff2';return {fontId:null,assetId:null,file,sha256:BUNDLED_FONT_METADATA[file].sha256,weight:role==='headline'?800:role==='body'?400:600,style:'normal',size:o.typography[role].size??({headline:plan.headlineSize*o.scale,body:plan.bodySize,cta:plan.ctaSize,brand:p.format==='landscape'?22:28,kicker:p.format==='landscape'?18:22}[role]),lineHeight:o.typography[role].lineHeight??(role==='headline'?plan.leading:role==='body'?1.3:1.15),tracking:0};};
 const fonts=Object.fromEntries(['headline','body','cta','brand','kicker'].map(r=>[r,font(r)]));
 const hh=fonts.headline.size*fonts.headline.lineHeight,bh=p.body.trim()?fonts.body.size*fonts.body.lineHeight:0,ch=fonts.cta.size*fonts.cta.lineHeight+2*o.cta.paddingY;
 const flow=templateFlowPlan(plan,{headlineHeight:hh,bodyHeight:bh,hasBody:!!p.body.trim(),ctaHeight:ch,ctaWidth:o.cta.width});const box=o.cta.width==='poster'?plan.posterCta:plan.cta,w=o.cta.width==='fit'?180:box[2],x=box[0]+(o.cta.align==='center'?(box[2]-w)/2:o.cta.align==='right'?box[2]-w:0),y=flow.ctaY;
 const layer=(role,text,b)=>({role,text,lines:[text],size:fonts[role].size,lineHeight:fonts[role].lineHeight,box:b});
 const layers=[layer('headline',p.headline||p.title,plan.title),...(p.body.trim()?[layer('body',p.body,[plan.body[0],flow.bodyY,plan.body[2],plan.body[3]])]:[])];
 const painted=!!p.cta.trim(),textBox=[x+o.cta.paddingX,y+o.cta.paddingY,Math.max(1,w-2*o.cta.paddingX-(o.cta.arrow?40:0)),ch-2*o.cta.paddingY];
 if(painted){layers.push(layer('cta',p.cta,textBox));if(o.cta.style!=='text')layers.push({role:'action',style:o.cta.style,fill:'#171717',box:[x,y,w,ch]});}layers.push(layer('brand',s.companies[0].name,plan.brand));
 const roles=['headline',...(p.body.trim()?['body']:[]),...(painted?['cta']:[]),...(o.kicker.trim()?['kicker']:[]),'brand',...(o.details.text.trim()?['annotation']:[])].map(role=>({role,color:'#f7f5ef',minimum:5,samples:100,passed:true}));
 return {pngSha256:'f'.repeat(64),manifest:{rendererVersion:3,compilerVersion:4,format:p.format,copy:{headline:p.headline||p.title,body:p.body,cta:p.cta,kicker:o.kicker},options:o,fonts,layers,assets:[],assetReferences:{backgroundAssetId:p.backgroundAssetId??'',foregroundAssetId:p.foregroundAssetId??'',productAssetId:p.assetIds.find(id=>s.assets.find(a=>a.id===id)?.role==='product')??'',logoAssetId:''},layout:structuredClone(TEMPLATE_RESOURCES[o.composition.layout]),motif:{id:'none',version:1,sha256:null,viewBox:null,opacity:o.motif.opacity,transform:{x:o.motif.x,y:o.motif.y,scale:o.motif.scale,rotation:o.motif.rotation},painted:false},cta:{style:o.cta.style,width:o.cta.width,align:o.cta.align,arrow:o.cta.arrow,painted,fill:painted&&o.cta.style!=='text'?'#171717':null,text:painted?'#f7f5ef':null,shapeBounds:painted?[x,y,w,ch]:null,textBounds:painted?textBox:null},protection:{textRendering:'fill-only',nonCtaBackground:'none',textBlocks:[],foregroundExclusions:[],contrast:{method:'opaque-glyph-interior',minimum:4.5,roles}}}};
}
function company(profile,kit){return cmd(createState(),'company.save',{name:'Known company',color:'#343a8a',description:'Confirmed services',guidelines:'Keep actual words',...(profile?{compositionProfile:profile}:{}),...(kit?{brandKit:kit}:{})});}
test('compiler4 generation applicability follows visible background mode and template quiet zones, never hidden legacy recipe',()=>{
 const c=company(),p=cmd(c.state,'post.save',{companyId:c.id,title:'Known',headline:'Exact',brief:'Known'}),request={postIds:[p.id],confirmed:true,requestId:'mode-only'};
 assert.throws(()=>queueJobs(p.state,request,options),/image|background|solid/i);assert.equal(p.state.jobs.length,0);
 const image=cmd(p.state,'post.save',{id:p.id,poster:{version:3,compilerVersion:4,recipe:'editorial',layers:{background:{mode:'image'}}}});assert.equal(queueJobs(image.state,request,options).jobs.length,1);
 for(const {id:layout} of TEMPLATES)for(const format of ['square','portrait','story','landscape']){
  const made=cmd(p.state,'post.save',{id:p.id,format,poster:{version:3,compilerVersion:4,composition:{layout},layers:{background:{mode:'image'}},cta:{width:'poster'}}}),prompt=imagePrompt(snapshotForPost(made.state,p.id)),plan=templatePlan(layout,format);
  assert.ok(prompt.includes(`template ${layout}`));assert.ok(prompt.includes(`Image background zone: [${plan.backgroundBox.join(', ')}]`));assert.ok(prompt.includes(`cta: [${plan.posterCta.join(', ')}]`));assert.match(prompt,/Reserve quiet, low-detail copy zones/);assert.match(prompt,/never image pixels|never render words|Never render words/);assert.match(prompt,/not a universal right-side subject/);
 }
});

test('template source A/B and literal zero/half/full opacity bind each independent image role without legacy recipe applicability',()=>{
 const c=company();let state=c.state;for(const role of ['backdrop','foreground','product'])for(const id of ['A','B'])state=addAsset(state,{id:`${role}-${id}`,companyId:c.id,name:`${role}-${id}`,role,mime:'image/png',bytes:100,createdAt:options.now});
 for(const [role,layer,ref]of [['backdrop','background','backgroundAssetId'],['foreground','foreground','foregroundAssetId'],['original-product','product','productAssetId']])for(const id of ['A','B'])for(const opacity of [0,.5,1]){
  const assetId=`${layer==='background'?'backdrop':layer}-${id}`,poster=normalizePoster({version:3,compilerVersion:4,recipe:'editorial',layers:{[layer]:{opacity,...(layer==='background'?{mode:'image'}:{})}}});
  const made=cmd(state,'post.save',{companyId:c.id,title:'Known',headline:'Exact',body:'Body',cta:'Visit',poster,...(layer==='product'?{assetIds:[assetId]}:{[ref]:assetId})}),s=made.state;
  // Select just this newly created post for the local public receipt fixture.
  s.posts=[s.posts.at(-1)];const r=receipt(s),o=resolvePoster(s.posts[0].poster,'square'),plan=templatePlan(o.composition.layout),sourceWidth=200,sourceHeight=100;
  let box,extra={opacity};
  if(role==='backdrop'){box=[-540,0,2160,1080];extra={...extra,mode:'image',blur:0,clipBox:[0,0,1080,1080],sourceCropped:true,policy:'cover authored backgroundBox; no text masks or tonal wash'};}
  else if(role==='foreground'){box=[464.8,588.8,496,248];extra={...extra,transform:o.layers.foreground,sourceCropped:false,protectedExclusions:[],overlapPixels:0,visiblePixels:opacity?100:0};}
  else {box=[520,557,496,248];extra={...extra,cropped:false,sourceCropped:false,policy:'contain complete original; no recolouring or perspective'};}
  r.manifest.assets=[{role,assetId,x:box[0],y:box[1],width:box[2],height:box[3],sourceWidth,sourceHeight,...extra}];r.manifest.layers.push({role,assetId,box});
  assert.equal(r.manifest.assetReferences[ref],assetId);const snap=cmd(s,'design.snapshot',{postId:made.id,renderReceipt:r});assert.equal(snap.state.designs[0].renderReceipt.manifest.assets[0].opacity,opacity);
  for(const mutate of [m=>m.assets[0].assetId=assetId.endsWith('A')?assetId.replace(/A$/,'B'):assetId.replace(/B$/,'A'),m=>m.assets[0].opacity=opacity===1?.5:1,m=>m.assets[0].sourceCropped=!m.assets[0].sourceCropped,m=>m.assets[0].x+=1]){const bad=structuredClone(r);mutate(bad.manifest);assert.throws(()=>cmd(s,'design.snapshot',{postId:made.id,renderReceipt:bad}));}
 }
 const made=cmd(state,'post.save',{companyId:c.id,title:'Solid with selected hidden resource',headline:'Exact',body:'Body',cta:'Visit',poster:{version:3,compilerVersion:4,layers:{background:{mode:'solid'}}},backgroundAssetId:'backdrop-A'}),s=made.state;s.posts=[s.posts.at(-1)];const r=receipt(s);assert.equal(r.manifest.assetReferences.backgroundAssetId,'backdrop-A');assert.equal(r.manifest.assets.length,0);assert.doesNotThrow(()=>cmd(s,'design.snapshot',{postId:made.id,renderReceipt:r}));
});

test('creation-only inheritance fits generic normalized compiler4 anchors without resetting fonts, opacity, pinned look or manual format poses',()=>{
 const source={version:3,compilerVersion:4,voice:'clean',treatment:'brand',kicker:'exact.site',scale:1.1,heroScale:1.2,typography:{headline:{weight:800,size:96,lineHeight:1.4,tracking:.02}},layers:{background:{mode:'image',opacity:.35},foreground:{opacity:.5}},cta:{style:'pill',width:'column',fill:{mode:'custom',value:'#123456'}},formats:{portrait:{layers:{foreground:{x:.23,scale:1.2,rotation:17,opacity:.4}}},story:{composition:{layout:'subject-right'},layers:{background:{opacity:.2}}}}};
 const c=company(undefined,{poster:source}),stored=c.state.companies[0].brandKit.poster,before=JSON.stringify(stored),made=cmd(c.state,'post.save',{companyId:c.id}),p=made.state.posts[0].poster;
 assert.equal(stored.layers.foreground.x,.66);assert.equal(stored.layers.foreground.y,.66);
 for(const f of ['square','story','landscape']){const o=resolvePoster(p,f),plan=templatePlan(o.composition.layout,f,o.composition.density),[x,y,w,h]=plan.visual,height={square:1080,story:1920,landscape:565.2}[f];assert.equal(o.layers.foreground.x,(x+w/2)/1080);assert.equal(o.layers.foreground.y,(y+h/2)/height);assert.equal(o.layers.foreground.opacity,.5);assert.equal(o.layers.foreground.scale,1);assert.equal(o.layers.foreground.rotation,0);}
 const portrait=resolvePoster(p,'portrait');assert.equal(portrait.layers.foreground.x,.23);assert.equal(portrait.layers.foreground.y,.66);assert.equal(portrait.layers.foreground.scale,1.2);assert.equal(portrait.layers.foreground.rotation,17);assert.equal(portrait.layers.foreground.opacity,.4);
 assert.deepEqual(p.typography,stored.typography);assert.deepEqual(p.cta,stored.cta);assert.equal(p.scale,1.1);assert.equal(p.heroScale,1.2);assert.equal(p.voice,'clean');assert.equal(p.treatment,'brand');assert.equal(p.kicker,'exact.site');assert.deepEqual(p.layers.background,stored.layers.background);assert.equal(resolvePoster(p,'story').layers.background.opacity,.2);assert.equal(JSON.stringify(made.state.companies[0].brandKit.poster),before);
 const pinned=cmd(c.state,'campaign.save',{companyId:c.id,name:'Pinned',goal:'Known',artDirection:source}),copy=cmd(pinned.state,'post.save',{companyId:c.id,campaignId:pinned.id});assert.deepEqual(copy.state.posts[0].poster,p);assert.equal(JSON.stringify(copy.state.campaigns[0].artDirection),before);
 const explicit=cmd(c.state,'post.save',{companyId:c.id,poster:stored});assert.deepEqual(explicit.state.posts[0].poster,stored);const frozen=JSON.stringify(explicit.state.posts[0].poster),edited=cmd(explicit.state,'post.save',{id:explicit.id,format:'story'});assert.equal(JSON.stringify(edited.state.posts[0].poster),frozen);
});

test('authored saved compiler4 company and pinned campaign foreground geometry survives new inherited copies',()=>{
 const look=normalizePoster({version:3,compilerVersion:4,layers:{foreground:{x:.23,y:.4,scale:1.2,rotation:17,opacity:.4}},typography:{headline:{size:90}},formats:{portrait:{layers:{foreground:{x:.31}}}}});
 const c=company(undefined,{poster:look}),copy=cmd(c.state,'post.save',{companyId:c.id});assert.deepEqual(copy.state.posts[0].poster,look);
 const campaign=cmd(copy.state,'campaign.save',{companyId:c.id,name:'Pinned',goal:'Known',artDirection:look}),made=cmd(campaign.state,'post.save',{companyId:c.id,campaignId:campaign.id});assert.deepEqual(made.state.posts.at(-1).poster,look);assert.deepEqual(made.state.campaigns[0].artDirection,look);
});

test('new template receipts bind trusted resources, measured poster footer and strict nondecorative literal layers',()=>{
 const c=company(),made=cmd(c.state,'post.save',{companyId:c.id,title:'Known',headline:'Exact',body:'Body',cta:'Visit'}),r=receipt(made.state);
 const snapped=cmd(made.state,'design.snapshot',{postId:made.id,renderReceipt:r});assert.equal(snapped.state.designs[0].scene.compilerVersion,4);assert.equal(snapped.state.designs[0].scene.resources.layout.id,'bold-backdrop');validateState(snapped.state);
 for(const mutate of [m=>m.layout.sha256='a'.repeat(64),m=>m.motif.painted=true,m=>m.protection.textBlocks.push([0,0,10,10]),m=>m.cta.width='column',m=>m.cta.shapeBounds[0]+=20,m=>m.cta.shapeBounds[1]-=20,m=>m.copy.headline='Shortened',m=>m.fonts.headline.sha256='a'.repeat(64),m=>m.layers[0].box[3]+=1,m=>m.layers[0].overflow=true,m=>m.layers.push({role:'action',style:'strip',fill:'#171717',box:[0,0,1080,1080]}),m=>m.layers.push({role:'tonal',strength:.2}),m=>m.assets.push({role:'backdrop',assetId:'unselected',opacity:.5})]){const bad=structuredClone(r);mutate(bad.manifest);assert.throws(()=>cmd(made.state,'design.snapshot',{postId:made.id,renderReceipt:bad}));}
 const image=cmd(made.state,'post.save',{id:made.id,poster:{...made.state.posts[0].poster,layers:{background:{mode:'image',opacity:0}}}});assert.throws(()=>cmd(image.state,'design.snapshot',{postId:made.id,renderReceipt:receipt(image.state)}),/background|Backdrop|resource/i);
});

test('new unsupplied posts default4 while explicit1-3 options and existing queued/scenes remain immutable',()=>{
 const c=company(),made=cmd(c.state,'post.save',{companyId:c.id,title:'Exact title',headline:'Exact headline',body:'Exact body',cta:'Visit exact.site'}),p=made.state.posts[0];
 assert.equal(p.poster.version,3);assert.equal(p.poster.compilerVersion,4);assert.equal(p.poster.composition.layout,'bold-backdrop');assert.equal(p.poster.layers.background.mode,'solid');assert.equal(p.poster.cta.width,'poster');
 for(const poster of [{version:2},{version:3},{version:3,compilerVersion:2},DEFAULT_POSTER_FLEX]){const old=cmd(made.state,'post.save',{companyId:c.id,title:'Old',brief:'Known',poster}),before=JSON.stringify(old.state.posts.at(-1));const queued=queueJobs(old.state,{postIds:[old.id],confirmed:true,requestId:`request-${++serial}`},options),snapshot=JSON.stringify(queued.state.jobs.at(-1).snapshot),prompt=imagePrompt(queued.state.jobs.at(-1).snapshot);const edited=cmd(queued.state,'post.save',{id:old.id,format:'portrait'});assert.deepEqual(edited.state.posts.at(-1).poster,normalizePoster(poster));assert.equal(JSON.stringify(edited.state.jobs.at(-1).snapshot),snapshot);assert.equal(imagePrompt(edited.state.jobs.at(-1).snapshot),prompt);assert.equal(JSON.stringify(old.state.posts.at(-1)),before);validateState(edited.state);}
});
test('old company profile families map deterministically at creation without motifs or campaign rerolls',()=>{
 const map={lateral:'subject-right',broadside:'bold-backdrop',specimen:'image-lead',centered:'centered-announcement',spread:'service-sheet',cover:'bold-backdrop'};
 for(const preset of PROFILE_PRESETS){const c=company(preset.profile);let s=c.state;for(let i=0;i<4;i++){const made=cmd(s,'post.save',{companyId:c.id});s=made.state;const p=s.posts.at(-1);assert.equal(p.poster.compilerVersion,4);assert.equal(p.poster.composition.layout,map[preset.profile.layouts[i%3]]);assert.equal(p.poster.motif.id,'none');assert.equal(p.poster.details.surface,'flat');assert.equal(p.poster.cta.width,preset.profile.cta.width==='full'?'column':preset.profile.cta.width);assert.equal(s.compositionCursors[c.id],i+1);const b=JSON.stringify(p.poster);snapshotForPost(s,p.id);validateState(s);s=cmd(s,'post.save',{id:p.id,format:'story'}).state;assert.equal(JSON.stringify(s.posts.at(-1).poster),b);}}
 const c=company({id:'custom',layouts:TEMPLATES.map(t=>t.id),motifs:['none'],vary:true,cta:{width:'poster'}});let s=c.state;for(const t of TEMPLATES){const p=cmd(s,'post.save',{companyId:c.id});s=p.state;assert.equal(s.posts.at(-1).poster.composition.layout,t.id);}
});
