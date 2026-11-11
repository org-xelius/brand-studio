import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {chromium} from '@playwright/test';
import {mkdir,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {createState,applyCommand,addAsset} from '../model.js';

const root=fileURLToPath(new URL('../',import.meta.url)),out=new URL('../output/playwright/flexible-compositions/',import.meta.url);

test('brand and headline directly over actual photographic fixture preserve image pixels between glyphs, without plates or holes',async()=>{
 const bundle=await build({stdin:{resolveDir:root,contents:`import {compose} from './src/compositor.js';import photo from './tests/fixtures/storin-existing-background.png';window.photoProof={compose,photo};`},bundle:true,write:false,format:'iife',loader:{'.woff2':'dataurl','.png':'dataurl'}});
 const html='<!doctype html><meta charset="utf-8"><body><script>'+bundle.outputFiles[0].text.replace(/<\/script/gi,'<\\/script')+'</script>',browser=await chromium.launch({channel:'chromium',headless:true,args:['--disable-accelerated-2d-canvas']}),page=await browser.newPage(),errors=[],requests=[];
 page.on('pageerror',e=>errors.push(e.message));await page.route('**/*',r=>{if(r.request().url()==='https://flex-photo-proof.test/')return r.fulfill({contentType:'text/html',body:html});requests.push(r.request().url());return r.abort();});
 try{
  await page.goto('https://flex-photo-proof.test/');
  const proof=await page.evaluate(async()=>{
   const {compose,photo}=window.photoProof,company={id:'fixture-xelius',name:'Xelius',color:'#343a8a',brandKit:{ink:'#181a24',paper:'#f7f7f4'}},post={format:'square',headline:'AI Is Not a Strategy.\nOutcomes Are.',body:'Successful AI adoption starts with the right business problem, clear priorities, and measurable outcomes.',cta:'Explore our insights  //  www.xelius.org',backgroundAssetId:'existing-synthetic-photo',poster:{version:3,compilerVersion:3,recipe:'hero',voice:'clean',treatment:'light',composition:{layout:'lateral'},motif:{id:'none'},layers:{background:{opacity:.35,blur:0}},cta:{style:'text',width:'full',arrow:true}}};
   const canvas=document.createElement('canvas'),result=await compose(canvas,{company,post,background:photo}),m=result.manifest;
   const reference=document.createElement('canvas');reference.width=1080;reference.height=1080;const r=reference.getContext('2d',{willReadFrequently:true});r.fillStyle=company.brandKit.paper;r.fillRect(0,0,1080,1080);const img=new Image();img.src=photo;await img.decode();const scale=Math.max(1080/img.width,1080/img.height),w=img.width*scale,h=img.height*scale;r.globalAlpha=.35;r.drawImage(img,(1080-w)/2,(1080-h)/2,w,h);r.globalAlpha=1;
   const bg=r.getImageData(0,0,1080,1080).data,actual=canvas.getContext('2d').getImageData(0,0,1080,1080).data,field=[247,247,244],gapChecks=[];
   for(const role of ['brand','headline']){
    const layer=m.layers.find(x=>x.role===role),mask=document.createElement('canvas');mask.width=1080;mask.height=1080;const c=mask.getContext('2d',{willReadFrequently:true});c.font=`${layer.weight} ${layer.size}px "${layer.canvasFamily}"`;c.fontKerning='normal';c.textBaseline='top';c.textAlign='left';c.letterSpacing=`${layer.tracking*layer.size}px`;c.fillStyle='#ffffff';for(let i=0;i<layer.lines.length;i++)c.fillText(layer.lines[i],...layer.positions[i]);const coverage=c.getImageData(0,0,1080,1080).data;
    let samples=0,differentFromField=0,mismatches=0;const rgbSamples=[];
    for(const box of layer.inkBoxes){const x0=Math.max(0,Math.ceil(box[0])+2),y0=Math.max(0,Math.ceil(box[1])+2),x1=Math.min(1080,Math.floor(box[0]+box[2])-2),y1=Math.min(1080,Math.floor(box[1]+box[3])-2);for(let y=y0;y<y1;y++)for(let x=x0;x<x1;x++){
     const at=(y*1080+x)*4;if(coverage[at+3]!==0)continue;
     // Restrict to genuine between-glyph gaps on rows that contain opaque text at both sides.
     let left=false,right=false;for(let px=x-1;px>=x0;px--)if(coverage[(y*1080+px)*4+3]>=250){left=true;break;}for(let px=x+1;px<x1;px++)if(coverage[(y*1080+px)*4+3]>=250){right=true;break;}if(!left||!right)continue;
     samples++;if([0,1,2,3].some(i=>actual[at+i]!==bg[at+i]))mismatches++;if([0,1,2].some(i=>actual[at+i]!==field[i])){differentFromField++;if(rgbSamples.length<6&&samples%37===0)rgbSamples.push({x,y,actual:[...actual.slice(at,at+4)],independentPhoto:[...bg.slice(at,at+4)]});}
    }}
    gapChecks.push({role,samples,differentFromField,mismatches,rgbSamples});
   }
   const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png')),pngSha256=[...new Uint8Array(await crypto.subtle.digest('SHA-256',await blob.arrayBuffer()))].map(x=>x.toString(16).padStart(2,'0')).join('');
   return {scope:'Isolated native acceptance proof: supplied Xelius palette and exact required copy over the pre-existing synthetic photo-like fixture, not authentic Xelius/Storin photography.',company,post,result,gapChecks,pngSha256,png:canvas.toDataURL(),photoPainted:m.assets.some(a=>a.role==='backdrop'&&a.assetId===post.backgroundAssetId),photoOpacity:.35,fixtureSource:'tests/fixtures/storin-existing-background.png',fixtureSourceSha256:'99510e463d3d5147b473a270b8bc42b1e03e2192a41fcc08598832ce60e835c8'};
  });
  await mkdir(out,{recursive:true});const bytes=Buffer.from(proof.png.split(',')[1],'base64');delete proof.png;await writeFile(new URL('photo-transparent-text.png',out),bytes);await writeFile(new URL('photo-transparent-text.json',out),JSON.stringify(proof,null,2));
  assert.deepEqual(proof.result.errors,[]);assert.equal(proof.photoPainted,true);assert.equal(proof.photoOpacity,.35);assert.equal(proof.result.manifest.options.layers.background.opacity,.35);assert.equal(proof.result.manifest.protection.nonCtaBackground,'none');assert.deepEqual(proof.result.manifest.protection.textBlocks,[]);assert.deepEqual(proof.result.manifest.protection.foregroundExclusions,[]);assert.ok(proof.result.manifest.protection.contrast.roles.every(x=>x.minimum>=4.5));
  for(const check of proof.gapChecks){assert.ok(check.samples>100,check.role);assert.equal(check.mismatches,0,`${check.role}: photo pixels in the between-glyph gaps must equal the independent photo composite`);assert.equal(check.differentFromField,check.samples,`${check.role}: sampled gaps must show actual photo RGB, not the initial flat palette field`);assert.ok(check.rgbSamples.length>0);}
  assert.equal(createHash('sha256').update(bytes).digest('hex'),proof.pngSha256);assert.deepEqual(errors,[]);assert.deepEqual(requests,[]);
  // Actual photographic render receipt must bind through the same strict review/export domain.
  let n=0,state=createState();const command=(type,data)=>{const result=applyCommand(state,type,data,{id:()=>`photo-${++n}`});state=result.state;return result;},companyId=command('company.save',{...proof.company,id:undefined}).id;
  state=addAsset(state,{id:proof.post.backgroundAssetId,companyId,role:'backdrop',name:'Existing synthetic photo fixture, not authentic company photography',mime:'image/png',bytes:1765932});const postId=command('post.save',{...proof.post,companyId}).id,saved=command('design.snapshot',{postId,renderReceipt:{manifest:proof.result.manifest,pngSha256:proof.pngSha256}});command('design.review',{id:saved.id,reviewed:true});command('post.status',{id:postId,status:'exported',designId:saved.id,pngSha256:proof.pngSha256});assert.equal(state.posts[0].status,'exported');
 }finally{await browser.close();}
});
