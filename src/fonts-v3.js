import studio from '../assets/fonts/league-spartan-latin-wght-normal.woff2';
import body from '../assets/fonts/source-sans-3-latin-wght-normal.woff2';
import impact from '../assets/fonts/barlow-condensed-latin-800-normal.woff2';
import clean from '../assets/fonts/archivo-latin-wght-normal.woff2';
import cleanBody from '../assets/fonts/manrope-latin-wght-normal.woff2';
import {BUNDLED_FONT_METADATA} from './font-passports-v3.js';

const bundled={
 studio:{url:studio,file:'league-spartan-latin-wght-normal.woff2',range:[100,900]},
 body:{url:body,file:'source-sans-3-latin-wght-normal.woff2',range:[200,900]},
 impact:{url:impact,file:'barlow-condensed-latin-800-normal.woff2',range:[800,800]},
 clean:{url:clean,file:'archivo-latin-wght-normal.woff2',range:[100,900]},
 cleanBody:{url:cleanBody,file:'manrope-latin-wght-normal.woff2',range:[200,800]},
};
const voices={studio:['studio','body'],impact:['impact','body'],clean:['clean','cleanBody']};
const documents=new WeakMap();
export function unsupportedGlyphs(text,coverage){return [...new Set([...String(text)].filter(c=>!['\n','\r','\t'].includes(c)&&!coverage.some(([a,b])=>c.codePointAt(0)>=a&&c.codePointAt(0)<=b)))];}
function coverageValid(value){return Array.isArray(value)&&value.length>0&&value.length<=20000&&value.every(x=>Array.isArray(x)&&x.length===2&&Number.isInteger(x[0])&&Number.isInteger(x[1])&&x[0]>=0&&x[1]>=x[0]&&x[1]<=0x10ffff);}
async function bytesFor(url){
 if(typeof url!=='string'||!/^data:font\/(?:woff2|ttf);base64,[A-Za-z0-9+/=]+$/.test(url))throw Error('The cached face is not a supported local font file.');
 const raw=atob(url.slice(url.indexOf(',')+1));if(raw.length>2*1024*1024)throw Error('The font file exceeds 2 MB.');return Uint8Array.from(raw,c=>c.charCodeAt(0));
}
async function digest(bytes){if(!globalThis.crypto?.subtle)throw Error('Font digest verification is unavailable.');return [...new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))].map(b=>b.toString(16).padStart(2,'0')).join('');}
export async function loadRoleFonts({voice='studio',typography={},fonts=[],getFont,companyId,doc=globalThis.document}){
 if(!voices[voice]||!doc?.fonts||typeof FontFace==='undefined')throw Error('Required poster font loading is unavailable.');
 const resolved={};let pending=documents.get(doc);if(!pending){pending=new Map();documents.set(doc,pending);}
 for(const role of ['headline','body','cta','kicker','brand']){
  const style=typography[role]||{},weight=style.weight??(role==='headline'?800:role==='body'?400:600);let source,reference;
  if(style.fontId){
   const record=fonts.find(f=>f.id===style.fontId);if(!record||record.companyId!==companyId)throw Error(`${role}: selected font is missing from this company's frozen font metadata.`);
   const face=record.faces?.find(f=>f.weight===weight&&f.style==='normal');if(!face||!coverageValid(face.coverage)||!/^[a-f0-9]{64}$/.test(face.sha256))throw Error(`${role}: the selected normal weight ${weight} or verified cmap metadata is unavailable.`);
   if(typeof getFont!=='function')throw Error(`${role}: the local font loader is unavailable.`);
   source=await getFont(record.id,weight);
   for(const key of ['weight','style','sha256','assetId'])if(source?.[key]!==face[key])throw Error(`${role}: cached font ${key} differs from the saved face.`);
   if(JSON.stringify(source.coverage)!==JSON.stringify(face.coverage))throw Error(`${role}: cached cmap coverage differs from the saved face.`);
   const bytes=await bytesFor(source.dataUrl);if(await digest(bytes)!==face.sha256||bytes.length!==face.bytes)throw Error(`${role}: cached font digest or byte length does not match the saved face.`);
   source={bytes};reference={fontId:record.id,assetId:face.assetId,family:record.family,file:face.assetId,sha256:face.sha256,coverage:face.coverage,source:record.source,license:record.license,weight,style:'normal'};
  }else{
   const id=voices[voice][role==='headline'?0:1],entry=bundled[id];if(weight<entry.range[0]||weight>entry.range[1])throw Error(`${role}: bundled face does not support normal weight ${weight}.`);
   const meta=BUNDLED_FONT_METADATA[entry.file];source={url:entry.url,range:entry.range};reference={fontId:null,assetId:null,family:`BS3 ${id}`,file:entry.file,...meta,source:'bundled',license:'SIL OFL 1.1',weight,style:'normal'};
  }
  const family=`BS3_${reference.sha256}_${weight}`,key=family;let promise=pending.get(key);
  if(!promise){promise=(async()=>{const face=new FontFace(family,source.bytes?source.bytes.buffer:`url(${JSON.stringify(source.url)})`,{weight:String(weight),style:'normal'});let timer;try{await Promise.race([face.load(),new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('Local font loading timed out.')),8000);})]);}finally{clearTimeout(timer);}doc.fonts.add(face);return face;})().catch(e=>{pending.delete(key);throw e;});pending.set(key,promise);}
  const loaded=await promise;if(loaded.status!=='loaded'||!doc.fonts.has(loaded))throw Error(`${role}: the exact selected font failed to load.`);
  resolved[role]={...reference,canvasFamily:family};
 }
 return resolved;
}
