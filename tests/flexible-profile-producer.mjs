// Real unsupplied-domain-factory proofs, shared by the full suite and isolated profile-only run.
import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {createState,applyCommand,addAsset} from '../model.js';
import {resolvePoster} from '../poster-model.js';
import {PROFILE_PRESETS,motifPlacementForLayout} from '../composition-model.js';
import {LAYOUT_RESOURCES} from '../src/layout-kernel-flex.js';
import {MOTIF_RESOURCES} from '../motif-resources.js';

const sha=b=>createHash('sha256').update(b).digest('hex'),formats=['square','portrait','story','landscape'];
const inputs=[
 {brand:'storin',layout:'lateral',headline:'Websites that\nmean business',body:'A clear message. An intentional presence.',cta:'Explore the possibilities'},
 {brand:'storin',layout:'broadside',headline:'Build a better\nfirst impression',body:'Brand, content, and web design working together.',cta:'Start a conversation'},
 {brand:'storin',layout:'specimen',headline:'Made to work\nbeautifully.',body:'A complete view, without cropping the original.',cta:'See the work'},
 {brand:'xelius',layout:'centered',headline:'AI Is Not a Strategy.\nOutcomes Are.',body:'Successful AI adoption starts with the right business problem, clear priorities, and measurable outcomes.',cta:'Explore our insights  //  www.xelius.org'},
 {brand:'xelius',layout:'spread',headline:'Choose the right\nAI problem.',body:'Successful AI adoption starts with the right business problem, clear priorities, and measurable outcomes.',cta:'Explore our insights'},
 {brand:'xelius',layout:'cover',headline:'Research-led\nroadmaps.',body:'A considered view of AI, teams, and business outcomes.',cta:'Read our perspective'}
];
async function digestFile(url){try{return sha(await readFile(url));}catch(e){if(e.code==='ENOENT')return null;throw e;}}

