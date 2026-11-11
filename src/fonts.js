import studio from '../assets/fonts/league-spartan-latin-wght-normal.woff2';
import body from '../assets/fonts/source-sans-3-latin-wght-normal.woff2';
import impact from '../assets/fonts/barlow-condensed-latin-800-normal.woff2';
import clean from '../assets/fonts/archivo-latin-wght-normal.woff2';
import cleanBody from '../assets/fonts/manrope-latin-wght-normal.woff2';

// Pinned, redistributed SIL OFL files. See assets/fonts/README.md and adjacent licenses.
export const FONT_PASSPORT = Object.freeze({
 studio:{display:'BS League Spartan',body:'BS Source Sans 3',weight:800,displayFile:'league-spartan-latin-wght-normal.woff2',bodyFile:'source-sans-3-latin-wght-normal.woff2'},
 impact:{display:'BS Barlow Condensed',body:'BS Source Sans 3',weight:800,displayFile:'barlow-condensed-latin-800-normal.woff2',bodyFile:'source-sans-3-latin-wght-normal.woff2'},
 clean:{display:'BS Archivo',body:'BS Manrope',weight:800,displayFile:'archivo-latin-wght-normal.woff2',bodyFile:'manrope-latin-wght-normal.woff2'},
});
const sources={'BS League Spartan':[studio,'100 900'],'BS Source Sans 3':[body,'200 900'],'BS Barlow Condensed':[impact,'800'],'BS Archivo':[clean,'100 900'],'BS Manrope':[cleanBody,'200 800']};
const documents=new WeakMap();
export async function loadPosterFonts(voice='studio',doc=globalThis.document){
 const passport=FONT_PASSPORT[voice];
 if(!passport)throw new Error('Choose a supported poster type voice.');
 if(!doc?.fonts||typeof FontFace==='undefined')throw new Error('Poster fonts cannot load in this browser. Export is blocked.');
 let pending=documents.get(doc);if(!pending){pending=new Map();documents.set(doc,pending);}
 for(const family of [passport.display,passport.body]){
  if(!pending.has(family))pending.set(family,(async()=>{const [url,weight]=sources[family];const face=new FontFace(family,`url(${JSON.stringify(url)})`,{weight,style:'normal'});let timer;try{await Promise.race([face.load(),new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error(`Loading ${family} timed out.`)),8000);})]);}finally{clearTimeout(timer);}doc.fonts.add(face);return face;})().catch(e=>{pending.delete(family);throw e;}));
  const face=await pending.get(family);
  if(face.status!=='loaded'||!doc.fonts.has(face))throw new Error(`Required font ${family} is unavailable. Export is blocked.`);
 }
 const digests={'league-spartan-latin-wght-normal.woff2':'7d843a9fa4dcd050da68405d9093f8ab8298f8f60a97155e85ab84c9ed3040e2','source-sans-3-latin-wght-normal.woff2':'7a19a7027e125257d310c6dbd78ae3a30b5ea1e3794d60b12bb28227a003bfda','barlow-condensed-latin-800-normal.woff2':'2515494e8cc2ca07c86ea78766cfa104b796aa6ed5d66821c01d51dbb0b52bce','archivo-latin-wght-normal.woff2':'8f704806dbedeaaeca334b11ec348bc3ac3a439d6431544b3afb54f534ee4967','manrope-latin-wght-normal.woff2':'a30ddcd349703aff7464c34bef3fffdff405ee50c113440d7c8693c02d210972'};
 return {...passport,displaySha256:digests[passport.displayFile],bodySha256:digests[passport.bodyFile],license:'SIL OFL 1.1',coverage:'Latin subset: basic Western European Latin and common punctuation'};
}
// Conservative declared coverage: never claim a fallback glyph is the licensed face.
export function unsupportedCharacters(text){return [...new Set([...String(text)].filter(c=>!/[\u0009\u000a\u000d\u0020-\u007e\u00a0-\u00ff\u2013-\u2014\u2018-\u201a\u201c-\u201e\u2022\u2026\u20ac\u2122]/u.test(c)))];}
