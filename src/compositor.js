import {renderPoster} from './poster-renderer.js';
import {renderPosterV3} from './poster-renderer-v3.js';
import {renderPosterCrisp} from './poster-renderer-crisp.js';
import {renderPosterFlexible} from './poster-renderer-flex.js';
import {renderPosterTemplate} from './poster-renderer-template.js';
export {RECIPES, VOICES} from './poster-renderer.js';
export const FORMATS = {square:{label:'Square feed',w:1080,h:1080,ratio:'1:1'},portrait:{label:'Portrait feed',w:1080,h:1350,ratio:'4:5'},story:{label:'Story / reel cover',w:1080,h:1920,ratio:'9:16'},landscape:{label:'Landscape',w:1200,h:628,ratio:'1.91:1'}};
export const DIRECTIONS = [{id:'spotlight',name:'Product spotlight',description:'A clear focal image, with a short message beside it.'},{id:'offer',name:'Message first',description:'Lead with your headline. Let the image support it.'},{id:'lifestyle',name:'Scene setter',description:'A generous scene, with a simple caption panel.'}];
const image = src => new Promise((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=()=>reject(new Error('This image could not be opened. Try another PNG or JPEG.'));i.src=src;});
function cover(ctx,img,x,y,w,h,crop=.5){const scale=Math.max(w/img.width,h/img.height),sw=w/scale,sh=h/scale;ctx.drawImage(img,Math.max(0,(img.width-sw)*crop),Math.max(0,(img.height-sh)*.5),sw,sh,x,y,w,h);}
function contain(ctx,img,x,y,w,h){const s=Math.min(w/img.width,h/img.height);ctx.drawImage(img,x+(w-img.width*s)/2,y+(h-img.height*s)/2,img.width*s,img.height*s);}
// One token namespace across compiler transitions: a slow legacy font/image cannot
// overwrite a completed template preview (or vice versa). Frozen kernels stay untouched.
const composeTokens=new WeakMap();
export async function compose(canvas,resources){
 const token=Symbol('composition');composeTokens.set(canvas,token);
 const staging=canvas.ownerDocument.createElement('canvas'),result=await composeInternal(staging,resources);
 if(composeTokens.get(canvas)!==token)return {...result,stale:true,errors:[...(result.errors||[]),'A newer composition replaced this drawing. Wait for the current preview.']};
 canvas.width=staging.width;canvas.height=staging.height;canvas.getContext('2d').drawImage(staging,0,0);return result;
}
async function composeInternal(canvas,{company,post,design,background,logo,product,foreground,fonts,getFont}){
 if(post.poster?.version===3&&post.poster.compilerVersion===4)return renderPosterTemplate(canvas,{company,post,design,background,logo,product,foreground,fonts,getFont});
 if(post.poster?.version===3&&post.poster.compilerVersion===3)return renderPosterFlexible(canvas,{company,post,design,background,logo,product,foreground,fonts,getFont});
 if(post.poster?.version===3&&post.poster.compilerVersion===2)return renderPosterCrisp(canvas,{company,post,design,background,logo,product,foreground,fonts,getFont});
 if(post.poster?.version===3)return renderPosterV3(canvas,{company,post,design,background,logo,product,foreground,fonts,getFont});
 if(post.poster?.version===2)return renderPoster(canvas,{company,post,design,background,logo,product});
 const f=FORMATS[post.format]||FORMATS.square;canvas.width=f.w;canvas.height=f.h;const c=canvas.getContext('2d'),w=f.w,h=f.h,p=w*.065; const color=/^#[0-9a-f]{6}$/i.test(company.color)?company.color:'#17694e';
 c.fillStyle='#eef1ee';c.fillRect(0,0,w,h);const errors=[];let bg=null;
 if(background)bg=await image(background);
 const direction=post.direction||'spotlight';let imageBox;
 if(direction==='lifestyle'){imageBox=[0,0,w,h*.65];c.fillStyle='#ffffff';c.fillRect(0,h*.65,w,h*.35);}
 else if(direction==='offer'){imageBox=[w*.52,0,w*.48,h];c.fillStyle='#ffffff';c.fillRect(0,0,w*.52,h);}
 else {imageBox=[0,h*.39,w,h*.61];c.fillStyle='#ffffff';c.fillRect(0,0,w,h*.39);}
 if(bg)cover(c,bg,...imageBox,Number(post.cropX??.5));else {c.fillStyle='#e4eae6';c.fillRect(...imageBox);c.strokeStyle='#c1cec6';c.lineWidth=2;c.strokeRect(imageBox[0]+p,imageBox[1]+p,imageBox[2]-2*p,imageBox[3]-2*p);c.fillStyle='#586b60';c.font=`${w*.023}px -apple-system, BlinkMacSystemFont, sans-serif`;c.textAlign='center';c.fillText('Your image will appear here',imageBox[0]+imageBox[2]/2,imageBox[1]+imageBox[3]/2);c.textAlign='left';}
 if(product){const prod=await image(product);contain(c,prod,imageBox[0]+p,imageBox[1]+p,imageBox[2]-2*p,imageBox[3]-2*p);}
 let tx=p,ty=direction==='lifestyle'?h*.70:p,tw=direction==='offer'?w*.40:w-2*p;
 const areaBottom=direction==='lifestyle'?h-p:direction==='offer'?h-p:h*.39-p*.5;let y=ty;
 c.textBaseline='top';
 function text(value,size,weight,fill,maxLines,label){if(!value)return;c.font=`${weight} ${size}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;c.fillStyle=fill;const lines=[];for(const para of String(value).split('\n')){let line='';for(const word of para.split(/\s+/)){const test=line?line+' '+word:word;if(c.measureText(test).width>tw&&line){lines.push(line);line=word;}else line=test;}lines.push(line);}if(lines.length>maxLines||lines.some(l=>c.measureText(l).width>tw)||y+lines.length*size*1.17>areaBottom)errors.push(`${label} does not fit. Shorten it or choose another layout.`);for(const line of lines){c.fillText(line,tx,y);y+=size*1.17;}y+=size*.35;}
 text(post.headline||post.title,w*.052,700,'#152b22',3,'Headline');text(post.body,w*.026,400,'#384b42',3,'Supporting text');text(post.cta,w*.025,650,color,2,'Call to action');
 if(logo){const l=await image(logo);const lw=w*.14,lh=w*.065;const x=w-p-lw,ly=h-p-lh;c.fillStyle='#ffffff';c.fillRect(x-10,ly-10,lw+20,lh+20);contain(c,l,x,ly,lw,lh);}
 c.textBaseline='alphabetic';
 return {errors,width:w,height:h,generated:!!design};
}
export function downloadCanvas(canvas,name){const a=document.createElement('a');a.download=name.replace(/[^a-zA-Z0-9_.-]/g,'-')+'.png';a.href=canvas.toDataURL('image/png');a.click();}
