import test from 'node:test';
import assert from 'node:assert/strict';
import {chromium} from '@playwright/test';
import {pathToFileURL} from 'node:url';
import {readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {buildHarness} from './renderer-harness.build.mjs';
import {legacyFixturesReady,legacyFixtureHint} from './legacy-fixtures.mjs';

test('browser: twelve compositions, blockers, exact bitmap parity and legacy isolation',{skip:legacyFixturesReady()?false:legacyFixtureHint},async()=>{
 const file=await buildHarness(),out=path.dirname(file),browser=await chromium.launch({headless:true,channel:'chromium'});
 try{
  const page=await browser.newPage({viewport:{width:1600,height:1100},deviceScaleFactor:1});const external=[];
  page.on('request',r=>{if(/^https?:/.test(r.url()))external.push(r.url());});
  page.on('pageerror',error=>console.error('Proof page error:',error));page.on('console',message=>console.log(message.text()));
  await page.setContent(await readFile(file,'utf8'),{waitUntil:'domcontentloaded'});try{await page.waitForFunction(()=>window.__posterProofsReady,{},{timeout:60000});}catch(error){console.error(await page.evaluate(()=>({ready:document.readyState,proofs:window.__posterProofs,sections:document.querySelectorAll('section').length,fonts:[...document.fonts].map(f=>({family:f.family,status:f.status})),script:document.scripts.length})));throw error;}
  const proofs=await page.evaluate(()=>window.__posterProofs);await writeFile(path.join(out,'manifest.json'),JSON.stringify(proofs,null,2));
  assert.equal(proofs.length,12);
  assert.deepEqual(external,[],'renderer must remain entirely local');
  for(const proof of proofs){const filename=`${proof.recipe}-${proof.format}.png`;const bytes=await page.evaluate(({recipe,format})=>document.querySelector(`canvas[data-recipe="${recipe}"][data-format="${format}"]`).toDataURL('image/png').split(',')[1],proof);await writeFile(path.join(out,filename),Buffer.from(bytes,'base64'));}
  await page.screenshot({path:path.join(out,'board-desktop.png'),fullPage:true});
  await page.setViewportSize({width:430,height:932});await page.screenshot({path:path.join(out,'board-phone.png'),fullPage:true});
  const checks=await page.evaluate(async()=>{
   const make=()=>document.createElement('canvas'),company=window.__fixture.company;
   const base={headline:'Websites That\nMean Business',body:'Exact supporting copy.',cta:'Explore the possibilities',format:'square',poster:{version:2,recipe:'hero'}};
   const render=async(post,resources={})=>{const canvas=make();const result=await window.__compose(canvas,{company,post,...resources});return {canvas,result};};
   const long=await render({...base,headline:'This deliberately long original headline must not be silently shrunk or truncated '.repeat(15)});
   const url=await render({...base,body:'https://example.test/'+('unbreakable'.repeat(60))});
   const missing=await render({...base,poster:{version:2,recipe:'showcase'}},{background:window.__fixture.background});
   const invalid=await render({...base,poster:{version:2,voice:'nonexistent'}});
   const unsupported=await render({...base,headline:'日本語'});
   const frame=document.createElement('iframe');document.body.append(frame);const OriginalFontFace=window.FontFace;let missingFont;
   try{window.FontFace=class {constructor(){throw new Error('Synthetic missing-font test');}};missingFont=await window.__compose(frame.contentDocument.createElement('canvas'),{company,post:base});}finally{window.FontFace=OriginalFontFace;frame.remove();}
   const broken=await render(base,{product:'data:image/png;base64,broken'});
   const manual=await render({...base,headline:'One\nTwo'});
   const screen=await render({...base,poster:{version:2,recipe:'showcase',cropX:0,cropY:0,heroScale:1.2}},{product:window.__fixture.product});
   const replay=await render(base),replay2=await render(base);
   const png=replay.canvas.toDataURL('image/png'),img=new Image();img.src=png;await img.decode();const roundtrip=make();roundtrip.width=img.width;roundtrip.height=img.height;roundtrip.getContext('2d').drawImage(img,0,0);
   const pixelsA=replay.canvas.getContext('2d').getImageData(0,0,img.width,img.height).data,pixelsB=roundtrip.getContext('2d').getImageData(0,0,img.width,img.height).data;let equal=true;for(let i=0;i<pixelsA.length;i++)if(pixelsA[i]!==pixelsB[i]){equal=false;break;}
   const legacy=await render({...base,poster:undefined},{design:{scene:{post:{poster:{version:2}}}}});
   const wideLogo='data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="100"><rect width="1000" height="100" fill="black"/></svg>');
   const tallLogo='data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="1000"><rect width="100" height="1000" fill="black"/></svg>');
   const wide=await render(base,{logo:wideLogo}),tall=await render(base,{logo:tallLogo});
   return {long:long.result.errors,url:url.result.errors,missing:missing.result.errors,invalid:invalid.result.errors,unsupported:unsupported.result.errors,missingFont:missingFont.errors,broken:broken.result.errors,manual:manual.result.manifest.layers.find(l=>l.role==='Headline'),screen:screen.result.manifest.assets.find(a=>a.role==='original-product'),equal,deterministic:png===replay2.canvas.toDataURL('image/png'),legacy:!legacy.result.manifest,logos:[wide.result.manifest.assets[0],tall.result.manifest.assets[0]]};
  });
  assert.ok(checks.long.some(x=>x.includes('readable floor')));assert.ok(checks.url.length);assert.ok(checks.missing.some(x=>x.includes('original product')));assert.ok(checks.invalid.length);assert.ok(checks.unsupported.some(x=>x.includes('do not support')));assert.ok(checks.missingFont.some(x=>x.includes('fonts failed to load')));assert.ok(checks.broken.length);assert.deepEqual(checks.manual.lines,['One','Two']);assert.equal(checks.screen.cropped,false);assert.ok(checks.equal);assert.ok(checks.deterministic);assert.ok(checks.legacy);assert.equal(checks.logos[0].width/checks.logos[0].height,10);assert.equal(checks.logos[1].width/checks.logos[1].height,.1);
  await writeFile(path.join(out,'checks.json'),JSON.stringify(checks,null,2));
  for(const proof of proofs){assert.deepEqual(proof.errors,[],proof.recipe+'/'+proof.format+': '+proof.errors.join(' '));const {inset}=proof.manifest.safeRegion;for(const region of proof.hitRegions){assert.ok(region.x>=inset.left-.1&&region.y>=inset.top-.1&&region.x+region.width<=proof.width-inset.right+.1&&region.y+region.height<=proof.height-inset.bottom+.1,`${proof.recipe}/${proof.format}: ${region.role} safe region`);}for(const layer of proof.manifest.layers)if(!layer.overflow)assert.ok(layer.size>=layer.readableFloor-.1,'declared legibility floor');}
 }finally{await browser.close();}
});
