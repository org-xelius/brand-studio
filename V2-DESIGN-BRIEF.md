# Brand Studio v2 — art-directed, editable campaign posters

**Status:** approved implementation direction (10 November 2026). This document describes the target and rationale; consult the current README and verification notes for the implemented scope and observed limits, rather than treating every proposal below as shipped.

## Recommendation

Build a **guided art-direction system**: a small library of excellent, flexible poster recipes; a real typography system; editable semantic layers; and reusable campaign art direction. Do not substitute a large template catalogue, a blank Canva-like canvas, or an entirely AI-rendered poster for this work.

**Templates supply the design judgement. Flexible edits supply the control. AI supplies commissioned imagery.** Exact copy, logos, contact details, and product screenshots remain protected local content.

The editor is an **Operate** surface and should stay calm inside Harness. The exported poster is a **Persuade** surface and must express the active company, not the editor's green/system-font visual language.

## 1. What the references establish

The supplied examples span different styles, but their shared quality comes from composition rather than one fashionable font:

| Reference direction | Transferable design principle | Not something to copy automatically |
|---|---|---|
| Orange/black Storin sculpture | Monumental typography, a memorable hero, restrained palette, type/image interaction, clear CTA | Its exact sculpture, logo rendering, ribbons, or coordinates |
| Light-blue device launch | A purposeful type hierarchy, calm negative space, tangible product proof, restrained accent | Another agency's website or visual identity |
| Human-cutout agency posters | Subject separation, asymmetry, foreground/background depth, clear message lanes | A stock person's likeness as a customer endorsement |
| Website/device showcases | Show the service through a real screen; integrate benefit callouts into the product composition | Unprovided client results, invented interface features, or claims such as “1000+ clients” |
| Recruitment, service, and tips posters | Structured information, semantic emphasis, repeatable graphic motifs | Placeholder contacts, watermarks, marketplace preview borders, or “images not included” labels |

The four supplied AVIF files were inspected through lossless-format PNG working copies, without altering the originals. Several references are marketplace previews; their outer mockup frames and sample content are not the finished social design.

### Why the current export feels different

The current renderer has three fixed image/text partitions. At a 1080-pixel width, its headline is approximately 56 pixels and its body 28 pixels. It uses system fonts and a hard-coded dark-green headline; only the CTA inherits the company colour. In the story example the picture owns roughly the upper 65%, while the words sit near the top of the remaining white panel, leaving a large unused lower region.

That is a usable image-plus-caption composition, not yet the poster system demonstrated by the references. Empty space is not intrinsically wrong; here it is not helping the headline, brand, or action communicate. Changing the image model or adding a new font menu alone will not fix this.

## 2. Templates versus flexibility

| Approach | Good at | Why it is insufficient as the default |
|---|---|---|
| Static fill-in templates | Fast, predictable repetition | Break under real copy, feel repetitive, and make a campaign look like unrelated template purchases |
| Unrestricted canvas | Maximum manual expression | Transfers the designer's job to a novice; easy to break alignment, type hierarchy, and brand consistency |
| Entire poster generated as an image | Fast visual concepts and expressive imagery | Final copy/logo fidelity, small edits, repeatability, provenance, and local editability are weaker; another word change can require another paid generation |
| **Art-directed recipes + bounded layers** | **Quality with understandable control** | Requires fewer, better-authored recipes, font engineering, deliberate ratio layouts, and real visual validation |

A recipe is not a set of immovable boxes. It encodes **relationships**: headline-to-hero prominence, reading order, permitted overlap, logo clear space, CTA treatment, copy capacity, and how those relationships change by format.

## 3. A small, strong initial recipe collection

Start with three families, each with a small number of meaningful variations and authored arrangements for square, portrait, story, and landscape. These are proposed designs, not existing capabilities.

### A. Hero statement

For brand campaigns, service promotions, portraits, and sculptural concepts.
- Solid brand field or full-bleed scene; oversized type; one dominant subject.
- Controlled layering between hero, typography, and a small number of graphic motifs.
- A clearly anchored original logo and one action.
- Supports either a supplied transparent cutout or a properly composed opaque image. Putting type *behind* a subject specifically requires an actual alpha mask/cutout; do not pretend a rectangular photo can provide it.

