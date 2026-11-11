# Brand Studio

**Version 0.7.0 — built and activated.** A local DeepSeek Harness panel for company brands, campaigns, weekly planning and guided social design. Native Harness typography and light/dark surfaces, restrained blue actions, grounded Home and canvas-first controls keep the tool quiet. Look offers ten compact arrangement icons that update the main canvas, six bundled font pairings, truthful independent image opacity and six CTA treatments, while preserving saved artwork and older rendering.

## Guides

- [Using Brand Studio](<docs/USAGE.md>) — first run, the ten arrangements, six font pairings, review and export.
- [Development](<docs/DEVELOPMENT.md>) — build, architecture, compiler generations, tests and safety rules.

## Open it

Select **Brand Studio** in the Harness sidebar and refresh the **existing** Harness page. This is an installed plug-in, not a separate server. See [0.7 release notes](<V7-RELEASE-NOTES.md>) for current verification/activation status and limits; [0.6 notes](<V6-RELEASE-NOTES.md>) are historical. Activation does not prove live user acceptance: clean probes of the existing GUI require authentication, and isolated fixtures are not private signed-in screenshots.

**For an existing draft:** Look initially preserves **Current look**. Choose **Look → Arrangement** and click a schematic icon to explicitly enable the template workflow. All ten choices stay available; a different selection redraws the main canvas, while clicking the active icon preserves manual tweaks. **Bold backdrop** follows the supplied Storin reference. Wait for autosave, inspect **100%** lettering and review that format again before exporting. Saved versions remain unchanged. New designs use compiler4 templates. No image generation is needed.

Look edits the currently visible format, not a hidden base look. **Background & images** identifies which image is selected and exposes literal opacity with a percentage: 0 hides it, 100 shows full source strength. Solid colour mode explains why a selected backdrop is hidden. Image choices are shared across formats; opacity/crop/position can differ. **Apply look to other formats** deliberately replaces their appearance overrides. New arrangement choices reset template sizing, subject placement and CTA geometry while preserving words, sources, opacity and colours. Motifs are not part of this new workflow; original baked-in image content and frozen old decorations remain intact.

**Font pairing** offers Bold studio (League Spartan / Source Sans3), Compact impact (Barlow Condensed / Source Sans3), Clean digital (Archivo / Manrope), Editorial serif (Lora / Source Sans3), Geometric modern (Space Grotesk / DM Sans), and Tall editorial (Oswald / Manrope). All six use pinned local OFL faces, with no font download on selection. Choosing a pairing replaces masked role-family/weight overrides but preserves size, leading, tracking and colours. Advanced custom families are labelled honestly. Legacy Current look retains its original three choices until an arrangement is selected; saved versions do not migrate.

1. Add a company (name and description); confirm the suggested planning time zone.
2. Create one or more campaigns and choose a weekly cadence.
3. Choose **Plan this week** to create editable post slots without image charges, or start a one-off design.
4. Open a post. Enter exact wording and click an arrangement icon: Bold backdrop, Subject right, Image lead, Centered announcement, Service sheet, Subject left, Image footer, Framed focus, Type-led or Offset grid. Select original company assets. In Framed focus the complete background is contained; zoom/crop are truthfully unavailable, while blur and opacity still work.
5. Reuse an existing background, upload a backdrop/foreground, or keep a deliberate type-only design. Composition, fonts, formats, and detail edits do not call the image API.
6. If a new generated background is actually needed, use **Image setup** for an OpenAI API key, inspect the brief, and explicitly confirm the paid request. A chat subscription/OAuth sign-in is not Images API access.
7. Wait for autosave and a completed preview. Inspect the selected ratio, confirm the review checkbox, choose **Save & review this version**, then **Export reviewed PNG**. Check browser downloads.

Switching companies/campaigns does not retarget running work. Company and campaign data persist in the Harness storage domain.

## Four company colours

Open **Company guidelines** (or add a company) to choose **Primary colour, Accent colour, Brand ink and Brand paper** together under **Brand colours**. Each native picker displays its hex value. Typography and written brand rules remain under Optional brand details. These colours belong to artwork; they do not recolour the Harness interface.

