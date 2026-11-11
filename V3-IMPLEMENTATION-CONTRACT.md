# Approved v3 implementation contract

User approved implementing the next iteration after the archived adversarial critique. Preserve the incumbent forest/slate Operate shell; artwork is company-owned Persuade. Build independent foreground/backdrop, per-role fonts/size and Google Fonts import/cache, coherent detail kit. No paid images in development. Existing standalone original logo/transparent subject/real website screenshot are still missing. Label proof-derived/synthetic assets honestly. No new identity interview or concept tournament: the layered Storin orange/black direction is pinned, applicable to each company's own palette.

## Ownership
- Domain worker: model.js, model.test.js, poster-model.js, poster-model.test.js; optional domain tests. Do not edit host files.
- Renderer worker: preserve src/poster-renderer.js and src/fonts.js v2 behaviour; owns new src/poster-renderer-v3.js, src/fonts-v3.js, compositor routing, renderer tests/harness/fixtures. Only additive v3 dispatch in compositor, no old artwork restyling.
- UI worker: src/client.jsx, src/studio.css, tests/ui-harness*. Read craft floor before UI edits. Own actual browser integration tests.
- Font/host worker: index.js, host.test.js, new font-service.js/font-catalog.js/font-service.test.js. New routes and asset role support. Coordinate model exports with domain worker through parent (siblings messaging is unsupported).
- Parent: contract, package/build, integration, docs, independent final review, deployment.

## Poster schema
Keep normalizePoster default behaviour and DEFAULT_POSTER version2 for compatibility. Add DEFAULT_POSTER_V3, normalizePosterV3, upgradePoster exports in poster-model.js. normalizePoster dispatches explicit version3 to v3, everything existing stays v2. New posts default v3 via inheritedPoster upgrading prior campaign/brand look. Existing v1/v2 records stay unchanged until explicit editable v3 copy. New tests may explicitly request v2 fixtures where historic tests need it.

V3 extends all v2 options, version:3, with:
```
typography: {
 headline: {fontId:'',weight:null,size:null,lineHeight:null,tracking:0},
 body: same, cta: same, kicker: same, brand: same
},
layers: {
 background:{opacity:0.35,blur:0},
 foreground:{x:0.66,y:0.66,scale:1,rotation:0,shadow:0.25},
 headlineDepth:'front' // 'behind' also
},
details:{motif:'none',text:'',surface:'flat',strength:0.25,action:'rail',underline:true}
```
Empty fontId means inherit curated voice. null size/weight/lineHeight means authored recipe default. Explicit sizes are 1080-wide layout units: headline48..260, body20..84, cta20..72, kicker18..64, brand20..64. LineHeight .85..2, tracking -.04...2 em; weight integer100..900 (actual supported selected font validated at render time). IDs max100 safe alphanumeric :_-; imported refs checked against font ownership in domain. Global legacy scale MUST NOT affect all roles in v3; v3 scale is headline-only, role explicit sizes independent, no shrinking CTA when headline changes. V2 UI honestly labels its old scale 'Overall text scale'.
Background opacity0..1, blur0..24, foreground x/y0..1 relative to canvas, scale .4..2, rotation -25..25 degrees, shadow0..1. Existing heroScale/cropX/Y are BACKDROP focus/scale, not foreground. Details motif none|ribbon|orbit, surface flat|tonal, strength0..1, action rail|capsule|text, underline boolean, text max160 supplied words (no invented services). One coherent motif, not a decoration drawer. Partial per-format overrides support deep partial role/layer/detail fields and merge base values, strictly rejecting unknown/out-of-range/malformed input. Keep v2 shallow behaviour unchanged.

Optional company.brandKit.poster stores normalized v3 default look; company/campaign saving and inheritance retain it, no retroactive restyling. Campaign artDirection accepts v2/v3 and new posts upgrade to3.

## Asset roles and scene
New image roles `foreground` and `backdrop` allowed in upload/save, in addition to original roles. `post.foregroundAssetId` optional, own-company foreground OR product allowed. Product/screenshot remains separate via assetIds/productAssetId and protected contain policy. `post.backgroundAssetId` for v3 allows generated OR backdrop; v2 remains generated-only. Empty IDs intentional. Scenes v3 hold {version:3,rendererVersion:3,company,post,fonts:[selected imported font metadata clones]}; selected foregroundAssetId appears on design row AND scene.post. Existing v2 scenes immutable/readable. New local snapshots/type-only no paid job, all relevant inputs affect currentDesign/sourceContent readiness.

Renderer signature remains compose(canvas,{company,post,design,background,logo,product,foreground,fonts,getFont}). Existing callers lacking new resources still work for v1/v2. `fonts` is imported metadata, `getFont(fontId,weight)` async gives {dataUrl,sha256,...face metadata}. For histories pass scene.fonts rather than today's global metadata.

Independent backdrop drawn full field with controlled opacity/blur and brand treatment, original foreground contained then positioned/scaled/rotated independently above it. True alpha respected; warn opaque foregrounds (no fake transparency/background removal), low resolution, clipping/occlusion risk. Artwork can bleed, but protect critical words/logo/action and safe regions. Screenshot showcase is NOT a person cutout; keep full original proportions. Editorial remains type-only except logo; refuse background commissions. v3 showcase may use backdrop as a genuine background layer and so commission is useful; if renderer doesn't implement that, block paid requests. Fix v2 paid request guards for hero with selected original and showcase, since v2 ignores generated backdrop; explain recovery via v3 copy. No image charges on fonts/layout/detail changes.

