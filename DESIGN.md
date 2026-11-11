---
name: Brand Studio v0.6
description: Native Harness controls with reference-led arrangements, current-format image controls, fill-only type and independent CTAs; historical motif rendering is retained only for older scenes.
colors:
  primary: "#285fc5"
  primary-hover: "color-mix(in srgb, var(--bs-primary) 90%, var(--bs-primary-ink))"
  primary-ink: "#ffffff"
  background: "var(--dsw-alias-bg-base, #ffffff)"
  surface: "var(--dsw-alias-bg-layer-1, #ffffff)"
  stage: "var(--dsw-alias-bg-module-platform, #f5f6f7)"
  foreground: "var(--dsw-alias-label-primary, #0f1115)"
  muted: "var(--dsw-alias-label-secondary, #61666b)"
  line: "var(--dsw-alias-border-l2, #0000001a)"
  line-strong: "var(--dsw-alias-border-l3, #0000001a)"
  soft: "color-mix(in srgb, var(--bs-accent) 9%, var(--bs-surface))"
  error: "#b12d35"
  focus: "var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary, #4176e6))"
  dark-background: "var(--dsw-alias-bg-base, #151517)"
  dark-surface: "var(--dsw-alias-bg-layer-1, #232324)"
  dark-stage: "var(--dsw-alias-bg-module-platform, #353638)"
  dark-foreground: "var(--dsw-alias-label-primary, #f9fafb)"
  dark-muted: "var(--dsw-alias-label-secondary, #cfd3d6)"
  dark-line: "var(--dsw-alias-border-l2, #ffffff1f)"
  dark-accent: "#9bbdff"
  dark-primary-ink: "#142746"
  dark-error: "#ffadb2"
  poster-accent-fallback: "#f4652b"
  poster-ink-fallback: "#171717"
  poster-paper-fallback: "#f7f5ef"
typography:
  headline:
    fontFamily: "var(--dsw-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif)"
    fontSize: "28px"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  title:
    fontSize: "18px"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.015em"
  body:
    fontFamily: "var(--dsw-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif)"
    fontSize: "var(--dsw-font-s-14-font-size, 14px)"
    fontWeight: 400
    lineHeight: "var(--dsw-font-s-14-line-height, 22px)"
  label:
    fontSize: "13px"
    fontWeight: 500
    lineHeight: "19px"
rounded:
  badge: "5px"
  field: "8px"
  control: "9px"
  panel: "14px"
  welcome-dialog: "16px"
spacing:
  compact: "8px"
  pair: "12px"
  section: "18px"
  panel: "24px"
  editor-gap: "26px"
  page: "28px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-ink}"
    rounded: "{rounded.control}"
    padding: "8px 12px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.control}"
    padding: "8px 12px"
  field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.field}"
    padding: "9px 11px"
  badge:
    backgroundColor: "{colors.stage}"
    textColor: "{colors.muted}"
    rounded: "{rounded.badge}"
    padding: "4px 7px"
  panel:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.panel}"
    padding: "20px"
---

# Design System: Brand Studio v0.7

## Current Look contract (0.7)

The editor remains an Operate surface inside Harness. Keep host typography, live neutral light/dark tokens and blue focus/actions. Do not recolour the interface with company colours.

Look has one ten-item arrangement model: Bold backdrop, Subject right, Image lead, Centered announcement, Service sheet, Subject left, Image footer, Framed focus, Type-led and Offset grid. Restore the earlier compact schematic SVG button grid, always available rather than an expandable poster-card chooser. Icons use real current-format geometry; clicking a different icon redraws the main canvas with current words/assets, stays selected, remains undoable, and does not close the grid. Reselecting the active icon preserves manual tweaks; reset is separate. The supplied Storin portrait remains lead visual authority: monumental full-width headline, integrated lower/right imagery, quiet supporting copy at lower left, brand/site header and a true safe-width CTA footer. Existing five plans remain immutable; every addition has authored native ratio reflow.

Default editing is the current visible ratio, using exactly the resolved values that paint it. Image source, role, literal percentage opacity, crop and positioning belong together; show inactive/missing-image reasons inline. Background choices are shared across ratios, while appearance can differ. An explicit Apply look to other formats replaces conflicting appearance overrides and reflows authored subject positions; manual source positions remain manual. Selection resets template text sizing, subject placement and CTA geometry while preserving words, image sources, colours and opacity. Never silently shrink or rewrite copy.

