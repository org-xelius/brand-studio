import {loadPosterFonts, unsupportedCharacters} from './fonts.js';

/* THESIS: monumental message, documentary original, useful editorial rhythm—not an image/caption card.
 * OWN-WORLD: company accent / ink / paper, pinned licensed typography, protected original assets.
 * STORY: read the message, inspect the actual product, follow the exact supplied action.
 * FIRST VIEWPORT: ratio-authored hierarchy with a quiet brand rail and anchored action.
 * FORM: approved Brand Studio v2 brief; three recipes, four separately staged ratios.
 */
export const RECIPES=[{id:'hero',name:'Hero statement',description:'Monumental words and one intentional image.'},{id:'showcase',name:'Product showcase',description:'Your original screen, in a locally composed frame.'},{id:'editorial',name:'Editorial / information',description:'A strong headline and generous information rhythm.'}];
export const VOICES=[{id:'studio',name:'Bold studio',description:'League Spartan / Source Sans 3'},{id:'impact',name:'Compact impact',description:'Barlow Condensed / Source Sans 3'},{id:'clean',name:'Clean digital',description:'Archivo / Manrope'}];
const dimensions={square:[1080,1080],portrait:[1080,1350],story:[1080,1920],landscape:[1200,628]};
const defaults={recipe:'hero',voice:'studio',treatment:'brand',variation:'balanced',emphasis:'',kicker:'',scale:1,heroScale:1,cropX:.5,cropY:.5,alignment:'left'};
const clamp=(x,a,b)=>Math.min(b,Math.max(a,Number.isFinite(Number(x))?Number(x):1));
const hex=(x,fallback)=>/^#[\da-f]{6}$/i.test(x||'')?x:fallback;
function luminance(hex){const a=hex.slice(1).match(/../g).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);return .2126*a[0]+.7152*a[1]+.0722*a[2];}
export function contrast(a,b){const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);}
function readable(bg,ink,paper){return contrast(bg,ink)>=contrast(bg,paper)?ink:paper;}
export function resolvePalette(company,poster){const accent=hex(company.color,'#f4652b'),ink=hex(company.brandKit?.ink,'#171717'),paper=hex(company.brandKit?.paper,'#f7f5ef');const field=poster.treatment==='light'?paper:poster.treatment==='dark'?ink:accent;const text=readable(field,ink,paper);return {accent,ink,paper,field,text,emphasis:contrast(field,accent)>=3?accent:text,action:ink,actionText:readable(ink,paper,'#ffffff')};}
export function resolveOptions(company,post){const raw=post.poster||{};const o={...defaults,voice:company.brandKit?.voice||'studio',...raw,...(raw.formats?.[post.format]||{})};for(const [key,a,b] of [['scale',.85,1.15],['heroScale',.8,1.2],['cropX',0,1],['cropY',0,1]])o[key]=clamp(o[key],a,b);delete o.formats;return o;}
function wrap(ctx,text,width){const lines=[];for(const paragraph of String(text).split('\n')){if(!paragraph.trim()){lines.push('');continue;}const words=paragraph.trim().split(/\s+/);let line='';for(const word of words){if(line&&ctx.measureText(line+' '+word).width>width){lines.push(line);line=word;}else line=line?line+' '+word:word;}lines.push(line);}return lines;}
function font(ctx,size,family,weight){ctx.font=`${weight} ${size}px "${family}"`;ctx.fontKerning='normal';}
function rect(ctx,box,fill){ctx.fillStyle=fill;ctx.fillRect(...box);}
function contain(ctx,img,box){const [x,y,w,h]=box,s=Math.min(w/img.width,h/img.height);ctx.drawImage(img,x+(w-img.width*s)/2,y+(h-img.height*s)/2,img.width*s,img.height*s);return {x:x+(w-img.width*s)/2,y:y+(h-img.height*s)/2,width:img.width*s,height:img.height*s,sourceWidth:img.width,sourceHeight:img.height,cropped:false};}
function cover(ctx,img,box,o){let [x,y,w,h]=box;if(o.heroScale<1){x+=w*(1-o.heroScale)/2;y+=h*(1-o.heroScale)/2;w*=o.heroScale;h*=o.heroScale;}const scale=Math.max(w/img.width,h/img.height)*Math.max(1,o.heroScale),sw=w/scale,sh=h/scale,sx=(img.width-sw)*o.cropX,sy=(img.height-sh)*o.cropY;ctx.drawImage(img,sx,sy,sw,sh,x,y,w,h);return {x,y,width:w,height:h,sourceWidth:img.width,sourceHeight:img.height,sourceCrop:{x:sx,y:sy,width:sw,height:sh},cropped:sw<img.width||sh<img.height};}
async function image(src,role,errors){if(!src)return null;try{if(typeof src!=='string')throw Error();return await new Promise((resolve,reject)=>{const img=new Image();const timer=setTimeout(()=>reject(new Error('Image loading timed out.')),12000);img.onload=()=>{clearTimeout(timer);img.naturalWidth?resolve(img):reject();};img.onerror=()=>{clearTimeout(timer);reject(new Error('Image loading failed.'));};img.src=src;});}catch{errors.push(`The original ${role} could not be opened. Choose the asset again.`);return null;}}
function layout(recipe,format,h,hasImage,variation){
 const landscape=format==='landscape',story=format==='story',portrait=format==='portrait';const m=story?80:64,footer=story?h-160-92:h-126;
 let title,visual,body,size;
 if(landscape){title=[m,142,recipe==='editorial'?490:560,202];visual=[670,110,346,290];body=recipe==='editorial'?[620,160,396,245]:[m,350,560,70];size=recipe==='editorial'?100:84;}
 else if(story){title=[m,240,920,recipe==='editorial'?480:410];visual=[m,720,920,610];body=[m,recipe==='editorial'?820:1390,920,recipe==='editorial'?780:230];size=recipe==='showcase'?136:156;}
 else if(portrait){title=[m,174,952,recipe==='editorial'?410:310];visual=[m,520,952,490];body=[m,recipe==='editorial'?680:1052,952,recipe==='editorial'?420:142];size=recipe==='showcase'?130:148;}
 else {title=[m,166,952,recipe==='editorial'?370:285];visual=[m,475,952,330];body=[m,recipe==='editorial'?600:844,952,recipe==='editorial'?290:92];size=recipe==='showcase'?126:146;}
 if(recipe==='showcase'&&format==='square'){title=[m,150,952,240];visual=[m,420,952,400];body=[m,852,952,84];size=114;}
 if(recipe==='editorial'){visual=null;}
 if(recipe==='hero'&&hasImage&&!landscape){
  if(story){visual=[250,720,750,690];body=[m,1460,920,156];}
  else if(portrait){visual=[464,520,552,640];body=[m,690,346,440];}
  else {visual=[552,466,464,438];body=[m,566,430,318];}
 }
 if(recipe==='hero'&&!hasImage){title[3]=landscape?220:story?800:portrait?620:480;body[1]=landscape?380:story?1160:portrait?880:730;body[3]=footer-body[1]-55;size*=1.15;visual=null;}
 if(variation==='type-led'&&visual&&!landscape){title[3]+=50;size*=1.08;visual[1]+=50;visual[3]-=50;}
 if(variation==='image-led'&&visual&&!landscape){title[3]-=35;size*=.9;visual[1]-=35;visual[3]+=35;}
 return {title,visual,body,size,m,footer,landscape,story};
}

