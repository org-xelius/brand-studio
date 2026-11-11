import test from 'node:test';
import assert from 'node:assert/strict';
import {chromium} from '@playwright/test';
import {writeFile,readFile} from 'node:fs/promises';
import path from 'node:path';
import {buildV3Harness} from './renderer-v3-harness.build.mjs';
import {legacyFixturesReady,legacyFixtureHint} from './legacy-fixtures.mjs';

test('v3: exact local fonts, independent alpha layers, twelve ratios, strict fit, manifest truth and untouched v2 pixels',{skip:legacyFixturesReady()?false:legacyFixtureHint},async()=>{
 const {out,html}=await buildV3Harness(),browser=await chromium.launch({channel:'chromium',headless:true,args:['--disable-accelerated-2d-canvas']});
 try{
  const page=await browser.newPage({viewport:{width:1600,height:1100}}),errors=[],requests=[];
  page.on('pageerror',e=>errors.push(e.message));await page.route('https://brand-studio.test/**',r=>{requests.push(r.request().url());return r.fulfill({status:200,contentType:'text/html',body:html});});
  await page.goto('https://brand-studio.test/');await page.waitForFunction(()=>window.__ready,{},{timeout:60000});
  const proofs=await page.evaluate(()=>window.__proofs);await writeFile(path.join(out,'manifest.json'),JSON.stringify(proofs,null,2));assert.deepEqual(errors,[]);
  for(const p of proofs){assert.deepEqual(p.errors,[],p.recipe+'/'+p.format+': '+p.errors.join(' '));assert.ok(Buffer.byteLength(JSON.stringify(p.manifest))<=128*1024,'receipt manifest fits bounded domain envelope');}
  const checks=await page.evaluate(async()=>{
   const {render,compose,renderPoster,company,makePost,background,foreground,metadata,anton,getFont,resolvePoster}=window.__v3;const base=makePost();
   const run=async(patch={},extra={})=>render({...base,...patch},{background,foreground,...extra});
   const a=await run(),b=await run({poster:{...base.poster,scale:1.15}}),explicit=await run({poster:{...base.poster,typography:{headline:{size:60},cta:{size:50,lineHeight:1.1,tracking:.03}}}});
   const long=await run({cta:'An extremely long unbreakable CTA label '.repeat(30),poster:{...base.poster,typography:{cta:{size:72}}}});
   const glyph=await run({headline:'日本語'}),badWeight=await run({poster:{...base.poster,typography:{headline:{fontId:metadata.id,weight:800}}}});
   const badHash=await run({}, {getFont:async()=>({...metadata.faces[0],dataUrl:anton.slice(0,-8)+'AAAAAAAA'})});
   const badMeta=await run({}, {getFont:async()=>({...metadata.faces[0],dataUrl:anton,coverage:[[0,0x10ffff]]})});
   const missing=await run({}, {getFont:async()=>{throw Error('Offline file missing');}});
   const foreign=await run({}, {fonts:[{...metadata,companyId:'another-company'}]});
   const extended=await run({headline:'Tiếng Việt Ǎ'});
   const frame=document.createElement('iframe');document.body.append(frame);const FontConstructor=window.FontFace;let fontFailure;try{window.FontFace=class {constructor(){throw Error('Synthetic local FontFace failure');}};fontFailure=await compose(frame.contentDocument.createElement('canvas'),{company,post:base,fonts:[metadata],getFont,background,foreground});}finally{window.FontFace=FontConstructor;frame.remove();}
   const changed=await run({backgroundAssetId:'selected-current-background',foregroundAssetId:'selected-current-foreground'},{design:{id:'stale-design',assetId:'stale-background',foregroundAssetId:'stale-foreground'}});
   const merge=resolvePoster({version:3,typography:{body:{size:40,tracking:.02}},layers:{foreground:{rotation:12,scale:1.2}},formats:{story:{typography:{body:{lineHeight:1.5}},layers:{foreground:{x:.2}}}}},'story');
   const back=await run({poster:{...base.poster,layers:{headlineDepth:'behind'}}}),front=await run({poster:{...base.poster,layers:{headlineDepth:'front'}}});
   const moved=await run({poster:{...base.poster,layers:{foreground:{x:.8,y:.7,scale:.6,rotation:15},background:{opacity:.6,blur:4}}}});
   const auditions=[];for(const variation of ['balanced','type-led','image-led']){const v=await run({poster:{...base.poster,variation}});auditions.push({png:v.canvas.toDataURL(),headline:v.result.manifest.fonts.headline.size,cta:v.result.manifest.fonts.cta.size});}
   const fullOriginal=await run({foregroundAssetId:'',productAssetId:'fixture-screen'}, {foreground:undefined,product:window.__v3.product});
   const unbound=await run({backgroundAssetId:''});
   const fullBlack=await run({poster:{...base.poster,layers:{background:{opacity:1}}}},{background:solidColour('#171717')});
   function solidColour(color){return 'data:image/svg+xml,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080"><rect width="1080" height="1080" fill="${color}"/></svg>`);}
   // Real alpha test: transparent pixels INSIDE a foreground's rectangle reveal the selected independent backdrop.
   const circle=document.createElement('canvas');circle.width=200;circle.height=200;const q=circle.getContext('2d');q.fillStyle='#1234ff';q.beginPath();q.arc(100,100,40,0,Math.PI*2);q.fill();
   const solid=color=>'data:image/svg+xml,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080"><rect width="1080" height="1080" fill="${color}"/></svg>`);
   const alphaPost={...base,headline:'Alpha',body:'',cta:'',poster:{version:3,layers:{background:{opacity:1},foreground:{x:.7,y:.65,scale:.4,shadow:0}}}};
   const alphaA=await render(alphaPost,{background:solid('#ff0000'),foreground:circle.toDataURL()}),alphaB=await render(alphaPost,{background:solid('#00ff00'),foreground:circle.toDataURL()});
   const sample=(v,x,y)=>[...v.canvas.getContext('2d').getImageData(x,y,1,1).data];const alphaAsset=alphaA.result.manifest.assets.find(x=>x.role==='foreground'),hole=[Math.round(alphaAsset.x+10),Math.round(alphaAsset.y+10)],center=[756,702];
   const opaque=await render(base,{background,foreground:solid('#1234ff')});
   const blank=await run({headline:'A\n\nB',poster:{version:3,typography:{headline:{size:48,lineHeight:1}}}});
   let protectedIntersection;const originalDraw=CanvasRenderingContext2D.prototype.drawImage;try{CanvasRenderingContext2D.prototype.drawImage=function(source,...args){const value=originalDraw.call(this,source,...args);if(source.width===200&&args.length===4)protectedIntersection=[...this.getImageData(324,973,1,1).data];return value;};await render({...base,backgroundAssetId:'',headline:'Alpha',body:'',poster:{version:3,layers:{foreground:{x:.3,y:.9,scale:.4,shadow:0}}}},{foreground:circle.toDataURL()});}finally{CanvasRenderingContext2D.prototype.drawImage=originalDraw;}
   // Dispatch parity with the original v2 renderer, plus the previous pinned bitmap if present.
   const old={...base,poster:{version:2,recipe:'hero'},backgroundAssetId:undefined,foregroundAssetId:undefined},v2a=document.createElement('canvas'),v2b=document.createElement('canvas');await compose(v2a,{company,post:old,background});await renderPoster(v2b,{company,post:old,background});
   const historical=document.createElement('canvas');await compose(historical,{company,post:{...old,poster:{version:2,recipe:'hero',voice:'studio',treatment:'brand',emphasis:'Mean Business',scale:1,heroScale:1}},background});const oldImage=new Image();oldImage.src=window.__v3.v2Baseline;await oldImage.decode();const baselineCanvas=document.createElement('canvas');baselineCanvas.width=oldImage.width;baselineCanvas.height=oldImage.height;baselineCanvas.getContext('2d').drawImage(oldImage,0,0);const historicalPixels=historical.getContext('2d').getImageData(0,0,1080,1080).data,baselinePixels=baselineCanvas.getContext('2d').getImageData(0,0,1080,1080).data;const pinnedV2PixelParity=historicalPixels.every((v,i)=>v===baselinePixels[i]);let diffCount=0,minX=1080,minY=1080,maxX=0,maxY=0;for(let i=0;i<historicalPixels.length;i+=4)if([0,1,2,3].some(k=>historicalPixels[i+k]!==baselinePixels[i+k])){diffCount++;const x=(i/4)%1080,y=Math.floor(i/4/1080);minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y);}let maxDelta=0,deltaTotal=0;for(let i=0;i<historicalPixels.length;i++){const d=Math.abs(historicalPixels[i]-baselinePixels[i]);maxDelta=Math.max(maxDelta,d);deltaTotal+=d;}const pinnedV2Diff={diffCount,minX,minY,maxX,maxY,maxDelta,meanChangedChannelDelta:deltaTotal/(Math.max(1,diffCount)*3)};
   // A slower obsolete draw cannot overwrite the next completed bitmap.
   const target=document.createElement('canvas');let release;const delayed=new Promise(r=>release=r);const slow=compose(target,{company,post:base,background,foreground,fonts:[metadata],getFont:async()=>{await delayed;return getFont();}});const fast=await compose(target,{company,post:{...base,headline:'Current'},background,foreground,fonts:[metadata],getFont});const fastPNG=target.toDataURL();release();const stale=await slow;
   const contrastPixels=fullBlack.canvas.getContext('2d').getImageData(60,170,930,320).data;let outlinePixels=0;for(let i=0;i<contrastPixels.length;i+=4)if(contrastPixels[i]===244&&contrastPixels[i+1]===101&&contrastPixels[i+2]===43)outlinePixels++;
   return {extended:extended.result.errors,fontFailure:fontFailure.errors,blankHeadline:blank.result.manifest.layers.find(l=>l.role==='headline'),protectedIntersection,auditionsDistinct:new Set(auditions.map(a=>a.png)).size,auditionCTA:auditions.map(a=>a.cta),fullOriginal:fullOriginal.result,unbound:unbound.result.errors,outlinePixels,proofCount:window.__proofs.length,font: a.result.manifest.fonts.headline,independent:[a,b].map(v=>v.result.manifest.fonts),explicit:explicit.result.manifest.fonts,long:long.result.errors,glyph:glyph.result.errors,badWeight:badWeight.result.errors,badHash:badHash.result.errors,badMeta:badMeta.result.errors,missing:missing.result.errors,foreign:foreign.result.errors,references:changed.result.manifest.assetReferences,merge,layerOrders:[back,front].map(v=>v.result.manifest.layerOrder),moved:moved.result.manifest.assets,alpha:{a:sample(alphaA,...hole),b:sample(alphaB,...hole),centres:[sample(alphaA,...center),sample(alphaB,...center)],asset:alphaAsset},opaque:opaque.result.warnings,v2ColdParity:window.__v2ColdParity,pinnedV2Diff,pinnedV2PixelParity,v2PixelParity:v2a.toDataURL()===v2b.toDataURL(),stale:stale.stale,currentUnchanged:fastPNG===target.toDataURL(),fastErrors:fast.errors};
  });
  await writeFile(path.join(out,'checks.json'),JSON.stringify(checks,null,2));
  assert.deepEqual(checks.extended,[],'actual imported cmap admits supported extended Latin beyond bundled v2 whitelist');assert.ok(checks.fontFailure.some(x=>x.includes('fonts failed to load')));
  assert.equal(checks.blankHeadline.lineBoxes[1][1]-checks.blankHeadline.lineBoxes[0][1],96,'blank paragraph preserves measured original line indices');assert.deepEqual(checks.protectedIntersection,[244,101,43,255],'overlapping CTA label/action exclusions remain a protected union, not XOR');
  assert.equal(checks.auditionsDistinct,3);assert.equal(new Set(checks.auditionCTA).size,1);assert.deepEqual(checks.fullOriginal.errors,[]);assert.equal(checks.fullOriginal.manifest.assets.find(a=>a.role==='original-product').cropped,false);assert.ok(checks.unbound.length);assert.ok(checks.outlinePixels>1000,'full-opacity black backdrop retains a brand-field outline around headline glyphs');
  assert.equal(checks.proofCount,12);assert.equal(checks.font.fontId,'fixture-anton');assert.equal(checks.font.weight,400);
  assert.notEqual(checks.independent[0].headline.size,checks.independent[1].headline.size);for(const role of ['body','cta','kicker','brand'])assert.deepEqual(checks.independent[0][role],checks.independent[1][role]);
  assert.equal(checks.explicit.cta.size,50);assert.equal(checks.explicit.headline.size,60);for(const key of ['long','glyph','badWeight','badHash','badMeta','missing','foreign'])assert.ok(checks[key].length,key);
  assert.equal(checks.references.backgroundAssetId,'selected-current-background');assert.equal(checks.references.foregroundAssetId,'selected-current-foreground');assert.equal(checks.references.productAssetId,'');
  assert.equal(checks.merge.typography.body.size,40);assert.equal(checks.merge.typography.body.lineHeight,1.5);assert.equal(checks.merge.layers.foreground.rotation,12);assert.equal(checks.merge.layers.foreground.x,.2);
  assert.ok(checks.layerOrders[0].indexOf('headline')<checks.layerOrders[0].indexOf('foreground'));assert.ok(checks.layerOrders[1].indexOf('headline')>checks.layerOrders[1].indexOf('foreground'));
  assert.equal(checks.alpha.asset.hasAlpha,true);assert.notDeepEqual(checks.alpha.a,checks.alpha.b);assert.deepEqual(checks.alpha.centres[0],checks.alpha.centres[1]);assert.equal(checks.alpha.centres[0][2],255);assert.ok(checks.opaque.some(x=>x.includes('opaque')));
  assert.ok(checks.v2ColdParity,'v2 exact PNG pixels before/after v3 font and layer integration');assert.ok(checks.v2PixelParity);assert.ok(checks.stale);assert.ok(checks.currentUnchanged);assert.deepEqual(checks.fastErrors,[]);assert.equal(requests.length,1,'all resources stay offline');
  for(const proof of proofs){for(const region of proof.hitRegions){const i=proof.manifest.safeRegion.inset;assert.ok(region.x>=i.left-.1&&region.y>=i.top-.1&&region.x+region.width<=proof.width-i.right+.1&&region.y+region.height<=proof.height-i.bottom+.1);}const source=await page.locator(`canvas[data-proof="${proof.recipe}-${proof.format}"]`).evaluate(c=>c.toDataURL().split(',')[1]);await writeFile(path.join(out,`${proof.recipe}-${proof.format}.png`),Buffer.from(source,'base64'));}
  // One batched desktop/feed-size native proof capture, not a long/repeated phone board.
  await page.screenshot({path:path.join(out,'board-desktop.png'),fullPage:true});await page.setViewportSize({width:390,height:844});await page.locator('section').first().screenshot({path:path.join(out,'hero-feed-size.png')});
 }finally{await browser.close();}
});
