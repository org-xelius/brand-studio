import {resolvePoster} from '../poster-model.js';
import {resolvePalette,contrast} from './poster-renderer.js';
import {loadRoleFonts,unsupportedGlyphs} from './fonts-v3.js';

const dimensions={square:[1080,1080],portrait:[1080,1350],story:[1080,1920],landscape:[1200,628]};
const renderTokens=new WeakMap();
const rect=(c,b,color)=>{c.fillStyle=color;c.fillRect(...b);};
const intersects=(a,b)=>a[0]<b[0]+b[2]&&a[0]+a[2]>b[0]&&a[1]<b[1]+b[3]&&a[1]+a[3]>b[1];
function contain(c,img,box){const [x,y,w,h]=box,s=Math.min(w/img.width,h/img.height),p=[x+(w-img.width*s)/2,y+(h-img.height*s)/2,img.width*s,img.height*s];c.drawImage(img,...p);return p;}
async function image(src,role,errors){if(!src)return null;try{if(typeof src!=='string'||!/^data:image\/(png|jpeg|webp|svg\+xml)[;,]/.test(src))throw Error('Only local image data is allowed.');return await new Promise((resolve,reject)=>{const img=new Image();const timer=setTimeout(()=>reject(Error('Image timeout.')),12000);img.onload=()=>{clearTimeout(timer);img.naturalWidth?resolve(img):reject(Error('Empty image.'));};img.onerror=()=>{clearTimeout(timer);reject(Error('Invalid image.'));};img.src=src;});}catch(e){errors.push(`${role}: the selected local image could not be opened. ${e.message}`);return null;}}
function plan(format,h,recipe){
 const wide=format==='landscape',story=format==='story',portrait=format==='portrait',m=wide?58:story?80:64,top=story?160:54,footer=h-(story?160:54)-80;
 let title=wide?[m,136,610,212]:[m,story?280:172,1080-m*2,story?550:portrait?350:330];
 let body=wide?[m,330,480,90]:[m,story?1120:portrait?790:646,story?420:portrait?380:370,story?390:portrait?250:205];
 let visual=wide?[660,130,360,300]:[m,story?790:portrait?590:470,1080-m*2,story?630:portrait?430:330];
 if(recipe==='editorial'){title=wide?[m,150,490,230]:[m,story?320:180,1080-m*2,story?560:portrait?450:370];body=wide?[610,150,410,280]:[m,story?1030:portrait?760:650,1080-m*2,footer-(story?1030:portrait?760:650)-45];}
 if(recipe==='showcase'){title=wide?[m,145,520,180]:[m,story?280:160,1080-m*2,story?340:230];body=wide?[m,330,480,90]:[m,story?1510:portrait?1090:832,1080-m*2,story?130:100];}
 return {wide,story,m,top,footer,title,body,visual,size:recipe==='showcase'?(wide?84:112):wide?88:story?156:148};
}
function setFont(c,s){c.font=`${s.weight} ${s.size}px "${s.canvasFamily}"`;c.fontKerning='normal';c.textBaseline='top';c.textAlign='left';c.letterSpacing=`${s.tracking*s.size}px`;}
function measure(c,text,s){setFont(c,s);return c.measureText(text).width;}
function wrap(c,value,width,s){const result=[];for(const paragraph of String(value).split('\n')){if(!paragraph.trim()){result.push('');continue;}let line='';for(const word of paragraph.trim().split(/\s+/)){const test=line?line+' '+word:word;if(line&&measure(c,test,s)>width){result.push(line);line=word;}else line=test;}result.push(line);}return result;}
function alphaInfo(img,doc){const c=doc.createElement('canvas');c.width=img.width;c.height=img.height;const x=c.getContext('2d',{willReadFrequently:true});x.drawImage(img,0,0);const data=x.getImageData(0,0,c.width,c.height).data;let minX=c.width,minY=c.height,maxX=-1,maxY=-1,transparent=0,partial=0;for(let y=0;y<c.height;y++)for(let z=0;z<c.width;z++){const a=data[(y*c.width+z)*4+3];if(a<255)transparent++;if(a>0&&a<255)partial++;if(a>8){minX=Math.min(minX,z);maxX=Math.max(maxX,z);minY=Math.min(minY,y);maxY=Math.max(maxY,y);}}return {hasAlpha:transparent>0,transparentPixels:transparent,partialPixels:partial,visibleBounds:maxX<0?null:[minX,minY,maxX-minX+1,maxY-minY+1]};}

