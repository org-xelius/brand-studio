// Protect original v2 kernels and retained artwork during additive v3 work.
// Fingerprints do not replace actual old-scene pixel-parity browser tests.
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('../',import.meta.url));
const baseline=JSON.parse(await readFile(path.join(root,'tests/v2-baseline.json'),'utf8'));
for(const [file,expected] of Object.entries(baseline.hashes)){
 const actual=createHash('sha256').update(await readFile(path.join(root,file))).digest('hex');
 if(actual!==expected)throw new Error(`Existing v2 baseline changed: ${file}`);
}
console.log(`Passed ${Object.keys(baseline.hashes).length} retained v2 source/artwork fingerprint checks.`);
