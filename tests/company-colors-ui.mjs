// Isolated real React/model + shipped host CSS. No live GUI, credentials or provider calls.
// Reuse the matrix bootstrap IN MEMORY; never edit it or run its broader suite/capture loop.
import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {build} from 'esbuild';
import {chromium,expect} from '@playwright/test';
import {createState,applyCommand,addAsset,addFont} from '../model.js';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const output=path.join(root,'output/playwright/company-colors');
const matrix=await fs.readFile(path.join(root,'tests/ui-v4-matrix.mjs'),'utf8');
const marker="const phase=process.env.BS_UI_MATRIX||'checks';";
if(!matrix.includes(marker))throw Error('Matrix bootstrap boundary changed; review before reusing.');
let prefix=matrix.slice(0,matrix.indexOf(marker)).replace(/^import .*\n/gm,'').replace(/^const root=.*\n/m,'');
prefix=prefix.replace("process.env.BS_UI_OUTPUT||'output/playwright/v4-ui'","'output/playwright/company-colors'");
const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
const boot=new AsyncFunction('fs','path','createHash','build','chromium','expect','createState','applyCommand','addAsset','addFont','root',prefix+'\nreturn {page,browser,commands,calls,errors,command,getState:()=>state,reset:()=>{state=createState();commands.length=0;calls.length=0;}};');
const harness=await boot(fs,path,createHash,build,chromium,expect,createState,applyCommand,addAsset,addFont,root);
const {page,browser,commands,calls,errors,command,getState,reset}=harness;
reset();
const first=command('company.save',{name:'Palette fixture',description:'Isolated company-colour form fixture.',color:'#17694e',timezone:'UTC',weekStart:1,brandKit:{voice:'impact',accent:'#d36132',ink:'#171717',paper:'#f7f5ef',poster:{version:3,recipe:'editorial',voice:'impact',details:{motif:'ribbon',text:'Supplied fixture'}}}}).id;
const second=command('company.save',{name:'Other company fixture',description:'Independent palette.',color:'#285fc5',timezone:'UTC',brandKit:{accent:'#8833aa',ink:'#202020',paper:'#ffffff',voice:'clean'}}).id;
const legacy=command('company.save',{name:'Legacy fixture',description:'No brand kit stored.',color:'#315d72',timezone:'UTC'}).id;
const inherited=command('company.save',{name:'Inherited ink fixture',description:'Missing accent follows ink.',color:'#284b36',timezone:'UTC',brandKit:{voice:'clean',ink:'#303030',poster:{version:3,voice:'clean'}}}).id;
const absent=command('company.save',{name:'Absent roles fixture',description:'Existing voice and poster, absent colours.',color:'#284b36',timezone:'UTC',brandKit:{voice:'clean',poster:{version:3,voice:'clean'}}}).id;
commands.length=0;
const row=id=>getState().companies.find(c=>c.id===id);
const baseline={second:structuredClone(row(second)),firstKit:structuredClone(row(first).brandKit),inherited:structuredClone(row(inherited)),absent:structuredClone(row(absent))};
const labels=['Primary colour','Accent colour','Brand ink','Brand paper'];
const picker=label=>page.getByLabel(label,{exact:true});
const dialog=page.getByRole('dialog');
const checks=[],metrics=[],captures=[];
async function values(){return Promise.all(labels.map(label=>picker(label).inputValue()));}
async function open(id=first){await page.getByLabel('Active company',{exact:true}).selectOption(id);await page.getByRole('button',{name:'Company guidelines',exact:true}).click();await expect(dialog).toBeVisible();}
async function close(){await page.getByRole('button',{name:'Close dialog',exact:true}).click();await expect(dialog).toHaveCount(0);}
async function save(){await dialog.getByRole('button',{name:/^(Save guidelines|Create company)$/}).click();await expect(dialog).toHaveCount(0);}
async function settle(){await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));}
async function configure(theme,width,zoom=1){await page.setViewportSize({width,height:width===390?844:1000});await page.evaluate(({theme,zoom})=>{document.documentElement.dataset.dsThemeSource=theme;document.body.toggleAttribute('data-ds-dark-theme',theme==='dark');document.documentElement.style.zoom=String(zoom);},{theme,zoom});await settle();}
async function frame(){const geometry=await dialog.evaluate(el=>{const box=n=>{const r=n.getBoundingClientRect();return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height}};return {width:innerWidth,height:innerHeight,dialog:box(el),title:box(el.querySelector('h2')),close:box(el.querySelector('[aria-label="Close dialog"]')),overflow:el.scrollWidth>el.clientWidth+1,focusWithin:el.contains(document.activeElement)}});for(const name of ['dialog','title','close']){expect(geometry[name].left).toBeGreaterThanOrEqual(-.5);expect(geometry[name].right).toBeLessThanOrEqual(geometry.width+.5);expect(geometry[name].top).toBeGreaterThanOrEqual(-.5);expect(geometry[name].bottom).toBeLessThanOrEqual(geometry.height+.5);}expect(geometry.overflow).toBe(false);expect(geometry.focusWithin).toBe(true);return geometry;}
try{
 await page.goto('https://brand-studio.test/');page.setDefaultTimeout(8000);
 await expect(page.getByRole('button',{name:'Company guidelines',exact:true})).toBeVisible();
 await open();
 const group=page.getByRole('group',{name:'Brand colours',exact:true});await expect(group).toBeVisible();
 expect(await dialog.locator('input[type=color]').count()).toBe(4);expect(await dialog.locator('details input[type=color]').count()).toBe(0);
 for(const label of labels){await expect(picker(label)).toBeVisible();await expect(picker(label)).toHaveAttribute('type','color');expect(await picker(label).evaluate(el=>!!el.id&&el.closest('label').htmlFor===el.id)).toBe(true);}
 await expect(page.getByLabel('Poster typography',{exact:true})).toBeHidden();
 const changed=['#247358','#cb523a','#232a31','#f2ead6'];
 let expected=await values();
 for(let i=0;i<labels.length;i++){await picker(labels[i]).fill(changed[i]);expected[i]=changed[i];expect(await values()).toEqual(expected);await expect(picker(labels[i]).locator('..').locator('.bs-colour-hex')).toHaveText(changed[i]);}
 await save();await open();expect(await values()).toEqual(changed);
 expect(row(first).color).toBe(changed[0]);expect(row(first).brandKit).toEqual({...baseline.firstKit,accent:changed[1],ink:changed[2],paper:changed[3]});
 await page.getByText('Optional brand details',{exact:true}).click();await expect(page.getByLabel('Poster typography',{exact:true})).toHaveValue('impact');await close();
 expect(row(second)).toEqual(baseline.second);await open(second);expect(await values()).toEqual(['#285fc5','#8833aa','#202020','#ffffff']);await close();
 checks.push('Four independent native colour fields, visible hex, associated Field labels, always discoverable outside optional details','Save/reopen retains all four values and existing voice/poster; another company remains unchanged');
 await open(legacy);expect(await values()).toEqual(['#315d72','#171717','#171717','#f7f5ef']);expect(Object.hasOwn(row(legacy),'brandKit')).toBe(false);await close();expect(Object.hasOwn(row(legacy),'brandKit')).toBe(false);
 await open(legacy);await save();expect(Object.hasOwn(commands.at(-1).data,'brandKit')).toBe(false);expect(Object.hasOwn(row(legacy),'brandKit')).toBe(false);
 await open(absent);expect(await values()).toEqual(['#284b36','#171717','#171717','#f7f5ef']);await picker('Primary colour').fill('#3c6151');await save();expect(row(absent).brandKit).toEqual(baseline.absent.brandKit);expect(commands.at(-1).data.brandKit).toEqual(baseline.absent.brandKit);
 await open(inherited);expect(await picker('Accent colour').inputValue()).toBe('#303030');await picker('Brand ink').fill('#454545');expect(await picker('Accent colour').inputValue()).toBe('#454545');expect(row(inherited)).toEqual(baseline.inherited);await close();expect(row(inherited)).toEqual(baseline.inherited);
 await open(inherited);await picker('Accent colour').fill('#aa5533');await save();expect(row(inherited).brandKit).toEqual({...baseline.inherited.brandKit,accent:'#aa5533'});await open(inherited);await picker('Brand ink').fill('#454545');expect(await picker('Accent colour').inputValue()).toBe('#aa5533');await close();
 checks.push('Legacy absent kit/roles display renderer-effective fallbacks without materialization on open, cancel, unchanged save or unrelated primary edit','Missing accent follows effective ink until explicitly edited; explicit accent stays independent; draft changes do not mutate saved record');
 await page.getByRole('button',{name:'Add company',exact:true}).click();expect(await values()).toEqual(['#17694e','#171717','#171717','#f7f5ef']);await page.getByLabel('Company name',{exact:true}).fill('New palette fixture');await page.getByLabel('What do you sell or do?',{exact:true}).fill('Isolated new-company defaults.');await save();const created=getState().companies.at(-1);expect(created.brandKit).toEqual({accent:'#171717',ink:'#171717',paper:'#f7f5ef'});expect(created.color).toBe('#17694e');await open(created.id);expect(await values()).toEqual(['#17694e','#171717','#171717','#f7f5ef']);await close();checks.push('New-company defaults are explicit, persisted and reopen correctly');
 // Positive behavioural checks at every intended capture geometry BEFORE the one capture batch.
 for(const theme of ['light','dark'])for(const width of [1320,390]){await configure(theme,width);await open();const geometry=await frame();expect(await values()).toEqual(changed);const columns=await group.locator('.bs-two-fields').evaluate(el=>getComputedStyle(el).gridTemplateColumns.split(' ').length);expect(columns).toBe(width===390?1:2);await expect(page.locator('.bs')).toHaveAttribute('data-bs-accent','blue');metrics.push({theme,width,columns,geometry});await close();}
 await configure('light',390,2);await open();metrics.push({theme:'light',width:390,cssZoom:2,geometry:await frame()});await page.keyboard.press('Tab');await frame();
 async function focusedControlBounds(control,label){
  await expect(control).toBeFocused();await settle();
  const geometry=await control.evaluate(el=>{const box=n=>{const r=n.getBoundingClientRect();return {left:r.left,right:r.right,top:r.top,bottom:r.bottom}};const modal=el.closest('dialog');return {control:box(el),header:box(modal.querySelector('.bs-modal-head')),dialog:box(modal),width:innerWidth,height:innerHeight,overflow:modal.scrollWidth>modal.clientWidth+1};});
  expect(geometry.control.top,label+' below sticky header').toBeGreaterThanOrEqual(geometry.header.bottom-.5);
  expect(geometry.control.bottom,label+' inside dialog').toBeLessThanOrEqual(geometry.dialog.bottom+.5);
  expect(geometry.control.top).toBeGreaterThanOrEqual(0);expect(geometry.control.bottom).toBeLessThanOrEqual(geometry.height+.5);
  expect(geometry.control.left).toBeGreaterThanOrEqual(Math.max(0,geometry.dialog.left)-.5);expect(geometry.control.right).toBeLessThanOrEqual(Math.min(geometry.width,geometry.dialog.right)+.5);
  expect(geometry.overflow).toBe(false);metrics.push({label,cssZoom:2,focusedGeometry:geometry});
 }
 for(const label of labels){await picker(label).focus();await focusedControlBounds(picker(label),label);}
 const saveGuidelines=dialog.getByRole('button',{name:'Save guidelines',exact:true});
 // Traverse the actual tab sequence after Brand paper, not pointer-assisted scrolling.
 for(let step=0;step<8&&!await saveGuidelines.evaluate(el=>el===document.activeElement);step++)await page.keyboard.press('Tab');
 await focusedControlBounds(saveGuidelines,'Save guidelines');
 checks.push('390px 200%-CSS-zoom: each of four focused native pickers and keyboard-reached Save guidelines scroll fully below sticky header inside dialog/viewport without horizontal overflow');
 await page.keyboard.press('Escape');await expect(dialog).toHaveCount(0);
 checks.push('Light/dark desktop/mobile retain Harness blue, two columns desktop and one mobile','Native modal title/close/focus fit viewport including 390px at 200% CSS zoom; Escape closes');
 expect(calls.every(c=>['state','status','command'].includes(c))).toBe(true);expect(commands.every(c=>c.type==='company.save')).toBe(true);expect(errors).toEqual([]);
 console.log('POSITIVE CHECKS PASSED; beginning single capture batch.');
 if(process.env.BS_COMPANY_COLORS_CAPTURE==='1'){
  for(const theme of ['light','dark'])for(const width of [1320,390]){await configure(theme,width);await open();const filename=`initial-company-dialog-${theme}-${width===390?'mobile':'desktop'}.png`;await page.screenshot({path:path.join(output,filename)});captures.push(filename);await close();}
  await configure('light',390,2);await open();const filename='initial-company-dialog-light-mobile-200percent.png';await page.screenshot({path:path.join(output,filename)});captures.push(filename);await close();
 }
 const report={passed:true,checks,metrics,captures,scope:'Isolated actual React + actual model + shipped host styles, full Chromium channel. No authenticated live GUI claim; 200% is CSS zoom, not browser zoom. Only four company colour roles; no paid generation, key/provider/profile calls.',calls,commands:commands.map(c=>({type:c.type,companyId:c.data.id||'new'}))};
 await fs.writeFile(path.join(output,'company-colors-ui-report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}catch(error){console.error('COMPANY COLOURS UI FAILURE',await page.locator('body').innerText(),errors);throw error;}finally{await browser.close();}
