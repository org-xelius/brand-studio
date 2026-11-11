import { createHash } from 'node:crypto';
import { brotliDecompressSync } from 'node:zlib';
import { getCatalogFont } from './font-catalog.js';
import { StudioError } from './model.js';

export const MAX_FONT_BYTES = 2 * 1024 * 1024;
export const MAX_FAMILY_BYTES = 8 * 1024 * 1024;
const ensure = (condition, message) => { if (!condition) throw new StudioError(message, 'font-invalid'); };
export const fontDigest = bytes => createHash('sha256').update(bytes).digest('hex');
const TAGS = 'cmap head hhea hmtx maxp name OS/2 post cvt_ fpgm glyf loca prep CFF_ VORG EBDT EBLC gasp hdmx kern LTSH PCLT VDMX vhea vmtx BASE GDEF GPOS GSUB EBSC JSTF MATH CBDT CBLC COLR CPAL SVG_ sbix acnt avar bdat bloc bsln cvar fdsc feat fmtx fvar gvar hsty just lcar mort morx opbd prop trak Zapf Silf Glat Gloc Feat Sill'.split(' ').map(s=>s.replace(/_/g,' '));
function tableCmap(bytes) {
  ensure(bytes.length >= 12, 'The font file is truncated.');
  const magic = bytes.toString('ascii',0,4);
  if (magic === 'wOF2') {
    ensure(bytes.length >= 48 && bytes.readUInt32BE(8) === bytes.length && bytes.readUInt16BE(14) === 0 && [0x00010000,0x4f54544f].includes(bytes.readUInt32BE(4)), 'Invalid WOFF2 font header.');
    const count=bytes.readUInt16BE(12), inflated=bytes.readUInt32BE(16), compressed=bytes.readUInt32BE(20);
    ensure(count>0 && count<=128 && inflated<=16*1024*1024, 'The WOFF2 font is too complex.');
    let at=48, offset=0, cmap;
    const base128=()=>{let n=0;for(let i=0;i<5;i++){ensure(at<bytes.length,'Truncated WOFF2 directory.');const b=bytes[at++];ensure(!(i===0&&b===128)&&!(n&0xfe000000),'Invalid WOFF2 table size.');n=n*128+(b&127);if(!(b&128))return n;}throw new StudioError('Invalid WOFF2 table size.','font-invalid');};
    for(let i=0;i<count;i++) {
      ensure(at<bytes.length,'Truncated WOFF2 directory.');const flags=bytes[at++], index=flags&63, version=flags>>6;
      let tag=TAGS[index];if(index===63){ensure(at+4<=bytes.length,'Truncated WOFF2 tag.');tag=bytes.toString('ascii',at,at+4);at+=4;}
      const original=base128();let length=original;
      if(tag==='glyf'||tag==='loca'){ensure(version===0||version===3,'Unsupported WOFF2 outline transformation.');if(version===0)length=base128();}
      else {ensure(version===0||(tag==='hmtx'&&version===1),'Unsupported WOFF2 table transformation.');if(version!==0)length=base128();}
      if(tag==='cmap'){ensure(!cmap && original>0,'Invalid WOFF2 cmap.');cmap={offset,length};}
      offset+=length;ensure(offset<=16*1024*1024,'The WOFF2 font expands beyond the safety limit.');
    }
    ensure(cmap && at+compressed<=bytes.length,'The WOFF2 font has no usable cmap.');
    let raw;try{raw=brotliDecompressSync(bytes.subarray(at,at+compressed),{maxOutputLength:16*1024*1024});}catch{throw new StudioError('The WOFF2 compressed tables are invalid.','font-invalid');}
    ensure(raw.length===offset,'Invalid WOFF2 table lengths.');return {cmap:raw.subarray(cmap.offset,cmap.offset+cmap.length),mime:'font/woff2'};
  }
  ensure(bytes.readUInt32BE(0)===0x00010000, 'Unsupported font format; use a valid TTF or WOFF2 face (raw OTF/WOFF/TTC are not supported).');
  const count=bytes.readUInt16BE(4);ensure(count>0&&count<=128&&12+count*16<=bytes.length,'Invalid TTF table directory.');
  let cmap;
  for(let i=0;i<count;i++){const p=12+i*16,start=bytes.readUInt32BE(p+8),length=bytes.readUInt32BE(p+12);ensure(start+length<=bytes.length,'Truncated TTF table.');if(bytes.toString('ascii',p,p+4)==='cmap'){ensure(!cmap,'Duplicate font cmap.');cmap=bytes.subarray(start,start+length);}}
  ensure(cmap,'The font has no cmap.');return {cmap,mime:'font/ttf'};
}
// Read actual Unicode cmap mappings; never infer coverage from CSS unicode-range.
export function inspectFont(input) {
  const bytes=Buffer.from(input);ensure(bytes.length>0&&bytes.length<=MAX_FONT_BYTES,'Each font face must be no larger than 2 MB.');
  try {
    const {cmap,mime}=tableCmap(bytes);ensure(cmap.length>=4&&cmap.readUInt16BE(0)===0,'Invalid font cmap.');const count=cmap.readUInt16BE(2);ensure(count>0&&count<=128&&4+8*count<=cmap.length,'Invalid cmap directory.');
    const points=new Set();let supported=false;
    for(let i=0;i<count;i++){
      const p=4+8*i,platform=cmap.readUInt16BE(p),encoding=cmap.readUInt16BE(p+2),at=cmap.readUInt32BE(p+4);
      if(!(platform===0||(platform===3&&(encoding===1||encoding===10))))continue;
      ensure(at+2<=cmap.length,'Truncated cmap subtable.');const format=cmap.readUInt16BE(at);
      if(format===12){supported=true;ensure(at+16<=cmap.length,'Truncated cmap12.');const length=cmap.readUInt32BE(at+4),n=cmap.readUInt32BE(at+12);ensure(length>=16+12*n&&at+length<=cmap.length&&n<=100000,'Invalid cmap12.');let last=-1;
        for(let j=0;j<n;j++){const q=at+16+j*12,start=cmap.readUInt32BE(q),end=cmap.readUInt32BE(q+4),gid=cmap.readUInt32BE(q+8);ensure(start>last&&end>=start&&end<=0x10ffff,'Invalid cmap range.');last=end;for(let cp=start;cp<=end;cp++)if(gid+cp-start>0&&!(cp>=0xd800&&cp<=0xdfff))points.add(cp);}
      } else if(format===4){supported=true;ensure(at+16<=cmap.length,'Truncated cmap4.');const length=cmap.readUInt16BE(at+2),n=cmap.readUInt16BE(at+6)/2;ensure(Number.isInteger(n)&&n>0&&16+8*n<=length&&at+length<=cmap.length,'Invalid cmap4.');const ends=at+14,starts=ends+2*n+2,deltas=starts+2*n,ranges=deltas+2*n;let last=-1;
        for(let j=0;j<n;j++){const start=cmap.readUInt16BE(starts+2*j),end=cmap.readUInt16BE(ends+2*j),delta=cmap.readInt16BE(deltas+2*j),range=cmap.readUInt16BE(ranges+2*j);ensure(start>last&&end>=start,'Invalid cmap4 segments.');last=end;for(let cp=start;cp<=end&&cp<65535;cp++){let gid;if(range){const q=ranges+2*j+range+2*(cp-start);ensure(q+2<=at+length,'Invalid cmap glyph offset.');gid=cmap.readUInt16BE(q);if(gid)gid=(gid+delta)&65535;}else gid=(cp+delta)&65535;if(gid&&!(cp>=0xd800&&cp<=0xdfff))points.add(cp);}}
      }
    }
    ensure(supported&&points.size,'This font has no supported Unicode cmap (format 4 or 12 required).');
    for(let cp=32;cp<=126;cp++)ensure(points.has(cp),'The selected face does not cover the fixed basic Latin repertoire.');
    const coverage=[];for(const cp of [...points].sort((a,b)=>a-b)){const tail=coverage.at(-1);if(tail&&tail[1]+1===cp)tail[1]=cp;else coverage.push([cp,cp]);}
    ensure(coverage.length<=4096,'The font cmap is too fragmented.');return {mime,bytes:bytes.length,sha256:fontDigest(bytes),coverage};
  } catch(error){if(error instanceof StudioError)throw error;throw new StudioError('The font tables are malformed or unsupported.','font-invalid');}
}