// A private completed bitmap is published only if this is still the newest render.
export async function renderPosterV3(target,resources){
 const token=Symbol('poster-v3');renderTokens.set(target,token);const staging=target.ownerDocument.createElement('canvas');
 const result=await paint(staging,resources);
 if(renderTokens.get(target)!==token)return {...result,stale:true,errors:[...result.errors,'A newer render replaced this drawing. Wait for the current preview.']};
 target.width=staging.width;target.height=staging.height;target.getContext('2d').drawImage(staging,0,0);return result;
}
async function paint(canvas,{company={},post={},design,background,logo,product,foreground,fonts=[],getFont}={}){
 const format=dimensions[post.format]?post.format:'square',[width,height]=dimensions[format],unit=width/1080,h=height/unit;
 canvas.width=width;canvas.height=height;const c=canvas.getContext('2d'),errors=[],warnings=[],hitRegions=[],layers=[],assets=[];
 const result=()=>({errors,warnings,width,height,generated:!!design,manifest,hitRegions});
 const refs={backgroundAssetId:post.backgroundAssetId||'',foregroundAssetId:post.foregroundAssetId||'',logoAssetId:post.logoAssetId??company.logoAssetId??'',productAssetId:post.productAssetId??''};
 const manifest={rendererVersion:3,recipeVersion:1,format,width,height,coordinateSpace:{width:1080,height:h,pixelScale:unit,description:'All boxes, styles and transforms use 1080-wide layout units; hitRegions use output pixels.'},assetReferences:refs,copy:{headline:String(post.headline||post.title||''),body:String(post.body||''),cta:String(post.cta||''),kicker:''},fonts:{},assets,layers};
 let o;try{o=resolvePoster(post.poster||{version:3},format);if(o.version!==3)throw Error('Expected a version 3 poster.');}catch(e){errors.push(`Invalid v3 poster: ${e.message}`);return result();}
 const palette=resolvePalette(company,o),p=plan(format,h,o.recipe);
 if(o.recipe==='hero')p.visual=p.wide?[700,136,320,280]:[530,p.story?1020:format==='portrait'?590:510,1080-p.m-530,p.story?580:format==='portrait'?520:370];
 // Auditions adjust authored geometry, not requested numeric role styles.
 const variationFactor=o.variation==='type-led'?1.05:o.variation==='image-led'?.9:1;
 p.size*=variationFactor;
 if(o.variation==='type-led'){p.title[3]+=p.wide?15:60;p.visual[1]+=p.wide?12:30;p.visual[3]-=p.wide?12:30;}
 if(o.variation==='image-led'){p.title[1]+=p.wide?8:20;p.visual[1]-=p.wide?8:20;p.visual[3]+=p.wide?8:20;}
 manifest.options=o;manifest.recipe=o.recipe;manifest.palette=palette;manifest.copy.kicker=o.kicker;
 manifest.safeRegion={preset:'Brand Studio conservative composition v3 (not platform certification)',inset:{left:p.m*unit,right:p.m*unit,top:p.top*unit,bottom:(p.story?160:54)*unit}};
 c.scale(unit,unit);rect(c,[0,0,1080,h],palette.field);
 if(contrast(palette.field,palette.text)<4.5)errors.push('The company palette does not supply readable text contrast.');
 let roleFonts;try{roleFonts=await loadRoleFonts({voice:o.voice,typography:o.typography,fonts,getFont,companyId:company.id,doc:canvas.ownerDocument});}catch(e){errors.push(`Required v3 fonts failed to load. ${e.message}`);return result();}
 const sizes={headline:p.size*o.scale,body:p.wide?30:36,cta:p.story?36:32,kicker:26,brand:30};
 for(const role of Object.keys(roleFonts)){const style=o.typography[role];manifest.fonts[role]={...roleFonts[role],size:style.size??sizes[role],lineHeight:style.lineHeight??(role==='headline'?1.02:role==='body'?1.3:1.1),tracking:style.tracking};}
 for(const [role,value] of Object.entries({...manifest.copy,brand:company.name||'',details:o.details.text})){const font=manifest.fonts[role==='details'?'kicker':role],missing=unsupportedGlyphs(value,font.coverage);if(missing.length)errors.push(`${role}: selected font cmap does not support ${missing.join(' ')}. Export is blocked; no fallback is used.`);}
 if(!manifest.copy.headline.trim())errors.push('Add a headline before exporting.');
 const [bg,mark,original,fg]=await Promise.all([image(background,'Backdrop',errors),image(logo,'Logo',errors),image(product,'Product / screenshot',errors),image(foreground,'Foreground',errors)]);
 for(const [key,resource] of [['backgroundAssetId',bg],['foregroundAssetId',fg],['logoAssetId',mark],['productAssetId',original]])if(refs[key]&&!resource)errors.push(`Selected ${key} is missing. Restore the exact resource before exporting.`);
 // Resource bytes never acquire the latest design's unrelated attribution.
 for(const [key,resource] of [['backgroundAssetId',bg],['foregroundAssetId',fg],['logoAssetId',mark],['productAssetId',original]])if(resource&&!refs[key])errors.push(`${key}: resource has no explicit selected ID. Bind the exact resource before review; latest-design attribution is never substituted.`);
 if(o.recipe==='showcase'&&!original)errors.push('Showcase requires an original product image or screenshot.');
 if(o.recipe==='editorial'&&(bg||fg||original))warnings.push('Editorial is type-only except the original logo. Selected imagery is not drawn; do not commission an editorial backdrop.');
 const addAsset=(role,id,img,box,extra={})=>{const asset={role,assetId:id||null,x:box[0],y:box[1],width:box[2],height:box[3],sourceWidth:img.width,sourceHeight:img.height,...extra};assets.push(asset);if(img.width<box[2]*unit||img.height<box[3]*unit)warnings.push(`${role}: below placed resolution; inspect native PNG.`);return asset;};
 if(bg&&o.recipe!=='editorial'){
  c.save();c.globalAlpha=o.layers.background.opacity;c.filter=`blur(${o.layers.background.blur}px)`;const s=Math.max(1080/bg.width,h/bg.height)*o.heroScale,bw=bg.width*s,bh=bg.height*s,bx=(1080-bw)*o.cropX,by=(h-bh)*o.cropY;c.drawImage(bg,bx,by,bw,bh);c.restore();
  addAsset('backdrop',refs.backgroundAssetId,bg,[bx,by,bw,bh],{opacity:o.layers.background.opacity,blur:o.layers.background.blur,heroScale:o.heroScale,cropX:o.cropX,cropY:o.cropY});layers.push({role:'backdrop',assetId:refs.backgroundAssetId||null});
 }
 if(o.details.surface==='tonal'){
  const gradient=c.createLinearGradient(0,0,1080,h);gradient.addColorStop(0,palette.field);gradient.addColorStop(1,palette.ink);c.save();c.globalAlpha=.12*o.details.strength;c.fillStyle=gradient;c.fillRect(0,0,1080,h);c.restore();layers.push({role:'tonal',strength:o.details.strength});
 }
 // Essential type is measured with the exact loaded face, before wrapping or masking.
 const texts=[];
 function prepare(role,value,box,color=palette.text){
  if(!value)return null;const style=manifest.fonts[role],lines=wrap(c,value,box[2],style),height=lines.length*style.size*style.lineHeight,overflow=height>box[3]+.1||lines.some(line=>measure(c,line,style)>box[2]+.1);
  const layer={role,text:value,box:[...box],...style,lines,overflow,color};texts.push(layer);if(overflow)errors.push(`${role} does not fit at the selected ${style.size}px size/leading/tracking. Explicit styles are never silently shrunk; edit copy or choose another arrangement.`);
  layer.lineBoxes=lines.map((line,index)=>{if(!line)return null;const w=measure(c,line,style),x=o.alignment==='center'&&role==='headline'?box[0]+(box[2]-w)/2:box[0];return [x,box[1]+index*style.size*style.lineHeight,w,style.size*style.lineHeight];}).filter(Boolean);return layer;
 }
 const headline=prepare('headline',manifest.copy.headline,p.title);
 const body=prepare('body',manifest.copy.body,p.body);
 const brand=mark?null:prepare('brand',company.name||'',[p.m,p.top,500,70]);
 const kicker=prepare('kicker',manifest.copy.kicker,[620,p.top,1080-p.m-620,70]);
 const actionStyle=manifest.fonts.cta,actionH=Math.max(80,actionStyle.size*actionStyle.lineHeight+32),actionY=p.footer+80-actionH,actionBox=[p.m,actionY,1080-2*p.m,actionH];
 const action=prepare('cta',manifest.copy.cta,[p.m+24,actionY+16,actionBox[2]-104,actionH-32],o.details.action==='text'?palette.text:palette.actionText);
 const protectedBoxes=[...texts.filter(t=>t!==headline).flatMap(t=>t.lineBoxes),...(mark?[[p.m,p.top,260,64]]:[]),...(action?[actionBox]:[]),...(original&&o.recipe!=='editorial'?[p.visual]:[])];
 for(let i=0;i<texts.length;i++)for(let j=i+1;j<texts.length;j++)if(texts[i].lineBoxes.some(a=>texts[j].lineBoxes.some(b=>intersects(a,b))))errors.push(`${texts[i].role} overlaps ${texts[j].role}; required copy must remain separate.`);
 for(const text of texts)if(text!==headline&&text.lineBoxes.some(b=>b[1]+b[3]>actionY-16)&&text!==action)errors.push(`${text.role} overlaps the protected action safe area.`);
 function drawText(t){if(!t||t.overflow)return;setFont(c,t);c.fillStyle=t.color;for(let i=0;i<t.lines.length;i++){const line=t.lines[i],w=measure(c,line,t),x=o.alignment==='center'&&t.role==='headline'?t.box[0]+(t.box[2]-w)/2:t.box[0];if(t.role!=='cta'){c.save();c.strokeStyle=palette.field;c.lineWidth=Math.max(6,t.size*.055);c.lineJoin='round';c.strokeText(line,x,t.box[1]+i*t.size*t.lineHeight);c.restore();}c.fillText(line,x,t.box[1]+i*t.size*t.lineHeight);if(t.role==='headline'&&o.emphasis&&o.details.underline){const at=line.toLocaleLowerCase().indexOf(o.emphasis.toLocaleLowerCase());if(at>=0){const a=measure(c,line.slice(0,at),t),b=measure(c,line.slice(at,at+o.emphasis.length),t);rect(c,[x+a,t.box[1]+i*t.size*t.lineHeight+t.size*.94,b,Math.max(3,t.size*.035)],t.color);}}}layers.push({...t});for(const b of t.lineBoxes)hitRegions.push({role:t.role,x:b[0]*unit,y:b[1]*unit,width:b[2]*unit,height:b[3]*unit});}
 function exclude(boxes){for(const [x,y,w,z] of boxes){c.beginPath();c.rect(0,0,1080,h);c.rect(x-8,y-8,w+16,z+16);c.clip('evenodd');}}
 // A single restrained company motif. Only supplied words are used, never generated claims.
 if(o.details.motif!=='none'){
  c.save();exclude([...protectedBoxes,...(headline?.lineBoxes||[])]);c.globalAlpha=.25+.65*o.details.strength;c.strokeStyle=palette.text;c.lineWidth=o.details.motif==='ribbon'?52:3;
  c.beginPath();if(o.details.motif==='ribbon'){c.moveTo(-80,h*.70);c.bezierCurveTo(320,h*.39,640,h*.95,1160,h*.58);}else c.ellipse(690,h*.59,440,h*.22,-.3,0,Math.PI*2);c.stroke();
  if(o.details.text){const s=manifest.fonts.kicker;setFont(c,s);c.fillStyle=palette.field;c.save();c.translate(p.m,h*.60);c.rotate(-.12);if(measure(c,o.details.text,s)<=900)c.fillText(o.details.text,0,0);else warnings.push('Supplied motif text is too long for the ribbon; not drawn.');c.restore();}c.restore();layers.push({role:'motif',motif:o.details.motif,text:o.details.text,strength:o.details.strength});
 }
 // Field-colour glyph outlines preserve contrast without rectangular picture/type cards.
 if(o.layers.headlineDepth==='behind')drawText(headline);
 if(fg&&o.recipe==='hero'){
  const info=alphaInfo(fg,canvas.ownerDocument),t=o.layers.foreground,s=Math.min((p.wide?540:870)/fg.width,((p.wide?300:p.story?1000:portraitHeight(format))*(o.variation==='image-led'?1.08:o.variation==='type-led'?.9:1))/fg.height)*t.scale,fw=fg.width*s,fh=fg.height*s,x=t.x*1080-fw/2,y=t.y*h-fh/2;
  const corners=[[-fw/2,-fh/2],[fw/2,-fh/2],[fw/2,fh/2],[-fw/2,fh/2]].map(([a,b])=>{const r=t.rotation*Math.PI/180;return [t.x*1080+a*Math.cos(r)-b*Math.sin(r),t.y*h+a*Math.sin(r)+b*Math.cos(r)];});const xs=corners.map(v=>v[0]),ys=corners.map(v=>v[1]),bounds=[Math.min(...xs),Math.min(...ys),Math.max(...xs)-Math.min(...xs),Math.max(...ys)-Math.min(...ys)];
  const protectedForeground=[...protectedBoxes,...(o.layers.headlineDepth==='behind'?headline?.lineBoxes||[]:[])];
  if(protectedForeground.some(b=>intersects(bounds,b)))warnings.push('Foreground crosses protected copy/logo/action bounds; protective clipping preserves required content. Inspect the silhouette.');
  if(bounds[0]<0||bounds[1]<0||bounds[0]+bounds[2]>1080||bounds[1]+bounds[3]>h)warnings.push('Foreground transform bleeds outside the canvas. Inspect subject clipping.');
  if(!info.hasAlpha)warnings.push('Foreground is opaque: no true alpha detected. No automatic background removal is performed.');if(!info.visibleBounds)errors.push('Foreground has no visible pixels.');
  c.save();exclude(protectedForeground);c.translate(t.x*1080,t.y*h);c.rotate(t.rotation*Math.PI/180);c.shadowColor=`rgba(0,0,0,${t.shadow*.45})`;c.shadowBlur=24*t.shadow;c.shadowOffsetY=12*t.shadow;c.drawImage(fg,-fw/2,-fh/2,fw,fh);c.restore();
  addAsset('foreground',refs.foregroundAssetId,fg,[x,y,fw,fh],{...info,transform:{...t},rotatedBounds:bounds,protectedExclusions:protectedForeground,protectionIntersectsBounds:protectedForeground.some(b=>intersects(bounds,b)),canvasBoundsClipped:bounds[0]<0||bounds[1]<0||bounds[0]+bounds[2]>1080||bounds[1]+bounds[3]>h,sourceCropped:false});layers.push({role:'foreground',assetId:refs.foregroundAssetId||null,transform:{...t},protectedExclusions:protectedForeground});
 }else if(fg&&o.recipe==='showcase')warnings.push('Showcase protects its original screenshot; the cutout foreground is not drawn.');
 if(original&&o.recipe!=='editorial'){
  const placed=contain(c,original,p.visual);if(texts.some(t=>t.lineBoxes.some(b=>intersects(b,placed))))errors.push('Original product overlaps required copy; choose another arrangement. The complete screenshot is never cropped or cut out.');addAsset('original-product',refs.productAssetId,original,placed,{cropped:false,policy:'contain complete original; no recolouring or perspective'});layers.push({role:'original-product',assetId:refs.productAssetId||null});
 }
 if(o.layers.headlineDepth==='front')drawText(headline);
 // Required copy uses the same restrained brand-field glyph outline for backdrop contrast.
 for(const t of [body,brand,kicker])drawText(t);
 if(mark){rect(c,[p.m-8,p.top-8,276,80],palette.field);addAsset('logo',refs.logoAssetId,mark,contain(c,mark,[p.m,p.top,260,64]),{cropped:false});layers.push({role:'logo',assetId:refs.logoAssetId||null});}else warnings.push('No original logo selected. Company name is typeset text, not an authentic logo.');
 if(action){if(o.details.action!=='text'){c.fillStyle=palette.action;c.beginPath();if(o.details.action==='capsule')c.roundRect(...actionBox,actionH/2);else c.rect(...actionBox);c.fill();}else rect(c,actionBox,palette.field);drawText(action);if(!action.overflow){const x=1080-p.m-30,y=actionY+actionH/2;c.strokeStyle=action.color;c.lineWidth=3;c.beginPath();c.moveTo(x-22,y);c.lineTo(x+4,y);c.moveTo(x-6,y-10);c.lineTo(x+4,y);c.lineTo(x-6,y+10);c.stroke();}layers.push({role:'action',treatment:o.details.action,box:actionBox});}
 // Headline contrast is protected from atmospheric images without disabling depth ordering.
 manifest.layerOrder=layers.map(l=>l.role);manifest.protection={policy:'Foreground/motif exclude essential text bounds, logo and action; backdrop is atmospheric. Full source pixels remain unchanged.',foregroundExclusions:protectedBoxes};
 for(const region of hitRegions){const inset=manifest.safeRegion.inset;if(region.x<inset.left-.1||region.y<inset.top-.1||region.x+region.width>width-inset.right+.1||region.y+region.height>height-inset.bottom+.1)errors.push(`${region.role} exceeds this format's conservative safe area.`);}
 c.setTransform(1,0,0,1,0,0);return result();
}
function portraitHeight(format){return format==='portrait'?760:480;}
