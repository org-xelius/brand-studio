import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {chromium} from '@playwright/test';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {MOTIF_RESOURCES,motifSvg} from '../motif-resources.js';
import {LAYOUT_RESOURCES,LAYOUT_GEOMETRY,layoutPlan,flowCopyPlan} from '../src/layout-kernel-flex.js';
import {createState,applyCommand,addAsset} from '../model.js';
import {produceProfileProofs} from './flexible-profile-producer.mjs';

const root=fileURLToPath(new URL('../',import.meta.url)),out=new URL('../output/playwright/flexible-compositions/',import.meta.url);
const sha=b=>createHash('sha256').update(b).digest('hex');
const families=Object.keys(LAYOUT_RESOURCES),formats=['square','portrait','story','landscape'];

test('trusted SVG sources and immutable 24-format geometry are exact SHA-256 resources',async()=>{
 for(const [id,r] of Object.entries(MOTIF_RESOURCES)){const file=await readFile(new URL(`../assets/motifs/${id}.svg`,import.meta.url),'utf8');assert.equal(file,r.svg);assert.equal(sha(file),r.sha256);assert.match(file,/<title /);assert.match(file,/<desc /);assert.doesNotMatch(file,/<(?:script|foreignObject|image|text|style|filter)\b|(?:href|url\()/i);assert.match(motifSvg(id,'#123abc',.15),/opacity="0.15"/);}
 assert.equal(Object.keys(MOTIF_RESOURCES).length,8);assert.throws(()=>motifSvg('none','#123456'));assert.throws(()=>motifSvg('orbit-v1','red'));assert.throws(()=>motifSvg('orbit-v1','#123456',1.1));
 for(const [id,r] of Object.entries(LAYOUT_RESOURCES)){assert.equal(sha(JSON.stringify(LAYOUT_GEOMETRY[id])),r.sha256);assert.deepEqual(Object.keys(LAYOUT_GEOMETRY[id]),formats);}
 assert.equal(sha(await readFile(new URL('../src/poster-renderer-crisp.js',import.meta.url))),'bc8b200bb85c5cf456505b7dfeefef3038acde03fd6841332c28ff60700fe10b');
});

test('compiler 3 native matrix, fill-only/no holes, actual contrast, six CTA geometries, source/font integrity, DPR and Blob identity',async()=>{
 await mkdir(out,{recursive:true});
 const bundle=await build({stdin:{resolveDir:root,contents:`import {compose} from './src/compositor.js';import {layoutPlan} from './src/layout-kernel-flex.js';import {motifSvg,MOTIF_RESOURCES} from './motif-resources.js';import photo from './tests/fixtures/storin-existing-background.png';import cutout from './tests/fixtures/storin-manually-masked-synthetic.png';import anton from './tests/fixtures/anton-400.ttf';import metadata from './tests/fixtures/anton-metadata.json';window.flex={compose,layoutPlan,motifSvg,MOTIF_RESOURCES,photo,cutout,anton,metadata};`},bundle:true,write:false,format:'iife',loader:{'.woff2':'dataurl','.ttf':'dataurl','.png':'dataurl'}});
 const html='<!doctype html><meta charset="utf-8"><body><script>'+bundle.outputFiles[0].text.replace(/<\/script/gi,'<\\/script')+'</script>';
 const browser=await chromium.launch({channel:'chromium',headless:true,args:['--disable-accelerated-2d-canvas']}),pageErrors=[],requests=[],records=[];
 try{
  const context=await browser.newContext({viewport:{width:1600,height:1100},deviceScaleFactor:1}),page=await context.newPage();
  page.on('pageerror',e=>pageErrors.push(e.message));await page.route('**/*',route=>{if(route.request().url()==='https://flexible-compositions.test/')return route.fulfill({contentType:'text/html',body:html});requests.push(route.request().url());return route.abort();});await page.goto('https://flexible-compositions.test/');
  await page.evaluate(()=>{
   window.runFlex=async({brand='storin',layout='lateral',format='square',poster={},post:changes={},extra={}}={})=>{
    const {compose,layoutPlan,photo}=window.flex,p=layoutPlan(layout,format),h={square:1080,portrait:1350,story:1920,landscape:565.2}[format],i=['lateral','broadside','specimen','centered','spread','cover'].indexOf(layout);
    const company=brand==='storin'?{id:'fixture-storin',name:'Storin',color:'#fbab3c',brandKit:{ink:'#171717',paper:'#f7f5ef'}}:{id:'fixture-xelius',name:'Xelius',color:'#343a8a',brandKit:{ink:'#181a24',paper:'#f7f7f4'}};
    const motifId=['proof-marks-v1','responsive-frames-v1','answer-exchange-v1','research-folio-v1','decision-junction-v1','interface-modules-v1'][i],recipe=layout==='specimen'?'showcase':'editorial';
    const base={version:3,compilerVersion:3,recipe,voice:brand==='storin'?'studio':'clean',treatment:'light',composition:{layout},motif:{id:motifId,color:'primary',opacity:.3,x:(p.visual[0]+p.visual[2]/2)/1080,y:(p.visual[1]+p.visual[3]/2)/h,scale:Math.max(.25,Math.min(1.4,p.visual[2]/650,p.visual[3]/390))},cta:{style:['strip','rectangle','rounded','pill','outline','text'][i],width:i%2?'fit':'full',fill:{mode:'palette',value:'primary'},align:layout==='centered'?'center':'left',arrow:true},details:{surface:'flat',text:''}};
    const post={headline:brand==='storin'?'Make it matter':'A clearer view',body:brand==='storin'?'Design with purpose.':'Research with perspective.',cta:'Explore',format,productAssetId:recipe==='showcase'?'synthetic-existing-illustration':'',poster:{...base,...poster},...changes};
    const canvas=document.createElement('canvas'),result=await compose(canvas,{company,post,product:recipe==='showcase'?photo:undefined,...extra});return {canvas,result,company,post};
   };
   window.shaFlex=async bytes=>[...new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))].map(x=>x.toString(16).padStart(2,'0')).join('');
  });
  // 48 actual native PNGs. The only photo-like source is the explicitly synthetic existing fixture.
  for(const brand of ['storin','xelius'])for(const layout of families)for(const format of formats){
   const record=await page.evaluate(async args=>{const r=await window.runFlex(args),blob=await new Promise(resolve=>r.canvas.toBlob(resolve,'image/png'));return {...args,result:r.result,company:r.company,post:r.post,png:r.canvas.toDataURL(),pngSha256:await window.shaFlex(await blob.arrayBuffer())};},{brand,layout,format});
   const name=`${brand}-${layout}-${format}`,png=Buffer.from(record.png.split(',')[1],'base64');await writeFile(new URL(name+'.png',out),png);assert.equal(sha(png),record.pngSha256);delete record.png;
   await writeFile(new URL(name+'.json',out),JSON.stringify(record,null,2));records.push({name,...record});
  }
  await writeFile(new URL('native-matrix.json',out),JSON.stringify({scope:'Isolated native Chromium fixture proofs, not installed GUI acceptance. Existing photo-like fixture is synthetic, not an authentic Storin/Xelius logo, product or company photograph.',expected:48,rendered:records.length,records},null,2));
  // Keep first-batch evidence even when a structural assertion needs repair.
  for(const r of records){assert.deepEqual(r.result.errors,[],r.name);assert.equal(r.result.manifest.compilerVersion,3);assert.equal(r.result.manifest.layout.sha256,LAYOUT_RESOURCES[r.layout].sha256);assert.deepEqual(r.result.manifest.protection.textBlocks,[]);assert.deepEqual(r.result.manifest.protection.foregroundExclusions,[]);assert.equal(r.result.manifest.protection.nonCtaBackground,'none');assert.ok(r.result.manifest.protection.contrast.roles.every(x=>x.minimum>=4.5&&x.samples>0));}
  // Bind all actual browser manifests and native PNG hashes through the real strict domain.
  for(const r of records){
   let n=0,state=createState();const command=(type,data)=>{const result=applyCommand(state,type,data,{id:()=>`flex-${++n}`});state=result.state;return result;};
   const companyId=command('company.save',{...r.company,id:undefined}).id;
   if(r.post.productAssetId)state=addAsset(state,{id:r.post.productAssetId,companyId,role:'product',name:'Existing synthetic illustration fixture — not authentic brand/product photography',bytes:1765932,mime:'image/png'});
   const postId=command('post.save',{...r.post,companyId,assetIds:r.post.productAssetId?[r.post.productAssetId]:[]}).id;
   const receipt={manifest:r.result.manifest,pngSha256:r.pngSha256},saved=command('design.snapshot',{postId,renderReceipt:receipt});
   assert.equal(state.designs[0].scene.compilerVersion,3,r.name);command('design.review',{id:saved.id,reviewed:true});command('post.status',{id:postId,status:'exported',designId:saved.id,pngSha256:r.pngSha256});
   assert.equal(state.posts[0].status,'exported',r.name);
   const tampered=structuredClone(receipt);tampered.manifest.layout.sha256='0'.repeat(64);assert.throws(()=>command('design.snapshot',{postId,renderReceipt:tampered}),/trusted layout/);
   const motifTamper=structuredClone(receipt);motifTamper.manifest.motif.opacity=.123456;assert.throws(()=>command('design.snapshot',{postId,renderReceipt:motifTamper}),/motif/);
  }
  // Profile proofs use the actual unsupplied domain factory, not geometry-fixture placement.
  await produceProfileProofs({page,out});
  const checks=await page.evaluate(async()=>{
   const {compose,photo,cutout,anton,metadata,motifSvg,MOTIF_RESOURCES}=window.flex,run=window.runFlex;
   const hash=async c=>window.shaFlex(await(await new Promise(resolve=>c.toBlob(resolve))).arrayBuffer());
   const px=(c,x,y)=>[...c.getContext('2d').getImageData(Math.floor(x),Math.floor(y),1,1).data];
   const plain={recipe:'editorial',motif:{id:'none'},cta:{style:'text',arrow:false}};
   const zero=await run({poster:{...plain,motif:{id:'proof-marks-v1',opacity:0}}}),none=await run({poster:plain}),fifteen=await run({poster:{...plain,motif:{id:'proof-marks-v1',opacity:.15,color:'primary',x:.75,y:.65}}}),half=await run({poster:{...plain,motif:{id:'proof-marks-v1',opacity:.5,color:'primary',x:.75,y:.65}}}),full=await run({poster:{...plain,motif:{id:'proof-marks-v1',opacity:1,color:'primary',x:.75,y:.65}}});
   const strokes=[],fills=[],rectangles=[],clips=[],oldStroke=CanvasRenderingContext2D.prototype.strokeText,oldFill=CanvasRenderingContext2D.prototype.fillText,oldRect=CanvasRenderingContext2D.prototype.fillRect,oldClip=CanvasRenderingContext2D.prototype.clip;
   let instrumented;try{CanvasRenderingContext2D.prototype.strokeText=function(...a){strokes.push(a);return oldStroke.apply(this,a);};CanvasRenderingContext2D.prototype.fillText=function(...a){fills.push({font:this.font,filter:this.filter,shadowBlur:this.shadowBlur,shadowColor:this.shadowColor});return oldFill.apply(this,a);};CanvasRenderingContext2D.prototype.fillRect=function(...a){rectangles.push(a);return oldRect.apply(this,a);};CanvasRenderingContext2D.prototype.clip=function(...a){clips.push(a);return oldClip.apply(this,a);};instrumented=await run({poster:plain});}finally{CanvasRenderingContext2D.prototype.strokeText=oldStroke;CanvasRenderingContext2D.prototype.fillText=oldFill;CanvasRenderingContext2D.prototype.fillRect=oldRect;CanvasRenderingContext2D.prototype.clip=oldClip;}
   // Independent exact native fillText reconstruction; no halo/outline/backplate pixels.
   const reference=document.createElement('canvas');reference.width=instrumented.canvas.width;reference.height=instrumented.canvas.height;const rc=reference.getContext('2d');rc.fillStyle=instrumented.result.manifest.palette.field;rc.fillRect(0,0,reference.width,reference.height);
   for(const t of instrumented.result.manifest.layers.filter(x=>['headline','body','cta','kicker','brand','annotation'].includes(x.role))){rc.font=`${t.weight} ${t.size}px "${t.canvasFamily}"`;rc.fontKerning='normal';rc.textBaseline='top';rc.textAlign='left';rc.letterSpacing=`${t.tracking*t.size}px`;rc.fillStyle=t.color;for(let i=0;i<t.lines.length;i++)rc.fillText(t.lines[i],...t.positions[i]);}
   const a=reference.getContext('2d').getImageData(0,0,reference.width,reference.height).data,b=instrumented.canvas.getContext('2d').getImageData(0,0,reference.width,reference.height).data;let nativeFillDiff=0;for(let i=0;i<a.length;i++)if(a[i]!==b[i])nativeFillDiff++;
   // A synthetic alpha marker checks source-pixel fidelity; it is never called an authentic company logo.
   const marker=document.createElement('canvas');marker.width=180;marker.height=60;const mc=marker.getContext('2d');mc.fillStyle='#1357ac';mc.fillRect(4,4,65,52);mc.fillStyle='rgba(220,35,91,.5)';mc.fillRect(90,8,72,42);
   const logoRun=await run({poster:plain,post:{logoAssetId:'synthetic-alpha-logo',cta:''},extra:{logo:marker.toDataURL()}}),logoAsset=logoRun.result.manifest.assets.find(x=>x.role==='logo'),lb=[logoAsset.x,logoAsset.y,logoAsset.width,logoAsset.height],logoReference=document.createElement('canvas');logoReference.width=1080;logoReference.height=1080;const lc=logoReference.getContext('2d');lc.fillStyle=logoRun.result.manifest.palette.field;lc.fillRect(0,0,1080,1080);lc.drawImage(marker,...lb);const ix=Math.floor(lb[0])-1,iy=Math.floor(lb[1])-1,iw=Math.ceil(lb[2])+2,ih=Math.ceil(lb[3])+2,la=lc.getImageData(ix,iy,iw,ih).data,lr=logoRun.canvas.getContext('2d').getImageData(ix,iy,iw,ih).data;let logoPixelDiff=0;for(let i=0;i<la.length;i++)if(la[i]!==lr[i])logoPixelDiff++;
   const empty=await run({poster:plain,post:{cta:''}}),ctas=[];
   for(const style of ['strip','rectangle','rounded','pill','outline','text'])for(const width of ['fit','full']){
    const r=await run({poster:{...plain,cta:{style,width,align:'right',paddingX:16,paddingY:12,fill:{mode:'custom',value:'#4343a9'},text:{mode:'auto'},arrow:true}}}),m=r.result.manifest.cta,b=m.shapeBounds;
    ctas.push({style,width,errors:r.result.errors,cta:m,corner:px(r.canvas,b[0]+1,b[1]+1),center:px(r.canvas,b[0]+b[2]/2,b[1]+b[3]/2)});
   }
   const solid=color=>'data:image/svg+xml,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080"><path fill="${color}" d="M0 0H1080V1080H0Z"/></svg>`);
   const low=await run({poster:{...plain,recipe:'hero',layers:{background:{opacity:1}}},post:{backgroundAssetId:'low'},extra:{background:solid('#888888'),company:{id:'low',name:'Low',color:'#777777',brandKit:{ink:'#777777',paper:'#999999',accent:'#888888'}}}});
   const long=await run({poster:{...plain,typography:{headline:{size:260}}},post:{headline:'Full required copy must never be truncated or silently shrunk to fit this layout.'}});
   const missing=await run({poster:plain,post:{backgroundAssetId:'missing'}}),unbound=await run({poster:plain,extra:{background:photo}}),showcase=await run({layout:'specimen'}),source=showcase.result.manifest.assets.find(a=>a.role==='original-product');
   const collision=await run({poster:{...plain,recipe:'hero',layers:{foreground:{x:.25,y:.32,scale:2,rotation:0,shadow:0}}},post:{foregroundAssetId:'synthetic-cutout'},extra:{foreground:cutout}});
   const unsupported=await run({poster:plain,post:{headline:'Unsupported \u{1F9EC}'}});
   const fontPoster={...plain,typography:Object.fromEntries(['headline','body','cta','kicker','brand'].map(role=>[role,{fontId:metadata.id,weight:400,size:role==='headline'?64:24}]))};
   const fontCompany={id:metadata.companyId,name:'Font fixture',color:'#d8a33d',brandKit:{ink:'#202119',paper:'#fff9ed'}};
   const exact=await run({poster:fontPoster,extra:{company:fontCompany,fonts:[metadata],getFont:async()=>({...metadata.faces[0],dataUrl:anton})}}),fontTamper=await run({poster:fontPoster,extra:{company:fontCompany,fonts:[metadata],getFont:async()=>({...metadata.faces[0],sha256:'0'.repeat(64),dataUrl:anton})}});
   // Same target: delayed exact font followed by a newer bundled render must not publish.
   const target=document.createElement('canvas');let release;const gate=new Promise(resolve=>release=resolve),oldPost={...exact.post,poster:{...exact.post.poster,...fontPoster}};
   const slow=compose(target,{company:fontCompany,post:oldPost,fonts:[metadata],getFont:async()=>{await gate;return {...metadata.faces[0],dataUrl:anton};}});const latest=await compose(target,{company:none.company,post:none.post}),newestHash=await hash(target);release();const stale=await slow;
   const blob=await new Promise(resolve=>none.canvas.toBlob(resolve,'image/png')),blobSha256=await window.shaFlex(await blob.arrayBuffer());window.reviewedFlex={blob};
   // Native standalone SVG previews verify trusted SVG decode, without a filesystem/network URL.
   const previews=[];for(const [id,r] of Object.entries(MOTIF_RESOURCES)){const img=new Image();img.src='data:image/svg+xml,'+encodeURIComponent(motifSvg(id,'#4343a9',1));await img.decode();const c=document.createElement('canvas');c.width=1000;c.height=600;const x=c.getContext('2d');x.fillStyle='#f4f1ff';x.fillRect(0,0,1000,600);x.drawImage(img,0,0);previews.push({id,png:c.toDataURL()});}
   return {opacity:{zeroEqualsNone:await hash(zero.canvas)===await hash(none.canvas),fifteenDiffers:await hash(fifteen.canvas)!==await hash(none.canvas),halfDiffers:await hash(half.canvas)!==await hash(fifteen.canvas),fullDiffers:await hash(full.canvas)!==await hash(half.canvas),half:half.result.manifest.motif,zero:zero.result.manifest.motif,fifteen:fifteen.result.manifest.motif,full:full.result.manifest.motif},strokes,fills,rectangles,clips,nativeFillDiff,logoPixelDiff,logoErrors:logoRun.result.errors,empty:empty.result,ctas,low:low.result.errors,long:long.result.errors,missing:missing.result.errors,unbound:unbound.result.errors,source,collision:collision.result,unsupported:unsupported.result.errors,exact:exact.result,fontTamper:fontTamper.result.errors,stale:{stale:stale.stale,unchanged:newestHash===await hash(target),latest:latest.errors},blobSha256,previews,nativeReferenceHash:await hash(none.canvas)};
  });
  for(const preview of checks.previews)await writeFile(new URL(preview.id+'-preview.png',out),Buffer.from(preview.png.split(',')[1],'base64'));delete checks.previews;
  await writeFile(new URL('native-checks.json',out),JSON.stringify(checks,null,2));
  assert.ok(checks.opacity.zeroEqualsNone);assert.ok(checks.opacity.fifteenDiffers);assert.ok(checks.opacity.halfDiffers);assert.ok(checks.opacity.fullDiffers);assert.equal(checks.opacity.half.opacity,.5);assert.equal(checks.opacity.zero.painted,false);assert.equal(checks.opacity.fifteen.opacity,.15);assert.equal(checks.strokes.length,0);assert.equal(checks.clips.length,0);assert.equal(checks.rectangles.length,1,'only the full-canvas initial field; no text/CTA backplates');for(const f of checks.fills){assert.equal(f.filter,'none');assert.equal(f.shadowBlur,0);}
  assert.equal(checks.nativeFillDiff,0,'exact native fillText reconstruction, no halo pixels');assert.deepEqual(checks.logoErrors,[]);assert.equal(checks.logoPixelDiff,0,'unmodified selected alpha source pixels, no recolouring or backing');
  assert.equal(checks.empty.manifest.cta.painted,false);assert.equal(checks.empty.manifest.cta.shapeBounds,null);assert.ok(!checks.empty.manifest.layers.some(x=>x.role==='cta'||x.role==='action'));
  for(const r of checks.ctas){assert.deepEqual(r.errors,[],r.style+' '+r.width);assert.equal(r.cta.style,r.style);assert.equal(r.cta.width,r.width);assert.equal(r.cta.fill,r.style==='text'?null:'#4343a9');assert.ok(r.cta.shapeBounds[2]>0);}
  assert.ok(checks.low.some(x=>x.includes('opaque-glyph-interior contrast')));assert.ok(checks.long.some(x=>x.includes('does not fit')));assert.ok(checks.missing.some(x=>x.includes('missing')));assert.ok(checks.unbound.some(x=>x.includes('explicit selected ID')));assert.equal(checks.source.sourceCropped,false);assert.equal(checks.source.cropped,false);assert.ok(checks.collision.errors.some(x=>x.includes('Foreground overlaps')));assert.deepEqual(checks.collision.manifest.protection.foregroundExclusions,[]);assert.ok(checks.unsupported.some(x=>x.includes('cmap')));assert.deepEqual(checks.exact.errors,[]);assert.ok(checks.fontTamper.some(x=>x.includes('differs')));assert.equal(checks.stale.stale,true);assert.ok(checks.stale.unchanged);
  const downloading=page.waitForEvent('download');await page.evaluate(()=>{const a=document.createElement('a');a.href=URL.createObjectURL(window.reviewedFlex.blob);a.download='reviewed-native.png';a.click();});const download=await downloading;await download.saveAs(fileURLToPath(new URL('reviewed-native.png',out)));assert.equal(sha(await readFile(new URL('reviewed-native.png',out))),checks.blobSha256);
  const second=await browser.newContext({deviceScaleFactor:2}),page2=await second.newPage();await page2.route('**/*',r=>r.fulfill({contentType:'text/html',body:html}));await page2.goto('https://flexible-compositions.test/');
  const dpr=await page2.evaluate(async args=>{const c=document.createElement('canvas'),result=await window.flex.compose(c,args),blob=await new Promise(r=>c.toBlob(r));return {errors:result.errors,width:c.width,height:c.height,sha:[...new Uint8Array(await crypto.subtle.digest('SHA-256',await blob.arrayBuffer()))].map(x=>x.toString(16).padStart(2,'0')).join('')};},{company:records[0].company,post:records[0].post});assert.deepEqual(dpr.errors,[]);assert.equal(dpr.sha,records[0].pngSha256);assert.equal(dpr.width,1080);assert.equal(dpr.height,1080);await second.close();
  // Two brandboards from the exact reviewed-candidate PNG bytes; no re-composition.
  for(const brand of ['storin','xelius']){
   const images=await Promise.all(records.filter(r=>r.brand===brand).map(async r=>({name:r.layout+' / '+r.format,png:'data:image/png;base64,'+(await readFile(new URL(r.name+'.png',out))).toString('base64')})));
   const board=await page.evaluate(async({brand,images})=>{const c=document.createElement('canvas');c.width=1600;c.height=2460;const x=c.getContext('2d');x.fillStyle='#e9e9ec';x.fillRect(0,0,c.width,c.height);x.fillStyle='#171721';x.font='600 32px sans-serif';x.fillText(brand==='storin'?'Storin — creative modular':'Xelius — research editorial',32,48);x.font='16px sans-serif';x.fillText('Technical geometry coverage · all six structures × four formats · synthetic imagery, not authentic company assets',32,80);for(let i=0;i<images.length;i++){const img=new Image();img.src=images[i].png;await img.decode();const col=i%4,row=Math.floor(i/4),bx=24+col*394,by=115+row*385,s=Math.min(370/img.width,337/img.height);x.drawImage(img,bx+(370-img.width*s)/2,by,img.width*s,img.height*s);x.fillStyle='#252532';x.font='16px sans-serif';x.fillText(images[i].name,bx,by+365);}return c.toDataURL();},{brand,images});
   await writeFile(new URL(brand+'-geometry-board.png',out),Buffer.from(board.split(',')[1],'base64'));
  }
  assert.deepEqual(pageErrors,[]);assert.deepEqual(requests,[]);await writeFile(new URL('run-summary.json',out),JSON.stringify({nativeCases:48,brands:2,layouts:6,formats:4,boards:2,dprParity:true,blobDownloadIdentity:true,noProviderCalls:true,noInstalledGuiClaim:true,automatedChecksPassed:true,visualInspection:'Pending explicit read_image reviews; passing automated checks is not visual approval.'},null,2));await context.close();
 }finally{await browser.close();}
});
