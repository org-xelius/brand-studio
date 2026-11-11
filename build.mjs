import { build } from 'esbuild';
import { writeFile } from 'node:fs/promises';
const out = await build({entryPoints:['src/client.jsx'],bundle:true,write:false,format:'cjs',platform:'browser',target:'es2022',external:['react'],loader:{'.css':'text','.woff2':'dataurl','.woff':'dataurl','.ttf':'dataurl','.png':'dataurl','.webp':'dataurl'},minify:false});
await writeFile('client.js', `window.__ModuleLoader__.load({id:"@local/brand-studio",factory(require){const module={exports:{}};const exports=module.exports;\n${out.outputFiles[0].text}\nreturn module.exports;}});\n`);
await build({entryPoints:['index.js'],bundle:true,outfile:'host.js',format:'esm',platform:'node',target:'node22',external:['zod']});
console.log('Built Brand Studio client and Host modules.');
