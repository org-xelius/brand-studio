// Shared browser/domain contract. Deliberately has no Node or renderer imports.
import { FLEX_GROUP_DEFAULTS, normalizeFlexibleGroup, mergeComposition } from './composition-model.js';
import { TEMPLATE_DEFAULTS, normalizeTemplateGroup } from './template-model.js';
import { resolveFontPairing } from './font-pairings.js';
export const DEFAULT_POSTER = Object.freeze({
  version: 2, recipe: 'hero', voice: 'studio', treatment: 'brand', variation: 'balanced',
  emphasis: '', kicker: '', scale: 1, heroScale: 1, cropX: 0.5, cropY: 0.5, alignment: 'left',
});
const enums = {
  recipe: ['hero', 'showcase', 'editorial'], voice: ['studio', 'impact', 'clean'],
  treatment: ['brand', 'light', 'dark'], variation: ['balanced', 'type-led', 'image-led'],
  alignment: ['left', 'center'],
};
const ranges = { scale: [0.85, 1.15], heroScale: [0.8, 1.2], cropX: [0, 1], cropY: [0, 1] };
const formats = ['square', 'portrait', 'story', 'landscape'];
const object = value => value !== null && typeof value === 'object' && !Array.isArray(value) && [Object.prototype, null].includes(Object.getPrototypeOf(value));
function fields(options, partial) {
  if (!object(options)) throw new Error('Poster options must be an object.');
  const result = partial ? {} : { ...DEFAULT_POSTER };
  for (const [key, value] of Object.entries(options)) {
    if (key === 'formats' && !partial) continue;
    if (key === 'version' && !partial) {
      if (value !== 2) throw new Error('Poster version must be 2.');
    } else if (enums[key]) {
      if (!enums[key].includes(value)) throw new Error(`Choose a supported poster ${key}.`);
    } else if (ranges[key]) {
      const [min, max] = ranges[key];
      if (typeof value !== 'number' || !Number.isFinite(value) || value < min || value > max) throw new Error(`Poster ${key} must be between ${min} and ${max}.`);
    } else if (key === 'emphasis' || key === 'kicker') {
      if (typeof value !== 'string' || value.length > 4000) throw new Error(`Poster ${key} must be text of at most 4000 characters.`);
    } else throw new Error(`Unsupported poster option: ${key}.`);
    result[key] = value;
  }
  return result;
}
// Missing fields receive defaults; malformed supplied fields are never silently repaired.
// Format overrides remain partial so changing a base option still affects other ratios.
export function normalizePoster(options = {}) {
  if (options?.version === 3) return normalizePosterV3(options);
  const result = fields(options, false);
  if (Object.hasOwn(options, 'formats')) {
    if (!object(options.formats)) throw new Error('Poster formats must be an object.');
    result.formats = {};
    for (const [format, overrides] of Object.entries(options.formats)) {
      if (!formats.includes(format)) throw new Error('Choose a supported poster format.');
      result.formats[format] = fields(overrides, true);
    }
  }
  return result;
}
// Returns validated, normalised options; throws on invalid input, like normalizePoster.
export function validatePoster(options) { return normalizePoster(options); }


