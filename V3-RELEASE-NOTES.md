# Brand Studio v3 — as-built release notes

Documentation checkpoint: **10 November 2026**. Scope follows the [approved implementation contract](<V3-IMPLEMENTATION-CONTRACT.md>). **V0.3.0 was built and reactivated through Harness Plugin Manager; the installed host fibre is active.** Independent final source/artifact review closed with no remaining material implementation defect in the reviewed scope. The user confirmed “The v3 preview and PNG export work.” On the subsequent retry, the host remained active, all 83 unit tests passed again, actual-profile compatibility passed (2 posts / 6 designs / 6 jobs, zero verifier writes/provider calls), and all 14 v2 fingerprints were unchanged. The existing GUI and font endpoint return HTTP 401 without authentication; signed-in acceptance is user-reported and no private browser profile was accessed. Documentation recording is distinct from runtime tests and activation.

## Delivered

- Preserved the forest/slate Operate editor and company-owned Persuade artwork. No replacement server/shell or unrelated restyle.
- Independent uploaded/generated backdrop with crop/scale/opacity/blur; Hero foreground with position/scale/rotation/shadow and headline front/behind depth. Alpha is preserved, not created. Screenshots/products remain separate complete originals with contain policy. Showcase draws its real backdrop but not the cutout foreground; Editorial draws no imagery except logo.
- Per-role normal font family, supported weight, explicit size, leading and tracking for headline/body/CTA/kicker/brand. Automatic headline preset is disabled at explicit size; no silent shrink or cross-role scaling. V2 retains the honest **Overall text scale** label.
- Ten-family curated Google Fonts importer with local search, bounded public CSS/OFL/font fetches, actual file SHA-256 and cmap verification, retained licence/provenance, ownership checks and private local cache. No API key needed, no arbitrary upload/URL and no full-library live search.
- Company/campaign saved looks, deep partial per-ratio v3 controls, coherent none/ribbon/orbit motif kit with supplied words and action treatments. Future inheritance does not restyle existing posts.
- Immutable v3 scene with selected imported-font metadata and persisted client-computed `renderReceipt` (resolved manifest + PNG SHA-256). Strict domain validation matches copy, resource IDs, resolved options and font refs/metrics; review captures the PNG Blob and export downloads that exact capture. The server does not retain or verify the PNG bytes; future browser replay is not guaranteed pixel-identical.
- New posts start v3. Explicit editable copies leave v1/v2 historical drawing kernels and saved versions intact. Unused-paid-background guards cover Editorial and v2 recipes that ignore the commissioned backdrop. Monotonic state acceptance, autosave/focus and labelled-field datalist fixes are retained.

## Verification ledger

These are distinct evidence sources, not one omnibus acceptance claim.

