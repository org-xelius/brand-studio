// Compiler4 vocabulary and transformations. Poster-model imports only constants/validators;
// the reverse imports below are used solely by runtime calls, never initialization.
import { normalizePoster, resolvePoster, upgradePosterFlexible } from './poster-model.js';
import { normalizeFlexibleGroup, mergeComposition } from './composition-model.js';
import { templatePlan } from './src/layout-kernel-template.js';
import { resolveFontPairing } from './font-pairings.js';
const clone=value=>JSON.parse(JSON.stringify(value));
const plain=value=>value!==null&&typeof value==='object'&&!Array.isArray(value)&&[Object.prototype,null].includes(Object.getPrototypeOf(value));
function freeze(value){if(value&&typeof value==='object'){Object.values(value).forEach(freeze);Object.freeze(value);}return value;}
export const TEMPLATES=freeze([
 {id:'bold-backdrop',label:'Bold backdrop',description:'Full photographic or solid field, bold copy and a poster-wide action.',version:1},
 {id:'subject-right',label:'Subject right',description:'A left reading column with a separate right-hand subject.',version:1},
 {id:'image-lead',label:'Image lead',description:'A dominant complete original image with supporting copy.',version:1},
 {id:'centered-announcement',label:'Centered announcement',description:'A centered, focused announcement and compact action.',version:1},
 {id:'service-sheet',label:'Service sheet',description:'An editorial reading column for detailed service information.',version:1},
 {id:'subject-left',label:'Subject left',description:'A left-hand visual with a separate right reading column.',version:1},
 {id:'image-footer',label:'Image footer',description:'Copy leads above a substantial lower image zone.',version:1},
 {id:'framed-focus',label:'Framed focus',description:'A central contained visual between headline and supporting copy.',version:1},
 {id:'type-led',label:'Type-led',description:'A dominant headline with a compact supporting image.',version:1},
 {id:'offset-grid',label:'Offset grid',description:'An upper headline and asymmetric lower image-and-copy split.',version:1},
]);
export const TEMPLATE_DEFAULTS=freeze({
 composition:{layout:'bold-backdrop',version:1,density:'balanced',profile:null},
 motif:{id:'none',opacity:.15,color:'auto',x:.75,y:.65,scale:1,rotation:0},
 cta:{style:'strip',width:'poster',align:'left',paddingX:24,paddingY:16,fill:{mode:'palette',value:'ink'},text:{mode:'auto'},arrow:true},
 textColors:{headline:'auto',body:'auto',brand:'auto',kicker:'auto'},
 layers:{background:{mode:'solid',opacity:1,blur:0},foreground:{x:.66,y:.66,scale:1,rotation:0,shadow:.25,opacity:1},product:{opacity:1},headlineDepth:'front'},
});
export const LEGACY_TEMPLATE_IDS=freeze({lateral:'subject-right',broadside:'bold-backdrop',cover:'bold-backdrop',specimen:'image-lead',centered:'centered-announcement',spread:'service-sheet'});
export function templateId(value){if(TEMPLATES.some(t=>t.id===value))return value;return LEGACY_TEMPLATE_IDS[value]??'bold-backdrop';}
const formats=['square','portrait','story','landscape'];
function keys(v,allowed,label){if(!plain(v))throw Error(`${label} must be an object.`);for(const k of Object.keys(v))if(!allowed.includes(k))throw Error(`Unsupported ${label} option: ${k}.`);}
function number(v,min,max,label){if(typeof v!=='number'||!Number.isFinite(v)||v<min||v>max)throw Error(`${label} must be between ${min} and ${max}.`);}
export function normalizeTemplateGroup(group,value,partial=false){
 const defaults=TEMPLATE_DEFAULTS[group];if(!defaults)throw Error('Unsupported template group.');keys(value,Object.keys(defaults),`poster ${group}`);
 if(group==='composition'){
  if(Object.hasOwn(value,'layout')&&!TEMPLATES.some(t=>t.id===value.layout))throw Error('Choose a supported template layout.');
  const checked=normalizeFlexibleGroup(group,{...value,...(Object.hasOwn(value,'layout')?{layout:'lateral'}:{})},partial);if(Object.hasOwn(value,'layout'))checked.layout=value.layout;else if(!partial)checked.layout=defaults.layout;return checked;
 }
 if(group==='cta'){
  if(Object.hasOwn(value,'width')&&!['fit','column','poster'].includes(value.width))throw Error('Choose a supported template CTA width.');
  const checked=normalizeFlexibleGroup(group,{...value,...(Object.hasOwn(value,'width')?{width:value.width==='fit'?'fit':'full'}:{})},true);
  if(Object.hasOwn(value,'width'))checked.width=value.width;
  const result=partial?checked:mergeComposition(defaults,checked);
  if(!partial){normalizeFlexibleGroup('cta',{...result,width:result.width==='fit'?'fit':'full'});if(value.text?.mode==='auto')result.text={mode:'auto'};}return result;
 }
 if(group==='layers'){
  const checked={};for(const [name,spec]of Object.entries(value)){
   if(name==='headlineDepth'){if(!['front','behind'].includes(spec))throw Error('Choose supported headline depth.');checked[name]=spec;continue;}
   const bounds=name==='background'?{opacity:[0,1],blur:[0,24]}:name==='foreground'?{x:[0,1],y:[0,1],scale:[.4,2],rotation:[-25,25],shadow:[0,1],opacity:[0,1]}:{opacity:[0,1]};
   keys(spec,[...Object.keys(bounds),...(name==='background'?['mode']:[])],`template ${name}`);checked[name]={};for(const[k,v]of Object.entries(spec)){if(k==='mode'){if(!['solid','image'].includes(v))throw Error('Choose a supported background mode.');}else number(v,...bounds[k],`${name} ${k}`);checked[name][k]=v;}
  }return partial?checked:mergeComposition(defaults,checked);
 }
 const result=normalizeFlexibleGroup(group,value,partial);if(group==='motif'&&Object.hasOwn(result,'id')&&result.id!=='none')throw Error('Template motifs must be none.');return result;
}
function mapOld(source,hasBackground,partial=false){
 const out=clone(source);
 if(source.composition)out.composition={...source.composition,...(Object.hasOwn(source.composition,'layout')?{layout:templateId(source.composition.layout)}:{})};
 if(source.cta)out.cta={...source.cta,...(Object.hasOwn(source.cta,'width')?{width:source.cta.width==='full'?'column':source.cta.width}:{})};
 if(!partial||source.motif)out.motif={...(source.motif??{}),id:'none'};
 if(!partial||source.details)out.details={...(source.details??{}),motif:'none',surface:'flat',underline:false};
 if(!partial||source.recipe!==undefined||source.layers?.background)out.layers={...source.layers,background:{...source.layers?.background,...(!partial||source.recipe!==undefined?{mode:source.recipe==='editorial'?'solid':hasBackground?'image':'solid'}:{})}};
 return out;
}
export function upgradePosterTemplate(options={},hasBackground=false){
 const old=normalizePoster(options);if(old.compilerVersion===4)return old;
 const flexible=upgradePosterFlexible(old),next=mapOld(flexible,hasBackground);
 if(flexible.formats)next.formats=Object.fromEntries(Object.entries(flexible.formats).map(([f,p])=>[f,mapOld(p,hasBackground,true)]));
 const upgraded=normalizePoster({...next,version:3,compilerVersion:4}),result=clone(upgraded);
 // Old generic foreground anchors are not meaningful in a different authored template.
 // Materialize each upgraded format, while preserving genuinely authored legacy poses.
 const fit=(o,f)=>{const t=o.layers.foreground;return t.x===.66&&t.y===.66?{...t,...(({x,y})=>({x,y}))(templateForegroundPlacement(o.composition.layout,f,o.composition.density))}:t;};
 result.layers.foreground=fit(upgraded,'square');result.formats={...result.formats};
 for(const f of formats){const o=resolvePoster(upgraded,f);if(f==='square'&&!upgraded.formats?.square)continue;result.formats[f]={...result.formats[f],layers:{...result.formats[f]?.layers,foreground:fit(o,f)}};}
 return normalizePoster(result);
}
function roleReset(typography){return Object.fromEntries(Object.entries(typography).map(([role,spec])=>[role,{...spec,size:null,lineHeight:null}]));}
export function templateForegroundPlacement(id,format='square',density='balanced') {
 const {visual:[x,y,w,h]}=templatePlan(id,format,density),height={square:1080,portrait:1350,story:1920,landscape:565.2}[format];
 return {x:(x+w/2)/1080,y:(y+h/2)/height,scale:1,rotation:0};
}
function selection(o,id,format='square'){const width=id==='bold-backdrop'?'poster':['image-lead','centered-announcement'].includes(id)?'fit':'column';return {composition:{...o.composition,layout:id},motif:{...o.motif,id:'none'},layers:{...o.layers,foreground:{...o.layers.foreground,...templateForegroundPlacement(id,format,o.composition.density)}},typography:roleReset(o.typography),scale:1,cta:{...o.cta,style:id==='bold-backdrop'?'strip':o.cta.style,width,align:id==='centered-announcement'?'center':'left',paddingX:24,paddingY:16},details:{...o.details,motif:'none',surface:'flat',underline:false}};}
export function setTemplateFormatGroup(poster,format,group,value){
 if(!formats.includes(format))throw Error('Choose a supported poster format.');
 const p=upgradePosterTemplate(poster),effective=resolvePoster(p,format);
 if(!Object.hasOwn(effective,group)||['version','compilerVersion','formats'].includes(group))throw Error('Choose a supported current-format group.');
 const resolved=plain(value)&&plain(effective[group])?mergeComposition(effective[group],value):clone(value);
 return normalizePoster({...p,formats:{...p.formats,[format]:{...p.formats?.[format],[group]:resolved}}});
}
export function applyTemplate(poster,id,format='square',allFormats=false,hasBackground=false){
 if(!TEMPLATES.some(t=>t.id===id))throw Error('Choose a supported template layout.');if(!formats.includes(format))throw Error('Choose a supported poster format.');
 const p=upgradePosterTemplate(poster,hasBackground),selected=selection(resolvePoster(p,format),id,format);
 if(!allFormats)return normalizePoster({...p,formats:{...p.formats,[format]:{...p.formats?.[format],...selected}}});
 const root=selection({...p,typography:p.typography,cta:p.cta},id),next={...p,...root};
 if(p.formats){next.formats={};for(const[f,overrides]of Object.entries(p.formats)){const q=clone(overrides);delete q.composition;delete q.motif;delete q.scale;if(q.typography)for(const spec of Object.values(q.typography)){delete spec.size;delete spec.lineHeight;}if(q.cta)for(const key of ['style','width','align','paddingX','paddingY'])delete q.cta[key];if(q.details)for(const key of ['surface','motif','underline'])delete q.details[key];const prune=value=>{for(const[key,v]of Object.entries(value)){if(plain(v)){prune(v);if(!Object.keys(v).length)delete value[key];}}};prune(q);if(Object.keys(q).length)next.formats[f]=q;}}
 next.formats??={};
 for(const f of ['portrait','story','landscape']){const q=next.formats[f]??{};next.formats[f]={...q,layers:{...q.layers,foreground:{...q.layers?.foreground,...templateForegroundPlacement(id,f,next.composition.density)}}};}
 if(next.formats.square?.layers?.foreground)Object.assign(next.formats.square.layers.foreground,templateForegroundPlacement(id,'square',next.composition.density));
 return normalizePoster(next);
}
// An explicit, atomic current-format family choice. Never upgrades an old poster.
export function applyFontPairing(poster,id,format){
 const p=normalizePoster(poster);if(p.compilerVersion!==4)throw Error('Font pairings require compiler4.');
 if(!formats.includes(format))throw Error('Choose a supported poster format.');resolveFontPairing({fontPairing:id});
 const effective=resolvePoster(p,format),typography=Object.fromEntries(['headline','body','cta','kicker','brand'].map(role=>[role,{...effective.typography[role],fontId:'',weight:null}]));
 return normalizePoster({...p,formats:{...p.formats,[format]:{...p.formats?.[format],fontPairing:id,typography}}});
}
export function applyTemplateLookToFormats(poster,sourceFormat){
 const p=upgradePosterTemplate(poster);if(!formats.includes(sourceFormat))throw Error('Choose a supported poster format.');const result=clone(resolvePoster(p,sourceFormat));delete result.formats;
 const {layout,density}=result.composition,anchor=templateForegroundPlacement(layout,sourceFormat,density),t=result.layers.foreground;
 if(Object.entries(anchor).every(([key,value])=>t[key]===value)){
  result.layers.foreground={...t,...templateForegroundPlacement(layout,'square',density)};result.formats={};
  for(const f of ['portrait','story','landscape'])result.formats[f]={layers:{foreground:templateForegroundPlacement(layout,f,density)}};
 }
 return normalizePoster(result);
}