Motifs are retired from active new Look/company arrangement controls and new template applications. Keep historical assets/renderers for old scenes. Header website text stays editable in Words. Type remains fill-only over real artwork, without rectangles/halos/shadows; product/logo pixels remain original. CTA styles are independent, with unambiguous Fit text/Text column/Poster width semantics.

Normal and narrow layouts must keep every control reachable: desktop1320, mobile390, and the extra195-CSSpx case produced by 390px at 200% CSS zoom. At very narrow effective widths stack arrangement headings, percentage controls and template choices rather than clipping them. CSS zoom checks do not certify real browser zoom, screen-reader behavior or native OS popovers.

Six pairings are locally bundled and explicitly applied: existing studio/impact/clean plus editorial-serif (Lora/Source Sans3), geometric-modern (Space Grotesk/DM Sans), tall-editorial (Oswald/Manrope). New headline defaults700 are real supported weights; supporting defaults400/600 remain exact. Pairing application clears masked custom families/weights as one current-format edit while retaining size/rhythm/colour. Advanced family overrides display a Custom state. Framed focus fits the complete background; do not expose ineffective crop/zoom controls there.

Compiler4 options/resources remain under poster schema3. The optional scalar fontPairing is absent on older records and falls back to the original voice exactly. Opening older work never migrates it. All compiler1–3 kernels and frozen replay remain authoritative for their own scenes. Sources: [0.7 implementation contract](<V7-LOOK-CONTRACT.md>), [0.7 release status/evidence](<V7-RELEASE-NOTES.md>) and [historical0.6 contract](<V6-LOOK-CONTRACT.md>).

## Retained v0.4–0.5 context

The sections below record earlier feature decisions and evidence. Current Look behavior is governed by the 0.6 contract above; old recipes, motif pickers and base-scope controls are historical, not the current interface.

## Overview

**Creative North Star: "A native studio, an expressive poster"**

As built on 10 November 2026 against the [approved v0.4 contract](<V4-UX-IMPLEMENTATION-CONTRACT.md>). Brand Studio is an Operate workspace inside the existing Harness main panel and sidebar launcher, not a replacement shell, iframe or standalone server. Ordinary Harness typography, live neutral host surfaces, hairlines and restrained blue actions replace forest CRUD chrome. Home hands off quickly to actual company work; the editor gives the canvas priority beside a focused inspector.

Artwork remains company-owned Persuade: layered subjects, deliberate hierarchy and a coherent detail motif use each company's palette and licensed fonts, independently of the interface. The pinned orange/black Storin proof direction is a specimen, not a universal company identity. The welcome still life is decorative AI-generated artwork, not a customer project or evidence of activity.

**Key Characteristics:**
- Native Harness font, surfaces, theme and focus; restrained blue actions, not a custom OS shell.
- Grounded company-local Home; dated work, resumable drafts, actual image requests and frozen recent designs.
- Canvas-first editing with Words / Look / Assets and explicit Fit / 100% inspection.
- Three recipes, six flexible arrangements, four independent ratios, licensed voices and independent imagery/type roles.
- Transparent fill-only lettering for new posts and explicit flexible copies; immutable old kernels and per-ratio review.

### Flexible composition extension — 11 November 2026

The [approved 0.5 contract](<V5-IMPLEMENTATION-CONTRACT.md>) extends the same native Operate world. No new shell, font system, theme or welcome artwork was introduced. Six actual reading structures—Lateral, Broadside, Specimen, Centered, Spread and Cover—replace palette-only variation for new compiler3 artwork, with separately authored four-format geometry. Lateral/Centered/Spread use measured headline/body/CTA flow; explicit sizes remain exact. Arrangement sketches are selectors, not invented marketing diagrams; comparisons use the real compositor.

Non-CTA text is fill-only over the actual composite, with no per-text plate, halo, shadow or foreground/photo exclusion hole. Actual opaque-glyph-interior contrast selects ink/paper and blocks unsafe review below 4.5:1; this is not WCAG certification. Original logo/image pixels remain unchanged, including any baked-in background. Filled, rounded, pill, outline and text-only CTA treatments are controlled separately, with six named styles, colours, fit/full width, alignment, padding and arrow. Empty CTA copy paints nothing.

Eight trusted versioned SVGs form a restrained vocabulary rather than generic tech decoration. Creative modular proposes proof marks, responsive frames and answer exchange with Lateral/Broadside/Specimen; Research editorial proposes research folio, decision junction and interface modules with Centered/Spread/Cover. Ribbon and Orbit remain optional. Literal opacity, placement and palette colour are independent; downloadable SVGs remain editable externally. Pools, spacing and CTA defaults are editable proposals; company palette/type settings remain authoritative. No company-name renderer branching or automatic brand-rule replacement exists.

