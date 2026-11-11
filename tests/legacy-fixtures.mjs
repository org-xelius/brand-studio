import {existsSync} from 'node:fs';
import path from 'node:path';
// Legacy compiler2/3 proofs require the original owner-supplied photographs.
// They are intentionally not committed: point BS_LEGACY_FIXTURES at a folder
// containing storin-existing-background.png and storin-manually-masked-synthetic.png.
export const legacyFixtureDir=process.env.BS_LEGACY_FIXTURES||'';
export function legacyFixture(name){
 if(!legacyFixtureDir)return null;
 const file=path.resolve(legacyFixtureDir,name);
 return existsSync(file)?file:null;
}
export const legacyFixturesReady=()=>Boolean(legacyFixture('storin-existing-background.png')&&legacyFixture('storin-manually-masked-synthetic.png'));
export const legacyFixtureHint='Legacy compiler2/3 proofs need BS_LEGACY_FIXTURES pointing at the owner-supplied photographs (see tests/fixtures/README.md).';