const renderTokens=new WeakMap();
export async function renderPoster(target,resources){
 const token=Symbol('poster-render');renderTokens.set(target,token);
 const staging=target.ownerDocument.createElement('canvas');
 const result=await paintPoster(staging,resources);
 if(renderTokens.get(target)!==token)return {...result,errors:[...result.errors,'A newer render replaced this drawing. Wait for the current preview.'],stale:true};
 target.width=staging.width;target.height=staging.height;target.getContext('2d').drawImage(staging,0,0);
 return result;
}
async function paintPoster(canvas,{company={},post={},design,background,logo,product}){
 const format=dimensions[post.format]?post.format:'square',[width,height]=dimensions[format],unit=width/1080,h=height/unit;
 canvas.width=width;canvas.height=height;const ctx=canvas.getContext('2d');const errors=[],warnings=[],hitRegions=[],layers=[];const o=resolveOptions(company,post),palette=resolvePalette(company,o);
 const manifest={rendererVersion:2,recipeVersion:1,format,width,height,coordinateSpace:{width:1080,height:h,pixelScale:unit,description:'Layer boxes and asset placements use layout units; type sizes and hit regions use output pixels.'},options:o,palette,fonts:null,assetReferences:{designId:design?.id||null,backgroundAssetId:design?.assetId||null,logoAssetId:design?.logoAssetId||company.logoAssetId||null,productAssetId:design?.productAssetId||null},assets:[],layers,safeRegion:{preset:'Brand Studio conservative composition v1 (not platform certification)',inset:format==='story'?{top:160,bottom:160,left:80,right:80}:{top:54,bottom:54,left:64,right:64}},copy:{headline:String(post.headline||post.title||''),body:String(post.body||''),cta:String(post.cta||''),kicker:String(o.kicker||'')}};
 ctx.scale(unit,unit);rect(ctx,[0,0,1080,h],palette.field);
 const result=()=>({errors,warnings,width,height,generated:!!design,manifest,hitRegions});
 if(!RECIPES.some(r=>r.id===o.recipe)||!VOICES.some(v=>v.id===o.voice)){errors.push('Choose a supported poster recipe and type voice.');return result();}
 let fonts;try{fonts=await loadPosterFonts(o.voice,canvas.ownerDocument);manifest.fonts=fonts;}catch(e){errors.push(`Required poster fonts failed to load. ${e.message}`);return result();}
 for(const [role,text] of Object.entries({...manifest.copy,brand:company.name||''})){const unsupported=unsupportedCharacters(text);if(unsupported.length)errors.push(`${role}: bundled fonts do not support ${unsupported.join(' ')}. Use supported Latin text before exporting.`);}
 if(!manifest.copy.headline.trim())errors.push('Add a headline before exporting.');
 if(contrast(palette.field,palette.text)<4.5)errors.push('The selected ink and paper do not provide readable contrast on this treatment. Choose stronger brand colours.');
 const [bg,mark,original]=await Promise.all([image(background,'background',errors),image(logo,'logo',errors),image(product,'product / screenshot',errors)]);
 if(company.logoAssetId&&!logo)errors.push('The selected original logo is missing. Restore it before exporting.');
 if(o.recipe==='editorial'&&(bg||original))warnings.push('This type-led editorial arrangement does not use the selected background/product image. The original assets remain unchanged; choose Hero or Showcase to place them.');
 if(o.recipe==='showcase'&&!original)errors.push('Product showcase needs an original product image or website screenshot. Add it under Keep your originals; generated backgrounds cannot replace product evidence.');
 const plan=layout(o.recipe,format,h,!!(bg||original),o.variation);
 function text(role,value,box,{size=32,min=size,weight=400,family=fonts.body,color=palette.text,lineHeight=1.2,align=o.alignment,emphasis=false}={}){
  if(!value)return null;const [x,y,w,maxH]=box;let resolved=size*o.scale;const floor=Math.max(min*o.scale,role==='Headline'?64:role==='Kicker'?22:role==='Brand name'?24:28);let lines=[];
  const fits=()=>{font(ctx,resolved,family,weight);lines=wrap(ctx,value,w);return lines.every(s=>ctx.measureText(s).width<=w+.1)&&lines.length*resolved*lineHeight<=maxH;};
  while(!fits()&&resolved>floor+.1)resolved=Math.max(floor,resolved-2);
  const fit=fits();if(!fit){errors.push(`${role} does not fit this ${format} arrangement at its readable floor (${Math.round(resolved*unit)}px). Add deliberate line breaks, choose a different variation/format, or approve shorter copy.`);layers.push({role,text:value,box,size:resolved*unit,lines,overflow:true});return null;}
  if(resolved<size*o.scale-.1)warnings.push(`${role} uses a bounded fit adjustment: ${Math.round(resolved*unit)}px. Check at feed size.`);
  ctx.textBaseline='top';ctx.textAlign='left';const start=String(value).toLocaleLowerCase().indexOf(String(o.emphasis||'').toLocaleLowerCase());let searchAt=0;
  for(const line of lines){const lw=ctx.measureText(line).width,tx=align==='center'?x+(w-lw)/2:x;let segments=[{text:line,color}];
   if(emphasis&&o.emphasis&&start>=0){const lineStart=String(value).indexOf(line,searchAt);searchAt=Math.max(searchAt,lineStart+line.length);const a=Math.max(0,start-lineStart),b=Math.min(line.length,start+o.emphasis.length-lineStart);if(lineStart>=0&&a<b)segments=[{text:line.slice(0,a),color},{text:line.slice(a,b),color:palette.emphasis},{text:line.slice(b),color}];}
   let px=tx;for(const [index,seg] of segments.entries()){ctx.fillStyle=seg.color;ctx.fillText(seg.text,px,box[1]);const segmentWidth=ctx.measureText(seg.text).width;if(emphasis&&segments.length===3&&index===1&&seg.text){ctx.fillStyle=seg.color;ctx.fillRect(px,box[1]+resolved*.91,segmentWidth,Math.max(3,resolved*.035));}px+=segmentWidth;}box=[box[0],box[1]+resolved*lineHeight,box[2],box[3]];
  }
  const layer={role,text:value,box:[x,y,w,maxH],size:resolved*unit,readableFloor:floor*unit,preferredSize:size*o.scale*unit,weight,family,lineHeight,lines,overflow:false};layers.push(layer);hitRegions.push({role,x:x*unit,y:y*unit,width:w*unit,height:lines.length*resolved*lineHeight*unit});return layer;
 }
 // The brand rail protects original logo aspect ratio; text is an honest fallback, never a fake logo.
 const railY=plan.story?160:58;
 if(mark){const placed=contain(ctx,mark,[plan.m,railY,260,58]);manifest.assets.push({role:'logo',...placed});if(mark.width/placed.width<unit)warnings.push('The original logo is below placed resolution; inspect the PNG.');}
 else {text('Brand name',company.name||'', [plan.m,railY,590,64],{size:30,min:28,weight:600,align:'left'});warnings.push('No original logo selected. The company name is typeset as text, not a logo reconstruction.');}
 if(o.kicker)text('Kicker',o.kicker,[650,railY,1080-plan.m-650,60],{size:26,min:26,weight:600,align:'left'});
 if(o.emphasis&&!manifest.copy.headline.toLocaleLowerCase().includes(o.emphasis.toLocaleLowerCase()))warnings.push('The emphasis phrase is not present in the headline; exact copy remains unchanged.');
 text('Headline',manifest.copy.headline,[...plan.title],{size:plan.size,min:plan.size*.85,weight:fonts.weight,family:fonts.display,lineHeight:o.voice==='impact'?.99:1.02,emphasis:true});
 if(plan.visual&&(bg||original)){
  if(o.recipe==='showcase'){
   if(original){const [x,y,bw,bh]=plan.visual;const scale=Math.min(1,o.heroScale),ratio=original.width/original.height;const fw=Math.min(bw*scale,(bh*scale-58)*ratio+24),fh=(fw-24)/ratio+58,fx=x+(bw-fw)/2,fy=y+(bh-fh)/2;
    // Straight-on local browser frame: the complete original is contained, never regenerated or cropped.
    ctx.save();ctx.shadowColor='#00000035';ctx.shadowBlur=28;ctx.shadowOffsetY=18;rect(ctx,[fx,fy,fw,fh],palette.paper);ctx.restore();rect(ctx,[fx,fy,fw,34],palette.ink);
    for(let n=0;n<3;n++){ctx.fillStyle=n===0?palette.accent:palette.paper;ctx.beginPath();ctx.arc(fx+17+n*18,fy+17,4,0,Math.PI*2);ctx.fill();}
    const placed=contain(ctx,original,[fx+12,fy+46,fw-24,fh-58]);manifest.assets.push({role:'original-product',...placed});hitRegions.push({role:'product',x:fx*unit,y:fy*unit,width:fw*unit,height:fh*unit});
    if(original.width<placed.width*unit||original.height<placed.height*unit)warnings.push('The original product image is below placed resolution; inspect at full size.');
    if(o.cropX!==.5||o.cropY!==.5||o.heroScale>1)warnings.push('Showcase protects the complete original screenshot; crop/overscale is not applied.');
   }
  }else{
   const source=original||bg;let originalBox=plan.visual;if(original){const [x,y,w,h]=plan.visual,s=Math.min(1,o.heroScale);originalBox=[x+w*(1-s)/2,y+h*(1-s)/2,w*s,h*s];if(o.heroScale>1||o.cropX!==.5||o.cropY!==.5)warnings.push('The original product stays fully contained; crop/overscale applies only to background heroes.');}const placed=original?contain(ctx,source,originalBox):cover(ctx,source,plan.visual,o);manifest.assets.push({role:original?'original-product':'background',...placed});
   if(source.width<placed.width*unit||source.height<placed.height*unit)warnings.push('The hero image is below placed resolution; inspect at full size.');
   if(placed.cropped)warnings.push('Hero uses an intentional crop. Check subject edges and any text already in the image.');
   hitRegions.push({role:'hero',x:plan.visual[0]*unit,y:plan.visual[1]*unit,width:plan.visual[2]*unit,height:plan.visual[3]*unit});
  }
 }
 if(o.recipe==='editorial'){
  const ruleY=plan.body[1]-36;if(plan.landscape)rect(ctx,[588,150,2,245],palette.text);else rect(ctx,[plan.m,ruleY,1080-plan.m*2,3],palette.text);
  // Existing newlines are semantic groups, not generated numbered claims.
  text('Supporting text',manifest.copy.body,[...plan.body],{size:plan.landscape?32:plan.story?42:36,min:plan.landscape?30:32,lineHeight:1.42});
 }else text('Supporting text',manifest.copy.body,[...plan.body],{size:plan.landscape?30:34,min:plan.landscape?28:32,lineHeight:1.25});
 // One action, with no invented URL or contact. Entire supplied CTA must fit.
 if(manifest.copy.cta){
  const actionH=plan.story?92:72,ax=plan.m,ay=plan.footer,aw=1080-plan.m*2;
  rect(ctx,[ax,ay,aw,actionH],palette.action);
  const action=text('Call to action',manifest.copy.cta,[ax+24,ay+18,aw-106,actionH-24],{size:plan.story?36:32,min:plan.story?32:28,weight:600,color:palette.actionText,lineHeight:1.05,align:'left'});
  if(action){ctx.strokeStyle=palette.actionText;ctx.lineWidth=3;const xx=ax+aw-37,yy=ay+actionH/2;ctx.beginPath();ctx.moveTo(xx-22,yy);ctx.lineTo(xx+5,yy);ctx.moveTo(xx-5,yy-10);ctx.lineTo(xx+5,yy);ctx.lineTo(xx-5,yy+10);ctx.stroke();}
 }
 if(!manifest.copy.body&&o.recipe==='editorial')warnings.push('Editorial has no supporting information. Add approved information or choose Hero statement.');
 if(manifest.copy.body.length>240)warnings.push('Dense supporting copy: inspect at realistic phone size; a separate approved edit may be needed.');
 ctx.textBaseline='alphabetic';ctx.setTransform(1,0,0,1,0,0);return result();
}
