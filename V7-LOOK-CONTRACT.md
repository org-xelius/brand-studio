# Brand Studio 0.7 — ten icon arrangements and six font pairings

Approved follow-up to0.6. This is a focused Operate-control refinement, not a new application shell or image-generation feature.

## Arrangement interaction
- Ten always-visible schematic SVG buttons in Look, styled like the earlier compact arrangement icons. No expandable poster-card gallery or hidden chooser.
- Clicking a different icon applies its actual current-format geometry to the main canvas as one undoable edit. Reselecting the active icon is a no-op; Reset arrangement defaults remains explicit.
- Icon geometry comes from templatePlan in native normalized coordinates, with data-layout-id/data-format and accessible button name/pressed state. No hidden per-option canvas renderers.
- Keep existing five IDs/plans/resource hashes: bold-backdrop, subject-right, image-lead, centered-announcement, service-sheet. Add subject-left, image-footer, framed-focus, type-led, offset-grid, each authored for all four formats.
- Preserve words, image selections, opacity, colours and pairing. Arrangement selection retains the established reset of template-controlled text sizes, subject placement and CTA layout. Apply look to other formats remains explicit.
- Framed focus alone uses trusted plan backgroundFit=contain; fit the complete photo and truthfully hide inapplicable zoom/crop controls. Blur and opacity remain functional. Other backgrounds retain cover semantics; original foreground/products remain contained.
- Company preferred arrangements use the same ten-item catalog. Existing aliases and saved profiles retain their values.

## Font contract
Shared browser/domain registry FONT_PAIRINGS, resolveFontPairing(options), getRoleBundledFont(options,role):

| ID | Label | Headline / supporting text | Default headline |
|---|---|---|---|
| studio | Bold studio | League Spartan / Source Sans3 |800|
| impact | Compact impact | Barlow Condensed / Source Sans3 |800|
| clean | Clean digital | Archivo / Manrope |800|
| editorial-serif | Editorial serif | Lora / Source Sans3 |700|
| geometric-modern | Geometric modern | Space Grotesk / DM Sans |700|
| tall-editorial | Tall editorial | Oswald / Manrope |700|

Body400; CTA/kicker/brand600. Exact local OFL faces, pinned provenance/SHA and actual cmap coverage. No font downloads on selection, system-font substitution or synthetic unsupported weights.

Optional compiler4 scalar fontPairing at root/per-format overrides. Absent means original voice resolution and MUST remain absent in normalized output. Old1–3 contracts unchanged. No schema/compiler bump or read migration. Existing4 default font routes and approved Storin pixels remain unchanged.

applyFontPairing(poster,id,format) is compiler4-only, atomic and scoped. Clear all five role fontId/weight overrides so the selection actually takes effect; preserve size/leading/tracking/colours and other formats. UI signals custom role-family overrides honestly. Legacy Current look retains three original choices with an explicit arrangement-upgrade hint; old-font selection still clears masked role families atomically.

New loader loadTemplateRoleFonts accepts the old role-loader arguments plus fontPairing. The renderer's absent-pairing path remains the old loader. Domain receipts bind selected file/SHA, exact supported/default weight, ownership, glyph coverage and actual PNG/snapshot options. Save, company/campaign poster look, reload, scope/apply-all, undo, review and export carry the optional field.

## Guardrails and proof
- Main preview redraw only: no full-page reload, random variation, provider request or image regeneration.
- Latest render wins across arrangement/font/image changes. Failed font, missing source, contrast or text-fit errors block review/export with recovery guidance; never silently shorten/shrink text.
- Preserve0.6 evidence under look-templates and earlier historical paths. New outputs belong under output/playwright/look-ten. Private original photos remain local proof dependencies, not published test fixtures.
- Verify10×4×2 native arrangement proofs, all six pairings in each format and main-canvas real UI selection/undo/reload/review/export. Recheck desktop/mobile/light/dark/extra195-CSSpx reflow and keyboard access.
- Build/reactivate the same installed bundle only after verification. No replacement server, customer-record edits or paid calls. Signed-in acceptance, real browser zoom, screen reader and OS popover remain explicitly manual/unverified unless actually inspected.