### B. Website / product showcase

For websites, apps, products, launches, and portfolio posts.
- The actual website screenshot or product photograph is the evidence.
- Locally composed browser/device framing, exact text, and optional approved benefit callouts.
- A generated scene can provide atmosphere, but must not redraw a real interface or invent functionality.
- Begin with well-crafted supported frames. Angled/perspective mockups need a tested screen-mapping implementation; they are not an automatic property of image generation.

### C. Editorial / information

For announcements, recruitment, service lists, tips, and educational content.
- Type-led hierarchy with purpose-built roles for kicker, headline, list, qualifier, and CTA.
- Intentional rhythm, short information groups, and an optional supporting illustration.
- Short tips can share one poster; long explanations need another layout or a user-approved multi-card treatment, not microscopic text.

A few excellent families are better than dozens of mediocre skins. The first proof should reproduce the *level of craft* in the references, not merely contain the same categories of objects.

## 4. Typography must be a system, not a font picker

### Approved type voices

Offer a small, brand-scoped catalogue with real font files, weights, supported scripts, and redistribution/embedding rights. Proposed starting directions include:
- **Bold studio:** League Spartan 800/900 with Source Sans 3 400/600.
- **Compact impact:** Barlow Condensed 700/800 with Source Sans 3 400/600.
- **Clean digital:** Archivo 700/800 with Manrope 400/600.

These are candidates, not bundled or approved fonts yet. Verify exact licences, files, weights, and required glyph coverage before shipping. A company normally chooses one display/body pairing, not a new pairing for every post. The editor's own workhorse UI font can remain unchanged.

### Semantic type roles

Store a role plan: kicker → headline → key-phrase emphasis → supporting copy → action/contact → required qualifier. The strongest contrast in size and weight belongs to the message that should be remembered. Accent colour is not automatically a legible text colour.

For a 1080-pixel-wide poster, a short display headline might start around **96–160 px**, supporting copy **32–44 px**, and a CTA **32–40 px**. These are design starting ranges, not universal fit rules or accessibility guarantees. Each recipe and output ratio needs its own tune, tested at realistic viewing size; small metadata must never carry the main message.

### Line composition and fit

- Let the user select the important phrase and insert deliberate line breaks without changing the underlying words.
- Measure the actual pinned font at its real weight; never rely on generic character counts or synthetic bold.
- Tune line height, tracking, alignment, and optical spacing for the selected type voice.
- Protect URLs, amounts, dates, and necessary qualifiers from destructive wrapping or separation.
- Try approved line arrangements and bounded scale adjustments. Never silently rewrite copy, truncate it, or shrink past a declared readable floor.
- When content cannot fit, offer a different arrangement, another format, or a separately approved copy edit. Carousel conversion is a future capability unless implemented and verified; it must not be presented as available before then.
- Load/verify fonts before measuring or exporting. A missing required font is a visible blocker, not permission for an unnoticed fallback.

### The non-obvious control worth building

Offer three **local typography auditions** using the same exact copy and asset: e.g. headline-led, subject-led, and editorial. Show them at phone/feed size before full-size inspection. The user's decision becomes “what should people notice first?” rather than “which of 200 fonts should I pick?” A three-second glance is a useful human test, not an automated beauty score.

## 5. Campaigns should remember art direction

Separate the following:

1. **Company brand kit:** original logo variants and clear-space rules; palette roles; approved type voice; tone; real product/screenshot assets.
2. **Campaign art direction:** selected recipe families; image character; typography relationships; motifs; CTA treatment; permitted variation.
3. **Weekly message plan:** the purpose and approved content of each post, plus factual/offer validity.
4. **Post design:** the chosen arrangement, exact copy, imagery, emphasis, and local overrides.
5. **Format versions:** separately staged square, portrait, story, and landscape documents.