New v3 generated jobs freeze current v3 company/post/fonts/assets; new output binds scene background to generated ID, no overwrite of current draft selection while user edits.

## Render receipt
V3 compose returns errors/warnings/manifest/hitRegions; manifest lists actual explicit resource IDs, font files/digests/style/size/leading/tracking, resolved text and colours, layer order/transforms and selected recipe/version, not stale latest-design attribution. UI computes SHA256 of captured completed PNG bytes at review and sends design.snapshot `renderReceipt:{manifest,pngSha256}`. Domain validates bounded plain manifest (<=128KB JSON), matching rendererVersion3/format/copy/asset refs where supplied and 64hex PNG digest. Persist as design.renderReceipt, immutable along with scene; require receipt for v3 review, include v3 receipt identity in export guard. This is client-computed reviewed-bitmap receipt, NOT a claim of server-verified PNG retention or universal future pixel replay. Keep old renderer/font bytes for old versions. Generation outputs lack receipt and are unreviewed; explicit current snapshot supplies it.

## Font storage/host APIs
Keep aggregate/storage version1. Optional `state.fonts` array metadata, absent in old states valid. Records per imported FAMILY:
```
{id,companyId,family,catalogId,source:'google-fonts',license:'SIL OFL 1.1',licenseUrl,importedAt,
 faces:[{weight,style:'normal',assetId,sha256,bytes,mime,coverage:[[start,end],...]}]}
```
Coverage is verified actual font cmap, not guessed from family name. Weight exact supported normal style (first iteration no italic UI). fontId in typography refers record.id. Font assets stored as opaque private binary records in EXISTING assets table (schema already allows dataURL, bytes, companyId); do NOT put them into state.assets image list. Existing total96MB library cap includes fonts; per font file max2MB, family import max8MB, max24 imported families per company. Imported file `data:font/woff2;base64,...` or `data:font/ttf;base64,...`. No new storage table/version migration needed. Dedup same company/catalog/style content, no destructive replacement.

Host routes:
- `fonts.catalog` {} -> {families:[{id,family,weights,category,licenseUrl}]} from curated font-catalog.js; local searchable catalogue, NO claim of full live GoogleFonts discovery/APIkey requirement.
- `fonts.import` {companyId,catalogId} -> {state:publicState(),fontId}. Downloads bounded approved normal faces, verifies actualfont bytes/digest/cmap, license metadata. No OpenAI credential or image calls. No arbitrary URLs/CSS in payload; provider URLs HTTPS allowlisted Google CSS/static domains, redirects rejected or revalidated, streamed bytes/timeouts, sanitized errors. Only choose catalog families with verified OFL provenance. Prefer full Latin subset via a fixed non-private repertoire if CSS API text subsetting is used; NEVER send user's draft text. Fetch actual licence notice and retain alongside record if feasible. Cache locally for offline render.
- `fonts.file` {fontId,weight} -> {dataUrl,...face metadata}. Check family/face metadata and binary ownership/hash. Only known imported records; generic image asset route cannot retrieve font metadata.
Domain exports `addFont(state,record)` validating metadata+ownership and returns next state (host persists), `validateFontRecord` if needed; worker coordinate exact exports. Binary-first write cleanup on failed persist best effort; do not leave partial import advertised. Host does not edit model.js.

font-catalog.js pure browser-safe shared module exports FONT_CATALOG array and getCatalogFont(id). Curate8–12 useful normal families with real supported weights (e.g Anton400, Oswald400/600/700, ArchivoBlack400, LibreFranklin400/600/800, RobotoSlab400/600/800, Sora400/600/800). No arbitrary font URLs/custom upload in this iteration. Existing5 bundled voices remain valid default/offline choices.

## Verification and delivery
Full Chromium (channel:'chromium', NOT mac headless-shell) available with PLAYWRIGHT_BROWSERS_PATH=$PWD/output/playwright/browsers cwd brand-studio. No replacement server. Use isolated intercepted fixture origin or bundled file harness. Existing font loaders/dataurl build supported. First implement fully; one batched desktop/mobile/nativePNG inspection, one fixes batch and at most one final visual confirmation. Do not rely on long full-page phone board (previous repeated tile capture).
Test old v1/v2 pixel parity after v3; role font sizes truly independent; owned font/backdrop/foreground rejection; imports malformed URLs/redirect/oversize/dedup/cmap/offline; true alpha foreground showing backdrop and independent controls; actual reviewed PNG receipt/export consistency, no stale async paintings; usable preset/controls at390px. Proof assets must say synthetic/test-derived outside artwork; do not fabricate real logo/screens/team/claims. A manually masked existing generated image may serve as labelled alpha fixture (not an automatic background-removal feature). Preserve all user data; actual storage only via host services, read-only verifier allowed. New paid queue guards reduce wasted commissioning. Finish cold independent review and honest as-built docs/deployment.