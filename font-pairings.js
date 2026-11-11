// Compiler4 pairing vocabulary. Browser-safe, fixed local faces; no runtime discovery/network.
import {BUNDLED_FONT_METADATA} from './src/font-passports-v3.js';
import {TEMPLATE_FONT_METADATA} from './src/font-passports-template.js';
const metadata={...BUNDLED_FONT_METADATA,...TEMPLATE_FONT_METADATA};
function freeze(v){if(v&&typeof v==='object'){Object.values(v).forEach(freeze);Object.freeze(v);}return v;}
const face=(family,file,range,legacyId)=>({family,file,range,...metadata[file],coverage:metadata[file].coverage.map(r=>[...r]),...(legacyId?{legacyId}:{})});
const faces={
 spartan:face('League Spartan','league-spartan-latin-wght-normal.woff2',[100,900],'studio'),
 source:face('Source Sans 3','source-sans-3-latin-wght-normal.woff2',[200,900],'body'),
 barlow:face('Barlow Condensed','barlow-condensed-latin-800-normal.woff2',[800,800],'impact'),
 archivo:face('Archivo','archivo-latin-wght-normal.woff2',[100,900],'clean'),
 manrope:face('Manrope','manrope-latin-wght-normal.woff2',[200,800],'cleanBody'),
 lora:face('Lora','lora-latin-wght-normal.woff2',[400,700]),
 space:face('Space Grotesk','space-grotesk-latin-wght-normal.woff2',[300,700]),
 dm:face('DM Sans','dm-sans-latin-wght-normal.woff2',[100,1000]),
 oswald:face('Oswald','oswald-latin-wght-normal.woff2',[200,700]),
};
const pairing=(id,label,description,headline,body,weight)=>({id,label,description,headline:{...faces[headline],defaultWeight:weight},body:{...faces[body],defaultWeight:400},defaultWeights:{headline:weight,body:400,cta:600,kicker:600,brand:600}});
export const FONT_PAIRINGS=freeze([
 pairing('studio','Bold studio','League Spartan with Source Sans 3','spartan','source',800),
 pairing('impact','Compact impact','Barlow Condensed with Source Sans 3','barlow','source',800),
 pairing('clean','Clean digital','Archivo with Manrope','archivo','manrope',800),
 pairing('editorial-serif','Editorial serif','Lora with Source Sans 3','lora','source',700),
 pairing('geometric-modern','Geometric modern','Space Grotesk with DM Sans','space','dm',700),
 pairing('tall-editorial','Tall editorial','Oswald with Manrope','oswald','manrope',700),
]);
export function resolveFontPairing(options={}){
 const id=Object.hasOwn(options,'fontPairing')?options.fontPairing:(options.voice??'studio');
 const result=FONT_PAIRINGS.find(p=>p.id===id);if(!result)throw Error('Choose a supported font pairing.');return result;
}
export function getRoleBundledFont(options={},role){
 const p=resolveFontPairing(options);if(!Object.hasOwn(p.defaultWeights,role))throw Error('Choose a supported typography role.');
 return {...p[role==='headline'?'headline':'body'],pairingId:p.id,defaultWeight:p.defaultWeights[role]};
}
