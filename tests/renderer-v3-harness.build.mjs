import {build} from 'esbuild';
import {mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {legacyFixturesReady,legacyFixtureHint,legacyFixture} from './legacy-fixtures.mjs';
import {readFileSync} from 'node:fs';
const dataUrl=p=>'data:image/png;base64,'+readFileSync(p).toString('base64');
export async function buildV3Harness(){
 if(!legacyFixturesReady())throw Error(legacyFixtureHint);
 const root=fileURLToPath(new URL('../',import.meta.url)),out=path.resolve(root,process.env.BS_V3_OUTPUT||'output/playwright/v3-renderer');await mkdir(out,{recursive:true});
 const bundle=await build({entryPoints:[path.join(root,'tests/renderer-v3-harness.js')],bundle:true,write:false,format:'esm',define:{__LEGACY_BACKGROUND__:JSON.stringify(dataUrl(legacyFixture('storin-existing-background.png'))),__LEGACY_FOREGROUND__:JSON.stringify(dataUrl(legacyFixture('storin-manually-masked-synthetic.png')))},loader:{'.woff2':'dataurl','.ttf':'dataurl','.png':'dataurl'}});
 const html=`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>V3 renderer / labelled synthetic proofs</title><style>body{margin:0;padding:24px;background:#dededb;color:#171717;font-family:system-ui}h1{font-size:28px}header{max-width:1000px;margin-bottom:30px}main{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:24px;align-items:start}section{min-width:0}h2{font-size:17px}canvas{width:100%;height:auto;display:block}section p{font-size:12px;line-height:1.5}@media(max-width:700px){main{grid-template-columns:1fr}body{padding:16px}}</style></head><body><header><h1>V3 layered composition / test specimens</h1><p>Not approved customer campaigns. No authentic standalone logo/cutout/screens supplied. Manually masked generated illustration and synthetic screenshot are test-derived, not customer evidence. Actual imported Anton normal 400, cached locally with cmap/digest verification. No paid image calls.</p></header><main></main><script type="module">${bundle.outputFiles[0].text.replace(/<\/script/gi,'<\\/script')}</script></body></html>`;
 const file=path.join(out,'proofs.html');await writeFile(file,html);return {file,out,html};
}
if(process.argv[1]===fileURLToPath(import.meta.url))console.log((await buildV3Harness()).file);