const roles = ['headline', 'body', 'cta', 'kicker', 'brand'];
const roleSizes = { headline: [48, 260], body: [20, 84], cta: [20, 72], kicker: [18, 64], brand: [20, 64] };
const roleDefault = () => ({ fontId: '', weight: null, size: null, lineHeight: null, tracking: 0 });
function freezeDeep(value) { for (const child of Object.values(value)) if (object(child)) freezeDeep(child); return Object.freeze(value); }
export const DEFAULT_POSTER_V3 = freezeDeep({ ...DEFAULT_POSTER, version: 3,
  typography: Object.fromEntries(roles.map(role => [role, roleDefault()])),
  layers: { background: { opacity: 0.35, blur: 0 }, foreground: { x: 0.66, y: 0.66, scale: 1, rotation: 0, shadow: 0.25 }, headlineDepth: 'front' },
  details: { motif: 'none', text: '', surface: 'flat', strength: 0.25, action: 'rail', underline: true },
});
const copy = value => JSON.parse(JSON.stringify(value));
function bounded(value, min, max, key) {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < min || value > max) throw new Error(`Poster ${key} must be between ${min} and ${max}.`);
}
function nested(value, allowed, label, validate) {
  if (!object(value)) throw new Error(`Poster ${label} must be an object.`);
  const result = {};
  for (const [key, item] of Object.entries(value)) {
    if (!allowed.includes(key)) throw new Error(`Unsupported poster ${label} option: ${key}.`);
    result[key] = validate(key, item);
  }
  return result;
}
function v3Fields(options, partial = false) {
  if (!object(options)) throw new Error('Poster options must be an object.');
  const result = partial ? {} : copy(DEFAULT_POSTER_V3);
  for (const [key, value] of Object.entries(options)) {
    if (key === 'formats' && !partial) continue;
    if (key === 'version' && !partial) { if (value !== 3) throw new Error('Poster version must be 3.'); result.version = 3; }
    else if (key === 'compilerVersion') {
      // Absence is the immutable original v3 compiler; never insert a default.
      if (partial || value !== 2) throw new Error('Poster compilerVersion must be 2 at the poster root only.');
      result.compilerVersion = 2;
    } else if (key === 'typography') {
      const typed = nested(value, roles, key, (role, spec) => nested(spec, ['fontId', 'weight', 'size', 'lineHeight', 'tracking'], role, (field, item) => {
        if (field === 'fontId') { if (typeof item !== 'string' || !/^[A-Za-z0-9:_-]{0,100}$/.test(item)) throw new Error('Invalid poster font identifier.'); }
        else if (field === 'tracking') bounded(item, -0.04, 0.2, field);
        else if (item !== null) {
          const limits = field === 'weight' ? [100, 900] : field === 'lineHeight' ? [0.85, 2] : roleSizes[role];
          bounded(item, ...limits, field);
          if (field === 'weight' && !Number.isInteger(item)) throw new Error('Poster font weight must be an integer.');
        }
        return item;
      }));
      result.typography = partial ? typed : merge(result.typography, typed);
    } else if (key === 'layers') {
      const layer = nested(value, ['background', 'foreground', 'headlineDepth'], key, (name, spec) => {
        if (name === 'headlineDepth') { if (!['front', 'behind'].includes(spec)) throw new Error('Choose supported headline depth.'); return spec; }
        const bounds = name === 'background' ? { opacity: [0, 1], blur: [0, 24] } : { x: [0, 1], y: [0, 1], scale: [0.4, 2], rotation: [-25, 25], shadow: [0, 1] };
        return nested(spec, Object.keys(bounds), name, (field, item) => { bounded(item, ...bounds[field], field); return item; });
      });
      result.layers = partial ? layer : merge(result.layers, layer);
    } else if (key === 'details') {
      const details = nested(value, ['motif', 'text', 'surface', 'strength', 'action', 'underline'], key, (field, item) => {
        const choices = { motif: ['none', 'ribbon', 'orbit'], surface: ['flat', 'tonal'], action: ['rail', 'capsule', 'text'] };
        if (choices[field] && !choices[field].includes(item)) throw new Error(`Choose supported detail ${field}.`);
        if (field === 'text' && (typeof item !== 'string' || item.length > 160)) throw new Error('Detail text must be at most 160 characters.');
        if (field === 'strength') bounded(item, 0, 1, field);
        if (field === 'underline' && typeof item !== 'boolean') throw new Error('Detail underline must be boolean.');
        return item;
      });
      result.details = partial ? details : merge(result.details, details);
    } else Object.assign(result, fields({ [key]: value }, true));
  }
  return result;
}
function merge(base, partial) {
  const result = copy(base);
  for (const [key, value] of Object.entries(partial)) result[key] = object(value) && object(result[key]) ? merge(result[key], value) : copy(value);
  return result;
}
export function normalizePosterV3(options = {}) {
  if (options?.compilerVersion === 4) return normalizePosterTemplate(options);
  if (options?.compilerVersion === 3) return normalizePosterFlexible(options);
  const result = v3Fields(options);
  if (Object.hasOwn(options, 'formats')) result.formats = nested(options.formats, formats, 'formats', (_format, value) => v3Fields(value, true));
  return result;
}
export function upgradePoster(options = {}) {
  const previous = normalizePoster(options);
  // Calling this helper is an explicit editable-copy upgrade, not a state migration.
  return normalizePosterV3({ ...previous, version: 3, compilerVersion: 2 });
}
// Format overrides retain only supplied fields in storage; resolve them at render time.
export function resolvePoster(options = {}, format) {
  const base = normalizePoster(options), override = base.formats?.[format] ?? {};
  return [3, 4].includes(base.compilerVersion) ? mergeComposition(base, override) : base.version === 3 ? merge(base, override) : { ...base, ...override };
}

