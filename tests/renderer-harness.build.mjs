import {build} from 'esbuild';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {legacyFixturesReady,legacyFixtureHint,legacyFixture} from './legacy-fixtures.mjs';
import {readFileSync} from 'node:fs';
const dataUrl=p=>'data:image/png;base64,'+readFileSync(p).toString('base64');
export async function buildHarness(){
 if(!legacyFixturesReady())throw Error(legacyFixtureHint);
 const root=fileURLToPath(new URL('../',import.meta.url));
 const result=await build({entryPoints:[path.join(root,'tests/renderer-harness.js')],bundle:true,write:false,format:'esm',define:{__LEGACY_BACKGROUND__:JSON.stringify(dataUrl(legacyFixture('storin-existing-background.png')))},loader:{'.woff2':'dataurl','.png':'dataurl'}});
 const template=await readFile(path.join(root,'tests/renderer-harness.html'),'utf8');
 const output=path.resolve(root,process.env.BS_V2_OUTPUT||'output/playwright/renderer');await mkdir(output,{recursive:true});
 const file=path.join(output,'proofs.html');await writeFile(file,template.replace('/* BUNDLED_RENDERER */',()=>result.outputFiles[0].text.replace(/<\/script/gi,'<\\/script')));return file;
}
if(process.argv[1]===fileURLToPath(import.meta.url))console.log(await buildHarness());
