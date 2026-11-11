import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {chromium} from '@playwright/test';
import {mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {produceProfileProofs} from './flexible-profile-producer.mjs';

const root=fileURLToPath(new URL('../',import.meta.url)),out=new URL('../output/playwright/flexible-compositions/',import.meta.url);

test('nine practical profile proofs come from unsupplied domain post factory, not renderer fixture placement',async()=>{
 await mkdir(out,{recursive:true});
 const bundle=await build({stdin:{resolveDir:root,contents:`import {compose} from './src/compositor.js';import photo from './tests/fixtures/storin-existing-background.png';window.flex={compose,photo};`},bundle:true,write:false,format:'iife',loader:{'.woff2':'dataurl','.png':'dataurl'}}),html='<!doctype html><meta charset="utf-8"><body><script>'+bundle.outputFiles[0].text.replace(/<\/script/gi,'<\\/script')+'</script>';
 const browser=await chromium.launch({channel:'chromium',headless:true,args:['--disable-accelerated-2d-canvas']}),page=await browser.newPage(),errors=[],requests=[];
 page.on('pageerror',e=>errors.push(e.message));await page.route('**/*',route=>{if(route.request().url()==='https://profile-factory-proofs.test/')return route.fulfill({contentType:'text/html',body:html});requests.push(route.request().url());return route.abort();});
 try{await page.goto('https://profile-factory-proofs.test/');const records=await produceProfileProofs({page,out});assert.equal(records.length,9);assert.ok(records.every(r=>r.factoryProof.posterOmittedFromCreation&&r.factoryProof.motifPlacementOmittedFromSourceCompany&&r.factoryProof.receiptBound));assert.deepEqual(errors,[]);assert.deepEqual(requests,[]);}finally{await browser.close();}
});
