import test from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_POSTER, DEFAULT_POSTER_V3, normalizePoster, normalizePosterV3, upgradePoster, resolvePoster, validatePoster } from './poster-model.js';

test('shared default options normalise partial input without mutation or shared nested objects', () => {
  assert.deepEqual(normalizePoster(), DEFAULT_POSTER);
  const input = { version: 2, recipe: 'showcase', formats: { story: { cropX: 0, heroScale: 1.2, alignment: 'center' } } };
  const before = structuredClone(input), result = normalizePoster(input);
  assert.deepEqual(input, before); assert.equal(result.recipe, 'showcase'); assert.equal(result.voice, 'studio');
  assert.deepEqual(result.formats.story, input.formats.story); assert.notEqual(result.formats.story, input.formats.story);
  assert.deepEqual(validatePoster(result), result); assert.equal(Object.isFrozen(DEFAULT_POSTER), true);
});

test('shared options reject malformed objects, unknown keys, coercion, out of bounds and recursive formats', () => {
  for (const value of [null, [], 'hero', 2]) assert.throws(() => normalizePoster(value), /object/);
  for (const options of [
    { version: 1 }, { version: '2' }, { recipe: 'spotlight' }, { voice: 'serif' }, { treatment: 'neon' },
    { variation: 'anything' }, { alignment: 'right' }, { scale: 0.84 }, { scale: 1.16 }, { heroScale: 0.79 },
    { heroScale: 1.21 }, { cropX: -0.01 }, { cropY: 1.01 }, { cropX: '0.5' }, { cropY: NaN }, { scale: Infinity },
    { emphasis: 12 }, { kicker: null }, { kicker: 'x'.repeat(4001) }, { unknown: true },
    { formats: [] }, { formats: null }, { formats: { banner: {} } }, { formats: { square: null } },
    { formats: { story: { version: 2 } } }, { formats: { square: { formats: {} } } },
    { formats: { landscape: { cropX: 2 } } },
  ]) assert.throws(() => normalizePoster(options), undefined, JSON.stringify(options));
});

test('all ratio overrides and numerical bounds are preserved exactly', () => {
  const poster = normalizePoster({ scale: 0.85, heroScale: 0.8, cropX: 0, cropY: 1,
    formats: { square: { scale: 1.15 }, portrait: { heroScale: 1.2 }, story: { cropY: 0 }, landscape: { cropX: 1 } } });
  assert.equal(poster.scale, 0.85); assert.equal(poster.cropY, 1);
  assert.deepEqual(Object.keys(poster.formats), ['square', 'portrait', 'story', 'landscape']);
});


test('v3 upgrades preserve v2 and allocate independent nested defaults', () => {
  const old = normalizePoster({ recipe: 'showcase', formats: { story: { scale: 1.1 } } });
  const before = structuredClone(old), upgraded = upgradePoster(old);
  assert.deepEqual(old, before); assert.equal(upgraded.version, 3); assert.equal(upgraded.compilerVersion, 2); assert.equal(upgraded.recipe, 'showcase');
  assert.deepEqual(upgraded.formats, old.formats); assert.deepEqual(normalizePoster({ version: 3 }), DEFAULT_POSTER_V3);
  upgraded.typography.headline.size = 150; assert.equal(normalizePosterV3().typography.headline.size, null);
  assert.equal(Object.isFrozen(DEFAULT_POSTER_V3.layers.foreground), true);
});
test('compiler selection is explicit root-only and never materialised into old v3 options', () => {
  const old = normalizePoster({ version: 3, formats: { story: { scale: 1.1 } } });
  const before = JSON.stringify(old), resolved = resolvePoster(old, 'story');
  assert.equal(Object.hasOwn(DEFAULT_POSTER_V3, 'compilerVersion'), false);
  assert.equal(Object.hasOwn(old, 'compilerVersion'), false);
  assert.equal(Object.hasOwn(resolved, 'compilerVersion'), false);
  const crisp = normalizePoster({ ...old, compilerVersion: 2 });
  assert.equal(crisp.compilerVersion, 2); assert.equal(resolvePoster(crisp, 'story').compilerVersion, 2);
  assert.equal(JSON.stringify(old), before);
  assert.equal(upgradePoster(old).compilerVersion, 2); assert.equal(upgradePoster(crisp).compilerVersion, 2);
  for (const compilerVersion of [undefined, null, 0, 1, 5, '2', true]) {
    assert.throws(() => normalizePoster({ version: 3, compilerVersion }), /compiler/);
  }
  assert.throws(() => normalizePoster({ version: 2, compilerVersion: 2 }), /Unsupported/);
  assert.throws(() => normalizePoster({ version: 3, formats: { story: { compilerVersion: 2 } } }), /compiler/);
});

test('v3 format overrides deep merge roles layers details and preserve partial storage', () => {
  const poster = normalizePosterV3({ typography: { headline: { size: 180, tracking: 0.1 }, cta: { size: 42 } },
    layers: { foreground: { x: 0.8 }, background: { opacity: 0.6 } }, details: { motif: 'orbit', strength: 0.7 },
    formats: { story: { typography: { headline: { size: 120 } }, layers: { foreground: { y: 0.2 } }, details: { text: 'Confirmed words' } } } });
  assert.deepEqual(poster.formats.story.typography, { headline: { size: 120 } });
  const resolved = resolvePoster(poster, 'story');
  assert.equal(resolved.typography.headline.size, 120); assert.equal(resolved.typography.headline.tracking, 0.1);
  assert.equal(resolved.typography.cta.size, 42); assert.equal(resolved.layers.foreground.x, 0.8);
  assert.equal(resolved.layers.foreground.y, 0.2); assert.equal(resolved.layers.background.opacity, 0.6);
  assert.equal(resolved.details.motif, 'orbit'); assert.equal(resolved.details.strength, 0.7);
  assert.equal(resolvePoster(poster, 'square').typography.headline.size, 180);
});
test('v3 nested options and format partials strictly reject malformed fields', () => {
  for (const partial of [
    { typography: null }, { typography: { caption: {} } }, { typography: { headline: [] } },
    { typography: { headline: { fontId: 'unsafe/font' } } }, { typography: { headline: { size: 47 } } },
    { typography: { body: { size: 85 } } }, { typography: { cta: { size: 73 } } },
    { typography: { kicker: { size: 17 } } }, { typography: { brand: { size: 65 } } },
    { typography: { headline: { weight: 400.5 } } }, { typography: { headline: { lineHeight: 0.84 } } },
    { typography: { headline: { tracking: 0.21 } } }, { layers: { foreground: { scale: 0.39 } } },
    { layers: { foreground: { rotation: 26 } } }, { layers: { background: { blur: 25 } } },
    { layers: { background: { opacity: null } } }, { layers: { headlineDepth: 'middle' } },
    { details: { motif: 'stars' } }, { details: { text: 'a'.repeat(161) } }, { details: { underline: 1 } },
    { details: { action: 'badge' } }, { details: { surface: 'glass' } }, { details: { strength: NaN } },
    { layers: { foreground: { unknown: 1 } } },
  ]) {
    assert.throws(() => normalizePosterV3(partial), undefined, JSON.stringify(partial));
    assert.throws(() => normalizePosterV3({ formats: { story: partial } }), undefined, JSON.stringify(partial));
  }
  for (const partial of [{formats:{}},{version:3}]) assert.throws(() => normalizePosterV3({ formats: { story: partial } }));
});
