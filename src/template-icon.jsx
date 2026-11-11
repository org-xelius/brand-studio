import React from 'react';
import {templatePlan} from './layout-kernel-template.js';

const heights={square:1080,portrait:1350,story:1920,landscape:565.2};
// Schematics describe the actual native regions, never pretend to be rendered posters.
export default function TemplateIcon({id,format='square',density='balanced'}){
 const plan=templatePlan(id,format,density),height=heights[format];
 const lines=(box,count,opacity,kind)=>{
  const [x,y,w,h]=box,lineHeight=Math.min(h/(count*1.7),kind==='title'?54:24),gap=lineHeight*.65;
  return Array.from({length:count},(_,i)=><rect key={kind+i} x={x} y={y+i*(lineHeight+gap)} width={w*(i===count-1?.73:1)} height={lineHeight} rx="3" opacity={opacity}/>);
 };
 const photo=plan.backgroundBox||plan.visual,action=id==='bold-backdrop'?plan.posterCta:plan.cta;
 return <svg className="bs-arrangement-sketch bs-template-icon" viewBox={`0 0 1080 ${height}`} preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false" data-layout-id={id} data-format={format}>
  <rect x="4" y="4" width="1072" height={height-8} rx="24" fill="var(--bs-surface)" stroke="currentColor" strokeWidth="8" opacity=".7"/>
  <g fill="currentColor">
   <rect x={photo[0]} y={photo[1]} width={photo[2]} height={photo[3]} opacity=".16"/>
   {lines(plan.title,2,.9,'title')}
   {lines(plan.body,3,.5,'body')}
   <rect x={action[0]} y={action[1]} width={action[2]} height={Math.min(action[3],48)} rx="5" opacity=".85"/>
  </g>
 </svg>;
}
