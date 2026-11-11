// Read-only compatibility proof against a specified existing aggregate.
// Never opens Harness credentials, makes a network call, or writes profile data.
import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {validateState,applyCommand} from '../model.js';
const path=process.argv[2];assert.ok(path,'Pass an existing brand_studio JSON path.');
const raw=await readFile(path,'utf8'),saved=JSON.parse(raw).tables.state.main;
validateState(saved);
assert.equal(saved.version,1);
const first=saved.posts[0];
if(first){
 const before=JSON.stringify(saved);
 let r=applyCommand(saved,'post.save',{id:first.id,poster:{version:2,recipe:'hero'}}),state=r.state;
 assert.equal(JSON.stringify(saved),before,'input state not mutated');
 assert.deepEqual(state.designs,saved.designs,'existing design rows unchanged');
 assert.deepEqual(state.jobs,saved.jobs,'existing paid-job history unchanged');
 const background=saved.assets.find(a=>a.companyId===first.companyId&&a.role==='generated');
 r=applyCommand(state,'design.snapshot',{postId:first.id,assetId:background?.id||'',format:'story'});state=r.state;
 const design=state.designs.find(d=>d.id===r.id);assert.equal(design.scene.version,2);
 const frozen=JSON.stringify(design.scene);const company=state.companies.find(c=>c.id===first.companyId);
 state=applyCommand(state,'company.save',{...company,color:company.color==='#112233'?'#334455':'#112233'}).state;
 assert.equal(JSON.stringify(state.designs.find(d=>d.id===design.id).scene),frozen,'historical scene not restyled');
 assert.equal(state.jobs.length,saved.jobs.length,'local edits create no paid job');
}
assert.equal(await readFile(path,'utf8'),raw,'profile file never modified');
console.log(JSON.stringify({result:'passed',companies:saved.companies.length,campaigns:saved.campaigns.length,posts:saved.posts.length,existingDesigns:saved.designs.length,existingJobs:saved.jobs.length,profileWrites:0,providerCalls:0}));