“Save this campaign look” stores relationships and approved styling, not a screenshot or one set of coordinates. Subsequent posts should resemble the same campaign while varying image scale, emphasis, information density, and composition appropriately. A statement, a real-work showcase, and a tip post can form a recognisable week without looking like duplicate cards.

Changes stay local to a post unless the user explicitly promotes them into a new campaign recipe version. Reusing a composition across companies must not carry the previous company's logo, fonts, assets, offers, or contacts with it.

## 6. The end-user creation flow

**Message → art direction → composition → needed imagery → finishing → format review → export.**

1. Choose a campaign and what this post must communicate. Identify the primary phrase and next action.
2. Inherit the approved campaign look. Show a few relevant local compositions using owned imagery or clearly labelled placeholders.
3. Select a composition and its typography hierarchy before commissioning the missing visual.
4. If new imagery is needed, commission its role precisely: subject placement, palette, lighting, quiet regions, and intended crop. Keep explicit GPT Image confirmation, secure credentials, and no automatic paid retry. Exact pricing remains unavailable unless an accurate source is implemented.
5. Make local finishing edits: copy, emphasis, arrangement variation, palette treatment, crop/scale, logo variant, and CTA style. Provide undo and reset-to-recipe.
6. Review each requested ratio as a real composition; do not crop a finished square poster into a story.
7. Resolve technical blockers, perform human content/design review, and export the approved PNG.

Guided controls are the default. More precise movement can live under an advanced section with snapping, safe-region guides, bounded transforms, and a clear manual-review state. A general-purpose animation, effects, or 3D editor is not part of this version.

## 7. What changes in the implementation

### Keep the working foundations

Company/campaign/week organisation, secure credentials, working GPT Image 2.6 generation, isolated assets, explicit spending confirmation, recovery/no-replay behaviour, and PNG output remain foundations—not a reason to rebuild the entire plug-in or launch another server.

### Replace the composition model

Introduce a versioned **scene document** containing semantic content, protected original asset references, recipe/version, type plan, background/hero/shape/text/logo/CTA roles, per-ratio arrangement, and bounded overrides. Store editorial emphasis/breaks separately from source words.

Place typography, layout resolution, asset loading, clipping, hit regions, technical checks, and final drawing behind one deep **PosterRenderer module**. Its **interface** can be as small as:

```text
render(sceneDocument, resources, target)
  → bitmap + hitRegions + issues + resolvedManifest
```

The **seam** sits between scene editing and rendering. The **implementation** owns measurement and draw order; the React caller must not reconstruct those rules. Rendering never starts an image request or billing operation. Preview and PNG export consume the same resolved drawing and font/image resources.

There is no evidence that Canvas itself is the quality problem. Keep the currently working Canvas/export path as the first implementation unless a targeted spike proves it cannot produce an approved composition. SVG may later be useful for authored paths or vector export, but switching technologies is not the design solution and a second renderer must not introduce preview/export drift.

### Version and protect the result

- Pin recipe, font, asset, and renderer versions with an immutable resolved export manifest.
- Review applies to the full design version, including copy, assets, brand snapshot, crop, typography, arrangement, and output ratio.
- Reopening an approved historical design must not silently adopt today's company settings.
- Keep v1 designs readable/renderable. Upgrading a legacy design creates a new editable version, not a silent reinterpretation.
- Use three token layers: raw company palette/font assets → semantic poster roles → recipe-specific treatments. Do not let app-shell tokens leak into customer artwork.

## 8. Ready-to-share means evidence, not a label

### Technical blockers

Missing required assets/fonts; unsupported glyphs for the declared language; overflow or unintended clipping; wrong pixel dimensions; broken original-logo proportions; unresolved critical-content safe-region violations; and stale review after a design-changing edit.

### Warnings and human review

Low text/background contrast, insufficient placed-image resolution, visually busy text regions, crop risks, and very dense information need clear warnings and manual inspection. Variable imagery makes automated contrast analysis approximate; a recipe can instead provide a controlled backing/scrim. Technical checks do not certify aesthetics, factual truth, rights, accessibility compliance, or platform approval.

### Acceptance work