Primary supplies the main brand field. Flexible CTAs choose their fill/text independently from these roles or custom hex; text-only has no shape and outline has no solid fill. Missing accent follows ink in the form and flexible renderer; older compiler2 retains its original fallback behaviour. Saved versions keep frozen colours; changed current artwork needs fresh review. Future image briefs include all four roles when accent is configured. Merely choosing or saving colours makes no image request.

## Home and focused editing

Home opens first and derives selected-company work from saved records: company-local intended dates, overdue/today/upcoming posts, unscheduled and one-off drafts, actual image requests and frozen recent versions. **Intended dates are not a publishing schedule.** Unknown requests may have been billed; inspect them before considering another request. Next steps surface distinct review, exception or planning actions—not fabricated activity or duplicate draft lists. Empty companies get a real get-started state.

The new layered-print SVG mark and consistent SVG controls belong to the interface, not exported customer art. The welcome still life is decorative generated artwork, not customer work. It now bleeds to the banner’s right edge and fades into the host background before the text. At the owner’s request there is no visible AI-generated label. Its [original PNG](<assets/welcome/hero.png>), [prompt/provenance](<assets/welcome/manifest.json>) and [same-size WebP record](<assets/welcome/web-derivative.json>) are retained.

In the editor, the preview leads and **Words / Look / Assets** focus the inspector. Desktop panes scroll independently; mobile **Preview / Edit / Review** shortcuts move and focus the relevant section. **Fit** shows the whole composition; **100%** shows native bitmap size in a pannable stage. Both export the same full-resolution PNG. Short windows deliberately make Fit smaller to keep review/export reachable: the 600px-high desktop proof has a 140px-tall Fit poster, so use 100% for edge inspection.

## Historical flexible composition (0.5; retained compiler3)

The following describes the 0.5 workflow, not the current Look controls. Those stored choices remain replayable, but their motif/recipe/base-scope controls have been retired in 0.6.

At the 0.5 release, new unsupplied posts retained poster version 3 with root-only `compilerVersion: 3`. **Look → Arrangement** offers Lateral, Broadside, Specimen, Centered, Spread and Cover, authored independently for all four native formats. Compare actual locally rendered layouts; edit the base look or this format only. Non-CTA glyphs have no backing rectangles, halos, shadows or photo-exclusion holes. If contrast over actual imagery is unsafe, change the text colour, image crop/opacity or arrangement; review is blocked rather than restoring plates.

**Look → SVG motif** offers eight trusted vectors plus None, literal opacity from 0–100%, palette colour and independent placement. Download the selected recoloured SVG for external editing. **Call to action** separately controls strip/rectangle/rounded/pill/outline/text, palette or custom-hex background/text, fit/full width, alignment, padding and arrow. Empty copy paints no shape. SVG uploads and automatic removal of baked-in image/logo backgrounds are not provided.

**Company guidelines → Design language** previews Creative modular, Research editorial or a custom mix. These are editable starting proposals, not approved new brand rules. Set colours and typography in their existing brand settings. Optional **Vary new post layouts** cycles only at creation; reads, edits and plan reopening never reroll. Company profiles affect future posts only; pinned campaign looks win. To change a current post, use **Preview company language** and explicitly apply after inspecting the actual canvas. All-format application clears old arrangement/motif/CTA ratio overrides but retains type/image fine-tuning.

### Retained crisp compiler2

Explicit compiler2 posters keep the 0.4 renderer unchanged, including its whole text-block backings and legacy details. It is not silently reinterpreted as transparent text. Flexible layouts own alignment and keep essential text in front; legacy variation, emphasis/underline, text-depth and foreground-shadow decorations are hidden in the new tools because compiler3 does not use them.

Existing v1/v2, **unmarked classic v3** and explicit compiler2 records keep their original kernels/options until an explicit new-tools/copy action. Absence of the marker is not migrated. Copies use current company settings and need a new review; the action changes the editable post state, not saved history. Applying a saved flexible campaign look is explicit; retained old campaign looks do not silently upgrade old drafts. Legacy background switching is disabled until an explicit copy is made. The v2 control remains honestly labelled **Overall text scale**.

### Independent images, protected originals