// New groups/defaults are opt-in only: the original v2/v3 normalization paths above stay frozen.
export const DEFAULT_POSTER_FLEX = freezeDeep({ ...copy(DEFAULT_POSTER_V3), compilerVersion: 3, ...copy(FLEX_GROUP_DEFAULTS) });
function flexibleFields(options, partial = false) {
  if (!object(options)) throw new Error('Poster options must be an object.');
  const old = {}, groups = {};
  for (const [key, value] of Object.entries(options)) {
    if (key === 'formats' && !partial) continue;
    if (key === 'compilerVersion') {
      if (partial || value !== 3) throw new Error('Poster compilerVersion must be 3 at the poster root only.');
    } else if (Object.hasOwn(FLEX_GROUP_DEFAULTS, key)) groups[key] = normalizeFlexibleGroup(key, value, true);
    else old[key] = value;
  }
  const result = v3Fields(old, partial);
  if (!partial) Object.assign(result, copy(FLEX_GROUP_DEFAULTS), { compilerVersion: 3 });
  for (const [key, value] of Object.entries(groups)) result[key] = partial ? value : normalizeFlexibleGroup(key, value);
  return result;
}
function normalizePosterFlexible(options) {
  const result = flexibleFields(options);
  if (Object.hasOwn(options, 'formats')) result.formats = nested(options.formats, formats, 'formats', (_format, value) => flexibleFields(value, true));
  for (const override of Object.values(result.formats ?? {})) {
    const resolved = mergeComposition(result, override);
    for (const key of Object.keys(FLEX_GROUP_DEFAULTS)) normalizeFlexibleGroup(key, resolved[key]);
  }
  return result;
}
function templateFields(options, partial = false) {
  if (!object(options)) throw new Error('Poster options must be an object.');
  const old = {}, groups = {}, scalars = {};
  for (const [key, value] of Object.entries(options)) {
    if (key === 'formats' && !partial) continue;
    if (key === 'compilerVersion') {
      if (partial || value !== 4) throw new Error('Poster compilerVersion must be 4 at the poster root only.');
    } else if (key === 'fontPairing') { resolveFontPairing({fontPairing:value}); scalars.fontPairing=value; }
    else if (Object.hasOwn(TEMPLATE_DEFAULTS, key)) groups[key] = normalizeTemplateGroup(key, value, true);
    else old[key] = value;
  }
  const result = v3Fields(old, partial);
  if (!partial) Object.assign(result, copy(TEMPLATE_DEFAULTS), { compilerVersion: 4 });
  Object.assign(result, scalars);
  for (const [key, value] of Object.entries(groups)) result[key] = partial ? value : normalizeTemplateGroup(key, value);
  if (result.details?.surface === 'tonal' || (result.details?.motif !== undefined && result.details.motif !== 'none')) throw new Error('Templates require flat surface and no legacy motif.');
  return result;
}
function normalizePosterTemplate(options) {
  const result = templateFields(options);
  if (Object.hasOwn(options, 'formats')) result.formats = nested(options.formats, formats, 'formats', (_format, value) => templateFields(value, true));
  for (const override of Object.values(result.formats ?? {})) {
    const resolved = mergeComposition(result, override);
    for (const key of Object.keys(TEMPLATE_DEFAULTS)) normalizeTemplateGroup(key, resolved[key]);
  }
  return result;
}
export function upgradePosterFlexible(options = {}) {
  const previous = normalizePoster(options);
  if (previous.compilerVersion === 3) return previous;
  const map = source => {
    const out = copy(source);
    if (source.details?.motif !== undefined) out.motif = { id: { none: 'none', ribbon: 'ribbon-v1', orbit: 'orbit-v1' }[source.details.motif] };
    if (source.details?.strength !== undefined) out.motif = { ...out.motif, opacity: 0.25 + 0.65 * source.details.strength };
    if (source.details?.action !== undefined) out.cta = { style: { rail: 'strip', capsule: 'pill', text: 'text' }[source.details.action] };
    return out;
  };
  const upgraded = map(previous);
  if (previous.formats) upgraded.formats = Object.fromEntries(Object.entries(previous.formats).map(([format, value]) => [format, map(value)]));
  return normalizePoster({ ...upgraded, version: 3, compilerVersion: 3 });
}