- Approve three finished Storin master compositions against these references before expanding the library.
- Each of the three initial recipe families must work in all four existing output ratios: **12 deliberately composed examples**, not twelve automatic crops.
- Stress with short and long headlines, wide and tall original logos, light/dark palettes, missing optional content, and the target languages.
- Verify the same asset can be recomposed locally without another provider call; missing-role assets remain clearly identified rather than faked.
- Inspect at full resolution and at realistic phone/feed size. Keep required information outside the chosen platform preset's unsafe regions; presets must be identified and maintained rather than described as universal guarantees.
- Verify exact copy, original asset fidelity, font readiness, save/reopen/undo, review invalidation, and preview/PNG agreement.
- Real PNG downloads and visual comparison in the installed signed-in GUI remain explicit acceptance tasks for the build, not claims made by this proposal.

## 9. Recommended first Storin direction

Use the supplied orange/black Storin poster as the initial art-direction reference, pending confirmation of actual brand assets and palette. Make the message monumental, the hero intentional, and the action unmistakable. The existing headline could be deliberately set as:

```text
Websites That
Mean Business
```

The wording does not need to change to gain impact. It needs a much stronger hierarchy and a composition that gives it a real job. Pair that with an original Storin logo, a real site showcase or clearly conceptual hero, and the existing approved action. Avoid a photo followed by an unrelated large white caption panel.

**Recommended next step:** approve the v2 scope, obtain/confirm the original logo and brand font/palette or an approved preset, and create three finished Storin visual proofs. Implement the reusable recipes against those approved proofs rather than building a large editor and hoping art direction emerges later.

---

# Appendix — decision exploration

These are design hypotheses, not measured performance scores or features promised by this version.

## Brief

Find a system that lets non-designers repeatedly create the supplied level of poster craft while preserving exact brand/content assets, predictable cost, and local editing. Reframe the problem from “more templates or more freedom?” to “which design decisions should the system make well, and which should the user control?”

## Wide set

Score chips use novelty / viability / fit, each 0–10. Selection weight: 0.35 / 0.40 / 0.25. Ties are resolved for distinct coverage rather than adding near-duplicate ideas.

### Typography becomes the composition's starting point
- Reserve expressive headline space before packing imagery. [N8 V9 F10]
- Audition three hierarchy variants at glance size. [N9 V9 F10]
- Offer whisper/talk/shout emphasis rather than raw font knobs. [N8 V9 F9]
- Give reusable type choices a rights/weights/rendering passport. [N8 V9 F10]

### Communication must survive real content and viewing conditions
- Preserve emphasis and qualifier proximity across aspect ratios. [N8 V8 F10]
- Refuse illegibility; suggest another arrangement or approved multi-card treatment. [N7 V8 F9]
- Stress recipes with the longest copy and most awkward logos. [N6 V9 F10]
- Rehearse at feed size and beneath platform chrome. [N7 V9 F10]
- Add a finishing check for optical spacing and focal separation. [N6 V9 F10]

### Asset assembly stays local; commissioning is a separate action
- Separate documentary originals from theatrical imagery. [N7 V9 F9]
- Permit intentional, protected type–subject overlaps. [N7 V7 F9]
- Declare which edits require a new visual and fresh consent. [N6 V10 F9]
- Approve a local loading diagram before commissioning imagery. [N8 V9 F10]
- Offer art-direction moves such as subject-breaks-frame. [N8 V8 F9]
- Checkpoint the whole composition before a paid image call. [N8 V9 F10]
- Treat layers as a small paper theatre with foreground/background depth. [N9 V8 F10]
- **Keep an owned-asset craft table with a separate paid-image door. [N7 V10 F10]**

### Recompose relationships, not coordinates
- Approve a recipe's envelope of safe transformations. [N8 V9 F10]
- Treat a campaign as one argument with different editorial cuts. [N8 V9 F10]
- Give each output ratio its own delivery route. [N7 V9 F10]
- Treat formats as different levels with the same message objective. [N7 V9 F10]
- Connect headline, hero, and logo with semantic relationships. [N8 V7 F10]

