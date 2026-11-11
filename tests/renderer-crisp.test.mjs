import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {chromium} from '@playwright/test';
import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createState, applyCommand, addFont, addAsset} from '../model.js';
import {legacyFixturesReady,legacyFixtureHint,legacyFixture} from './legacy-fixtures.mjs';
import {readFileSync} from 'node:fs';
const legacyPng=p=>'data:image/png;base64,'+readFileSync(p).toString('base64');

const root=fileURLToPath(new URL('../',import.meta.url)),out=path.resolve(root,process.env.BS_CRISP_OUTPUT||'output/playwright/crisp-renderer');

// Fresh full Chromium, cached bytes only. No installed GUI, user profiles, servers or API calls.
test('compiler 2: native fill-only edges, block contrast, blur isolation, DPR parity and reviewed bitmap identity',{skip:legacyFixturesReady()?false:legacyFixtureHint},async()=>{
 const bundle=await build({stdin:{resolveDir:root,contents:`
  import {compose,FORMATS} from './src/compositor.js';
  import {renderPosterV3} from './src/poster-renderer-v3.js';
  import {renderPoster} from './src/poster-renderer.js';
  import anton from './tests/fixtures/anton-400.ttf';
  import metadata from './tests/fixtures/anton-metadata.json';
  import v2Baseline from './tests/fixtures/v2-hero-square-baseline.png';
  const background=__LEGACY_BACKGROUND__;
  window.__crisp={compose,FORMATS,renderPosterV3,renderPoster,anton,metadata,v2Baseline,background};
 `},bundle:true,write:false,format:'iife',define:{__LEGACY_BACKGROUND__:JSON.stringify(legacyPng(legacyFixture('storin-existing-background.png')))},loader:{'.woff2':'dataurl','.ttf':'dataurl','.png':'dataurl'}});
 const html='<!doctype html><meta charset="utf-8"><body><script>'+bundle.outputFiles[0].text.replace(/<\/script/gi,'<\\/script')+'</script>';
 const browser=await chromium.launch({channel:'chromium',headless:true,args:['--disable-accelerated-2d-canvas']});
 const results=[],pageErrors=[],unexpectedRequests=[];
 await mkdir(out,{recursive:true});
 try{
  for(const dpr of [1,2]){
   const context=await browser.newContext({viewport:{width:1600,height:1100},deviceScaleFactor:dpr});
   const page=await context.newPage();page.on('pageerror',e=>pageErrors.push(e.message));
   await page.route('**/*',route=>{if(route.request().url()==='https://brand-studio-crisp.test/')return route.fulfill({contentType:'text/html',body:html});unexpectedRequests.push(route.request().url());return route.abort();});
   await page.goto('https://brand-studio-crisp.test/');
   const result=await page.evaluate(async()=>{
    const {compose,FORMATS,renderPosterV3,renderPoster,anton,metadata,v2Baseline,background}=window.__crisp;
    const company={id:metadata.companyId,name:'Brand',color:'#f4652b',brandKit:{ink:'#171717',paper:'#f7f5ef'}};
    const typography=Object.fromEntries(['headline','body','cta','kicker','brand'].map((role,i)=>[role,{fontId:metadata.id,weight:400,size:[64,28,28,20,24][i]}]));
    const base={headline:'Crisp',body:'Readable type',cta:'See the work',format:'square',backgroundAssetId:'test-background',poster:{version:3,compilerVersion:2,kicker:'Local',typography,details:{motif:'none',surface:'flat',action:'text'},layers:{background:{opacity:1,blur:0}}}};
    const getFont=async()=>({...metadata.faces[0],dataUrl:anton});
    const solid=color=>'data:image/svg+xml,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080"><rect width="1080" height="1080" fill="${color}"/></svg>`);
    const run=async(post=base,extra={})=>{const canvas=document.createElement('canvas');const result=await compose(canvas,{company,post,fonts:[metadata],getFont,background:solid('#444466'),...extra});return {canvas,result};};
    const bytes=c=>c.getContext('2d').getImageData(0,0,c.width,c.height).data;
    const sha=async bytes=>[...new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))].map(x=>x.toString(16).padStart(2,'0')).join('');
    const delta=(a,b)=>{let count=0;for(let i=0;i<a.length;i++)if(a[i]!==b[i])count++;return count;};
    // Cold legacy baselines in this exact engine. The archived v2 PNG is also
    // measured below, but predates this host's current image interpolation.
    const {compilerVersion:ignoredCompiler,...legacyPoster}=base.poster,coldV3=await run({...base,poster:legacyPoster});
    const oldCompany={name:'Storin',color:'#f4652b',brandKit:{ink:'#171717',paper:'#f7f5ef'}},v2post={headline:'Websites That\nMean Business',body:'A clear message.\nAn intentional presence.',cta:'Explore the possibilities',format:'square',poster:{version:2,recipe:'hero',voice:'studio',treatment:'brand',emphasis:'Mean Business',scale:1,heroScale:1}};
    const {poster:ignoredPoster,...v1post}=v2post,coldV1=document.createElement('canvas'),coldV2=document.createElement('canvas');
    await compose(coldV1,{company:oldCompany,post:v1post,background});await compose(coldV2,{company:oldCompany,post:v2post,background});
    const strokes=[],fills=[],oldStroke=CanvasRenderingContext2D.prototype.strokeText,oldFill=CanvasRenderingContext2D.prototype.fillText;
    let current;
    try{
     CanvasRenderingContext2D.prototype.strokeText=function(...args){strokes.push(args);return oldStroke.apply(this,args);};
     CanvasRenderingContext2D.prototype.fillText=function(...args){fills.push({args,font:this.font,filter:this.filter,shadowBlur:this.shadowBlur,shadowColor:this.shadowColor,shadowOffsetX:this.shadowOffsetX,shadowOffsetY:this.shadowOffsetY,transform:[...Object.values(this.getTransform().toJSON())]});return oldFill.apply(this,args);};
     current=await run();
    }finally{CanvasRenderingContext2D.prototype.strokeText=oldStroke;CanvasRenderingContext2D.prototype.fillText=oldFill;}
    const manifest=current.result.manifest,reference=document.createElement('canvas');reference.width=current.canvas.width;reference.height=current.canvas.height;
    const r=reference.getContext('2d');r.fillStyle=manifest.palette.field;r.fillRect(0,0,reference.width,reference.height);
    const edgeChecks=[];
    for(const layer of manifest.layers.filter(l=>['headline','body','cta','kicker','brand'].includes(l.role))){
     r.font=`${layer.weight} ${layer.size}px "${layer.canvasFamily}"`;r.fontKerning='normal';r.textBaseline='top';r.textAlign='left';r.letterSpacing=`${layer.tracking*layer.size}px`;r.fillStyle=layer.color;
     for(let i=0;i<layer.lines.length;i++){
      const line=layer.lines[i],x=layer.box[0],y=layer.box[1]+i*layer.size*layer.lineHeight;r.fillText(line,x,y);
      const m=r.measureText(line),box=[Math.floor(x-m.actualBoundingBoxLeft)-2,Math.floor(y-m.actualBoundingBoxAscent)-2,Math.ceil(m.actualBoundingBoxLeft+m.actualBoundingBoxRight)+5,Math.ceil(m.actualBoundingBoxAscent+m.actualBoundingBoxDescent)+5];
      const actual=current.canvas.getContext('2d').getImageData(...box).data,expected=r.getImageData(...box).data;
      edgeChecks.push({role:layer.role,box,diff:delta(actual,expected)});
     }
    }
    // Each solid backing is one rectangle covering a complete text block, not an outline.
    const plates=manifest.protection.textBlocks.map(p=>({...p,corner:[...current.canvas.getContext('2d').getImageData(Math.floor(p.box[0])+1,Math.floor(p.box[1])+1,1,1).data]}));
    let oldStrokeCount=0;const originalStroke=CanvasRenderingContext2D.prototype.strokeText;
    let legacy;try{CanvasRenderingContext2D.prototype.strokeText=function(...args){oldStrokeCount++;return originalStroke.apply(this,args);};const {compilerVersion,...poster}=base.poster;legacy=await run({...base,poster});}finally{CanvasRenderingContext2D.prototype.strokeText=originalStroke;}
    const legacyDirect=document.createElement('canvas');const {compilerVersion,...oldPoster}=base.poster;await renderPosterV3(legacyDirect,{company,post:{...base,poster:oldPoster},fonts:[metadata],getFont,background:solid('#444466')});
    const oldPixels=bytes(legacy.canvas),newPixels=bytes(current.canvas);let outsideProtectionDiff=0;
    for(let y=0;y<1080;y++)for(let x=0;x<1080;x++){
     if(plates.some(p=>x>=p.box[0]-1&&y>=p.box[1]-1&&x<=p.box[0]+p.box[2]+1&&y<=p.box[1]+p.box[3]+1))continue;
     const at=(y*1080+x)*4;if([0,1,2,3].some(i=>oldPixels[at+i]!==newPixels[at+i]))outsideProtectionDiff++;
    }
    const flat=await run({...base,backgroundAssetId:'',poster:{...base.poster,recipe:'editorial',treatment:'dark'}},{background:undefined});
    const tonal=await run({...base,backgroundAssetId:'',poster:{...base.poster,details:{...base.poster.details,surface:'tonal'}}},{background:undefined});
    // Checkerboard changes under image blur; an ample uniform patch behind type avoids
    // conflating changed background AA compositing with blurred glyph coverage.
    const checker=document.createElement('canvas');checker.width=1080;checker.height=1080;const q=checker.getContext('2d');q.fillStyle='#444466';q.fillRect(0,0,1080,1080);
    for(let y=600;y<1080;y+=16)for(let x=0;x<1080;x+=16){q.fillStyle=((Math.floor(x/16)+Math.floor(y/16))%2)?'#ffffff':'#000000';q.fillRect(x,y,16,16);}
    const checkerBefore=checker.toDataURL(),blurPost={...base,body:'',cta:'',poster:{...base.poster,kicker:''}};
    const sharp=await run(blurPost,{company:{...company,name:''},background:checkerBefore}),blurred=await run({...blurPost,poster:{...blurPost.poster,layers:{background:{opacity:1,blur:12}}}},{company:{...company,name:''},background:checkerBefore});
    const roi=(c,box)=>c.getContext('2d').getImageData(...box).data;
    const formats={};for(const format of Object.keys(FORMATS)){
     const render=await run({...base,format});formats[format]={width:render.canvas.width,height:render.canvas.height,pixelSha256:await sha(bytes(render.canvas)),errors:render.result.errors};
    }
    // Strict opt-in never changes direct or dispatched legacy v1/v2/v3 pixels.
    const v1after=document.createElement('canvas');await compose(v1after,{company:oldCompany,post:v1post,background});
    const v2a=document.createElement('canvas'),v2b=document.createElement('canvas');await compose(v2a,{company:oldCompany,post:v2post,background});await renderPoster(v2b,{company:oldCompany,post:v2post,background});
    const img=new Image();img.src=v2Baseline;await img.decode();const baseline=document.createElement('canvas');baseline.width=img.width;baseline.height=img.height;baseline.getContext('2d').drawImage(img,0,0);
    const blob=await new Promise(resolve=>current.canvas.toBlob(resolve,'image/png')),blobBytes=await blob.arrayBuffer(),pngSha256=await sha(blobBytes);
    window.__reviewed={blob,manifest,pngSha256};
    return {dpr:devicePixelRatio,errors:current.result.errors,strokes:strokes.length,fills,edgeChecks,plates,manifest,base,company,metadata,pngSha256,png:current.canvas.toDataURL(),formats,legacy:{coldV1Parity:delta(bytes(coldV1),bytes(v1after))===0,coldV2Parity:delta(bytes(coldV2),bytes(v2a))===0,coldV3Parity:delta(bytes(coldV3.canvas),bytes(legacy.canvas))===0,strokes:oldStrokeCount,directParity:delta(bytes(legacy.canvas),bytes(legacyDirect))===0,manifestCompilerAbsent:!Object.hasOwn(legacy.result.manifest,'compilerVersion'),outsideProtectionDiff},flatPlates:flat.result.manifest.protection.textBlocks.length,tonalPlates:tonal.result.manifest.protection.textBlocks.length,blur:{textDiff:delta(roi(sharp.canvas,[50,130,600,200]),roi(blurred.canvas,[50,130,600,200])),imageDiff:delta(roi(sharp.canvas,[100,700,300,200]),roi(blurred.canvas,[100,700,300,200])),sourceUnchanged:checkerBefore===checker.toDataURL()},v2:{directParity:delta(bytes(v2a),bytes(v2b))===0,pinnedParity:delta(bytes(v2a),bytes(baseline))===0}};
   });
   assert.deepEqual(result.errors,[]);assert.equal(result.strokes,0);assert.equal(result.fills.length,5);
   for(const f of result.fills){assert.equal(f.filter,'none');assert.equal(f.shadowBlur,0);assert.equal(f.shadowOffsetX,0);assert.equal(f.shadowOffsetY,0);}
   assert.deepEqual(result.edgeChecks.map(c=>c.role).sort(),['body','brand','cta','headline','kicker']);
   for(const check of result.edgeChecks)assert.equal(check.diff,0,`${check.role}: actual native edge must equal fillText reference (no glyph halo)`);
   assert.equal(result.plates.length,4);for(const p of result.plates)assert.deepEqual(p.corner,[244,101,43,255]);
   assert.equal(result.flatPlates,0);assert.equal(result.tonalPlates,4);
   assert.ok(result.legacy.coldV1Parity);assert.ok(result.legacy.coldV2Parity);assert.ok(result.legacy.coldV3Parity);assert.ok(result.legacy.strokes>=4);assert.ok(result.legacy.directParity);assert.ok(result.legacy.manifestCompilerAbsent);assert.equal(result.legacy.outsideProtectionDiff,0);
   assert.equal(result.blur.textDiff,0);assert.ok(result.blur.imageDiff>1000);assert.ok(result.blur.sourceUnchanged);assert.ok(result.v2.directParity); // Archived v2 PNG mismatch is diagnostic only; see existing v3 checks.json.
   for(const [format,dimensions] of Object.entries({square:[1080,1080],portrait:[1080,1350],story:[1080,1920],landscape:[1200,628]})){
    assert.deepEqual([result.formats[format].width,result.formats[format].height],dimensions);assert.deepEqual(result.formats[format].errors,[],format);
   }
   const pending=page.waitForEvent('download');await page.evaluate(()=>{const a=document.createElement('a');a.href=URL.createObjectURL(window.__reviewed.blob);a.download='reviewed-crisp.png';a.click();});
   const download=await pending,pngPath=path.join(out,`reviewed-dpr${dpr}.png`);await download.saveAs(pngPath);
   const downloaded=await readFile(pngPath);assert.equal(createHash('sha256').update(downloaded).digest('hex'),result.pngSha256);assert.ok(downloaded.equals(Buffer.from(result.png.split(',')[1],'base64')));
   // Bind the actual browser-produced manifest + PNG bytes through the real domain.
   let n=0,state=createState();const command=(type,data)=>{const value=applyCommand(state,type,data,{id:()=>`crisp-${++n}`});state=value.state;return value;};
   const companyId=command('company.save',{...result.company,id:undefined}).id;
   const fontRecord=Object.fromEntries(['id','family','catalogId','source','license','licenseUrl','licenseNotice','provenance'].map(key=>[key,result.metadata[key]]));
   state=addFont(state,{...fontRecord,companyId,importedAt:'2026-11-10T10:00:00.000Z',faces:result.metadata.faces.map(({sourceUrl,...face})=>face)});state=addAsset(state,{id:'test-background',companyId,role:'backdrop',name:'Synthetic',bytes:100,mime:'image/png'});
   const postId=command('post.save',{...result.base,companyId}).id;
   const receipt={manifest:result.manifest,pngSha256:result.pngSha256},saved=command('design.snapshot',{postId,renderReceipt:receipt});
   command('design.review',{id:saved.id,reviewed:true});command('post.status',{id:postId,status:'exported',designId:saved.id,pngSha256:result.pngSha256});
   assert.equal(state.designs[0].scene.compilerVersion,2);assert.equal(state.posts[0].status,'exported');
   assert.throws(()=>command('post.status',{id:postId,status:'exported',designId:saved.id,pngSha256:'0'.repeat(64)}),/exact PNG/);
   const {png,...summary}=result;results.push(summary);await context.close();
  }
  assert.deepEqual(results[0].formats,results[1].formats,'DPR changes CSS/device presentation, never native export pixels or dimensions');
  assert.equal(results[0].pngSha256,results[1].pngSha256);assert.deepEqual(pageErrors,[]);assert.deepEqual(unexpectedRequests,[]);
  await writeFile(path.join(out,'checks.json'),JSON.stringify(results,null,2));
 }finally{await browser.close();}
});