An optional company profile outside the brand kit affects future allocation only; reads never reroll saved posts. A current-post application requires actual preview then explicit Apply. New unsupplied posts use poster version3/compiler3; old kernels/options/receipts stay immutable. Unsupported legacy decorations are hidden in new tools instead of pretending to work. Future company profiles do not enter paint keys; current company name/palette/logo/guidelines and every other relevant input remain fingerprinted.

Current evidence and activation are indexed in [0.5 release notes](<V5-RELEASE-NOTES.md>). New evidence includes 48 individually inspected native matrix cases, nine practical profiles, four boards, eight SVG previews, one direct-over-photo proof and six individually inspected UI captures. All are labelled fixtures, not signed-in customer screenshots. Root/native/editor compatibility checks passed; signed-in acceptance, real-browser zoom, screen-reader and native colour-popover coverage remain limited. The historical 0.4 evidence below is preserved as history, not reused as new 0.5 acceptance.

### Historical 0.4 evidence and limits

This historical documentation pass reads current source, saved reports and all thirteen final blue captures; it does not run builds, tests, browsers, deployment or provider calls. The parent reports **118 root tests**, **34 UI regression checks**, **14 final behavioral groups**, unchanged **14 v2 + 17 v3 fingerprints**, and read-only actual-profile verification of **1 company / 0 campaigns / 2 posts / 6 designs / 6 jobs, 0 writes / 0 provider calls**. The [final matrix](<output/playwright/v4-ui/final-matrix-report.json>) records bounded actual React/model/Canvas checks with shipped Harness styles. The final independent reviewer inspected all thirteen captures and source/report: **SHIP, four findings resolved, zero partial/unresolved findings and no fix-induced material regression**. The pre-fix Nielsen score (28/40) is not a final score; no final rescore was done.

Representative evidence: [light Home](<output/playwright/v4-ui/final-home-light-blue-desktop.png>), [dark editor](<output/playwright/v4-ui/final-editor-dark-blue-desktop.png>), [mobile Home](<output/playwright/v4-ui/final-home-light-blue-mobile.png>), [mobile editor](<output/playwright/v4-ui/final-editor-light-blue-mobile.png>), [600px-high editor](<output/playwright/v4-ui/final-editor-600h-desktop-mac-clearance.png>) and [200% CSS-zoom dialog](<output/playwright/v4-ui/final-dialog-mobile-200percent.png>). These are isolated fixtures, **not signed-in GUI screenshots or real customer work**; March-dated specimens are test records. Build/reactivation evidence is separate from user acceptance. No human v0.4 live acceptance is recorded; clean probes of the existing GUI returned HTTP 401. Real browser zoom, VoiceOver, RTL, formal accessibility/WCAG compliance and universal platform safety are not certified. See [v0.4 release notes](<V4-RELEASE-NOTES.md>) for the evidence index and exact limits.

## Colors

### Primary
The parent selected blue after the same-data orange/blue, light/dark, desktop/mobile comparison. Blue aligns with native Harness focus/selection and the welcome image's cobalt material; orange remains an implementation comparison variant, not a new company palette or an exposed theme setting. Both passed primary-button text contrast: light orange (5.20:1), blue (5.94:1); dark orange (8.96:1), blue (7.89:1). Selection is a coherence judgement, not evidence of conversion or user preference research. Errors and uncertain jobs retain explicit wording, never accent alone.