| Evidence | Result and boundary |
|---|---|
| Parent unit-test run | **83 passing** domain/shared/Host/renderer unit tests, including strict receipts. Reported by parent; not rerun here. |
| Parent v3 renderer run | **5 retained renderer unit tests (included in the 83) + 1 comprehensive v3 browser test passing**. Commands in [README](<README.md#development>). |
| [UI report](<output/playwright/v3-ui/report.json>) | **29 passing checks**, actual React/model/renderer pointer harness on an isolated intercepted origin; not installed signed-in GUI evidence. Includes receipt/download identity, role/layer independence, offline cached font use, stale-response protection, saved looks, old editor/gallery bitmaps and zero paid calls. |
| [Renderer manifest](<output/playwright/v3-renderer/manifest.json>) | Twelve recipe/ratio specimens, all with empty technical-error arrays. Warnings remain and must be inspected. |
| [Renderer checks](<output/playwright/v3-renderer/checks.json#L6171-L6190>) | `v2ColdParity: true` and `v2PixelParity: true`: controlled software-Canvas before/after-v3 and direct/compositor parity. `pinnedV2PixelParity: false`: archived old PNG equality is advisory across different accelerated/software raster paths, **not a passing byte/pixel-equality claim**. Latest-render/stale-result assertions also recorded. |
| [Renderer visual review](<output/playwright/v3-renderer/visual-review.json>) | Worker review status **limited**; reports batched inspection and final native-PNG/feed-size confirmation. Independent final review also inspected six final artwork/UI captures, and closed without a remaining material implementation defect. Neither review approves this rough fixture as production artwork. [Canonical QA](<output/qa-v3/summary.md>) records all twelve current builder reviews and verifies artifact hashes; status remains limited. |
| [UI receipt](<output/playwright/v3-ui/ui-render-receipt.json>) and [reviewed PNG](<output/playwright/v3-ui/ui-reviewed.png>) | Saved fixture capture/receipt; UI report asserts digest matches export. Distinct from retaining any user's reviewed PNG server-side. |
| Retained v2 source/artifact hashes | Parent reports **14 unchanged hashes**. This is source/artifact preservation evidence, not archived raster equality. |
| Read-only actual-profile compatibility | Parent reports **3 designs, 5 jobs, `profileWrites: 0`**. No new profile writes or provider calls by that verifier; do not generalise this to the entire historical rollout. |
| Public font smoke | Parent reports real **Anton 400**, **3 requests** (OFL/CSS/gstatic), **0 OpenAI**. Other nine catalogue families not live-fetched. WOFF2 parser coverage uses synthetic fixtures only. UI imports are mocked, not another live importer test. |

### Evidence gallery

| Ratio / pixels | Hero | Showcase | Editorial |
|---|---|---|---|
| Square / 1080 × 1080 | [PNG](<output/playwright/v3-renderer/hero-square.png>) | [PNG](<output/playwright/v3-renderer/showcase-square.png>) | [PNG](<output/playwright/v3-renderer/editorial-square.png>) |
| Portrait / 1080 × 1350 | [PNG](<output/playwright/v3-renderer/hero-portrait.png>) | [PNG](<output/playwright/v3-renderer/showcase-portrait.png>) | [PNG](<output/playwright/v3-renderer/editorial-portrait.png>) |
| Story / 1080 × 1920 | [PNG](<output/playwright/v3-renderer/hero-story.png>) | [PNG](<output/playwright/v3-renderer/showcase-story.png>) | [PNG](<output/playwright/v3-renderer/editorial-story.png>) |
| Landscape / 1200 × 628 | [PNG](<output/playwright/v3-renderer/hero-landscape.png>) | [PNG](<output/playwright/v3-renderer/showcase-landscape.png>) | [PNG](<output/playwright/v3-renderer/editorial-landscape.png>) |

UI captures: [desktop](<output/playwright/v3-ui/ui-desktop.png>), [mobile opening](<output/playwright/v3-ui/ui-mobile.png>), [mobile controls](<output/playwright/v3-ui/ui-mobile-controls.png>), [preview](<output/playwright/v3-ui/ui-preview.png>), [imported-font reviewed output](<output/playwright/v3-ui/ui-imported-reviewed.png>). These are isolated fixture captures, not live-profile acceptance. The archived long [phone proof board](<output/playwright/renderer/board-phone.png>) has repeated tiles and remains excluded.

## Assets, limits and honest claims

- The human foreground is a **rough manual polygon mask of the previously synthetic woman**, labelled test-derived. Yellow halo/hard sleeve edges remain; this is not an authentic supplied cutout, production-quality extraction or a shipped automatic-removal feature.
- No original standalone Storin logo or real website screenshot was supplied. Plain typeset company name and synthetic screen specimens must not be represented as authentic customer assets, endorsements or approved campaigns.
- No new paid image generation was needed for v3 implementation/testing. Earlier user-confirmed live v2 preview/export and one successful `gpt-image-2.6-flare` generation are historical evidence only, not v3 deployment acceptance.
- No arbitrary font upload, italic UI, RTL/bilingual shaping, general multilingual guarantee, perspective devices, ZIP/carousel export or publishing. Import success across all ten public families has not been live verified.
- Automated checks/worker visual review are not claims/rights, generated-truth, WCAG, full mobile/keyboard/screen-reader/zoom/cross-theme or platform certification. Review copy, originals, crop, subject silhouette, native resolution and feed-size legibility yourself.

## Parent handoff / live acceptance

1. Completed: independent fresh review and implementation repairs, 83 unit tests, comprehensive renderer integration and 29 UI checks; see [development instructions](<README.md#development>).
2. Completed: build and syntax checks, disable/re-enable through Harness Plugin Manager, both actions applied without warnings; installed `include:brand-studio` fibre reported active. No replacement server was started.
3. Completed by user report: the user selected **“The v3 preview and PNG export work.”** This is a new v3 confirmation, not reused v2 evidence. Clean unauthenticated probes return HTTP 401; no automated authenticated-GUI claim is made.
4. Retry completed without application changes or paid requests: 83 unit tests pass, host active, current-profile compatibility passes, 14 retained v2 fingerprints unchanged. Preserve outstanding asset/coverage limitations. [Canonical QA](<output/qa-v3/qa-report.json>) is schema-valid with verified file hashes and limited status.
