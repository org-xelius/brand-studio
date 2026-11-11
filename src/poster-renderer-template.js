// Compiler4 only: template-owned geometry, literal independent images, fill-only glyphs.
import {resolvePoster} from '../poster-model.js';
import {contrast} from './poster-renderer.js';
import {resolveCrispPalette} from './poster-renderer-crisp.js';
import {loadRoleFonts,unsupportedGlyphs} from './fonts-v3.js';
import {loadTemplateRoleFonts} from './fonts-template.js';
import {TEMPLATE_RESOURCES,templatePlan,templateFlowPlan} from './layout-kernel-template.js';

const dimensions={square:[1080,1080],portrait:[1080,1350],story:[1080,1920],landscape:[1200,628]};
const tokens=new WeakMap();
const intersects=(a,b)=>a[0]<b[0]+b[2]&&a[0]+a[2]>b[0]&&a[1]<b[1]+b[3]&&a[1]+a[3]>b[1];
const newCanvas=(doc,w,h)=>{const c=doc.createElement('canvas');c.width=w;c.height=h;return c;};
function setFont(c,s){c.font=`${s.weight} ${s.size}px "${s.canvasFamily}"`;c.fontKerning='normal';c.textBaseline='top';c.textAlign='left';c.letterSpacing=`${s.tracking*s.size}px`;}
function wrap(c,value,width,s,keepPhone=false){setFont(c,s);const lines=[];for(const paragraph of String(value).split('\n')){let text=paragraph.trim();if(keepPhone)text=text.replace(/\+?\d(?:[\d \u00a0-]{4,}\d)/g,run=>run.replace(/ /g,'\u00a0'));let line='';for(const word of text.split(/ +/)){const next=line?line+' '+word:word;if(line&&c.measureText(next).width>width){lines.push(line);line=word;}else line=next;}lines.push(line);}return lines;}
async function image(src,role,errors){if(!src)return null;try{if(typeof src!=='string'||!/^data:image\/(png|jpeg|webp|svg\+xml)[;,]/.test(src))throw Error('Only local image data is allowed.');return await new Promise((resolve,reject)=>{const img=new Image(),timer=setTimeout(()=>reject(Error('Image timeout.')),12000);img.onload=()=>{clearTimeout(timer);img.naturalWidth?resolve(img):reject(Error('Empty image.'));};img.onerror=()=>{clearTimeout(timer);reject(Error('Invalid image.'));};img.src=src;});}catch(e){errors.push(`${role}: selected local image could not be opened. ${e.message}`);return null;}}
function contain(c,img,box){const [x,y,w,h]=box,s=Math.min(w/img.width,h/img.height),placed=[x+(w-img.width*s)/2,y+(h-img.height*s)/2,img.width*s,img.height*s];c.drawImage(img,...placed);return placed;}
function paintText(c,t){setFont(c,t);c.fillStyle=t.color||'#ffffff';for(let i=0;i<t.lines.length;i++)c.fillText(t.lines[i],t.positions[i][0],t.positions[i][1]);}
function lum(r,g,b){const f=x=>{x/=255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4;};return .2126*f(r)+.7152*f(g)+.0722*f(b);}
function colourLum(hex){return lum(...hex.slice(1).match(/../g).map(s=>parseInt(s,16)));}
const ratio=(a,b)=>(Math.max(a,b)+.05)/(Math.min(a,b)+.05);
function shape(c,style,box){const [x,y,w,h]=box;c.beginPath();if(style==='rounded'||style==='pill')c.roundRect(x,y,w,h,style==='pill'?h/2:Math.min(18,h/4));else if(style==='outline')c.rect(x+1,y+1,Math.max(0,w-2),Math.max(0,h-2));else c.rect(x,y,w,h);}