Upload PNG, JPEG, or WebP images up to 5 MB into separate logo, product/screenshot, backdrop and foreground roles. Backdrops have independent selection, crop/scale, opacity and blur; foregrounds have position, scale and rotation. True alpha is preserved; **upload does not remove backgrounds**. Flexible composition never cuts text-shaped holes in photographs or subjects: unsafe foreground intersections must be resolved by moving the image/text or choosing another arrangement. Older compiler2 additionally retains shadow, headline front/behind depth and protective clipping, which can alter a silhouette. Inspect originals, placed resolution, clipping and warnings before review.

Product/screenshot imagery stays separate, fully contained and in its original proportions; it is not treated as a person cutout. V3 showcase can use a genuine independent backdrop but does not draw the cutout foreground. Editorial is type-only except the logo: selected imagery is retained but not drawn, and paid background requests are blocked. V2 showcase and v2 Hero with an original product also block paid backgrounds they would ignore; create a v3 copy to combine layers.

### Typography and saved looks

Headline, body, CTA, kicker, and brand each have family, supported normal weight, size, leading and tracking controls. Blank metrics inherit the recipe; sizes are 1080-wide layout units, not CSS pixels. **Preset headline scale** affects only the automatic headline size and is disabled when an explicit headline size is set. Other roles do not shrink with it. Explicit styles are never silently shrunk: unsupported glyphs, unavailable faces and overflow block review/export.

Three bundled OFL voices remain offline defaults: League Spartan / Source Sans 3, Barlow Condensed / Source Sans 3, and Archivo / Manrope. The font importer searches a **curated local catalogue of ten Google Fonts families**, not the full live Google Fonts library: Anton, Oswald, Archivo Black, Libre Franklin, Roboto Slab, Sora, DM Sans, Manrope, Space Grotesk, and Lora. Import fetches approved normal faces and the OFL notice once, verifies actual file SHA-256 and cmap coverage, and caches private company-owned bytes locally. It needs network access for first import, **no Google Fonts API key and no OpenAI credential**. Draft words are not sent. No arbitrary font upload/URL, italic UI, RTL/bilingual shaping, or general multilingual guarantee is provided. Existing bundled voices need no runtime CDN; cached imports render with the source offline while local Harness storage remains available.

Base art-direction changes flow to formats without overrides; **This format only** uses deep partial v3 overrides. Undo/reset and layout comparisons are local. Flexible controls separate arrangement, SVG motif, CTA, role colours and flat/tonal surface/supplied annotation. Old typography auditions and the legacy detail kit remain only on old compilers. **Save this campaign look** or **Save as company look** stores base options for future inheritance; company language rotation can further select new-post arrangements/motifs/CTAs. Applying a campaign look to a current draft is explicit. Future-only language changes preserve backend review eligibility; other brand-kit updates retain their existing conservative review checks.

### Review receipt and export

V3 snapshots freeze company, post, image references and selected imported font metadata. Commissioned outputs start unreviewed without a receipt; an explicit current snapshot supplies it. At review, the browser captures a completed PNG Blob and computes `renderReceipt: {manifest, pngSha256}`. The immutable stored receipt describes resolved copy, options, resources, role font files/digests/styles, transforms and layer order. Domain validation strictly matches copy, selected assets, resolved options and bundled/imported font references to the frozen scene; it also bounds plain JSON complexity and size (128 KB).

Review requires saved current inputs, a completed error-free render, explicit human confirmation, and that receipt. Export requires the exact reviewed current design ID and receipt PNG digest, and downloads the **same captured Blob**, not a second render. Changes to content, brand, images, format or art direction invalidate approval; other ratios need their own review. A successful status command is not proof the file was saved.

**This is a client-computed reviewed-bitmap receipt, not server PNG retention, server verification of PNG bytes, or a guarantee of perpetual future pixel replay.** The server validates the receipt against scene metadata but does not receive/retain the captured PNG. Reopening history redraws its frozen scene with retained resources and the available renderer/browser. V2 retains its prior runtime-manifest-only behaviour; it does not acquire v3 receipts. History remains read-only.

## Image authentication and privacy

Host-only reference: `BRAND_STUDIO_OPENAI_API_KEY`, with an identified `OPENAI_API_KEY` fallback when configured. The resolved value never enters saved campaign records, prompts, UI state responses, or exports. Saving a key uses Harness credentials. The local credential store is owner-only file storage, not an encrypted OS keychain or isolation from other processes run by the same OS user.

