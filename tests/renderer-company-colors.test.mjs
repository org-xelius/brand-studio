import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {chromium} from '@playwright/test';
import {mkdir,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const root=new URL('../',import.meta.url).pathname;
const out=new URL('../output/playwright/company-colors/',import.meta.url);

test('four-colour crisp palette: independent roles, native CTA pixels, contrast guard and frozen legacy paths',async()=>{
 const bundle=await build({stdin:{resolveDir:root,contents:`import {compose} from './src/compositor.js';import {resolvePalette} from './src/poster-renderer.js';import {resolveCrispPalette} from './src/poster-renderer-crisp.js';window.testColors={compose,resolvePalette,resolveCrispPalette};`},bundle:true,write:false,format:'iife',loader:{'.woff2':'dataurl'}});
 const html='<!doctype html><meta charset="utf-8"><body><script>'+bundle.outputFiles[0].text.replace(/<\/script/gi,'<\\/script')+'</script>';
 const browser=await chromium.launch({channel:'chromium',headless:true,args:['--disable-accelerated-2d-canvas']});
 const page=await browser.newPage(),requests=[],errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/*',route=>{if(route.request().url()==='https://company-colors.test/')return route.fulfill({contentType:'text/html',body:html});requests.push(route.request().url());return route.abort();});
 try{
  await page.goto('https://company-colors.test/');
  const result=await page.evaluate(async()=>{
   const {compose,resolvePalette,resolveCrispPalette}=window.testColors;
   const legacy={id:'company',name:'Brand',color:'#f4652b',brandKit:{ink:'#171717',paper:'#f7f5ef'}};
   const company={...legacy,brandKit:{...legacy.brandKit,accent:'#2456a6'}};
   const post={headline:'Clear by design',body:'Exact words. Four brand colours.',cta:'Visit us',format:'square',poster:{version:3,compilerVersion:2,details:{motif:'none',surface:'flat',action:'rail'}}};
   const render=async(c,p=post)=>{const canvas=document.createElement('canvas'),result=await compose(canvas,{company:c,post:p});return {canvas,result};};
   const sha=async canvas=>[...new Uint8Array(await crypto.subtle.digest('SHA-256',await (await new Promise(resolve=>canvas.toBlob(resolve))).arrayBuffer()))].map(x=>x.toString(16).padStart(2,'0')).join('');
   const pixel=(c,x,y)=>[...c.getContext('2d').getImageData(x,y,1,1).data];
   const main=await render(company),m=main.result.manifest,box=m.layers.find(l=>l.role==='action').box;
   const native={field:pixel(main.canvas,0,0),action:pixel(main.canvas,box[0]+6,box[1]+6),dimensions:[main.canvas.width,main.canvas.height]};
   const inherited=['brand','light','dark'].map(treatment=>JSON.stringify(resolveCrispPalette(legacy,{treatment}))===JSON.stringify(resolvePalette(legacy,{treatment})));
   const treatments=Object.fromEntries(['brand','light','dark'].map(treatment=>[treatment,resolveCrispPalette(company,{treatment})]));
   const legacyParity=[];
   for(const poster of [{version:2},{version:3}]){const a=await render(legacy,{...post,poster}),b=await render(company,{...post,poster});legacyParity.push({version:poster.version,same:await sha(a.canvas)===await sha(b.canvas),paletteSame:JSON.stringify(a.result.manifest.palette)===JSON.stringify(b.result.manifest.palette)});}
   const frozenBefore=await render(legacy),frozenHash=await sha(frozenBefore.canvas),frozenAfter=await render(structuredClone(legacy));
   const invalid=await render({...company,brandKit:{...company.brandKit,accent:'#abc'}});
   const low={...company,brandKit:{ink:'#777777',paper:'#888888',accent:'#808080'}},lowResult=await render(low);
   const noAction=await render(low,{...post,cta:''});
   const textAction=await render(low,{...post,poster:{...post.poster,details:{...post.poster.details,action:'text'}}});
   return {errors:main.result.errors,palette:m.palette,native,inherited,treatments,legacyParity,frozenSame:frozenHash===await sha(frozenAfter.canvas),invalid:invalid.result.errors,low:lowResult.result.errors,noAction:noAction.result.errors,textAction:textAction.result.errors,png:main.canvas.toDataURL(),manifest:m};
  });
  assert.deepEqual(errors,[]);assert.deepEqual(requests,[]);assert.deepEqual(result.errors,[]);
  assert.equal(result.palette.primary,'#f4652b');assert.equal(result.palette.accent,'#2456a6');assert.equal(result.palette.ink,'#171717');assert.equal(result.palette.paper,'#f7f5ef');assert.equal(result.palette.action,'#2456a6');assert.equal(result.palette.actionText,'#f7f5ef');
  assert.deepEqual(result.native,{field:[244,101,43,255],action:[36,86,166,255],dimensions:[1080,1080]});
  assert.ok(result.inherited.every(Boolean));for(const row of result.legacyParity){assert.ok(row.same);assert.ok(row.paletteSame);}assert.ok(result.frozenSame);
  assert.equal(result.treatments.brand.field,'#f4652b');assert.equal(result.treatments.light.field,'#f7f5ef');assert.equal(result.treatments.dark.field,'#171717');for(const p of Object.values(result.treatments))assert.equal(p.action,'#2456a6');
  assert.ok(result.invalid.some(e=>e.includes('six-digit accent')));assert.ok(result.low.some(e=>e.includes('CTA text contrast')));assert.ok(!result.noAction.some(e=>e.includes('CTA text contrast')));assert.ok(!result.textAction.some(e=>e.includes('CTA text contrast')));
  await mkdir(out,{recursive:true});const png=Buffer.from(result.png.split(',')[1],'base64');await writeFile(new URL('native-four-colours.png',out),png);delete result.png;
  await writeFile(new URL('renderer-company-colors-report.json',out),JSON.stringify({passed:true,scope:'Isolated native Chromium canvas, no provider requests or installed GUI.',pngSha256:createHash('sha256').update(png).digest('hex'),...result},null,2));
 }finally{await browser.close();}
});
