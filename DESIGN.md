# Design System: Brand Studio 1.0

A local design studio that lives inside DeepSeek Harness. The shell is quiet and native; the poster is expressive and company-owned. Those are two separate worlds and never borrow each other's colour.

## The host rule

Brand Studio inherits ordinary Harness tokens: `--dsw-*` font family, surfaces, hairlines, focus rings and the blue primary action. It does not restyle the Harness shell, inject a theme, imitate an OS titlebar, or recolour controls with a company palette. `body[data-ds-dark-theme]` selects dark; a host-fixed light choice wins over OS dark via `html[data-ds-theme-source]`; `prefers-color-scheme` is a fallback only outside a host.

## Interface

- **Type:** ordinary host family. Body 14/22, field labels 13/19 medium, help 12/18, page headline 25px collapsing to 24/22 on narrow containers, inspector heading 19/26. Paragraphs cap at 72ch.
- **Icons:** one authored SVG family on a 24-unit grid with 1.8-unit rounded strokes, a 32-unit layered-print mark with 2.2-unit strokes. No emoji, icon fonts or display faces in the shell.
- **Layout:** content max 1500px, page padding 28px; editor is preview-first with a 340px inspector and 26px gap. At ≤1100px inspector 320px, gap 18px, padding 22px. At ≤760px panes stack preview-first, independent scrolling stops, and sticky Preview/Edit/Review shortcuts appear. At ≤460px paired fields become one column.
- **Depth:** flat by default — hairlines and whitespace do the separating. The bitmap carries a soft preview shadow `0 7px 22px #0000001a`; native dialogs use `0 18px 60px #00000035` over `#10121666`. No glassmorphism.
- **Motion:** 120ms ease-out on background/border/text only; `prefers-reduced-motion` disables transitions, animation and smooth scroll.

## Poster artwork

The poster is a separate committed world. It uses the company's four colours and its licensed type — never the interface blue.

**Brand colours:** Primary (`company.color`), Accent, Brand ink and Brand paper, each a native picker with visible hex. Missing ink/paper fall back to `#171717`/`#f7f5ef`; a missing accent follows ink. Saved scenes freeze their colours; recolouring current artwork requires a fresh review. Filled CTAs whose text contrast drops below 4.5:1 block review instead of shipping unreadable type.

**Text:** semantic roles — brand, optional kicker, headline, supporting text, action — plus explicit newlines. Coordinates are 1080-wide units, scaled natively for landscape. Non-CTA lettering is fill-only: no plates, halos, shadows or photo-exclusion holes, ever. Contrast is measured inside actual glyph pixels over the real backdrop. Unsupported glyphs, missing faces and overflow block review; nothing is silently shrunk or rewritten.

**Images:** three independent roles. Backdrops cover their authored box and may be cropped, zoomed and blurred; foregrounds keep proportions with independent position, scale, rotation and opacity; product/screenshots are always contained and uncropped. **Framed focus** is the one arrangement that contains the complete background, so its crop controls are absent rather than ineffective.

**Geometry:** every arrangement has an authored plan for square 1080², portrait 1080×1350, story 1080×1920 and landscape 1200×628. Reflow is authored per ratio — not a crop of one square. Review binds the exact rendered bitmap; any edit invalidates it.

## Arrangements

Ten choices, presented as compact schematics that mirror the real layout regions: Bold backdrop, Subject right, Image lead, Centered announcement, Service sheet, Subject left, Image footer, Framed focus, Type-led, Offset grid.

The supplied reference hierarchy remains the lead: monumental headline, integrated lower/right imagery, quiet supporting copy, brand/site header and a true safe-width action. Other arrangements deliberately change reading order, not just scale.

## Typography pairings

Six locally bundled pairings: Bold studio (League Spartan / Source Sans 3), Compact impact (Barlow Condensed / Source Sans 3), Clean digital (Archivo / Manrope), Editorial serif (Lora / Source Sans 3), Geometric modern (Space Grotesk / DM Sans), Tall editorial (Oswald / Manrope). All SIL OFL 1.1, pinned by SHA and verified cmap coverage. New display faces default to 700; supporting text 400; action, kicker and brand 600. No runtime download, no silent fallback, no synthetic unsupported weight.

## Responsive floor

Desktop 1320×1000, mobile 390×844 and the 195-CSSpx effective width produced by 390px at 200% CSS zoom must keep every control reachable. Arrangement headings, percentage controls and template choices stack rather than clip. CSS-zoom checks are not a claim about real browser zoom, screen readers or native OS popovers.

## What this is not

Not a publishing tool, not an automatic background remover, not a stock library, and not a WYSIWYG for arbitrary typography. It will not invent claims, logos, testimonials or statistics, and it will not trade legibility for a decorative effect.
