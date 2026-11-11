# Using Brand Studio

Brand Studio lives in the DeepSeek Harness sidebar. It turns a company brief into editable social posters composed locally: your exact words, your assets and a licensed typeface, with no AI text and no publishing automation.

## First run

1. Open **Brand Studio** → **Add company**. Enter the name and a sentence about the business.
2. Confirm the **planning time zone** (suggested from the browser).
3. Optionally set **Brand colours** — primary, accent, ink and paper. These colour the artwork only, never the Harness interface.
4. Create a campaign, or start a **One-off design** straight away.

## Making a poster

1. Open or create a post. **Words** holds the headline, supporting text and the action line. The header label/website is optional.
2. Open **Look**:
   - **Arrangement** — ten schematic icons. Click any icon and the main canvas updates immediately; the change is one undo step. The icons describe the current output format (square, portrait, story, landscape). Clicking the already-selected icon changes nothing; use **Reset arrangement defaults** to discard manual placement.
   - **Background & images** — choose a stored image or upload one. **Background source** switches between solid colour and image. The opacity control is literal: `0%` hides the image, `100%` keeps its full strength, and `42.5%` stays `42.5%`.
   - **Text** — pick one of six font pairings and, if needed, an explicit headline size. **Advanced typography** edits each role's family, weight, size, leading and tracking.
   - **Call to action** — style, width (Fit text / Text column / Poster width), fill, alignment and arrow.
3. Choose **Output format** in the preview toolbar. Appearance edits apply to the format you are looking at; **Apply look to other formats** copies the look to the rest of the set.
4. Wait for **Saved** and a completed preview, tick **I've inspected this format and confirmed the content and assets**, then **Save & review this version**.
5. **Export reviewed PNG** downloads the exact reviewed bitmap at full resolution.

## The ten arrangements

| Arrangement | When it fits |
| --- | --- |
| Bold backdrop | A full photographic or solid field with monumental type — the reference direction |
| Subject right | A left reading column with a separate right-hand image |
| Image lead | A dominant complete image above supporting copy |
| Centered announcement | A short, formal announcement with a compact action |
| Service sheet | Detailed information in an editorial reading column |
| Subject left | The mirror of Subject right |
| Image footer | Copy first, with a substantial lower image field |
| Framed focus | A contained central image between headline and supporting copy |
| Type-led | The headline dominates; the image is a small accent |
| Offset grid | Upper headline with an asymmetric lower image/copy split |

Selecting an arrangement resets template-owned text sizing, subject placement and CTA layout. Your words, image choices, opacity, colours and font pairing are preserved.

## The six font pairings

| Pairing | Headline / supporting text |
| --- | --- |
| Bold studio | League Spartan / Source Sans 3 |
| Compact impact | Barlow Condensed / Source Sans 3 |
| Clean digital | Archivo / Manrope |
| Editorial serif | Lora / Source Sans 3 |
| Geometric modern | Space Grotesk / DM Sans |
| Tall editorial | Oswald / Manrope |

All faces are bundled and licensed (SIL OFL 1.1); choosing one never downloads anything. Selecting a pairing replaces per-role family/weight overrides so the change is visible, while sizes, leading, tracking and colours stay as you set them. If you have imported a company font and applied it per role, the pairing control shows **Custom role fonts** until you pick a pairing again.

## Saved versions and older designs

Reviewed work is stored as a frozen version: its words, colours, fonts, assets and layout are preserved exactly. Returning to an older draft never rewrites history.

Posts created before the template system open as **Current look** and keep their original rendering until you deliberately click an arrangement. That upgrade is undoable and only affects the editable draft.

## Image handling

- Backdrops may be cropped/zoomed; foregrounds keep their proportions; product screenshots are always contained.
- **Framed focus** fits the complete background, so zoom and crop are unavailable there — the explanation is shown in place of those controls.
- Upload PNG, JPEG or WebP up to 5 MB into the logo, product/screenshot, backdrop or foreground role. Uploading does not remove a background.
- Image sources are shared across formats; opacity and positioning can differ per format.

## Generating images (optional, billed)

Composition, typography and format changes never call an image provider. Only **Image setup** → **Generate** does, and it requires an OpenAI Images API key plus an explicit confirmation of the paid request. A chat/ChatGPT subscription is not Images API access. Ambiguous failed requests may still have been billed; inspect them before retrying.

## Review and export rules

- Review applies to one exact format and one exact bitmap.
- Any later edit — including a format or brand change — invalidates the review.
- Text is never silently shrunk or rewritten; if content does not fit, the app asks you to shorten it or choose another arrangement.
- Exports are PNGs at native size (1080×1080, 1080×1350, 1080×1920, 1200×628) — no watermarks, no uploading.

## Limits

- No automatic publishing or scheduling to social platforms.
- No automatic background removal, no arbitrary logo/font upload by URL, no multilingual shaping guarantees.
- Fonts ship as Latin subsets.
- Screen-reader and native OS colour-picker behaviour has not been formally certified; browser zoom beyond the checked CSS-zoom cases is untested.
