# Test fixtures

Everything here is synthetic or openly licensed — no customer imagery, no personal data.

- `anton-400.ttf`, `anton-OFL.txt`, `anton-metadata.json` — real Anton 400 (SIL OFL 1.1) with cmap/digest metadata for font-verification tests.
- `synthetic-subject.png` — a transparent geometric shape used as a foreground fixture.

Owner photographs used by the native suite are supplied at run time, never committed:

```bash
BS_TEMPLATE_SOURCE_A=/path/to/portrait-source.png \
BS_TEMPLATE_SOURCE_B=/path/to/second-source.png \
npm run test:export:templates
```