export async function produceProfileProofs({page,out}){
 const protectedNames=[...['storin','xelius'].flatMap(brand=>Object.keys(LAYOUT_RESOURCES).flatMap(layout=>formats.map(format=>`${brand}-${layout}-${format}.png`))),...Object.keys(MOTIF_RESOURCES).map(id=>id+'-preview.png'),'photo-transparent-text.png','storin-geometry-board.png','xelius-geometry-board.png','reviewed-native.png'];
 const protectedBefore=await Promise.all(protectedNames.map(async name=>({name,sha256:await digestFile(new URL(name,out))}))),records=[],changes=[];
 for(const input of [...inputs,...formats.slice(1).map(format=>({...inputs[3],format}))]){
  const format=input.format||'square',isStorin=input.brand==='storin',recipe=input.layout==='specimen'?'showcase':'editorial',profile=PROFILE_PRESETS.find(p=>p.id===(isStorin?'creative-modular':'research-editorial')).profile,ordinal=profile.layouts.indexOf(input.layout);
  const sourceCompany={name:isStorin?'Storin':'Xelius',color:isStorin?'#fbab3c':'#343a8a',brandKit:{voice:isStorin?'studio':'clean',ink:isStorin?'#171717':'#181a24',paper:isStorin?'#f7f5ef':'#f7f7f4',poster:{version:3,compilerVersion:3,recipe,voice:isStorin?'studio':'clean',treatment:'light',motif:{color:'primary'},details:{surface:'flat',text:''}}},compositionProfile:profile};
  // Crucially: no layout, motif x/y/scale/rotation, CTA, or per-post poster is injected here.
  assert.deepEqual(Object.keys(sourceCompany.brandKit.poster.motif),['color']);
  let n=0,state=createState();const command=(type,data)=>{const value=applyCommand(state,type,data,{id:()=>`factory-${input.brand}-${input.layout}-${format}-${++n}`,now:'2026-11-11T00:00:00.000Z'});state=value.state;return value;};
  const companyId=command('company.save',sourceCompany).id,productAssetId=recipe==='showcase'?'synthetic-existing-illustration':'';
  if(productAssetId)state=addAsset(state,{id:productAssetId,companyId,role:'product',name:'Existing synthetic illustration fixture — not authentic brand/product photography',bytes:1765932,mime:'image/png'});
  const creationPayload={companyId,headline:input.headline,body:input.body,cta:input.cta,format,assetIds:productAssetId?[productAssetId]:[]};assert.ok(!Object.hasOwn(creationPayload,'poster'));
  let postId;for(let cursor=0;cursor<=ordinal;cursor++)postId=command('post.save',creationPayload).id;
  const createdPost=state.posts.find(p=>p.id===postId),preview=command('design.snapshot',{postId}),scene=state.designs.find(d=>d.id===preview.id).scene,{company,post}=scene;
  assert.deepEqual(post.poster,createdPost.poster,'preview uses the actual unsupplied factory poster; selected image IDs are resolved by domain scene construction');
  assert.equal(post.poster.composition.layout,input.layout);assert.equal(post.poster.composition.profile.ordinal,ordinal);assert.equal(post.poster.motif.opacity,.15);assert.deepEqual(post.poster.cta,profile.cta);
  assert.equal(post.poster.voice,sourceCompany.brandKit.poster.voice);assert.equal(post.poster.treatment,'light');assert.equal(post.poster.motif.color,'primary');
  const placements={};for(const f of formats){const o=resolvePoster(post.poster,f),expected=motifPlacementForLayout(input.layout,f,profile.density);for(const field of ['x','y','scale','rotation'])assert.equal(o.motif[field],expected[field],`${input.brand} ${input.layout} ${f} ${field}: generated factory placement`);placements[f]={...expected};assert.equal(o.motif.opacity,.15);assert.equal(o.composition.layout,input.layout);assert.deepEqual(o.cta,profile.cta);}
  const name=`profile-${input.brand}-${input.layout}-${format}`,before=await digestFile(new URL(name+'.png',out));
  const r=await page.evaluate(async({company,post})=>{const canvas=document.createElement('canvas'),result=await window.flex.compose(canvas,{company,post,product:post.productAssetId?window.flex.photo:undefined});return {result,post,company,png:canvas.toDataURL()};},{company,post}),bytes=Buffer.from(r.png.split(',')[1],'base64'),after=sha(bytes);delete r.png;
  assert.deepEqual(r.result.errors,[],name);assert.equal(r.result.manifest.motif.opacity,.15);assert.deepEqual(r.result.manifest.cta.style,profile.cta.style);
  assert.equal(r.result.manifest.options.voice,sourceCompany.brandKit.poster.voice);assert.deepEqual(r.result.manifest.options.typography,company.brandKit.poster.typography,'actual company template font styles inherit without per-post substitutions');assert.deepEqual(r.result.manifest.options.textColors,company.brandKit.poster.textColors);
  const saved=command('design.snapshot',{postId,renderReceipt:{manifest:r.result.manifest,pngSha256:after}});command('design.review',{id:saved.id,reviewed:true});command('post.status',{id:postId,status:'exported',designId:saved.id,pngSha256:after});assert.equal(state.posts.find(p=>p.id===postId).status,'exported');
  const factoryProof={posterOmittedFromCreation:true,motifPlacementOmittedFromSourceCompany:true,creationPayload,sourceCompany,ordinal,placements,receiptBound:true};
  await writeFile(new URL(name+'.png',out),bytes);await writeFile(new URL(name+'.json',out),JSON.stringify({...r,factoryProof,pngSha256:after},null,2));
  changes.push({name:name+'.png',before,after,changed:before!==after});records.push({name,...input,format,...r,factoryProof,pngSha256:after});
 }
 await writeFile(new URL('profile-proofs.json',out),JSON.stringify({scope:'Nine real unsupplied post.save factory proofs: actual saved company profile and inherited source art direction. No manual layout or motif placement injection. Supplied palettes; synthetic specimen illustration is not authentic company/product photography.',records},null,2));
 for(const brand of ['storin','xelius']){
  const images=await Promise.all(records.filter(r=>r.brand===brand&&r.format==='square').map(async r=>({name:r.layout,png:'data:image/png;base64,'+(await readFile(new URL(r.name+'.png',out))).toString('base64')})));
  const board=await page.evaluate(async({brand,images})=>{const c=document.createElement('canvas');c.width=1800;c.height=770;const x=c.getContext('2d');x.fillStyle='#e9e9ec';x.fillRect(0,0,c.width,c.height);x.fillStyle='#171721';x.font='600 32px sans-serif';x.fillText(brand==='storin'?'Storin Digital — creative modular':'Xelius — research editorial',32,48);x.font='18px sans-serif';x.fillText('Actual supplied palette · three recommended families · native compiler 3 · synthetic specimen image, not authentic photography',32,82);for(let i=0;i<images.length;i++){const img=new Image();img.src=images[i].png;await img.decode();x.drawImage(img,24+i*594,116,564,564);x.fillStyle='#252532';x.font='20px sans-serif';x.fillText(images[i].name,24+i*594,718);}return c.toDataURL();},{brand,images});
  const name=brand+'-brandboard.png',before=await digestFile(new URL(name,out)),bytes=Buffer.from(board.split(',')[1],'base64'),after=sha(bytes);await writeFile(new URL(name,out),bytes);changes.push({name,before,after,changed:before!==after});
 }
 const protectedAfter=await Promise.all(protectedNames.map(async name=>({name,sha256:await digestFile(new URL(name,out))})));assert.deepEqual(protectedAfter,protectedBefore,'The original 48 matrix, SVG previews, photo acceptance proof and technical boards must not be changed or recaptured by profile-only production.');
 await writeFile(new URL('profile-factory-parity.json',out),JSON.stringify({factoryOnly:true,profileCases:records.length,allActualDomainReceiptsAccepted:true,manualPlacementInjected:false,changes,changedPngs:changes.filter(c=>c.changed).map(c=>c.name),protectedPngsUnchanged:protectedAfter},null,2));
 return records;
}
