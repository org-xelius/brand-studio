# Brand Studio 0.4.0 — native workspace and crisp lettering

As built and verified on **10 November 2026** against the [approved contract](<V4-UX-IMPLEMENTATION-CONTRACT.md>). This release replaces the forest editor chrome, adds grounded Home, and adds an opt-in-compatible crisp compiler without reinterpreting saved artwork.

## Owner handoff

1. Refresh the existing Harness page and open **Brand Studio**. No separate server is needed.
2. Home shows work for the selected company. Intended dates are planning dates, **not scheduled publishing**. A company with no campaign can still resume one-offs.
3. For an existing classic draft, open **Look → Create crisp editable copy**. This starts a crisp editable state for the same post; it does not change saved versions or spend on an image.
4. Wait for autosave. Use **Words / Look / Assets** to edit, **Fit** for the whole result and **100%** to pan across native lettering.
5. Inspect the exact format, confirm the review checkbox, choose **Save & review this version**, then **Export reviewed PNG**. Check browser downloads. Copies and other ratios need fresh review.

**Deployment is verified; human v0.4 acceptance is not yet recorded.** The final plug-in build and syntax checks passed. Plugin Manager explicitly disabled and re-enabled the existing `@local/brand-studio` bundle; both operations applied without warnings. Installed `include:brand-studio` is enabled and its host fibre is active. Clean requests to the existing GUI returned HTTP 401: these tests did not access a private signed-in browser. Earlier user-confirmed v3 preview/export does not accept this redesign. Refresh is required; no HMR or replacement-server claim is made.

## What changed

### Native Harness visual world

- Ordinary `--dsw-font-family`, not brand Montserrat or the conversation font-size preference. Ordinary body type is 400 at 14px / 22px, with smaller operational labels/help where appropriate.
- Live neutral `--dsw-alias-*` surfaces, labels, borders and hover; host focus ring. `body[data-ds-dark-theme]` follows the host. A host-fixed light theme beats OS dark; OS fallback applies only without `html[data-ds-theme-source]`.
- New layered-print/frame SVG mark, matching root icon and one rounded 1.8-stroke control icon family. Native inputs/selects/dialogs, named close/title, Escape and focus containment. No fake macOS titlebar, emoji icons or glass shell.
- **Blue selected by the parent** after same-content orange/blue × light/dark × desktop/mobile comparison. Blue coheres with Harness action/focus and separates controls from the orange poster fixture. Both primary-text pairs passed contrast: orange 5.20:1 light / 8.96:1 dark; blue 5.94:1 light / 7.89:1 dark. This is a design/contrast choice, not conversion research. Customer art is unaffected.

### Grounded Home and focused editing

[Home selectors](<home-model.js>) derive selected-company local today/week, overdue/today/upcoming intended dates, unscheduled/future drafts and one-offs. Actual queued/running/unknown requests retain post context; unknown outcomes may have been billed and are never offered as a safe automatic retry. Recent versions use their frozen scene/fonts/assets. Next steps are distinct exception/review/planning actions, not repeated continuation rows or fabricated activity. Empty states require real setup.

The preview leads in DOM and appearance; Words / Look / Assets focus the inspector. Desktop panes scroll independently. Mobile Preview / Edit / Review jumps preserve context and focus. Fit is CSS presentation only; 100% is native-size panning, not a higher-quality download. In the 1320 × 1000 proof the stage is 448px high. With 48px native top clearance, the 700px-high proof has a 240px-tall Fit bitmap; the 600px-high proof has a 140px-tall one. That short-window trade-off keeps review/actions reachable; use 100% for edges. Export is never resampled to the Fit size.

### Genuine AI welcome asset; spent one-shot gate

Exactly **one explicitly user-approved host-only Images API submission** succeeded with HTTP 200, through configured Harness credentials. No poster test called the provider, and the illustration created no company/campaign/post records.

- [Original PNG](<assets/welcome/hero.png>): 1536 × 1024, **1,962,713 bytes**, SHA-256 `6f577b97d84c93abb5aa4dacd5fc4e7a25508dd9727f0f0eff62f8f54a538499`.
- [UI WebP](<assets/welcome/hero.webp>): **82,632 bytes**, same 1536 × 1024 dimensions, **no resize**, quality 88; [derivative/hash record](<assets/welcome/web-derivative.json>).
- [Prompt/parameters/provenance](<assets/welcome/manifest.json>) and [success status](<output/welcome-task/status.json>) are retained. Model: `gpt-image-2.6-flare`, medium quality, one image.
- [Execution gate](<output/welcome-task/approved.json>) is now **`approved:false`**. The [permanent one-attempt claim](<output/welcome-task/attempt.json>) remains. Exclusive durable claim occurs before credential resolution/network; no retries on timeout, failure, restart or activation. Cost is unavailable here. **No further welcome generation is authorized.**

