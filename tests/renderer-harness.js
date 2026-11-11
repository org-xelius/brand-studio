import {compose,FORMATS} from '../src/compositor.js';
const existingBackground=__LEGACY_BACKGROUND__;
const syntheticScreen='data:image/svg+xml,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="850" viewBox="0 0 1400 850"><rect width="1400" height="850" fill="#e7eef4"/><rect width="1400" height="100" fill="#102739"/><text x="65" y="66" fill="white" font-family="sans-serif" font-size="32">SYNTHETIC SCREEN — RENDERER FIXTURE</text><rect x="65" y="170" width="600" height="610" fill="#c5d7e2"/><circle cx="365" cy="470" r="170" fill="#f4652b"/><path d="M260 560 L365 350 L470 560Z" fill="#102739"/><text x="730" y="250" font-family="sans-serif" font-size="50" fill="#102739">Layout specimen</text><text x="730" y="320" font-family="sans-serif" font-size="27" fill="#102739">Not a customer website or product.</text><path d="M730 390H1280 M730 430H1220 M730 470H1260" stroke="#788f9f" stroke-width="12"/><rect x="730" y="560" width="220" height="70" fill="#f4652b"/><text x="730" y="740" font-family="sans-serif" font-size="25" fill="#102739">Original image stays complete.</text></svg>`);
const company={id:'proof-company',name:'Storin',color:'#f4652b',brandKit:{voice:'studio',ink:'#171717',paper:'#f7f5ef'}};
const all=[];
window.__posterProofs=all;
window.__compose=compose;
window.__fixture={company,background:existingBackground,product:syntheticScreen};
for(const recipe of ['hero','showcase','editorial'])for(const format of Object.keys(FORMATS)){
 const section=document.createElement('section');section.className='proof';
 const title=document.createElement('h2');title.textContent=recipe+' / '+format;section.append(title);
 const canvas=document.createElement('canvas');canvas.dataset.recipe=recipe;canvas.dataset.format=format;section.append(canvas);
 const note=document.createElement('p');note.textContent=recipe==='hero'?'Reused existing generated Storin image; not a real customer endorsement.':recipe==='showcase'?'Synthetic screen fixture. Replace with your original screenshot.':'Typography specimen. Approved-reference headline; neutral fixture information.';section.append(note);
 document.querySelector('main').append(section);
 const headline=recipe==='editorial'?'Make every\nword count.':'Websites That\nMean Business';
 const body=recipe==='editorial'?'Start with one message.\nGive the important words room.\nKeep the next action clear.':recipe==='showcase'?'An original screen.\nA clearer point of view.':'A clear message.\nAn intentional presence.';
 const post={title:headline,headline,body,cta:'Explore the possibilities',format,poster:{version:2,recipe,voice:recipe==='editorial'?'impact':recipe==='showcase'?'clean':'studio',treatment:recipe==='editorial'?'dark':recipe==='showcase'?'light':'brand',emphasis:recipe==='editorial'?'word count.':'Mean Business',scale:1,heroScale:1}};
 const resources={company,post,...(recipe==='hero'?{background:existingBackground}:recipe==='showcase'?{product:syntheticScreen}:{})};
 const result=await compose(canvas,resources);all.push({recipe,format,...result});console.info('poster proof',recipe,format,result.errors);
 const status=document.createElement('pre');status.textContent=JSON.stringify({errors:result.errors,warnings:result.warnings},null,2);section.append(status);
}
window.__posterProofsReady=true;
