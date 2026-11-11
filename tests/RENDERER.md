# Brand Studio v2 renderer evidence

## Interface and ownership

`compose(canvas, {company, post, design, background, logo, product})` stays compatible. Only `post.poster.version === 2` selects the new renderer; it never implicitly adopts `design.scene`. The caller supplies effective snapshot company/post/resources when viewing history. Legacy formats and directions remain exported. `RECIPES` and `VOICES` are additive exports.

V2 returns `{errors, warnings, width, height, generated, manifest, hitRegions}`. Rendering is local: no generation/model/billing operation. The caller must block export for errors and use the already rendered canvas. An internal staging canvas plus per-target render token prevents an older async render overwriting a newer one. The caller still owns saved/reviewed version and draft-token checks.

The manifest includes renderer/recipe versions, exact source copy, effective format options, semantic palette, pinned font hashes, font family/weight, resolved text lines and declared size floors, original-asset placements/crop, safe preset, and supplied design asset references. Layer boxes and asset placements use 1080-wide layout units; `coordinateSpace.pixelScale` maps them to output pixels. Type sizes and hit regions are output pixels.

## Reproduce

```sh
node tests/renderer-harness.build.mjs
PLAYWRIGHT_BROWSERS_PATH="$PWD/output/playwright/browsers" node --test tests/renderer.test.mjs tests/renderer-visual.test.mjs
```

The visual test explicitly launches full Chromium with `channel: 'chromium'`. On this macOS environment the downloaded headless-shell stalled on native canvas operations; tiny JS/module/large-string probes worked, while native canvas export did not. Full Chromium resolved this. Do not mistake that shell failure for a font or renderer failure. No replacement web server is used.

The build creates a fully self-contained `output/playwright/renderer/proofs.html`, also usable independently. Automation injects its exact HTML into Chromium, avoiding any dependency on GUI authentication. It exposes `window.__posterProofs` and `window.__posterProofsReady`.

## Verified 10 November 2026

- Six Node/browser tests pass (five pure boundary tests plus the browser acceptance test).
- Twelve separately authored recipe × ratio examples render with no technical errors: hero/showcase/editorial, each square/portrait/story/landscape.
- Three real display/body voices load from bundled data URLs: League Spartan / Source Sans 3, Barlow Condensed / Source Sans 3, Archivo / Manrope. Five original files with adjacent SIL OFL licenses and provenance hashes.
- Zero HTTP(S) requests while rendering the proof page.
- Exact manual line breaks, long-headline overflow, unbreakable URL overflow, invalid voice, genuinely unavailable font, broken original asset, unsupported scripts and absent punctuation are exercised.
- The declared font whitelist was checked against the intersection of all five actual font cmaps. Absent U+2010/U+2011/U+2012/U+2015/U+201B are blocked; tests pin that regression.
- Original screenshots are fully contained with uncropped aspect ratio, never replaced by generated backgrounds. Wide and tall original-logo aspect ratios are preserved.
- All proof hit regions stay inside the declared conservative safe region, and resolved text does not fall below its declared floor.
- PNG encode/decode reproduces every preview pixel exactly; repeated renders are deterministic.
- Legacy composition remains selected even when a v2 `design.scene` is passed alongside a legacy post.
- Two bounded visual rounds completed: initial full-resolution masters plus desktop board, one batched repair, then final full-resolution story/landscape checks and final board. Mechanical design detector returned no findings for the three renderer source files.

Artifacts: 12 native-resolution PNGs, `board-desktop.png`, `manifest.json`, and `checks.json`, alongside the self-contained HTML. They are test specimens, not customer-approved campaign exports. `board-phone.png` was also captured, but cold review identified a repeated-header/tile capture artifact down its height; it is unreliable and must not be published or treated as twelve-proof evidence. Rely on the desktop twelve-proof board, native PNGs, and the coordinator’s separate narrow-viewport UI evidence.

## Truth and limitations

The hero proof reuses a supplied previously generated Storin background; no new paid generation occurred. The device screen is explicitly labeled **SYNTHETIC SCREEN — RENDERER FIXTURE**, not a real customer website or evidence of a shipped feature. Replace it with an original screenshot. No original Storin logo was supplied; “Storin” is openly typeset company-name text, not a reconstruction of a logo. Editorial text is neutral renderer-specimen information, not a new commercial claim.

Coverage is deliberately Western European Latin plus verified punctuation; unsupported scripts/combining marks/emoji block export rather than silently using fallback glyphs. More scripts require licensed subsets and new tests. Editorial is currently intentionally type-led and warns when background/product selections are unused. Showcase is a tested straight-on browser frame, not an untested perspective/3D mapping. Opaque hero images remain rectangular; no false cutout/behind-subject masking is simulated. Extreme tall logos retain proportions but may need an alternate original for practical optical size. Safe regions are a named conservative Brand Studio preset, not universal platform certification. Installed signed-in GUI save/reopen/review/download acceptance remains the coordinator’s task; this harness does not certify it.