The material still life has no people, text, logo or customer-work claim. In the subsequent owner-approved presentation adjustment it is decorative, right-edge full-bleed with a theme-transparent left fade, and **no visible AI-generated label**. Phones use an upper-right band that also fades downward before full-width copy/actions; extreme narrow/zoomed layouts stack safely. Source image bytes and provenance are unchanged and no additional generation occurred. The [follow-up matrix](<output/playwright/hero-fade/final-matrix-report.json>) and [current Home preview](<output/playwright/hero-fade/final-home-light-blue-desktop.png>) are separate from the original v0.4 captures. The execution gate's closed status is not a claim that the earlier successful request lacked approval.

### Four company colours follow-up

Company setup/guidelines now exposes **Primary colour, Accent colour, Brand ink and Brand paper** together, with native pickers, visible hex values and a responsive two-column/one-column group. These are artwork colours, not the interface accent. Primary remains `company.color`; optional `brandKit.accent` is six-digit hex validated and preserved during unrelated partial kit saves. Existing absent roles remain absent on read/unchanged save; displayed ink/paper defaults now match actual rendering. New companies explicitly initialize four roles.

Only crisp posters with an explicit accent use it for rail/capsule CTA fills; readable ink/paper text is selected, and low-contrast filled CTAs block review/export. Text-only actions are unchanged. Missing-accent palettes and frozen classic kernels retain previous output. Saved scenes remain frozen; current colour edits need fresh review. Future explicitly configured briefs name all four roles; old queued snapshots retain byte-exact old prompts. No new image generation occurred.

Verification: **129** root tests (11 new palette cases), **2** native-browser renderer suites including exact reviewed-Blob/DPR checks, **34** existing UI regression checks and **8** focused company-form groups pass. All **14 v2 +17 v3** source/artwork fingerprints are unchanged. [Company checks](<output/playwright/company-colors/company-colors-ui-report.json>) cover independent save/reopen, isolation, absent legacy fields, typography preservation, responsive themes and focused pickers/Save at200% CSS zoom. [Native colour proof](<output/playwright/company-colors/native-four-colours.png>) and [renderer report](<output/playwright/company-colors/renderer-company-colors-report.json>) verify actual1080px field/CTA pixels, contrast blocking and legacy parity. [Desktop form](<output/playwright/company-colors/initial-company-dialog-light-desktop.png>) and [mobile form](<output/playwright/company-colors/initial-company-dialog-dark-mobile.png>) are isolated fixtures, not authenticated installed-GUI acceptance. Earlier evidence is retained separately. Repeat focused checks with `npm run test:company-colors` and the managed Playwright browser path.

### Additive crisp compiler, unchanged classic world

The diagnosed artifact was classic v3 field-coloured `strokeText` bands (minimum six layout units), not PNG compression or missing fonts. [The additive compiler](<src/poster-renderer-crisp.js>) draws headline, body, CTA, kicker and brand as fill-only text, retaining normal raster antialiasing. Over visible imagery/tonal surfaces it uses deliberate opaque **whole-block backing**, including ink extents and eight-unit padding, not coloured letter halos. Image blur/smoothing and subject shadow remain independent.

