import {compose,FORMATS} from '../src/compositor.js';
import {renderPoster} from '../src/poster-renderer.js';
import {resolvePoster} from '../poster-model.js';
const background=__LEGACY_BACKGROUND__;
const foreground=__LEGACY_FOREGROUND__;
import anton from './fixtures/anton-400.ttf';
import metadata from './fixtures/anton-metadata.json';
import v2Baseline from './fixtures/v2-hero-square-baseline.png';
const company={id:'proof-company',name:'Storin',color:'#f4652b',brandKit:{ink:'#171717',paper:'#f7f5ef'}};
const product='data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="850"><rect width="1400" height="850" fill="#f7f5ef"/><rect width="1400" height="100" fill="#171717"/><text x="60" y="65" fill="white" font-size="32">SYNTHETIC SCREEN — NOT CUSTOMER WORK</text><circle cx="350" cy="470" r="220" fill="#f4652b"/><path d="M720 220H1300M720 280H1200M720 340H1260M720 510H1200M720 570H1200" stroke="#171717" stroke-width="22"/></svg>');
const getFont=async()=>({...metadata.faces[0],dataUrl:anton});
const base={version:3,voice:'studio',details:{motif:'ribbon',surface:'tonal',strength:.5,action:'capsule'},typography:{headline:{fontId:metadata.id,weight:400}},layers:{background:{opacity:.08,blur:12},foreground:{x:.69,y:.66,scale:.9}}};
const makePost=(recipe='hero',format='square')=>({headline:recipe==='editorial'?'Make every\nword count.':'Websites That\nMean Business',body:recipe==='editorial'?'Start with one message.\nGive important words room.\nKeep the next action clear.':'A clear message.\nAn intentional presence.',cta:'Explore the possibilities',format,backgroundAssetId:recipe==='editorial'?'':'fixture-background',foregroundAssetId:recipe==='hero'?'fixture-foreground':'',productAssetId:recipe==='showcase'?'fixture-screen':'',poster:{...base,recipe,...(recipe==='editorial'?{treatment:'dark',details:{motif:'orbit',strength:.25,action:'text'},typography:{headline:{fontId:metadata.id,weight:400}}}:{})}});
const make=()=>document.createElement('canvas');
async function render(post=makePost(),extra={}){const canvas=make();const result=await compose(canvas,{company,post,fonts:[metadata],getFont,...extra});return {canvas,result};}
window.__v3={compose,render,renderPoster,company,makePost,base,background,foreground,product,metadata,anton,getFont,resolvePoster,v2Baseline};
// Cold paired v2 baseline: same resources before/after first v3 font/layer render.
const oldPost={headline:'Websites That\nMean Business',body:'A clear message.\nAn intentional presence.',cta:'Explore the possibilities',format:'square',poster:{version:2,recipe:'hero',voice:'studio',treatment:'brand',emphasis:'Mean Business',scale:1,heroScale:1}};
const oldBefore=make();await renderPoster(oldBefore,{company,post:oldPost,background});const oldBeforePNG=oldBefore.toDataURL();
window.__proofs=[];
for(const recipe of ['hero','showcase','editorial'])for(const format of Object.keys(FORMATS)){
 const section=document.createElement('section'),heading=document.createElement('h2');heading.textContent=recipe+' / '+format;section.append(heading);
 const post=makePost(recipe,format);const resources=recipe==='hero'?{background,foreground}:recipe==='showcase'?{background,product}:{};
 const {canvas,result}=await render(post,resources);if(recipe==='hero'&&format==='square'){const oldAfter=make();await compose(oldAfter,{company,post:oldPost,background});window.__v2ColdParity=oldBeforePNG===oldAfter.toDataURL();}canvas.dataset.proof=recipe+'-'+format;section.append(canvas);
 const note=document.createElement('p');note.textContent=recipe==='hero'?'TEST-DERIVED ILLUSTRATION: manually polygon-masked existing generated person + laptop. Not an authentic brand cutout or endorsement.':recipe==='showcase'?'Synthetic screenshot, not original customer work.':'Typesetting specimen. Storin is plain company text, not the missing authentic logo.';section.append(note);document.querySelector('main').append(section);
 window.__proofs.push({recipe,format,...result});
}
window.__ready=true;
