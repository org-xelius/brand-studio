# Development

Brand Studio is a local DeepSeek Harness (DSH) plugin: an ESM Host module plus a React client bundle. It is not a standalone web server. The plugin renders posters locally on `<canvas>`; paid image generation is opt-in and requires the owner's own OpenAI Images API key.

## Requirements

- Node.js 22+ and `pnpm` (or npm).
- A DSH installation whose runtime satisfies `engines.dsh` in `package.json`.
- Optional, only for native/visual proof suites: Chrome or the Playwright Chromium build already cached locally.

## Setup

```bash
pnpm install --ignore-scripts     # or: npm install
npm run build                     # writes client.js and host.js
npm test                          # domain + host regression tests
npm run check                     # syntax-check every runtime module
```

`client.js` and `host.js` are build outputs and are committed so the plugin can be installed from the repository. Rebuild after changing `src/**`, `*.jsx`, or styles.

## Architecture

| Area | Files | Responsibility |
| --- | --- | --- |
| Domain | `model.js` | Companies, campaigns, posts, plans, jobs, snapshots, receipts, authorisation and review/export rules |
| Poster options | `poster-model.js` | Versioned poster schemas (v2, v3, compiler2/3/4), validation, format overrides, resolution |
| Composition | `composition-model.js` | Legacy flexible layouts, CTA/motif vocabulary, company design-language profiles |
| Templates | `template-model.js` | The ten current arrangements, defaults, upgrades and atomic edits |
| Fonts | `font-pairings.js` | Six curated pairings, local faces, provenance and default weights |
| Rendering | `src/poster-renderer*.js` | One immutable kernel per compiler generation |
| Geometry | `src/layout-kernel-template.js` | Authored native plans for every arrangement and format |
| Fonts (runtime) | `src/fonts*.js` | Loading bundled or imported faces with SHA/cmap verification |
| Composition routes | `src/compositor.js` | Selects the correct renderer/kernel per frozen compiler version |
| Client | `src/client.jsx` | Editor shell, canvas preview, autosave, review and export |
| Focused controls | `src/look-controls.jsx`, `src/template-icon.jsx` | Look tab: schematic arrangement icons, images, type, CTA |
| Host | `index.js`, `host.js` | DSH routes, storage, credentials and the image provider seam |

### Compiler generations

Poster schema `3` carries four compiler identities:

- `compiler1`/`compiler2` — crisp editorial layouts (frozen).
- `compiler3` — flexible layouts with motifs (frozen apart from maintenance).
- `compiler4` — the current templates. Adds optional `fontPairing` and trusted geometry/resources.

Old scenes must keep rendering byte-for-byte through their own kernel. Never edit `src/poster-renderer.js`, `src/poster-renderer-crisp.js`, `src/poster-renderer-v3.js` or `src/poster-renderer-flex.js` to make a new feature work; add behaviour behind the next compiler identity or an optional field.

### Adding an arrangement

1. Append to `TEMPLATES` in `template-model.js`.
2. Author `templatePlan` geometry for all four formats in `src/layout-kernel-template.js` (and its trusted resource hash).
3. Add any legacy alias map entries if the arrangement replaces an old one.
4. Update `composition-model.js`'s profile whitelist so company preferences accept it.
5. Run `npm run test:export:templates` and inspect regenerated proofs.

### Adding a font pairing

1. Add the pinned WOFF2 files and OFL notice under `assets/fonts/`.
2. Record actual SHA-256 and cmap/fvar coverage in `src/font-passports-template.js`.
3. Add the face and pairing to `font-pairings.js`, including real default weights.
4. Extend receipt tests so a forged file, weight or digest is rejected.

## Testing

```bash
npm test                    # 173 tests: domain, receipts, host, security
npm run check               # syntax
npm run test:ui:look        # isolated React/model/renderer UI acceptance (~2 min, needs local Chrome)
npm run test:export:templates  # 80 native proofs + font matrix (needs source images, see below)
```

Native proofs render real photographs that are deliberately **not** in this repository. Provide them by environment variable; the suite fails with a clear missing-source error instead of downloading anything:

```bash
BS_TEMPLATE_SOURCE_A=/path/to/portrait-source.png \
BS_TEMPLATE_SOURCE_B=/path/to/second-source.png \
npm run test:export:templates
```

Optional: `BS_TEMPLATE_BROWSER_CHANNEL=chrome` to use an installed browser, and `TEMPLATE_DIAGNOSTIC=1` to print fit diagnostics without assertions.

Tests write to `output/playwright/**`, which is ignored by git: those directories hold large screenshots and owner imagery and must not be committed.

## Visual QA

`tests/collect-look-ten-qa.mjs` assembles a schema-validated QA report from per-surface JSON ledgers. It requires the optional local `visual-quality-assurance` skill helper; point `QA_REPORT_HELPER` at its `qa-report.mjs`. A review only counts while the recorded surface SHA-256 still matches the file on disk.

## Safety rules to preserve

- No silent migration of saved posters; opening older work never rewrites it.
- No invented copy, claims, testimonials, charts or social badges.
- Text never silently shrinks or is shortened; overflow blocks review.
- Original product/logo pixels stay intact; backgrounds may crop, originals may not.
- Paid generation requires explicit confirmation and an owner key; composition edits never call the provider.
- Review binds the exact rendered PNG; any edit invalidates it.
- Credentials are read through the Host seam only and are never written into state or logs.
