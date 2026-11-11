# Brand Studio 0.7 — ten arrangement icons and six font pairings

**Built and activated on 11 November 2026.** Root tests173/173, production build and syntax checks pass. The installed bundle was disabled and re-enabled; it is enabled with Host fibre active and no warnings. Clean access to the existing GUI returns401 (owner authentication), which documents ownership protection rather than signed-in acceptance.

Activation also required widening `engines.dsh` from the exact `0.2.2-rc.1` pin to `^0.2.2-rc.1`, because the running Harness had updated to `0.2.2-rc.2`. No version exemption or risk acceptance was used.

## Changes
- Ten always-available compact arrangement icons, following the earlier schematic setup. Clicking a different icon redraws the main canvas, not a thumbnail or full page. Reselecting the active icon preserves manual changes; reset remains separate.
- Existing five arrangements unchanged; five additions: Subject left, Image footer, Framed focus, Type-led, Offset grid. Each has four authored ratio plans. Original words, sources, opacity, colours and font pairing remain selected.
- Six local font pairings: Bold studio, Compact impact, Clean digital, Editorial serif, Geometric modern and Tall editorial. The last three use Lora/Source Sans3, Space Grotesk/DM Sans and Oswald/Manrope, with real supported headline700 defaults.
- Font selection clears masked per-role families/weights as one undoable current-format edit while retaining sizes/leading/tracking/colours. Advanced overrides are honestly labelled Custom; available weights follow the actual selected face.
- Framed focus contains the complete background photo. Crop/zoom controls are inapplicable and hidden with a reason; opacity and blur still work. Other nine backgrounds retain cover semantics, foreground/products retain original containment.
- Company preferred arrangements use the same ten-item vocabulary. Saved company/campaign poster looks can carry the optional pairing.

## Compatibility
Poster schema3/compiler4 remains. Optional root/per-format fontPairing is absent on older work, resolves through the old voice mapping and is not inserted by normalization. Existing five geometry/resource hashes remain unchanged; no on-read migrations. Legacy Current look retains its original three fonts until an arrangement is explicitly chosen. Saved versions and old compilers preserve their own typography, assets and rendering. No customer-record edits or paid generation are part of implementation or verification.

New font files are verified local Latin variable WOFF2 with exact SHA256, actual cmap/fvar inspection, adjacent SIL OFL notices and [provenance](<assets/fonts/template-pairings-provenance.json>). There is no network font request when choosing a pairing. Font/import ownership and actual receipt/PNG binding remain enforced. Missing faces, unsupported glyphs, contrast/fit failures block review/export; no silent fallback, synthetic unsupported weight, text shortening or automatic shrinking.

## Source and verification
- [Approved contract](<V7-LOOK-CONTRACT.md>)
- [Ten-item catalog and atomic transformations](<template-model.js>)
- [Shared font registry](<font-pairings.js>) and [compiler4 local loader](<src/fonts-template.js>)
- [Compact Look controls](<src/look-controls.jsx>) / [geometry-driven icons](<src/template-icon.jsx>)
- [Native plans](<src/layout-kernel-template.js>) / [renderer](<src/poster-renderer-template.js>)
- **116 current surfaces** individually inspected with current file SHA256: 40 Storin (20 fresh new-arrangement proofs, 20 byte-identical retained), 40 Xelius, 24 font-binding proofs, 2 pacing boards, 2 factory exports, 8 UI captures. [Canonical schema2 QA](<output/playwright/look-ten/qa/summary.md>) / [report](<output/playwright/look-ten/qa/qa-report.json>). Two findings were repaired: split phone numbers in narrow new-arrangement CTAs, and a mid-word arrangement label break. Overall status is **limited** for declared signed-in/accessibility/source-approval scope.
- [Build fingerprints](<output/playwright/look-ten/qa/build-evidence.json>) and [deployment evidence](<output/playwright/look-ten/qa/deployment-evidence.json>). Host SHA `c1ec8549e9ddb832a14388c7afa0205da3bd8c2ad397c4a0acddbff0bec27ebc`; client SHA `b373b4261b47e301eb70e820a7ff0e4c59d94208de7eb397f36459b1e50dbf8f`.
- Existing five arrangements and the approved Bold portrait remain byte-exact; all compilers1-3 and0.6 evidence untouched. Existing0.6 evidence is preserved, not overwritten or relabelled.

## Use after activation
Refresh the existing signed-in Harness GUI (the running URL changed to http://127.0.0.1:62249 after the Harness update). Open a post → Look → click an arrangement icon. For the supplied Storin direction, choose Portrait and Bold backdrop. Choose Font pairing to apply one of six local combinations. Wait for the current preview/autosave, inspect100%, review the exact format, then export.

Signed-in acceptance remains manual unless explicitly performed. Isolated fixture screenshots are not private user acceptance. CSS-zoom coverage is not verified real browser zoom; screen reader and native OS colour popover are unverified. Technical photo proofs preserve baked source pixels and are not blanket approval of publication artwork.
