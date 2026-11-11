# Brand Studio flexible compositions — approved implementation contract

## Direction contract
THESIS: company art direction constrains real structural variety; no opaque labels behind brand/headline/body. The editor remains an Operate surface with native Harness typography, blue controls and established themes. Artwork is the editable output, not a UI redesign.
OWN-WORLD: Storin proposed warm-gold creative modular vocabulary; Xelius supplied indigo research/editorial vocabulary, meaningful conceptual diagrams, no invented data. Palette/font ownership stays with company/user. No company-name logic in renderer.
STORY: choose a company language, vary new posts coherently, explicitly edit layout/motif/CTA, inspect the actual native bitmap and review/export those exact bytes.
FIRST VIEWPORT: preserve current editor and Words/Look/Assets tabs. Look gains arrangement previews, literal motif opacity and independent CTA controls. Existing compiler2 drafts show explicit upgrade action rather than changing silently.
FORM: approved six-family/three-per-brand proposal; code-led extension, seed: none (user-pinned plan).
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Ownership
- Domain worker: composition-model.js (shared pure catalog/schema/profile helpers); poster-model.js; model.js; new domain tests. No client/renderer/build/package edits.
- Renderer worker: motif-resources.js (trusted SVG source strings+hash metadata), assets/motifs/*.svg, layout kernel/resources, src/poster-renderer-flex.js, src/compositor.js; new native tests/proof/board producer. No poster-model/model/client/build/package edits. May start a focused SVG child if helpful, but own integration.
- Parent: client and styles, optional src/flexible-controls.jsx, UI tests, build/package/docs/evidence/deploy. Integration fixes after workers complete.
- Old renderer files src/poster-renderer.js, src/poster-renderer-v3.js, src/poster-renderer-crisp.js MUST NOT CHANGE. Current crisp SHA256 bc8b200bb85c5cf456505b7dfeefef3038acde03fd6841332c28ff60700fe10b. Preserve all v2/v3 baselines and existing evidence.

## Shared contract (coordinate before changing)
Poster version remains3; new explicit root compilerVersion=3. Never inject new defaults into compiler1/2. Leave upgradePoster->compiler2 behavior frozen. New exports from poster-model.js: DEFAULT_POSTER_FLEX and upgradePosterFlexible(options). New default factory uses3; explicit existing supplied posters remain as supplied. Old options normalize/resolve exactly as before.

New compiler3-only poster groups (format partial overrides deep-merge; selector only root):
- composition: {layout:'lateral',version:1,density:'balanced',profile:null}. Layout IDs lateral/broadside/specimen/centered/spread/cover. Density compact/balanced/generous. profile optional frozen provenance {id,version,sha256,ordinal}; domain worker may enrich with validated snapshot if necessary and must announce.
- motif: {id:'none',opacity:0.15,color:'auto',x:0.75,y:0.65,scale:1,rotation:0}. IDs none/ribbon-v1/orbit-v1/proof-marks-v1/responsive-frames-v1/answer-exchange-v1/research-folio-v1/decision-junction-v1/interface-modules-v1. color auto/primary/accent/ink/paper. x/y0..1; scale0.25..2; rotation-180..180; literal opacity0..1.
- cta: {style:'strip',width:'full',align:'left',paddingX:24,paddingY:16,fill:{mode:'palette',value:'accent'},text:{mode:'auto'},arrow:true}. style strip/rectangle/rounded/pill/outline/text; width fit/full; align left/center/right; paddingX0..64,paddingY0..40. ColourSpec palette {mode:'palette',value:primary|accent|ink|paper}, custom {mode:'custom',value:'#RRGGBB'}, text also {mode:'auto'}. No fill auto. Outline uses fill setting as stroke; text ignores fill. Auto chooses higher-contrast company ink/paper.
- textColors: {headline:'auto',body:'auto',brand:'auto',kicker:'auto'}; values auto/primary/accent/ink/paper.
Legacy details fields remain valid for normalized storage but new compiler does not use details.motif/action/strength to control new motif/CTA. Preserve details.text as local font-rendered annotation; surface/strength may continue overall tonal-field controls. No contradictory active legacy motif/action controls in new UI. Explicit upgrade maps legacy motif and action ONCE; opacity .25+.65*old strength; annotation and all existing copy/fonts/assets retained. New default can use lower headline size authored for actual family, never silently shrink explicit sizes.

composition-model.js shared exports requested by parent:
- LAYOUTS array {id,label,description,version:1}; MOTIF_OPTIONS array {id,label,description}; CTA_STYLES array {id,label}; PALETTE_ROLES array strings; PROFILE_PRESETS array {id,label,description,profile}; normalizeCompositionProfile(value); applyCompositionProfile(poster,profile,ordinal=0) -> normalized flexible poster-compatible raw fields (must not introduce circular imports; can return merged object for caller normalizePoster).
- Profile shape: {version:1,id:'creative-modular'|'research-editorial'|'custom',layouts:[ids],motifs:[ids including none],density:'balanced',motifOpacity:0.15,cta:{...full CTA group},vary:false}. Parent preview/intake edits these. At least1 layout/motif; strict bounded lists unique; palette roles references, no invented brand colours. First3 families creative, last3 research. No materialized profile on read of old companies.
- Root optional company.compositionProfile outside brandKit; omission-preserving company.save. Render/review fingerprint excludes only this new future-only metadata. Rotation optional state compositionCursors map by company; increment in same creation command, no reroll on read/save/format, idempotent plan.ensure. Campaign saved artDirection wins. Concrete options frozen per-post.

Trusted resources module motif-resources.js owned renderer worker exports MOTIF_RESOURCES mapping id->{id,version:1,sha256,viewBox,svg}; no none entry. Metadata exact SVG source hash. Recolour trusted currentColor with validated hex only, independent layer globalAlpha once. SVG download helper export motifSvg(id,colour,opacity=1) -> standalone source or parent builds same transformation. No arbitrary uploaded SVG or network/font/script/foreignObject in sources. Keep files and JS strings byte-identical, automated test.
Renderer worker also exports LAYOUT_RESOURCES from src/layout-kernel-flex.js or separate pure metadata module; tell domain exact import. Each record id,version,sha256 trusted immutable source/geometry digest. Domain may temporarily implement options binding before resources ready, then wire exact scene/receipt proofs when imports land.

New renderer export renderPosterFlexible(canvas,resources), same arguments/result as crisp. Manifest rendererVersion3/compilerVersion3/options/copy/fonts/assetReferences unchanged contracts. Add manifest.layout {id,version,sha256}; manifest.motif selected metadata incl id/version/sha256/viewBox/opacity/transform/painted (none uses null sha); manifest.cta geometry/style/fill/text colours/shape bounds; manifest.protection textRendering fill-only/textBlocks[]/foregroundExclusions[]/nonCtaBackground none. Freeze scene.resources authoritative layout+motif metadata and validate against trusted catalog, not two untrusted client copies. Coordinate exact names via message.

## Six families
lateral: copy left-middle, image/motif right, CTA below copy.
broadside: upper headline, lower-left motif/visual, lower-right CTA.
specimen: central complete original/illustration, lower-left headline, upper-right CTA.
centered: centered title/copy and CTA underneath, edge motif.
spread: narrower right reading column, lower/left illustration/photo, CTA in column.
cover: generous upper visual, lower-left type and lower-right CTA.
Author4format reflows; protect originals by contain. Editorial stays type-only; Showcase requires complete original. Reserve quiet copy zones, don't punch rectangular photo holes. Actual foreground collision blocks/requires move rather than clipping content away. Non-CTA fill only; no plates/halos; original logo source untouched. Actual composited opaque-glyph-interior contrast min4.5:1, choose auto ink/paper by same metric, fail with recovery not plates. Human review still needed, no WCAG certification claim.

## Verification / scope
No paid generation, credential/profile writes, new server, or queued-job retries. Future compiler3 prompts respect layout's visual/quiet zones and leave motifs/charts/labels out of image pixels; old prompt/snapshot path exact. All31 old fingerprints + current crisp2 source/proofs unchanged. Validate all8 SVGs structurally and measured via skill validator; raster inspect, then native end-use inspection. New native48 cases (2brands x6families x4formats), opacity endpoints,6CTAs, tamper/scene/font/profile/rotation tests and nativeDPR/Blob identity. Existing old-default tests may need explicit compiler2 fixture where testing old rendering; do not weaken legacy assertions. First batch proofs then one bounded material repair round. Isolated fixtures vs signed-in existing GUI acceptance clearly distinguished.
