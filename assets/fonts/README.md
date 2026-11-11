# Bundled poster typography

Unmodified WOFF2 files downloaded 10 November 2026 from the public Fontsource npm CDN. All five families are SIL Open Font License 1.1; the complete per-family license and copyright notices are adjacent. No credentials or paid generation were used. These files, not remote CSS, are bundled as data URLs at build time.

## Type roles

- Bold studio: League Spartan variable 800 + Source Sans 3 variable 400/600.
- Compact impact: Barlow Condensed static 800 + Source Sans 3 variable 400/600.
- Clean digital: Archivo variable 800 + Manrope variable 400/600.

## Provenance / pinned shipped bytes

- league-spartan-latin-wght-normal.woff2: [@fontsource-variable/league-spartan@5.3.0](https://cdn.jsdelivr.net/npm/@fontsource-variable/league-spartan@5.3.0/files/league-spartan-latin-wght-normal.woff2). SHA-256 `7d843a9fa4dcd050da68405d9093f8ab8298f8f60a97155e85ab84c9ed3040e2`.
- source-sans-3-latin-wght-normal.woff2: [@fontsource-variable/source-sans-3@5.2.8](https://cdn.jsdelivr.net/npm/@fontsource-variable/source-sans-3@5.2.8/files/source-sans-3-latin-wght-normal.woff2). SHA-256 `7a19a7027e125257d310c6dbd78ae3a30b5ea1e3794d60b12bb28227a003bfda`.
- barlow-condensed-latin-800-normal.woff2: [@fontsource/barlow-condensed@5.3.0](https://cdn.jsdelivr.net/npm/@fontsource/barlow-condensed@5.3.0/files/barlow-condensed-latin-800-normal.woff2). SHA-256 `2515494e8cc2ca07c86ea78766cfa104b796aa6ed5d66821c01d51dbb0b52bce`.
- archivo-latin-wght-normal.woff2: [@fontsource-variable/archivo@5.3.0](https://cdn.jsdelivr.net/npm/@fontsource-variable/archivo@5.3.0/files/archivo-latin-wght-normal.woff2). SHA-256 `8f704806dbedeaaeca334b11ec348bc3ac3a439d6431544b3afb54f534ee4967`.
- manrope-latin-wght-normal.woff2: [@fontsource-variable/manrope@5.3.0](https://cdn.jsdelivr.net/npm/@fontsource-variable/manrope@5.3.0/files/manrope-latin-wght-normal.woff2). SHA-256 `a30ddcd349703aff7464c34bef3fffdff405ee50c113440d7c8693c02d210972`.

## Coverage and export policy

These are Latin subsets. The renderer deliberately declares only basic Western European Latin (U+0020–007E, U+00A0–00FF) and selected common punctuation supported by the files, plus linebreaks. Unsupported characters—including CJK, Cyrillic, Arabic, combining marks and emoji—are explicit blockers, not silently drawn with fallback fonts. Broader-script support requires additional licensed subsets and verification. FontFace must load before measuring/drawing. There is no runtime network font request and no fallback permission.

Changing a font file requires a renderer/recipe version decision and fresh browser measurements; do not swap files under a reviewed historical design.