### Neutral
[The stylesheet](<src/studio.css#L2-L13>) scopes semantic aliases to the studio: host base/layer/platform backgrounds, primary/secondary labels, level-2/3 borders and interactive hover. The frontmatter preserves the actual CSS alias expressions and their standalone fallbacks rather than replacing the host's live tokens with a copied palette. Light is neutral white; dark is neutral charcoal, not green-tinted slate.

**The Host Authority Rule.** Inherit ordinary `--dsw-*` font/surface/focus tokens. `body[data-ds-dark-theme]` selects dark; a host-fixed light choice wins over OS dark whenever `html[data-ds-theme-source]` exists. `prefers-color-scheme` is fallback only outside a host. Native dialogs inherit font and colour-scheme; do not inject another theme.

### Poster roles
Company setup groups four independent native colour pickers with visible hex values under **Brand colours**: Primary (`company.color`), Accent (`brandKit.accent`), Brand ink (`brandKit.ink`) and Brand paper (`brandKit.paper`). The group is always visible, with two columns on desktop and one on narrow screens; typography remains separate in optional details. Existing absent ink/paper display effective renderer defaults (#171717/#f7f5ef), while missing accent displays effective ink. Opening, cancelling or saving an unchanged legacy company does not materialize absent palette fields. New companies explicitly initialize all four roles; duplicate colours are allowed. The optional accent is six-digit hex validated, retained by unrelated partial brand-kit updates, and needs no storage-version migration.

The [retained palette resolver](<src/poster-renderer.js>) and [classic v3 renderer](<src/poster-renderer-v3.js>) remain unchanged. The [crisp-only adapter](<src/poster-renderer-crisp.js>) returns the exact old palette when accent is absent. When explicitly configured, primary remains the brand field, paper the light field and ink the dark field; accent fills rail/capsule CTA areas. CTA text chooses the stronger ink/paper contrast; explicit-accent filled CTAs below4.5 contrast block review/export with an actionable error. Text-only actions do not paint an accent field. Existing field/text4.5 checks remain. Classic unmarked v3 retains its field-colour glyph outline; compiler2 retains fill-only glyphs and whole-block protection over imagery/tonal fields. Existing snapshots without accent reproduce their original output, and saved scenes always use frozen company colours. Current palette edits require fresh version-specific review. Future image briefs with an explicitly configured accent name all four roles; missing-accent queued snapshots retain byte-exact old prompts. These heuristics are not an accessibility certificate or analysis of every image pixel.

The frontmatter's poster colours are **renderer fallbacks, not a universal customer palette**. Company primary colour overrides the orange fallback; company-form initial values and existing brands may differ from the renderer's missing-value defaults.

**The Two Worlds Rule.** Shell tokens style controls; company palette and licensed poster typography style exports. Neither host dark mode nor the blue primary button recolours a poster.

## Typography

### Interface
Use ordinary `--dsw-font-family`, **not** Harness's Montserrat brand-family token or conversation-size preference. The body inherits the host's ordinary (400, 14px / 22px) interface role; native platform fallbacks are recorded above. Page headlines reduce to (25px) on narrow containers; Home has its own (26px, 600) heading, reducing to (24px / 22px). The inspector heading is (19px / 26px). Field labels use (13px / 19px, 500); help commonly uses (12px / 18px). Paragraphs cap at (72ch). Compact short-height desktop actions can use (11px); this is not a claim that every label is 14px.

The [layered-print/frame studio mark and icon family](<src/icons.jsx>) replace the old B tile. Controls use a common (24-unit) SVG grid with rounded (1.8-unit) strokes; the separate (32-unit) mark uses (2.2-unit) strokes. Labels belong to owning controls; decorative SVGs are hidden from assistive technology. No emoji, icon font, fake macOS traffic lights or brand display font enters the operational shell.

### Poster voices
Five bundled WOFF2 files retain three display/body pairings; all are SIL OFL 1.1, pinned and bundled into the build. See [v2 font passports](<src/fonts.js>), [v3 font passports](<src/font-passports-v3.js>), [v3 role loader](<src/fonts-v3.js>) and [licences/provenance](<assets/fonts/README.md>).

| Voice | Default display (800) | Default body (400 / 600 for other roles) |
|---|---|---|
| Bold studio | League Spartan | Source Sans 3 |
| Compact impact | Barlow Condensed | Source Sans 3 |
| Clean digital | Archivo | Manrope |

V3 adds independent headline, body, CTA, kicker and brand family/normal-weight/size/leading/tracking controls. Blank fields inherit authored defaults. Bundled variable weight ranges differ by face; Barlow Condensed remains (800) only. Imported families expose only cached approved normal weights. The [curated ten-family catalogue](<font-catalog.js>) is a local searchable list, **not full live Google Fonts discovery**. First import fetches public CSS, OFL notice and selected font files with no Google API key, no OpenAI credential, and no draft words sent. [The font service](<font-service.js>) verifies actual SHA-256 and cmap, retains licence/provenance and caches private company-owned bytes; subsequent rendering does not need the public source. Arbitrary font upload/URL and italic controls are absent.

FontFace readiness and exact cached bytes are required before measurement/drawing. V3 glyph checks use verified per-file cmap coverage rather than a family-name guess; this is not general multilingual shaping, RTL, emoji or bilingual support. Unsupported characters and missing/mismatched faces block review/export instead of falling back. Only Anton (400) has a live public import smoke check; the other nine families have not been live-fetched, and WOFF2 parser tests use synthetic fixtures.

### Composition
Semantic roles are brand, optional kicker, headline, supporting text and exact CTA. The coordinate width is (1080), with landscape scaled to output pixels. V3 default headline size is (84–156 units before variation/scale); default leading is (1.02), body (1.3), other roles (1.1). Role size bounds: headline (48–260), body (20–84), CTA (20–72), kicker (18–64), brand (20–64). Leading spans (0.85–2), tracking (-0.04–0.2 em). These are bounded layout inputs, not universal readable-size guarantees.

Explicit newlines, including blank lines, are preserved. V3 never silently shrinks explicit styles; overflow blocks review/export. **Preset headline scale** (0.85–1.15) affects the automatic headline alone and is disabled when an explicit headline size is selected. V2 retains all-role scale and now labels it **Overall text scale**. Auditions compare **Balanced / Headline first / Subject first** locally: authored geometry/preset headline changes, not new generated images, new font selections or changes to requested numeric role styles. Important-phrase underline uses existing headline words without rewriting copy.

**The Exact Words Rule.** Do not invent claims, contacts, offers, or substitute AI lettering for editable text. Long unbreakable strings and overflow need a deliberate edit or another arrangement.

## Layout

### Workspace
Content is centred at a maximum width of (1500px), with horizontal page padding (28px). The editor places the flexible preview first in DOM and on screen, with a (340px) inspector and (26px) gap. At container width (1100px) or less the inspector becomes (320px), gap (18px), page padding (22px). At (760px) or less it stacks **preview first**, removes independent pane scrolling, and provides sticky Preview / Edit / Review shortcuts that scroll and focus the selected section. At (460px) or less paired fields become one column and format thumbnails two. Header utilities become labelled icon controls on small screens while the company selector retains useful width. Preserve the host's native top clearance; never imitate an OS titlebar.

Desktop panes have bounded independent scrolling and a runtime viewport-derived height. The result stage flexes above a non-overlapping review dock, and the inspector scrolls separately. At ordinary (1320 × 1000) evidence, the stage is (448px) high; with native (48px) frame clearance, (700px)-high and (600px)-high windows show a (240px) and (140px) tall Fit bitmap respectively. This deliberately trades Fit inspection size for reachable actions, not export quality: choose **100%** and pan horizontally/vertically for glyph edges. Fit and 100% alter CSS presentation only; neither resamples the exported PNG. The narrow stage is (330px) high. Role typography, layer placement, font import, format auditions and receipt details remain progressive disclosures.

### Home
[Home](<src/home.jsx>) is a compact welcome followed by selected-company work. [Read-only selectors](<home-model.js>) use company-local dates, include past intended dates and the next seven days, preserve unscheduled/one-off continuation, show actual queued/running/unknown requests, and open saved recent designs with their frozen scene/resources. Paused/inactive campaigns are not presented as current unfinished work. Next steps are distinct exception/review/planning actions, not duplicate draft lists or fabricated metrics. The date updates while the panel is open; intended dates are explicitly **not a publishing schedule**.

The welcome uses a genuine AI-generated material still life with real prompt/hash provenance in the [asset manifest](<assets/welcome/manifest.json>). At the owner's request, no AI-generated label or caption is displayed; the purely decorative image has empty alt text and an aria-hidden wrapper. The original [PNG](<assets/welcome/hero.png>) is (1536 × 1024, 1,962,713 bytes); its [WebP derivative](<assets/welcome/hero.webp>) is (82,632 bytes), same dimensions, **no resize**. The [derivative record](<assets/welcome/web-derivative.json>) retains both hashes. On desktop/tablet the artwork bleeds to the welcome card's top, bottom and right inside its rounded border. A CSS alpha mask fades left into the actual host surface; no white wash is baked in. A bounded right artwork region (desktop maximum420px) leaves a protected copy/action area. At560px and below, a compact upper-right band also fades downward before full-width description/actions; at320px and below, the artwork stacks safely in normal flow. It never becomes a full-screen splash or intercepts controls. Empty states ask for real setup, never seed customer activity.

### Output arrangements

The table retains **classic v3** specimen proofs and dimensions; it is not the v0.4 crisp/final UI acceptance set. Current crisp checks are indexed in the [v0.4 notes](<V4-RELEASE-NOTES.md>).

| Output | Pixel dimensions | Hero proof | Showcase proof | Editorial proof |
|---|---|---|---|---|
| Square 1:1 | 1080 × 1080 | [PNG](<output/playwright/v3-renderer/hero-square.png>) | [PNG](<output/playwright/v3-renderer/showcase-square.png>) | [PNG](<output/playwright/v3-renderer/editorial-square.png>) |
| Portrait 4:5 | 1080 × 1350 | [PNG](<output/playwright/v3-renderer/hero-portrait.png>) | [PNG](<output/playwright/v3-renderer/showcase-portrait.png>) | [PNG](<output/playwright/v3-renderer/editorial-portrait.png>) |
| Story 9:16 | 1080 × 1920 | [PNG](<output/playwright/v3-renderer/hero-story.png>) | [PNG](<output/playwright/v3-renderer/showcase-story.png>) | [PNG](<output/playwright/v3-renderer/editorial-story.png>) |
| Landscape ≈1.91:1 | 1200 × 628 | [PNG](<output/playwright/v3-renderer/hero-landscape.png>) | [PNG](<output/playwright/v3-renderer/showcase-landscape.png>) | [PNG](<output/playwright/v3-renderer/editorial-landscape.png>) |

These are twelve separately staged arrangements, not crops of a finished square. V3 Hero uses a monumental message, independent atmospheric backdrop and foreground subject, optional original product, and anchored action. Showcase contains the complete original screenshot/product without cropping, recolouring or perspective; the old v2 browser-frame treatment is not the v3 policy. Showcase can draw a backdrop but not the cutout foreground. Editorial is type-only except the logo, with one restrained motif and a two-column information layout in landscape. Story reserves generous top/bottom breathing room. The manifest names its insets **Brand Studio conservative composition v3**, not platform certification or an exhaustive safe-region analyser.

Proofs are specimens, not approved customer campaigns: Hero uses an existing synthetic woman with a **rough manually polygon-masked derivative**, showing a yellow halo/hard sleeve edges. It is labelled test-derived, not an authentic supplied transparent cutout or automatic-removal result. Showcase uses a synthetic screen; “Storin” is typeset text, not an original standalone customer logo. No original standalone Storin logo or real website screenshot was supplied. The reused human image is not an endorsement. Those classic poster specimens required no new paid call; the separate v0.4 welcome illustration used exactly one approved request.

## Elevation & Depth

The shell is flat by default: neutral tonal layering, hairlines and whitespace separate work. The bitmap has a restrained offset preview shadow (`0 7px 22px #0000001a`); the active inspector tab has a small separation shadow (`0 1px 3px #00000012`). Native dialogs use a structural shadow (`0 18px 60px #00000035`) and dim backdrop (`#10121666`), not glassmorphism. Control transitions are short (background/border/text, 120ms ease-out); reduced-motion disables transitions, animation and smooth scrolling.

V3 artwork depth is explicit: backdrop opacity (0–1), blur (0–24), independent foreground position/scale/rotation/shadow, and headline front/behind ordering. Foreground shadow uses Canvas opacity `strength × .45`, blur `24 × strength` and vertical offset `12 × strength`. Protective exclusions keep essential copy/logo/action visible; warnings flag intersecting silhouettes and canvas bleed. Compiler 2 isolates text from imagery blur/shadow and uses normal fill antialiasing, not decorative glyph outlines. This is not automatic subject extraction, vector PNG, or a perspective-device system. The retained v2 straight-frame shadow is unchanged. Extensions live in the [design sidecar](<.impeccable/design.json>), not invented frontmatter groups.

## Shapes

Controls are gently rounded (9px), fields slightly tighter (8px), inspector panels broader (14px), welcome/dialogs (16px), and badges compact (5px). These are observed current shapes; unrelated old parser/token drift is outside this refresh. Selected thumbnails combine border and outline, not colour alone. Poster fields and original imagery retain deliberate geometry rather than inheriting editor cards. The v3 detail kit permits one none/ribbon/orbit motif and rail/capsule/text action; capsule rounds by half the action height. Motif text must be supplied words, never invented services. Logos and product/screenshot assets retain original proportions; no stretching, fake reconstruction or arbitrary screenshot crop.

## Components

### Controls and navigation
Primary buttons use the selected blue with white labels in light mode and pale blue/dark labels in dark mode. Secondary actions inherit neutral host surfaces with a fine border. Baseline buttons are (40px) minimum, fields (42px); narrow primary controls, utilities, magnification controls and fields use (44px) targets. Compact short-height desktop review actions use (36px), so do not claim every control is 44px. Shared focus uses the host ring width (2px fallback), host ring colour and (3px) offset. Disabled controls dim and use a not-allowed cursor. Native labels/selects/details and save-state text retain operational meaning.

Home is the default navigation destination; This week, Campaigns, Create and Past designs remain reachable. Active navigation has a restrained filled state with accent text; selected inspector tabs use neutral elevation and keyboard arrow/Home/End navigation. Status badges carry text. Native dialogs have associated visible titles, a named close control, sticky header, modal focus containment and Escape; their bounds account for CSS zoom. The tested 200% CSS-zoom title wraps aggressively at the extreme narrow width; it remains named, with close/focus inside the viewport. This is not real-browser zoom or screen-reader certification.

### Guided scene editor
[React controls](<src/client.jsx#L165-L186>) group exact copy into Words, recipe/typography/layers/detail/import into Look, and local assets/separate paid generation into Assets. They retain independent role typography, layered depth, one coherent detail kit, curated fonts, emphasis, kicker, alignment, local undo (up to 30 states) and reset. Base edits flow into ratios without overrides; “This format only” deep-merges partial v3 role/layer/detail values. V2 keeps its prior shallow behaviour. [Saved-look controls](<src/client.jsx#L170-L182>) persist company/campaign poster options for future posts, never retroactively restyling existing posts. Applying a campaign look to an existing draft is explicit and preserves that draft's classic/crisp compiler identity; it is not a covert lettering upgrade.

Separate logo, product/screenshot, backdrop and foreground uploads accept PNG/JPEG/WebP up to 5 MB. Backdrops accept generated or uploaded backdrop assets; foreground accepts owned foreground/product assets. Product showcase requires an original product/screenshot; generated imagery cannot satisfy that evidence role. Originals remain fully contained and alpha is respected, not manufactured. Foreground transforms span x/y (0–1), scale (0.4–2), rotation (-25–25°), shadow (0–1). Backdrop scale/crop are distinct from foreground controls. There is no freeform dragging: hit regions are inspection data, not an unrestricted canvas editor.

Queued autosave retains user focus and only canonicalises the draft it actually saved. State acceptance rejects older revisions so delayed refreshes cannot overwrite newer imports/changes. The labelled field keeps additional children such as the image-model datalist. These are state/interaction guarantees, not a new visual style.

### Versioned render paths
[The compositor](<src/compositor.js#L10-L14>) routes root `poster.version: 3, compilerVersion: 2` to [the additive crisp compiler](<src/poster-renderer-crisp.js>), unmarked v3 to [the frozen classic renderer](<src/poster-renderer-v3.js>), v2 to [its retained renderer](<src/poster-renderer.js>), and legacy documents to v1. Absence of the compiler marker means original v3 compiler 1; normalizing old options never inserts 2. No schema-4 migration or ratio-specific compiler marker exists.

New posts inherit their saved look with compiler 2. Existing v1/v2/classic-v3 drafts and all frozen scenes remain on their original kernels/options until **Create crisp editable copy** is explicitly chosen. From a classic draft, open **Look → Create crisp editable copy**; inspect with current company settings and review anew. The action starts a crisp editable state for that post, not a duplicate company/campaign; saved versions remain untouched. Scene, manifest, receipt and fingerprints bind compiler identity, so changing it invalidates prior approval. Retain old renderer/font bytes and version decisions rather than silently restyling history.

The diagnosed classic artifact was field-coloured `strokeText` bands (minimum 6 layout units), not PNG compression or font-load failure. Compiler 2 draws all five semantic roles with `fillText`, without glyph stroke, blur or shadow. Over visible backdrops/tonal fields it adds one opaque palette-field rectangle per non-CTA text block, including measured ink extents and (8-unit) padding, rather than a letter-shaped halo. Image blur/smoothing and foreground shadows remain independent. Normal antialiasing is expected. [Native Chromium evidence](<output/playwright/crisp-renderer/checks.json>) records exact fill-reference edge matches across all five roles, all four output dimensions, controlled DPR1/2 decoded-pixel SHA equality, and reviewed/downloaded Blob identity. These are bounded same-environment checks, not perpetual cross-browser PNG equality.

V3 resolves options/palette and exact fonts, then draws backdrop → optional tonal surface/motif → behind-headline if selected → independently transformed foreground and contained original → front-headline if selected → protected remaining copy/logo/action. Its manifest records explicit selected asset IDs separately from painted resources, actual fonts/digests/metrics, exact copy, transforms/layer order and conservative safe insets. It never attributes a resource to an unrelated latest design.

Async rendering uses private staging canvases; only the latest completed bitmap is published. Review/export re-check identity around asynchronous work, and rendering/local edits never call the paid image API.

### Snapshot, review, export, and history
[Scene persistence](<model.js#L118-L142>) freezes company/post inputs and image references. V3 scenes include selected imported font metadata clones; old states can omit the optional global fonts array. Modern snapshots are immutable. Commissioned outputs start unreviewed without a receipt; explicit current review supplies it. V3 review additionally persists `renderReceipt: {manifest, pngSha256}`: the [browser review path](<src/client.jsx#L142-L145>) captures a completed PNG Blob, computes its SHA-256 and sends the manifest/digest to snapshot creation. [Domain receipt checks](<model.js#L526-L583>) bound plain JSON size/complexity, match copy/assets/resolved options, and validate role styles plus bundled/imported font file/digest references against the frozen scene.

Review requires saved current inputs, a completed error-free render and explicit human confirmation. Any changed copy, company brand, assets, typography, format, overrides or fingerprinted post detail invalidates approval. The server requires the **specific reviewed current design ID**, matches its receipt digest for v3 export and rechecks offer validity. Each ratio needs its own review. V3 export downloads the **exact captured Blob**, not a rerender. The UI asks the user to check browser downloads.

**The receipt is client-computed, not server PNG retention or server verification of captured PNG bytes.** It does not guarantee future pixel replay under arbitrary browser/font/renderer changes. Reopening history redraws frozen scene/resources; v2 retains runtime-manifest-only behaviour, without persisted v3 receipts. History is view-only. Create an editable v3 copy with current company settings, inspect and review anew; historical approval never approves a changed draft. Legacy history explicitly lacks the original frozen brand snapshot.

### Spending boundary and current exclusions
Generation remains a separate paid confirmation with an inspectable prompt and no automatic retries. Editorial draws no selected backdrop/foreground/product imagery (logo remains valid), warns about unused selections and blocks commissioning in UI/model, including batches. V2 showcase and Hero with an original product also block paid backgrounds their renderer ignores; an explicit v3 copy enables independent layers. V3 showcase genuinely uses the backdrop. Planning, auditions, font/layout/detail changes and local composition make no OpenAI calls; first font import does make public font/licence requests.

The welcome illustration used exactly **one** user-approved, host-only Images API request through configured Harness credentials, with HTTP 200 recorded in [task status](<output/welcome-task/status.json>). It creates no company/campaign/post records. The [local gate](<output/welcome-task/approved.json>) is now `approved:false`; the [permanent one-attempt claim](<output/welcome-task/attempt.json>) is retained. Exclusive durable claim precedes credentials/network; no retry on failure, timeout or activation. No further illustration generation is authorized. This is separate from zero-provider-call poster tests.

Not shipped: arbitrary font upload, automatic background removal, perspective devices, carousel/ZIP output or publishing. Font/asset readiness, cmap, overflow, safe-inset and palette checks do not certify aesthetics, factual claims, rights, accessibility or platform approval. Crop, placed resolution, density, missing logo, protected silhouette and fixture-edge quality still require human judgement.

## Do's and Don'ts

### Do:
- **Do** keep the calm Harness editing shell separate from company-owned artwork.
- **Do** preserve exact copy, original asset proportions, and explicit per-ratio review.
- **Do** inspect warnings at feed size and full resolution, especially crop, dense copy, and small original logos.
- **Do** treat runtime manifests, frozen scenes, downloaded bytes, and user confirmation as different kinds of evidence.

### Don't:
- **Don't** silently substitute fonts, truncate words, fabricate original logos/screens, or imply synthetic specimens are customer work.
- **Don't** call local composition a paid generation, queue paid editorial imagery, or retry uncertain billed requests automatically.
- **Don't** mutate saved v2/v3 scenes, silently migrate old artwork, or promote historical review to a changed draft.
- **Don't** present a client-computed receipt as server-retained PNG proof or a perpetual future-pixels guarantee.
- **Don't** call the curated importer full Google Fonts search, require a Google API key, or imply arbitrary font upload/background removal exists.
- **Don't** claim formal WCAG, VoiceOver/RTL, real-browser zoom, platform approval, live v0.4 acceptance or perpetual cross-browser PNG equality from isolated fixtures.
- **Don't** silently upgrade classic lettering, treat Fit size as PNG quality, duplicate ordinary drafts in exception tasks, or reopen the spent welcome-generation gate.