Explicit generation sends the brief and relevant brand/campaign text to `https://api.openai.com/v1/images/generations`. The current default is `gpt-image-2.6-flare`, medium quality, one image per request and supported native sizes. Image setup offers an exact model identifier and a read-only **Check available models** action. The previously checked account catalogue listed `gpt-image-2.6-flare` and `gpt-image-2.6-sunburst`; listing alone does not guarantee endpoint access or identical capabilities. Changing models generates nothing. The rejected legacy `gpt-image-1` default is migrated only after a prior rejection and a catalogue listing of the new default; historical jobs are unchanged. Original uploaded images are composed locally, not submitted to this endpoint. Reference-image editing is not implemented. Exact pricing is not computed. No automatic paid retries, publishing or schedules are created.

Font imports are separate public OFL/CSS/font downloads, not image requests. The ten-family catalogue, URL allowlists, byte/time bounds and local integrity checks are implemented in [font catalogue](<font-catalog.js>) and [font service](<font-service.js>). They do not provide arbitrary web/font discovery.

## Core capabilities and limits

- Multiple companies/campaigns, lifecycle states, Monday/Sunday company week settings, local-week navigation and idempotent weekly plans.
- Campaign-scoped briefs/copy, local image selection, queued autosave, immutable modern scenes and read-only history. Monotonic state revisions prevent a delayed refresh from replacing newer state; focus-safe labelled inputs retain the model datalist.
- Three authored poster families across square (1080 × 1080), portrait (1080 × 1350), story (1080 × 1920), and landscape (1200 × 628); not a freeform canvas or finished-square crop system.
- Explicit image confirmation, bounded batch selections (up to 8), durable sequential queue, immutable submission context, company/asset isolation, offer-expiry checks, uncertainty-aware failures and no automatic interrupted replay.
- No automatic caption writer, AI brief coach, image-based brand extraction, automatic background removal, perspective devices, arbitrary font upload, carousel/ZIP packs, social publishing, analytics or unattended generation.
- Weekly plans are template-derived slots. Copy-last-week, drag reordering, explicit rescheduling, campaign duplication, advanced filters, company deletion/archiving controls and complete claim approval are not exposed.
- Local image limit: 8 MB per image / 96 MB library (UI uploads 5 MB). Font files: 2 MB per face / 8 MB per imported family / 24 families per company, sharing the 96 MB library cap. Binary font records are separate from the public image list. Automatic retention/deletion is absent.
- Unknown provider outcomes may have been billed; check provider usage manually. Cancellation is not an assurance of no charge.
- Automated checks do not certify aesthetics, generated visual truth, claims, rights, WCAG, platform approval or universal safe regions. Inspect feed-size and native output, especially subject edges, crop, density and original-logo size.

## Development

Run from this plug-in directory. The scripts are defined in [package metadata](<package.json>).

```sh
npm run build
npm test
npm run check
node --check host.js
# Full Chromium is required; this workspace's managed browser cache:
export PLAYWRIGHT_BROWSERS_PATH="$PWD/output/playwright/browsers"
npm run test:visual        # retained v2 composition suite
npm run test:visual:v3     # retained classic v3 browser suite
npm run test:export        # native crisp edges, dimensions, DPR and Blob identity
npm run test:ui            # retained compiler2 React/editor/model regression harness
npm run test:export:flex   # flexible native matrix + photographic transparency proof
npm run test:ui:flex       # flexible controls/profile/receipt integration (no captures)
```

The browser suites use full Chromium (`channel: 'chromium'`), not the macOS headless-shell path that stalled Canvas. Set the environment variable to your actual managed Chromium installation if it differs. Tests use intercepted fixture origins/local harnesses, not a replacement server, real credentials or the image provider. The mocked import in the UI suite is distinct from the prior public Anton smoke fetch.