export function cssUrlFor(font) {
  // No text= subsetting: request the full public Latin subset, never campaign copy.
  return `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font.family).replace(/%20/g,'+')}:wght@${font.weights.join(';')}&display=swap`;
}
export async function fetchBounded(url, maxBytes, {fetcher=globalThis.fetch,signal,timeoutMs=15000,kind='font',licenseUrl}={}) {
  const parsed=new URL(url);
  ensure(parsed.protocol==='https:'&&!parsed.username&&!parsed.password&&!parsed.port&&(
    kind==='css'?parsed.hostname==='fonts.googleapis.com'&&parsed.pathname==='/css2':
    kind==='license'?url===licenseUrl&&parsed.hostname==='raw.githubusercontent.com'&&/^\/google\/fonts\/main\/ofl\/[a-z0-9]+\/OFL.txt$/.test(parsed.pathname):
    parsed.hostname==='fonts.gstatic.com'&&!parsed.search&&!parsed.hash&&/^\/s\/[A-Za-z0-9/_.,-]+\.(?:ttf|woff2)$/.test(parsed.pathname)
  ),'The font provider returned an unapproved URL.');
  const abort=new AbortController();const cancel=()=>abort.abort();signal?.addEventListener('abort',cancel,{once:true});if(signal?.aborted)abort.abort();const timeout=setTimeout(cancel,timeoutMs);
  let reader;
  try {
    const response=await fetcher(url,{method:'GET',redirect:'error',signal:abort.signal,headers:{'user-agent':'Mozilla/5.0 Chrome/120.0.0.0 Safari/537.36'}});
    ensure(response.ok&&!response.redirected&&response.status<300,'The font provider could not supply the selected family.');
    ensure(Number(response.headers.get('content-length')||0)<=maxBytes,'The font provider response exceeds the safety limit.');reader=response.body?.getReader();ensure(reader,'The font provider returned an empty response.');
    let size=0;const chunks=[];
    // Race the whole streamed body too: an injected/nonconforming transport must not hang imports.
    const read=async()=>{while(true){const part=await reader.read();if(part.done)break;size+=part.value.length;ensure(size<=maxBytes,'The font provider response exceeds the safety limit.');chunks.push(part.value);}return Buffer.concat(chunks);};
    return await Promise.race([read(),new Promise((_,reject)=>{if(abort.signal.aborted)reject(new Error('aborted'));else abort.signal.addEventListener('abort',()=>reject(new Error('aborted')),{once:true});})]);
  } catch(error){if(error instanceof StudioError)throw error;throw new StudioError('The font download failed or timed out. No font was imported.','font-download');}
  finally{clearTimeout(timeout);signal?.removeEventListener('abort',cancel);if(reader){try{await reader.cancel();}catch{}try{reader.releaseLock();}catch{}}abort.abort();}
}
export async function downloadCatalogFamily(catalogId, options={}) {
  const font=getCatalogFont(catalogId);ensure(font,'Choose a font from the curated catalogue.');
  const cssUrl=cssUrlFor(font), css=(await fetchBounded(cssUrl,128*1024,{...options,kind:'css'})).toString('utf8');
  const notice=(await fetchBounded(font.licenseUrl,64*1024,{...options,kind:'license',licenseUrl:font.licenseUrl})).toString('utf8');
  ensure(/SIL OPEN FONT LICENSE Version 1\.1/i.test(notice)&&notice.includes('Copyright'),'The curated font licence could not be verified.');
  const blocks=[...css.matchAll(/@font-face\s*\{([^}]+)\}/g)].map(m=>m[1]);const files=new Map(),faces=[];let total=0;
  for(const weight of font.weights){
    const block=blocks.find(b=>/font-style:\s*normal\s*;/.test(b)&&new RegExp(`font-weight:\\s*${weight}\\s*;`).test(b)&&(/unicode-range:\s*U\+0{1,4}-0{0,2}FF\b/i.test(b)||!b.includes('unicode-range:')));
    ensure(block,'The provider did not return the approved normal Latin weights.');
    const family=/font-family:\s*['"]?([^;'"\n]+)['"]?\s*;/.exec(block);ensure(family&&family[1]===font.family,'The provider returned a different font family.');
    const urls=[...block.matchAll(/url\(\s*['"]?([^)'"\s]+)['"]?\s*\)/g)];ensure(urls.length===1,'The font stylesheet has an unsupported source.');const url=urls[0][1];
    if(!files.has(url)){const bytes=await fetchBounded(url,MAX_FONT_BYTES,options);total+=bytes.length;ensure(total<=MAX_FAMILY_BYTES,'The family exceeds the 8 MB import limit.');files.set(url,{...inspectFont(bytes),dataUrl:`data:${tableCmap(bytes).mime};base64,${bytes.toString('base64')}`,sourceUrl:url});}
    faces.push({weight,style:'normal',...files.get(url)});
  }
  return {family:font.family,catalogId:font.id,source:'google-fonts',license:'SIL OFL 1.1',licenseUrl:font.licenseUrl,licenseNotice:notice,provenance:{cssUrl,licenseUrl:font.licenseUrl,fetchedAt:new Date().toISOString()},faces};
}
export function verifyFontFile(record, face, companyId) {
  ensure(record&&record.companyId===companyId&&record.id===face.assetId&&record.bytes===face.bytes,'The cached font does not belong to this family.');
  const match=/^data:(font\/(?:woff2|ttf));base64,([A-Za-z0-9+/]+={0,2})$/.exec(record.dataUrl);
  ensure(match&&match[1]===face.mime&&match[2].length%4===0,'The cached font format is invalid.');const bytes=Buffer.from(match[2],'base64');
  ensure(bytes.length===face.bytes&&bytes.length<=MAX_FONT_BYTES&&bytes.toString('base64')===match[2]&&fontDigest(bytes)===face.sha256,'The cached font integrity check failed.');return {dataUrl:record.dataUrl,...face};
}
