// Browser-safe, pure vocabulary and validation for the explicit flexible compiler.
import { layoutPlan } from './src/layout-kernel-flex.js';
const plain = value => value !== null && typeof value === 'object' && !Array.isArray(value) && [Object.prototype, null].includes(Object.getPrototypeOf(value));
const clone = value => JSON.parse(JSON.stringify(value));
function freeze(value) { if (value && typeof value === 'object') { Object.values(value).forEach(freeze); Object.freeze(value); } return value; }
export const LAYOUTS = freeze([
  { id: 'lateral', label: 'Lateral', description: 'Copy left, visual right, action below the copy.', version: 1 },
  { id: 'broadside', label: 'Broadside', description: 'Upper headline, lower visual and independent action.', version: 1 },
  { id: 'specimen', label: 'Specimen', description: 'Complete central original, lower headline, upper action.', version: 1 },
  { id: 'centered', label: 'Centered', description: 'Centered reading stack with an edge motif.', version: 1 },
  { id: 'spread', label: 'Spread', description: 'Narrow right reading column and left visual.', version: 1 },
  { id: 'cover', label: 'Cover', description: 'Generous upper visual with lower type and action.', version: 1 },
]);
export const MOTIF_OPTIONS = freeze([
  { id: 'none', label: 'None', description: 'No decorative motif.' },
  { id: 'ribbon-v1', label: 'Ribbon', description: 'A flowing modular ribbon.' },
  { id: 'orbit-v1', label: 'Orbit', description: 'An open orbital structure.' },
  { id: 'proof-marks-v1', label: 'Proof marks', description: 'Creative registration and proof marks.' },
  { id: 'responsive-frames-v1', label: 'Responsive frames', description: 'Nested responsive proportions.' },
  { id: 'answer-exchange-v1', label: 'Answer exchange', description: 'A conceptual dialogue, without invented data.' },
  { id: 'research-folio-v1', label: 'Research folio', description: 'Editorial folio structure.' },
  { id: 'decision-junction-v1', label: 'Decision junction', description: 'A conceptual branching decision.' },
  { id: 'interface-modules-v1', label: 'Interface modules', description: 'Interlocking conceptual interface modules.' },
]);
export const CTA_STYLES = freeze(['strip', 'rectangle', 'rounded', 'pill', 'outline', 'text'].map(id => ({ id, label: id[0].toUpperCase() + id.slice(1) })));
export const PALETTE_ROLES = freeze(['primary', 'accent', 'ink', 'paper']);
export const FLEX_GROUP_DEFAULTS = freeze({
  composition: { layout: 'lateral', version: 1, density: 'balanced', profile: null },
  motif: { id: 'none', opacity: 0.15, color: 'auto', x: 0.75, y: 0.65, scale: 1, rotation: 0 },
  cta: { style: 'strip', width: 'full', align: 'left', paddingX: 24, paddingY: 16, fill: { mode: 'palette', value: 'accent' }, text: { mode: 'auto' }, arrow: true },
  textColors: { headline: 'auto', body: 'auto', brand: 'auto', kicker: 'auto' },
});
function keys(value, allowed, label) {
  if (!plain(value)) throw new Error(`${label} must be an object.`);
  for (const key of Object.keys(value)) if (!allowed.includes(key)) throw new Error(`Unsupported ${label} option: ${key}.`);
}
function one(value, choices, label) { if (!choices.includes(value)) throw new Error(`Choose a supported ${label}.`); return value; }
function number(value, min, max, label) { if (typeof value !== 'number' || !Number.isFinite(value) || value < min || value > max) throw new Error(`${label} must be between ${min} and ${max}.`); return value; }
export function mergeComposition(base, override) {
  const result = clone(base);
  for (const [key, value] of Object.entries(override)) result[key] = key === 'text' && value?.mode === 'auto' ? clone(value) : plain(value) && plain(result[key]) ? mergeComposition(result[key], value) : clone(value);
  return result;
}
function colour(value, text, partial) {
  keys(value, ['mode', 'value'], 'CTA colour');
  if (Object.hasOwn(value, 'mode')) one(value.mode, text ? ['palette', 'custom', 'auto'] : ['palette', 'custom'], 'CTA colour mode');
  if (Object.hasOwn(value, 'value') && !(PALETTE_ROLES.includes(value.value) || (typeof value.value === 'string' && /^#[0-9a-fA-F]{6}$/.test(value.value)))) throw new Error('CTA colour requires a palette role or six-digit hex.');
  if (!partial) {
    one(value.mode, text ? ['palette', 'custom', 'auto'] : ['palette', 'custom'], 'CTA colour mode');
    if (value.mode === 'auto') { if (Object.hasOwn(value, 'value')) throw new Error('Auto CTA text cannot contain a colour value.'); }
    else if (value.mode === 'palette') one(value.value, PALETTE_ROLES, 'CTA palette role');
    else if (typeof value.value !== 'string' || !/^#[0-9a-fA-F]{6}$/.test(value.value)) throw new Error('Custom CTA colour requires six-digit hex.');
  }
  return clone(value);
}
function provenance(value) {
  if (value === null) return null;
  keys(value, ['id', 'version', 'sha256', 'ordinal'], 'composition profile provenance');
  one(value.id, ['creative-modular', 'research-editorial', 'custom'], 'composition profile');
  if (value.version !== 1 || typeof value.sha256 !== 'string' || !/^[a-f0-9]{64}$/.test(value.sha256) || !Number.isSafeInteger(value.ordinal) || value.ordinal < 0) throw new Error('Invalid composition profile provenance.');
  return clone(value);
}
export function normalizeFlexibleGroup(group, value, partial = false) {
  const defaults = FLEX_GROUP_DEFAULTS[group];
  if (!defaults) throw new Error('Unsupported flexible group.');
  keys(value, Object.keys(defaults), `poster ${group}`);
  for (const [key, item] of Object.entries(value)) {
    if (group === 'composition') {
      if (key === 'layout') one(item, LAYOUTS.map(x => x.id), 'layout');
      if (key === 'version' && item !== 1) throw new Error('Composition version must be 1.');
      if (key === 'density') one(item, ['compact', 'balanced', 'generous'], 'composition density');
      if (key === 'profile') provenance(item);
    } else if (group === 'motif') {
      if (key === 'id') one(item, MOTIF_OPTIONS.map(x => x.id), 'motif');
      if (key === 'color') one(item, ['auto', ...PALETTE_ROLES], 'motif colour');
      const bounds = { opacity: [0, 1], x: [0, 1], y: [0, 1], scale: [0.25, 2], rotation: [-180, 180] };
      if (bounds[key]) number(item, ...bounds[key], `motif ${key}`);
    } else if (group === 'textColors') one(item, ['auto', ...PALETTE_ROLES], 'text colour');
    else {
      if (key === 'style') one(item, CTA_STYLES.map(x => x.id), 'CTA style');
      if (key === 'width') one(item, ['fit', 'full'], 'CTA width');
      if (key === 'align') one(item, ['left', 'center', 'right'], 'CTA alignment');
      if (key === 'paddingX') number(item, 0, 64, 'CTA horizontal padding');
      if (key === 'paddingY') number(item, 0, 40, 'CTA vertical padding');
      if (key === 'arrow' && typeof item !== 'boolean') throw new Error('CTA arrow must be boolean.');
      if (key === 'fill' || key === 'text') colour(item, key === 'text', true);
    }
  }
  if (partial) return clone(value);
  const result = mergeComposition(defaults, value);
  // ColourSpec is a discriminated union, not a bag of optional fields.
  if (group === 'cta') {
    if (value.text?.mode === 'auto') result.text = clone(value.text);
    colour(result.fill, false, false); colour(result.text, true, false);
  }
  return result;
}
const profileBase = { version: 1, id: 'custom', layouts: ['lateral'], motifs: ['none'], density: 'balanced', motifOpacity: 0.15, cta: FLEX_GROUP_DEFAULTS.cta, vary: false };
export const PROFILE_PRESETS = freeze([
  { id: 'creative-modular', label: 'Creative modular', description: 'Lateral, broadside and specimen with a creative modular vocabulary.', profile: { ...clone(profileBase), id: 'creative-modular', layouts: ['lateral', 'broadside', 'specimen'], motifs: ['proof-marks-v1', 'responsive-frames-v1', 'answer-exchange-v1'], cta: { ...clone(FLEX_GROUP_DEFAULTS.cta), style: 'pill', width: 'fit', fill: { mode: 'palette', value: 'primary' } }, vary: true } },
  { id: 'research-editorial', label: 'Research editorial', description: 'Centered, spread and cover with conceptual research diagrams.', profile: { ...clone(profileBase), id: 'research-editorial', layouts: ['centered', 'spread', 'cover'], motifs: ['research-folio-v1', 'decision-junction-v1', 'interface-modules-v1'], cta: { ...clone(FLEX_GROUP_DEFAULTS.cta), style: 'rounded', width: 'fit', fill: { mode: 'palette', value: 'primary' } }, vary: true } },
]);
export function normalizeCompositionProfile(value) {
  keys(value, Object.keys(profileBase), 'composition profile');
  const base = PROFILE_PRESETS.find(p => p.id === value.id)?.profile ?? profileBase;
  const result = { ...clone(base), ...clone(value) };
  if (result.version !== 1) throw new Error('Composition profile version must be 1.');
  one(result.id, ['creative-modular', 'research-editorial', 'custom'], 'composition profile');
  // Backward extension only: old profiles normalize to byte-identical fields and defaults.
  const profileLayouts = [...LAYOUTS, ...['bold-backdrop', 'subject-right', 'image-lead', 'centered-announcement', 'service-sheet', 'subject-left', 'image-footer', 'framed-focus', 'type-led', 'offset-grid'].map(id => ({ id }))];
  for (const [key, vocabulary] of [['layouts', profileLayouts], ['motifs', MOTIF_OPTIONS]]) {
    const ids = vocabulary.map(x => x.id), list = result[key];
    if (!Array.isArray(list) || list.length < 1 || list.length > ids.length || new Set(list).size !== list.length || list.some(x => !ids.includes(x))) throw new Error(`Choose a bounded unique list of profile ${key}.`);
  }
  one(result.density, ['compact', 'balanced', 'generous'], 'profile density'); number(result.motifOpacity, 0, 1, 'profile motif opacity');
  if (typeof result.vary !== 'boolean') throw new Error('Profile vary must be boolean.');
  if (Object.hasOwn(value, 'cta')) keys(value.cta, Object.keys(FLEX_GROUP_DEFAULTS.cta), 'profile CTA');
  const cta = mergeComposition(base.cta, value.cta ?? {}), templateWidth = ['column', 'poster'].includes(cta.width) ? cta.width : null;
  result.cta = normalizeFlexibleGroup('cta', { ...cta, ...(templateWidth ? { width: 'full' } : {}) });
  if (templateWidth) result.cta.width = templateWidth;
  // Stable field order is part of the profile fingerprint contract.
  return Object.fromEntries(Object.keys(profileBase).map(key => [key, result[key]]));
}
// Small synchronous SHA-256 for identical provenance in browsers and Node; no IO or crypto dependency.
export function compositionProfileSha256(value) {
  const profile = normalizeCompositionProfile(value);
  const stable = v => plain(v) ? Object.fromEntries(Object.keys(v).sort().map(k => [k, stable(v[k])])) : Array.isArray(v) ? v.map(stable) : v;
  const bytes = new TextEncoder().encode(JSON.stringify(stable(profile))), length = bytes.length;
  const data = new Uint8Array(Math.ceil((length + 9) / 64) * 64); data.set(bytes); data[length] = 128;
  const view = new DataView(data.buffer); view.setUint32(data.length - 4, length * 8);
  const k = [], initial = [];
  for (let n = 2; k.length < 64; n++) { let prime = true; for (let d = 2; d * d <= n; d++) if (n % d === 0) { prime = false; break; } if (prime) { if (initial.length < 8) initial.push((Math.sqrt(n) % 1 * 0x100000000) | 0); k.push((Math.cbrt(n) % 1 * 0x100000000) | 0); } }
  const h = initial, w = new Int32Array(64), r = (x, n) => (x >>> n) | (x << (32 - n));
  for (let start = 0; start < data.length; start += 64) {
    for (let i = 0; i < 64; i++) w[i] = i < 16 ? view.getInt32(start + i * 4) : (w[i-16] + (r(w[i-15],7) ^ r(w[i-15],18) ^ (w[i-15] >>> 3)) + w[i-7] + (r(w[i-2],17) ^ r(w[i-2],19) ^ (w[i-2] >>> 10))) | 0;
    let [a,b,c,d,e,f,g,j] = h;
    for (let i = 0; i < 64; i++) { const t = (j + (r(e,6)^r(e,11)^r(e,25)) + ((e&f)^(~e&g)) + k[i] + w[i]) | 0, u = ((r(a,2)^r(a,13)^r(a,22)) + ((a&b)^(a&c)^(b&c))) | 0; j=g; g=f; f=e; e=(d+t)|0; d=c; c=b; b=a; a=(t+u)|0; }
    [a,b,c,d,e,f,g,j].forEach((x,i) => { h[i] = (h[i] + x) | 0; });
  }
  return h.map(x => (x >>> 0).toString(16).padStart(8,'0')).join('');
}
// Generation/apply-time placement only. Never used by normalization or frozen-scene reads.
export function motifPlacementForLayout(layout, format = 'square', density = 'balanced') {
  const dimensions = { square: [1080, 1080], portrait: [1080, 1350], story: [1080, 1920], landscape: [1200, 628] };
  const visual = layoutPlan(layout, format, density).visual, [nativeWidth, nativeHeight] = dimensions[format];
  const height = nativeHeight / (nativeWidth / 1080);
  return { x: (visual[0] + visual[2] / 2) / 1080, y: (visual[1] + visual[3] / 2) / height,
    scale: Math.max(0.25, Math.min(1.4, visual[2] / 650, visual[3] / 390)), rotation: 0 };
}
export function applyCompositionProfile(poster, value, ordinal = 0) {
  if (!plain(poster)) throw new Error('Poster options must be an object.');
  if (!Number.isSafeInteger(ordinal) || ordinal < 0) throw new Error('Profile ordinal must be a non-negative safe integer.');
  const profile = normalizeCompositionProfile(value), index = profile.vary ? ordinal : 0, layout = profile.layouts[index % profile.layouts.length];
  const formats = {};
  if (Object.hasOwn(poster, 'formats')) {
    keys(poster.formats, ['square', 'portrait', 'story', 'landscape'], 'poster formats');
    for (const [format, overrides] of Object.entries(poster.formats)) {
      if (!plain(overrides)) throw new Error('Poster format overrides must be an object.');
      // Applying a language is explicit: stale ratio-specific language groups cannot mask it.
      const { composition: _composition, motif: _motif, cta: _cta, ...retained } = overrides;
      formats[format] = clone(retained);
    }
  }
  for (const format of ['portrait', 'story', 'landscape']) formats[format] = { ...formats[format], motif: motifPlacementForLayout(layout, format, profile.density) };
  return { ...clone(poster), version: 3, compilerVersion: 3,
    composition: { ...clone(FLEX_GROUP_DEFAULTS.composition), ...clone(poster.composition ?? {}), layout, density: profile.density, profile: { id: profile.id, version: 1, sha256: compositionProfileSha256(profile), ordinal } },
    motif: { ...clone(FLEX_GROUP_DEFAULTS.motif), ...clone(poster.motif ?? {}), id: profile.motifs[index % profile.motifs.length], opacity: profile.motifOpacity, ...motifPlacementForLayout(layout, 'square', profile.density) },
    cta: clone(profile.cta), formats,
  };
}