// The private bitmap publishes atomically; a slow old font/image can never replace new art.
export async function renderPosterTemplate(target,resources){
 const token=Symbol('poster-compiler-4');tokens.set(target,token);const staging=target.ownerDocument.createElement('canvas'),result=await paint(staging,resources);
 if(tokens.get(target)!==token)return {...result,stale:true,errors:[...result.errors,'A newer render replaced this drawing. Wait for the current preview.']};
 target.width=staging.width;target.height=staging.height;target.getContext('2d').drawImage(staging,0,0);return result;
}
async function paint(canvas,{company={},post={},design,background,logo,product,foreground,fonts=[],getFont}={}){
 const format=dimensions[post.format]?post.format:'square',[width,height]=dimensions[format],unit=width/1080,h=height/unit,doc=canvas.ownerDocument;
 canvas.width=width;canvas.height=height;const c=canvas.getContext('2d',{willReadFrequently:true}),errors=[],warnings=[],assets=[],layers=[],hitRegions=[];
 const refs={backgroundAssetId:post.backgroundAssetId||'',foregroundAssetId:post.foregroundAssetId||'',logoAssetId:post.logoAssetId??company.logoAssetId??'',productAssetId:post.productAssetId??''};
 const manifest={rendererVersion:3,compilerVersion:4,recipeVersion:1,format,width,height,coordinateSpace:{width:1080,height:h,pixelScale:unit,description:'Boxes/styles/transforms use 1080-wide layout units; hitRegions use output pixels.'},assetReferences:refs,copy:{headline:String(post.headline||post.title||''),body:String(post.body||''),cta:String(post.cta||''),kicker:''},fonts:{},assets,layers,protection:{textRendering:'fill-only',textBlocks:[],foregroundExclusions:[],nonCtaBackground:'none',contrast:{method:'opaque-glyph-interior',minimum:4.5,roles:[]}}};
 const result=()=>({errors,warnings,width,height,generated:!!design,manifest,hitRegions});let o,p,palette;
 try{o=resolvePoster(post.poster||{},format);if(o.version!==3||o.compilerVersion!==4)throw Error('Expected poster version 3 / compilerVersion 4.');p=templatePlan(o.composition.layout,format,o.composition.density);const oldPalette=resolveCrispPalette(company,o);palette={...oldPalette,primary:oldPalette.primary??oldPalette.accent,accent:company.brandKit?.accent??oldPalette.ink};palette.action=palette.accent;palette.actionText=contrast(palette.action,palette.ink)>=contrast(palette.action,palette.paper)?palette.ink:palette.paper;}catch(e){errors.push(`Invalid template poster: ${e.message}`);return result();}
 manifest.options=o;manifest.recipe=o.recipe;manifest.palette=palette;manifest.copy.kicker=o.kicker;manifest.layout={...TEMPLATE_RESOURCES[o.composition.layout]};
 const motif={id:'none',version:1,sha256:null,viewBox:null};
 if(o.motif.id!=='none'){errors.push('Template4 does not render motifs.');return result();}
 manifest.motif={id:motif.id,version:motif.version,sha256:motif.sha256,viewBox:motif.viewBox,opacity:o.motif.opacity,transform:{x:o.motif.x,y:o.motif.y,scale:o.motif.scale,rotation:o.motif.rotation},painted:false};
 manifest.cta={style:o.cta.style,width:o.cta.width,align:o.cta.align,fill:null,text:null,shapeBounds:null,textBounds:null,arrow:o.cta.arrow,painted:false};
 manifest.safeRegion={preset:'Brand Studio authored template composition (not platform certification)',inset:{left:(format==='story'?80:format==='landscape'?42:54)*unit,right:(format==='story'?80:format==='landscape'?42:54)*unit,top:(format==='story'?145:40)*unit,bottom:(format==='story'?130:40)*unit}};
 c.scale(unit,unit);c.fillStyle=palette.field;c.fillRect(0,0,1080,h);
 let roleFonts;try{roleFonts=await (o.fontPairing===undefined?loadRoleFonts:loadTemplateRoleFonts)({voice:o.voice,...(o.fontPairing===undefined?{}:{fontPairing:o.fontPairing}),typography:o.typography,fonts,getFont,companyId:company.id,doc});}catch(e){errors.push(`Required template fonts failed to load. ${e.message}`);return result();}
 const sizes={headline:p.headlineSize*o.scale,body:p.bodySize,cta:p.ctaSize,kicker:format==='landscape'?18:22,brand:format==='landscape'?22:28};
 for(const role of Object.keys(roleFonts)){const s=o.typography[role];manifest.fonts[role]={...roleFonts[role],size:s.size??sizes[role],lineHeight:s.lineHeight??(role==='headline'?p.leading:role==='body'?1.3:1.15),tracking:s.tracking};}
 const headline=manifest.fonts.headline,body=manifest.fonts.body,measurements={headlineHeight:wrap(c,manifest.copy.headline,p.title[2],headline).length*headline.size*headline.lineHeight,bodyHeight:manifest.copy.body.trim()?wrap(c,manifest.copy.body,p.body[2],body).length*body.size*body.lineHeight:0,hasBody:!!manifest.copy.body.trim(),ctaWidth:o.cta.width};
 const flow=templateFlowPlan(p,measurements);p.body[1]=flow.bodyY;
 if(p.copyFlow){const bottom=p.copyFlow.box[1]+p.copyFlow.box[3];p.body[3]=Math.min(p.body[3],Math.max(0,bottom-flow.bodyY));}
for(const [role,value] of Object.entries({...manifest.copy,brand:company.name||'',annotation:o.details.text})){const font=manifest.fonts[role==='annotation'?'kicker':role],missing=unsupportedGlyphs(value,font.coverage);if(missing.length)errors.push(`${role}: selected font cmap does not support ${missing.join(' ')}. Export is blocked; no fallback is used.`);}
 if(!manifest.copy.headline.trim())errors.push('Add a headline before exporting.');
 const [bg,mark,original,fg]=await Promise.all([o.layers.background.mode==='image'?image(background,'Backdrop',errors):null,image(logo,'Logo',errors),image(product,'Original product',errors),image(foreground,'Foreground',errors)]);
 for(const [key,img] of [['backgroundAssetId',bg],['foregroundAssetId',fg],['logoAssetId',mark],['productAssetId',original]]){if(key==='backgroundAssetId'&&o.layers.background.mode!=='image')continue;if(refs[key]&&!img)errors.push('Selected '+key+' is missing. Restore the exact resource before exporting.');if(img&&!refs[key])errors.push(key+': resource has no explicit selected ID. Bind the exact resource before review.');}
 if(o.layers.background.mode==='image'&&(!refs.backgroundAssetId||!bg))errors.push('Image background mode requires the exact selected background resource; choose Solid or restore the image.');
 const addAsset=(role,id,img,box,extra={})=>{assets.push({role,assetId:id||null,x:box[0],y:box[1],width:box[2],height:box[3],sourceWidth:img.width,sourceHeight:img.height,...extra});if(img.width<box[2]*unit||img.height<box[3]*unit)warnings.push(role+': below placed resolution; inspect the native PNG.');layers.push({role,assetId:id||null,box});};
 if(bg&&p.backgroundFit==='contain'){c.save();c.beginPath();c.rect(...p.backgroundBox);c.clip();c.globalAlpha=o.layers.background.opacity;c.filter='blur('+o.layers.background.blur+'px)';const box=contain(c,bg,p.backgroundBox);c.restore();addAsset('backdrop',refs.backgroundAssetId,bg,box,{mode:'image',opacity:o.layers.background.opacity,blur:o.layers.background.blur,clipBox:[...p.backgroundBox],sourceCropped:false,policy:'contain'});}
  else if(bg){const [x,y,w,bh]=p.backgroundBox;c.save();c.beginPath();c.rect(x,y,w,bh);c.clip();c.globalAlpha=o.layers.background.opacity;c.filter='blur('+o.layers.background.blur+'px)';const scale=Math.max(w/bg.width,bh/bg.height)*o.heroScale,bw=bg.width*scale,hh=bg.height*scale,bx=x+(w-bw)*o.cropX,by=y+(bh-hh)*o.cropY;c.drawImage(bg,bx,by,bw,hh);c.restore();addAsset('backdrop',refs.backgroundAssetId,bg,[bx,by,bw,hh],{mode:'image',opacity:o.layers.background.opacity,blur:o.layers.background.blur,clipBox:[...p.backgroundBox],sourceCropped:true,policy:'cover'});}
 let originalBounds=null;if(original){c.save();c.globalAlpha=o.layers.product.opacity;const box=contain(c,original,p.visual);c.restore();if(o.layers.product.opacity>0)originalBounds=box;addAsset('original-product',refs.productAssetId,original,box,{opacity:o.layers.product.opacity,cropped:false,sourceCropped:false,policy:'contain'});}
const texts=[];
 function prepare(role,value,box,align=p.align,fontRole=role,keepPhone=false){if(!String(value).trim())return null;const s=manifest.fonts[fontRole],lines=wrap(c,value,box[2],s,keepPhone),positions=lines.map((line,i)=>{setFont(c,s);const w=c.measureText(line).width;return [align==='center'?box[0]+(box[2]-w)/2:align==='right'?box[0]+box[2]-w:box[0],box[1]+i*s.size*s.lineHeight];}),lineBoxes=lines.map((line,i)=>[positions[i][0],positions[i][1],c.measureText(line).width,s.size*s.lineHeight]),inkBoxes=lines.map((line,i)=>{setFont(c,s);const m=c.measureText(line);return [positions[i][0]-m.actualBoundingBoxLeft,positions[i][1]-m.actualBoundingBoxAscent,m.actualBoundingBoxLeft+m.actualBoundingBoxRight,m.actualBoundingBoxAscent+m.actualBoundingBoxDescent];});
 const overflow=lines.length*s.size*s.lineHeight>box[3]+.1||lineBoxes.some(b=>b[2]>box[2]+.1),t={role,text:String(value),box:[...box],...s,lines,positions,lineBoxes,inkBoxes,overflow};texts.push(t);if(overflow)errors.push(`${role} does not fit at selected ${s.size}px size/leading/tracking. Explicit sizes are never silently shrunk; shorten copy or choose another layout.`);return t;}
 prepare('headline',manifest.copy.headline,p.title);prepare('body',manifest.copy.body,p.body);
 const brand=mark?null:prepare('brand',company.name||'',p.brand,p.align==='center'?'center':'left');prepare('kicker',manifest.copy.kicker,p.kicker,p.align==='center'?'center':'right');
 if(o.details.text)prepare('annotation',o.details.text,p.annotation,'left','kicker');
 // CTA owns its geometry; an empty CTA never paints a strip or phantom hit target.
 let action=null,actionBox=null;
 if(manifest.copy.cta.trim()){
  const s=manifest.fonts.cta,arrowW=o.cta.arrow?40:0,padX=o.cta.paddingX,padY=o.cta.paddingY;setFont(c,s);const keepPhoneCta=['subject-left','image-footer','framed-focus','type-led','offset-grid'].includes(o.composition.layout);
  const natural=Math.max(...manifest.copy.cta.split('\n').map(line=>c.measureText(line).width))+2*padX+arrowW;
  const zone=o.cta.width==='poster'?p.posterCta:p.cta,aw=o.cta.width==='fit'?Math.min(zone[2],natural):zone[2],contentW=Math.max(1,aw-2*padX-arrowW),lines=wrap(c,manifest.copy.cta,contentW,s,keepPhoneCta),ah=lines.length*s.size*s.lineHeight+2*padY;
  const x=zone[0]+(o.cta.align==='center'?(zone[2]-aw)/2:o.cta.align==='right'?zone[2]-aw:0),y=templateFlowPlan(p,{...measurements,ctaHeight:ah}).ctaY;actionBox=[x,y,aw,ah];
  if(ah>zone[3]+.1||y<zone[1]-.1||y+ah>zone[1]+zone[3]+.1)errors.push('CTA full copy exceeds this layout\'s action zone. Shorten it, reduce explicit size/padding or choose another layout.');
  action=prepare('cta',manifest.copy.cta,[x+padX,y+padY,contentW,Math.max(0,ah-2*padY)],'left','cta',keepPhoneCta);
  const fill=o.cta.fill.mode==='custom'?o.cta.fill.value:palette[o.cta.fill.value];manifest.cta.fill=o.cta.style==='text'?null:fill;manifest.cta.shapeBounds=actionBox;manifest.cta.textBounds=action.box;manifest.cta.painted=true;
 }
 for(let i=0;i<texts.length;i++)for(let j=i+1;j<texts.length;j++)if(texts[i].inkBoxes.some(a=>texts[j].inkBoxes.some(b=>intersects(a,b))))errors.push(`${texts[i].role} overlaps ${texts[j].role}; required copy must remain separate.`);
 if(originalBounds&&texts.some(t=>t.inkBoxes.some(b=>intersects(b,originalBounds))))errors.push('Complete original product overlaps required copy; move the image or choose another layout. No rectangular holes or cropping are used.');
 if(actionBox){if(texts.filter(t=>t!==action).some(t=>t.inkBoxes.some(b=>intersects(b,actionBox))))errors.push('CTA shape overlaps required non-CTA copy; choose another layout or reduce explicit action padding.');if(originalBounds&&intersects(originalBounds,actionBox))errors.push('CTA shape overlaps the complete original product; choose another layout.');}
 const logoBox=mark?p.brand:null;
 if(mark){const box=contain(c,mark,logoBox);addAsset('logo',refs.logoAssetId,mark,box,{cropped:false,sourceCropped:false,policy:'authentic source pixels; no recolouring or backing'});if(texts.some(t=>t.inkBoxes.some(b=>intersects(b,box))))errors.push('Original logo overlaps required copy; choose another layout.');}else if(brand)warnings.push('No original logo selected. Company name is typeset text, not an authentic logo.');
 // Foreground is never punched out around text. Test its actual alpha against glyphs.
 if(fg){
  const t=o.layers.foreground,s=Math.min(p.visual[2]/fg.width,p.visual[3]/fg.height)*t.scale,fw=fg.width*s,fh=fg.height*s,fc=newCanvas(doc,width,height),f=fc.getContext('2d',{willReadFrequently:true});f.scale(unit,unit);f.translate(t.x*1080,t.y*h);f.rotate(t.rotation*Math.PI/180);f.globalAlpha=t.opacity;f.drawImage(fg,-fw/2,-fh/2,fw,fh);const theta=t.rotation*Math.PI/180,corners=[[-fw/2,-fh/2],[fw/2,-fh/2],[fw/2,fh/2],[-fw/2,fh/2]].map(([x,y])=>[t.x*1080+x*Math.cos(theta)-y*Math.sin(theta),t.y*h+x*Math.sin(theta)+y*Math.cos(theta)]);if(t.opacity>0&&corners.some(([x,y])=>x<-.1||x>1080.1||y<-.1||y>h+.1))errors.push('Foreground source frame exceeds the poster. Move it inward or reduce its explicit scale; no clipping is approved.');const fp=f.getImageData(0,0,width,height).data;
  const mask=newCanvas(doc,width,height),m=mask.getContext('2d',{willReadFrequently:true});m.scale(unit,unit);for(const text of texts)paintText(m,text);for(const box of [logoBox,actionBox,originalBounds].filter(Boolean))m.fillRect(...box);const mp=m.getImageData(0,0,width,height).data;let overlaps=0,visible=0;for(let i=3;i<fp.length;i+=4){if(fp[i]>8){visible++;if(mp[i]>8)overlaps++;}}
  if(overlaps)errors.push(`Foreground overlaps required copy/logo/action (${overlaps} native pixels). Move it or choose another layout; no exclusion holes are painted.`);if(!visible&&t.opacity>0)errors.push('Foreground has no visible pixels.');
  c.save();c.setTransform(1,0,0,1,0,0);c.drawImage(fc,0,0);c.restore();addAsset('foreground',refs.foregroundAssetId,fg,[t.x*1080-fw/2,t.y*h-fh/2,fw,fh],{opacity:t.opacity,transform:{...t},sourceCropped:false,protectedExclusions:[],overlapPixels:overlaps,visiblePixels:visible});
 }
 // Paint CTA shell before measuring text against the actual final background pixels.
 if(action&&o.cta.style!=='text'){c.save();shape(c,o.cta.style,actionBox);if(o.cta.style==='outline'){c.strokeStyle=manifest.cta.fill;c.lineWidth=2;c.stroke();}else{c.fillStyle=manifest.cta.fill;c.fill();}c.restore();layers.push({role:'action',style:o.cta.style,box:actionBox,fill:manifest.cta.fill});}
 // Snapshot the actual composite once. No shadow, outline, backing or background erasure.
 const pixels=c.getImageData(0,0,width,height).data;
 for(const t of texts){
  const mask=newCanvas(doc,width,height),m=mask.getContext('2d',{willReadFrequently:true});m.scale(unit,unit);paintText(m,t);const coverage=m.getImageData(0,0,width,height).data;
  let requested=t.role==='cta'?o.cta.text:o.textColors[t.role==='annotation'?'kicker':t.role],candidates;
  if(t.role==='cta')candidates=requested.mode==='auto'?[palette.ink,palette.paper]:[requested.mode==='custom'?requested.value:palette[requested.value]];else candidates=requested==='auto'?[palette.ink,palette.paper]:[palette[requested]];
  const measures=candidates.map(color=>{let minimum=Infinity,samples=0;const fgLum=colourLum(color);for(let i=3;i<coverage.length;i+=4)if(coverage[i]>=250){minimum=Math.min(minimum,ratio(fgLum,lum(pixels[i-3],pixels[i-2],pixels[i-1])));samples++;}return {color,minimum:samples?minimum:0,samples};}).sort((a,b)=>b.minimum-a.minimum),best=measures[0];
  t.color=best.color;manifest.protection.contrast.roles.push({role:t.role,color:t.color,minimum:best.minimum,samples:best.samples,passed:best.minimum>=4.5});
  if(best.minimum<4.5)errors.push(`${t.role}: actual opaque-glyph-interior contrast ${best.minimum.toFixed(2)}:1 is below 4.5:1. Choose another palette role, move imagery/motif, change treatment or use a quieter background; no automatic plates are added.`);
  if(t.role==='cta')manifest.cta.text=t.color;
  if(!t.overflow){paintText(c,t);layers.push({...t});for(const b of t.lineBoxes)hitRegions.push({role:t.role,x:b[0]*unit,y:b[1]*unit,width:b[2]*unit,height:b[3]*unit});}
 }
 if(action&&o.cta.arrow&&!action.overflow){const x=actionBox[0]+actionBox[2]-o.cta.paddingX-12,y=actionBox[1]+actionBox[3]/2;c.save();c.strokeStyle=action.color;c.lineWidth=2.5;c.beginPath();c.moveTo(x-18,y);c.lineTo(x+6,y);c.moveTo(x-3,y-9);c.lineTo(x+6,y);c.lineTo(x-3,y+9);c.stroke();c.restore();}
 // Validate true glyph bounds too; line counts alone cannot catch a font's overhang.
 for(const t of texts)for(const b of t.inkBoxes){const inset=manifest.safeRegion.inset;if(b[0]*unit<inset.left-.1||b[1]*unit<inset.top-.1||(b[0]+b[2])*unit>width-inset.right+.1||(b[1]+b[3])*unit>height-inset.bottom+.1)errors.push(`${t.role} exceeds the format's safe native glyph bounds. Move copy or choose another layout.`);}
 manifest.layerOrder=layers.map(l=>l.role);c.setTransform(1,0,0,1,0,0);return result();
}
