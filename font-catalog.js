// Deliberately local, curated OFL catalogue — not live Google Fonts discovery.
const rows = [
  ['anton','Anton',[400],'display','anton'],
  ['oswald','Oswald',[400,600,700],'sans-serif','oswald'],
  ['archivo-black','Archivo Black',[400],'display','archivoblack'],
  ['libre-franklin','Libre Franklin',[400,600,800],'sans-serif','librefranklin'],
  ['roboto-slab','Roboto Slab',[400,600,800],'serif','robotoslab'],
  ['sora','Sora',[400,600,800],'sans-serif','sora'],
  ['dm-sans','DM Sans',[400,600,800],'sans-serif','dmsans'],
  ['manrope','Manrope',[400,600,800],'sans-serif','manrope'],
  ['space-grotesk','Space Grotesk',[400,600,700],'sans-serif','spacegrotesk'],
  ['lora','Lora',[400,600,700],'serif','lora'],
];
export const FONT_CATALOG = Object.freeze(rows.map(([id,family,weights,category,path]) => Object.freeze({id,family,weights:Object.freeze(weights),category,licenseUrl:`https://raw.githubusercontent.com/google/fonts/main/ofl/${path}/OFL.txt`})));
export const getCatalogFont = id => FONT_CATALOG.find(font => font.id === id);