[Dispatch](<src/compositor.js#L10-L14>) requires root `poster.version: 3, compilerVersion: 2`. New posts and explicit crisp copies get the marker. Unmarked v3 remains original compiler 1; normalization does not insert a default. No schema-4 migration or ratio-level compiler exists. V1, v2, original v3 kernels/font bytes, frozen options and saved history remain unchanged. Applying a campaign look preserves the draft's compiler identity; it is not an implicit upgrade. Scene/manifest/receipt identity binds the compiler, so prior approval cannot approve a changed compiler.

The existing three recipes/four ratios, bundled OFL voices, curated ten-family importer, protected originals, independent layers, queued autosave, stale-response protection and exact reviewed-Blob export are retained. Review captures PNG bytes and a client-computed SHA-256 receipt; the server validates scene metadata, **not retained server PNG bytes**. Reopened history redraws frozen resources; no perpetual browser-independent replay guarantee is offered.

## Completed verification

| Evidence | Actual result and boundary |
| --- | --- |
| Root tests | **118 passed** in the parent's complete final run, not the earlier 117-test checkpoint. |
| UI regressions | **34 passed**, including classic saved-look application/compiler preservation and crisp copy/review guards. |
| [Initial matrix](<output/playwright/v4-ui/initial-matrix-report.json>) | Eight accent/theme/device combinations compared with actual React/model/Canvas and shipped Harness styles; initial behavioral checks passed but did not catch all visual defects. |
| [Final chosen-blue matrix](<output/playwright/v4-ui/final-matrix-report.json>) | **14 behavioral groups passed**; thirteen final UI captures. Host font/surface updates, fixed-light precedence, standalone fallback, mobile targets, focus/Escape, reduced motion, CSS zoom and short-window occlusion scoped checks. |
| [Native crisp checks](<output/playwright/crisp-renderer/checks.json>) | All five roles exactly match native fillText edge references, all four native dimensions pass, controlled DPR1/2 decoded-pixel SHA equality and reviewed/downloaded Blob identity pass; image blur does not blur text. |
| Classic compatibility | Classic v3 visual suite passes unchanged; **31 legacy fingerprints: 14 v2 + 17 v3 unchanged**. Controlled direct/cold-before-after dispatch checks are not archived cross-platform PNG equality. |
| Read-only actual profile | **1 company, 0 campaigns, 2 posts, 6 designs, 6 jobs; 0 verifier writes, 0 provider calls**. Counts are compatibility evidence, not screenshot fixture content. |
| [Independent adversarial closure](<output/qa-v4/adversarial-review.md>) | **SHIP within fixture scope**. All thirteen final UI images opened individually and hashes verified; four findings resolved, zero partial/unresolved, no fix-induced material regression. |
| [Canonical visual QA](<output/qa-v4/summary.md>) / [manifest](<output/qa-v4/manifest.json>) / [structured report](<output/qa-v4/qa-report.json>) | **Limited**, with 15/15 full-size reviews (13 UI + 2 native), current hashes and nine checks; limitations are authentication/formal accessibility, not open visual defects. |
| Build / installed Host | Final client/Host build and syntax pass; explicit Plugin Manager reactivation applied without warnings; bundle enabled and fibre active. |

The initial independent review found short-window canvas occlusion, offscreen/unnamed CSS-zoom dialog close/title, mobile hero-caption overlap and a crushed company selector. **One consolidated fixes batch** followed; final confirmation closed all four. The pre-redesign baseline (23/40) and initial-build Nielsen assessment (28/40) are historical, not final release scores; no final numerical rescore was performed.

## Final visual evidence

All are **isolated actual React/model/Canvas fixtures with shipped Harness styles**, not authenticated installed-GUI screenshots:

| Surface | Light | Dark |
| --- | --- | --- |
| Desktop Home | [PNG](<output/playwright/v4-ui/final-home-light-blue-desktop.png>) | [PNG](<output/playwright/v4-ui/final-home-dark-blue-desktop.png>) |
| Desktop editor | [PNG](<output/playwright/v4-ui/final-editor-light-blue-desktop.png>) | [PNG](<output/playwright/v4-ui/final-editor-dark-blue-desktop.png>) |
| Mobile Home | [PNG](<output/playwright/v4-ui/final-home-light-blue-mobile.png>) | [PNG](<output/playwright/v4-ui/final-home-dark-blue-mobile.png>) |
| Mobile editor | [PNG](<output/playwright/v4-ui/final-editor-light-blue-mobile.png>) | [PNG](<output/playwright/v4-ui/final-editor-dark-blue-mobile.png>) |

Additional individually reviewed evidence: [desktop dialog](<output/playwright/v4-ui/final-dialog-desktop-light.png>), [mobile dark dialog](<output/playwright/v4-ui/final-dialog-mobile-dark.png>), [200% CSS-zoom dialog](<output/playwright/v4-ui/final-dialog-mobile-200percent.png>), [700px-high native-clearance editor](<output/playwright/v4-ui/final-editor-700h-desktop-mac-clearance.png>), [600px-high editor](<output/playwright/v4-ui/final-editor-600h-desktop-mac-clearance.png>), [native five-role proof](<output/playwright/crisp-renderer/reviewed-dpr1.png>) and [native imported-font reviewed PNG](<output/playwright/v4-ui/ui-imported-reviewed.png>).

## Limits and unchanged exclusions

- No human v0.4 signed-in acceptance yet. HTTP 401 from a clean probe is an access boundary, not a live UI failure or acceptance proof.
- CSS-zoom dialog title wraps aggressively at the extreme narrow width; tested name/close/focus stay in the viewport. This does not certify real-browser zoom, VoiceOver, RTL or WCAG compliance.
- Fixtures—including March-dated saved examples—are synthetic test records, **not real customer work**. The old manually polygon-masked synthetic foreground retains rough edges; no original standalone Storin logo or real customer website screenshot was supplied.
- Native pixel/DPR checks are bounded to controlled Chromium. Natural antialiasing and softer CSS Fit scaling remain. No perpetual cross-browser PNG byte/pixel equality, vector export, universal safe-region or platform certification.
- Only Anton 400 had a prior live public import smoke check (three public requests, zero OpenAI calls); other catalogue families were not live-fetched. Parser fixtures do not establish general multilingual shaping.
- No automatic background removal, arbitrary font upload, perspective devices, publishing, analytics, carousel/ZIP, schedules or unattended generation. Paid poster requests remain explicit and separate; unknown outcomes may have been billed and are never automatically retried.

See [README](<README.md>) for everyday use and [DESIGN](<DESIGN.md>) with its [schema-2 sidecar](<.impeccable/design.json>) for the built visual system. This documentation pass inspected source, reports, all thirteen final UI captures and both native proof PNGs; it did not run a browser, build, provider request or extra test suite.
