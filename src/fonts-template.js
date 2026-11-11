// Compiler4 only. Exact pinned local faces, no CSS/network/fallback substitution.
import spartan from '../assets/fonts/league-spartan-latin-wght-normal.woff2';
import sourceSans from '../assets/fonts/source-sans-3-latin-wght-normal.woff2';
import barlow from '../assets/fonts/barlow-condensed-latin-800-normal.woff2';
import archivo from '../assets/fonts/archivo-latin-wght-normal.woff2';
import manrope from '../assets/fonts/manrope-latin-wght-normal.woff2';
import lora from '../assets/fonts/lora-latin-wght-normal.woff2';
import space from '../assets/fonts/space-grotesk-latin-wght-normal.woff2';
import dm from '../assets/fonts/dm-sans-latin-wght-normal.woff2';
import oswald from '../assets/fonts/oswald-latin-wght-normal.woff2';
import {getRoleBundledFont} from '../font-pairings.js';
export {unsupportedGlyphs} from './fonts-v3.js';
const urls={'league-spartan-latin-wght-normal.woff2':spartan,'source-sans-3-latin-wght-normal.woff2':sourceSans,'barlow-condensed-latin-800-normal.woff2':barlow,'archivo-latin-wght-normal.woff2':archivo,'manrope-latin-wght-normal.woff2':manrope,'lora-latin-wght-normal.woff2':lora,'space-grotesk-latin-wght-normal.woff2':space,'dm-sans-latin-wght-normal.woff2':dm,'oswald-latin-wght-normal.woff2':oswald};
const documents=new WeakMap();
function coverageValid(v){return Array.isArray(v)&&v.length>0&&v.length<=20000&&v.every(r=>Array.isArray(r)&&r.length===2&&Number.isInteger(r[0])&&Number.isInteger(r[1])&&r[0]>=0&&r[1]>=r[0]&&r[1]<=0x10ffff);}
async function localBytes(url){
 if(typeof url!=='string'||!/^data:(?:font\/(?:woff2|ttf)|application\/(?:octet-stream|font-woff));base64,[A-Za-z0-9+/=]+$/.test(url))throw Error('The cached face is not a supported local font file.');
 const raw=atob(url.slice(url.indexOf(',')+1));if(raw.length>2*1024*1024)throw Error('The font file exceeds2MB.');return Uint8Array.from(raw,c=>c.charCodeAt(0));
}
async function digest(bytes){if(!globalThis.crypto?.subtle)throw Error('Font digest verification is unavailable.');return [...new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))].map(b=>b.toString(16).padStart(2,'0')).join('');}
export async function loadTemplateRoleFonts({fontPairing,voice='studio',typography={},fonts=[],getFont,companyId,doc=globalThis.document}){
 if(!doc?.fonts||typeof FontFace==='undefined')throw Error('Required poster font loading is unavailable.');
 const options={voice,...(fontPairing===undefined?{}:{fontPairing})},resolved={};let pending=documents.get(doc);if(!pending){pending=new Map();documents.set(doc,pending);}
 for(const role of ['headline','body','cta','kicker','brand']){
  const selected=getRoleBundledFont(options,role),style=typography[role]||{},weight=style.weight??selected.defaultWeight;let bytes,reference;
  if(!Number.isInteger(weight)||weight<100||weight>900)throw Error(`${role}: invalid selected font weight.`);
  if(style.fontId){
   const record=fonts.find(f=>f.id===style.fontId);if(!record||record.companyId!==companyId)throw Error(`${role}: selected font is missing from this company's frozen font metadata.`);
   const face=record.faces?.find(f=>f.weight===weight&&f.style==='normal');if(!face||!coverageValid(face.coverage)||!/^[a-f0-9]{64}$/.test(face.sha256))throw Error(`${role}: the selected normal weight ${weight} or verified cmap metadata is unavailable.`);
   if(typeof getFont!=='function')throw Error(`${role}: the local font loader is unavailable.`);
   const cached=await getFont(record.id,weight);for(const key of ['weight','style','sha256','assetId'])if(cached?.[key]!==face[key])throw Error(`${role}: cached font ${key} differs from the saved face.`);
   if(JSON.stringify(cached.coverage)!==JSON.stringify(face.coverage))throw Error(`${role}: cached cmap coverage differs from the saved face.`);
   bytes=await localBytes(cached.dataUrl);if(bytes.length!==face.bytes||await digest(bytes)!==face.sha256)throw Error(`${role}: cached font digest or byte length does not match the saved face.`);
   reference={fontId:record.id,assetId:face.assetId,family:record.family,file:face.assetId,sha256:face.sha256,coverage:face.coverage,source:record.source,license:record.license,weight,style:'normal'};
  }else{
   if(weight<selected.range[0]||weight>selected.range[1])throw Error(`${role}: bundled face does not support normal weight ${weight}.`);
   if(!coverageValid(selected.coverage))throw Error(`${role}: verified bundled cmap metadata is unavailable.`);
   bytes=await localBytes(urls[selected.file]);if(await digest(bytes)!==selected.sha256||(selected.bytes!==undefined&&bytes.length!==selected.bytes))throw Error(`${role}: bundled font digest or byte length does not match its passport.`);
   reference={fontId:null,assetId:null,family:selected.legacyId?`BS3 ${selected.legacyId}`:selected.family,file:selected.file,sha256:selected.sha256,coverage:selected.coverage,source:'bundled',license:'SIL OFL1.1',weight,style:'normal'};
   // Preserve the exact existing reference strings for the three original pairings.
   reference.license='SIL OFL 1.1';
  }
  const family=`BS3_${reference.sha256}_${weight}`;let promise=pending.get(family);
  if(!promise){promise=(async()=>{const face=new FontFace(family,bytes.buffer,{weight:String(weight),style:'normal'});let timer;try{await Promise.race([face.load(),new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('Local font loading timed out.')),8000);})]);}finally{clearTimeout(timer);}doc.fonts.add(face);return face;})().catch(error=>{pending.delete(family);throw error;});pending.set(family,promise);}
  const loaded=await promise;if(loaded.status!=='loaded'||!doc.fonts.has(loaded))throw Error(`${role}: the exact selected font failed to load.`);resolved[role]={...reference,canvasFamily:family};
 }
 return resolved;
}
