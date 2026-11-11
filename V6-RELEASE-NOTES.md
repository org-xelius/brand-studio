# Brand Studio 0.6 — focused Look and reference-led templates

**Built and reactivated on 11 November 2026.** The existing installed bundle is enabled, Host fibre active, warnings empty. Clean access to the existing GUI returns401 as expected for owner authentication. Signed-in user acceptance remains a manual refresh/check, not a claim made from isolated fixtures.

## What changes
- One arrangement chooser with real current-format poster thumbnails, instead of competing Recipe/Arrangement controls.
- Five versioned templates: Bold backdrop (the supplied Storin reference is the lead), Subject right, Image lead, Centered announcement and Service sheet. Each has four authored native format plans.
- Look groups selected image/source, opacity, crop and positioning. Generated and uploaded backgrounds both appear in the source selector. Selecting a Look background enables it in the visible format as one undoable action.
- Literal independent background/subject/product opacity, with paired percentage controls. Solid mode explains inactive background controls; no image slider silently edits an unrelated layer.
- Edits read/write the currently visible format. Explicit Apply look to other formats replaces competing appearance overrides; shared image selection is labelled accordingly.
- Font pairing, headline sizing and advanced role typography remain editable. Six independent CTA styles now distinguish Fit text, Text column and true Poster width.
- Motifs are retired from new template applications, current Look controls and company arrangement previews. Historical motifs/resources remain available to frozen older scenes. Pixels already baked into original imagery are not removed.

## Preserved
Poster schema stays 3; the new renderer is explicitly compiler4. Old compilers1–3, absent selectors, existing posts, saved scenes and queued prompts are not migrated on read. Opening a draft preserves its current look until the owner selects a new arrangement. Template application is undoable and requires fresh review.

Original logos/products, company palettes, exact copy, asset ownership, licensed cached fonts, fill-only non-CTA lettering and glyph-interior contrast checks remain protected. No text plates, glyph halos, automatic copy shortening or implicit background removal are added. The original Storin backdrop was recovered read-only for proof; the flattened attached poster is not used as an image background.

Home, scheduling/navigation, Harness typography/theme/blue chrome and the welcome image are outside the redesign. No customer-brand/post mutation or paid image generation is part of implementation verification.

## Sources and tests
- [Approved implementation contract](<V6-LOOK-CONTRACT.md>)
- [Template options and transformations](<template-model.js>)
- [Versioned geometry](<src/layout-kernel-template.js>) and [native renderer](<src/poster-renderer-template.js>)
- [Focused Look controls](<src/look-controls.jsx>)
- **165/165** root tests, production build and syntax checks pass.
- **2/2 native groups** pass: all40 five-template/four-format/two-palette proofs fit with actual glyph contrast≥4.5, real A/B opacity pixels for all3 image roles, all20 authored foreground defaults,18 CTA style/width combinations, shared cross-compiler stale-load protection and12 direct legacy pixel replays.
- Actual unsupplied post creation → snapshot → native receipt → review → export accepts both [reference proof](<output/playwright/look-templates/factory-storin-reference.png>) and literal-opacity foreground proof. Inherited generic anchors are fitted only at creation; manual authored looks remain intact.
- **11/11 real UI groups** pass, including retained compiler2 Current look, frozen2/3 replay, generated/upload selection, actual0/50/100 image interpolation,42.5% precision, active-format masking regression, apply-all/undo/reload, current-portrait thumbnail identity, broken-resource gating and extra195-CSSpx reflow.
- **109 historical PNGs +6 frozen renderer/kernel/resource files** remain byte-identical: [preservation proof](<output/playwright/look-templates/preservation-proof.json>).
- **54/54 current surfaces** individually inspected with current file hashes; [canonical schema2 QA summary](<output/playwright/look-templates/qa/summary.md>) / [report](<output/playwright/look-templates/qa/qa-report.json>). Five material findings repaired: masked edit target, generic subject anchors, reference headline/body hierarchy, extra-narrow overflow and service-landscape photo crop. Overall status is **limited**, solely for declared signed-in acceptance/accessibility/source-approval scope—not an open visual defect.
- [Build fingerprints](<output/playwright/look-templates/qa/build-evidence.json>) and [deployment evidence](<output/playwright/look-templates/qa/deployment-evidence.json>). Host SHA `4c7d0c8b6efdc3b28df33a0aad4d24596e59a8aed225d8b227173179186d6a0e`; client SHA `e4ca5d7c071e90d94a559ecf5977d29d7524ff24fef6afeb3957c36b5b707075`.

### Run current checks
`npm test`, `npm run check`, `npm run test:ui:look`, `npm run test:export:templates`. The default UI command and retained `test:ui:flex` alias use the current Look suite; older UI scripts/captures are historical reference, not current acceptance. Native photo checks require the authorized local original A/B outputs or explicit `BS_TEMPLATE_SOURCE_A` / `BS_TEMPLATE_SOURCE_B` paths with verified SHA. Private customer PNGs were not added to published test fixtures; missing sources fail actionably without network/generation. See [native test scope notes](<output/playwright/look-templates/native-test-notes.md>).

### Limits
CSS zoom is not verified real browser zoom. Screen reader and native OS colour-popover checks are unperformed; no formal WCAG certification is claimed. Original source photographs retain baked arrow/UI pixels. Xelius examples demonstrate technical source/renderer behavior, not approved publication artwork. No new paid generation or customer-record mutation occurred.

## Use after activation
Refresh the existing signed-in Harness page. Open a post → Look → Change arrangement. Choose Bold backdrop to start from the supplied Storin hierarchy, then inspect Background & images and review the actual output format. No image request is needed to change composition or reuse an existing asset.
