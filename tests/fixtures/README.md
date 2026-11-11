# Test fixtures

Committed fixtures are synthetic or openly licensed:

- `anton-400.ttf`, `anton-OFL.txt`, `anton-metadata.json` — real Anton 400 for font-verification tests (SIL OFL 1.1).
- `v2-hero-square-baseline.png` — synthetic baseline bitmap for the compiler2 pixel-parity test.

## Owner-supplied photographs (not committed)

The legacy compiler2/compiler3 renderer proofs replay real owner photographs. Those images are deliberately excluded from this repository. To run them, point `BS_LEGACY_FIXTURES` at a local directory containing:

```
storin-existing-background.png
storin-manually-masked-synthetic.png
```

```bash
BS_LEGACY_FIXTURES=/absolute/path/to/private-fixtures npm run test:export
BS_LEGACY_FIXTURES=/absolute/path/to/private-fixtures npm run test:visual:v3
```

Without that variable the legacy suites skip with an explanatory message; the main `npm test` suite and the current template/font suites do not need these images.
