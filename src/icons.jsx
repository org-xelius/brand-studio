import React from 'react';

// One optical grid for all studio controls. Labels live on the owning control.
const PATHS = {
 plus:'M12 5v14M5 12h14',
 arrow:'M5 12h14m-6-6 6 6-6 6',
 back:'M19 12H5m6-6-6 6 6 6',
 calendar:'M6 4h12a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2ZM8 2v4m8-4v4M4 10h16',
 image:'M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2ZM3 16l5-5 5 5 3-3 5 5M16 8h.01',
 check:'m5 12 4 4L19 6',
 settings:'M4 7h16M4 17h16M8 4v6m8 4v6',
 download:'M12 3v12m-5-5 5 5 5-5M4 17v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3',
 upload:'M12 16V4m-5 5 5-5 5 5M4 17v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3',
 close:'m6 6 12 12M6 18 18 6',
 chevron:'m9 5 7 7-7 7',
 help:'M9 8a3 3 0 1 1 5 2c-2 1-2 2-2 3m0 4h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z',
 home:'m3 10 9-7 9 7M5 9v11a1 1 0 0 0 1 1h4v-7h4v7h4a1 1 0 0 0 1-1V9',
 grid:'M4 4h6v6H4ZM14 4h6v6h-6ZM4 14h6v6H4ZM14 14h6v6h-6Z',
 folder:'M3 7V5a1 1 0 0 1 1-1h5l2 3h9a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z',
 clock:'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0ZM12 6v6l4 2',
 edit:'m15 5 4 4M4 20l1-5L16 4a2.1 2.1 0 0 1 3 3L8 18ZM4 20h6',
 more:'M5 12h.01M12 12h.01M19 12h.01',
 type:'M4 5h16M12 5v15M8 20h8',
 layers:'m12 3 10 5-10 5L2 8ZM2 12l10 5 10-5M2 16l10 5 10-5',
 undo:'M4 10h10a6 6 0 0 1 0 12M4 10l5-5M4 10l5 5',
 zoom:'M16 10a6 6 0 1 1-12 0 6 6 0 0 1 12 0Zm-1.5 4.5L21 21M7 10h6m-3-3v6',
 expand:'M9 3H3v6m12-6h6v6M3 15v6h6m12-6v6h-6',
 search:'M16 10a6 6 0 1 1-12 0 6 6 0 0 1 12 0Zm-1.5 4.5L21 21',
 warning:'M10.3 4a2 2 0 0 1 3.4 0l8 14a2 2 0 0 1-1.7 3H4a2 2 0 0 1-1.7-3ZM12 9v5m0 3h.01',
 refresh:'M20 8a8 8 0 0 0-14-3L3 8m0-5v5h5M4 16a8 8 0 0 0 14 3l3-3m0 5v-5h-5',
 sun:'M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5',
 moon:'M20.5 14.2A9 9 0 0 1 9.8 3.5a9 9 0 1 0 10.7 10.7Z',
 external:'M14 3h7v7m0-7L10 14M10 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5',
};

export function StudioMark({size=28,...props}) {
 return <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false" {...props}>
  <path d="M12 5h11.5A3.5 3.5 0 0 1 27 8.5V20" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" opacity=".5"/>
  <rect x="5" y="10" width="17" height="17" rx="3.5" stroke="currentColor" strokeWidth="2.2"/>
  <path d="M9 15h5v7H9z" fill="currentColor"/>
  <path d="M17 15v7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" opacity=".6"/>
 </svg>;
}

export function Icon({name='studio',size=18,...props}) {
 if(name==='studio')return <StudioMark size={size} {...props}/>;
 return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}><path d={PATHS[name]||PATHS.grid}/></svg>;
}
