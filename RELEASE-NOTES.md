# Brand Studio 1.0.0

A local DeepSeek Harness plugin for company brands, campaign planning and guided social design. Everything composes on-device: real text, the company's own assets, licensed bundled fonts.

## What ships

- **Ten arrangements** — Bold backdrop, Subject right, Image lead, Centered announcement, Service sheet, Subject left, Image footer, Framed focus, Type-led, Offset grid. Each has authored geometry for square, portrait, story and landscape; selecting one redraws the main canvas in a single undo step.
- **Six font pairings** — Bold studio, Compact impact, Clean digital, Editorial serif, Geometric modern, Tall editorial. Bundled SIL OFL 1.1 faces with pinned hashes and verified cmap coverage; no network request on selection.
- **Truthful image controls** — independent background, subject and product layers; literal percentage opacity; per-format appearance with shared image selection; explicit "Apply look to other formats".
- **Independent CTAs** — six treatments with unambiguous Fit text, Text column and Poster width semantics, including a genuine safe-width footer.
- **Company planning and brand colours** — companies, campaigns, weekly plans, four poster colour roles, company and campaign design-language defaults for future posts.
- **Review-bound export** — an approved version is an exact bitmap; any later edit invalidates it. Native PNG output at 1080×1080, 1080×1350, 1080×1920 and 1200×628.

## Compatibility promise

Saved scenes keep the renderer generation they were created with. Older posters open in their original look and are never migrated silently; selecting an arrangement is an explicit, undoable change to the editable draft. Existing logos, products, exact copy, colours and fonts remain frozen in saved versions.

## Verification

- 173 domain, receipt, host and security tests.
- Native template suite: all arrangements across four formats and two palettes, glyph-interior contrast, independent image roles at 0/50/100%, CTA widths, font loading and failure gates, snapshot → review → export binding.
- Isolated React/model/renderer UI suite: ten icons driving the real canvas, six pairings with real downloaded PNG parity, opacity pixel interpolation, scope/undo/reload, legacy scenes left byte-identical.
- Production build and module syntax checks pass; the installed bundle runs on the current Harness runtime.

## Known limits

- No publishing or scheduling to social platforms.
- No automatic background removal, no arbitrary font upload, Latin subsets only.
- Text never shrinks silently; overflow blocks review with recovery guidance.
- Signed-in acceptance, real browser zoom, screen readers and native OS colour popovers are not certified by automated checks.
- Sample imagery used in development is not shipped; the repository contains no customer photography.

## Requirements

DeepSeek Harness with a matching runtime (`engines.dsh`), Node.js 22+ for development.