### Brand/campaign memory carries identity, not contamination
- Carry claim validity/expiry with derivatives. [N5 V9 F8]
- Turn references into anonymous composition passports. [N8 V8 F9]
- Categorise rejected designs into reusable repair reasons. [N8 V7 F8]
- Keep a company-specific manifest of approved assets/type/copy. [N5 V9 F9]
- **Replay approved campaign decisions on next week's content. [N9 V8 F10]**
- Reuse composition moves across brands without moving their inventory. [N7 V8 F9]
- Teach a reading path by drawing over a favourite poster. [N9 V4 F7]
- Keep each company's approved assets and tricks in a locked chest. [N5 V10 F9]

## Converge

1. **★ Local typography auditions** (9.25): a non-obvious but viable way to let novices choose communication priority rather than operate a designer's control panel.
2. **Layered owned-asset craft table, separate from paid imagery** (8.95): the implementation foundation for expressive but cheap-to-edit posters, not just another text panel.
3. **Replay campaign decisions rather than coordinates** (8.85, tied): the mechanism that turns one approved poster into a coherent week without repetition.

### Traps
- A blank editor marketed as flexibility: it delegates the hard design work to the novice.
- An AI-flattened poster as the only source: local text/logo changes and controlled campaign reuse become fragile.
- Endless template counts: more catalogue entries do not fix typography or content-fit failures.
- Automatic visual-style extraction or learning from a few rejects: ambiguous input, copying risk, overfitting, and extra model/engineering cost; begin with explicit approved settings.
- A generic constraint solver or physical “rubber bands” for all layouts: expensive abstraction before supported recipes prove what actually needs to vary.
- Invisible auto-shrinking to pass fit checks: technically contained text can still be unusable communication.
- Treating photo-space decoration as design: it can look busy while leaving no clear message.

## Focus

### 1. Typography auditions

Keep exact content and imagery fixed and render three intentional hierarchy treatments locally. Use actual approved fonts and give each output ratio its own type plan. Expose important-phrase selection, deliberate breaks, and bounded spacing. A phone-sized comparison reveals what registers first before the user inspects full size.

- **Load-bearing risk:** impressive short samples can conceal failures on long real copy or different languages.
- **First builder step:** one font-ready proof fixture, three hierarchy plans, and short/long-copy tests in all four ratios.
- **Branches:** company typography passports; cross-format auditions; optional three-second recall test; protected quiet-space regions.

### 2. Layered craft table

A scene document keeps type, hero, shape, screenshot, logo, and action independent. A single deep renderer resolves typography, layout, masks, and final drawing. Existing assets can be rearranged without calling the image provider; a new generated asset enters only through the explicit paid-generation path. Prove the simplest production renderer against a real target before adding another rendering technology.

- **Load-bearing risk:** if every attractive reference requires bespoke rescue, a scene schema has merely added machinery to brittle templates.
- **First builder step:** exact-content fixtures for a bold hero and a real-screen showcase, validated at square and story sizes before editor expansion.
- **Branches:** bounded art-direction handles; truth-locked screenshots; semantic tips/list roles; reset-to-recipe; transparent-cutout support only when an alpha asset actually exists.

### 3. Campaign replay

Save the approved type relationships, imagery character, graphic rules, and allowed variance as a versioned campaign recipe. Keep the company identity fixed while new posts use the arrangement suited to their purpose. Format-specific staging preserves reading order and action without treating a story as a stretched square. Promote post changes into campaign memory only with explicit user intent.

- **Load-bearing risk:** copying an attractive surface is not the same as identifying which decisions can safely transfer to new content.
- **First builder step:** hand-author one reusable campaign recipe and stress it with different copy lengths and subjects in all four ratios.
- **Branches:** show inherited versus changed decisions; plan weekly visual rhythm; approved reference grammar cards; recipe stress bench.

## Provocation

What if the first thing the user approves is not an AI image, but a perfectly typeset poster skeleton? That reverses the current image-first workflow and lets the image be commissioned for a communication job that already exists.
