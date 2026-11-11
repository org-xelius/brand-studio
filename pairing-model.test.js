import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {brotliDecompressSync} from 'node:zlib';
import {buildSync} from 'esbuild';
import {FONT_PAIRINGS,resolveFontPairing,getRoleBundledFont} from './font-pairings.js';
import {normalizePoster,resolvePoster} from './poster-model.js';
import {applyFontPairing,applyTemplateLookToFormats} from './template-model.js';
import {createState,applyCommand} from './model.js';
import {templatePlan,templateFlowPlan,TEMPLATE_RESOURCES} from './src/layout-kernel-template.js';
import {inspectFont} from './font-service.js';
const roles=['headline','body','cta','kicker','brand'],formats=['square','portrait','story','landscape'];
const hash=b=>createHash('sha256').update(b).digest('hex');
const p4=(more={})=>normalizePoster({version:3,compilerVersion:4,...more});
test('six immutable pairings retain original three faces and define actual700 new defaults',()=>{
 assert.deepEqual(FONT_PAIRINGS.map(p=>p.id),['studio','impact','clean','editorial-serif','geometric-modern','tall-editorial']);
 for(const p of FONT_PAIRINGS){assert.ok(Object.isFrozen(p));assert.equal(getRoleBundledFont({fontPairing:p.id},'headline').defaultWeight,['studio','impact','clean'].includes(p.id)?800:700);for(const role of roles.slice(1))assert.equal(getRoleBundledFont({fontPairing:p.id},role).defaultWeight,role==='body'?400:600);}
 assert.equal(resolveFontPairing({voice:'clean'}).id,'clean');assert.equal(resolveFontPairing({voice:'impact',fontPairing:'editorial-serif'}).id,'editorial-serif');assert.throws(()=>resolveFontPairing({fontPairing:undefined}));assert.throws(()=>getRoleBundledFont({},'invented'));
});
test('optional compiler4 scalar stays absent, normalized historical4 bytes stay exact, and compiler1–3 reject it',()=>{
 const pins={studio:'54b0f1f8c0fb4c4db75fcdae35f6b421376f796c74bbb8d95f2334d9737e0830',impact:'31c5d9ede903c0334efa991ca3a171d3996a62814483b0cef7bbd3af9d962274',clean:'430fb522e62b8b10965a3412905a68ee8809900d3e96e76bfb8f1d879ca2a288'};
 for(const[voice,pin]of Object.entries(pins)){const p=p4({voice,formats:{portrait:{scale:1.05}}});assert.ok(!Object.hasOwn(p,'fontPairing'));assert.ok(!Object.hasOwn(p.formats.portrait,'fontPairing'));assert.equal(hash(JSON.stringify(p4({voice}))),pin);}
 for(const p of [{version:2},{version:3},{version:3,compilerVersion:2},{version:3,compilerVersion:3}])for(const extra of [{fontPairing:'clean'},{formats:{portrait:{fontPairing:'clean'}}}])assert.throws(()=>normalizePoster({...p,...extra}),/fontPairing/);
 for(const value of [undefined,null,'',false,1,{},[],'unknown'])for(const extra of [{fontPairing:value},{formats:{portrait:{fontPairing:value}}}])assert.throws(()=>p4(extra),/pairing/i);
});
test('pairings resolve root/partial ratio overrides without supplying defaults in other ratios',()=>{
 const p=p4({fontPairing:'editorial-serif',formats:{portrait:{fontPairing:'geometric-modern'},story:{scale:1.1}}});
 assert.equal(resolvePoster(p,'portrait').fontPairing,'geometric-modern');assert.equal(resolvePoster(p,'square').fontPairing,'editorial-serif');assert.equal(resolvePoster(p,'story').fontPairing,'editorial-serif');assert.ok(!Object.hasOwn(p.formats.story,'fontPairing'));
 assert.equal(resolvePoster(applyTemplateLookToFormats(p,'portrait'),'landscape').fontPairing,'geometric-modern');
});
test('atomic pairing application clears all5 selected fonts/weights only in target format and preserves authored detail',()=>{
 const typography=Object.fromEntries(roles.map((role,i)=>[role,{fontId:`owned-${role}`,weight:600,size:role==='headline'?96:30,lineHeight:1.2,tracking:i*.01}]));
 const p=p4({voice:'clean',typography,scale:1.1,heroScale:1.15,cropX:.3,layers:{background:{mode:'image',opacity:.42},foreground:{x:.2,opacity:.7}},textColors:{body:'paper'},formats:{portrait:{typography:{headline:{size:120}},fontPairing:'clean'},story:{fontPairing:'impact',layers:{product:{opacity:.5}}}}});
 const before=JSON.stringify(p),next=applyFontPairing(p,'geometric-modern','portrait'),effective=resolvePoster(next,'portrait'),original=resolvePoster(p,'portrait');assert.equal(JSON.stringify(p),before);assert.equal(next.formats.portrait.fontPairing,'geometric-modern');
 for(const role of roles){assert.equal(effective.typography[role].fontId,'');assert.equal(effective.typography[role].weight,null);for(const key of ['size','lineHeight','tracking'])assert.equal(effective.typography[role][key],original.typography[role][key]);}
 for(const f of formats.filter(f=>f!=='portrait')){const a=resolvePoster(next,f),b=resolvePoster(p,f);delete a.formats;delete b.formats;assert.deepEqual(a,b);}
 for(const k of ['layers','cta','textColors','heroScale','cropX','scale','voice'])assert.deepEqual(effective[k],original[k]);
 for(const p of [{version:2},{version:3},{version:3,compilerVersion:3}])assert.throws(()=>applyFontPairing(p,'clean','square'),/compiler4/);
 assert.throws(()=>applyFontPairing(p4(),'clean','unknown'));assert.throws(()=>applyFontPairing(p4(),'unknown','square'));
});
// Extract actual fvar axes from pinned WOFF2 tables (not CSS or guessed family names).
function axes(bytes){
 const tags='cmap head hhea hmtx maxp name OS/2 post cvt_ fpgm glyf loca prep CFF_ VORG EBDT EBLC gasp hdmx kern LTSH PCLT VDMX vhea vmtx BASE GDEF GPOS GSUB EBSC JSTF MATH CBDT CBLC COLR CPAL SVG_ sbix acnt avar bdat bloc bsln cvar fdsc feat fmtx fvar gvar hsty just lcar mort morx opbd prop trak Zapf Silf Glat Gloc Feat Sill'.split(' ').map(x=>x.replace(/_/g,' '));
 let at=48,offset=0;const tables={};const size=()=>{let n=0;for(let i=0;i<5;i++){const b=bytes[at++];n=n*128+(b&127);if(!(b&128))return n;}throw Error('bad size');};
 for(let i=0;i<bytes.readUInt16BE(12);i++){const flags=bytes[at++],index=flags&63,version=flags>>6;let tag=tags[index];if(index===63){tag=bytes.toString('ascii',at,at+4);at+=4;}let length=size();if(((tag==='glyf'||tag==='loca')&&version===0)||(!['glyf','loca'].includes(tag)&&version!==0))length=size();tables[tag]=[offset,length];offset+=length;}
 if(!tables.fvar)return null;const raw=brotliDecompressSync(bytes.subarray(at,at+bytes.readUInt32BE(20))),[start,length]=tables.fvar,fvar=raw.subarray(start,start+length),result={};for(let i=0;i<fvar.readUInt16BE(8);i++){const p=fvar.readUInt16BE(4)+i*fvar.readUInt16BE(10);result[fvar.toString('ascii',p,p+4)]=[fvar.readInt32BE(p+4)/65536,fvar.readInt32BE(p+12)/65536];}return result;
}
test('every registry file has exact bytes, actual cmap and actual supported axis bounds with OFL provenance',()=>{
 const files=new Map();for(const p of FONT_PAIRINGS)for(const f of [p.headline,p.body])files.set(f.file,f);
 for(const[file,entry]of files){const bytes=fs.readFileSync(new URL(`./assets/fonts/${file}`,import.meta.url));assert.equal(hash(bytes),entry.sha256);const actual=inspectFont(bytes).coverage;if(entry.legacyId){for(const[start,end]of entry.coverage)for(let cp=start;cp<=end;cp++)assert.ok(actual.some(([a,b])=>cp>=a&&cp<=b),'Existing passport cannot overclaim actual cmap');}else assert.deepEqual(actual,entry.coverage);const a=axes(bytes);if(a)assert.deepEqual(a.wght,entry.range);else assert.deepEqual(entry.range,[800,800]);}
 const provenance=JSON.parse(fs.readFileSync(new URL('./assets/fonts/template-pairings-provenance.json',import.meta.url)));assert.equal(provenance.fonts.length,4);for(const f of provenance.fonts){const text=fs.readFileSync(new URL(`./assets/fonts/${f.licenseFile}`,import.meta.url),'utf8');assert.match(text,/SIL OPEN FONT LICENSE/i);assert.equal(hash(text),f.licenseSha256);assert.match(f.source,/@5\.3\.0/);}
});
const bundled=buildSync({entryPoints:['src/fonts-template.js'],bundle:true,write:false,format:'esm',platform:'browser',loader:{'.woff2':'dataurl'}}).outputFiles[0].text;
const loader=await import('data:text/javascript;base64,'+Buffer.from(bundled).toString('base64'));
class LocalFace{constructor(family,bytes,options){this.family=family;this.bytes=bytes;this.options=options;this.status='unloaded';}async load(){this.status='loaded';return this;}}
const doc=()=>({fonts:new Set()});
test('local loader resolves six actual families/defaults without network or silent800 fallback',async()=>{
 const previous=globalThis.FontFace;globalThis.FontFace=LocalFace;try{for(const p of FONT_PAIRINGS){const fonts=await loader.loadTemplateRoleFonts({fontPairing:p.id,doc:doc()});for(const role of roles){const expected=getRoleBundledFont({fontPairing:p.id},role);assert.equal(fonts[role].file,expected.file);assert.equal(fonts[role].sha256,expected.sha256);assert.equal(fonts[role].weight,expected.defaultWeight);}if(!['studio','impact','clean'].includes(p.id))await assert.rejects(()=>loader.loadTemplateRoleFonts({fontPairing:p.id,typography:{headline:{weight:800}},doc:doc()}),/support/);}}finally{globalThis.FontFace=previous;}
});
test('imported local loader verifies company, exact weight, digest, bytes and saved cmap',async()=>{
 const previous=globalThis.FontFace;globalThis.FontFace=LocalFace;const bytes=fs.readFileSync(new URL('./assets/fonts/lora-latin-wght-normal.woff2',import.meta.url)),meta=inspectFont(bytes),face={weight:700,style:'normal',assetId:'owned700',...meta},record={id:'owned',companyId:'company',family:'Owned Lora',source:'curated',license:'SIL OFL 1.1',faces:[face]},cached={...face,dataUrl:'data:font/woff2;base64,'+bytes.toString('base64')},args={fontPairing:'editorial-serif',typography:{headline:{fontId:'owned'}},fonts:[record],companyId:'company',getFont:async()=>cached,doc:doc()};
 try{assert.equal((await loader.loadTemplateRoleFonts(args)).headline.weight,700);await assert.rejects(()=>loader.loadTemplateRoleFonts({...args,companyId:'foreign',doc:doc()}),/company/);for(const patch of [{weight:600},{sha256:'a'.repeat(64)},{coverage:[[32,126]]},{dataUrl:cached.dataUrl.slice(0,-4)+'AAAA'}])await assert.rejects(()=>loader.loadTemplateRoleFonts({...args,getFont:async()=>({...cached,...patch}),doc:doc()}));}finally{globalThis.FontFace=previous;}
});
let serial=0;const config={now:'2026-11-11T12:00:00Z',id:()=>`pairing-${++serial}`},cmd=(state,type,data)=>applyCommand(state,type,data,config);
function fixture(id){const c=cmd(createState(),'company.save',{name:'Known',color:'#171717',description:'Known',guidelines:'Known'});return cmd(c.state,'post.save',{companyId:c.id,title:'Exact',headline:'Exact',body:'Body',cta:'Visit',poster:p4({fontPairing:id})});}
function receipt(state){const p=state.posts[0],o=resolvePoster(p.poster,p.format),plan=templatePlan(o.composition.layout,p.format),fonts=Object.fromEntries(roles.map(role=>{const f=getRoleBundledFont(o,role);return[role,{fontId:null,assetId:null,file:f.file,sha256:f.sha256,weight:o.typography[role].weight??f.defaultWeight,style:'normal',size:o.typography[role].size??({headline:plan.headlineSize,body:plan.bodySize,cta:plan.ctaSize,kicker:22,brand:28}[role]),lineHeight:o.typography[role].lineHeight??(role==='headline'?plan.leading:role==='body'?1.3:1.15),tracking:0}];}));
 const ch=fonts.cta.size*fonts.cta.lineHeight+2*o.cta.paddingY,flow=templateFlowPlan(plan,{headlineHeight:fonts.headline.size*fonts.headline.lineHeight,bodyHeight:fonts.body.size*fonts.body.lineHeight,hasBody:true,ctaHeight:ch,ctaWidth:o.cta.width}),b=plan.posterCta,textBox=[b[0]+o.cta.paddingX,flow.ctaY+o.cta.paddingY,b[2]-2*o.cta.paddingX-40,ch-2*o.cta.paddingY],shape=[b[0],flow.ctaY,b[2],ch],layer=(role,text,box)=>({role,text,lines:[text],size:fonts[role].size,lineHeight:fonts[role].lineHeight,box});
 return{pngSha256:'f'.repeat(64),manifest:{rendererVersion:3,compilerVersion:4,format:p.format,copy:{headline:p.headline,body:p.body,cta:p.cta,kicker:''},options:o,fonts,layers:[layer('headline',p.headline,plan.title),layer('body',p.body,[plan.body[0],flow.bodyY,plan.body[2],plan.body[3]]),layer('cta',p.cta,textBox),layer('brand',state.companies[0].name,plan.brand),{role:'action',style:o.cta.style,fill:'#171717',box:shape}],assets:[],assetReferences:{backgroundAssetId:'',foregroundAssetId:'',productAssetId:'',logoAssetId:''},layout:structuredClone(TEMPLATE_RESOURCES[o.composition.layout]),motif:{id:'none',version:1,sha256:null,viewBox:null,opacity:o.motif.opacity,transform:{x:o.motif.x,y:o.motif.y,scale:o.motif.scale,rotation:o.motif.rotation},painted:false},cta:{style:o.cta.style,width:o.cta.width,align:o.cta.align,arrow:o.cta.arrow,painted:true,fill:'#171717',text:'#f7f5ef',shapeBounds:shape,textBounds:textBox},protection:{textRendering:'fill-only',nonCtaBackground:'none',textBlocks:[],foregroundExclusions:[],contrast:{method:'opaque-glyph-interior',minimum:4.5,roles:['headline','body','cta','brand'].map(role=>({role,color:'#f7f5ef',minimum:5,samples:100,passed:true}))}}}};
}
test('compiler4 receipts bind exact pairing files/digests/default700 and all role weights',()=>{
 for(const {id}of FONT_PAIRINGS){const made=fixture(id),r=receipt(made.state);assert.doesNotThrow(()=>cmd(made.state,'design.snapshot',{postId:made.id,renderReceipt:r}));for(const patch of [m=>m.fonts.headline.file='archivo-latin-wght-normal.woff2',m=>m.fonts.headline.sha256='a'.repeat(64),m=>m.fonts.body.weight=600,m=>m.fonts.cta.weight=400,m=>m.options.fontPairing='studio']){const bad=structuredClone(r);patch(bad.manifest);if(JSON.stringify(bad)!==JSON.stringify(r))assert.throws(()=>cmd(made.state,'design.snapshot',{postId:made.id,renderReceipt:bad}));}if(!['studio','impact','clean'].includes(id)){const bad=structuredClone(r);bad.manifest.fonts.headline.weight=800;assert.throws(()=>cmd(made.state,'design.snapshot',{postId:made.id,renderReceipt:bad}));}}
});