[Build entry](<build.mjs>) bundles the client/fonts into the Harness module-loader format and builds the Host. Host source is [index](<index.js>) and [domain model](<model.js>), producing [installed Host entry](<host.js>). Client source is [React UI](<src/client.jsx>), [flexible controls](<src/flexible-controls.jsx>), [compositor](<src/compositor.js>), [flexible renderer](<src/poster-renderer-flex.js>), retained [classic v3 renderer](<src/poster-renderer-v3.js>) and [stylesheet](<src/studio.css>), producing [installed client entry](<client.js>). Rebuild after source edits. Harness supplies production React; pinned React/React DOM are development harness dependencies; Zod is the runtime npm dependency. Storage remains `brand_studio`, aggregate version 1 with optional font metadata. Owner-only `/api/brand-studio/*` routes use the supported Connection Fetch registry; no Harness patch or new storage table is required.

Install using Harness `plugin_manager` / `install_bundle`, not hand-edited profile manifests. A local build alone does not prove activation or HMR. Follow the manager's activation/restart guidance, refresh the existing GUI, and confirm live preview/export. Do not start a replacement server.

## Verification and release status

Current **0.5** checks: 152 root tests, retained crisp and classic native suites, 34 legacy UI checks and twelve flexible UI groups passed. Independent full-size review covers all 48 native matrix cases; practical examples, SVGs, photographic transparency and six current UI captures are separately inspected. See [0.5 release notes](<V5-RELEASE-NOTES.md>) for canonical QA, final build/activation and honest signed-in/accessibility limits. No customer state or paid generation was changed by verification.

### Historical 0.4 checkpoint

As-built checkpoint: **10 November 2026, v0.4.0**. The parent completed **118 root tests**, **34 UI regression checks** and **14 final behavioral groups**. The [final matrix report](<output/playwright/v4-ui/final-matrix-report.json>) covers actual React/model/Canvas with shipped Harness styles; [native crisp checks](<output/playwright/crisp-renderer/checks.json>) cover all five text roles, all four native dimensions, controlled DPR1/2 decoded-pixel SHA equality and reviewed/downloaded Blob identity. The classic v3 visual suite passed unchanged. All **31 legacy fingerprints (14 v2 + 17 v3)** were unchanged. Read-only current-profile verification found **1 company / 0 campaigns / 2 posts / 6 designs / 6 jobs, 0 writes / 0 provider calls**. This documentation pass inspected current code and all thirteen final UI images; it did not rerun those commands.

The [fresh adversarial closure](<output/qa-v4/adversarial-review.md>) is **SHIP**: all four initial findings resolved, none partial/unresolved, no fix-induced material regression. The [canonical visual QA](<output/qa-v4/summary.md>) is **limited**, not pending defects: 15 full-size reviews (13 UI + 2 native PNGs) and current hashes checked, but signed-in v0.4 acceptance and formal accessibility remain outside evidence. The pre-fix Nielsen 28/40 is not a final score. CSS-zoom reflow/dialog checks are not real-browser zoom or VoiceOver certification; no WCAG/platform compliance or perpetual cross-browser PNG equality is claimed. Fixtures—including March-dated artwork—are not real user activity.

The welcome illustration used **exactly one** explicitly user-approved host-only Images API call (HTTP 200), not a test mock: [status](<output/welcome-task/status.json>), [permanent one-attempt claim](<output/welcome-task/attempt.json>) and [closed gate, approved:false](<output/welcome-task/approved.json>). The 1536 × 1024 source PNG is 1,962,713 bytes; its WebP is 82,632 bytes with no resize. No further welcome generation is authorized. All poster verification was provider-free.

A prior public Anton 400 import used three requests (OFL, CSS and gstatic), zero OpenAI calls. The other nine catalogue families were not live-fetched; parser coverage uses synthetic fixtures. The old poster proof foreground remains a rough polygon-masked derivative of a synthetic woman, not an authentic supplied cutout or automatic-removal feature; no original standalone Storin logo or real website screenshot was supplied. Earlier user-confirmed v3 preview/export and historical paid poster generation do not prove v0.4 acceptance.

Historical 0.4 build, syntax, Plugin Manager reactivation and active-fibre verification passed; those do not establish current 0.5 acceptance. Refresh the existing GUI and manually inspect the new-tools path, arrangement/motif/CTA controls and reviewed PNG download. Clean GUI probes require authentication. See [v0.4 release notes](<V4-RELEASE-NOTES.md>) for release evidence and [design system](<DESIGN.md>) for visual authority; [v3 notes](<V3-RELEASE-NOTES.md>) remain historical.
