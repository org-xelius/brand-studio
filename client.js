window.__ModuleLoader__.load({id:"@local/brand-studio",factory(require){const module={exports:{}};const exports=module.exports;
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client.jsx
var client_exports = {};
__export(client_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(client_exports);
var import_react6 = __toESM(require("react"), 1);

// src/studio.css
var studio_default = '/* Brand Studio v4: a native creative workspace. Host typography and surfaces remain authoritative. */\n.bs{\n --bs-fallback-bg:#fff;--bs-fallback-surface:#fff;--bs-fallback-stage:#f5f6f7;--bs-fallback-fg:#0f1115;--bs-fallback-muted:#61666b;--bs-fallback-line:#0000001a;\n --bs-bg:var(--dsw-alias-bg-base,var(--bs-fallback-bg));--bs-surface:var(--dsw-alias-bg-layer-1,var(--bs-fallback-surface));--bs-stage:var(--dsw-alias-bg-module-platform,var(--bs-fallback-stage));--bs-fg:var(--dsw-alias-label-primary,var(--bs-fallback-fg));--bs-muted:var(--dsw-alias-label-secondary,var(--bs-fallback-muted));--bs-line:var(--dsw-alias-border-l2,var(--bs-fallback-line));--bs-line-strong:var(--dsw-alias-border-l3,var(--bs-fallback-line));--bs-hover:var(--dsw-alias-interactive-bg-hover,#2631480f);\n --bs-accent:#a84715;--bs-primary:#b64c19;--bs-primary-ink:#fff;--bs-error:#b12d35;--bs-soft:color-mix(in srgb,var(--bs-accent) 9%,var(--bs-surface));\n color:var(--bs-fg);background:var(--bs-bg);font-family:var(--dsw-font-family,-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Hiragino Sans GB","Microsoft YaHei","Helvetica Neue",Helvetica,Arial,sans-serif);font-size:var(--dsw-font-s-14-font-size,14px);line-height:var(--dsw-font-s-14-line-height,22px);font-weight:400;color-scheme:light;height:100%;overflow:auto;isolation:isolate;container-type:inline-size;scrollbar-color:var(--bs-line-strong) transparent;caret-color:var(--bs-accent)\n}\n.bs[data-bs-accent="blue"]{--bs-accent:#285fc5;--bs-primary:#285fc5}\nbody[data-ds-dark-theme] .bs{--bs-fallback-bg:#151517;--bs-fallback-surface:#232324;--bs-fallback-stage:#353638;--bs-fallback-fg:#f9fafb;--bs-fallback-muted:#cfd3d6;--bs-fallback-line:#ffffff1f;--bs-accent:#ffb083;--bs-primary:#f4ac82;--bs-primary-ink:#2c170c;--bs-error:#ffadb2;--bs-hover:var(--dsw-alias-interactive-bg-hover,#ffffff14);color-scheme:dark}\nbody[data-ds-dark-theme] .bs[data-bs-accent="blue"]{--bs-accent:#9bbdff;--bs-primary:#9bbdff;--bs-primary-ink:#142746}\n@media(prefers-color-scheme:dark){html:not([data-ds-theme-source]) .bs{--bs-fallback-bg:#151517;--bs-fallback-surface:#232324;--bs-fallback-stage:#353638;--bs-fallback-fg:#f9fafb;--bs-fallback-muted:#cfd3d6;--bs-fallback-line:#ffffff1f;--bs-accent:#ffb083;--bs-primary:#f4ac82;--bs-primary-ink:#2c170c;--bs-error:#ffadb2;--bs-hover:var(--dsw-alias-interactive-bg-hover,#ffffff14);color-scheme:dark}html:not([data-ds-theme-source]) .bs[data-bs-accent="blue"]{--bs-accent:#9bbdff;--bs-primary:#9bbdff;--bs-primary-ink:#142746}}\n.bs *{box-sizing:border-box}.bs [hidden]{display:none!important}.bs ::selection{background:color-mix(in srgb,var(--bs-accent) 22%,transparent);color:var(--bs-fg)}\n.bs :focus-visible{outline:var(--dsw-focus-ring-width,2px) solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary,#4176e6));outline-offset:3px}.bs :focus:not(:focus-visible){outline:none}\n.bs button,.bs input,.bs select,.bs textarea{font:inherit}.bs button{cursor:pointer;touch-action:manipulation}.bs button:disabled{cursor:not-allowed;opacity:.5}.bs button svg{flex:none}.bs button{transition:background-color 120ms ease-out,border-color 120ms ease-out,color 120ms ease-out}.bs button:hover:not(:disabled){background:var(--bs-hover)}\n.bs h1,.bs h2,.bs h3,.bs p{margin:0}.bs h1{font-size:28px;line-height:1.2;font-weight:650;letter-spacing:-.025em;text-wrap:balance}.bs h2{font-size:18px;line-height:1.35;font-weight:600;letter-spacing:-.015em}.bs h3{font-size:14px;font-weight:600}.bs p{max-width:72ch}.bs small{font-size:12px;line-height:18px}.bs .bs-muted{color:var(--bs-muted)}\n.bs-top{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:calc(14px + var(--dsh-frame-top-clearance,0px)) 28px 14px;border-bottom:1px solid var(--bs-line);background:var(--bs-surface)}\n.bs-wordmark,.bs-top-actions,.bs-inline,.bs-row-actions{display:flex;align-items:center;gap:8px}.bs-wordmark{gap:10px;white-space:nowrap}.bs-wordmark strong{font-size:17px;font-weight:600;letter-spacing:-.025em}.bs-mark{color:var(--bs-accent);display:grid;place-items:center}.bs-top-actions{flex-wrap:wrap;justify-content:flex-end}.bs .bs-top select{width:180px;max-width:180px;flex:none}.bs-top-actions{flex-shrink:0}.bs-top-actions>.bs-button{font-size:13px}\n.bs-tabs{display:flex;align-items:center;gap:6px;padding:9px 28px;border-bottom:1px solid var(--bs-line);background:var(--bs-surface);flex-wrap:wrap}.bs-tabs button{display:flex;align-items:center;justify-content:center;border:0;border-radius:8px;background:transparent;color:var(--bs-muted);padding:8px 15px;min-height:40px;font-weight:500;white-space:nowrap}.bs-tabs button.active{color:var(--bs-accent);background:var(--bs-soft)}\n.bs-main{max-width:1500px;margin:0 auto;padding:26px 28px 34px;min-height:calc(100% - 220px)}.bs-page-head{display:flex;justify-content:space-between;align-items:center;gap:20px;margin-bottom:24px}.bs-page-head p{color:var(--bs-muted);margin-top:7px}.bs-section-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:16px}.bs-section-head p{color:var(--bs-muted);font-size:13px;margin-top:5px}\n.bs-button,.bs-icon,.bs-text-button{display:inline-flex;align-items:center;justify-content:center;gap:7px;min-height:40px;padding:8px 12px;border:1px solid var(--bs-line-strong);border-radius:9px;color:var(--bs-fg);background:var(--bs-surface);font-weight:500;line-height:20px;text-decoration:none;max-width:100%}.bs .bs-primary{border-color:transparent;color:var(--bs-primary-ink);background:var(--bs-primary)}.bs .bs-primary:hover:not(:disabled){background:color-mix(in srgb,var(--bs-primary) 90%,var(--bs-primary-ink))}.bs-icon{width:40px;padding:8px;flex:none;background:transparent;border-color:transparent}.bs-text-button{padding:7px 0;border-color:transparent;background:transparent;color:var(--bs-accent)}\n.bs input:not([type=checkbox]):not([type=radio]):not([type=range]),.bs select,.bs textarea{width:100%;min-width:0;min-height:42px;padding:9px 11px;border:1px solid var(--bs-line-strong);border-radius:8px;background:var(--bs-surface);color:var(--bs-fg);line-height:22px}.bs textarea{resize:vertical;display:block}.bs input::placeholder,.bs textarea::placeholder{color:var(--bs-muted);opacity:1}.bs input[type=color]{padding:4px;max-width:80px}.bs input[type=checkbox],.bs input[type=radio],.bs input[type=range]{accent-color:var(--bs-accent)}.bs input[type=range]{width:100%;min-height:40px;padding:0}.bs input[type=number]{font-variant-numeric:tabular-nums}.bs .bs-field{display:flex;flex-direction:column;gap:7px;margin:0 0 17px;min-width:0}.bs-field>span{font-size:13px;font-weight:500;line-height:19px}.bs-field>small{color:var(--bs-muted)}.bs-two-fields{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}\n.bs-brand-colours{border:0;padding:0;margin:3px 0 0;min-width:0}.bs-brand-colours legend{padding:0;font-size:14px;font-weight:600;line-height:22px}.bs-brand-colours>p{font-size:12px;line-height:18px;margin:5px 0 14px}.bs .bs-colour-field{display:grid;grid-template-columns:64px minmax(0,1fr);align-items:center;gap:7px 12px;margin-bottom:8px}.bs-colour-field>span:first-child{grid-column:1 / -1}.bs .bs-colour-field input[type=color]{width:64px;max-width:64px;padding:4px;cursor:pointer}.bs-colour-field .bs-colour-hex{font-size:13px;font-weight:400;font-variant-numeric:tabular-nums;overflow-wrap:anywhere}\n.bs details{margin:14px 0}.bs summary{cursor:pointer;min-height:40px;padding:9px 0;font-size:13px;font-weight:500;line-height:22px}.bs details[open]>summary{margin-bottom:8px}.bs details p{color:var(--bs-muted);font-size:12px;line-height:18px;margin:8px 0 14px;overflow-wrap:anywhere}\n.bs-weekbar{display:flex;align-items:center;justify-content:space-between;gap:16px;margin:0 0 20px}.bs-week-picker{display:flex;align-items:center;gap:9px;font-weight:500}.bs-campaign-list{border:1px solid var(--bs-line);border-radius:14px;overflow:hidden}.bs-campaign-row{display:flex;align-items:center;gap:18px;padding:21px 22px;background:var(--bs-surface)}.bs-campaign-row+.bs-campaign-row{border-top:1px solid var(--bs-line)}.bs-campaign-swatch{width:42px;height:42px;display:grid;place-items:center;border-radius:10px;color:#fff;font-size:17px;font-weight:600;flex:none}.bs-campaign-info{flex:1;min-width:0}.bs-campaign-info p{color:var(--bs-muted);margin-top:4px}.bs-meta{display:flex;flex-wrap:wrap;gap:7px 18px;color:var(--bs-muted);font-size:12px;margin-top:10px}.bs-post-section{margin-top:30px}.bs-post-list{border:1px solid var(--bs-line);border-radius:14px;overflow:hidden}.bs-post-row{display:flex;align-items:center;gap:16px;padding:14px 18px;background:var(--bs-surface)}.bs-post-row+.bs-post-row{border-top:1px solid var(--bs-line)}.bs-post-row>input{width:18px;height:18px;flex:none}.bs-post-open{flex:1;min-width:0;display:flex;flex-direction:column;align-items:flex-start;gap:3px;text-align:left;padding:6px 0;border:0;background:none;color:var(--bs-fg)}.bs-post-open strong{font-weight:550;overflow-wrap:anywhere}.bs-post-open span{font-size:12px;color:var(--bs-muted)}.bs-badge{font-size:11px;line-height:17px;padding:4px 7px;border-radius:5px;background:var(--bs-stage);color:var(--bs-muted);white-space:nowrap}.bs-format-mini{width:35px;height:38px;display:grid;place-items:center;background:var(--bs-stage);border-radius:6px;flex:none}.bs-format-mini .shape{display:block;width:16px;height:21px;border:1px solid var(--bs-muted);border-radius:2px}.bs-format-mini .square{height:16px}.bs-format-mini .story{width:12px}.bs-format-mini .landscape{width:22px;height:12px}\n.bs-empty{padding:56px 24px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:12px;color:var(--bs-muted);border:1px dashed var(--bs-line-strong);border-radius:14px}.bs-empty h2{color:var(--bs-fg)}.bs-empty p{max-width:48ch}.bs-empty .bs-button{margin-top:8px}.bs-footer{display:flex;justify-content:space-between;gap:12px;padding:18px 28px;border-top:1px solid var(--bs-line);color:var(--bs-muted);font-size:11px;line-height:18px}.bs-alert,.bs-notice{padding:12px 15px;border-radius:9px;margin-bottom:18px;font-size:13px}.bs-alert{display:flex;justify-content:space-between;gap:12px;background:color-mix(in srgb,var(--bs-error) 9%,var(--bs-surface));color:var(--bs-error)}.bs-alert button{min-width:32px;min-height:32px;border:0;background:transparent;color:inherit}.bs-notice{background:var(--bs-soft);color:var(--bs-fg)}.bs-error-text{color:var(--bs-error)!important}.bs-callout{padding:12px 14px;background:var(--bs-stage);border-radius:9px;margin:14px 0;font-size:12px}.bs-callout p{margin-top:6px}.bs-loading{display:grid;place-items:center;min-height:300px;color:var(--bs-muted)}\n.bs-modal{color:var(--bs-fg);background:var(--bs-surface);font:inherit;color-scheme:inherit;max-width:min(620px,var(--bs-dialog-width,calc(100vw - 24px)));width:calc(100% - 24px);max-height:var(--bs-dialog-height,calc(100dvh - 24px));padding:0;border:0;border-radius:16px;box-shadow:0 18px 60px #00000035;overflow:auto}.bs-modal::backdrop{background:#10121666}.bs-modal-head{position:sticky;top:0;z-index:2;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:19px 22px;border-bottom:1px solid var(--bs-line);background:var(--bs-surface)}.bs-modal-head h2{font-size:20px}.bs-dialog-body{padding:22px;display:flex;flex-direction:column;gap:4px;min-width:0;overflow-wrap:anywhere}.bs-modal-head h2,.bs-dialog-body>*{min-width:0;overflow-wrap:anywhere}.bs-dialog-body>p{margin-bottom:14px}.bs-form-actions{display:flex;justify-content:flex-end;gap:9px;margin-top:20px;flex-wrap:wrap}.bs-modal .bs-row-actions{flex-wrap:wrap}.bs-prompt{font-family:var(--ds-font-family-code,monospace);white-space:pre-wrap;overflow-wrap:anywhere;max-height:300px;overflow:auto;font-size:12px;background:var(--bs-stage);padding:14px;border-radius:8px}\n/* Preview is first in DOM and visually leads. Each desktop pane has its own bounded scroll. */\n.bs-editor-head{display:flex;align-items:center;justify-content:space-between;gap:18px;margin-bottom:18px;font-size:12px}.bs-editor-head>span{overflow-wrap:anywhere}.bs-editor-jumps{display:none}.bs-editor{display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:26px;align-items:start}.bs-preview{min-width:0;position:sticky;top:16px;max-height:var(--bs-pane-height,calc(100dvh - 240px));overflow:auto;scrollbar-width:thin;padding:0 4px;scroll-margin-top:64px}.bs-preview-working{display:flex;flex-direction:column;height:var(--bs-pane-height,calc(100dvh - 240px));min-height:0;overflow:hidden;flex:none}.bs-preview-working>.bs-preview-toolbar,.bs-preview-working>.bs-stage-caption,.bs-preview-working>.bs-review{flex:none}.bs-brief{min-width:0;max-height:var(--bs-pane-height,calc(100dvh - 240px));overflow:auto;padding:20px;background:var(--bs-surface);border:1px solid var(--bs-line);border-radius:14px;scrollbar-width:thin;scroll-margin-top:64px}.bs-brief .bs-section-head{margin-bottom:16px}.bs-brief h1{font-size:19px;line-height:26px}.bs-save{font-size:11px;white-space:nowrap;color:var(--bs-muted)}.bs-inspector-tabs{display:flex;gap:3px;background:var(--bs-stage);border-radius:9px;padding:4px;margin-bottom:22px}.bs-inspector-tabs button{flex:1;display:flex;align-items:center;justify-content:center;gap:6px;min-height:38px;padding:7px;border:0;border-radius:6px;background:transparent;color:var(--bs-muted);font-size:12px;font-weight:500}.bs-inspector-tabs button[aria-selected=true]{color:var(--bs-fg);background:var(--bs-surface);box-shadow:0 1px 3px #00000012}.bs-edit-fields{border:0;padding:0;margin:0;min-width:0}.bs-edit-fields:disabled{opacity:.8}.bs-control-heading{font-size:15px!important;margin:24px 0 15px!important}.bs-brief [role=tabpanel]>.bs-control-heading:first-child{margin-top:0!important}.bs-control-group,.bs-layer-assets{border-top:1px solid var(--bs-line);padding-top:7px;margin-top:18px}.bs-small{font-size:12px;line-height:18px;color:var(--bs-muted);margin:10px 0 16px!important}.bs-local-actions{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:16px 0}.bs-local-actions .bs-button{font-size:12px}.bs-brief [role=tabpanel]>.bs-button{margin-bottom:10px;width:100%}.bs-asset-area>p{font-size:12px;line-height:18px;color:var(--bs-muted);margin-bottom:16px}.bs-upload{display:flex;flex-direction:column;gap:6px;font-size:12px;max-width:100%;margin:10px 0 20px}.bs-upload input{max-width:100%;font-size:11px!important;min-height:44px}.bs-upload input::file-selector-button{font:inherit;color:var(--bs-fg);padding:8px 9px;border:1px solid var(--bs-line-strong);border-radius:6px;background:var(--bs-stage);margin-right:8px;cursor:pointer}.bs-generation-door{margin-top:22px;padding-top:20px;border-top:1px solid var(--bs-line);display:grid;gap:10px}.bs-generation-door h2{font-size:16px}.bs-generation-door p,.bs-generation-door small{font-size:12px;line-height:18px;color:var(--bs-muted)}.bs-generation-door .bs-button{white-space:normal}\n.bs-directions{border:0;padding:0;margin:20px 0}.bs-directions legend{font-size:13px;font-weight:500;margin-bottom:9px}.bs-directions>label{display:flex;align-items:flex-start;gap:10px;border:1px solid var(--bs-line);border-radius:8px;padding:11px;margin:0 0 8px;cursor:pointer}.bs-directions>label.chosen{border-color:var(--bs-accent);background:var(--bs-soft)}.bs-directions input{margin:4px 0 0;flex:none}.bs-directions strong{font-size:12px;font-weight:550;display:block}.bs-directions small{font-size:11px;line-height:16px;color:var(--bs-muted);display:block;margin-top:3px}.bs-font-list{max-height:260px;overflow:auto}.bs-font-row{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:12px 0;border-bottom:1px solid var(--bs-line)}.bs-font-row>div{min-width:0;overflow-wrap:anywhere}.bs-font-row small{display:block;color:var(--bs-muted)}\n.bs-preview-toolbar{display:flex;align-items:flex-end;gap:12px;margin-bottom:13px}.bs-preview-toolbar>.bs-field{margin:0;flex:1}.bs-preview-toolbar>.bs-field>span{font-size:12px}.bs-preview-toolbar select{font-size:12px}.bs-zoom{display:flex;align-items:center;border:1px solid var(--bs-line-strong);border-radius:8px;padding:3px;height:42px;flex:none}.bs-zoom button{min-width:47px;height:34px;padding:5px 8px;border:0;border-radius:5px;background:transparent;color:var(--bs-muted);font-size:12px}.bs-zoom button[aria-pressed=true]{background:var(--bs-stage);color:var(--bs-fg);font-weight:500}\n.bs-canvas-stage{position:relative;height:auto;min-height:0;flex:1;overflow:auto;overscroll-behavior:contain;scrollbar-width:thin;border-radius:12px;background:var(--bs-stage)}.bs-canvas-content{height:100%;width:100%;padding:20px;display:flex;align-items:center;justify-content:center}.bs-canvas-content>canvas{display:block;max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;box-shadow:0 7px 22px #0000001a}.bs-native-stage .bs-canvas-content{padding:24px;align-items:flex-start;justify-content:flex-start}.bs-native-stage canvas{max-width:none;max-height:none;flex:none;object-fit:initial}.bs-render-status{position:absolute;inset:0;display:grid;place-items:center;background:var(--bs-stage);color:var(--bs-muted);font-size:13px}.bs-stage-caption{display:flex;justify-content:space-between;gap:10px;margin:8px 0 14px;font-size:11px;line-height:16px;color:var(--bs-muted);font-variant-numeric:tabular-nums}\n.bs-review{position:static;padding:15px 16px;background:var(--bs-surface);border:1px solid var(--bs-line);border-radius:12px;scroll-margin-top:64px}.bs-review h2{font-size:15px;line-height:20px}.bs-review p{font-size:12px;line-height:18px;color:var(--bs-muted);margin:4px 0 0}.bs-review small{display:block;font-size:11px;color:var(--bs-muted);line-height:16px;margin-top:9px}.bs-review .bs-row-actions{flex-wrap:wrap;gap:8px}.bs-review .bs-button{font-size:12px}.bs-review-check{display:flex;align-items:center;gap:10px;min-height:44px;font-size:12px;line-height:18px;margin:8px 0;cursor:pointer}.bs-review-check input{width:18px;height:18px;flex:none;margin:0}.bs-review .bs-receipt-details{margin:5px 0}.bs-receipt-details summary{font-size:11px;min-height:24px;line-height:16px;padding:3px 0;color:var(--bs-muted)}.bs-quality{margin:14px 0;font-size:12px;line-height:18px}.bs-quality h2{font-size:14px}.bs-quality h3{font-size:12px;margin-top:10px}.bs-quality ul{color:var(--bs-error);padding-left:20px;margin:8px 0}.bs-quality li+li{margin-top:6px}.bs-quality p{color:var(--bs-muted)}.bs-quality p>svg{vertical-align:middle;margin-right:4px}.bs-preview-extras{border-top:1px solid var(--bs-line);padding-top:2px}.bs-format-head h2{font-size:15px}.bs-format-head .bs-muted{font-size:11px}.bs-format-strip{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:9px}.bs-format-strip>button,.bs-auditions>button{position:relative;text-align:left;min-width:0;border:1px solid var(--bs-line);border-radius:8px;padding:7px;background:var(--bs-surface);color:var(--bs-fg)}.bs-format-strip>button.selected,.bs-auditions>button.selected{border-color:var(--bs-accent);outline:1px solid var(--bs-accent)}.bs-format-strip>button>div{height:100px;background:var(--bs-stage);display:flex;align-items:center;justify-content:center;margin-bottom:6px;position:relative}.bs-format-strip canvas{max-height:100%;max-width:100%;width:auto;height:auto;object-fit:contain}.bs-format-strip strong,.bs-format-strip small{display:block;font-size:11px;line-height:16px}.bs-format-strip small{color:var(--bs-muted);font-size:10px}.bs-auditions{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:12px 0}.bs-auditions canvas{width:100%;height:auto}.bs-auditions strong{font-size:11px}.bs-thumb-issue{position:absolute;bottom:3px;left:3px;right:3px;background:var(--bs-surface);color:var(--bs-error);text-align:center;font-size:10px}.bs-history-notice{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:16px 18px;background:var(--bs-stage);border-radius:12px;margin-bottom:18px}.bs-history-notice p{font-size:12px;line-height:18px;color:var(--bs-muted);margin-top:4px}.bs-history-notice .bs-row-actions{flex-wrap:wrap;flex:none}.bs-history-notice .bs-button{font-size:12px}.bs-gallery{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:22px}.bs-history-card{border:0;background:transparent;text-align:left;padding:0;color:var(--bs-fg);min-width:0}.bs-history-card>div{height:260px;display:flex;justify-content:center;align-items:center;background:var(--bs-stage);border-radius:12px;padding:16px;position:relative}.bs-history-card canvas{max-width:100%;max-height:100%;object-fit:contain}.bs-history-card>strong,.bs-history-card>span{display:block;margin-top:9px;overflow-wrap:anywhere}.bs-history-card>span{font-size:12px;color:var(--bs-muted);margin-top:4px}\n@container(max-width:1100px){.bs-editor{grid-template-columns:minmax(0,1fr) 320px;gap:18px}.bs-main{padding:22px}.bs-top,.bs-tabs{padding-inline:22px}.bs-stage-caption{font-size:10px}.bs-review .bs-button{flex:1}.bs-preview-toolbar{flex-wrap:wrap}.bs-preview-toolbar>.bs-field{min-width:180px}}\n@container(max-width:760px){.bs-top{padding-inline:18px;gap:12px;flex-wrap:wrap}.bs-wordmark{flex:1}.bs-top-actions{width:100%;justify-content:flex-start;gap:7px}.bs .bs-top select{width:auto;max-width:none;min-width:0;flex:1}.bs-top-actions>.bs-button{font-size:12px}.bs-tabs{padding:8px 14px;gap:3px;justify-content:space-between}.bs-tabs button{font-size:12px;padding:7px 9px;min-height:44px}.bs-main{padding:18px 16px 28px}.bs h1{font-size:25px}.bs-page-head{flex-wrap:wrap;align-items:flex-start}.bs-editor-head{align-items:flex-start;flex-direction:column;gap:2px;margin-bottom:12px}.bs-editor{grid-template-columns:minmax(0,1fr);gap:20px}.bs-preview{position:static;max-height:none;overflow:visible;padding:0;scroll-margin-top:62px}.bs-brief{max-height:none;overflow:visible;padding:18px;scroll-margin-top:62px}.bs-editor-jumps{display:flex;position:sticky;top:0;z-index:4;gap:5px;padding:7px;margin:0 -3px 14px;background:var(--bs-surface);border:1px solid var(--bs-line);border-radius:10px;box-shadow:0 3px 10px #00000008}.bs-editor-jumps button{display:flex;align-items:center;justify-content:center;gap:7px;flex:1;min-height:44px;border:0;border-radius:6px;background:transparent;color:var(--bs-fg);font-size:12px}.bs-preview-working{height:auto;overflow:visible}.bs-canvas-stage{height:330px;min-height:240px;flex:none}.bs-canvas-content{padding:17px}.bs-preview-toolbar{flex-wrap:nowrap;align-items:flex-end;gap:8px}.bs-preview-toolbar>.bs-field{min-width:0}.bs-stage-caption{flex-wrap:wrap;font-size:10px}.bs-review{position:static;padding:14px}.bs-review .bs-button{min-width:130px}.bs-review-check{font-size:12px}.bs-review .bs-receipt-details summary{min-height:34px;padding:7px 0}.bs-quality{margin:13px 0}.bs-brief h1{font-size:19px}.bs-inspector-tabs button{min-height:44px}.bs-button,.bs-icon,.bs-text-button{min-height:44px}.bs-icon{width:44px}.bs input:not([type=checkbox]):not([type=radio]):not([type=range]),.bs select,.bs textarea{min-height:44px}.bs summary{min-height:44px}.bs-zoom{height:50px;padding:2px}.bs-zoom button{height:44px;min-height:44px}.bs-campaign-row{padding:17px;gap:12px;flex-wrap:wrap}.bs-campaign-swatch{display:none}.bs-campaign-row>.bs-button,.bs-campaign-row>.bs-row-actions{width:100%}.bs-row-actions{flex-wrap:wrap}.bs-weekbar{align-items:flex-start;flex-direction:column;gap:7px}.bs-post-row{padding:10px 12px;gap:9px}.bs-format-mini{display:none}.bs-post-open strong{font-size:13px}.bs-post-open span{font-size:11px}.bs-badge{font-size:10px}.bs-footer{padding:16px;flex-direction:column;gap:4px}.bs-history-notice{flex-direction:column;align-items:flex-start}.bs-history-notice .bs-row-actions{width:100%}.bs-history-notice .bs-button{flex:1}.bs-modal-head{padding:16px}.bs-modal-head h2{font-size:18px}.bs-dialog-body{padding:18px}.bs-modal .bs-two-fields{grid-template-columns:1fr}}\n@container(max-width:460px){.bs-top-actions>.bs-button[data-bs-utility]{width:44px;min-width:44px;flex:none;padding:10px}.bs-top-actions .bs-toolbar-label{display:none}.bs-top-actions>select{max-width:none;flex:1;min-width:0}.bs .bs-two-fields{grid-template-columns:minmax(0,1fr)}.bs-format-strip{grid-template-columns:repeat(2,minmax(0,1fr))}.bs-tabs button{padding:7px 6px;font-size:11px}.bs-post-open span{max-width:180px}.bs-form-actions>.bs-button{flex:1}.bs-gallery{grid-template-columns:repeat(2,minmax(0,1fr));gap:15px}.bs-history-card>div{height:190px;padding:10px}.bs-history-card>strong{font-size:12px}.bs-history-card>span{font-size:11px}}\n@container(max-width:300px){.bs-editor-jumps button,.bs-inspector-tabs button{min-width:0;padding-inline:3px;gap:0;font-size:11px}.bs-editor-jumps button svg,.bs-inspector-tabs button svg{display:none}.bs-review .bs-button{min-width:0;width:100%;flex:auto}.bs-preview-toolbar{flex-wrap:wrap}.bs-preview-toolbar>.bs-field{flex-basis:100%}.bs-zoom{margin-left:auto}}\n\n.bs-compact-editor .bs-preview-toolbar{margin-bottom:10px}.bs-compact-editor .bs-preview-toolbar>.bs-field>span{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}.bs-compact-editor .bs-stage-caption{margin:6px 0 8px}.bs-compact-editor .bs-review{padding:10px 12px}.bs-compact-editor .bs-review>p{display:none}.bs-compact-editor .bs-review small{font-size:10px;line-height:14px;margin-top:4px}.bs-compact-editor .bs-review-check{margin:0;min-height:36px;font-size:11px;line-height:16px}.bs-compact-editor .bs-review h2{font-size:13px;line-height:20px}.bs-compact-editor .bs-review .bs-button{min-height:36px;padding:7px 10px;font-size:11px;line-height:20px}\n@container(min-width:1100px){.bs-compact-editor .bs-review{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:3px 14px}.bs-compact-editor .bs-review h2{grid-column:1;grid-row:1}.bs-compact-editor .bs-review-check{grid-column:1;grid-row:2}.bs-compact-editor .bs-review .bs-row-actions{grid-column:2;grid-row:1 / span 2;align-self:center;flex-wrap:nowrap}.bs-compact-editor .bs-review small{grid-column:1 / -1;grid-row:3;margin:0}}\n@media(max-height:800px){@container(min-width:761px){.bs-top{padding-top:calc(8px + var(--dsh-frame-top-clearance,0px));padding-bottom:8px}.bs-tabs{padding-block:5px}.bs-main{padding-top:12px}.bs-editor-head{margin-bottom:10px}}}\n@media(prefers-reduced-motion:reduce){.bs *,.bs *::before,.bs *::after{transition:none!important;animation:none!important;scroll-behavior:auto!important}}\n@media(pointer:coarse){.bs input:not([type=checkbox]):not([type=radio]):not([type=range]),.bs select,.bs textarea{font-size:16px}}\n/* Flexible composition pickers extend native form controls; brand colours never recolour the shell. */\n.bs-flex-arrangements{margin-block:18px 22px}.bs-layout-choices{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-block:12px}.bs-layout-choices button{display:flex;flex-direction:column;align-items:center;min-width:0;padding:8px 4px;gap:5px;border:1px solid var(--bs-line-strong);border-radius:8px;background:var(--bs-surface);color:var(--bs-muted);font-size:12px;line-height:18px}.bs-layout-choices button[aria-pressed=true]{border-color:var(--bs-accent);color:var(--bs-accent);background:var(--bs-soft)}.bs-arrangement-sketch{display:block;width:64px;max-width:100%;height:64px}.bs-layout-choices strong{font-weight:500;overflow-wrap:normal;word-break:normal;hyphens:none;text-wrap:balance}.bs-flex-arrangements>.bs-text-button{margin-top:8px}\n.bs-motif-specimen{display:flex;align-items:center;justify-content:center;height:118px;margin-block:12px;border-radius:8px;overflow:hidden}.bs-motif-specimen img{width:100%;height:100%;object-fit:contain}.bs-motif-library{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:12px}.bs-motif-library button{display:flex;flex-direction:column;min-width:0;align-items:stretch;text-align:left;gap:6px;padding:8px;border:1px solid var(--bs-line-strong);border-radius:8px;background:var(--bs-surface);color:var(--bs-fg)}.bs-motif-library button[aria-pressed=true]{border-color:var(--bs-accent)}.bs-motif-library img{width:100%;height:78px;object-fit:contain;border-radius:4px}.bs-motif-library strong{font-weight:500;font-size:13px;line-height:19px}.bs-motif-library small{color:var(--bs-muted);overflow-wrap:anywhere}.bs-colour-spec{min-width:0}.bs-control-group>.bs-button,.bs-control-group>.bs-text-button{margin-block:4px 12px}\n.bs-company-language>p{margin-block:12px}.bs-language-previews{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-block:14px}.bs-language-previews>div{min-width:0;display:flex;flex-direction:column;gap:6px}.bs-language-previews canvas{display:block;width:100%;height:auto;border-radius:5px;border:1px solid var(--bs-line)}.bs-language-previews strong{font-size:13px;font-weight:500;line-height:19px}.bs-language-pool{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin:16px 0;padding:12px;border:1px solid var(--bs-line-strong);border-radius:8px;min-width:0}.bs-language-pool legend{padding-inline:4px;font-weight:500}.bs-language-pool label{display:flex;gap:8px;align-items:baseline;min-width:0;overflow-wrap:anywhere}.bs-language-pool input{flex:none}.bs-language-apply-preview{width:min(100%,300px);margin:0 auto 16px}.bs-language-apply-preview canvas{display:block;width:100%;height:auto;max-height:42vh;object-fit:contain;background:var(--bs-stage)}\n@container(max-width:460px){.bs-language-previews{grid-template-columns:repeat(2,minmax(0,1fr))}.bs-language-pool{grid-template-columns:minmax(0,1fr)}}\n@container(max-width:320px){.bs-layout-choices{grid-template-columns:repeat(2,minmax(0,1fr))}.bs-language-previews{grid-template-columns:minmax(0,1fr)}}\n\n/* Look: task-focused controls, native Harness chrome, literal image settings. */\n.bs-look-controls{display:flex;flex-direction:column;gap:24px}.bs-look-scope{display:flex;flex-direction:column;gap:6px}.bs-look-scope span,.bs-look-scope small,.bs-selected-template span,.bs-image-identity small{display:block;color:var(--bs-muted)}.bs-look-scope .bs-text-button{align-self:flex-start;margin-top:4px;text-align:left}.bs-look-section{border-top:1px solid var(--bs-line);padding-top:20px;display:flex;flex-direction:column;gap:14px}.bs-look-section h2{margin:0}.bs-selected-template{margin:0;display:flex;flex-direction:column;gap:6px}.bs-template-icons{grid-template-columns:repeat(3,minmax(0,1fr));margin:0}.bs-template-icons button{cursor:pointer;justify-content:flex-start;text-align:center}.bs-template-icons button:hover{background:var(--bs-hover)}.bs-template-icon{width:56px;height:64px}.bs-template-icons strong{max-width:100%;text-wrap:balance}.bs-image-identity{display:flex;align-items:center;gap:12px;min-width:0}.bs-image-identity>div{min-width:0;overflow-wrap:anywhere}.bs-selected-image{width:82px;height:82px;object-fit:contain;background:var(--bs-stage);border-radius:6px}.bs-percentage{display:grid;grid-template-columns:minmax(0,1fr) 78px;gap:12px;align-items:start}.bs-percent-number{display:flex;align-items:center;gap:3px;margin-top:23px}.bs-percent-number input{width:62px;min-width:0;font-variant-numeric:tabular-nums}.bs-image-explanation{margin:0;color:var(--bs-muted)}.bs-preferred-arrangements{display:flex;flex-direction:column;gap:10px;border:0;padding:0;margin:8px 0}.bs-preferred-arrangements legend{font-weight:600;margin-bottom:10px}.bs-preferred-arrangements label{display:flex;gap:9px;align-items:center}.bs-look-section details>summary{margin-bottom:12px}.bs-look-controls input:disabled{cursor:not-allowed}\n\n@container(max-width:240px){.bs-template-icons{grid-template-columns:repeat(2,minmax(0,1fr))}}\n@container(max-width:150px){.bs-template-icons{grid-template-columns:minmax(0,1fr)}}\n@container(max-width:300px){.bs-look-controls .bs-section-head{flex-direction:column;align-items:flex-start;gap:6px}.bs-look-controls .bs-section-head .bs-text-button{max-width:100%;white-space:normal;text-align:left;overflow-wrap:anywhere}.bs-percentage{grid-template-columns:minmax(0,1fr)}.bs-percent-number{margin-top:0;justify-self:end}.bs-look-controls .bs-field>small,.bs-look-controls .bs-field>span{overflow-wrap:anywhere}}\n';

// src/home.jsx
var import_react2 = __toESM(require("react"), 1);

// home-model.js
var LIVE_POSTS = /* @__PURE__ */ new Set(["planned", "design-ready", "reviewed"]);
var OPEN_JOBS = /* @__PURE__ */ new Set(["queued", "running", "unknown"]);
var rows = (state, key) => Array.isArray(state?.[key]) ? state[key] : [];
var stamp = (value) => Number.isFinite(Date.parse(value)) ? Date.parse(value) : 0;
var newest = (items, field = "createdAt") => items.map((item, index) => ({ item, index })).sort((a, b) => stamp(b.item[field]) - stamp(a.item[field]) || b.index - a.index).map(({ item }) => item);
var validDay = (value) => typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value + "T12:00:00Z")) && (/* @__PURE__ */ new Date(value + "T12:00:00Z")).toISOString().slice(0, 10) === value;
function companyDate(timezone, now) {
  const instant = new Date(now);
  if (!Number.isFinite(instant.getTime())) throw new RangeError("Home requires a valid current instant.");
  let formatter;
  try {
    formatter = new Intl.DateTimeFormat("en-CA", { timeZone: timezone || "UTC", year: "numeric", month: "2-digit", day: "2-digit" });
  } catch {
    formatter = new Intl.DateTimeFormat("en-CA", { timeZone: "UTC", year: "numeric", month: "2-digit", day: "2-digit" });
  }
  const parts = Object.fromEntries(formatter.formatToParts(instant).map((part) => [part.type, part.value]));
  return `${parts.year}-${parts.month}-${parts.day}`;
}
function dayOffset(day, amount) {
  const date = /* @__PURE__ */ new Date(day + "T12:00:00Z");
  date.setUTCDate(date.getUTCDate() + amount);
  return date.toISOString().slice(0, 10);
}
function companyWeek(today, weekStart = 1) {
  const start = Number.isInteger(weekStart) && weekStart >= 0 && weekStart <= 6 ? weekStart : 1;
  return dayOffset(today, -(((/* @__PURE__ */ new Date(today + "T12:00:00Z")).getUTCDay() - start + 7) % 7));
}
function intendedDateGroup(date, today) {
  if (!validDay(date)) return "unscheduled";
  return date < today ? "overdue" : date === today ? "today" : "upcoming";
}
function selectHome(state, selectedCompany, now) {
  const company = rows(state, "companies").find((item) => item.id === selectedCompany?.id && !item.archived);
  const today = companyDate(company?.timezone || "UTC", now);
  const week = companyWeek(today, company?.weekStart);
  const empty = { company: null, today, week, campaigns: [], posts: [], due: [], resume: [], underway: [], failed: [], recent: [], tasks: [], overdueCount: 0, todayCount: 0 };
  if (!company) return empty;
  const campaigns = rows(state, "campaigns").filter((item) => item.companyId === company.id);
  const campaignById = new Map(campaigns.map((item) => [item.id, item]));
  const campaignFor = (post) => post.campaignId ? campaignById.get(post.campaignId) : null;
  const allPosts = rows(state, "posts").filter((post) => post.companyId === company.id && !post.archived);
  const postById = new Map(allPosts.map((post) => [post.id, post]));
  const ownJobs = rows(state, "jobs").filter((job) => job.companyId === company.id && postById.has(job.postId));
  const jobPriority = { unknown: 0, running: 1, queued: 2 };
  const underway = ownJobs.filter((job) => OPEN_JOBS.has(job.status)).map((job) => ({ job, post: postById.get(job.postId) })).sort((a, b) => jobPriority[a.job.status] - jobPriority[b.job.status] || stamp(a.job.createdAt) - stamp(b.job.createdAt) || a.job.id.localeCompare(b.job.id));
  const waiting = new Set(underway.map((item) => item.post.id));
  const posts = allPosts.filter((post) => LIVE_POSTS.has(post.status) && (!post.campaignId || campaignFor(post)?.status === "active"));
  const available = posts.filter((post) => !waiting.has(post.id));
  const describe = (post) => ({ post, campaign: campaignFor(post), dateGroup: intendedDateGroup(post.intendedDate, today) });
  const due = available.filter((post) => validDay(post.intendedDate) && post.intendedDate <= dayOffset(today, 7)).sort((a, b) => a.intendedDate.localeCompare(b.intendedDate) || stamp(a.createdAt) - stamp(b.createdAt) || a.id.localeCompare(b.id)).map(describe);
  const dueIds = new Set(due.map((item) => item.post.id));
  const resume = newest(available.filter((post) => !dueIds.has(post.id)), "updatedAt").map(describe);
  const latestByPost = /* @__PURE__ */ new Map();
  for (const job of newest(ownJobs)) if (!latestByPost.has(job.postId)) latestByPost.set(job.postId, job);
  const activePostIds = new Set(posts.map((post) => post.id));
  const failed = [...latestByPost.values()].filter((job) => job.status === "failed" && activePostIds.has(job.postId) && !waiting.has(job.postId)).map((job) => ({ job, post: postById.get(job.postId) }));
  const recent = newest(rows(state, "designs").filter((design) => {
    const post = postById.get(design.postId);
    return design.companyId === company.id && post && (!post.campaignId || campaignFor(post) && campaignFor(post).status !== "archived");
  }));
  const tasks = [], taskPosts = /* @__PURE__ */ new Set();
  function addTask(task) {
    if (task.postId && taskPosts.has(task.postId)) return;
    if (task.postId) taskPosts.add(task.postId);
    tasks.push(task);
  }
  for (const { job, post } of underway.filter((item) => item.job.status === "unknown")) addTask({ id: "job-" + job.id, kind: "unknown", postId: post.id, title: `Check image request: ${post.title || "Untitled post"}`, detail: "Outcome unknown. It may have been billed; do not retry blindly." });
  for (const { job, post } of failed) addTask({ id: "failed-" + job.id, kind: "failed", postId: post.id, title: `Inspect failed request: ${post.title || "Untitled post"}`, detail: "Open the post to read the error before deciding what to do." });
  for (const post of newest(available, "updatedAt").filter((post2) => post2.status === "design-ready")) addTask({ id: "review-" + post.id, kind: "review", postId: post.id, title: `Review ${post.title || "Untitled post"}`, detail: "Inspect the current composition before exporting." });
  const activeCampaigns = campaigns.filter((campaign) => campaign.status === "active");
  const plans = rows(state, "plans").filter((plan3) => plan3.companyId === company.id && plan3.week === week);
  if (activeCampaigns.some((campaign) => !plans.some((plan3) => plan3.campaignId === campaign.id))) addTask({ id: "plan-week", kind: "week", title: "Plan the current week", detail: "An active campaign has no plan for this company-local week." });
  if (!activeCampaigns.length) addTask({ id: "campaigns", kind: "campaigns", title: campaigns.length ? "Review your campaigns" : "Create your first campaign", detail: "Keep a reusable brief for a recurring message." });
  return { company, today, week, campaigns: activeCampaigns, posts, due, resume, underway, failed, recent, tasks: tasks.slice(0, 3), overdueCount: due.filter((item) => item.dateGroup === "overdue").length, todayCount: due.filter((item) => item.dateGroup === "today").length };
}

// src/icons.jsx
var import_react = __toESM(require("react"), 1);
var PATHS = {
  plus: "M12 5v14M5 12h14",
  arrow: "M5 12h14m-6-6 6 6-6 6",
  back: "M19 12H5m6-6-6 6 6 6",
  calendar: "M6 4h12a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2ZM8 2v4m8-4v4M4 10h16",
  image: "M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2ZM3 16l5-5 5 5 3-3 5 5M16 8h.01",
  check: "m5 12 4 4L19 6",
  settings: "M4 7h16M4 17h16M8 4v6m8 4v6",
  download: "M12 3v12m-5-5 5 5 5-5M4 17v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3",
  upload: "M12 16V4m-5 5 5-5 5 5M4 17v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3",
  close: "m6 6 12 12M6 18 18 6",
  chevron: "m9 5 7 7-7 7",
  help: "M9 8a3 3 0 1 1 5 2c-2 1-2 2-2 3m0 4h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z",
  home: "m3 10 9-7 9 7M5 9v11a1 1 0 0 0 1 1h4v-7h4v7h4a1 1 0 0 0 1-1V9",
  grid: "M4 4h6v6H4ZM14 4h6v6h-6ZM4 14h6v6H4ZM14 14h6v6h-6Z",
  folder: "M3 7V5a1 1 0 0 1 1-1h5l2 3h9a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z",
  clock: "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0ZM12 6v6l4 2",
  edit: "m15 5 4 4M4 20l1-5L16 4a2.1 2.1 0 0 1 3 3L8 18ZM4 20h6",
  more: "M5 12h.01M12 12h.01M19 12h.01",
  type: "M4 5h16M12 5v15M8 20h8",
  layers: "m12 3 10 5-10 5L2 8ZM2 12l10 5 10-5M2 16l10 5 10-5",
  undo: "M4 10h10a6 6 0 0 1 0 12M4 10l5-5M4 10l5 5",
  zoom: "M16 10a6 6 0 1 1-12 0 6 6 0 0 1 12 0Zm-1.5 4.5L21 21M7 10h6m-3-3v6",
  expand: "M9 3H3v6m12-6h6v6M3 15v6h6m12-6v6h-6",
  search: "M16 10a6 6 0 1 1-12 0 6 6 0 0 1 12 0Zm-1.5 4.5L21 21",
  warning: "M10.3 4a2 2 0 0 1 3.4 0l8 14a2 2 0 0 1-1.7 3H4a2 2 0 0 1-1.7-3ZM12 9v5m0 3h.01",
  refresh: "M20 8a8 8 0 0 0-14-3L3 8m0-5v5h5M4 16a8 8 0 0 0 14 3l3-3m0 5v-5h-5",
  sun: "M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5",
  moon: "M20.5 14.2A9 9 0 0 1 9.8 3.5a9 9 0 1 0 10.7 10.7Z",
  external: "M14 3h7v7m0-7L10 14M10 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"
};
function StudioMark({ size = 28, ...props }) {
  return /* @__PURE__ */ import_react.default.createElement("svg", { width: size, height: size, viewBox: "0 0 32 32", fill: "none", "aria-hidden": "true", focusable: "false", ...props }, /* @__PURE__ */ import_react.default.createElement("path", { d: "M12 5h11.5A3.5 3.5 0 0 1 27 8.5V20", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", opacity: ".5" }), /* @__PURE__ */ import_react.default.createElement("rect", { x: "5", y: "10", width: "17", height: "17", rx: "3.5", stroke: "currentColor", strokeWidth: "2.2" }), /* @__PURE__ */ import_react.default.createElement("path", { d: "M9 15h5v7H9z", fill: "currentColor" }), /* @__PURE__ */ import_react.default.createElement("path", { d: "M17 15v7", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", opacity: ".6" }));
}
function Icon({ name = "studio", size = 18, ...props }) {
  if (name === "studio") return /* @__PURE__ */ import_react.default.createElement(StudioMark, { size, ...props });
  return /* @__PURE__ */ import_react.default.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", focusable: "false", ...props }, /* @__PURE__ */ import_react.default.createElement("path", { d: PATHS[name] || PATHS.grid }));
}

// assets/welcome/hero.webp
var hero_default = "data:image/webp;base64,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";

// src/welcome-artwork.js
var welcome_artwork_default = hero_default;

// src/home.css
var home_default = ".bs-home-page{min-width:0;display:grid;gap:28px;color:var(--bs-fg);font-family:inherit}\n.bs-home-welcome{display:grid;align-items:center;gap:24px;padding:24px 28px;border:1px solid var(--bs-line);border-radius:16px;background:var(--bs-surface);min-width:0}\n.bs-home-with-art{--bs-home-art-width:clamp(260px,40%,420px);display:block;position:relative;isolation:isolate;overflow:hidden;min-height:240px;align-content:center}\n.bs-home-welcome-copy{min-width:0;position:relative;z-index:1}\n.bs-home-with-art .bs-home-welcome-copy{max-width:calc(100% - var(--bs-home-art-width) - 24px)}\n.bs-home-welcome-copy h1{font-family:inherit;font-size:26px;font-weight:600;line-height:1.25;letter-spacing:-.025em;text-wrap:balance;max-width:29ch}\n.bs-home-welcome-copy>p{margin-top:10px;color:var(--bs-muted);font-size:14px;line-height:22px;max-width:62ch}\n.bs-home-welcome-actions{display:flex;align-items:center;flex-wrap:wrap;gap:12px 18px;margin-top:18px}\n.bs-home-welcome-actions>.bs-button{flex:none}\n.bs-home-context{font-size:12px;line-height:18px;color:var(--bs-muted);font-variant-numeric:tabular-nums;overflow-wrap:anywhere}\n.bs-home-art{position:absolute;inset:0 0 0 auto;width:var(--bs-home-art-width);margin:0;min-width:0;pointer-events:none;z-index:0}\n.bs-home-art img{display:block;width:100%;height:100%;object-fit:cover;object-position:right center;-webkit-mask-image:linear-gradient(to right,transparent 0%,#000 55%);mask-image:linear-gradient(to right,transparent 0%,#000 55%)}\n.bs-home-work-grid{display:grid;grid-template-columns:minmax(0,1.8fr) minmax(260px,1fr);gap:32px;align-items:start}\n.bs-home-focus,.bs-home-side{min-width:0;display:grid;gap:26px}\n.bs-home-section{min-width:0}\n.bs-home-section-head{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-bottom:12px;min-width:0}\n.bs-home-section-head>div{min-width:0}\n.bs-home-section-head h2,.bs-home-get-started h2{font-family:inherit;font-size:17px;font-weight:600;line-height:24px;letter-spacing:-.015em}\n.bs-home-section-head p{font-size:12px;line-height:18px;color:var(--bs-muted);margin-top:4px}\n.bs-home-section-head>.bs-button{flex:none}\n.bs-home-post-list,.bs-home-request-list,.bs-home-task-list,.bs-home-gallery{list-style:none;padding:0;margin:0;min-width:0}\n.bs-home-post-item+.bs-home-post-item,.bs-home-request-item+.bs-home-request-item,.bs-home-task-list>li+li{border-top:1px solid var(--bs-line)}\n.bs-home-post-link,.bs-home-request-link,.bs-home-task-link{border:0;background:transparent;color:var(--bs-fg);font:inherit;display:flex;align-items:center;text-align:left;gap:12px;padding:13px 8px;width:100%;min-height:56px;border-radius:8px;cursor:pointer;min-width:0}\n.bs-home-post-link>svg,.bs-home-request-link>svg,.bs-home-task-link>svg{flex:none;color:var(--bs-muted)}\n.bs-home-post-link>svg:last-child,.bs-home-request-link>svg:last-child,.bs-home-task-link>svg:last-child{margin-left:auto}\n.bs-home-row-copy{display:grid;gap:3px;min-width:0;flex:1}\n.bs-home-row-copy strong{font-size:14px;line-height:20px;font-weight:500;overflow-wrap:anywhere}\n.bs-home-row-copy>span{font-size:12px;line-height:18px;color:var(--bs-muted);overflow-wrap:anywhere}\n.bs-home-row-copy>.bs-home-date{font-variant-numeric:tabular-nums}\n.bs-home-row-copy>.bs-home-date-past{color:var(--bs-fg);font-weight:500}\n.bs-home-side{padding-left:26px;border-left:1px solid var(--bs-line)}\n.bs-home-task-link{align-items:flex-start;padding-block:12px}\n.bs-home-task-link>svg{margin-top:2px}\n.bs-home-task-link .bs-home-row-copy strong{font-size:13px;line-height:20px}\n.bs-home-request-link .bs-home-row-copy>span:last-child{max-width:38ch}\n.bs-home-task-list+.bs-button{margin-top:12px}\n.bs-home-empty{padding:16px 8px;border-top:1px solid var(--bs-line);font-size:13px;line-height:20px}\n.bs-home-empty p{color:var(--bs-fg)}\n.bs-home-empty>span{display:block;margin-top:5px;color:var(--bs-muted);max-width:62ch}\n.bs-home-more{margin-top:6px}\n.bs-home-more>summary{font-size:12px;line-height:20px;min-height:44px;padding:12px 8px;color:var(--bs-muted);cursor:pointer}\n.bs-home-more[open]>summary{color:var(--bs-fg)}\n.bs-home-recent{min-width:0;padding-top:2px}\n.bs-home-gallery{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px}\n.bs-home-gallery>li{min-width:0}\n.bs-home-design{display:block;width:100%;min-width:0;text-align:left;padding:0;border:0;background:transparent;color:var(--bs-fg);font:inherit;cursor:pointer;border-radius:12px;overflow:hidden}\n.bs-home-thumbnail{display:flex;align-items:center;justify-content:center;width:100%;height:190px;padding:14px;background:var(--bs-bg);border:1px solid var(--bs-line);border-radius:12px;position:relative;overflow:hidden}\n.bs-home-thumbnail canvas{display:block;max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain}\n.bs-home-preview-unavailable{display:flex;align-items:center;justify-content:center;flex-direction:column;gap:8px;color:var(--bs-muted);font-size:12px;line-height:18px}\n.bs-home-design-copy{display:grid;gap:4px;padding:12px 2px 8px;min-width:0}\n.bs-home-design-copy strong{font-size:14px;line-height:20px;font-weight:500;overflow-wrap:anywhere}\n.bs-home-design-copy>span{font-size:12px;line-height:18px;color:var(--bs-muted);overflow-wrap:anywhere}\n.bs-home-recent-empty{display:flex;align-items:center;gap:16px;padding:22px;border:1px solid var(--bs-line);border-radius:12px;background:var(--bs-surface)}\n.bs-home-recent-empty>svg{flex:none;color:var(--bs-muted)}\n.bs-home-recent-empty>div{min-width:0;flex:1}\n.bs-home-recent-empty h3{font-size:14px;font-weight:500;line-height:22px}\n.bs-home-recent-empty p{font-size:13px;color:var(--bs-muted);line-height:20px;margin-top:4px;max-width:65ch}\n.bs-home-recent-empty>.bs-button{flex:none}\n.bs-home-get-started{max-width:70ch;padding:4px 2px 12px}\n.bs-home-get-started>p{font-size:14px;line-height:22px;margin-top:10px;color:var(--bs-muted)}\n.bs-home-get-started>ul{padding-left:20px;font-size:13px;line-height:22px;margin:16px 0 20px;color:var(--bs-muted)}\n@media(hover:hover){.bs-home-post-link:hover,.bs-home-request-link:hover,.bs-home-task-link:hover{background:var(--bs-soft)}.bs-home-design:hover .bs-home-thumbnail{border-color:var(--bs-accent)}.bs-home-design:hover .bs-home-design-copy strong{color:var(--bs-accent)}}\n@container(max-width:1050px){.bs-home-work-grid{grid-template-columns:minmax(0,1.6fr) minmax(240px,1fr);gap:22px}.bs-home-side{padding-left:20px}.bs-home-with-art{--bs-home-art-width:clamp(240px,40%,340px)}.bs-home-welcome{gap:18px;padding:22px}.bs-home-welcome-copy h1{font-size:24px}.bs-home-thumbnail{height:160px}}\n@container(max-width:760px){.bs-home-work-grid{grid-template-columns:minmax(0,1fr);gap:26px}.bs-home-side{border-left:0;border-top:1px solid var(--bs-line);padding:24px 0 0;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px}.bs-home-side>.bs-home-section:only-child{grid-column:1/-1}.bs-home-gallery{grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}.bs-home-thumbnail{height:190px}.bs-home-with-art{--bs-home-art-width:clamp(210px,40%,280px)}.bs-home-welcome-copy h1{font-size:22px}}\n.bs-home-work-solo{grid-template-columns:minmax(0,1fr)}\n@container(max-width:560px){.bs-home-page{gap:24px}.bs-home-welcome{display:grid;grid-template-columns:minmax(0,1fr);position:static;padding:18px;gap:12px}.bs-home-with-art{position:relative;grid-template-columns:minmax(0,1fr) 148px;grid-template-rows:minmax(112px,auto) auto auto;align-items:start;isolation:isolate}.bs-home-with-art .bs-home-welcome-copy{display:contents;max-width:none}.bs-home-with-art .bs-home-welcome-copy h1{grid-column:1;grid-row:1;padding-right:0;max-width:none;position:relative;z-index:1}.bs-home-welcome-copy h1{font-size:22px;line-height:28px;text-wrap:pretty}.bs-home-welcome-copy>p{font-size:13px;line-height:20px;margin-top:10px}.bs-home-welcome-actions{margin-top:14px;gap:10px}.bs-home-context{width:100%}.bs-home-with-art .bs-home-welcome-copy>p,.bs-home-with-art .bs-home-welcome-actions{grid-column:1/-1;margin-top:0;position:relative;z-index:1}.bs-home-art{position:absolute;inset:0 0 auto auto;width:160px;height:142px;-webkit-mask-image:linear-gradient(to bottom,#000 65%,transparent 100%);mask-image:linear-gradient(to bottom,#000 65%,transparent 100%)}.bs-home-side{grid-template-columns:minmax(0,1fr);gap:24px;padding-top:20px}.bs-home-section-head{gap:10px;align-items:flex-start}.bs-home-section-head h2{font-size:16px;line-height:23px}.bs-home-section-head>.bs-button{padding-inline:10px;min-height:44px}.bs-home-post-link,.bs-home-request-link,.bs-home-task-link{padding:12px 4px;gap:10px}.bs-home-section-head p{max-width:29ch}.bs-home-gallery{gap:14px}.bs-home-thumbnail{height:170px;padding:10px}.bs-home-design-copy strong{font-size:13px;line-height:19px}.bs-home-design-copy>span{font-size:11px;line-height:17px}.bs-home-recent-empty{padding:18px;align-items:flex-start;flex-wrap:wrap}.bs-home-recent-empty>div{flex:1 1 180px}.bs-home-recent-empty>.bs-button{margin-left:40px}.bs-home-more>summary{min-height:44px}.bs-home-welcome-actions>.bs-button,.bs-home-get-started>.bs-button{min-height:44px}}\n@container(max-width:320px){.bs-home-page{overflow-wrap:anywhere}.bs-home-with-art{grid-template-columns:minmax(0,1fr);grid-template-rows:auto}.bs-home-with-art .bs-home-welcome-copy h1{grid-column:1;grid-row:auto}.bs-home-art{position:static;grid-column:1;grid-row:auto;width:100%;height:100px;-webkit-mask-image:none;mask-image:none}.bs-home-art img{object-fit:contain;object-position:right center}}\n";

// src/home.jsx
var FORMAT_NAMES = { square: "Square \xB7 1:1", portrait: "Portrait \xB7 4:5", story: "Story \xB7 9:16", landscape: "Landscape \xB7 1.91:1" };
var POST_LABELS = { planned: "Draft", "design-ready": "Needs review", reviewed: "Reviewed draft" };
var JOB_LABELS = { queued: "Queued", running: "Creating image", unknown: "Outcome unknown" };
function dayLabel(day, long = false) {
  return new Intl.DateTimeFormat(void 0, { month: long ? "long" : "short", day: "numeric", ...long ? { weekday: "long" } : {}, timeZone: "UTC" }).format(/* @__PURE__ */ new Date(day + "T12:00:00Z"));
}
function savedDate(value, timezone) {
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return "Saved version";
  try {
    return new Intl.DateTimeFormat(void 0, { month: "short", day: "numeric", year: "numeric", timeZone: timezone }).format(date);
  } catch {
    return new Intl.DateTimeFormat(void 0, { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(date);
  }
}
function Action({ children, onClick, icon, primary = false, ...props }) {
  return /* @__PURE__ */ import_react2.default.createElement("button", { type: "button", className: "bs-button" + (primary ? " bs-primary" : ""), onClick, ...props }, icon && /* @__PURE__ */ import_react2.default.createElement(Icon, { name: icon }), " ", children);
}
function PostLink({ item, onOpenPost, showDate = false }) {
  const { post, campaign, dateGroup } = item;
  const date = dateGroup === "today" ? "Intended today" : dateGroup === "overdue" ? `Past intended date \xB7 ${dayLabel(post.intendedDate)}` : dateGroup === "upcoming" ? `Intended ${dayLabel(post.intendedDate)}` : "No intended date";
  return /* @__PURE__ */ import_react2.default.createElement("li", { className: "bs-home-post-item" }, /* @__PURE__ */ import_react2.default.createElement("button", { type: "button", className: "bs-home-post-link", onClick: () => onOpenPost(post.id) }, /* @__PURE__ */ import_react2.default.createElement(Icon, { name: showDate ? "calendar" : "edit", size: 18 }), /* @__PURE__ */ import_react2.default.createElement("span", { className: "bs-home-row-copy" }, /* @__PURE__ */ import_react2.default.createElement("strong", null, post.title || "Untitled post"), /* @__PURE__ */ import_react2.default.createElement("span", null, campaign?.name || "One-off design", " \xB7 ", POST_LABELS[post.status] || "Draft"), showDate && /* @__PURE__ */ import_react2.default.createElement("span", { className: "bs-home-date" + (dateGroup === "overdue" ? " bs-home-date-past" : "") }, date)), /* @__PURE__ */ import_react2.default.createElement(Icon, { name: "chevron", size: 16 })));
}
function RequestLink({ item, onOpenPost }) {
  const { job, post } = item;
  return /* @__PURE__ */ import_react2.default.createElement("li", { className: "bs-home-request-item" }, /* @__PURE__ */ import_react2.default.createElement("button", { type: "button", className: "bs-home-request-link", onClick: () => onOpenPost(post.id) }, /* @__PURE__ */ import_react2.default.createElement(Icon, { name: job.status === "unknown" ? "warning" : "clock", size: 18 }), /* @__PURE__ */ import_react2.default.createElement("span", { className: "bs-home-row-copy" }, /* @__PURE__ */ import_react2.default.createElement("strong", null, post.title || "Untitled post"), /* @__PURE__ */ import_react2.default.createElement("span", null, JOB_LABELS[job.status]), job.status === "unknown" && /* @__PURE__ */ import_react2.default.createElement("span", null, "May have been billed. Check the request before trying again.")), /* @__PURE__ */ import_react2.default.createElement(Icon, { name: "chevron", size: 16 })));
}
function Home({ state, company, onCreate, onOpenPost, onOpenDesign, onWeek, onCampaigns, onSetup, onCompany, renderThumbnail }) {
  const headingId = (0, import_react2.useId)();
  const [now, setNow] = (0, import_react2.useState)(() => (/* @__PURE__ */ new Date()).toISOString());
  (0, import_react2.useEffect)(() => {
    const update = () => setNow((/* @__PURE__ */ new Date()).toISOString());
    const timer = setInterval(update, 6e4);
    document.addEventListener("visibilitychange", update);
    update();
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  const home = (0, import_react2.useMemo)(() => selectHome(state, company, now), [state, company, now]);
  const current = home.company;
  const hasAside = home.underway.length > 0 || home.tasks.length > 0;
  const title2 = current ? "Your next great design starts here." : "Make room for your next idea.";
  const openTask = (task) => {
    if (task.postId) onOpenPost(task.postId);
    else if (task.kind === "week") onWeek();
    else onCampaigns();
  };
  return /* @__PURE__ */ import_react2.default.createElement("section", { className: "bs-home-page", "aria-labelledby": headingId }, /* @__PURE__ */ import_react2.default.createElement("style", null, home_default), /* @__PURE__ */ import_react2.default.createElement("div", { className: "bs-home-welcome" + (welcome_artwork_default ? " bs-home-with-art" : "") }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "bs-home-welcome-copy" }, /* @__PURE__ */ import_react2.default.createElement("h1", { id: headingId }, title2), /* @__PURE__ */ import_react2.default.createElement("p", null, current ? "Exact words, your own assets, and a clear path from first draft to reviewed design." : "Add a company, keep its look together, and create your first social design."), /* @__PURE__ */ import_react2.default.createElement("div", { className: "bs-home-welcome-actions" }, /* @__PURE__ */ import_react2.default.createElement(Action, { primary: true, icon: "plus", onClick: () => current ? onCreate() : onCompany() }, current ? "New design" : "Add your first company"), current && /* @__PURE__ */ import_react2.default.createElement("span", { className: "bs-home-context" }, dayLabel(home.today, true), " \xB7 ", current.timezone || "UTC"))), welcome_artwork_default && /* @__PURE__ */ import_react2.default.createElement("div", { className: "bs-home-art", "aria-hidden": "true" }, /* @__PURE__ */ import_react2.default.createElement("img", { src: welcome_artwork_default, alt: "", width: "1536", height: "1024", decoding: "async" }))), !current ? /* @__PURE__ */ import_react2.default.createElement("div", { className: "bs-home-get-started" }, /* @__PURE__ */ import_react2.default.createElement("h2", null, "A simple place to start"), /* @__PURE__ */ import_react2.default.createElement("p", null, "A company name and a little context are enough. Add a reusable campaign when you need one, or make a one-off design."), /* @__PURE__ */ import_react2.default.createElement("ul", null, /* @__PURE__ */ import_react2.default.createElement("li", null, "Your words stay editable."), /* @__PURE__ */ import_react2.default.createElement("li", null, "Original assets stay separate from generated images."), /* @__PURE__ */ import_react2.default.createElement("li", null, "Paid image requests always need your confirmation.")), /* @__PURE__ */ import_react2.default.createElement(Action, { icon: "plus", onClick: () => onCreate() }, "Start a design")) : /* @__PURE__ */ import_react2.default.createElement(import_react2.default.Fragment, null, /* @__PURE__ */ import_react2.default.createElement("div", { className: "bs-home-work-grid" + (hasAside ? "" : " bs-home-work-solo") }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "bs-home-focus" }, /* @__PURE__ */ import_react2.default.createElement("section", { className: "bs-home-section", "aria-labelledby": headingId + "-posts" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "bs-home-section-head" }, /* @__PURE__ */ import_react2.default.createElement("div", null, /* @__PURE__ */ import_react2.default.createElement("h2", { id: headingId + "-posts" }, "Your next posts"), /* @__PURE__ */ import_react2.default.createElement("p", null, "Intended dates, not a publishing schedule.")), /* @__PURE__ */ import_react2.default.createElement(Action, { icon: "calendar", onClick: () => onWeek() }, "This week")), home.due.length ? /* @__PURE__ */ import_react2.default.createElement(import_react2.default.Fragment, null, /* @__PURE__ */ import_react2.default.createElement("ul", { className: "bs-home-post-list" }, home.due.slice(0, 4).map((item) => /* @__PURE__ */ import_react2.default.createElement(PostLink, { key: item.post.id, item, onOpenPost, showDate: true }))), home.due.length > 4 && /* @__PURE__ */ import_react2.default.createElement("details", { className: "bs-home-more" }, /* @__PURE__ */ import_react2.default.createElement("summary", null, home.due.length - 4, " more dated posts"), /* @__PURE__ */ import_react2.default.createElement("ul", { className: "bs-home-post-list" }, home.due.slice(4).map((item) => /* @__PURE__ */ import_react2.default.createElement(PostLink, { key: item.post.id, item, onOpenPost, showDate: true }))))) : /* @__PURE__ */ import_react2.default.createElement("div", { className: "bs-home-empty" }, /* @__PURE__ */ import_react2.default.createElement("p", null, "No unfinished posts with an intended date in the next seven days."), /* @__PURE__ */ import_react2.default.createElement("span", null, "Continue a draft below, or plan a campaign for this week."))), home.resume.length > 0 && /* @__PURE__ */ import_react2.default.createElement("section", { className: "bs-home-section", "aria-labelledby": headingId + "-resume" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "bs-home-section-head" }, /* @__PURE__ */ import_react2.default.createElement("div", null, /* @__PURE__ */ import_react2.default.createElement("h2", { id: headingId + "-resume" }, "Pick up where you left off"), /* @__PURE__ */ import_react2.default.createElement("p", null, "Unscheduled drafts and work planned further ahead."))), /* @__PURE__ */ import_react2.default.createElement("ul", { className: "bs-home-post-list" }, home.resume.slice(0, 3).map((item) => /* @__PURE__ */ import_react2.default.createElement(PostLink, { key: item.post.id, item, onOpenPost }))), home.resume.length > 3 && /* @__PURE__ */ import_react2.default.createElement("details", { className: "bs-home-more" }, /* @__PURE__ */ import_react2.default.createElement("summary", null, home.resume.length - 3, " more drafts"), /* @__PURE__ */ import_react2.default.createElement("ul", { className: "bs-home-post-list" }, home.resume.slice(3).map((item) => /* @__PURE__ */ import_react2.default.createElement(PostLink, { key: item.post.id, item, onOpenPost })))))), hasAside && /* @__PURE__ */ import_react2.default.createElement("aside", { className: "bs-home-side", "aria-label": "Next actions and image requests" }, home.underway.length > 0 && /* @__PURE__ */ import_react2.default.createElement("section", { className: "bs-home-section", "aria-labelledby": headingId + "-requests" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "bs-home-section-head" }, /* @__PURE__ */ import_react2.default.createElement("h2", { id: headingId + "-requests" }, "Image requests")), /* @__PURE__ */ import_react2.default.createElement("ul", { className: "bs-home-request-list" }, home.underway.slice(0, 3).map((item) => /* @__PURE__ */ import_react2.default.createElement(RequestLink, { key: item.job.id, item, onOpenPost }))), home.underway.length > 3 && /* @__PURE__ */ import_react2.default.createElement("details", { className: "bs-home-more" }, /* @__PURE__ */ import_react2.default.createElement("summary", null, home.underway.length - 3, " more requests"), /* @__PURE__ */ import_react2.default.createElement("ul", { className: "bs-home-request-list" }, home.underway.slice(3).map((item) => /* @__PURE__ */ import_react2.default.createElement(RequestLink, { key: item.job.id, item, onOpenPost }))))), home.tasks.length > 0 && /* @__PURE__ */ import_react2.default.createElement("section", { className: "bs-home-section", "aria-labelledby": headingId + "-tasks" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "bs-home-section-head" }, /* @__PURE__ */ import_react2.default.createElement("h2", { id: headingId + "-tasks" }, "Next steps")), /* @__PURE__ */ import_react2.default.createElement("ul", { className: "bs-home-task-list" }, home.tasks.map((task) => /* @__PURE__ */ import_react2.default.createElement("li", { key: task.id }, /* @__PURE__ */ import_react2.default.createElement("button", { type: "button", className: "bs-home-task-link", onClick: () => openTask(task) }, /* @__PURE__ */ import_react2.default.createElement(Icon, { name: task.kind === "unknown" || task.kind === "failed" ? "warning" : task.kind === "review" ? "check" : task.kind === "week" ? "calendar" : "folder", size: 17 }), /* @__PURE__ */ import_react2.default.createElement("span", { className: "bs-home-row-copy" }, /* @__PURE__ */ import_react2.default.createElement("strong", null, task.title), /* @__PURE__ */ import_react2.default.createElement("span", null, task.detail)), /* @__PURE__ */ import_react2.default.createElement(Icon, { name: "chevron", size: 15 }))))), home.failed.length > 0 && /* @__PURE__ */ import_react2.default.createElement(Action, { icon: "settings", onClick: () => onSetup() }, "Image setup")))), /* @__PURE__ */ import_react2.default.createElement("section", { className: "bs-home-recent", "aria-labelledby": headingId + "-recent" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "bs-home-section-head" }, /* @__PURE__ */ import_react2.default.createElement("div", null, /* @__PURE__ */ import_react2.default.createElement("h2", { id: headingId + "-recent" }, "Recent designs"), /* @__PURE__ */ import_react2.default.createElement("p", null, "Saved versions, kept with ", current.name, "."))), home.recent.length ? /* @__PURE__ */ import_react2.default.createElement("ul", { className: "bs-home-gallery" }, home.recent.slice(0, 4).map((design) => {
    const post = state.posts.find((item) => item.id === design.postId), savedPost = design.scene?.post || { ...post, ...design };
    const title3 = savedPost.title || post?.title || "Untitled design";
    return /* @__PURE__ */ import_react2.default.createElement("li", { key: design.id }, /* @__PURE__ */ import_react2.default.createElement("button", { type: "button", className: "bs-home-design", onClick: () => onOpenDesign(design.id), "aria-label": `Open saved design: ${title3}` }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "bs-home-thumbnail", "aria-hidden": "true" }, renderThumbnail ? renderThumbnail(design) : /* @__PURE__ */ import_react2.default.createElement("span", { className: "bs-home-preview-unavailable" }, /* @__PURE__ */ import_react2.default.createElement(Icon, { name: "image", size: 26 }), "Preview unavailable")), /* @__PURE__ */ import_react2.default.createElement("span", { className: "bs-home-design-copy" }, /* @__PURE__ */ import_react2.default.createElement("strong", null, title3), /* @__PURE__ */ import_react2.default.createElement("span", null, FORMAT_NAMES[savedPost.format] || "Saved format", " \xB7 ", design.reviewed ? "Reviewed version" : "Unreviewed version"), /* @__PURE__ */ import_react2.default.createElement("span", null, savedDate(design.createdAt, current.timezone)))));
  })) : /* @__PURE__ */ import_react2.default.createElement("div", { className: "bs-home-recent-empty" }, /* @__PURE__ */ import_react2.default.createElement(Icon, { name: "image", size: 24 }), /* @__PURE__ */ import_react2.default.createElement("div", null, /* @__PURE__ */ import_react2.default.createElement("h3", null, "Your saved work will live here."), /* @__PURE__ */ import_react2.default.createElement("p", null, "Open a draft to shape and review a version. Local previews are never labelled as generated images.")), /* @__PURE__ */ import_react2.default.createElement(Action, { onClick: () => onCreate(), icon: "plus" }, "New design")))));
}

// assets/fonts/league-spartan-latin-wght-normal.woff2
var league_spartan_latin_wght_normal_default = "data:font/woff2;base64,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";

// assets/fonts/source-sans-3-latin-wght-normal.woff2
var source_sans_3_latin_wght_normal_default = "data:font/woff2;base64,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";

// assets/fonts/barlow-condensed-latin-800-normal.woff2
var barlow_condensed_latin_800_normal_default = "data:font/woff2;base64,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";

// assets/fonts/archivo-latin-wght-normal.woff2
var archivo_latin_wght_normal_default = "data:font/woff2;base64,d09GMgABAAAAAIhwABQAAAABXiAAAIf8AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGoNYG+d0HIsGP0hWQVKFEgZgP1NUQVSBTicuAIUuL34RCAqB0UCBoT4LhF4AMIK8OgE2AiQDiTgEIAWKPAeMfQwHW11CUcJUGdDdqDerVGeImx85G9G6bQQU2srxJDMratZolYXo/09JOmRscB3w8WdpBXoEnYhkOgxGcU5J3Su3lNtsVFV1d+oVILk6vQkOJ4cvuu8VA7N3SleaXsvZdKYhiI827g4tX4WkvQ1Br1XIoZX1yHzP+z5AZ/lhcrzpb/5R9snwIsJ7jWrktkJ4pEfz4DLfA0ruIrBxGSNZddYL/1Fd/Z8bkVXVyIHUMw8fBFcUVkQOz8+t9/8qGDDWzYAFCxhsY2MDBgxaIke0IiIgKmGdFegpRuVhxRl9Z+SdcZ7nnRfGnZ4ypNP3T2RQ7ODjAqcpIU1/6jTIzudlLQIE0LFj0RHz/Pdj/1v73K9ApZlO11Dck2t+UslkhlIokU7zSih6/ke36o8h6zqmEBIYxOIQhWAeQsCT2UxY86K66t5V1VXNdVftu9ZleJ2+PTtAHzi/BDz1pqHLRq5K291cAL7kYxI7BpRZFsITsCUDQYnnNZ0N9E+WVYgHOrMM6cz/ZmWWLcmyiEdIZpk2BJ/wGOrj9XcOivKK8oqKCJPHIVj2T/1Zvar6YKAfY+j0SsfLnqqSDOxOK0L3AF4Y/1dT/6u6VdwoakkGDOOn5A8grGaxmbN3Sxpaz2aP9IDjhxh0YkhkmSQ1V/38uTaU8YgGWhx1STcef77Ix9fFFTU4rra61YPwYIXre+kV+5GwUS5PhoRyLCHO1sTf/ZeAODUTtBcMStD7V7Y9cC+Q1f8A/Y1H5nRCy9ZOl4iHVHhm9O3fBAUGByzU9f6uIbBj5QNCidQBCe6sF0CWW7k9oABz9bEKBMD/mZq280GFvZPDKg8cB4p/HZdyapXy6+1etSt7uATExYKkFss7eQkqLHDhLXlpCJLPQ/Ckd1BMcYC781tQaUEl6BxCakOOpZs+5aK0Sle9K5el69Lw/980pfvmJkc76UopFQaQUiGM9X0sa7+UcelKaw3gABgYgBqAzt+bWpb+Bwx3mmuxHvKcGqEWlPxIVUq5HJKyJjLOdb/XPb8NmrDUkuAYErOjBTEjLUDKYDgaFRrdaABkk+O4nlpvKeOxnitLeRdZk5kz1qVXCuI1PlIpuwsihRdebCPjwuTC8JLgPM9rp+g9weF3vEyWFKiCwwPAjnRQInN/CQVxBquyhYK1YX2fUnay14CPMAQRkUYaaULjikiQIbv3v4Zvac40hvKWHFoHoT3+fO1EN8g2xYNRPMpAVsCQDVcsCDnGWv+OV+teteehHTAiESkaIaK5vv4fjUAQwmkran5nMFggkkCkmAii1yQwz9LqEC/eepDQEAWEmBKBkEbhQEDAAHoBIjCw0FAQAAQjHghIFAa0NfB/qbQqgEZLAAyAlG4uuaK7yrkuui2+47grvMe+L7tffL/c+un5+9v3b7z/1IPbH9zz6PZHzz6+7fEr4spGtHnTxi0bt27ctXHf09ue3vn0nmcnnt327M5n92zet/nE1tLWA1uPbt+yfc/20zu37tz7/N5hnAMrHW4OzwzvHj67+8TuM6ObR8+MXnE7e3fvPbU///yU52e/SA7Sg1NfnvHyglf7X137y4k3028ZA9Nkmk6704V3Rxx30+NPLj09/fTSM1AkxaHz8y6OvLjmf2ADG9r9+9MPLiIu4cSnl+p3UV+sHCTTpEgQirF6o9v0+aXmleaN1kzblbc6V9Enm8PNg3SaFinCa91EV7sNfIE4mIpISIn04zPTPYC6wOoKVAGvqSGnHt89XQDhxdlAp3/w+JUzN85segRMCIADBA195kLGpa7RqlfUD4CAH+MEACzNDghABQU/ePkVxQKQd9/GNoAMEgDpjwMQMIjddrAMEH3RBMB52gACKoBlkIMe9w0I9QwNaSZ40FBAdbVrvcM+GmgQoQaA373xs7uuOuOIXTYYNN80HZoFFEhmpYIgfYyMO8ADKB8NcL4d3nBNiIq1N443K1txZp2uugREflRvWLHswKht37zB8SG+RW6rHDu4QI0XCxnW2FVwDKMoHqhNH5FW1+Nlis6voXkuAv6hsngzf2cMtSdeqFXMc9S5eBXZWbTdfvbloz7ezz9s2BY/5PkaP+Y/+zUUawxoBeJzT4z3wc1wMZzcc/AGe8KWsGTPbEA/qc9X/wd+ha/grcN8qqO6KkAARUAwDdbDgUCCILY998M53QACVJ/rvRyS2BwWKLoqe4ArtyHSt2agMrPSl0HdVqjtKQnBC+ZaCjwDj8V9xf2Be8z6t3FncEdSW3BLcXNhSk+337gRV4HLxDlxOpwIF4KDsf8Cf/Q8R3O3sWew+7BbsKuwc7E92HZsNTYX6yMVi9VgRcDoIQNiyfNdfzP8euPvz7uTNzz4zLuf3licHB3OA3h3HU30OqNvz7qSNjTQTMzdWXWrJFu8Y1qVpKKHtqSe9zW1Hjm6tXCLS7W8ufbYbt+S4tJD4p5QPXnbsQDywx0rb3crQmvPeabxKgaYSR+tDKmQJqENPViIPX1AQppLbXv3D577z1m73/QLy8M75Jt8iU/zDm/2Ek9zl1s9Ej0yNKY5Ef7fcntol23IttkaYEn7aTbBmi1gBcRvldiXWU1lLMObCQChIODPtA4ihVb4RLikN6J4TyF+eFiIB+Xb86GoqBW26GM6G0LBW34O3vqkhfqAkQG+fKw4wJcZxkjMZ1jr3M2jULQKRXJmOaDdG0ApcjQSdiKnCYEuP6hsHDjGKRK8cP0ywYkWRLtJYkPSmLf8nETrAerczcgQGftqkiMFgnEey2PpKhbiDJbQPjwpKLMODg1aGDCTTEwH+nxuqC0gJiVjRqYCWIMKvwBtKiWP0iMKjxSN6WG17UG3cyTK+qE2lHlBHYuvhEo2I9lpRimv0SQKom6jTHuN7zU6Egq6TGizd/B2qx3Z5WLVpBjknGE7NBPq5vFNoCtgQg0Gg8FgULYEH8iTvkhrhwwwViiSNmBHxcsXNXAnWcrcW5oZ80+gk6hRM1EmojSIYn6O8FMKtvlSaBvCM2EpPZHCOCAHdpwZRZ6ZMasWRTqfSXY4H3MvmVPBtseM0BRh/g+uFRDSW0MYUE1+DtVygJfMyEJwnD6bhDN+r26ZzN/zi4vZRfKTzWLTLsqqrNNIUlaZWmWMqCkYUh4HeWokKz0xPFGmiJ8QJDOSR+u9CPO2Vm9bJlpgQEpWz6hQH8Mn2rJoj7Z6SnzyZ9JHmk4wIdWk6adGq5iYpjIzVVNoTSMsI9SIN0snXZkhb74VmGeQuZ5VZi/PxFlxhRIjW2ttCaYaSjDJREX/k6aq+cyMJB9sSaSFZp1jjG+QYsYS2kZVsmSG6Mis6cYxk1SdQ7U6SMykgTeqE2nl10iO4lAjW+Z7/ShgMJSo48gGsXCWRzmBQLRPjHwvP4xG0e7TnJyygzPaCXp6BbJGNn/yCozs8aLAyJ44lKinky1bfXyT6nmpVy0ladwIycbR6N1ExVGeyhHKo0nIyN5B86dpIYH2rPRMauEbXbhsNhRFnBHM6J0inJsZ9DGzz60XLbF2UMqRkVWGyqgBhbUG6lkU4ElPoUzwiU+eN3uEAXqNa9Vdi6qm7qaydejRqt2nqtdoHrO6TVfrbJ2oA7Vjb8NnFJMhcu1HET7GV4Achl1/gHDNzPYYltBtgnzA6AwxDGrfgSO07kC1FkJKsfVwPvK0IquN1M63F6QGAs5GFRDrDigZDrNkxcxyqQ5MFyujFJVdBggiNKn8LNJE0Qj2yw4LPLg7wAP3rgxcwMAW7iBQU3GhdHQA2KXq51LQbzs/+Nvpzpn26PjTZDjG6XLuuftF31uwH9JGiksyuQ5s0iZ9Ex2JxkMqp5SO9N4EK7p2pA7e93ZYA3Jdljkf8VphDcSex+3lXZYy1la41Id9e07nbWufYIqH1S19IN1Ge/XHrUy81bjv6pZ5mbTQP9ZkurY17J4Eljlap3t41DJT77teF1nvuuzWc5Zb3TbYrGnjAEdqZn9E7+jBkOJmdmd1rqXWKNE3KclVZ0aZoklmNqhjJEZzQSJHXw9bto06j9U404pbLoHbyxz9+edXeuOw5pdYi21D5ya7i2cihkr9I34r9zjuFigt6bzlXjRxOoedPYe4eD4oLTopG7jG/33TdwPBtDF2/+nbP3P9WXIaeSZyHZ3Xq6YbNqfG84Oq4X47JJfMlDiarIZiNuNjr2EOHPI420jJeCyX10/Jy402xmmubPgtY+ehmGtDxq05vQbmBAtE3sJ2xrkGpbwTQde8vrW8CtCsx47gPIkhAsFncrsaI437rIFpolp7lNFt9GXZ/q2k1RQ+Xr69G9yqb7jES7K7BJ1bSlvyWmDopF1sY54lbdiTnO3jsnvkkkaC7/dJy37o/X0eDsu74VL+2FFPhDWdzebVcHhNyvrPwN1Ww73SzYwVzX8ID4dBwhGTnh/De7HJ9ZLyhJp3KRu4PYs3VdL9O7aNAXc4pl8Z/UHPg3ZzMfTPrS1oO8Ojbo7btUxNtvB8im2TMxXU2jjG6ZbDWeUS8ZxjPy5rRzMzK1FoP3In0kffwvFrVno9McHb2WUjy/X57+qLq365H4D9cPWfxGUfmc7PxattfU5Ge+mr5yVf5rGQbjl0TcavSqvv+Pw1Lirp/lUbnmvmuzN5vNfjW3nuoRSVxhhvIU65RDuU4XodcSayl29/fVl9/IBo5S71+x0ql2TgvEbXn5E3z8cYlu0j+WqXz9k8T7H8WpTCymcKh9SypXHj30rilsIJp51FlxwUXY0QEGHdh9e/RazobN0UyS1RlGR+ekWarMrVi9GoiVuL/vQYYxyviXqkm2quDMedUOiK64rddEu5e+6p9MAjARDVMwBi/OfXSKKBbgaYwyIWMI+5zKBdKS1kvttBpBYvg5LXRYiSlomxPg1Mpku1ywA3MEVxmaj3XpBDB8nUqA5wNuwgcCAhQAQmrAPDSSYRJRgNGC0iERNFJAM0RtFImJRyZhYErBVaj4aJax5Usz2xeKSD8COTIVjmN5YixbCUKIOhXK2gDQz1sDSAaIShSRDNha3lFGKkNgjGaIdjLBQ6UqlTFxzjkqrbBAgmThA9JiEz2RRhpgrNNCLfkJlOagaembhmkZiNbg6OuZPQAQcxHHIY2xEVo4Wa5STCXC56OzWeuxQfLXAffA9S4KFHxN4vDMO33qcRBBYYHJDgi1WPE0sQoZBQwRaGABcdD4UykaiohQk35/fBdSLkQARKcOeCcFdoC0Sy5CoFUM7oITGrmvW8Vu2ZOvX1INTJlXBqDUBL1XZBq5/wuv+4B0NxFMjhw0OGdA7X9HWOpo7p0UaCD9QsDvBrLoDBhXdvew7CkTA79GzpCPXBX6nWpjmB3P8vGvGv3+6J9sHesHXaIzKYDULww+8Dv/50ESzUcWMqtxFMGv7Jr0ijFj2mnpn9MaedcdsP7nicUKg8DXTxPkgimRR8pJJGOuVUUEmAKqqpoZYGmpj4JMTsGYCek4866mmgkSaaaaGVdjropItueuijnwEGGaLm02DW3gv31d2FZUQIzFd4dQyUBnkDBgiQoECDAQtuX09ndy1ekkgmBR+ppJH+aEYDL5Wcrr4V2Nq3SXoFqCRAFdXUUOt1WezmjT577DuuGzw1sXl/ho9Uj7aq5KJzf+dAX612DnKkh1ehW0UGECBBgQYDFlyHY/V1qHJuBieQkVNQUrmoyZK7JTH4bLH+ElrBWZf1IngEbQwzwihjjDPBJFPMdOasW5cxEo0Zi9sorJ2P6Zu3g066vCfpvaCPfia1MBcuwvwF3JRC4a17cAEKrOeecH7n0P5JsTbjaPDoc3gELj4s3XcW6ovaGQCB092437jdI8z363XMAeO+FYfXmV0Bj1EQbWYNiGIFNW465+hsZqbTp0lfecV/8x8ahTv/CPj6F8hALCxUkFTWZpFBAt/8qJWmDqrcHsw/ue2jIvIpW/YzMsmWIQRFvhv8nbRqOMw8CpEZIrRtHDi0ypoFe9YnO15QLgjE74iMqub3clz58fmV8KtDc1f9thtyuWUKqyBwpEh8V/vOikJuuJjpnF8pUrl/pFbY8c/wECHEjwRzJOiDUctLQOXtDBJwPxR4nLTddrMTGHjM+k6zOYO591pVDaY8qRuo0POkRZtC10IbzS/UPpvPLKh4kV6GolePLQNy3/juV8jDLHSokMCAAwtetEedICiCQ8gtDbgVomEMl72pA/OtbE76oA0NaYUqlK1EaSUQ0Qc54wDrrzCXjw7Er8G1Cf/a3WqYZ17obUCbEb2//yhkeBhCEJkEplg/mCw9YPz6IOr+Yr1oyQIBcfbjQ6yDD4bQ6QMwx59nKRCHOAOt+pAMHsQdQkwtxWjJCSyzjlLAaQrxN++43g5Q/Z5ixttYm9M4FVkIQXhgnOytcg4sgQ5CNBjQ8gbkkRDHwdCIwJPvOwLirsWgAwOqWv9iEkFgMzFqIBCIVSQ0qVE49xixuo03AQRqbjA65lOL5AAKSPIoMrZuLiSxdBjCAkgJkhIO9xwZrDhBXCwfyRUbWDwKkOaTAbcjGcLsiIewfsLpoSEixBRf4qAYhKx89CyxxRFXPPElkFAiiSWRVDLJpZBSKr0KYV7y0uV1YQCNYKh3gAwAyKKK6KHz6NfT1oUULDqQ1GqFw0BiSlW6vuy1qLIVyumDQT0gK7CpAirgh/1EI1Twqx9olEmF3IJ+2xXC1jYkqrsf+PFm8K88GrFHNjUs8q/Q+RGm6C4f/5zQQkN4iAARIfKNeswoSB4UrXjR89xcZtE2c9xNlvjq6qqrA9etKK803azgG+KsysqaRVrSE2saq8z15yELSQsPL8vLq7EvN1kgZDKFkOX6fHwE77bYbDpvZkQEY9FoIU1IDU6dHhkUTaOIhHj4vWFM6e+fPDkmLgekZGkys6TZOZ6lAwlC4Yy3W6FAo3t0OhyukFA4IiNDj8nNRSIRiEIFVKjeRiiUVpufPwnb0BC78kqSXMGlbm+TE7Eow+pPonaq2GOz9RUmhxYXywvxSkhqdZjD6JfYcwpSKslWYxGLmxSs4nWgWABDZj8FAHI9GfgM/v8XELcdVidPYgp53TTGnsmiXsTG3sWq3seRPsT0fkBf/8a8/sIMGHqMvDHw/55P2WxpYNl0TbHh7Jg5UZXRri37Lqu/uF84oB6KHvrRw7HDPzakauIx7THnscxjLceTT3afcp/qOKM66zzrPqc8l3Au80Lm9ykXMy+2X6FfKbzScJVxVXg1/3rU9fwbBTeqbjJuZt3K/iHzR+Ud1WPR45YnCTAbnyfVSPUy7QXiRe8LyUvcL3N+aYEhrxiv4l/5YZ4u+DXfqDcLLOrvha432P+niPo/EHhJbK7quq4bZvX/Rrtk17CPACBKamGW5/lBXlhLVRVdNNXp6vQNRMoilCbqG5qN+1zzfzzmV4HffDCK5YMC2EM2HcDpe5g+RudTiVOPBnYSdgWlryTWOiVzcALp/7S0ZyIAYXUtHQTQeQCwengHgEEIICCwIAC0IgCYAR+0vT1cgAA46P7QXgBAfwkhjrPfZAZMN0GrCrmSxdGRoUEAA4s9jQC0ooKY5O9eRgh2L8FDuxdw/o459A68BRYKmltK2z1AmhUOLmBnA4E9ACY63nWchh/Q5U/F799f+tYp9Q1xyS8z/2wBANoukV7XtsIL2iotRUfHwrTviLSlX5nLskMBQyKCxQTDuEFRyrIhO2f37aFDCCQChxAP4gStApaAJxAJZAK9wCpwCbYZIuE8YwEMEYV9HV4koA6BSFarOOZnLgQIR2AXtggYAs690wksq98C2GhaCuBJfKv/H3Oyi361fv2CAfjvF9/jrwDgs/efLfzsGv/VZ8289ckj7g2uir3HdhLPgAAsDbC55wDoStwqXaglHpzvEP/69InvPHTKCx988sh5F5z02kFXHHDaIYf96Q9vHfUfCDwESARBFYaGjoOLh09AREUjnFaESEbRTMysLjnjsnduJIQ4iTySpPDLkClLgSLFSpQqV6dBoyYtRhqj3Vgdxvk+CHDR354Y8swvnnsVJPg/M3wx2V3/uOpr9guAn+yyO6G899nxMNhpinv22Wu/Y9DAIMGCAgMOIqEogoVgY2BiISMkIyahIPWGnEEUHT0LtWZO8excHBK4eaXzSZVmhBy58iQrU6VCpRoBv6vWZpRWo3Wq10WpNkSIDKGhIPCjO2667Qe3QAAawUBQ4cB3J7Y89hD2Gr1LGwCxW1MVQgDAc4EIIZs1E6iDUNhZyC0Z/JpugDAMEq0bhQXAHmrdJBwAPri0WXibUMu7VBq+othaswXbPMzaAEPvNq09/bYDdo6BeDORK8AHhYD3ZTCQ4aFl5fl+hGKdZJAnx6xlcSVYGQECqMR4hotbCM7uUcRK/Jy37ApQ9WL8RsLkhF0xgCt442S+o+WuvPR5UDn2sVD6m8gsvpXKBMjRbiXZ33xQ/CuLOVrEOCWVEmsYJwErppoahlsnsr0dC4OJKyo1hQooyclvAYGB4k6Lw5zDh06lxFh0YgzFsTIkqaQfct4Xdx11KQY0a/uxiZAcHRX10rV1kquckgCLqabieDcZ2r298PD9Zk3WhFT2OOAtcV+lZWUCtC+Cu+J8ebkJNN6wBhqUDEVx1MjQjm3+oLqfPHKmzBnI5Ie2vk7rgJyc0En9gdNT4NocmP08uXWNnT6sHux4varalrPF7awd3OetseYmtuUg1cXAgcEy7t/NCcpdPU84mLFqrXE/OuJldKf7VsXZYW/X8fO4vQ9NiEZlqVgtynV4RQORf3tp/vrddipyW3J2JWOgugYJMY2gCCCzXlZtxolCrrC1ulf9Cf2zoAS3nxnKamdnp/rDcoGFmC+20A62Q9hsNOl5FkqmWs62/IQu+VXIxznFaONeXKdmOoK36UA17uHHm1pagmDsBxBXpvLU2aEH3rD6XPJfIDyvanMcNFDUPOhj5FdhGdd5MTdQ2QheBcWipNuWGLLwISqMoku87ISI1qKIglzV05bKhyYSim+DWcaNWNQPWDklJJxayjismoHpcd6RWHDlmFSvmMSdvUThEY562TNChTWyOu5lzJtWYaUgcXh+XxwEQStk5sCHHljWD9h/FM2r+yIpK5pVOBL5Q1SQMhZuLPgirRnyF2O9KZ+IBcaUryGVq2s6mR6Xg5p0Ipjp2oXOsrBKzlzUwXGDHIlKkUlaJGM9M8aUaVCChpdvyrAIGo7eWpZB4dY+3wJTJKG3ReZi1mwpNekqPKdmn7cy0WXdbD/OO1Yte5YWt2E0pBwILpb0py2NPXp2GzdSUYFQeOiZ2TkdhyYBuONlitAorYkJ8b7GrjgX9oflPSjihDugyCtXUoWbLkTGVH5XfjoWpm3EurhS/m10ySI2nUl8kVCpDvQKpU3ko4Di8oFAWM/nE1lsW2tE40vxYmaQPsJDU+xamiQmxShEgECot7bWIX/EDKtmlG/8f1DEP0GSKd7ix0o9bZgjdxSjkAs/RJIRIuGtmaTYNoskwfaOoqL2qbnhKdtGpEMr1RQ0hXtUlzTTPcZwvQ1txcR6yoxJ2ekwhRbVqAFfwsCh0VzNSkOlc0rF54EwKzmTtXh9XljwQzRLkboGgt6NXdr2HDk6Ig2Gl5j8PDl3Ad1SDn3qcY2J+9HtJ3PhXDElFDMDIOmA6H9QpSBjUCtCsQix5GA1eKvLcBxyHCcU9Gyywb+oUFxldYtZYgCqGpEDrurJkbWuarGOTAwz5aI9BVLKI29ZKnZN01E6DdtdsD4Rw5ju4O9wtr7Uq8j7dSomlPvXd0xML/42REuOBMO2L5DGI1Zn1U5ZxFE7lVl1mXQxKIl4lVSsLFGm4/28uAvkzC+IviJndtVnYLeWWzlKS1QgZYl+mcXSpwaOSrPrFLKn0Ja9VEf6VhNs8Kx8mhePlixxA8x0mlwxrGkVwJVUkXNXaoLi3IJUGLFwfsvIXirJYpZAkrQYBz/y/c7yx/llDvdLr4TS1X9yyHc1iqcpbnDfK6aG3SyydWJDkJE5EOwiFpadj5Tj5YmkdORTMpVBY5sTz0IiCzC5aryRty4qPho/4ibMPbLgTV6vseoBB90s79FUScbgSFuXiPaP14n5ILOcy9BjPmruPKdCh+9c3JxDkHGtHAy5V2m6hLcVRmQCKzwdQ70Q8+JKeTRF7QnzNN5RkiWpbtomeqLyV0vivvaskMdYw0eLr8KIOYTkXdnpsvSqDqrdqwOHrKzLuLsWJBaBoVsmlcpkFQcYJqRmp4OoFgD07a5YiVWw2J2dZ7e33sxz01MUoCU2oTjyGEDQu9JzdeIWPXQPcl/LmPpp3RTuSSp2SbNXMBqIGW8hHJaZeE+xgicdlBo1dYBakmdd9pH66WAWVTaa0zt4HdwhlXSci5LmNFUEzFlEmvxmMAWm7yeZGIpptgvQAn3aeKAha48ljjvBDsJZEigHR/st6vcw0SYmNDYk6mxyAu8Uj0ha/H8KGqNxcTc2Nj6mcxAKM+nriHOFVbAnN0ln11yHHtT30BMX5haovoEWl+B5vdwwH7bdvq0biEmaXYM1F5pn13A8KfgUiWtwmo+7UT7ua1y54wBHIHzbSwaxGnFKEgVY7EehWLCkl4k05NXn89sCBdxLuIWxOlR6FyMv+fCGUkz8G9ZSAu4E+KQe2FXwOTIQ6qvroXplanAYkzhGqIkS/g0RyX2yNytQJIeH+ugoI40CwwUxfRmt+NiLsYuzigt+ENdx2Dme9+PgoRu3s5GAhOQ+CP6wS7jQGAUo1isqdLc0ctaG0bSFXmqOVKV2LDhIAHfDEhT8KYYe9n3Biq6W202StsnzZQ72XPyFbHw6oeM/QXiR8yX0sWLYZ+9a2QCJWBg8Vlnt5T+tkH6N91idV+R61Mk97sJysWq2wLliBgsfSMtyJBqQdevqIw/rNnSRIehloX0baUUKkpZGcQUk+0xPqGbFpb38X8FDpRZdOEUHLQnJUWE1wCx84jLYGxNHFQ7lybURuQTC+GvELLmYYh1IXu6qFZzUcYd5fgSUd6lGzOPclTxpObwnhnIe/1oUOzpIAQDtWMpwA+ESejDexBv04Grfz4kabFgu5LcyRIC6Ipl1pXDeCVv3TLrAd73vEOmU7wrSHulq3xXkksK4oZe1WGXMJMwspX5FzRCxvszwNPs5EKj7NXRGkjyyQT5g2ivoYKHmozEbN2FKLb5yrkRDA2U8mlOuc1yF9bLXmSRCVmu1BQSA6vAioVcbH17TMa8Se0cA6QAlPbp+Gk00kQTjrlAoZAIeLPqvqj3pyEyKlJ9uTO5WoftqjOgno6qwpvgn6522rgs3FtoZPdKaH50w1ttAb0MiiNO80Gm8dpVsgC/QMEYv/Y6bAim+Ut9OHR9NyB3bLW7p39VTrCgU19lb/6C4Csd7UIwCDL3ziag+RV8wfT2Lp9aTnyElMVcHImxscObGdns+mOM59qIdGDlkxoMky2FTxwkjv65j0I7Mqu8RWsVW5ju8yC2kvZqlHVH36uzSm8fxNhVspLMO2uBnYKHRMjckkrONqee6H19IarzJy1M8fTzG2bGbjPsqfxhqpfqPr5Xpppzyzy+zh7idU/z+Re7gKaFyk53KfBDGhiFe3SETBQ+ZV4URDsZBeiK1Z5nISJOSTJoOex8kLUBmJakfm7NZk8pJ2tq0Goyj1IhXhkKVUpSPBb+Qw7Iw/bHlAgfdsyh1dPrC7sFQkAauex0rJ8GVN/imTrsJVCbIn2N+Ec+cwdNp6Yz+8DRt+kxsOTfRbXVcH/p4mfpTBPUJkufRuPtP90xcsEq8R1PKhskHWnoPNpfI+jSYY9z8vDL4hVBnjDi6nwn832/8yjQ7GLKZsTzZB5mjqQbuS9BQPf8celJ6WefxIvvSaVhtxiK3iwyRTRVk2uoeYoBT4Om3SPJI+suwfSQS/fZ53yvu+W8K+cuH9LZwNFmGQS8iItuhk5SmwLc7bVSeIhkn43PJwBxNEGSN8MsNkrGjCOvyw6KGyowjqTTLgd3RSq8iOWSW0nf9Af99cLb7aG/xFOzpEMLCWENYoY8cJfMnz4GW0wb7QsrBxG0qciB0J2b+hjFrJZWcm76kwIFWq4aUksyIKerL930QXm2uyDKaQ6BvH1AXh3yKZMzsnXPtmo1l3SB3CUv+dDuI5xeIuSRaPYMVTc2lTCcjP46Omm2t5wWovGGg078D3FX9ZsTp4TISWlFhKUcZl/AydczdUXmQezGTzZcKj3xxelwiQN/Ug5dM5YbdnApcbUPd6Kerv0PioT70f/7lYh2f83dUH9YNs3M5JuFj+zExK3qeVT+bS4fnv4ctO/btT0NlIb748l7LaKm/fxLc0APzq7NOZnHJH/IymL8Ms64N+ojL4L1JkCP86G6T1vV31/a3ZNWOzK4BLKi1tjS1lBjHQDPfKq1v6IEn1TCfp92o1mzUfhtq1BvvUBeHhi6hUpfI82Kk//56tEUgWSlkndhNJ5NDXXxJj4h5YzWdxA8FqPTtpS0LwzdZWzhRBzkt/bL5dtf8scNHDwkVo1GHoaSFvkIp8O1oN+Uqo1L08ieqT8i8IaEr3G7OKlHE/NP8TOmL5Iw4J37QdJM32U3X/Cq7BzoJdQuT0ga79+/cvjxnmsXfVjBZp3KliKNcIwyqmlRamqomX+82pIpULl1PQXrbNPPqY5W/mZmVFVVErSMTCQwNKS+taO6xZXTmypHngG9HaO2CpPSB9jHpi/vGtXOb50UmsWnMTFOY+aLSXq/LyHlAFWgLyJVw37FvB71l0ea6lrpDy1qOKe8TabLe3PjAE2mw5vRsedf+1szU1SfPW7x/Gf7e0nDI0+JhgH7Cyp1bDnVmDg76mp2jufmxUYXxU4SnRA6K1JTJqWflxYRlhNcURbpj8sU6lw7zoLF4ZDE+5VGCLCME+Hb00e30vh19crv8wtjxbXbRSsv6VzRiRvQhbYSh0PQBhBB89eGm/ARZryy82WQ0ehyn+09nmprqotM3EhdhW4kLIy9eejm2sfRRRp8tf1Q025WG8Vm7twuwvHFrahq6Ly3/KbpQCxXCDjSW8TnYXTtyWsfIqdmvf8/F4qFkyMcvBL4d3ZKF7tt7w1BkFmnR+B3jpIvHOaNRJDZ5Sd6UoH/kudEUQsMyX+byjs7MwT7Y0LjUF+vsmIvM0tBkSOMWsHMtNCs7r6DVDZetWXlWmoWVWx3EFGo8c6tDYOPR41ukOoX01MxvxWrVg1q+OvhvOKL5ktGUakklZb0/tM57qnNwNHDGR9BbBjbXt9QfGmzhRoxfmIi9fT943458X4UxqtyVoK+sjk699q7ykq7eIJ54T3wJZOzoazmfu02C69ZOTH43pGswiF6TIcDsHdU+Mhh7eF1NLFqVLVmywP6s4v+0XOer1EeVOhJiqr+dRZ09/usPw42PdCP0wu47okcghWCpYaQbwtOi0QREP4xHCks8jCihPK1tcxDX+L2P6g/z8S6JnRGRCk+ytpIWYyqjJUUqkw3EXjxX/kIV/ieFwYw67wv103zcy2KHNjW5uE8J3i15MNIy8mEcqCUU9Fpc7SN29W1Lz/T7fNn+9G19u0a423steakFv4m1Y5iNod8k1zHgsqBKSDodn1LM3wRwDsj/ts9ac8fS2a5Ayas6YlbfnbrwroEzh7dPbz6kzMzhodjqlGh09aGN1assKzk5j/Hvfek6sn1R88nwgIuLJCdmqZtOAsKHmifulYufo96/jRY9cX2sXbETi96OBSF0zMDAPiFqj3A2eoC+5Kbye//cuCaQ3RIW3zQstQA3IXWk1OazYvpoTyZKw7+QIoyoZfmKGE+ZMaIm5d++zzGXzREOpSjLdqhvl0tS6XYE+EgH5MjfjMl/xIIYz+7vkGrGg/ME2vRUVmR0RGKuooPiVdNvuaTSef+Rye1IPCbc6CgVxXuL5OFJxn9DS0mC7AUFHFbP8Rw08ulPiEreT29JbIapiFQlDsFrSeXgD/7+iY93MSG5TuBDXX9rbX+9DF5cik2WECSWNV9MivyLpfdDVUMPPHFVYHutnqrWPM9lrEY9dh/1Wyp16eLq8m0VU6pFdcr5LwksJ/736bfwqMRCxQSK7+aeLVQqTuL+291oR4XIGZfD3fomm2PyVZn1Y0okFRSGs0xDb7j7ntmhEyW9zaRHOUslt3NXJQcLy4QUCo9LiwkQ94mp6hL+rz8Jf99eRJdZ9oM8gj5LsQSDc1fd6oLRH68fl8QUWPQdpWW6ziJLdW24k+Yxkc00rzOcf/b7R3KSgeFxAzYhs9Fq7Cwpje5otGYYM5jruKmGbmnpBbHSyEi2kMyMlGyN6MIocXsUN3VRJhvBY3wA+q36UbUXW3SdZaX6jkKLVXL8+kc03HWrCufGTMtWEGtVRobHQJI/+v4sP9xJ85rJJprHCXSE3NEWS0dxnr6jIi6Rfkiuu/0vdTXBXYn+HU80zN4YHzFtkOAuQq+yNHE73cWWjlZLbmXkOpbXRDKzvGsjI9cmGXGWpHVARMhusZo6S0pNHX1/tq+a+YFqCvPG4fRxd1G5LPr25Bc8DjDkSS6jpIwv1Nlt1I3VL9TWbfwe6Sf1dBs3deSFGv6dV7DFF/AliJsXG4KeHViQo6NV02JLA6VbwOL94ge5Co3oTcN5jqw7OlHm0ZoMaVVqLzcvT7IQjBWv/5s+ebnUpEuvUHszwsoppITQlzE+X2y41pOlNJ/MOxl6GRPEwjG+Z/xPp78ZW2u0azTpRmO6hlv3AjhudUEY5JM1Ep1PrE5PqByXyjkzxUITpv8i1QF7SVtXW2cJuYsMHN+pCWlspouNn6YxjjJ67leyoixyCpXWTLrdACsOI//z44JsXdj91TN02YRNY4F5fwbS9kbWDz2Zs/PSYcfMca9Sk1dEs94CDnI1zo3B7Jsk0nqkMYP38PY+cYRHqEx11HX52ftcv4Zwn2yU6rbwVkE5cjryuayRFeVOKaa4u2mkIuSOtlo6S0otHX0wN6/VGiwtsXSSFgSSzWQheR1P3UUwKe7JXcS6VifkLna00dW4immOdiiuHp54b0892JJxoMVbuytYJSfkjCpI7M8jx1Em+/BLsdSeqo671FBYu7xndsZ09s3elx/KCooqIxayks1Eyye9KEL7/x0imVkpCyNevhT+frSIIbecBfZt33Wbw5ZkKfSOoi71pkr0nQWWmAO/bsd1/aOVbobXSJQ//B6pf3oX0VKwWGc7dBctZ75/qCCypP6F214feq2FluJYSdmp4cUWuz5bMc3u/CS/+xMnOHv4oZxoZHiNqi4bRfnv+kzMkov3hZT1FaOl/D8R7yVBgESw5DCWXRSjMHAHjITxf9q4rNevqKxx9uAkrCPMgVLImQcyQiMjfKGTngswJGgsJrR+p4BhatpNCP0h4q4lhWrnd0ZqRfaX2cEgBcTKshKMBQyDOYd5jedQWOOyKEhHiKfSGRNdXGlMqAjkioLW8gVrteKs+jTO9PEc9ViLrOuZDAMuEaLaGwW6+IAzbH75gsJAoSwslxaRveDcO7BF8JVkBiq7dO/5Xkl0XeQqxXR+N6UqUBPnQBvPLFAJ55A9U1rE3zlUakSBqP83ABdOkXqy3/ixnHxU7mdcRdab7tMksGqQNMHLzekqhtFRnRWoBFZ/ItsWGM1Bs8tHaz28MctIvTGfdDvnCNCYrPV9tk9Af0fe8XVhzRp03ZoZOz8fDp7fth89Zj+Ysl96X5BnDlsU1n6Z1FP+uezZBzcqbtHG/bb0/7t3/v2rJAXnFETLoGcoLlUOvhzxjMWF7zEzLLiR/wW2mvGjaAEg2G8r5RvtOvzYsGnTGeoJxyL4KOSNtVJfWWbA26Vjn21nhon9n+TB467Z+IUPC3lpD/p0TV1GPUyI/SzT9RpDHzj9o6Xh4+2wumrOJtST7fKx17Vl1Rbg6GF76B6afsTmOQoNvK8skkD0VfhfgrOTQsnJSsmT+iRCuIDcXkKnzZyHJ6RCBIQ2WR8TvnmXaAvpNSYsOnNyMM1djXz33x+MsDBGCOhkMkjzk8HpJKNXLs6Ijxf7vTJjtEcm9vP8DI/caI/iv4uwRm6ElmPA0dgB+ARznsCWzp9WV5fFXrQDm8251yKzmSojfqYEUgyplOqfI7RwFfAZfP/8AIOKwPpdG1Ju+mlZwpDY5CUBoBeG85OKnNGMFUlx4d7wMMslmYwxS6TsQoYGJTsLmlUOV66cFOLmRgrSLK60uGstx4PmeJuBkJDepDMXxQV1h+hum41/mdSaXqElEMtDXRGLvr3F5b9bKqR0My2W7Opwp6taZcmyKS7S/0CmJ2a5bLF5DVqQ+q02IHckzDB9G5rdc0beElEXUaBwHj+xvY9FvJ9lzcsJ5HwLeARvozEmkDhBdsgmFnEvh6sOsASMiXd3jiazx01vEeA33YsiCCyFEcZyX4qlrj4aaAkxRUKHT9hT2iCYE5dTKI1JKTarS23dEtFSYRSVUg4S8ho/Kr2FVnWVwx1TVRPtrZRBnWJpB5DJKB0ycScFLMhWrHIvyOk9ndfy2s/wlDubDGN43fF6wCfkNhijCkxmQ/bAq3B/FMU5AX1KSqVel0OR1v9qgz7bbNr+QOuNORWWQzr9QYvlvF53wWyOrIiMCERGZUdEZoIwAkXblsUugqRUAGdi0y9hmmp7YkxgqTOmuAE71Qvm/kbEUimjdEolHRSZDOqQSDsAED7/a4nixdUwZ3H7NnZo2bWBZDHLLoLypCAj0SPwn1Qqd39jnsTZ2e5WJAjSzWyzXSCMP/99PBLY3dmnsnXQll04BSfFDfRM3ra1ZR+1fLKFGVywlkJNQfCwUtt+caQ4isZm/uTTfD9v83I32E2IT4jRY1PxtA1MSt1pSujPi4P4TiHZuzcoaI2JRPLuIeNTyfwvtWJp9e9CzulxyMOfBELyNHAieUnsVdWoIHtmC8MxtHN5urXo2PF49YDSoUwGuwjWRJspjXK+MYi+g889TKOM63JhSSd+cC/wLXoVysfdUtpcdrCXEP6W70tI5uc8C3eY7BG+sAKWjEE62spU2tpEpmRHjJ21i8YaYrGG2LTjoDKaXarPp29wow27YrMUxXpsCBbsJGgH5/LYM4aKa2jcHQ0KReEOLq2maWgrm7dq5hPmJhp9I5O1kU7bxByke0KpHjo9jxqaB7YRSmyuZ17gsV6mIny00JzstGop+jmrOcMaYtOPsVjH6cyjYJenDTYTn5XsL7qspIOeO15t3r7mjSAImvrxrKQLPF3n2XJFVnJ78HSdZ3PxBzncJQdvH1uzLwnCs9nvFGj5m1oWocQ71AvH+lEUFPRN+0tvew+0n4JzAARn0T7lQx7ic83tmdgD0tbo+5+85cT1TBhjlXjOgNpZo0TP+O8YqPh3B6PfxtlK1QxytWtGv4o8wbBhSPDn7KsXGLrQklcR3/TJ4e+Jf8YjlGO9K9LHsPBFMfMl0rP+VjKGhO5GCkii2Ip9aVSdMpHcWO8Ra1cO3pz3LU8w9njhfeFbbz/JK9p3a4Siw7sivY1N5oVHk3AkZHdYKM4LWNC8akmV8q1bstUsmZy1OvNek8uiwHovflJNitTRamo1S+0Nn+VStqF9tHm0admKYoAGyV5XxQjWpMSKQtWFgPJCx5tUqXwVZexJaRUV0r1Vsjv3+OawzvnwThBFElPyTQEoI7dyPiA4Wia2AGlFxjzWXwczivJednfl/ZJRkF5kmy9akZYmWmVbUAS6HmcW5ZZwH8osTG+Mjd5v6aKVsQsaQcaK8GR8ycWIU/TDS2kFtKVHaKciLpYk48M9YYdf49HnYHM8XsVsgdDncA8O04DpMfjLox3ZElYQtuUwXfsN96QQxf3j72+mg8ZVPddya27X5IIXj88WyH8Y+WXkT/GnwneFirwqW5T9ORt4WxyekIlEup/Xx7EBfV9bsn21J2+vNUaaeHYDasdPb/npcPWAgofgxvhZ5zu9sPX8bt1npwdqSZlVsMcA8yCWB1IHgvoX9Cyg9Tf9LZFxlwTESKQeSW8bPX4XZlVczpvDSFUqGekzq4YdgxSmQuFjHpo6rA/S05VKeurKvMt1D1JZSkUa68FCutarVaeGh6tTkrRfXvNHByepHvhY+j8Np238IO5mQnydIDveOuJVks+GCcHhgrE2X9Kr+ZSy4+qE8ZyaqRXRB+i6HMHwgu77nC+FYD77fuXG21/vIh39QHTF1BogrXZ+lx5Ib07Q5ZWqExwlSkN2AqkrmJvXxuX2u9ndKwOrCEdM1eDZwAnficTc6tKkyjUz/p1ZebLnj0MmlOnw2wmlJyf1vz07tnCx72jiUe05AN53nU2Trn5X8d218mtDFUNXQcbVirsVYKvM5Z53FxJc8+fNnz+2F3z8uS7XvDbIuFJ5t1J6uaG1YdQCcLLR1ePeuVV+txwUwE1dC7rmN9870wkE8L3TnQO7ecqXTgmIs0rw2LPiB+u82LKzZ0DMFdIdXH77yastK+ZNkXCirn4CToDrJ9fNLnuDBA3SZVMbBqfW1rNr2cB+6PykBFS3cm9SCJ95lBzJoY8BR95vL/+4nePXJQlkqe7EzHuq03sEr0eiW5bm4euSlIu0JN62C2zFhnCSdv3HDTovIHi5ZaVYQ5rm1Qe0xBiHOIqBcKJ2AFy7dmOW3rD9TNjVNgzoDfD2mmCcabiRe+PxH6px2xlwb8mkE7k1B+d2JK3vrd6kLS1dqWof4Zhd5eIGIl337CFcDa44DPX34AQpVfn6hTpqZ5q0IciuoO6ChYL0u0RSIxKHVn7O5VscmSKFM/In+qhQ3oCsJKuhcPKquPqx29KLV4/bunnLHrYX6yJ5U8e6CYnoUBS35+gldnBUBiFYEPLqd+Am+Lu07jybx+dfiZQmJNhtzqwOlT91dLgj28LsogjxtzVCn0XKFBBy+AkBu/hpoUoa56RFRP37l/jCj4Gicnts6VgDQGxcbyrX2kq9fntps9KFt9mY2UwnE7D2R6SGTn4uwBKh8cigjSMVDFFfLIWu25bIdgu32VQcf+3KFxO0ctz5zFAdqIYhJVHkA2XbO0+z2sTwaFZKzNxQwecyB0urnkPlf8nwp6YE4wmpvYaSEkNvamrmvdZr2I+Psm+OLU0jLfJ6jdubyGZxS/heY4r4N4PQGJngpkYWXRILqokCj5qf5Aq35OZO8qVMqd2UyXDsyWOYbE+xA7uZI2LO+iERWzR4wh7vMis0EbmbM1IHa5Y/amCL+HwytwE8og+MrNChArrmgeRIZFWEt9qANCaC9BmJZYkz0sH52coEuTxBqcrceW29XU2llL2CIb7gOwH/0pPMhVwGYmTwd21w/KFbs/hjNuX4guIFz4L8ruKuIkb1loBIL3jJMHd0luhsy0CgLYi/SuYtabPjH1MPl9iZ+NULGvZkRWWB624KM/1HLyU2ZmffJKJ3rEave/xoI9LMpOC7eAKaEqPes2c3MTib6AkNzVNHscCZto42wuU3WpdurZxKpbNb1SE2Ij61QNCPHYLm+x4Q/FWy/vlgB/4x9dWSrn9+lfBvX2Xqhy+/M5/+6OkdBZ7eFY5vnf99h77wjZYnV/+0j4eXz0MPnRGXN2w+7ZVgprf5/ThLnOeacnVRsRnbXM/+O+jj3hXliqJqA7ahlnRlwacPXgZs30kM2YH/Bkgzj34Pw1dAqwwJ19kuxyPy/U6ghvzQGhaGs+F1FpqpsunZumx/di17m+PQ4jw3785n59773xgTZgcWha3EXsBF4GbhXuNH4R8T6IQcwgHCP8Qe4iLiBRKC5CJNI50m/UUuI08jbyJfJ/8W5A3aTiFRFgcrg0+GFIa8Cd1ALQsLCxsZdoaWRFtHF9HH0m8xohnLGB+ZOuYzlpBlZCWyylg9rKWsHawLrM9sOdvHLmaf56A4bZyjXBI3wD3KI/FKeHf4tfzTAqGgW7BDGC/cKnwlEotqRLtFX8VOcaP4qviDxCaZKXku+Sotlp6W6WSTZH/Km+XPFRGKVsU/yhjlfOVeFVX1jeqKWqxeqD6lMWjWa/4P54ZPCP9Ha9LO0n6N0ESsiAyKzIvsiLwR5Y2aFHVdp9Zl6U7pefpq/VT9U0OeYYHhidFqrDDeiA6PToveaOKZtKZ9Zpb5uvmpBW1hW5IsVZZeyworydptnW7dbX0aEx4TH5MRUxHTFrMq5nKsMnZK7LLYXbHHYi/H3o99FfufTWCrte2y/RvHj0uMC8T1xS2O2xZ3M+513Id4OJ5891dmQ/xTe6f9b4fD8a1jq+Os40fHZyfLGelMcVY7ZzhPO+85/0owJxxM+CHhneucO8ndmehMPOFhe4o8cz0bPRc89zxvvaFemdfjrfX2eOd713kfJwmStEmBpNakaUmDSbuSLib9iyF/brKbf8cv5PfzPyYHQpzSnuIXPhNWC3dTHF/S1+6L9JWIX4hbxRO+burL0ic7OKGnABEsEFhAnoHbNBJFu7yuZnLja/L/yWlAwyK/umlfJB96LPTT1Z37b82xHCBYQFUSOQoHOSXztSH4wM4rh7P1VYqm46Odi03uJr4xN6ji3zdpOrRsaHmBB9woAojNH9bBRD8/Wq1VK5VapzlcRANRzLplIBE66eXw71u1zd35X/A977L927nrJNt1jLDUyH5/Rxb8kL147x3gZU+p75sNTPQYpV+V2wwV7drFWz7TigWraLzmysdYtLRdmq5iaNBN3mIUa/DCbpqtVpmBsd3I8Tgq/VqwDJeUU2AG++LV13iNvzT+u9utJ2f5AVJ6EET2Eo/Xf/R11DApPOMbPFsGoBBFx2MXWWFfE4ax12/XyDjnZv7Bww7J061OL6YMs8HZr/obqFxyHmnpIcavPpyf85zqG7SwkQGKoHTxSa8IvQgORboTpEVFCyoiz+g8Le2mhhAoaFXSwI10uGsHVBqbAUlRgUyRopjKEVShEwcdqMlBDdpet4263bB24b95JHTIl4IKYrqeI1mPUK48NrZc2Xd9SPGuKELLsA2j2Wj0eIHuEe1ezwt4vKzRIEKyruVER+OYE9Ln4RF/Yk6mBS2eLg55qVbj/ZHN9yTk3NvcVPBTHLloSqDAdUWBNMJmVoEkQDw4RY3N7f2jjQyPfCzCAXf5Ymy1ZBjVhcpgbZCMC+Kd9f+Ltyz/XjplvjUF/xvAG3pclrFONQch9tXNSze9ND2WDeNf4It/Tn4qjfMIA+XScVFYTGWA96rnog+0J29sLR+gYKLf7bZqldHRSq3V7fEVMiBX9CP2k6Dedez4dZ3rBrYds3xkZR4kIr4+0lqBNocicBU5wrHJUxKiZDKzvwpreY0Zjfw/s5ejcG3aZYy7OyNnsSzJsihIOFusVB/0jsxm1vlq9SF5yczNzlfBi1oAYwwJt96U0Dxisf0ys+jWtCDHmKj0NpnGDB7wFE0AudVAUi0x/jU/fh98/DNtrRHDYKa6Jy6IUESJGeECfe4ZIFx3ZbISnkineq2YeSxlLqLCLuJOD3oB1nHL4fB9Neq0grsNieIB1Z0O4ZpyHAJLzIJc4jIEZ7uyTNYrGB/ue7x1djK6cCSJQwfChQ7oOJIVNskJFV0PXGhm0+HkVxCW9imGiYd5SyVc4KN5KfEkGIzxVNgjtruY6+dmS8/2Zerc9bbg7YTyGrbOUwWaFXK5VeYK6NkemiG08glc3uFyg6KPlaXJkmyDEUxYjNgnkfXjLS3K+vSoxT0UMf1iVAZH4yInhL7YTH+1IlPTFuZAuZIY4g32mmlB+9Rkvnq5sb+G1eK9pPZV0MVUABGs9/Qb5kRBRmfRi3kVXCEMNog72lu/EMnJIjPvq9ciiDG/O57PkLp7uvEEUEIhBLGglS2OIRjkUWs9vat6jdz5/1teTQn4h9+EfVOiqMN757aejLFDKGOkunqZXozBInq5VbeuObTstu8rI86bvyUo0OUTiNLY0TpAzrS9gIkOCmKdHr7N789f4lPMDkF4VaK/X7/mOzH+4fKbGoh+DonVx6s/+CqiGWQx19hURhTUphTWMFDyhQLB29jCS5/cC6bzNxPQekPkPLWKBU9IAwSuBMHSlqVL7N5wcqr7UcnPUq+s8YafOTy+Dhu5bQAAEiOlmgyyLGqtr1/emTV858VZW95c9lX0q5EavHfsYSo1jGAFzoUgChA6mkBfIs3zyn355ZCHV3ipcFHoth+cWlf1Omq/PsrwxC5C7pUa+uRiy2AmdfLFY3iVslv1WSWFrenRUVSqyHAbIwOaOxLehG3VOBgkyf8J+nAicpb3C0IcBtEh414/92fKAu4JjOQxiypsPABYTTEeEnte0JaT7QTnPne87lFdT/e3ODV+IGPKP3/x8PI/X1+D90FI2Dx0bifiJlV0AUGPE6DhlwTiEgCNaHd5GfCWE1ia3/coA8wVIAPDQVMMnl78P4He569RzG3ZVVfLt3YOQR4qAkhFptRBGPAcbJlx51p/ha6aLbZ1VsiYo2et+O3ULT0WxkrSplTJFAQdBoWRkWe2R9/yKW436mD0hUW0O2WH7T77g3PjxhrAGxs3QnX269mwyQBoQBMynwh9G+RleqklT8hzUfULoIipRvFtxSYyUjfNFJ5ws+hcpvdY5CrqEdtTcmcU7QGZmIXP5TRdpBONZRsA1FjVD+xeCTeE+z5l6MfdfjJwgRVgPwM5Rt9/8h5Hp/DgCsyDI9nnTnz75N7BHkxnlAeYQaDK0Bv/iBhwBDe9TmxyEbM7FMYZOT2/qy7YHYFBLgSI7/0iSifbUEg666a//rJFnFirNcZsc7kfRV64cPn6jZs3r1/TWxRgevscw+Kwhp4xuHbtmiWT7MNCP25sXrhYr1e6W7p6cePackx6fWxW49jtV6gyRx80KRNTMzMkDtAH+hhRpkVqg3Cd2bI0GBMbl+CGuGblGex6Dofevk5mW2TGwugd+7PXBMwwKzDcW15+0YZd5fKhE60+k48/0hwZHBwqH9vLNzBBIukuvyFXaAxWi7+Jv/92br3A0XpMgD3mWGnpJVvWLF++euuuIh615zMCJqeGNfHARx/vfP0a9/Yfsq+Xw6Z9Tc1OUVaW4/iZUIVJX2VQro59bRL6rJwyQFh36WHt6j9m5XLGEZnrZm3j7e1YrUDyq9a1cyLZUUGDpEnymHPXlMSA3DmE4PMGGqe3GbT/uuufaWc5yFa3pVy9NZnUmfjYVwSqK/O0X9YMTRT84M+6XLh+hLmCM2xbB4yH/ururSX8frPcqqdnq8tT4MWMIwR9sT1f1sBo9KlqtmEkEf2SKpzjIuMA/LyRzSC4S7BehAVdMyl9TWIKnYN6tNBvd/3DfIPzyRN7QB+zGKGKb1YXUIJMNzOttruNnk0rrN+SwPbu0mI2Qdudo7RdgFPlxPINrWn2f9SpZO4N+KXiNu5Op+WK0mq8TEKK/fXkZP//xGvrxyghg5ny0KnMqIeL65/b40U06ZocN6hFXGTkyS5456brPRY6HONGtwvMPNOc6Xmn596ccKPcfZn6Ydq6LmL/1Xvk3N56gS4vNewhG/InIYRjZY/zdpN2/4edSmQaJ2M07HRqVW9CO1yHHujpgvUv+j6exRhzAi/EvDHGKqJWGaZU0OGZzpQvMdmp+e/w/4tBM2SttJwe0opCHJgyQayEJeOdXliJEoZqqL4OzrijOtVaFz4tCLHFFmUWEB9rMp5G6BXMQo9gxea+qDQBdwrgcOjDL5m1IO3+c5QXoTqc270tzIUb1gsRfLDj9yZ9GgwJDDtVL4q2rGIUNZ4KAatphtnKXkfbFF4Kd+YUNkSBoZCP2C6elBFYdP48cGZ5Pltp0H8OoqxoA6eju74E8LolGcHR+lZ2buMuzfNJsBhfrQb+dcgGUmAfAkNMnaCwijNUGAK4vqUxHuGoXCYgGsxri1L+X9cmjSSQrv5mIHTueoNEpP0mfKng3FOYJxO/xQvgbou7HJpJbOfdnXdvAXXdmKAXzb4Q+FluNCRgeC8IYmoAeApTgL4IKoCTLYQhm4TCLBRA4YlEP4k4A8meXr1N1KnPpYiRnhBVfz5aIEOsWb0AYdP2udK+F5XZ6U2rde06mLURuewllYQeHcfXdotx432eGTxgOhkMtGP512B/rm+fWvsTm4OcU/Pgzwxoeaud8sBvzFmZtUcQXMukeVBaYr8+eEi/uS/8qNmG2EBSpkQbwzNtG4IzsNrhgOikCcNkmOqt/fqGW5II//DQRMTBrpeevY7xcGbLTN9Um8o2N4KQK1Amkc+/z+JSk5TtSE0JgEbEmIUzWEWkCnGdG6TVJO5e/xI/ihuSpkncoF8vTc+NmfagHXO4mkIqUc1paZi2h6D6Z/6qPXAvhNbdKoiYyCO5tSfxApZU0wmZsINzoWjEk2VjPzcUdM3idhkXcxLPkHjMGHIDmGK2uFSNFtnzPCcIKZjp4fga3VW2UliKZATZMwHAzhRUMk1i5syBbQYtSdlTolq6MRAIwWvQ1N9pQKNXVVlK3gV2HDMPdwaLTyRfS5k4AXcj0cnfUHt15Sr5LVABoiDjErixMOod4vYcprkouOUQAPljyga9PvnBYoeDJoyixiEQJVrC4u7aJlvdURYeWyIn48z4WOBN3dn/enPXtB+chsi177KamWAG27gK0dfC+eiRckPrjCbU3jFuYOOjFvuXN3uU12RRJh1hckPVs+3maVCrh62feP4cCFE4qLGn4+nCYrndanVuLtdYKuX/I+0XHpP54OGodVGCi63mMwhB+zkJJoPtF6/eefrsxa9//z/Mqh0HV3r7cD/fO711zZptZx8+mxIMYapFIkWUwWRNSE7GVtaDBnPlbAfBt6AXWZaZWTrRMdSWE52kg8G4z6k6CLX/ytUfHj19/vK3P/5+h9966vT312/+ePfhT8+efzm86/Nvr3/56cmDuzcvXzoGjvX24W9cOblv58493525eqP33Wd679Hz12/040QSbazTGaeTiSapf/6cJxGLpTKpVC5XKL9EFgOLweIJeDweh8XemC/1LYvNotNo1BAKxQq0SIeSWWRxoy75Ss36C80zx3yLfli4yIDF2kCjLsjkn20vPYeGrWMe02j307FU33G0xDkQfgAN0oZNv/9qe30h+GUHO/0zX4Nh+7rwXOr502GYfxLx35+fqs83omt3Gfy5rykERfO3IhKGTQvBMNyrKy+vD5jAnGO1jgQ2/Hx2641TGXBjfjQcc2gxeiuf4hwHKufVw/6y/hflqqm4vjgO4c4agfHywANJm/4Jj838J91byR38nSV3w/hhI7KmrXRryYQgI8SCwzDg3yzxlxj/e0Lo05cQ/9UUKb4Z/QOH2ehP8pfL7yXz8y0XkJsNyrRGxK28foiHvhlNhg0zg5H5zzCKx6uon3jO5waUUu1qUfvY8qSUARelpFIGmjZwLiV+m/8nqnW+liKVEGYxe0zpFDLdX+Jj1dQVy3he0TUs4DA2PrFo8qOTqJwXNGKJ0oB2W3JTiSaBcxUoTGVdJeFsudrnyLMQmBJu+AeFUH7UpMivqiODx5ZG/87z36lDpPx9owALW0OuWnBHYb7ps4scI3+giBfBu4AGyS6EqRuTgNe9GH7ohSnCGsa1CIKqyI6QdvACT+8k/jMYrQpJbAbHNY3TYprM6JrcRT8dpwdK/defXiTeZSqBfsGs3OGFkRTCvTAbKSqgagMkWE9mfuuPcgWpFkXPIRssi1E0iVPFJOt8h6hKulJA8uEFogZq47qBRCXasMnEC4Pam+WfMZoZTkxz1sgzqO+5pkQvchu6r+Q3iMcxC7Rgi6kSCCUFY2O8K6nSDquRFARSd4ygVXViYKLXsX1ozihlPOp0yPrBYKK5990a30jBlKN9Lk9uhqv+zH+zRMFssx+VOWL7O3sId7bBJfl99i8jNzBrGx+4O240qb9rrdltrpg6W28O3qK6+7v/2nt3mEwyPSGcW3ltZ/jHMc97BYnYj42J/g7dYn+XNnUw8+yVunmwXJrmfSl4lEJP8zHgk3K4zc/59/5sg9J3PMOaqrf8Gtgm87M8sP+MYfc2fqD/mkNeGnCUq0GtgHJKUV0cJV6hbfGkqt4u2shhQmstjuZS6oLbaeg4DdNiSos08mmUFqOju+DvvHMzidmwgzoMl20lOO2RXjR/TH2exySM5AgJo6xS6zyveTDXdOnEwQjBrZ1mHpo2KMpV1IKaoZ3cIoQfuo9Fa96J5tc5uVwbDMpEuLAFhhDUk943wKDHVRoUxUpRqRo0ZkgqwLbE7uQGwfmBqEkaCwfHW50DUGqOTZyLyGXWEPzeVaa35orFhvg9DjyfGu0ny12S3j7oHPQ/Prho93ER677+eiKiW8l6F8w4vqFmsLBXoiPwkHTetUJoseyb3yq8qXpqn7GGL3u4O2S2xnq5QSjWuQgrSxYtm+bScjYej732M9ndl0GgTRKysNfy1zdBKWd2RCk2xru8royaNhQlRbnJdkeMTq0eNxzTWu73RMrEXKZRTmeEUNA0ibE89mKVSmuIifPkFAHfyEZhM6l20wlwZGHnXfEdh/7X1qZdzWNJZFs6ivb81kcEsWeZ1tFgSym87zelBstyRWYGHHAaMiEvKriXyx8e5tflS/3xs8Xiwy0XzVCuuA44bazvDx2pvtfqJQaUMEy17uMJtYuYcIhtr2XyzKi9OFpJfZ3cbdpxI4Nk7+JxFWbnpmtOSBPha5KMQWR2xS4zOjNeVl1NPQocBSkYxozFEQDf1/RwVlad0Zujs+U6zmK0Nu2k3ZUANaRCWug8skeahrxUoNAqFM40sWybz/8l8SzOxqnvr8VtcQrIYBwG9Nn2PKWyCetmU/DY7KSb9aIasye64YhB8rJPXmiyaS+ffka3bW+apOXsCo1FKlLkcG+gZ0KgA4sAwTYgYMgRymUW64n2J+DaY6NVZjBoGWekwwSYeORXOCUJRkKEVplZu6r/damUzx2rweDfkqkDOLjpyC/JmX8YMlxPorBdlBTTO0x8WphVqxxvxQUHsJdTZwgZkFc4yhj6mrJAMCq047yaXuIc7F9W0gljPqAEIrezglcoUFLAwMkAV5T2XVpTdKraMBf81BXm+EypdbLlfAbJOsxaZrlGHe2dUetX06/gvuOu8l2KUYaSmW9YD/ftZr26ueQy58UtFbsYwxhiaafcoTEuTPc+XV3KQQSdMGaWtE5aDoi4nGNUQaLpww2eZen/bdi4ectzxnbh7NHKPSfCMNi+0VZCw3a7Vvz/cXXtMviYMTsG4jhCktKqpuiwPQoZiUOYWIBYMwLVJtaBt1s1adJZnW2kDpvdbKNWQObPsI2JViBoqBwmlBPSJEmw3Kqz42Rc+f6V0K+HIYqIGY7BdWfcyUo9cYExZrMJozmT4gdWPLAcjfsiEARAaEGlde06RhlB4lUBGV3LFPBYd6X7ONE1WYcUyCh6m6G7CYaVhizGr+Zu7SILF23ouP9Fqz58depFq/9uRKT/gY+t9Nt0kSRf/lJtiujlaX5EMsZkI/30jbB/gaaOBcuvzxQpBg/loyK0rPF391QT2Q3TCdJieshAvWIUW1CtHQJVYdKlDnkonIwY6SkU6v+MNem9W/zt5Jyz+VvaB5g7m1oTAGBcJiAPyicjw/061Jx75UWy3EvIOJqMafSP+uXEDS3ih1LSJdnYAWq5bce9q0VM/hMxxJ/lOx7nJosrjDyTnK+7NVXVW2k20DcfqiFHPyzXE6X5wKNObXdAww2a1wfQ9Es1opcAJUAwYMB6epMCAAms9pZtdVuHmauN2tn/X3yH3AZS3ROFvD3LgQUBIRVKiagxmw6Hy9uimGXEb9zUkIk6H3JJ+Hzc5UYZJRuBQCVhLWPTg82wrbh2BTFaJQhePZV+ErIjG47rJtUbmWyhpEkITZql0F3YPTm93zKdaVASKQ8idDiQTn96kd6XJtP0bLO6U5rogn87U1bcd905TbV0yYCGSLZwL1CpEk5NQ0lXuTXZhKTcqwhGRNjM90mKj0D9kmIAXk+HolmTQtWSSAyn/XzCuJSulaYuZkXktOP5Mqu5zufzCs/yihBLKyWOYqna7u2ciULTyQBXHEl9k5pVdG5Tbdqwq2tO8tAlXv6pbDiGFhAZYNLiebLTJICGwq2TuM8pI4Rr7jTU8Tcrgtt5pcryJKmkZPrMW4X1CTaNoj8vAXRNsd2yYCGS/RL6BbSl1atkG/ebBcubey7cvTUkYwJoDzOvvpVPFcsN7cJGa+Ar9I1IzqSL1SJxYy8ynGR1y4UsiBoKIRlQmVRhJh8MaMJdPCOONZfDwDvQXPlSZ7r4DqR7XHEj/zNBLdpeMh4giRifDRdBKikPeF2IvI+bVZAH0T0/EH43fxMkAFUrZQGXKRL5G7kx+qPVKj5mLfpW3fkmDFp0K/u8UnIAtyhfku876Xzr4kbHPNwhFYM3u0kADNuys8elKedv70E++Nh8St5DKQI1i0iQ3AsgIlI/ypUvfekcI0K478DF3DuQjqX0s3wVkNsAIGaF614la0eF7Q61KBuFdeBk30vCnhwBVdt8saaCQP3VuqwGQMLkByJoRKJWx5aL8chVj2NeLR+g2S0SRp70b4NV6es+DmeM9dj/wjUS16L6KZoFbwfT+CvrSRy67wFCOiw7NN7rvCctUAz1LJ3Dm+l0sUMxmq2pZl8IKXmwq8IjkcahI5LdPkwhGxb+XA7g3/xde570uOx39rOoh4lyY/l4Vm3sIMdK6+0HMLAU+sKqWt7OF7TJeDydv3hOwzTYAGuvNPeufJrL5ivdsbP7wwwnzkaHpabXHsxomP06mfTEzF7Wm4ztlDySyfJjeTvWoBwjS9MpNDuA+K1A1Pp901td5+H+SoUnZg0/PZakf9n9OZH1EDpBjev6dwxjVE1kOIJhMLWJekM2B48zqf0V81MQtnVnuL6aVgqqqkTLSKMIhU0u2kQH0avHaBU1/LwEoILDEAwrpcByDjEsKQ+Yj91ZQFhVCe1culWuLcBpp1U5FMj8zqwXSZCx3vp2AZWGrYVipsaF2k430QISW1GxSmHdBWhPb7UK2ZBp2laNFkzXN9ZPpsCNhYDUypnhgIDWnAd+K+EdzvbVE9EnAMDuy6oQ0cmZtd+vFem6az9Ko/JEbJ2Kl+qc4IEREwzxvVaW4JV0XHbQhHTMCebo5IpaenUyZdUtJykFrXxaYuJqDxbj4TeVIn6GN/nlnOMOCa5Duiv+R9XhEOPX5camctBwIwMkQEYn3Yw+/qtC32KciGQ/9lM0ZtrX1oOwU7FV6JSlHIQG6Oxk9Q4HBI0EQTN1S9cb9TrG8RSGtzAM9WIyzpTWBBcy8g4/tqYzop7MllcEuV4XArEjYIoUgrlOzXVWiUVhGJdvDuvCd+bkyq03tkWR0byhwEbUXveqoM/3aqb1b7jk+mvjKAHKnDpqYsgGHJ7d+Y49j1/JndUJnozp/GV430r8vKkjFtcoGeqF2hlnZxCEYbo0nFlYau1kjV2PVoxOrZ+fFVBl2pUGRIPn8PnJDasRKEONZnBm3KQmfiSqIoXXpV5WY5Cd2WB540uNB8NzAySvsVpYgASVeQZClbBQzg4dbYf8WiuD59rHiyXnPWA9ylxNl3IgX6q0T/JbR1u23+9/4cXBEPjjzRTC/luSAyvgKTOaUaGLOg5Cq0jTjs+NOVsr/tzr+KW5qLXJ1mdEOW5JosOHaZ7nuMArNmE/Fc0YrW8nobJR+6RMSM8oGcZDDEZr71y1gfm4kzRnna5h0mnl1WlVFc6VK7l8ZmDsnzu8ejaXLn4FB+0YUVWmv91oXZ1Agn1GuSm7+BSphL4B3HHQDbm2eqcaOTmNq4yjE/PpldNERZEKbVIct1TcEVAaI3TXTedXZPdzMgfJTNsTTQjV2H1amySvswrVduEJjqMFxgJZ7UQHGHBOqkGBVMYTYYAhSZV28hcIb0ix49ABrpTr45KxnvDl/pNJFOXG1dzuZJsVBQC2ga43jWUNz5x29U9nNkRC0mM5nRa7ZXPbIRauFyYEG1+G/BC2MTpSK+lM15A42/dsbbkzBBWEqxgp30ofXGn3z6U/Q+1zV9tdHQv6ciq47klAfilGJfMgfeA8YAnv5DL5CqX4Yn1dryKZxBoyphVhdYwu71HHaI0KZsB0Yf2taAYUSuizg/j02CXKnEW4gKVHpTXhAYnzVOWq3u9xWKZ/Nw8vVHDvagMt7Lfici9d7oArjOVzSgSXWnMM1xoVtUi4s+6cYZpQE1iMAca4ZNITxZgfWiPFzT2+V9W5DjXNiVxCBvmVEGK5klJdMke5qZAdib0WT3fRJ1NU10wjXt3VReEs9trO9BoZx+PAcooNP8XlZQwOSMSW5Nw0GeWcEeK2DhKjWrxCY00WRNUaJYKiEAK9l85ap9Y59xYoZyJdY3jdkKkucVJCAKrdQmGStKSkHilMxHFaN2tWVNjj1kpuVlu2sKNgNmZEvlM7aAEEGSWKU9xXMRUSrE+0haRnvCOUpyaz0CKPWNDueFMU0/vFGakJaN/Bou2wcjaLPLNG94viuBAZs+BOzi72bFdi8eTi5HoFqGJqZ5SW40gdyCxilBAsctkzjoFUGlfoMzmSMc2q4hbB2dQA9HiIDoXNYaeJuaNqjfUySZb1dIGMw0iAImA8wlvP3N4i6zOl9/6x4rqTjcd9968JiGDtcX+h/J7+ixd92/rVn2sFsAd9jDkOcdve4gWBjcV//qLpeyLYEgYDGIMjD+aQ/8PnajijJVrN/UXlaI3sggGfYmhapuSv0MMDRZSlUZ80KKRY9OrUityM2XgZ20xX/738O6FASJT9VBhtbhEANcXxi+3FeyaEGGvNxAgW3UG0Q8GTl9T+qdvY9F323xC1mTokv0nMWQPArntwdCjyWpvQ75TmbAlLaDirtyg9vA3U4XwM0cIwMfcNnsBzlAH6NAc+LQp0UoeUcYumU7BooJUL7ZH+NZjo96mF0jlouMHLAAhBapPxlv5DiuEEUZShba/8dxuuKsjvZLPFarVcyBc/oJbiLm8SxUmWl0VG/G5G9Ut04ac86RTLfi7B0os20AOg6v+zfov8o26XVnSoO33h/6Xe6J3NHhbqPdL8Zt8voshRBNGpVeoH4F9WkDNd9fL5YhfGmZzAtVo+j4qR6ssX4uH6OhNQlfiBvnxx//FwFsrpSQvZcoPCYcpS3S7m4+cvXjMw2QyzjHTU4nW5W7dbjXqzViyUu2B3ZE4xDE9cGqatn1DG80p1+GIRHnfYpMjzuf6z14twb/ng3SMnjx8/sOdEc2hrwxJ+eP3/4+qeW2lgVLnP/QstkX+0eyXyt3YhaZi38e8mEAc/ab3enVX3oFNEaV2B4Gn7dfXEGP6nzlpqfWDHYVD7w1abFGRFNRwPJv9dqTQmqqCMCQn/LOIdYO8qX7ar+VyuUG11eynyTDIH1kSLbadiWhWa6PNdR2Hg++EnwnWI301J434IMgWemmZsVvoawXAqiNJRrcuIfQ+BSanJcgAu8B0JC82VWTgf1ss07YT/xtPjq89EpiiuKkUCfsg8Ei66O3BNfEtZ1v54ktCW2IOPRArpONy/PdO021y7FRJVZbl6zDrBgNXBzzP+9fOPteUXzyDa2/oSyh8GF393KK3Lh8nyuK3WCYVh9BFr+WF66lT1Qp00QwzHsiCpHnkMD9bP5GtyRJ5Sjfaugk/YMsuLVkFlVUIeqyrjuB0uJd/bq45iN/YqU2QYSLeorRwMbSKf/0FquWqv5zeWQTpwRJ7Dk9SFfKskN0bHIgOvwDwPXryw4wk+pTQSZUL9/tZ5BgWLMXPaYVgwbTSbPsVwBgaGn30hSsp4IAJQNVnzoD9VXsf/8z+1PLT3TUeHXr/+Q965zn1gnqdslNpaoBoaJmt+VvL+PjyX7/WGlc59sUQGy7HV0dG1hodrNQrFam27quA7J4WTlGDpeHgWzy93iL2eK50/Eugh8XbDKhj+Krs7jGCtm3I3OMasnWRSs2fOT/nm1ezf1x3ctHHNstLG0s39F7jM8I1Zdp7hbLEdqhQX0c9Av2m+Md8Kq9Mu6/GLaBd+wFjldomFZwXswUZGE242W7dbIoVcbz4QavOTPy2MhEts4aNz1gr2viDLLs9jF+ayjZJR9JLHySiLOnikhG9s48YxL8xsDLwc8xg5oKLLahrWwPcP+xjl6EOfQgr5uxUPAedwgjI2cer8BdYrisd/jun50obqbVsf6aNgTce+P7bKA70WMT6gvuMDwbZ0gtQcUBuscm6Xc+7Gbr7XmWvy5Jdo691pI5KXH7MuLFVshihYCm/lg91K7VukRABgYglbCKmhGrMW87hJ8NhzOacliSi+o0cHWtT5TIVDc1sFdEFXuDgayFbQ0HUaCJ3ukJVcwkw5fm7YDVUYoLEvqxXXkUcr0qzMf4bmidOggIK5OKt8pYVI67wgj0EZUVnAeyKRzhNRRk85SOwg7DfRy5MZ2Y4rK1poKrIoGfCqKHTnbUSJW6OpxP+mgqmau9SrxTqchOKgfy/me3GFTt2OShIBImYuQmyYBYynDBX0+WxqOIWQvSCBYh9Lo9ep0UD1mkEYtktijfZSOmM5wAEOWzsJRrCKVqZhKd0K6VQywSX2LB7YJJjA2549W2+GbUr8uDFnKqmerUpIiNp6S8jzVHXtlNChU5IUsdccGACcMZvFR4MeNs5lk52j9rRjcr/kOB27Oe0qkZGv3C1nn6ww5+b9e8a3wnBMX2zn/om+oIBJxgQMgL463/NYjwAAGJ1vYf12MXVmRqMASxuHvxWQ1AXyHeY8CzPJvf5Ixzjqix6oqAYFJrNNYoU3YVCExeq6eLAteiHA/gZMzOgDIF6lz/LrnGP5Ce5G56PRHnOXQBgJm4sqDErs7ab+79bV68WdkdLuleK9u42tvPheShZMdsvrvFKqOxf8rc9UdxaNx4I8KHbjKrAn0p1LZ8huZ39cGkv8azRKrHZ5V7Qto/fn9r2DGMBGLQncVWXFHsbu6qQiNqz3Af+V3nRcmuFlVaNe/pDJvDfZCIcqZCjCQ0FbtaNEf8sEZuk5O7tWaqmoZGWpbsxrNShEM4HrNQRFJvLCFCm9PjSnTrTBIzUMAbwmXrpIOq7bjqvKdIB6aA2nhVQG8jy9Hx68aUawcomedi9cQ8gA2av8Q/5FHkOlJEKlV1MTpRXIMxYrGINQbxTEuHEjkslDpE+n5WQWhlRNyhP1TY8HLnGh/z/vPC/T9tlGXcvnzO6hnFhVucYgCUIvyUgDOYujG6Va3JbW6w07nVaDh0JsJkH/Omf32mIu30wZ6SKRlQLFUM6ahnplw69ELiPFMWPEREoMYCRq1KJ2qlxg1PPDlWb/bGYqCxhk5NeuKOY3OWii/LLxURySWC1ZPdYh/M9rmN6NyTa8ZflBoCscC0gc+KlCEaIWhawEs6tkszkc8vpCAeoZkxMoVAFExWqVmWaDel3bcUzzNcEBqZAZeELIMP13696gObP4dCxim6w/Kx1uuQDvZ0u47lEbScEE+jdbat7tFIRaBjh5qqwT8Y2edmf933AgHzYnkgzSt2Qkk6eErmlahqxYumnwoh0A6DezDlNDz9efbmnqqzAlxGUKvQWdlEnX0yow7di68HZh3YQer8ZM4KjBNTS4wxwwTVsHcMUJuXwVDw62sn+NnmMN1Qy4mJCz5RXkZy+2s397ZwXJcIQyLVbG9ZKEmj6Tzwzw9U9hkxaYlD3ZBXLQqgcVaq+H/v6jgMw6Rh9kTLFV0vWz+4OBL4/jfL4hSKWpxGf3VKFiJLA0FWl2WExn3iSXDHma8FxaaReCua3rQuGQF8lGz0akdZxjJF7l2tSikRaEgXC6KgDkRC6BQWnSWc85Ga4LZPXgyf1NAzdQvhnNluv1VriRm1QtF4s2x4GkRt4+9PvFYq2jy9rvvmTT0VIlk8slIYE1tQ1ZtqApHJmACaNevd9GghhFMS0MJ2LCuGM2dO3y7yv02fxQRaXLzQNHUo0OqarH9AhhjDw5/kpcRO+0+SCaD0XtcK0oy7MZeyqFTV5sIbPP+YML0bgQMerGUXhYot1Ouc3S3khmqRBtWBqPoEXtaDRxpsWnnp7yQKS2U7JIAEpBpiqtRBMnApQFTBcfogicloX7htUrugyPucm+hBQyG9maJrmhj+Ymd/iQ3KcIQfwSxuhrDfAUo+xeISQcbBcv4F2UryVnpY0Z1AsY2K0LvczEVEKYnoEBEIICOtvA+8A/NVNrTjstsRwy60qEj8nJQZIGUJbErknnDTwXbixPb9W6OlZLpNc34ZAZZJNFE+yMd3tpWhnWB6xiGqIuVRVHKK2JDiCyoMzFgiJmF7eSDjldF2NowqC7a9LyY3rLkScrzNF5/8T5dRji7njpyqmLpPsO0Ju08BwxgRQTpFPn7vQGmnHQ4w91STZIejRZLS7e1QTkw6dI241m/1J8I+me6GpvYXonUx2hCtilYxcKZzaZIquV/n5xNPGPUUu+0uEc0TJ17I9tewb/hED3t7n8XNrfz37G6R1v3zXzEZr9SYzSs4foiLB58U/yFzLO55yhyrTtQD4+BAc7/h9Dvhc1J7/j2mn+zOBIrTM+PpVZ1DL4U4vj8okBuq+qkc/rkRWLS69zy67cdZmBeTX/YrHT8ZMO8gOncK1Lz5YvmZPJS1cjVkBspH9ebfwPU/bhhd51RtZ9rn8ZqcGOvw3k2y8Au2nH9VEJFeWhi2rt8I//HzpUvUX1aAmK6cbSsRLZrRH2/8NOpSgPcj+cx3JUWezQzUL/RqezHzhOUM7m1Z0Sf1xcrwnJmKnwHOJVK8yLizsLQD5IlNbNLDkW/0OxU9xr2vHCl34UIXkFjQG/S5GkXKXJiYR88A7peJYg4LQ0pDkqdY0KrKgzy0N7h5R5+f2f9FYweZESh7//e5Y/Arrfd9I6qSU/xa2wx3OdxWedNuu5GqP2XY6ktFsd0pCraFR3s+LsLkF+MEXkiNts6n/UL0lh9/I1GmVRT+EKklorgTkjfOrSFYRSZxuZvx8fEyzQYRvK7zIbgwkTynzBqFmjWzj5RtuTzcmgXaECiPmsrb051rPs0cZ+EBaNLqpGHkw3kdBKDzMh7K7MriZTV8NQg0kNOobjTLQl+rxabSISvselNKphCEktn+4AgAymLu5Do+VOwbasUb1iwrWNk1ClwMZDGU+Z9nxc5p9NtrydiOqIe15vlgKyj4IJQHST7clWt9nWZxhvqqFYQoFFL44PBLCNxguw0TZkddbvVqaoRBkVCiyq22prraQwhSy/l7bGGjVWEBnPcQyln2mL3MSiElbhbDIsCrzVKrdizEbK9dRfS+QOH/Kjp5jwWLofUKFd368NaPoBwEgY6U6SAm7kByYFvqGYSfBxjR/4YBaRSF6vtEkfMamEkEx5a7SnuGgkVOgsbvAOyIxsqF2yj7CJVchQglWy06irsD7GhQti3hYHc5d7PztyxsnQgu3dtPR9z4Y6UyWRZ0kT6Y6TVevK5WKxoSgSx5gLZkBu0Roq5foup4QgsFZKWzCedvY7ZHf4VEEqTDkHzOhUpQl9PgiKpQg9WrC8JE8kl5ZybEY0WwJRurTeG2ulOIZ1xD8vtxjc369TPfAuG5fOTtbiPNJ64BPsfD5fre4KXI9TsDVQyVgoCBTmzYgw8P2++6/JQiK4lTARgv7QZD3emI2onuFrZCQ4X8IZ1XJHHEcWqBuw6CzXqO91pCC4qOxB4bV0UgEMZBA9R9VpR1TWnUDhGQwvtZ07a1nMLxY3OSdSTH0KH+XVQQQueubEesYmVNvYbTQ+hJy8B7IH/UxbY7pWtXqGBJ/g3zhj2bbri2LWiiia7vQchT4vYUcadxTbgVvbOOjlIQMIRi9Po8SZV7RxMkAyS2yXK44T6eYhseebtm87YR64+VJPTQ0DgmGhHTK4ImgvLshcqeZJUy4wxkzxmOPchjAS+imY90GTLWm8pfpkJpu13hFGaED1FtbWeyvr3rzG8xf2QB+8I9wuyhITAIwBiHQdfGc6nk7XzRIlgYAqWx8ESHNRsFjHliXlPCcgh/2O05mrt8bisVBcScUok4zxdofvJAMMU5faXG2I4xa8ydq3vMrEAtg6j7wTMazcCcxki8FLBNBoRSWwqFJEoKYBzXxFr8SX19ixA3WTqtA1O8Z2CIXQlByrgOpOL7WnBggMUhZTLQkIjb7GVhuw4FGCHFEmGbO2iUUR2KQv4kRO9rBW/01ZgZ6h+wdo2ChLCVyXLvVI0qLt6RaWE327wJLAAS8sDpVmaKV6ZYDRk3Vfx5HHrSVwFckcM+p0VjJ0WVNFRlappljTSmar9WcJhCZAKw+lhJlwrA39pUfXIjaB+A1aG3I6/58yINh6HwOwPjQOf9lKb1Nqc2qruj9C5G2OWhX+5pZ6v+ErY9L/s6U9wADhvmth/3ndX05+9MtnX0coAvgZRsMMIXLdoRWHJVi7DUOSHbzTNmCMDWBsDXMpNq+cjdkjU6c7CU9XgQlMJYHOS4kb0sldys3QSPneQAuR29nASu8vByu0e4Mh6+u6puocJ0wQq7PJUwG+iYzLYSkUgAIja0aZxmQqMFLJU5kC9mAeY+vI93aF+VvV83Z2ZJ56PF5AHtSs1DhGFs+lvN0+wMyRz+S7a1oTie5RfIStzRbz1fk6Yimzp4vdwwjS7hrGU+brreevn02rmcmg9ToFUz27uiM7rJdemrv9oPuI9k0l2AgHnTUrB4Okp1k+As3oKF+qkRxY3hwN+VKyBA+PnCM6ynv70wHmNWAIJj36ddniHRTU4K3nl4HHzyAgPBXArSdDQVimb0XMugZQ3CrmK4j592sgEWo700hoEQSb6vPfxQ6ChDHeWCF9/mc952wkIFMhu0ev3swnKLr6Vynus3vnViH8D1FQgEwxGFpiF0V9+LJ7nfvPu8MJwisJUeUWZvZt35CUOdE/te42b/DUnwG+IFhJnnMJw/+gOCzq2Xcagrj36QtKrO4SOxm/DzpK2HrBsPPiav1nwaE0N29HcCQ1fx/b1O9WAAa+Q0agNnhPruh50Qt44RQoY+E2AreB5XbJBBrQFnSa4Mfqcs2IuEEdXDvA13by2JwyfF5fMEn7FPF6ObG+RNaRQi2p80GZBBPGhaSdpVt4/u/jR+mRH33kDrAzw9qyih/+zerVWiPeb/EbTaiywKN+qfCSOZ9sWMO19FToUCkEm8qQkYKeeUQ0RTARXBrn1nLhzhzCNK5XL2+iWOWjOFI0/aEkK4y+AVWo65woJqmGZTf1vvrgBfA1m3ZjBlHrrCKC5IUlK1ICTNZpwBiF+kbAXdj3QPVMOC6YauZq1R+iVdJFssZqI2+zdr06Mmyq9G6SFtjykr7/6sG4Kg3hWL3TvT+m6dbPOIm8j4XkBONFrRuKmkyDv3KqUug11BOXlEJon89BGbNn79/Sjs4o8FiVgokcTeDkJGNVJylNo1xpZzs8m+TYa7tvKqqDq+/r223wNWNTqa5xIk7QVzHsVaslbhhRJnztR6pCFhNa4mreLA6VdeBeBPdMbkATdGfPtLoLDxM75/Cjm3H1GfhJEy2N4C8BvGItDAC/HmoXUl20VEK7/5dzXDqhSrw6wEmExAQDJiBPtMSJ5Brtuev6MqmXdBQ2QFkBhUQqxfw6zn44FQZXoXnt+1ZZx0wkc+ItUS1iuvV235oIjapAC96WGVyp1r4VWRmGlWi6GHsiteFROerbrSDxLWjU5QNcN/Z+v/FqeNuFPTHGVnMnqhtPPpHkG8+9BFVGxa7wgfYwLYWImP7obgUccCvtIgvKhT3WpPXj7Wqa5tdwRcHJVitShUGWj5J4CFKFcMJDkKXC0pD+mA8wVpRBBjggy0fc/Lu/wCBbPhi3tb4MsDHBceh+mqc2kiPAS+PlFgBsL1YBTi4/7CUPugiWKwESvgYIzDTS0kz8Uoo1998tW2Lz0xZ+pdGABGQBuSiQgQTtmcH1lsIZLphmVLOg15MKEGKk/qcVVxxkgzN+GEWEfgAEsbkyvnIAa2zKbEyNZbJXul7/vmQakpijdcUuKAMMZuq4R52qsiFneGBdhL7Ngtpb3kHscbbiEqGYHDrfApAOKUxEbEKQPyz4hwuiR8OoAKXoE41Rb+R+H6r1Jg6udG4zTDd3pTuM2KsPwTFWMBdjeo1RVJlUgh3PNHq2ZZWgc6LzJwSEfsNwGJGsk40Nx+gTjGHlRJr2eMKpS7quyFoUWYq4L12muuhzlrbe8SH1DzZ+wkpjtZwXUQqwpVmxMy7AAJQL6rREEflgup7dGfWy8tFDh46W30yhfl4YCjhSVcPASqWWYBpD4nLDoMRa1slBndQUXOjvzAn2wygx5BrjYMk6M3+syX1wPwxJzI1aSKlcL0aI4/16xFMUy9L1Os5y7LDAQc+39tywY79m0h9MTAkV32ixce6gQKNAwbaSjpKGjFU1AMIhiM0fu//v8eoh7cLffzYf3hIZRR0OZg9QyuSbzqTUPnmQ/mawTJ7bTI0WzbcEfp7MfAiv7f+ustH1c0+Rn5LRJ+a5l7Fxqv5wez42qktLsIY+avincAz0oMs5Qh4DjSEhkHd0rlWtuu6fcd6tu+B7kJ8pkjPRK+w1BN0jYLbZ1qIyfszFFIU9mRx4D9u6NhkpvqDTNtrq7tnwKStflGxnr8xdG2Df0ErKfhDdrE8OsE3b3Kk6L+a6BGLRsJJygPH03/zndaly22TbSIZLzvZ6ywY0ew/3LrVJsh4usaIDgi+HuiNGNEzzS6UNg66jd5yY10eTUNMWiwOMg5OCIBGELOnvRT6c4Mv0wHPbNnX9Uvt9dZwEBxd/JOF37ERsVJbN3KujKzk/QQ6M/2V6/uduo95qt5Nwv5vZhQx0Cb+6GDj8vhmVU53XDg5TY+6Ay9KhBdT7A4erYYNg4NXFmq/2fFTW9aK+t3+6k4e8Xn/RMm+Si+CX4PH5IWDEauZCMPLpMPrLspfe3/tyff3NnTNX6brnbxydTJ8cyPlHky3PgW6o7tBP+0CAkO4W2QVglq0UCZ4KEfNEulKm198J6TVbgAQYF4oqvbx2exTix49Xjp469bySTlW/NqAmBrGPhHX8PH1mBGntxsV+vyxFYIzVJIzu5CnDl14K0fS6ZsEIg2VXEs+NBDGfHlCACo/AERc/5JuD5OvEp23+KkUu7dqGocchjYboY+nvUo3GDfMsMtLrlyReE7RFg+PWIinoAFMRWZ+FrTIek5Ympp10gkewnayjBalrjVWiuXVpTh6PbaVxQMN4zo6uVYfDDROabjyulJwkjs09rFKHoMCWNrpl+WkCEwIINqkGCoz7OQwzkp3HidnCxTSWotrWBwE0dzcPPvAYXqgYq6uAMKGsGVqG6JBgXMmOeZtu+W5aDNTfs4JuerTdjqTNqMqs8wjAyORmu58eArI+t0GyArNb47W+a0WKmm0bssMjsy+o0HYUaUEtSTzfD33dGA2TSEJcDG0YzEU3yHw4aILqpp8firFIFPjN3J35FBMCd52Z4VQSd2B4CygZDFpbOv2VSpSfaXZLknN/8L/A7uu0KSKYBwuutvUjnmHGmTvrURoqimHrJcHcqVNiqF494mgNd6adWR1CQ+WZHsW9YEGFCyWlXrA6DDFzuW5Zmf5NTFXtvo3B9vNhPwxHmzvtKA0O2f77d8r51tjOQQSjoG0ZDRMxLp1YqC0e4jbtSM6I0QRCxOSgsn82QN96fDC1j/avqSOGICQaQMysmAUd3mEeiTChdBv6uh/A+OZ4aK5dm45fpoDRsDVml/t31e6lXFr8FX9xvcGguhXmvSlu0wuwWK2Km+1OpyfFrhb1YTbb81xdH4ijfomK3e/9U9cIyMNmTXN3ojumpID+ZawpGgwGYtb/0KRU8qAppkwHhMmCsNDpgsuiYtgRgyYIksaZUs7JLTEHI5HJUCIPIA2FbKNZxrItwqtlP560Xr5+7kO47dOeHVS95/rLwzlioXS24fVzf0vvxTr8WZDtyJAwmcqeXdNI+Eiqt6cWlceLji4f4feDPCkaDZ2PX+FJP4cslHmcxztasN1rhZhoH/M3+GYaHWRAhuOOk7ceVmBVIlpg11OM1l2n7xm5/HG1Xc7wfLPpvWmAgSoN6h0XYonW4jwlf9BrpXcbE2gbTSkbrkzTQ+EVc9SDlOcBgJ0sCtrsgfh0FPbQ6hYx90MvX8yt0ajR8H6FoB6NZbLrHcCE1UMXgWNxWWRZWUY2AgsSytgB7HqZXDRrgIQb8wqAEXcf/KVfqi5Ez1k+9/8Mwmp33LnfX4bLnQ8BzPTVKGp9pKfy9fQQKR5nYOagIzpMbp9H+ws80n3XCb28Ju79uLESNZ72k42OtDIG29TaM3Byf9U9ifdn4E6fLveXB53luV3BHmLE6rdhe3FqTDT06C9/tBswCVPD8BzBF4xJ97vuFuFq54MjV/7CpzzYX2i2sfk0/+08Xm7hOAyi9useMpeGy1vbw+sQcj9nNF9fAWGH4BaohBqC9oTO32IwBrYJ9P3+4Y/wk33pCK/qKzDvAEYs7M+Av2Z70/5SvEBDqO+jEFDtX+Xrx98++/GX6AR7ZiPWqb8AtQR08wcdzMBJ6mdjIJLvy+2T4XryOVcYrILG952LbimGZT5f4Jv6HBWhK3C7JpCSeI2gZ1GKyeOr9DgIh5tPZSXp182KbzIAlKcyDJX2MuQVGBXDYWrJCt9vo88sV8H52LcfUemgS04wV07KcK1jKgYo7JMDCqHcH5IgGAiR8hFcku0Pz0682J59X6e2c/tXvFklyGgmHhjXj7+qW4LFA+n55Ki0E9SL5TacReBs+PC+/qjv9NSQg3WS05cutf+qdqJJo9lQwrLpvbhMeAC0Mf5LrVc9nkqvY/b6ocn/RDqahybVMf13cm8jyXCD8bX0H6Ecl2k80p9ovnZcG0VSXMQEDdTAdJnhyU+yEwEOQu9LjcZEWnOG/Uw1yys0THFjwBH6UEG6l6KhOwpShlYqHaEC1mbTQ85ZKidmDQ2jzqMR99/Xk+xkvXCXQ/JX/sd81X00RVyJ4N1Zi+wsXlVakDTcAWP8HEtWkGyVh1z6qRyBhTQuq9nktdsVEMXUgzFCsRpVO6rMWpriqDFoCEHyroQex708ErHf9U3pWyJgOZ/0EAwVaZFKa69AjjVNoAFjqrUWQ1FbsmubJoLN4YMdrsuXfdLTtGaK1Ac0vZPhmZOwPUdKskwAAxhBBzfp4+5jq7YTJ6hxhUQ37Lmz7Vpgmqcbnt1XOjTVdRZoBC7BpXDNpOvH0zzFcAwqvAar2EEYuGxblczEot5cPEZed7xW3l8JJSFBBC08HTdmXaT2cFHpDeKEVIIxYaPn9sryMR9cq/ESLQUcj0sum2kJKU99xOKsN6G+W9okIDSrhZkPOYNaH8OQh7r1f+8MFsS+1x3VGIeivzdaE3ge0T+stynZ2G7jpt5o1xFcKtvLA+XSpXYrgxrV79a6uDpkK1UMM82jj6Gug9UTETingcECTJQX4ShV5Natw77nXlcXGzSF1CbBsODoQ63zdhRFYYgYk0IblwlAmUwU/y3KZYaG99wi8AU/ZsuFHB0Hx3troRC6lzNGzw0ooQGKPpXa+s4YeF3LBSKkWnL0uXCMCYh2tIigGaaHi68Ed+hsRNP6AJUc1ijlFSdCPF3tEbVLgzJ37gkYxneullHvoeA3Qv1XGhebKbfAn6yEGfhcBJhp0uBgNFNrEtKJQqE3zwkf0ZEfnl//3r5+iM9VHM5fv7+fRCk3M2nGcBgMhVXJN/obE8As8G0k8irKyyoCFY1bXWfmIo+1tFQY5a9EhfnFNbUV/W5wwdqWPcIBaDywg1XuS4zNFY40EWO2lUHeKz1Af64ShnFSNKPEJ0lKJBH0C55Gf9x9L+5UBCUoB6lDRILSeLKib7aq1cc4ioIysTBxnTD/vJ6g6XTklvskFVT2tCyX33zz6VNR3LRAO6sAGpK1vSCM4lv5NUGGy3ASTg9bFyPRiGwaew41Hw+aJys09MSuFUwBZoip0nV7wQ3WCboYV1n/xUbmN1ydQJmbdjxWQsnoa9Jr+wsEu4e7rZ2Bi0w8OkDNHYdZ7S1Gg16V6BacTzQHXfSRShdRsGYrWtnerJxSDRjGrj8bjKiX8MgkdyKgXHH80WLAMecEvTyD88u2IUvifsQzooZ4biwysYXO+Y/wJl46DNFQkrhm0Mtrn2Ar09Syb0ju8jO6otzGvGDlVzgasZyUK5aZyOVLFZQ+TiaJh1zHhEF6T1mBXAf58sZJqlvQl9BXIU27diFoXVimPXhJlVPENRiAhcNSm1CK/oWFYtiQTkjRjMIo6FQu2ja7kGs35VK87xohaoCsUc02tJPOObLjgHricfq5a9b1lCXxYOjxl8UsrGxQFjQNN1Q6ss9fG9+2jUFjG9JUKNNsnVLeiRsnREsASLs4FCVGNcqxGijOfNx8FUc6OF8/ASdPNDkwvGHrzoG5RTY2O9Gn6AHbKyDUnUiIV6iWbkuNw3ckfKz8USqRTcIjaDkIJvTVBRQTjqAShSw+BHehFiBU0FK4lqDGRIh1yCT5GqubZs7aZDUde5DuS4bkpReqKgrCMsreNFz17HL7HTcTw6yNjfFft9qNiihQEQs4s2xlsPfgte766JHZ3KQpnsr5VMgymvBv7pM3Xg0pSg2PJxhIo+ykQDCZPAG1mN14LoqoIY6YBoJ8xB/rd3kK/i5Di15Vbifabrvkf91O+9+wc/9/TB5+nNo9INkvo593YGOlo+Z1IJAICN+QN07Z11vOl9LnG1vx/697PqvrAQIvM0MD/Gr6omm9Xt7Uy+6mOusmIR9yY5rktkgXkwTcWryBrtPR+O7jUei6MCaduyaug5R3r8pWbMmEL0PWDTdKYs1mQRopoXCJ5/MIwA8KbIdo2l6AomwK9QWmAAvHd7nv1b6QsjNzCKgxl++hqdNrYAEr1009kaB+PNGAPpOzpJdrU0XH+pZ2FpwbnZk7H/fPfksh+iSBGgA2J9ow2j/tm5dYM5+4oiHIjmZunSRqBlzCLYGtmiCwP4hAHIMPZpHtvddt9QU2iGrcjqkSPZMHAo0FDJbrz8m0ZU0mtkTiqABP8NPrpGwNf6ZcIH+PPeIInyWr2h9j72pUEM5srMBQlBMFfKFdmojqV1L37r6pi0G4N5Wb6c3nl7UyW9vhUGgN9wu2ymcdRbnQ/GP5neIhIk5ccohfWPXia8JZsjpNfoPnZ1HqmnL7kOT/qUb57DPQ/qCEfBEo1rhDBd5sxH3z4qIN++UBcPDRSgznKyu43zMA6Jf7p6fqSoOOiPtRo8J7azrdQ+8mHgNDQv8zzAXoY+VGkivOVxhGth1dVnlZRow/FY3NnKGdDK9ISqndNc02R0RiQ+EI98iBmNIYYp0Ykn5aR7wz1Ce7BuImOxPeFtJ95iE9Q1eK5XLnI3/kg5ZM3Ki9a/Dbm6WZanwPEMUiekGbhOCFDQkd65VRnOUCoUUE3TAQKinBcc/3rwVMuZKMDcz+cDEpAw4QRt8OjG0meH5T1CTqG6pxNrGTIBgNAxzBK+Hw2qMK4yZSYkaukc+UC01OIuI9pEpU9VAJAG9SYCR+AzSsEGYrQL4ZT4fg4yXEh49HsNxAsI+WL9l3+z+bzVdyj02H/O1Sae5zJhuYuKBlwjjufvZpI7SimgsQuiaNoNPnklZwY0+bhI/1hpoC30OILmrk0G8SQbhYUW590FNEBUEdM00d9lFhJjgIOTEhGKdy5JaZ6QKWpHbAmCZqMbNzSwlTBqdaHGcN7VmRDUdeeDZz6Ga7mPDE/NxsorWYOVyxQY125qIitMR9w+E5mltzvBrnWzI3k7yoAHpsnG/IXrXNvziwqNXedE7gqXYf+Z8WF/k7o+lFZpPznN7gzKweiHEF//F3sfX/2fdrRf+C1qAKSQagMZocMNxq6XXy9cxKdNcUXnyNO5zmrUa8mclKxcEHbc7SGaht4B4+QEt0RluXwNH/BcEhOPxPdFjBk/Qv8bQgptT3kT16g2fuqWDry7kj8ns3O3yrPAKW4QfAz5MTKXVip2L20TCfKLmrXZSn4fsHtVa1ODmE5zquKruDi630YlEXe1mAD+7pNYBy0VsBAdNxXxa/DTxNrzd/gGgRXODndS8DDDcTuChgKgXDQ0A5LuQNSEOFPTISjOl+AICCMcyFiSBiCYexGsl6j6Suw6hyJpGOweENl4c2JEWl9bkuPAw0AzJQPqQjvvgsmwZZBUADjiAIyBouTw5qIYmxECXxPpZ/sTcJ8qF0bPWCrwBlXcIM+VAHZXrijHPNITf0yj/794NuwWd4gP9wMo530PmmuOakEyYlx9q78mTNUQeD3cvcV1VzYelaVAJ/WUAwTiyA5wfQlVW17iy9F5WAIGbH+Ul5zJ9/7ppECIDh/IBuvVV6MfY3bIR4BYAP/83tBgA+OhgfPIxPkaEzhADIgQGAAL0v36zetin8fydGLO5HsWbbTHx1FtRW4L+kd31U1n+DcOx4F99DB3Y1PlaeN1gY62HPoqA5vYC/Cj/WTUjqoIM14MMn4/4aZBAuLOyK1woCe8iQxnBFW9af+QaYdRuvbVkJ3o/k2Q4Ith5CXxfcdT0ZxDEtDSIIY+JtlB9HiZGD/7GtJqKikL+N6CFbOsHlxeH/hcU2Nxnhw2Ht8aklpIpPiY1itivvvctFrsusMA6gFMX0yVPf/3RzUdQoUmKFZB5sOLdgUPYBhInA+wpuR19gVIBULLMmFbInYVuLuEjNQpapiCoeXdkpF+iHNOWAv2ZqQ0MLkSFVJWDIUAR60IActGCFaIjaWZUqsIMeIkABkaYChta6ROOUPBub6XmubAsioiF3QXr81PVVjrOkJaQgWFU4pPE7kkpNNpORxYjLAyMqAFQcrw9NGf+QJtNR+wJzsmhaSE8qipZ3AP+uWf88eCdJ+Xke4zoVg2uBKQFcrU0ZIs6HnS8A7OV+2xi3ji2DvlzI6tvngmnnz6hY8ExvvHWTudTW+FDY5DETcM6NlYJjnGNE3uFcGoyXhNc9jJXWUz3S/8M2s4yP+DMXvXUk8ep63vPtfz1cQIsQeR0prXAsQWs0a57J+o4HFoZ34B1Yq+0bcFHkPI1QnwRoeK2kBsqCyrq3NJAuEEABBwA3D5YfghDUpxAM2d6EELhqUwhJZHWEULCqJIRGW5E3JmPI/zcHARD1ZwgCeL0MwQCrxyEEoOZiCAnwOlGDkhCH0N60L4QBlKwDbNNgCAdCMh3wTT0hAhClJEQE2kSGSEASYogMFJ6HgoDMsRAFlYUseDutoRA0ElnodkQhOkRoGsua8Bq7/mABf8hMc6YanK1OR5psWrNQJZAe2nD9wI9Net8RWYPqdUIZYp7am5pqmtl47H2ulNCX132iIyJI0FPnD6ckyKmDmo7h1bpp4po22JiwfdDKyUYhWmNoaKMU38sd2no0Xsq2PC+ilU3rzbXhKKoncRPrBScRb+GpZo3mmj3e0XPaP/U0gjbYPpEMKx6orLDyimolNywmke+esYp6EMT3eexV085qaeaPl9GMJHNRMdagMgEa1e978szSC+UbyGasKnvw+iqLlp0PmWN91bDTxlxpw9RBtOiu6ubpqg7uROibd93QWgTV7psZd627bpy2S9+zEx/LW9Dcmx5PGgxPD8c0eL4wEobB94HBeRW2q7TDXFIyAXK/UqhywUWXKKmoaVx2xVXXXrv9vY9STee6G2rcMs9Ou+j9zvBC7h/ObT+o9SMLqxixfmMLAkJCKOB6Afe51GvWZBW3RC08XvNCmnxtj5IkWQqfO9q0Gxs0GCM1GJAmnV+GDpk6jdOty2rj7ZblD9ly5PpGnnwT9Og10QgFChV544jiYCHc/9vAhZMgMjjhpOVWCH3NePkV3X+tZuMkCKIoWCEKFVVhookuBqDvCv4JK7U0CpdWEQx5570PggXBxbMVkrVE1jhtKhJoQsQnUlEQIFKiTBw7SnTssZfTGWfts98BB222xTHHocCDkF4GGRXNJEdhZGKygZgh89afDhEQ4lug3DqOWMDKqhjEcEwzxQzTzdSfWNko9SpxipddDjmVIJfcSpRHXiUxW4JZ7nrknvseJ1kp8ilVaUqXXxnKVJaylaNc5SlfI1SgQhWpWORoOYiupT/W3VXP1NSmqSJxoapqc1u322RWZ0XBPWIXXsgJzrkxQlAs6H5W1f9siTjh5We9kb66bLxCvdnX0FK/3V/JyfZon5g6NwtkmN13mIauE/aTlOHywDfudefKfGCcHD0u3+l09JQcEIhn8iYgnpPGqAPD3R+6FEJ3ESWQEMYZIjLcRIyI6iERiOQkkVwRiSATOiMCQQkEQQYRgRiBgKCTAiICgUCMPuhlCBmOm9AUdtf/gKa27sT4XtMUUdheQA83yuSmPQQtfYiKpkx4kcrtcyzDssuudKb8ZagvMJTY34ZqWeaT+YkbvREYcXiGMOJwj6D8bUiSFG6AIaGzUq5FeFvfpn731hNKp9Ozrvt7IbPr2aNpT6npw5ReR/jPD01z4mpBpJXneqbtYUGylI5p8bWXRi+b0a7P749emIx8kWfEwadlaT0fU0b3++uvzJIoev6PgCnjzFjylcYh1F9c7aElq2pNad3tSUO5Eo1O6Dk7+z96yONYf00yrFn6pS//vD1kjqAEpuDx+ZArnkK0YPiXMhkYAAA=";

// assets/fonts/manrope-latin-wght-normal.woff2
var manrope_latin_wght_normal_default = "data:font/woff2;base64,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";

// src/fonts.js
var FONT_PASSPORT = Object.freeze({
  studio: { display: "BS League Spartan", body: "BS Source Sans 3", weight: 800, displayFile: "league-spartan-latin-wght-normal.woff2", bodyFile: "source-sans-3-latin-wght-normal.woff2" },
  impact: { display: "BS Barlow Condensed", body: "BS Source Sans 3", weight: 800, displayFile: "barlow-condensed-latin-800-normal.woff2", bodyFile: "source-sans-3-latin-wght-normal.woff2" },
  clean: { display: "BS Archivo", body: "BS Manrope", weight: 800, displayFile: "archivo-latin-wght-normal.woff2", bodyFile: "manrope-latin-wght-normal.woff2" }
});
var sources = { "BS League Spartan": [league_spartan_latin_wght_normal_default, "100 900"], "BS Source Sans 3": [source_sans_3_latin_wght_normal_default, "200 900"], "BS Barlow Condensed": [barlow_condensed_latin_800_normal_default, "800"], "BS Archivo": [archivo_latin_wght_normal_default, "100 900"], "BS Manrope": [manrope_latin_wght_normal_default, "200 800"] };
var documents = /* @__PURE__ */ new WeakMap();
async function loadPosterFonts(voice = "studio", doc = globalThis.document) {
  const passport = FONT_PASSPORT[voice];
  if (!passport) throw new Error("Choose a supported poster type voice.");
  if (!doc?.fonts || typeof FontFace === "undefined") throw new Error("Poster fonts cannot load in this browser. Export is blocked.");
  let pending = documents.get(doc);
  if (!pending) {
    pending = /* @__PURE__ */ new Map();
    documents.set(doc, pending);
  }
  for (const family of [passport.display, passport.body]) {
    if (!pending.has(family)) pending.set(family, (async () => {
      const [url, weight] = sources[family];
      const face3 = new FontFace(family, `url(${JSON.stringify(url)})`, { weight, style: "normal" });
      let timer;
      try {
        await Promise.race([face3.load(), new Promise((_, reject) => {
          timer = setTimeout(() => reject(new Error(`Loading ${family} timed out.`)), 8e3);
        })]);
      } finally {
        clearTimeout(timer);
      }
      doc.fonts.add(face3);
      return face3;
    })().catch((e) => {
      pending.delete(family);
      throw e;
    }));
    const face2 = await pending.get(family);
    if (face2.status !== "loaded" || !doc.fonts.has(face2)) throw new Error(`Required font ${family} is unavailable. Export is blocked.`);
  }
  const digests = { "league-spartan-latin-wght-normal.woff2": "7d843a9fa4dcd050da68405d9093f8ab8298f8f60a97155e85ab84c9ed3040e2", "source-sans-3-latin-wght-normal.woff2": "7a19a7027e125257d310c6dbd78ae3a30b5ea1e3794d60b12bb28227a003bfda", "barlow-condensed-latin-800-normal.woff2": "2515494e8cc2ca07c86ea78766cfa104b796aa6ed5d66821c01d51dbb0b52bce", "archivo-latin-wght-normal.woff2": "8f704806dbedeaaeca334b11ec348bc3ac3a439d6431544b3afb54f534ee4967", "manrope-latin-wght-normal.woff2": "a30ddcd349703aff7464c34bef3fffdff405ee50c113440d7c8693c02d210972" };
  return { ...passport, displaySha256: digests[passport.displayFile], bodySha256: digests[passport.bodyFile], license: "SIL OFL 1.1", coverage: "Latin subset: basic Western European Latin and common punctuation" };
}
function unsupportedCharacters(text) {
  return [...new Set([...String(text)].filter((c) => !/[\u0009\u000a\u000d\u0020-\u007e\u00a0-\u00ff\u2013-\u2014\u2018-\u201a\u201c-\u201e\u2022\u2026\u20ac\u2122]/u.test(c)))];
}

// src/poster-renderer.js
var RECIPES = [{ id: "hero", name: "Hero statement", description: "Monumental words and one intentional image." }, { id: "showcase", name: "Product showcase", description: "Your original screen, in a locally composed frame." }, { id: "editorial", name: "Editorial / information", description: "A strong headline and generous information rhythm." }];
var VOICES = [{ id: "studio", name: "Bold studio", description: "League Spartan / Source Sans 3" }, { id: "impact", name: "Compact impact", description: "Barlow Condensed / Source Sans 3" }, { id: "clean", name: "Clean digital", description: "Archivo / Manrope" }];
var dimensions = { square: [1080, 1080], portrait: [1080, 1350], story: [1080, 1920], landscape: [1200, 628] };
var defaults = { recipe: "hero", voice: "studio", treatment: "brand", variation: "balanced", emphasis: "", kicker: "", scale: 1, heroScale: 1, cropX: 0.5, cropY: 0.5, alignment: "left" };
var clamp = (x, a, b) => Math.min(b, Math.max(a, Number.isFinite(Number(x)) ? Number(x) : 1));
var hex = (x, fallback) => /^#[\da-f]{6}$/i.test(x || "") ? x : fallback;
function luminance(hex2) {
  const a = hex2.slice(1).match(/../g).map((x) => parseInt(x, 16) / 255).map((x) => x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4);
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}
function contrast(a, b) {
  const x = luminance(a), y = luminance(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}
function readable(bg, ink, paper) {
  return contrast(bg, ink) >= contrast(bg, paper) ? ink : paper;
}
function resolvePalette(company, poster) {
  const accent = hex(company.color, "#f4652b"), ink = hex(company.brandKit?.ink, "#171717"), paper = hex(company.brandKit?.paper, "#f7f5ef");
  const field = poster.treatment === "light" ? paper : poster.treatment === "dark" ? ink : accent;
  const text = readable(field, ink, paper);
  return { accent, ink, paper, field, text, emphasis: contrast(field, accent) >= 3 ? accent : text, action: ink, actionText: readable(ink, paper, "#ffffff") };
}
function resolveOptions(company, post) {
  const raw = post.poster || {};
  const o = { ...defaults, voice: company.brandKit?.voice || "studio", ...raw, ...raw.formats?.[post.format] || {} };
  for (const [key, a, b] of [["scale", 0.85, 1.15], ["heroScale", 0.8, 1.2], ["cropX", 0, 1], ["cropY", 0, 1]]) o[key] = clamp(o[key], a, b);
  delete o.formats;
  return o;
}
function wrap(ctx, text, width) {
  const lines = [];
  for (const paragraph of String(text).split("\n")) {
    if (!paragraph.trim()) {
      lines.push("");
      continue;
    }
    const words = paragraph.trim().split(/\s+/);
    let line = "";
    for (const word of words) {
      if (line && ctx.measureText(line + " " + word).width > width) {
        lines.push(line);
        line = word;
      } else line = line ? line + " " + word : word;
    }
    lines.push(line);
  }
  return lines;
}
function font(ctx, size, family, weight) {
  ctx.font = `${weight} ${size}px "${family}"`;
  ctx.fontKerning = "normal";
}
function rect(ctx, box, fill) {
  ctx.fillStyle = fill;
  ctx.fillRect(...box);
}
function contain(ctx, img, box) {
  const [x, y, w, h] = box, s = Math.min(w / img.width, h / img.height);
  ctx.drawImage(img, x + (w - img.width * s) / 2, y + (h - img.height * s) / 2, img.width * s, img.height * s);
  return { x: x + (w - img.width * s) / 2, y: y + (h - img.height * s) / 2, width: img.width * s, height: img.height * s, sourceWidth: img.width, sourceHeight: img.height, cropped: false };
}
function cover(ctx, img, box, o) {
  let [x, y, w, h] = box;
  if (o.heroScale < 1) {
    x += w * (1 - o.heroScale) / 2;
    y += h * (1 - o.heroScale) / 2;
    w *= o.heroScale;
    h *= o.heroScale;
  }
  const scale = Math.max(w / img.width, h / img.height) * Math.max(1, o.heroScale), sw = w / scale, sh = h / scale, sx = (img.width - sw) * o.cropX, sy = (img.height - sh) * o.cropY;
  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
  return { x, y, width: w, height: h, sourceWidth: img.width, sourceHeight: img.height, sourceCrop: { x: sx, y: sy, width: sw, height: sh }, cropped: sw < img.width || sh < img.height };
}
async function image(src, role, errors) {
  if (!src) return null;
  try {
    if (typeof src !== "string") throw Error();
    return await new Promise((resolve, reject) => {
      const img = new Image();
      const timer = setTimeout(() => reject(new Error("Image loading timed out.")), 12e3);
      img.onload = () => {
        clearTimeout(timer);
        img.naturalWidth ? resolve(img) : reject();
      };
      img.onerror = () => {
        clearTimeout(timer);
        reject(new Error("Image loading failed."));
      };
      img.src = src;
    });
  } catch {
    errors.push(`The original ${role} could not be opened. Choose the asset again.`);
    return null;
  }
}
function layout(recipe, format, h, hasImage, variation) {
  const landscape = format === "landscape", story = format === "story", portrait = format === "portrait";
  const m = story ? 80 : 64, footer = story ? h - 160 - 92 : h - 126;
  let title2, visual, body, size;
  if (landscape) {
    title2 = [m, 142, recipe === "editorial" ? 490 : 560, 202];
    visual = [670, 110, 346, 290];
    body = recipe === "editorial" ? [620, 160, 396, 245] : [m, 350, 560, 70];
    size = recipe === "editorial" ? 100 : 84;
  } else if (story) {
    title2 = [m, 240, 920, recipe === "editorial" ? 480 : 410];
    visual = [m, 720, 920, 610];
    body = [m, recipe === "editorial" ? 820 : 1390, 920, recipe === "editorial" ? 780 : 230];
    size = recipe === "showcase" ? 136 : 156;
  } else if (portrait) {
    title2 = [m, 174, 952, recipe === "editorial" ? 410 : 310];
    visual = [m, 520, 952, 490];
    body = [m, recipe === "editorial" ? 680 : 1052, 952, recipe === "editorial" ? 420 : 142];
    size = recipe === "showcase" ? 130 : 148;
  } else {
    title2 = [m, 166, 952, recipe === "editorial" ? 370 : 285];
    visual = [m, 475, 952, 330];
    body = [m, recipe === "editorial" ? 600 : 844, 952, recipe === "editorial" ? 290 : 92];
    size = recipe === "showcase" ? 126 : 146;
  }
  if (recipe === "showcase" && format === "square") {
    title2 = [m, 150, 952, 240];
    visual = [m, 420, 952, 400];
    body = [m, 852, 952, 84];
    size = 114;
  }
  if (recipe === "editorial") {
    visual = null;
  }
  if (recipe === "hero" && hasImage && !landscape) {
    if (story) {
      visual = [250, 720, 750, 690];
      body = [m, 1460, 920, 156];
    } else if (portrait) {
      visual = [464, 520, 552, 640];
      body = [m, 690, 346, 440];
    } else {
      visual = [552, 466, 464, 438];
      body = [m, 566, 430, 318];
    }
  }
  if (recipe === "hero" && !hasImage) {
    title2[3] = landscape ? 220 : story ? 800 : portrait ? 620 : 480;
    body[1] = landscape ? 380 : story ? 1160 : portrait ? 880 : 730;
    body[3] = footer - body[1] - 55;
    size *= 1.15;
    visual = null;
  }
  if (variation === "type-led" && visual && !landscape) {
    title2[3] += 50;
    size *= 1.08;
    visual[1] += 50;
    visual[3] -= 50;
  }
  if (variation === "image-led" && visual && !landscape) {
    title2[3] -= 35;
    size *= 0.9;
    visual[1] -= 35;
    visual[3] += 35;
  }
  return { title: title2, visual, body, size, m, footer, landscape, story };
}
var renderTokens = /* @__PURE__ */ new WeakMap();
async function renderPoster(target, resources2) {
  const token = Symbol("poster-render");
  renderTokens.set(target, token);
  const staging = target.ownerDocument.createElement("canvas");
  const result = await paintPoster(staging, resources2);
  if (renderTokens.get(target) !== token) return { ...result, errors: [...result.errors, "A newer render replaced this drawing. Wait for the current preview."], stale: true };
  target.width = staging.width;
  target.height = staging.height;
  target.getContext("2d").drawImage(staging, 0, 0);
  return result;
}
async function paintPoster(canvas, { company = {}, post = {}, design, background, logo, product }) {
  const format = dimensions[post.format] ? post.format : "square", [width, height] = dimensions[format], unit = width / 1080, h = height / unit;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  const errors = [], warnings = [], hitRegions = [], layers = [];
  const o = resolveOptions(company, post), palette = resolvePalette(company, o);
  const manifest = { rendererVersion: 2, recipeVersion: 1, format, width, height, coordinateSpace: { width: 1080, height: h, pixelScale: unit, description: "Layer boxes and asset placements use layout units; type sizes and hit regions use output pixels." }, options: o, palette, fonts: null, assetReferences: { designId: design?.id || null, backgroundAssetId: design?.assetId || null, logoAssetId: design?.logoAssetId || company.logoAssetId || null, productAssetId: design?.productAssetId || null }, assets: [], layers, safeRegion: { preset: "Brand Studio conservative composition v1 (not platform certification)", inset: format === "story" ? { top: 160, bottom: 160, left: 80, right: 80 } : { top: 54, bottom: 54, left: 64, right: 64 } }, copy: { headline: String(post.headline || post.title || ""), body: String(post.body || ""), cta: String(post.cta || ""), kicker: String(o.kicker || "") } };
  ctx.scale(unit, unit);
  rect(ctx, [0, 0, 1080, h], palette.field);
  const result = () => ({ errors, warnings, width, height, generated: !!design, manifest, hitRegions });
  if (!RECIPES.some((r) => r.id === o.recipe) || !VOICES.some((v) => v.id === o.voice)) {
    errors.push("Choose a supported poster recipe and type voice.");
    return result();
  }
  let fonts;
  try {
    fonts = await loadPosterFonts(o.voice, canvas.ownerDocument);
    manifest.fonts = fonts;
  } catch (e) {
    errors.push(`Required poster fonts failed to load. ${e.message}`);
    return result();
  }
  for (const [role, text2] of Object.entries({ ...manifest.copy, brand: company.name || "" })) {
    const unsupported = unsupportedCharacters(text2);
    if (unsupported.length) errors.push(`${role}: bundled fonts do not support ${unsupported.join(" ")}. Use supported Latin text before exporting.`);
  }
  if (!manifest.copy.headline.trim()) errors.push("Add a headline before exporting.");
  if (contrast(palette.field, palette.text) < 4.5) errors.push("The selected ink and paper do not provide readable contrast on this treatment. Choose stronger brand colours.");
  const [bg, mark, original] = await Promise.all([image(background, "background", errors), image(logo, "logo", errors), image(product, "product / screenshot", errors)]);
  if (company.logoAssetId && !logo) errors.push("The selected original logo is missing. Restore it before exporting.");
  if (o.recipe === "editorial" && (bg || original)) warnings.push("This type-led editorial arrangement does not use the selected background/product image. The original assets remain unchanged; choose Hero or Showcase to place them.");
  if (o.recipe === "showcase" && !original) errors.push("Product showcase needs an original product image or website screenshot. Add it under Keep your originals; generated backgrounds cannot replace product evidence.");
  const plan3 = layout(o.recipe, format, h, !!(bg || original), o.variation);
  function text(role, value, box, { size = 32, min = size, weight = 400, family = fonts.body, color = palette.text, lineHeight = 1.2, align = o.alignment, emphasis = false } = {}) {
    if (!value) return null;
    const [x, y, w, maxH] = box;
    let resolved = size * o.scale;
    const floor = Math.max(min * o.scale, role === "Headline" ? 64 : role === "Kicker" ? 22 : role === "Brand name" ? 24 : 28);
    let lines = [];
    const fits = () => {
      font(ctx, resolved, family, weight);
      lines = wrap(ctx, value, w);
      return lines.every((s) => ctx.measureText(s).width <= w + 0.1) && lines.length * resolved * lineHeight <= maxH;
    };
    while (!fits() && resolved > floor + 0.1) resolved = Math.max(floor, resolved - 2);
    const fit = fits();
    if (!fit) {
      errors.push(`${role} does not fit this ${format} arrangement at its readable floor (${Math.round(resolved * unit)}px). Add deliberate line breaks, choose a different variation/format, or approve shorter copy.`);
      layers.push({ role, text: value, box, size: resolved * unit, lines, overflow: true });
      return null;
    }
    if (resolved < size * o.scale - 0.1) warnings.push(`${role} uses a bounded fit adjustment: ${Math.round(resolved * unit)}px. Check at feed size.`);
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    const start = String(value).toLocaleLowerCase().indexOf(String(o.emphasis || "").toLocaleLowerCase());
    let searchAt = 0;
    for (const line of lines) {
      const lw = ctx.measureText(line).width, tx = align === "center" ? x + (w - lw) / 2 : x;
      let segments = [{ text: line, color }];
      if (emphasis && o.emphasis && start >= 0) {
        const lineStart = String(value).indexOf(line, searchAt);
        searchAt = Math.max(searchAt, lineStart + line.length);
        const a = Math.max(0, start - lineStart), b = Math.min(line.length, start + o.emphasis.length - lineStart);
        if (lineStart >= 0 && a < b) segments = [{ text: line.slice(0, a), color }, { text: line.slice(a, b), color: palette.emphasis }, { text: line.slice(b), color }];
      }
      let px = tx;
      for (const [index, seg] of segments.entries()) {
        ctx.fillStyle = seg.color;
        ctx.fillText(seg.text, px, box[1]);
        const segmentWidth = ctx.measureText(seg.text).width;
        if (emphasis && segments.length === 3 && index === 1 && seg.text) {
          ctx.fillStyle = seg.color;
          ctx.fillRect(px, box[1] + resolved * 0.91, segmentWidth, Math.max(3, resolved * 0.035));
        }
        px += segmentWidth;
      }
      box = [box[0], box[1] + resolved * lineHeight, box[2], box[3]];
    }
    const layer = { role, text: value, box: [x, y, w, maxH], size: resolved * unit, readableFloor: floor * unit, preferredSize: size * o.scale * unit, weight, family, lineHeight, lines, overflow: false };
    layers.push(layer);
    hitRegions.push({ role, x: x * unit, y: y * unit, width: w * unit, height: lines.length * resolved * lineHeight * unit });
    return layer;
  }
  const railY = plan3.story ? 160 : 58;
  if (mark) {
    const placed = contain(ctx, mark, [plan3.m, railY, 260, 58]);
    manifest.assets.push({ role: "logo", ...placed });
    if (mark.width / placed.width < unit) warnings.push("The original logo is below placed resolution; inspect the PNG.");
  } else {
    text("Brand name", company.name || "", [plan3.m, railY, 590, 64], { size: 30, min: 28, weight: 600, align: "left" });
    warnings.push("No original logo selected. The company name is typeset as text, not a logo reconstruction.");
  }
  if (o.kicker) text("Kicker", o.kicker, [650, railY, 1080 - plan3.m - 650, 60], { size: 26, min: 26, weight: 600, align: "left" });
  if (o.emphasis && !manifest.copy.headline.toLocaleLowerCase().includes(o.emphasis.toLocaleLowerCase())) warnings.push("The emphasis phrase is not present in the headline; exact copy remains unchanged.");
  text("Headline", manifest.copy.headline, [...plan3.title], { size: plan3.size, min: plan3.size * 0.85, weight: fonts.weight, family: fonts.display, lineHeight: o.voice === "impact" ? 0.99 : 1.02, emphasis: true });
  if (plan3.visual && (bg || original)) {
    if (o.recipe === "showcase") {
      if (original) {
        const [x, y, bw, bh] = plan3.visual;
        const scale = Math.min(1, o.heroScale), ratio3 = original.width / original.height;
        const fw = Math.min(bw * scale, (bh * scale - 58) * ratio3 + 24), fh = (fw - 24) / ratio3 + 58, fx = x + (bw - fw) / 2, fy = y + (bh - fh) / 2;
        ctx.save();
        ctx.shadowColor = "#00000035";
        ctx.shadowBlur = 28;
        ctx.shadowOffsetY = 18;
        rect(ctx, [fx, fy, fw, fh], palette.paper);
        ctx.restore();
        rect(ctx, [fx, fy, fw, 34], palette.ink);
        for (let n = 0; n < 3; n++) {
          ctx.fillStyle = n === 0 ? palette.accent : palette.paper;
          ctx.beginPath();
          ctx.arc(fx + 17 + n * 18, fy + 17, 4, 0, Math.PI * 2);
          ctx.fill();
        }
        const placed = contain(ctx, original, [fx + 12, fy + 46, fw - 24, fh - 58]);
        manifest.assets.push({ role: "original-product", ...placed });
        hitRegions.push({ role: "product", x: fx * unit, y: fy * unit, width: fw * unit, height: fh * unit });
        if (original.width < placed.width * unit || original.height < placed.height * unit) warnings.push("The original product image is below placed resolution; inspect at full size.");
        if (o.cropX !== 0.5 || o.cropY !== 0.5 || o.heroScale > 1) warnings.push("Showcase protects the complete original screenshot; crop/overscale is not applied.");
      }
    } else {
      const source = original || bg;
      let originalBox = plan3.visual;
      if (original) {
        const [x, y, w, h2] = plan3.visual, s = Math.min(1, o.heroScale);
        originalBox = [x + w * (1 - s) / 2, y + h2 * (1 - s) / 2, w * s, h2 * s];
        if (o.heroScale > 1 || o.cropX !== 0.5 || o.cropY !== 0.5) warnings.push("The original product stays fully contained; crop/overscale applies only to background heroes.");
      }
      const placed = original ? contain(ctx, source, originalBox) : cover(ctx, source, plan3.visual, o);
      manifest.assets.push({ role: original ? "original-product" : "background", ...placed });
      if (source.width < placed.width * unit || source.height < placed.height * unit) warnings.push("The hero image is below placed resolution; inspect at full size.");
      if (placed.cropped) warnings.push("Hero uses an intentional crop. Check subject edges and any text already in the image.");
      hitRegions.push({ role: "hero", x: plan3.visual[0] * unit, y: plan3.visual[1] * unit, width: plan3.visual[2] * unit, height: plan3.visual[3] * unit });
    }
  }
  if (o.recipe === "editorial") {
    const ruleY = plan3.body[1] - 36;
    if (plan3.landscape) rect(ctx, [588, 150, 2, 245], palette.text);
    else rect(ctx, [plan3.m, ruleY, 1080 - plan3.m * 2, 3], palette.text);
    text("Supporting text", manifest.copy.body, [...plan3.body], { size: plan3.landscape ? 32 : plan3.story ? 42 : 36, min: plan3.landscape ? 30 : 32, lineHeight: 1.42 });
  } else text("Supporting text", manifest.copy.body, [...plan3.body], { size: plan3.landscape ? 30 : 34, min: plan3.landscape ? 28 : 32, lineHeight: 1.25 });
  if (manifest.copy.cta) {
    const actionH = plan3.story ? 92 : 72, ax = plan3.m, ay = plan3.footer, aw = 1080 - plan3.m * 2;
    rect(ctx, [ax, ay, aw, actionH], palette.action);
    const action = text("Call to action", manifest.copy.cta, [ax + 24, ay + 18, aw - 106, actionH - 24], { size: plan3.story ? 36 : 32, min: plan3.story ? 32 : 28, weight: 600, color: palette.actionText, lineHeight: 1.05, align: "left" });
    if (action) {
      ctx.strokeStyle = palette.actionText;
      ctx.lineWidth = 3;
      const xx = ax + aw - 37, yy = ay + actionH / 2;
      ctx.beginPath();
      ctx.moveTo(xx - 22, yy);
      ctx.lineTo(xx + 5, yy);
      ctx.moveTo(xx - 5, yy - 10);
      ctx.lineTo(xx + 5, yy);
      ctx.lineTo(xx - 5, yy + 10);
      ctx.stroke();
    }
  }
  if (!manifest.copy.body && o.recipe === "editorial") warnings.push("Editorial has no supporting information. Add approved information or choose Hero statement.");
  if (manifest.copy.body.length > 240) warnings.push("Dense supporting copy: inspect at realistic phone size; a separate approved edit may be needed.");
  ctx.textBaseline = "alphabetic";
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  return result();
}

// src/layout-kernel-flex.js
var LAYOUT_GEOMETRY = {
  "lateral": {
    "square": {
      "title": [
        64,
        240,
        480,
        270
      ],
      "body": [
        64,
        550,
        480,
        170
      ],
      "visual": [
        600,
        180,
        416,
        590
      ],
      "cta": [
        64,
        240,
        480,
        775
      ],
      "brand": [
        64,
        56,
        430,
        64
      ],
      "kicker": [
        680,
        56,
        336,
        60
      ],
      "annotation": [
        600,
        782,
        416,
        36
      ],
      "headlineSize": 64,
      "bodySize": 30,
      "ctaSize": 30,
      "align": "left",
      "copyFlow": {
        "box": [
          64,
          240,
          480,
          775
        ],
        "headlineBodyGap": 36,
        "bodyCtaGap": 40
      }
    },
    "portrait": {
      "title": [
        64,
        310,
        480,
        340
      ],
      "body": [
        64,
        700,
        480,
        190
      ],
      "visual": [
        600,
        230,
        416,
        790
      ],
      "cta": [
        64,
        310,
        480,
        980
      ],
      "brand": [
        64,
        56,
        430,
        64
      ],
      "kicker": [
        680,
        56,
        336,
        60
      ],
      "annotation": [
        600,
        1032,
        416,
        36
      ],
      "headlineSize": 64,
      "bodySize": 30,
      "ctaSize": 30,
      "align": "left",
      "copyFlow": {
        "box": [
          64,
          310,
          480,
          980
        ],
        "headlineBodyGap": 36,
        "bodyCtaGap": 40
      }
    },
    "story": {
      "title": [
        80,
        400,
        490,
        450
      ],
      "body": [
        80,
        920,
        490,
        250
      ],
      "visual": [
        620,
        420,
        380,
        920
      ],
      "cta": [
        80,
        400,
        490,
        1380
      ],
      "brand": [
        80,
        160,
        400,
        65
      ],
      "kicker": [
        650,
        160,
        350,
        60
      ],
      "annotation": [
        620,
        1352,
        380,
        36
      ],
      "headlineSize": 92,
      "bodySize": 30,
      "ctaSize": 30,
      "align": "left",
      "copyFlow": {
        "box": [
          80,
          400,
          490,
          1380
        ],
        "headlineBodyGap": 36,
        "bodyCtaGap": 40
      }
    },
    "landscape": {
      "title": [
        52,
        150,
        470,
        180
      ],
      "body": [
        52,
        350,
        470,
        80
      ],
      "visual": [
        610,
        110,
        420,
        350
      ],
      "cta": [
        52,
        150,
        470,
        375
      ],
      "brand": [
        52,
        48,
        400,
        48
      ],
      "kicker": [
        750,
        48,
        278,
        45
      ],
      "annotation": [
        610,
        472,
        420,
        36
      ],
      "headlineSize": 48,
      "bodySize": 23,
      "ctaSize": 24,
      "align": "left",
      "copyFlow": {
        "box": [
          52,
          150,
          470,
          375
        ],
        "headlineBodyGap": 20,
        "bodyCtaGap": 28
      }
    }
  },
  "broadside": {
    "square": {
      "title": [
        64,
        180,
        952,
        250
      ],
      "body": [
        64,
        465,
        790,
        115
      ],
      "visual": [
        64,
        640,
        440,
        360
      ],
      "cta": [
        564,
        760,
        452,
        210
      ],
      "brand": [
        64,
        56,
        430,
        64
      ],
      "kicker": [
        680,
        56,
        336,
        60
      ],
      "annotation": [
        64,
        1012,
        440,
        36
      ],
      "headlineSize": 72,
      "bodySize": 30,
      "ctaSize": 30,
      "align": "left"
    },
    "portrait": {
      "title": [
        64,
        210,
        952,
        320
      ],
      "body": [
        64,
        565,
        790,
        140
      ],
      "visual": [
        64,
        810,
        480,
        450
      ],
      "cta": [
        610,
        1040,
        406,
        210
      ],
      "brand": [
        64,
        56,
        430,
        64
      ],
      "kicker": [
        680,
        56,
        336,
        60
      ],
      "annotation": [
        64,
        1272,
        480,
        36
      ],
      "headlineSize": 72,
      "bodySize": 30,
      "ctaSize": 30,
      "align": "left"
    },
    "story": {
      "title": [
        80,
        290,
        920,
        420
      ],
      "body": [
        80,
        760,
        840,
        200
      ],
      "visual": [
        80,
        1150,
        480,
        530
      ],
      "cta": [
        620,
        1430,
        380,
        240
      ],
      "brand": [
        80,
        160,
        400,
        65
      ],
      "kicker": [
        650,
        160,
        350,
        60
      ],
      "annotation": [
        80,
        1692,
        480,
        36
      ],
      "headlineSize": 92,
      "bodySize": 30,
      "ctaSize": 30,
      "align": "left"
    },
    "landscape": {
      "title": [
        52,
        125,
        976,
        150
      ],
      "body": [
        52,
        300,
        780,
        70
      ],
      "visual": [
        52,
        390,
        440,
        125
      ],
      "cta": [
        600,
        410,
        428,
        95
      ],
      "brand": [
        52,
        48,
        400,
        48
      ],
      "kicker": [
        750,
        48,
        278,
        45
      ],
      "annotation": [
        52,
        527,
        440,
        36
      ],
      "headlineSize": 48,
      "bodySize": 23,
      "ctaSize": 24,
      "align": "left"
    }
  },
  "specimen": {
    "square": {
      "title": [
        64,
        710,
        590,
        180
      ],
      "body": [
        64,
        925,
        590,
        100
      ],
      "visual": [
        170,
        280,
        740,
        360
      ],
      "cta": [
        620,
        120,
        396,
        140
      ],
      "brand": [
        64,
        56,
        430,
        64
      ],
      "kicker": [
        680,
        56,
        336,
        60
      ],
      "annotation": [
        170,
        652,
        740,
        36
      ],
      "headlineSize": 72,
      "bodySize": 30,
      "ctaSize": 30,
      "align": "left"
    },
    "portrait": {
      "title": [
        64,
        930,
        590,
        230
      ],
      "body": [
        64,
        1190,
        590,
        105
      ],
      "visual": [
        130,
        340,
        820,
        500
      ],
      "cta": [
        620,
        135,
        396,
        160
      ],
      "brand": [
        64,
        56,
        430,
        64
      ],
      "kicker": [
        680,
        56,
        336,
        60
      ],
      "annotation": [
        130,
        852,
        820,
        36
      ],
      "headlineSize": 72,
      "bodySize": 30,
      "ctaSize": 30,
      "align": "left"
    },
    "story": {
      "title": [
        80,
        1310,
        610,
        280
      ],
      "body": [
        80,
        1630,
        610,
        150
      ],
      "visual": [
        100,
        480,
        880,
        700
      ],
      "cta": [
        600,
        230,
        400,
        190
      ],
      "brand": [
        80,
        160,
        400,
        65
      ],
      "kicker": [
        650,
        160,
        350,
        60
      ],
      "annotation": [
        100,
        1192,
        880,
        36
      ],
      "headlineSize": 92,
      "bodySize": 30,
      "ctaSize": 30,
      "align": "left"
    },
    "landscape": {
      "title": [
        52,
        365,
        570,
        100
      ],
      "body": [
        52,
        480,
        570,
        48
      ],
      "visual": [
        210,
        145,
        570,
        190
      ],
      "cta": [
        690,
        80,
        338,
        90
      ],
      "brand": [
        52,
        48,
        400,
        48
      ],
      "kicker": [
        750,
        48,
        278,
        45
      ],
      "annotation": [
        210,
        347,
        570,
        36
      ],
      "headlineSize": 48,
      "bodySize": 23,
      "ctaSize": 24,
      "align": "left"
    }
  },
  "centered": {
    "square": {
      "title": [
        160,
        300,
        760,
        240
      ],
      "body": [
        210,
        580,
        660,
        130
      ],
      "visual": [
        780,
        140,
        236,
        125
      ],
      "cta": [
        250,
        300,
        580,
        715
      ],
      "brand": [
        64,
        56,
        430,
        64
      ],
      "kicker": [
        680,
        56,
        336,
        60
      ],
      "annotation": [
        780,
        277,
        236,
        36
      ],
      "headlineSize": 72,
      "bodySize": 30,
      "ctaSize": 30,
      "align": "center",
      "copyFlow": {
        "box": [
          160,
          300,
          760,
          715
        ],
        "headlineBodyGap": 36,
        "bodyCtaGap": 40
      }
    },
    "portrait": {
      "title": [
        130,
        400,
        820,
        300
      ],
      "body": [
        210,
        755,
        660,
        170
      ],
      "visual": [
        760,
        160,
        256,
        190
      ],
      "cta": [
        250,
        400,
        580,
        890
      ],
      "brand": [
        64,
        56,
        430,
        64
      ],
      "kicker": [
        680,
        56,
        336,
        60
      ],
      "annotation": [
        760,
        362,
        256,
        36
      ],
      "headlineSize": 72,
      "bodySize": 30,
      "ctaSize": 30,
      "align": "center",
      "copyFlow": {
        "box": [
          130,
          400,
          820,
          890
        ],
        "headlineBodyGap": 36,
        "bodyCtaGap": 40
      }
    },
    "story": {
      "title": [
        120,
        600,
        840,
        380
      ],
      "body": [
        190,
        1050,
        700,
        220
      ],
      "visual": [
        780,
        250,
        220,
        260
      ],
      "cta": [
        230,
        600,
        620,
        1180
      ],
      "brand": [
        80,
        160,
        400,
        65
      ],
      "kicker": [
        650,
        160,
        350,
        60
      ],
      "annotation": [
        780,
        522,
        220,
        36
      ],
      "headlineSize": 92,
      "bodySize": 30,
      "ctaSize": 30,
      "align": "center",
      "copyFlow": {
        "box": [
          120,
          600,
          840,
          1180
        ],
        "headlineBodyGap": 36,
        "bodyCtaGap": 40
      }
    },
    "landscape": {
      "title": [
        180,
        185,
        720,
        140
      ],
      "body": [
        250,
        350,
        580,
        65
      ],
      "visual": [
        850,
        100,
        178,
        70
      ],
      "cta": [
        310,
        185,
        460,
        340
      ],
      "brand": [
        52,
        48,
        400,
        48
      ],
      "kicker": [
        750,
        48,
        278,
        45
      ],
      "annotation": [
        850,
        182,
        178,
        36
      ],
      "headlineSize": 48,
      "bodySize": 23,
      "ctaSize": 24,
      "align": "center",
      "copyFlow": {
        "box": [
          180,
          185,
          720,
          340
        ],
        "headlineBodyGap": 20,
        "bodyCtaGap": 28
      }
    }
  },
  "spread": {
    "square": {
      "title": [
        600,
        225,
        416,
        270
      ],
      "body": [
        600,
        535,
        416,
        180
      ],
      "visual": [
        64,
        340,
        470,
        610
      ],
      "cta": [
        600,
        225,
        416,
        790
      ],
      "brand": [
        64,
        56,
        430,
        64
      ],
      "kicker": [
        680,
        56,
        336,
        60
      ],
      "annotation": [
        64,
        962,
        470,
        36
      ],
      "headlineSize": 64,
      "bodySize": 30,
      "ctaSize": 30,
      "align": "left",
      "copyFlow": {
        "box": [
          600,
          225,
          416,
          790
        ],
        "headlineBodyGap": 36,
        "bodyCtaGap": 40
      }
    },
    "portrait": {
      "title": [
        600,
        290,
        416,
        330
      ],
      "body": [
        600,
        670,
        416,
        210
      ],
      "visual": [
        64,
        450,
        470,
        770
      ],
      "cta": [
        600,
        290,
        416,
        1e3
      ],
      "brand": [
        64,
        56,
        430,
        64
      ],
      "kicker": [
        680,
        56,
        336,
        60
      ],
      "annotation": [
        64,
        1232,
        470,
        36
      ],
      "headlineSize": 64,
      "bodySize": 30,
      "ctaSize": 30,
      "align": "left",
      "copyFlow": {
        "box": [
          600,
          290,
          416,
          1e3
        ],
        "headlineBodyGap": 36,
        "bodyCtaGap": 40
      }
    },
    "story": {
      "title": [
        580,
        410,
        420,
        410
      ],
      "body": [
        580,
        890,
        420,
        270
      ],
      "visual": [
        80,
        680,
        430,
        1020
      ],
      "cta": [
        580,
        410,
        420,
        1370
      ],
      "brand": [
        80,
        160,
        400,
        65
      ],
      "kicker": [
        650,
        160,
        350,
        60
      ],
      "annotation": [
        80,
        1712,
        430,
        36
      ],
      "headlineSize": 92,
      "bodySize": 30,
      "ctaSize": 30,
      "align": "left",
      "copyFlow": {
        "box": [
          580,
          410,
          420,
          1370
        ],
        "headlineBodyGap": 36,
        "bodyCtaGap": 40
      }
    },
    "landscape": {
      "title": [
        610,
        125,
        418,
        180
      ],
      "body": [
        610,
        335,
        418,
        80
      ],
      "visual": [
        52,
        185,
        490,
        330
      ],
      "cta": [
        610,
        125,
        418,
        400
      ],
      "brand": [
        52,
        48,
        400,
        48
      ],
      "kicker": [
        750,
        48,
        278,
        45
      ],
      "annotation": [
        52,
        527,
        490,
        36
      ],
      "headlineSize": 48,
      "bodySize": 23,
      "ctaSize": 24,
      "align": "left",
      "copyFlow": {
        "box": [
          610,
          125,
          418,
          400
        ],
        "headlineBodyGap": 20,
        "bodyCtaGap": 28
      }
    }
  },
  "cover": {
    "square": {
      "title": [
        64,
        710,
        540,
        180
      ],
      "body": [
        64,
        925,
        540,
        100
      ],
      "visual": [
        64,
        180,
        952,
        450
      ],
      "cta": [
        650,
        795,
        366,
        175
      ],
      "brand": [
        64,
        56,
        430,
        64
      ],
      "kicker": [
        680,
        56,
        336,
        60
      ],
      "annotation": [
        64,
        642,
        952,
        36
      ],
      "headlineSize": 72,
      "bodySize": 30,
      "ctaSize": 30,
      "align": "left"
    },
    "portrait": {
      "title": [
        64,
        950,
        550,
        220
      ],
      "body": [
        64,
        1205,
        550,
        90
      ],
      "visual": [
        64,
        190,
        952,
        660
      ],
      "cta": [
        660,
        1070,
        356,
        180
      ],
      "brand": [
        64,
        56,
        430,
        64
      ],
      "kicker": [
        680,
        56,
        336,
        60
      ],
      "annotation": [
        64,
        862,
        952,
        36
      ],
      "headlineSize": 72,
      "bodySize": 30,
      "ctaSize": 30,
      "align": "left"
    },
    "story": {
      "title": [
        80,
        1330,
        540,
        280
      ],
      "body": [
        80,
        1660,
        540,
        120
      ],
      "visual": [
        80,
        270,
        920,
        940
      ],
      "cta": [
        670,
        1500,
        330,
        220
      ],
      "brand": [
        80,
        160,
        400,
        65
      ],
      "kicker": [
        650,
        160,
        350,
        60
      ],
      "annotation": [
        80,
        1222,
        920,
        36
      ],
      "headlineSize": 92,
      "bodySize": 30,
      "ctaSize": 30,
      "align": "left"
    },
    "landscape": {
      "title": [
        52,
        385,
        540,
        92
      ],
      "body": [
        52,
        490,
        540,
        40
      ],
      "visual": [
        52,
        125,
        976,
        215
      ],
      "cta": [
        650,
        430,
        378,
        85
      ],
      "brand": [
        52,
        48,
        400,
        48
      ],
      "kicker": [
        750,
        48,
        278,
        45
      ],
      "annotation": [
        52,
        352,
        976,
        36
      ],
      "headlineSize": 48,
      "bodySize": 23,
      "ctaSize": 24,
      "align": "left"
    }
  }
};
function freeze(value) {
  if (value && typeof value === "object") {
    Object.values(value).forEach(freeze);
    Object.freeze(value);
  }
  return value;
}
freeze(LAYOUT_GEOMETRY);
var LAYOUT_RESOURCES = freeze({
  "lateral": {
    "id": "lateral",
    "version": 1,
    "sha256": "bdc5d70d1b0818e93fcc6df42159c703196b131733590f82be863c1c32c12ff5"
  },
  "broadside": {
    "id": "broadside",
    "version": 1,
    "sha256": "7a2c50f43f4accc36175ea57ecc52885f80bb3015e647e5cad9fdfcdf59e8d65"
  },
  "specimen": {
    "id": "specimen",
    "version": 1,
    "sha256": "5435adec8b9f15c22751e12821af9a3ec8b847bd19fb579ad693db354baebc2b"
  },
  "centered": {
    "id": "centered",
    "version": 1,
    "sha256": "1c909e9874c7e0637f73feb9e7d167378630a0b5718546b908314375f331ef8c"
  },
  "spread": {
    "id": "spread",
    "version": 1,
    "sha256": "80cbe59087d0bdf1c9f65e025b4e603b54f7b17e7459be266e6eededf16d4b12"
  },
  "cover": {
    "id": "cover",
    "version": 1,
    "sha256": "07d3d9689bd000229c43c42ceebee5fca73e14535c1d491e7f42e682f018c365"
  }
});
function layoutPlan(id, format = "square", density = "balanced") {
  if (!Object.hasOwn(LAYOUT_GEOMETRY, id) || !Object.hasOwn(LAYOUT_GEOMETRY[id], format)) throw Error("Choose a supported layout and format.");
  if (!["compact", "balanced", "generous"].includes(density)) throw Error("Choose a supported layout density.");
  const p = JSON.parse(JSON.stringify(LAYOUT_GEOMETRY[id][format]));
  p.density = density;
  p.leading = density === "compact" ? 1.05 : density === "generous" ? 1.25 : 1.15;
  return p;
}
function flowCopyPlan(plan3, { headlineHeight, bodyHeight = 0, hasBody = bodyHeight > 0 }) {
  const f = plan3.copyFlow;
  if (!f) return { bodyY: plan3.body[1], ctaY: plan3.cta[1] };
  const headlineBottom = plan3.title[1] + headlineHeight, bodyY = headlineBottom + (hasBody ? f.headlineBodyGap : 0);
  return { bodyY, ctaY: (hasBody ? bodyY + bodyHeight : headlineBottom) + f.bodyCtaGap };
}

// composition-model.js
var plain = (value) => value !== null && typeof value === "object" && !Array.isArray(value) && [Object.prototype, null].includes(Object.getPrototypeOf(value));
var clone = (value) => JSON.parse(JSON.stringify(value));
function freeze2(value) {
  if (value && typeof value === "object") {
    Object.values(value).forEach(freeze2);
    Object.freeze(value);
  }
  return value;
}
var LAYOUTS = freeze2([
  { id: "lateral", label: "Lateral", description: "Copy left, visual right, action below the copy.", version: 1 },
  { id: "broadside", label: "Broadside", description: "Upper headline, lower visual and independent action.", version: 1 },
  { id: "specimen", label: "Specimen", description: "Complete central original, lower headline, upper action.", version: 1 },
  { id: "centered", label: "Centered", description: "Centered reading stack with an edge motif.", version: 1 },
  { id: "spread", label: "Spread", description: "Narrow right reading column and left visual.", version: 1 },
  { id: "cover", label: "Cover", description: "Generous upper visual with lower type and action.", version: 1 }
]);
var MOTIF_OPTIONS = freeze2([
  { id: "none", label: "None", description: "No decorative motif." },
  { id: "ribbon-v1", label: "Ribbon", description: "A flowing modular ribbon." },
  { id: "orbit-v1", label: "Orbit", description: "An open orbital structure." },
  { id: "proof-marks-v1", label: "Proof marks", description: "Creative registration and proof marks." },
  { id: "responsive-frames-v1", label: "Responsive frames", description: "Nested responsive proportions." },
  { id: "answer-exchange-v1", label: "Answer exchange", description: "A conceptual dialogue, without invented data." },
  { id: "research-folio-v1", label: "Research folio", description: "Editorial folio structure." },
  { id: "decision-junction-v1", label: "Decision junction", description: "A conceptual branching decision." },
  { id: "interface-modules-v1", label: "Interface modules", description: "Interlocking conceptual interface modules." }
]);
var CTA_STYLES = freeze2(["strip", "rectangle", "rounded", "pill", "outline", "text"].map((id) => ({ id, label: id[0].toUpperCase() + id.slice(1) })));
var PALETTE_ROLES = freeze2(["primary", "accent", "ink", "paper"]);
var FLEX_GROUP_DEFAULTS = freeze2({
  composition: { layout: "lateral", version: 1, density: "balanced", profile: null },
  motif: { id: "none", opacity: 0.15, color: "auto", x: 0.75, y: 0.65, scale: 1, rotation: 0 },
  cta: { style: "strip", width: "full", align: "left", paddingX: 24, paddingY: 16, fill: { mode: "palette", value: "accent" }, text: { mode: "auto" }, arrow: true },
  textColors: { headline: "auto", body: "auto", brand: "auto", kicker: "auto" }
});
function keys(value, allowed, label) {
  if (!plain(value)) throw new Error(`${label} must be an object.`);
  for (const key of Object.keys(value)) if (!allowed.includes(key)) throw new Error(`Unsupported ${label} option: ${key}.`);
}
function one(value, choices, label) {
  if (!choices.includes(value)) throw new Error(`Choose a supported ${label}.`);
  return value;
}
function number(value, min, max, label) {
  if (typeof value !== "number" || !Number.isFinite(value) || value < min || value > max) throw new Error(`${label} must be between ${min} and ${max}.`);
  return value;
}
function mergeComposition(base, override) {
  const result = clone(base);
  for (const [key, value] of Object.entries(override)) result[key] = key === "text" && value?.mode === "auto" ? clone(value) : plain(value) && plain(result[key]) ? mergeComposition(result[key], value) : clone(value);
  return result;
}
function colour(value, text, partial) {
  keys(value, ["mode", "value"], "CTA colour");
  if (Object.hasOwn(value, "mode")) one(value.mode, text ? ["palette", "custom", "auto"] : ["palette", "custom"], "CTA colour mode");
  if (Object.hasOwn(value, "value") && !(PALETTE_ROLES.includes(value.value) || typeof value.value === "string" && /^#[0-9a-fA-F]{6}$/.test(value.value))) throw new Error("CTA colour requires a palette role or six-digit hex.");
  if (!partial) {
    one(value.mode, text ? ["palette", "custom", "auto"] : ["palette", "custom"], "CTA colour mode");
    if (value.mode === "auto") {
      if (Object.hasOwn(value, "value")) throw new Error("Auto CTA text cannot contain a colour value.");
    } else if (value.mode === "palette") one(value.value, PALETTE_ROLES, "CTA palette role");
    else if (typeof value.value !== "string" || !/^#[0-9a-fA-F]{6}$/.test(value.value)) throw new Error("Custom CTA colour requires six-digit hex.");
  }
  return clone(value);
}
function provenance(value) {
  if (value === null) return null;
  keys(value, ["id", "version", "sha256", "ordinal"], "composition profile provenance");
  one(value.id, ["creative-modular", "research-editorial", "custom"], "composition profile");
  if (value.version !== 1 || typeof value.sha256 !== "string" || !/^[a-f0-9]{64}$/.test(value.sha256) || !Number.isSafeInteger(value.ordinal) || value.ordinal < 0) throw new Error("Invalid composition profile provenance.");
  return clone(value);
}
function normalizeFlexibleGroup(group, value, partial = false) {
  const defaults2 = FLEX_GROUP_DEFAULTS[group];
  if (!defaults2) throw new Error("Unsupported flexible group.");
  keys(value, Object.keys(defaults2), `poster ${group}`);
  for (const [key, item] of Object.entries(value)) {
    if (group === "composition") {
      if (key === "layout") one(item, LAYOUTS.map((x) => x.id), "layout");
      if (key === "version" && item !== 1) throw new Error("Composition version must be 1.");
      if (key === "density") one(item, ["compact", "balanced", "generous"], "composition density");
      if (key === "profile") provenance(item);
    } else if (group === "motif") {
      if (key === "id") one(item, MOTIF_OPTIONS.map((x) => x.id), "motif");
      if (key === "color") one(item, ["auto", ...PALETTE_ROLES], "motif colour");
      const bounds = { opacity: [0, 1], x: [0, 1], y: [0, 1], scale: [0.25, 2], rotation: [-180, 180] };
      if (bounds[key]) number(item, ...bounds[key], `motif ${key}`);
    } else if (group === "textColors") one(item, ["auto", ...PALETTE_ROLES], "text colour");
    else {
      if (key === "style") one(item, CTA_STYLES.map((x) => x.id), "CTA style");
      if (key === "width") one(item, ["fit", "full"], "CTA width");
      if (key === "align") one(item, ["left", "center", "right"], "CTA alignment");
      if (key === "paddingX") number(item, 0, 64, "CTA horizontal padding");
      if (key === "paddingY") number(item, 0, 40, "CTA vertical padding");
      if (key === "arrow" && typeof item !== "boolean") throw new Error("CTA arrow must be boolean.");
      if (key === "fill" || key === "text") colour(item, key === "text", true);
    }
  }
  if (partial) return clone(value);
  const result = mergeComposition(defaults2, value);
  if (group === "cta") {
    if (value.text?.mode === "auto") result.text = clone(value.text);
    colour(result.fill, false, false);
    colour(result.text, true, false);
  }
  return result;
}
var profileBase = { version: 1, id: "custom", layouts: ["lateral"], motifs: ["none"], density: "balanced", motifOpacity: 0.15, cta: FLEX_GROUP_DEFAULTS.cta, vary: false };
var PROFILE_PRESETS = freeze2([
  { id: "creative-modular", label: "Creative modular", description: "Lateral, broadside and specimen with a creative modular vocabulary.", profile: { ...clone(profileBase), id: "creative-modular", layouts: ["lateral", "broadside", "specimen"], motifs: ["proof-marks-v1", "responsive-frames-v1", "answer-exchange-v1"], cta: { ...clone(FLEX_GROUP_DEFAULTS.cta), style: "pill", width: "fit", fill: { mode: "palette", value: "primary" } }, vary: true } },
  { id: "research-editorial", label: "Research editorial", description: "Centered, spread and cover with conceptual research diagrams.", profile: { ...clone(profileBase), id: "research-editorial", layouts: ["centered", "spread", "cover"], motifs: ["research-folio-v1", "decision-junction-v1", "interface-modules-v1"], cta: { ...clone(FLEX_GROUP_DEFAULTS.cta), style: "rounded", width: "fit", fill: { mode: "palette", value: "primary" } }, vary: true } }
]);
function normalizeCompositionProfile(value) {
  keys(value, Object.keys(profileBase), "composition profile");
  const base = PROFILE_PRESETS.find((p) => p.id === value.id)?.profile ?? profileBase;
  const result = { ...clone(base), ...clone(value) };
  if (result.version !== 1) throw new Error("Composition profile version must be 1.");
  one(result.id, ["creative-modular", "research-editorial", "custom"], "composition profile");
  const profileLayouts = [...LAYOUTS, ...["bold-backdrop", "subject-right", "image-lead", "centered-announcement", "service-sheet", "subject-left", "image-footer", "framed-focus", "type-led", "offset-grid"].map((id) => ({ id }))];
  for (const [key, vocabulary] of [["layouts", profileLayouts], ["motifs", MOTIF_OPTIONS]]) {
    const ids = vocabulary.map((x) => x.id), list = result[key];
    if (!Array.isArray(list) || list.length < 1 || list.length > ids.length || new Set(list).size !== list.length || list.some((x) => !ids.includes(x))) throw new Error(`Choose a bounded unique list of profile ${key}.`);
  }
  one(result.density, ["compact", "balanced", "generous"], "profile density");
  number(result.motifOpacity, 0, 1, "profile motif opacity");
  if (typeof result.vary !== "boolean") throw new Error("Profile vary must be boolean.");
  if (Object.hasOwn(value, "cta")) keys(value.cta, Object.keys(FLEX_GROUP_DEFAULTS.cta), "profile CTA");
  const cta = mergeComposition(base.cta, value.cta ?? {}), templateWidth = ["column", "poster"].includes(cta.width) ? cta.width : null;
  result.cta = normalizeFlexibleGroup("cta", { ...cta, ...templateWidth ? { width: "full" } : {} });
  if (templateWidth) result.cta.width = templateWidth;
  return Object.fromEntries(Object.keys(profileBase).map((key) => [key, result[key]]));
}
function compositionProfileSha256(value) {
  const profile = normalizeCompositionProfile(value);
  const stable = (v) => plain(v) ? Object.fromEntries(Object.keys(v).sort().map((k2) => [k2, stable(v[k2])])) : Array.isArray(v) ? v.map(stable) : v;
  const bytes = new TextEncoder().encode(JSON.stringify(stable(profile))), length = bytes.length;
  const data = new Uint8Array(Math.ceil((length + 9) / 64) * 64);
  data.set(bytes);
  data[length] = 128;
  const view = new DataView(data.buffer);
  view.setUint32(data.length - 4, length * 8);
  const k = [], initial = [];
  for (let n = 2; k.length < 64; n++) {
    let prime = true;
    for (let d = 2; d * d <= n; d++) if (n % d === 0) {
      prime = false;
      break;
    }
    if (prime) {
      if (initial.length < 8) initial.push(Math.sqrt(n) % 1 * 4294967296 | 0);
      k.push(Math.cbrt(n) % 1 * 4294967296 | 0);
    }
  }
  const h = initial, w = new Int32Array(64), r = (x, n) => x >>> n | x << 32 - n;
  for (let start = 0; start < data.length; start += 64) {
    for (let i = 0; i < 64; i++) w[i] = i < 16 ? view.getInt32(start + i * 4) : w[i - 16] + (r(w[i - 15], 7) ^ r(w[i - 15], 18) ^ w[i - 15] >>> 3) + w[i - 7] + (r(w[i - 2], 17) ^ r(w[i - 2], 19) ^ w[i - 2] >>> 10) | 0;
    let [a, b, c, d, e, f, g, j] = h;
    for (let i = 0; i < 64; i++) {
      const t = j + (r(e, 6) ^ r(e, 11) ^ r(e, 25)) + (e & f ^ ~e & g) + k[i] + w[i] | 0, u = (r(a, 2) ^ r(a, 13) ^ r(a, 22)) + (a & b ^ a & c ^ b & c) | 0;
      j = g;
      g = f;
      f = e;
      e = d + t | 0;
      d = c;
      c = b;
      b = a;
      a = t + u | 0;
    }
    [a, b, c, d, e, f, g, j].forEach((x, i) => {
      h[i] = h[i] + x | 0;
    });
  }
  return h.map((x) => (x >>> 0).toString(16).padStart(8, "0")).join("");
}
function motifPlacementForLayout(layout2, format = "square", density = "balanced") {
  const dimensions6 = { square: [1080, 1080], portrait: [1080, 1350], story: [1080, 1920], landscape: [1200, 628] };
  const visual = layoutPlan(layout2, format, density).visual, [nativeWidth, nativeHeight] = dimensions6[format];
  const height = nativeHeight / (nativeWidth / 1080);
  return {
    x: (visual[0] + visual[2] / 2) / 1080,
    y: (visual[1] + visual[3] / 2) / height,
    scale: Math.max(0.25, Math.min(1.4, visual[2] / 650, visual[3] / 390)),
    rotation: 0
  };
}
function applyCompositionProfile(poster, value, ordinal = 0) {
  if (!plain(poster)) throw new Error("Poster options must be an object.");
  if (!Number.isSafeInteger(ordinal) || ordinal < 0) throw new Error("Profile ordinal must be a non-negative safe integer.");
  const profile = normalizeCompositionProfile(value), index = profile.vary ? ordinal : 0, layout2 = profile.layouts[index % profile.layouts.length];
  const formats3 = {};
  if (Object.hasOwn(poster, "formats")) {
    keys(poster.formats, ["square", "portrait", "story", "landscape"], "poster formats");
    for (const [format, overrides] of Object.entries(poster.formats)) {
      if (!plain(overrides)) throw new Error("Poster format overrides must be an object.");
      const { composition: _composition, motif: _motif, cta: _cta, ...retained } = overrides;
      formats3[format] = clone(retained);
    }
  }
  for (const format of ["portrait", "story", "landscape"]) formats3[format] = { ...formats3[format], motif: motifPlacementForLayout(layout2, format, profile.density) };
  return {
    ...clone(poster),
    version: 3,
    compilerVersion: 3,
    composition: { ...clone(FLEX_GROUP_DEFAULTS.composition), ...clone(poster.composition ?? {}), layout: layout2, density: profile.density, profile: { id: profile.id, version: 1, sha256: compositionProfileSha256(profile), ordinal } },
    motif: { ...clone(FLEX_GROUP_DEFAULTS.motif), ...clone(poster.motif ?? {}), id: profile.motifs[index % profile.motifs.length], opacity: profile.motifOpacity, ...motifPlacementForLayout(layout2, "square", profile.density) },
    cta: clone(profile.cta),
    formats: formats3
  };
}

// src/layout-kernel-template.js
var TEMPLATE_GEOMETRY = {
  "bold-backdrop": {
    "square": {
      "title": [
        64,
        170,
        952,
        430
      ],
      "body": [
        64,
        606,
        430,
        250
      ],
      "visual": [
        520,
        486,
        496,
        390
      ],
      "cta": [
        64,
        900,
        430,
        116
      ],
      "brand": [
        64,
        54,
        430,
        64
      ],
      "kicker": [
        620,
        54,
        396,
        60
      ],
      "annotation": [
        520,
        872,
        496,
        36
      ],
      "headlineSize": 120,
      "bodySize": 34,
      "ctaSize": 32,
      "align": "left",
      "backgroundBox": [
        0,
        0,
        1080,
        1080
      ],
      "posterCta": [
        64,
        900,
        952,
        116
      ],
      "footer": true
    },
    "portrait": {
      "title": [
        64,
        184,
        952,
        680
      ],
      "body": [
        64,
        790,
        390,
        300
      ],
      "visual": [
        500,
        580,
        516,
        600
      ],
      "cta": [
        64,
        1180,
        390,
        116
      ],
      "brand": [
        64,
        54,
        430,
        64
      ],
      "kicker": [
        620,
        54,
        396,
        60
      ],
      "annotation": [
        520,
        1130,
        496,
        36
      ],
      "headlineSize": 132,
      "bodySize": 36,
      "ctaSize": 34,
      "align": "left",
      "backgroundBox": [
        0,
        0,
        1080,
        1350
      ],
      "posterCta": [
        64,
        1180,
        952,
        116
      ],
      "footer": true
    },
    "story": {
      "title": [
        80,
        300,
        920,
        720
      ],
      "body": [
        80,
        1120,
        480,
        330
      ],
      "visual": [
        580,
        900,
        420,
        700
      ],
      "cta": [
        80,
        1640,
        480,
        120
      ],
      "brand": [
        80,
        160,
        430,
        64
      ],
      "kicker": [
        640,
        160,
        360,
        60
      ],
      "annotation": [
        580,
        1590,
        420,
        36
      ],
      "headlineSize": 140,
      "bodySize": 40,
      "ctaSize": 36,
      "align": "left",
      "backgroundBox": [
        0,
        0,
        1080,
        1920
      ],
      "posterCta": [
        80,
        1640,
        920,
        120
      ],
      "footer": true
    },
    "landscape": {
      "title": [
        52,
        126,
        730,
        185
      ],
      "body": [
        52,
        330,
        520,
        100
      ],
      "visual": [
        670,
        122,
        358,
        300
      ],
      "cta": [
        52,
        437.2,
        520,
        76
      ],
      "brand": [
        52,
        44,
        430,
        48
      ],
      "kicker": [
        680,
        44,
        348,
        45
      ],
      "annotation": [
        680,
        400,
        348,
        30
      ],
      "headlineSize": 72,
      "bodySize": 24,
      "ctaSize": 26,
      "align": "left",
      "backgroundBox": [
        0,
        0,
        1080,
        565.2
      ],
      "posterCta": [
        52,
        437.2,
        976,
        76
      ],
      "footer": true
    }
  },
  "subject-right": {
    "square": {
      "title": [
        64,
        220,
        520,
        450
      ],
      "body": [
        64,
        620,
        520,
        170
      ],
      "visual": [
        630,
        180,
        386,
        710
      ],
      "cta": [
        64,
        220,
        520,
        796
      ],
      "brand": [
        64,
        54,
        430,
        64
      ],
      "kicker": [
        680,
        54,
        336,
        60
      ],
      "annotation": [
        630,
        912,
        386,
        36
      ],
      "headlineSize": 96,
      "bodySize": 30,
      "ctaSize": 30,
      "align": "left",
      "backgroundBox": [
        630,
        180,
        386,
        710
      ],
      "posterCta": [
        64,
        900,
        952,
        116
      ],
      "copyFlow": {
        "box": [
          64,
          220,
          520,
          796
        ],
        "headlineBodyGap": 32,
        "bodyCtaGap": 36
      }
    },
    "portrait": {
      "title": [
        64,
        280,
        520,
        510
      ],
      "body": [
        64,
        826,
        520,
        220
      ],
      "visual": [
        630,
        220,
        386,
        890
      ],
      "cta": [
        64,
        280,
        520,
        1016
      ],
      "brand": [
        64,
        54,
        430,
        64
      ],
      "kicker": [
        680,
        54,
        336,
        60
      ],
      "annotation": [
        630,
        1132,
        386,
        36
      ],
      "headlineSize": 96,
      "bodySize": 32,
      "ctaSize": 30,
      "align": "left",
      "backgroundBox": [
        630,
        220,
        386,
        890
      ],
      "posterCta": [
        64,
        1180,
        952,
        116
      ],
      "copyFlow": {
        "box": [
          64,
          280,
          520,
          1016
        ],
        "headlineBodyGap": 36,
        "bodyCtaGap": 40
      }
    },
    "story": {
      "title": [
        80,
        420,
        500,
        670
      ],
      "body": [
        80,
        1130,
        500,
        300
      ],
      "visual": [
        630,
        360,
        370,
        1200
      ],
      "cta": [
        80,
        420,
        500,
        1340
      ],
      "brand": [
        80,
        160,
        420,
        64
      ],
      "kicker": [
        650,
        160,
        350,
        60
      ],
      "annotation": [
        630,
        1590,
        370,
        36
      ],
      "headlineSize": 96,
      "bodySize": 36,
      "ctaSize": 32,
      "align": "left",
      "backgroundBox": [
        630,
        360,
        370,
        1200
      ],
      "posterCta": [
        80,
        1640,
        920,
        120
      ],
      "copyFlow": {
        "box": [
          80,
          420,
          500,
          1340
        ],
        "headlineBodyGap": 40,
        "bodyCtaGap": 44
      }
    },
    "landscape": {
      "title": [
        52,
        150,
        520,
        210
      ],
      "body": [
        52,
        372,
        520,
        120
      ],
      "visual": [
        650,
        116,
        378,
        350
      ],
      "cta": [
        52,
        150,
        520,
        363.2
      ],
      "brand": [
        52,
        44,
        420,
        48
      ],
      "kicker": [
        710,
        44,
        318,
        45
      ],
      "annotation": [
        650,
        477,
        378,
        28
      ],
      "headlineSize": 52,
      "bodySize": 24,
      "ctaSize": 24,
      "align": "left",
      "backgroundBox": [
        650,
        116,
        378,
        350
      ],
      "posterCta": [
        52,
        437.2,
        976,
        76
      ],
      "copyFlow": {
        "box": [
          52,
          150,
          520,
          363.2
        ],
        "headlineBodyGap": 22,
        "bodyCtaGap": 26
      }
    }
  },
  "image-lead": {
    "square": {
      "title": [
        64,
        596,
        952,
        220
      ],
      "body": [
        64,
        834,
        952,
        110
      ],
      "visual": [
        64,
        160,
        952,
        390
      ],
      "cta": [
        64,
        596,
        952,
        420
      ],
      "brand": [
        64,
        54,
        430,
        64
      ],
      "kicker": [
        680,
        54,
        336,
        60
      ],
      "annotation": [
        64,
        560,
        952,
        28
      ],
      "headlineSize": 92,
      "bodySize": 28,
      "ctaSize": 28,
      "align": "left",
      "backgroundBox": [
        64,
        160,
        952,
        390
      ],
      "posterCta": [
        64,
        900,
        952,
        116
      ],
      "copyFlow": {
        "box": [
          64,
          596,
          952,
          420
        ],
        "headlineBodyGap": 24,
        "bodyCtaGap": 28
      }
    },
    "portrait": {
      "title": [
        64,
        746,
        952,
        370
      ],
      "body": [
        64,
        1070,
        952,
        125
      ],
      "visual": [
        64,
        170,
        952,
        530
      ],
      "cta": [
        64,
        746,
        952,
        550
      ],
      "brand": [
        64,
        54,
        430,
        64
      ],
      "kicker": [
        680,
        54,
        336,
        60
      ],
      "annotation": [
        64,
        710,
        952,
        28
      ],
      "headlineSize": 108,
      "bodySize": 30,
      "ctaSize": 30,
      "align": "left",
      "backgroundBox": [
        64,
        170,
        952,
        530
      ],
      "posterCta": [
        64,
        1180,
        952,
        116
      ],
      "copyFlow": {
        "box": [
          64,
          746,
          952,
          550
        ],
        "headlineBodyGap": 26,
        "bodyCtaGap": 28
      }
    },
    "story": {
      "title": [
        80,
        1140,
        920,
        420
      ],
      "body": [
        80,
        1550,
        920,
        130
      ],
      "visual": [
        80,
        280,
        920,
        780
      ],
      "cta": [
        80,
        1140,
        920,
        620
      ],
      "brand": [
        80,
        160,
        420,
        64
      ],
      "kicker": [
        650,
        160,
        350,
        60
      ],
      "annotation": [
        80,
        1080,
        920,
        32
      ],
      "headlineSize": 120,
      "bodySize": 32,
      "ctaSize": 32,
      "align": "left",
      "backgroundBox": [
        80,
        280,
        920,
        780
      ],
      "posterCta": [
        80,
        1640,
        920,
        120
      ],
      "copyFlow": {
        "box": [
          80,
          1140,
          920,
          620
        ],
        "headlineBodyGap": 28,
        "bodyCtaGap": 32
      }
    },
    "landscape": {
      "title": [
        598,
        156,
        430,
        196
      ],
      "body": [
        598,
        370,
        430,
        98
      ],
      "visual": [
        52,
        126,
        494,
        387.2
      ],
      "cta": [
        598,
        156,
        430,
        357.2
      ],
      "brand": [
        52,
        44,
        430,
        48
      ],
      "kicker": [
        710,
        44,
        318,
        45
      ],
      "annotation": [
        598,
        118,
        430,
        26
      ],
      "headlineSize": 44,
      "bodySize": 20,
      "ctaSize": 22,
      "align": "left",
      "backgroundBox": [
        52,
        126,
        494,
        387.2
      ],
      "posterCta": [
        52,
        437.2,
        976,
        76
      ],
      "copyFlow": {
        "box": [
          598,
          156,
          430,
          357.2
        ],
        "headlineBodyGap": 20,
        "bodyCtaGap": 24
      }
    }
  },
  "centered-announcement": {
    "square": {
      "title": [
        160,
        280,
        760,
        420
      ],
      "body": [
        200,
        660,
        680,
        190
      ],
      "visual": [
        440,
        214,
        200,
        50
      ],
      "cta": [
        200,
        280,
        680,
        736
      ],
      "brand": [
        180,
        70,
        720,
        64
      ],
      "kicker": [
        180,
        150,
        720,
        54
      ],
      "annotation": [
        200,
        920,
        680,
        30
      ],
      "headlineSize": 100,
      "bodySize": 30,
      "ctaSize": 30,
      "align": "center",
      "backgroundBox": [
        0,
        0,
        1080,
        1080
      ],
      "posterCta": [
        64,
        900,
        952,
        116
      ],
      "copyFlow": {
        "box": [
          160,
          280,
          760,
          736
        ],
        "headlineBodyGap": 40,
        "bodyCtaGap": 40
      }
    },
    "portrait": {
      "title": [
        140,
        360,
        800,
        580
      ],
      "body": [
        200,
        824,
        680,
        240
      ],
      "visual": [
        420,
        250,
        240,
        80
      ],
      "cta": [
        200,
        360,
        680,
        936
      ],
      "brand": [
        180,
        100,
        720,
        64
      ],
      "kicker": [
        180,
        184,
        720,
        54
      ],
      "annotation": [
        200,
        1190,
        680,
        30
      ],
      "headlineSize": 120,
      "bodySize": 32,
      "ctaSize": 32,
      "align": "center",
      "backgroundBox": [
        0,
        0,
        1080,
        1350
      ],
      "posterCta": [
        64,
        1180,
        952,
        116
      ],
      "copyFlow": {
        "box": [
          140,
          360,
          800,
          936
        ],
        "headlineBodyGap": 44,
        "bodyCtaGap": 44
      }
    },
    "story": {
      "title": [
        120,
        540,
        840,
        580
      ],
      "body": [
        180,
        1168,
        720,
        300
      ],
      "visual": [
        400,
        410,
        280,
        100
      ],
      "cta": [
        180,
        540,
        720,
        1220
      ],
      "brand": [
        180,
        220,
        720,
        64
      ],
      "kicker": [
        180,
        304,
        720,
        54
      ],
      "annotation": [
        180,
        1660,
        720,
        32
      ],
      "headlineSize": 128,
      "bodySize": 36,
      "ctaSize": 34,
      "align": "center",
      "backgroundBox": [
        0,
        0,
        1080,
        1920
      ],
      "posterCta": [
        80,
        1640,
        920,
        120
      ],
      "copyFlow": {
        "box": [
          120,
          540,
          840,
          1220
        ],
        "headlineBodyGap": 48,
        "bodyCtaGap": 48
      }
    },
    "landscape": {
      "title": [
        160,
        154,
        760,
        190
      ],
      "body": [
        200,
        368,
        680,
        100
      ],
      "visual": [
        460,
        414,
        160,
        50
      ],
      "cta": [
        200,
        154,
        680,
        359.2
      ],
      "brand": [
        180,
        44,
        720,
        48
      ],
      "kicker": [
        180,
        104,
        720,
        34
      ],
      "annotation": [
        200,
        478,
        680,
        26
      ],
      "headlineSize": 64,
      "bodySize": 24,
      "ctaSize": 24,
      "align": "center",
      "backgroundBox": [
        0,
        0,
        1080,
        565.2
      ],
      "posterCta": [
        52,
        437.2,
        976,
        76
      ],
      "copyFlow": {
        "box": [
          160,
          154,
          760,
          359.2
        ],
        "headlineBodyGap": 20,
        "bodyCtaGap": 24
      }
    }
  },
  "service-sheet": {
    "square": {
      "title": [
        64,
        190,
        952,
        420
      ],
      "body": [
        64,
        500,
        570,
        310
      ],
      "visual": [
        710,
        536,
        306,
        320
      ],
      "cta": [
        64,
        190,
        570,
        826
      ],
      "brand": [
        64,
        54,
        430,
        64
      ],
      "kicker": [
        680,
        54,
        336,
        60
      ],
      "annotation": [
        710,
        878,
        306,
        36
      ],
      "headlineSize": 108,
      "bodySize": 36,
      "ctaSize": 30,
      "align": "left",
      "backgroundBox": [
        710,
        536,
        306,
        320
      ],
      "posterCta": [
        64,
        900,
        952,
        116
      ],
      "copyFlow": {
        "box": [
          64,
          190,
          570,
          826
        ],
        "headlineBodyGap": 48,
        "bodyCtaGap": 44
      }
    },
    "portrait": {
      "title": [
        64,
        240,
        952,
        430
      ],
      "body": [
        64,
        638,
        580,
        400
      ],
      "visual": [
        710,
        694,
        306,
        410
      ],
      "cta": [
        64,
        240,
        580,
        1056
      ],
      "brand": [
        64,
        54,
        430,
        64
      ],
      "kicker": [
        680,
        54,
        336,
        60
      ],
      "annotation": [
        710,
        1128,
        306,
        36
      ],
      "headlineSize": 124,
      "bodySize": 40,
      "ctaSize": 32,
      "align": "left",
      "backgroundBox": [
        710,
        694,
        306,
        410
      ],
      "posterCta": [
        64,
        1180,
        952,
        116
      ],
      "copyFlow": {
        "box": [
          64,
          240,
          580,
          1056
        ],
        "headlineBodyGap": 48,
        "bodyCtaGap": 48
      }
    },
    "story": {
      "title": [
        80,
        380,
        920,
        680
      ],
      "body": [
        80,
        912,
        560,
        610
      ],
      "visual": [
        700,
        982,
        300,
        580
      ],
      "cta": [
        80,
        380,
        560,
        1380
      ],
      "brand": [
        80,
        160,
        420,
        64
      ],
      "kicker": [
        650,
        160,
        350,
        60
      ],
      "annotation": [
        700,
        1588,
        300,
        36
      ],
      "headlineSize": 140,
      "bodySize": 44,
      "ctaSize": 34,
      "align": "left",
      "backgroundBox": [
        700,
        982,
        300,
        580
      ],
      "posterCta": [
        80,
        1640,
        920,
        120
      ],
      "copyFlow": {
        "box": [
          80,
          380,
          560,
          1380
        ],
        "headlineBodyGap": 52,
        "bodyCtaGap": 48
      }
    },
    "landscape": {
      "title": [
        52,
        144,
        560,
        210
      ],
      "body": [
        52,
        144,
        560,
        160
      ],
      "visual": [
        650,
        126,
        378,
        387.2
      ],
      "cta": [
        52,
        144,
        560,
        369.2
      ],
      "brand": [
        52,
        44,
        430,
        48
      ],
      "kicker": [
        710,
        44,
        318,
        45
      ],
      "annotation": [
        52,
        485,
        560,
        26
      ],
      "headlineSize": 56,
      "bodySize": 23,
      "ctaSize": 24,
      "align": "left",
      "backgroundBox": [
        650,
        126,
        378,
        387.2
      ],
      "posterCta": [
        52,
        437.2,
        976,
        76
      ],
      "copyFlow": {
        "box": [
          52,
          144,
          560,
          369.2
        ],
        "bodyCtaGap": 24,
        "headlineBodyGap": 20
      }
    }
  },
  "subject-left": {
    "square": {
      "title": [
        510,
        220,
        506,
        500
      ],
      "body": [
        510,
        580,
        506,
        300
      ],
      "visual": [
        64,
        230,
        390,
        640
      ],
      "cta": [
        510,
        220,
        506,
        796
      ],
      "brand": [
        64,
        54,
        430,
        64
      ],
      "kicker": [
        620,
        54,
        396,
        60
      ],
      "annotation": [
        510,
        180,
        506,
        36
      ],
      "headlineSize": 80,
      "bodySize": 28,
      "ctaSize": 28,
      "align": "left",
      "backgroundBox": [
        64,
        230,
        390,
        640
      ],
      "posterCta": [
        64,
        900,
        952,
        116
      ],
      "copyFlow": {
        "box": [
          510,
          220,
          506,
          796
        ],
        "headlineBodyGap": 28,
        "bodyCtaGap": 28
      }
    },
    "portrait": {
      "title": [
        510,
        280,
        506,
        650
      ],
      "body": [
        510,
        720,
        506,
        340
      ],
      "visual": [
        64,
        250,
        390,
        860
      ],
      "cta": [
        510,
        280,
        506,
        1016
      ],
      "brand": [
        64,
        54,
        430,
        64
      ],
      "kicker": [
        620,
        54,
        396,
        60
      ],
      "annotation": [
        510,
        240,
        506,
        36
      ],
      "headlineSize": 96,
      "bodySize": 30,
      "ctaSize": 28,
      "align": "left",
      "backgroundBox": [
        64,
        250,
        390,
        860
      ],
      "posterCta": [
        64,
        1170,
        952,
        116
      ],
      "copyFlow": {
        "box": [
          510,
          280,
          506,
          1016
        ],
        "headlineBodyGap": 28,
        "bodyCtaGap": 28
      }
    },
    "story": {
      "title": [
        480,
        420,
        520,
        700
      ],
      "body": [
        480,
        1080,
        520,
        440
      ],
      "visual": [
        80,
        450,
        370,
        1110
      ],
      "cta": [
        480,
        420,
        520,
        1340
      ],
      "brand": [
        80,
        170,
        430,
        64
      ],
      "kicker": [
        620,
        170,
        380,
        60
      ],
      "annotation": [
        510,
        380,
        490,
        36
      ],
      "headlineSize": 96,
      "bodySize": 34,
      "ctaSize": 30,
      "align": "left",
      "backgroundBox": [
        80,
        450,
        370,
        1110
      ],
      "posterCta": [
        80,
        1644,
        920,
        116
      ],
      "copyFlow": {
        "box": [
          480,
          420,
          520,
          1340
        ],
        "headlineBodyGap": 28,
        "bodyCtaGap": 28
      }
    },
    "landscape": {
      "title": [
        550,
        126,
        478,
        250
      ],
      "body": [
        550,
        320,
        478,
        180
      ],
      "visual": [
        52,
        126,
        446,
        387.2
      ],
      "cta": [
        550,
        126,
        478,
        387.2
      ],
      "brand": [
        52,
        44,
        430,
        48
      ],
      "kicker": [
        710,
        44,
        318,
        45
      ],
      "annotation": [
        550,
        104,
        478,
        26
      ],
      "headlineSize": 52,
      "bodySize": 23,
      "ctaSize": 24,
      "align": "left",
      "backgroundBox": [
        52,
        126,
        446,
        387.2
      ],
      "posterCta": [
        52,
        437.20000000000005,
        976,
        76
      ],
      "copyFlow": {
        "box": [
          550,
          126,
          478,
          387.2
        ],
        "headlineBodyGap": 20,
        "bodyCtaGap": 20
      }
    }
  },
  "image-footer": {
    "square": {
      "title": [
        64,
        170,
        952,
        280
      ],
      "body": [
        64,
        420,
        952,
        150
      ],
      "visual": [
        64,
        650,
        952,
        366
      ],
      "cta": [
        64,
        170,
        952,
        430
      ],
      "brand": [
        64,
        54,
        430,
        64
      ],
      "kicker": [
        620,
        54,
        396,
        60
      ],
      "annotation": [
        64,
        130,
        952,
        36
      ],
      "headlineSize": 88,
      "bodySize": 30,
      "ctaSize": 28,
      "align": "left",
      "backgroundBox": [
        64,
        650,
        952,
        366
      ],
      "posterCta": [
        64,
        900,
        952,
        116
      ],
      "copyFlow": {
        "box": [
          64,
          170,
          952,
          430
        ],
        "headlineBodyGap": 28,
        "bodyCtaGap": 28
      }
    },
    "portrait": {
      "title": [
        64,
        190,
        952,
        300
      ],
      "body": [
        64,
        470,
        952,
        180
      ],
      "visual": [
        64,
        740,
        952,
        556
      ],
      "cta": [
        64,
        190,
        952,
        510
      ],
      "brand": [
        64,
        54,
        430,
        64
      ],
      "kicker": [
        620,
        54,
        396,
        60
      ],
      "annotation": [
        64,
        150,
        952,
        36
      ],
      "headlineSize": 96,
      "bodySize": 32,
      "ctaSize": 30,
      "align": "left",
      "backgroundBox": [
        64,
        740,
        952,
        556
      ],
      "posterCta": [
        64,
        1170,
        952,
        116
      ],
      "copyFlow": {
        "box": [
          64,
          190,
          952,
          510
        ],
        "headlineBodyGap": 28,
        "bodyCtaGap": 28
      }
    },
    "story": {
      "title": [
        80,
        340,
        920,
        430
      ],
      "body": [
        80,
        780,
        920,
        230
      ],
      "visual": [
        80,
        1130,
        920,
        630
      ],
      "cta": [
        80,
        340,
        920,
        690
      ],
      "brand": [
        80,
        170,
        430,
        64
      ],
      "kicker": [
        620,
        170,
        380,
        60
      ],
      "annotation": [
        80,
        300,
        920,
        36
      ],
      "headlineSize": 112,
      "bodySize": 36,
      "ctaSize": 32,
      "align": "left",
      "backgroundBox": [
        80,
        1130,
        920,
        630
      ],
      "posterCta": [
        80,
        1644,
        920,
        116
      ],
      "copyFlow": {
        "box": [
          80,
          340,
          920,
          690
        ],
        "headlineBodyGap": 28,
        "bodyCtaGap": 28
      }
    },
    "landscape": {
      "title": [
        52,
        126,
        976,
        130
      ],
      "body": [
        52,
        276,
        430,
        160
      ],
      "visual": [
        550,
        260,
        478,
        253.2
      ],
      "cta": [
        52,
        276,
        430,
        237.2
      ],
      "brand": [
        52,
        44,
        430,
        48
      ],
      "kicker": [
        710,
        44,
        318,
        45
      ],
      "annotation": [
        52,
        236,
        430,
        26
      ],
      "headlineSize": 52,
      "bodySize": 23,
      "ctaSize": 22,
      "align": "left",
      "backgroundBox": [
        550,
        260,
        478,
        253.2
      ],
      "posterCta": [
        52,
        437.20000000000005,
        976,
        76
      ],
      "footer": true
    }
  },
  "framed-focus": {
    "square": {
      "title": [
        64,
        180,
        952,
        220
      ],
      "body": [
        160,
        790,
        760,
        120
      ],
      "visual": [
        180,
        440,
        720,
        300
      ],
      "cta": [
        160,
        922,
        760,
        94
      ],
      "brand": [
        64,
        54,
        430,
        64
      ],
      "kicker": [
        620,
        54,
        396,
        60
      ],
      "annotation": [
        160,
        882,
        760,
        36
      ],
      "headlineSize": 96,
      "bodySize": 28,
      "ctaSize": 28,
      "align": "center",
      "backgroundBox": [
        180,
        440,
        720,
        300
      ],
      "posterCta": [
        64,
        900,
        952,
        116
      ],
      "footer": true,
      "backgroundFit": "contain"
    },
    "portrait": {
      "title": [
        64,
        200,
        952,
        260
      ],
      "body": [
        160,
        1010,
        760,
        170
      ],
      "visual": [
        180,
        510,
        720,
        430
      ],
      "cta": [
        160,
        1200,
        760,
        96
      ],
      "brand": [
        64,
        54,
        430,
        64
      ],
      "kicker": [
        620,
        54,
        396,
        60
      ],
      "annotation": [
        160,
        1160,
        760,
        36
      ],
      "headlineSize": 96,
      "bodySize": 30,
      "ctaSize": 30,
      "align": "center",
      "backgroundBox": [
        180,
        510,
        720,
        430
      ],
      "posterCta": [
        64,
        1170,
        952,
        116
      ],
      "footer": true,
      "backgroundFit": "contain"
    },
    "story": {
      "title": [
        80,
        340,
        920,
        380
      ],
      "body": [
        140,
        1440,
        800,
        180
      ],
      "visual": [
        180,
        760,
        720,
        600
      ],
      "cta": [
        140,
        1640,
        800,
        120
      ],
      "brand": [
        80,
        170,
        430,
        64
      ],
      "kicker": [
        620,
        170,
        380,
        60
      ],
      "annotation": [
        140,
        1600,
        800,
        36
      ],
      "headlineSize": 104,
      "bodySize": 34,
      "ctaSize": 32,
      "align": "center",
      "backgroundBox": [
        180,
        760,
        720,
        600
      ],
      "posterCta": [
        80,
        1644,
        920,
        116
      ],
      "footer": true,
      "backgroundFit": "contain"
    },
    "landscape": {
      "title": [
        52,
        126,
        540,
        195
      ],
      "body": [
        52,
        335,
        540,
        105
      ],
      "visual": [
        650,
        126,
        378,
        387.2
      ],
      "cta": [
        52,
        450,
        540,
        63.2
      ],
      "brand": [
        52,
        44,
        430,
        48
      ],
      "kicker": [
        710,
        44,
        318,
        45
      ],
      "annotation": [
        52,
        410,
        540,
        26
      ],
      "headlineSize": 56,
      "bodySize": 23,
      "ctaSize": 22,
      "align": "left",
      "backgroundBox": [
        650,
        126,
        378,
        387.2
      ],
      "posterCta": [
        52,
        437.20000000000005,
        976,
        76
      ],
      "footer": true,
      "backgroundFit": "contain"
    }
  },
  "type-led": {
    "square": {
      "title": [
        64,
        180,
        952,
        570
      ],
      "body": [
        64,
        780,
        620,
        180
      ],
      "visual": [
        770,
        760,
        246,
        230
      ],
      "cta": [
        64,
        940,
        620,
        76
      ],
      "brand": [
        64,
        54,
        430,
        64
      ],
      "kicker": [
        620,
        54,
        396,
        60
      ],
      "annotation": [
        64,
        900,
        620,
        36
      ],
      "headlineSize": 128,
      "bodySize": 32,
      "ctaSize": 26,
      "align": "left",
      "backgroundBox": [
        770,
        760,
        246,
        230
      ],
      "posterCta": [
        64,
        900,
        952,
        116
      ],
      "footer": true
    },
    "portrait": {
      "title": [
        64,
        220,
        952,
        650
      ],
      "body": [
        64,
        950,
        620,
        190
      ],
      "visual": [
        770,
        950,
        246,
        220
      ],
      "cta": [
        64,
        1200,
        620,
        96
      ],
      "brand": [
        64,
        54,
        430,
        64
      ],
      "kicker": [
        620,
        54,
        396,
        60
      ],
      "annotation": [
        64,
        1160,
        620,
        36
      ],
      "headlineSize": 144,
      "bodySize": 34,
      "ctaSize": 28,
      "align": "left",
      "backgroundBox": [
        770,
        950,
        246,
        220
      ],
      "posterCta": [
        64,
        1170,
        952,
        116
      ],
      "footer": true
    },
    "story": {
      "title": [
        80,
        370,
        920,
        800
      ],
      "body": [
        80,
        1300,
        600,
        250
      ],
      "visual": [
        750,
        1330,
        250,
        250
      ],
      "cta": [
        80,
        1640,
        600,
        120
      ],
      "brand": [
        80,
        170,
        430,
        64
      ],
      "kicker": [
        620,
        170,
        380,
        60
      ],
      "annotation": [
        80,
        1630,
        600,
        36
      ],
      "headlineSize": 160,
      "bodySize": 38,
      "ctaSize": 30,
      "align": "left",
      "backgroundBox": [
        750,
        1330,
        250,
        250
      ],
      "posterCta": [
        80,
        1644,
        920,
        116
      ],
      "footer": true
    },
    "landscape": {
      "title": [
        52,
        126,
        976,
        225
      ],
      "body": [
        52,
        360,
        640,
        90
      ],
      "visual": [
        820,
        335,
        208,
        178.2
      ],
      "cta": [
        52,
        450,
        640,
        63.2
      ],
      "brand": [
        52,
        44,
        430,
        48
      ],
      "kicker": [
        710,
        44,
        318,
        45
      ],
      "annotation": [
        52,
        410,
        640,
        26
      ],
      "headlineSize": 80,
      "bodySize": 23,
      "ctaSize": 22,
      "align": "left",
      "backgroundBox": [
        820,
        335,
        208,
        178.2
      ],
      "posterCta": [
        52,
        437.20000000000005,
        976,
        76
      ],
      "footer": true
    }
  },
  "offset-grid": {
    "square": {
      "title": [
        64,
        170,
        952,
        270
      ],
      "body": [
        610,
        550,
        406,
        240
      ],
      "visual": [
        64,
        540,
        460,
        440
      ],
      "cta": [
        610,
        850,
        406,
        166
      ],
      "brand": [
        64,
        54,
        430,
        64
      ],
      "kicker": [
        620,
        54,
        396,
        60
      ],
      "annotation": [
        610,
        810,
        406,
        36
      ],
      "headlineSize": 96,
      "bodySize": 28,
      "ctaSize": 24,
      "align": "left",
      "backgroundBox": [
        64,
        540,
        460,
        440
      ],
      "posterCta": [
        64,
        900,
        952,
        116
      ],
      "footer": true
    },
    "portrait": {
      "title": [
        64,
        210,
        952,
        400
      ],
      "body": [
        610,
        750,
        406,
        300
      ],
      "visual": [
        64,
        720,
        460,
        520
      ],
      "cta": [
        610,
        1140,
        406,
        156
      ],
      "brand": [
        64,
        54,
        430,
        64
      ],
      "kicker": [
        620,
        54,
        396,
        60
      ],
      "annotation": [
        610,
        1100,
        406,
        36
      ],
      "headlineSize": 112,
      "bodySize": 30,
      "ctaSize": 26,
      "align": "left",
      "backgroundBox": [
        64,
        720,
        460,
        520
      ],
      "posterCta": [
        64,
        1170,
        952,
        116
      ],
      "footer": true
    },
    "story": {
      "title": [
        80,
        350,
        920,
        580
      ],
      "body": [
        600,
        1080,
        400,
        380
      ],
      "visual": [
        80,
        1020,
        440,
        690
      ],
      "cta": [
        600,
        1580,
        400,
        180
      ],
      "brand": [
        80,
        170,
        430,
        64
      ],
      "kicker": [
        620,
        170,
        380,
        60
      ],
      "annotation": [
        600,
        1540,
        400,
        36
      ],
      "headlineSize": 128,
      "bodySize": 34,
      "ctaSize": 28,
      "align": "left",
      "backgroundBox": [
        80,
        1020,
        440,
        690
      ],
      "posterCta": [
        80,
        1644,
        920,
        116
      ],
      "footer": true
    },
    "landscape": {
      "title": [
        52,
        126,
        976,
        130
      ],
      "body": [
        530,
        300,
        498,
        120
      ],
      "visual": [
        52,
        300,
        410,
        213.2
      ],
      "cta": [
        530,
        430,
        498,
        83.2
      ],
      "brand": [
        52,
        44,
        430,
        48
      ],
      "kicker": [
        710,
        44,
        318,
        45
      ],
      "annotation": [
        530,
        390,
        498,
        26
      ],
      "headlineSize": 52,
      "bodySize": 23,
      "ctaSize": 22,
      "align": "left",
      "backgroundBox": [
        52,
        300,
        410,
        213.2
      ],
      "posterCta": [
        52,
        437.20000000000005,
        976,
        76
      ],
      "footer": true
    }
  }
};
function freeze3(v) {
  if (v && typeof v === "object") {
    Object.values(v).forEach(freeze3);
    Object.freeze(v);
  }
  return v;
}
freeze3(TEMPLATE_GEOMETRY);
var TEMPLATE_RESOURCES = freeze3({
  "bold-backdrop": {
    "id": "bold-backdrop",
    "version": 1,
    "sha256": "759a7b7156a27849caf0ff61db7c432c53b145d0f21931c4548f3b348021f217"
  },
  "subject-right": {
    "id": "subject-right",
    "version": 1,
    "sha256": "781426bb8ae8134eb8bf25af0d145706bd6612d46dd7431a4f34505e4c03b8d3"
  },
  "image-lead": {
    "id": "image-lead",
    "version": 1,
    "sha256": "14e1405bb51992122b1cfff24421822cdf3d213e32cfc75e2ef55065f31c0e4b"
  },
  "centered-announcement": {
    "id": "centered-announcement",
    "version": 1,
    "sha256": "04bf9e4e152a7efbad7dda59de05e0f4563d3bb645dca436804afc1c49b642c7"
  },
  "service-sheet": {
    "id": "service-sheet",
    "version": 1,
    "sha256": "68fcd13a7d284f79d8eb29f26d2fa2235db676d24455c28d827c395817d347d8"
  },
  "subject-left": {
    "id": "subject-left",
    "version": 1,
    "sha256": "873beafbbb1b645a2060253e8183323caada7f79e7e18ba31967351a04e9b839"
  },
  "image-footer": {
    "id": "image-footer",
    "version": 1,
    "sha256": "8e549c87f1c14d1a3ffbf2beb1b43a74535a1d324b044b6e05071cbfb7a02e6e"
  },
  "framed-focus": {
    "id": "framed-focus",
    "version": 1,
    "sha256": "40a4a53c4e88f910f51d0af70e06c945022615c90a3924a4c475265847de5935"
  },
  "type-led": {
    "id": "type-led",
    "version": 1,
    "sha256": "cb6d39fb0e64d9e03ffe4f2eac5d6000f61c6dcf06b50ff478bbbf024a681596"
  },
  "offset-grid": {
    "id": "offset-grid",
    "version": 1,
    "sha256": "0dc37929f62356b4ffabc0d864643b075f86f9898242bb3a83f1ae1111c34159"
  }
});
function templatePlan(id, format = "square", density = "balanced") {
  if (!Object.hasOwn(TEMPLATE_GEOMETRY, id) || !Object.hasOwn(TEMPLATE_GEOMETRY[id], format)) throw Error("Choose a supported template and format.");
  if (!["compact", "balanced", "generous"].includes(density)) throw Error("Choose supported composition spacing.");
  const p = JSON.parse(JSON.stringify(TEMPLATE_GEOMETRY[id][format]));
  p.density = density;
  p.leading = density === "compact" ? 1.02 : density === "generous" ? 1.16 : 1.08;
  return p;
}
function templateFlowPlan(plan3, { headlineHeight, bodyHeight = 0, hasBody = bodyHeight > 0, ctaHeight = 0, ctaWidth = "fit" }) {
  const f = plan3.copyFlow, headlineBottom = plan3.title[1] + headlineHeight, bodyY = f ? headlineBottom + (hasBody ? f.headlineBodyGap : 0) : plan3.body[1];
  const box = ctaWidth === "poster" ? plan3.posterCta : plan3.cta;
  const ctaY = ctaWidth === "poster" || plan3.footer ? box[1] + box[3] - ctaHeight : f ? (hasBody ? bodyY + bodyHeight : headlineBottom) + f.bodyCtaGap : plan3.cta[1];
  return { bodyY, ctaY };
}

// src/font-passports-v3.js
var BUNDLED_FONT_METADATA = {
  "league-spartan-latin-wght-normal.woff2": {
    "sha256": "7d843a9fa4dcd050da68405d9093f8ab8298f8f60a97155e85ab84c9ed3040e2",
    "coverage": [
      [
        32,
        126
      ],
      [
        160,
        255
      ],
      [
        258,
        258
      ],
      [
        305,
        305
      ],
      [
        338,
        339
      ],
      [
        700,
        700
      ],
      [
        710,
        710
      ],
      [
        730,
        730
      ],
      [
        732,
        732
      ],
      [
        768,
        769
      ],
      [
        771,
        772
      ],
      [
        776,
        777
      ],
      [
        803,
        803
      ],
      [
        8211,
        8212
      ],
      [
        8216,
        8218
      ],
      [
        8220,
        8222
      ],
      [
        8226,
        8226
      ],
      [
        8230,
        8230
      ],
      [
        8249,
        8250
      ],
      [
        8260,
        8260
      ],
      [
        8364,
        8364
      ],
      [
        8482,
        8482
      ],
      [
        8722,
        8722
      ],
      [
        8725,
        8725
      ]
    ]
  },
  "source-sans-3-latin-wght-normal.woff2": {
    "sha256": "7a19a7027e125257d310c6dbd78ae3a30b5ea1e3794d60b12bb28227a003bfda",
    "coverage": [
      [
        32,
        126
      ],
      [
        160,
        255
      ],
      [
        305,
        305
      ],
      [
        338,
        339
      ],
      [
        699,
        700
      ],
      [
        710,
        710
      ],
      [
        730,
        730
      ],
      [
        732,
        732
      ],
      [
        768,
        769
      ],
      [
        771,
        772
      ],
      [
        776,
        777
      ],
      [
        803,
        803
      ],
      [
        809,
        809
      ],
      [
        8201,
        8201
      ],
      [
        8203,
        8203
      ],
      [
        8211,
        8212
      ],
      [
        8216,
        8218
      ],
      [
        8220,
        8222
      ],
      [
        8226,
        8226
      ],
      [
        8230,
        8230
      ],
      [
        8242,
        8243
      ],
      [
        8249,
        8250
      ],
      [
        8260,
        8260
      ],
      [
        8364,
        8364
      ],
      [
        8482,
        8482
      ],
      [
        8593,
        8593
      ],
      [
        8595,
        8595
      ],
      [
        8722,
        8722
      ],
      [
        8725,
        8725
      ],
      [
        65279,
        65279
      ]
    ]
  },
  "barlow-condensed-latin-800-normal.woff2": {
    "sha256": "2515494e8cc2ca07c86ea78766cfa104b796aa6ed5d66821c01d51dbb0b52bce",
    "coverage": [
      [
        32,
        126
      ],
      [
        160,
        255
      ],
      [
        305,
        305
      ],
      [
        338,
        339
      ],
      [
        699,
        700
      ],
      [
        710,
        710
      ],
      [
        730,
        730
      ],
      [
        732,
        732
      ],
      [
        768,
        769
      ],
      [
        771,
        772
      ],
      [
        776,
        777
      ],
      [
        803,
        803
      ],
      [
        8211,
        8212
      ],
      [
        8216,
        8218
      ],
      [
        8220,
        8222
      ],
      [
        8226,
        8226
      ],
      [
        8230,
        8230
      ],
      [
        8242,
        8243
      ],
      [
        8249,
        8250
      ],
      [
        8260,
        8260
      ],
      [
        8364,
        8364
      ],
      [
        8482,
        8482
      ],
      [
        8722,
        8722
      ],
      [
        8725,
        8725
      ]
    ]
  },
  "archivo-latin-wght-normal.woff2": {
    "sha256": "8f704806dbedeaaeca334b11ec348bc3ac3a439d6431544b3afb54f534ee4967",
    "coverage": [
      [
        32,
        126
      ],
      [
        160,
        255
      ],
      [
        258,
        258
      ],
      [
        305,
        305
      ],
      [
        338,
        339
      ],
      [
        700,
        700
      ],
      [
        710,
        710
      ],
      [
        730,
        730
      ],
      [
        732,
        732
      ],
      [
        768,
        769
      ],
      [
        771,
        772
      ],
      [
        776,
        777
      ],
      [
        803,
        803
      ],
      [
        8201,
        8201
      ],
      [
        8211,
        8212
      ],
      [
        8216,
        8218
      ],
      [
        8220,
        8222
      ],
      [
        8226,
        8226
      ],
      [
        8230,
        8230
      ],
      [
        8242,
        8243
      ],
      [
        8249,
        8250
      ],
      [
        8260,
        8260
      ],
      [
        8364,
        8364
      ],
      [
        8482,
        8482
      ],
      [
        8593,
        8593
      ],
      [
        8595,
        8595
      ],
      [
        8722,
        8722
      ],
      [
        8725,
        8725
      ],
      [
        65279,
        65279
      ]
    ]
  },
  "manrope-latin-wght-normal.woff2": {
    "sha256": "a30ddcd349703aff7464c34bef3fffdff405ee50c113440d7c8693c02d210972",
    "coverage": [
      [
        32,
        126
      ],
      [
        160,
        255
      ],
      [
        258,
        258
      ],
      [
        305,
        305
      ],
      [
        338,
        339
      ],
      [
        710,
        710
      ],
      [
        730,
        730
      ],
      [
        732,
        732
      ],
      [
        8211,
        8212
      ],
      [
        8216,
        8218
      ],
      [
        8220,
        8222
      ],
      [
        8226,
        8226
      ],
      [
        8230,
        8230
      ],
      [
        8249,
        8250
      ],
      [
        8260,
        8260
      ],
      [
        8364,
        8364
      ],
      [
        8482,
        8482
      ],
      [
        8593,
        8593
      ],
      [
        8595,
        8595
      ],
      [
        8722,
        8722
      ],
      [
        8725,
        8725
      ]
    ]
  }
};

// src/font-passports-template.js
var TEMPLATE_FONT_METADATA = {
  "lora-latin-wght-normal.woff2": {
    "sha256": "ddb8c66035104e233fc024669183aad3738b6daa16deee2ebb1241bd0f98ace1",
    "coverage": [
      [
        13,
        13
      ],
      [
        32,
        126
      ],
      [
        160,
        172
      ],
      [
        174,
        255
      ],
      [
        258,
        258
      ],
      [
        305,
        305
      ],
      [
        338,
        339
      ],
      [
        699,
        700
      ],
      [
        710,
        710
      ],
      [
        730,
        730
      ],
      [
        732,
        732
      ],
      [
        768,
        769
      ],
      [
        771,
        772
      ],
      [
        776,
        777
      ],
      [
        803,
        803
      ],
      [
        8211,
        8212
      ],
      [
        8216,
        8218
      ],
      [
        8220,
        8222
      ],
      [
        8226,
        8226
      ],
      [
        8230,
        8230
      ],
      [
        8242,
        8243
      ],
      [
        8249,
        8250
      ],
      [
        8260,
        8260
      ],
      [
        8364,
        8364
      ],
      [
        8482,
        8482
      ],
      [
        8722,
        8722
      ],
      [
        8725,
        8725
      ]
    ],
    "bytes": 37788
  },
  "space-grotesk-latin-wght-normal.woff2": {
    "sha256": "0640890476fc1198ab4de571fb658de443c4d85b66466ec09534a8737ab1ce9d",
    "coverage": [
      [
        13,
        13
      ],
      [
        32,
        126
      ],
      [
        160,
        255
      ],
      [
        305,
        305
      ],
      [
        338,
        339
      ],
      [
        699,
        700
      ],
      [
        710,
        710
      ],
      [
        730,
        730
      ],
      [
        732,
        732
      ],
      [
        768,
        769
      ],
      [
        771,
        772
      ],
      [
        776,
        777
      ],
      [
        803,
        803
      ],
      [
        8201,
        8201
      ],
      [
        8203,
        8203
      ],
      [
        8211,
        8212
      ],
      [
        8216,
        8218
      ],
      [
        8220,
        8222
      ],
      [
        8226,
        8226
      ],
      [
        8230,
        8230
      ],
      [
        8242,
        8243
      ],
      [
        8249,
        8250
      ],
      [
        8260,
        8260
      ],
      [
        8364,
        8364
      ],
      [
        8482,
        8482
      ],
      [
        8593,
        8593
      ],
      [
        8595,
        8595
      ],
      [
        8722,
        8722
      ],
      [
        8725,
        8725
      ]
    ],
    "bytes": 22288
  },
  "dm-sans-latin-wght-normal.woff2": {
    "sha256": "9fea608a947e67020c33cad9a6fe3d60c54119dfb8cff87768a8117a15ed7543",
    "coverage": [
      [
        13,
        13
      ],
      [
        32,
        126
      ],
      [
        160,
        172
      ],
      [
        174,
        255
      ],
      [
        258,
        258
      ],
      [
        305,
        305
      ],
      [
        338,
        339
      ],
      [
        710,
        710
      ],
      [
        730,
        730
      ],
      [
        732,
        732
      ],
      [
        768,
        769
      ],
      [
        771,
        772
      ],
      [
        776,
        776
      ],
      [
        8211,
        8212
      ],
      [
        8216,
        8218
      ],
      [
        8220,
        8222
      ],
      [
        8226,
        8226
      ],
      [
        8230,
        8230
      ],
      [
        8249,
        8250
      ],
      [
        8260,
        8260
      ],
      [
        8364,
        8364
      ],
      [
        8482,
        8482
      ],
      [
        8593,
        8593
      ],
      [
        8595,
        8595
      ],
      [
        8722,
        8722
      ],
      [
        8725,
        8725
      ]
    ],
    "bytes": 36932
  },
  "oswald-latin-wght-normal.woff2": {
    "sha256": "bd73278ee0c50041b91b4c03d1229e35b501637f46b6409e7da2d3a758446ea5",
    "coverage": [
      [
        13,
        13
      ],
      [
        32,
        126
      ],
      [
        160,
        172
      ],
      [
        174,
        255
      ],
      [
        258,
        258
      ],
      [
        305,
        305
      ],
      [
        338,
        339
      ],
      [
        699,
        700
      ],
      [
        710,
        710
      ],
      [
        730,
        730
      ],
      [
        732,
        732
      ],
      [
        768,
        769
      ],
      [
        771,
        772
      ],
      [
        776,
        777
      ],
      [
        803,
        803
      ],
      [
        8211,
        8212
      ],
      [
        8216,
        8218
      ],
      [
        8220,
        8222
      ],
      [
        8226,
        8226
      ],
      [
        8230,
        8230
      ],
      [
        8242,
        8243
      ],
      [
        8249,
        8250
      ],
      [
        8260,
        8260
      ],
      [
        8364,
        8364
      ],
      [
        8482,
        8482
      ],
      [
        8722,
        8722
      ],
      [
        8725,
        8725
      ]
    ],
    "bytes": 28488
  }
};

// font-pairings.js
var metadata = { ...BUNDLED_FONT_METADATA, ...TEMPLATE_FONT_METADATA };
function freeze4(v) {
  if (v && typeof v === "object") {
    Object.values(v).forEach(freeze4);
    Object.freeze(v);
  }
  return v;
}
var face = (family, file, range, legacyId) => ({ family, file, range, ...metadata[file], coverage: metadata[file].coverage.map((r) => [...r]), ...legacyId ? { legacyId } : {} });
var faces = {
  spartan: face("League Spartan", "league-spartan-latin-wght-normal.woff2", [100, 900], "studio"),
  source: face("Source Sans 3", "source-sans-3-latin-wght-normal.woff2", [200, 900], "body"),
  barlow: face("Barlow Condensed", "barlow-condensed-latin-800-normal.woff2", [800, 800], "impact"),
  archivo: face("Archivo", "archivo-latin-wght-normal.woff2", [100, 900], "clean"),
  manrope: face("Manrope", "manrope-latin-wght-normal.woff2", [200, 800], "cleanBody"),
  lora: face("Lora", "lora-latin-wght-normal.woff2", [400, 700]),
  space: face("Space Grotesk", "space-grotesk-latin-wght-normal.woff2", [300, 700]),
  dm: face("DM Sans", "dm-sans-latin-wght-normal.woff2", [100, 1e3]),
  oswald: face("Oswald", "oswald-latin-wght-normal.woff2", [200, 700])
};
var pairing = (id, label, description, headline, body, weight) => ({ id, label, description, headline: { ...faces[headline], defaultWeight: weight }, body: { ...faces[body], defaultWeight: 400 }, defaultWeights: { headline: weight, body: 400, cta: 600, kicker: 600, brand: 600 } });
var FONT_PAIRINGS = freeze4([
  pairing("studio", "Bold studio", "League Spartan with Source Sans 3", "spartan", "source", 800),
  pairing("impact", "Compact impact", "Barlow Condensed with Source Sans 3", "barlow", "source", 800),
  pairing("clean", "Clean digital", "Archivo with Manrope", "archivo", "manrope", 800),
  pairing("editorial-serif", "Editorial serif", "Lora with Source Sans 3", "lora", "source", 700),
  pairing("geometric-modern", "Geometric modern", "Space Grotesk with DM Sans", "space", "dm", 700),
  pairing("tall-editorial", "Tall editorial", "Oswald with Manrope", "oswald", "manrope", 700)
]);
function resolveFontPairing(options = {}) {
  const id = Object.hasOwn(options, "fontPairing") ? options.fontPairing : options.voice ?? "studio";
  const result = FONT_PAIRINGS.find((p) => p.id === id);
  if (!result) throw Error("Choose a supported font pairing.");
  return result;
}
function getRoleBundledFont(options = {}, role) {
  const p = resolveFontPairing(options);
  if (!Object.hasOwn(p.defaultWeights, role)) throw Error("Choose a supported typography role.");
  return { ...p[role === "headline" ? "headline" : "body"], pairingId: p.id, defaultWeight: p.defaultWeights[role] };
}

// template-model.js
var clone2 = (value) => JSON.parse(JSON.stringify(value));
var plain2 = (value) => value !== null && typeof value === "object" && !Array.isArray(value) && [Object.prototype, null].includes(Object.getPrototypeOf(value));
function freeze5(value) {
  if (value && typeof value === "object") {
    Object.values(value).forEach(freeze5);
    Object.freeze(value);
  }
  return value;
}
var TEMPLATES = freeze5([
  { id: "bold-backdrop", label: "Bold backdrop", description: "Full photographic or solid field, bold copy and a poster-wide action.", version: 1 },
  { id: "subject-right", label: "Subject right", description: "A left reading column with a separate right-hand subject.", version: 1 },
  { id: "image-lead", label: "Image lead", description: "A dominant complete original image with supporting copy.", version: 1 },
  { id: "centered-announcement", label: "Centered announcement", description: "A centered, focused announcement and compact action.", version: 1 },
  { id: "service-sheet", label: "Service sheet", description: "An editorial reading column for detailed service information.", version: 1 },
  { id: "subject-left", label: "Subject left", description: "A left-hand visual with a separate right reading column.", version: 1 },
  { id: "image-footer", label: "Image footer", description: "Copy leads above a substantial lower image zone.", version: 1 },
  { id: "framed-focus", label: "Framed focus", description: "A central contained visual between headline and supporting copy.", version: 1 },
  { id: "type-led", label: "Type-led", description: "A dominant headline with a compact supporting image.", version: 1 },
  { id: "offset-grid", label: "Offset grid", description: "An upper headline and asymmetric lower image-and-copy split.", version: 1 }
]);
var TEMPLATE_DEFAULTS = freeze5({
  composition: { layout: "bold-backdrop", version: 1, density: "balanced", profile: null },
  motif: { id: "none", opacity: 0.15, color: "auto", x: 0.75, y: 0.65, scale: 1, rotation: 0 },
  cta: { style: "strip", width: "poster", align: "left", paddingX: 24, paddingY: 16, fill: { mode: "palette", value: "ink" }, text: { mode: "auto" }, arrow: true },
  textColors: { headline: "auto", body: "auto", brand: "auto", kicker: "auto" },
  layers: { background: { mode: "solid", opacity: 1, blur: 0 }, foreground: { x: 0.66, y: 0.66, scale: 1, rotation: 0, shadow: 0.25, opacity: 1 }, product: { opacity: 1 }, headlineDepth: "front" }
});
var LEGACY_TEMPLATE_IDS = freeze5({ lateral: "subject-right", broadside: "bold-backdrop", cover: "bold-backdrop", specimen: "image-lead", centered: "centered-announcement", spread: "service-sheet" });
function templateId(value) {
  if (TEMPLATES.some((t) => t.id === value)) return value;
  return LEGACY_TEMPLATE_IDS[value] ?? "bold-backdrop";
}
var formats = ["square", "portrait", "story", "landscape"];
function keys2(v, allowed, label) {
  if (!plain2(v)) throw Error(`${label} must be an object.`);
  for (const k of Object.keys(v)) if (!allowed.includes(k)) throw Error(`Unsupported ${label} option: ${k}.`);
}
function number2(v, min, max, label) {
  if (typeof v !== "number" || !Number.isFinite(v) || v < min || v > max) throw Error(`${label} must be between ${min} and ${max}.`);
}
function normalizeTemplateGroup(group, value, partial = false) {
  const defaults2 = TEMPLATE_DEFAULTS[group];
  if (!defaults2) throw Error("Unsupported template group.");
  keys2(value, Object.keys(defaults2), `poster ${group}`);
  if (group === "composition") {
    if (Object.hasOwn(value, "layout") && !TEMPLATES.some((t) => t.id === value.layout)) throw Error("Choose a supported template layout.");
    const checked = normalizeFlexibleGroup(group, { ...value, ...Object.hasOwn(value, "layout") ? { layout: "lateral" } : {} }, partial);
    if (Object.hasOwn(value, "layout")) checked.layout = value.layout;
    else if (!partial) checked.layout = defaults2.layout;
    return checked;
  }
  if (group === "cta") {
    if (Object.hasOwn(value, "width") && !["fit", "column", "poster"].includes(value.width)) throw Error("Choose a supported template CTA width.");
    const checked = normalizeFlexibleGroup(group, { ...value, ...Object.hasOwn(value, "width") ? { width: value.width === "fit" ? "fit" : "full" } : {} }, true);
    if (Object.hasOwn(value, "width")) checked.width = value.width;
    const result2 = partial ? checked : mergeComposition(defaults2, checked);
    if (!partial) {
      normalizeFlexibleGroup("cta", { ...result2, width: result2.width === "fit" ? "fit" : "full" });
      if (value.text?.mode === "auto") result2.text = { mode: "auto" };
    }
    return result2;
  }
  if (group === "layers") {
    const checked = {};
    for (const [name, spec] of Object.entries(value)) {
      if (name === "headlineDepth") {
        if (!["front", "behind"].includes(spec)) throw Error("Choose supported headline depth.");
        checked[name] = spec;
        continue;
      }
      const bounds = name === "background" ? { opacity: [0, 1], blur: [0, 24] } : name === "foreground" ? { x: [0, 1], y: [0, 1], scale: [0.4, 2], rotation: [-25, 25], shadow: [0, 1], opacity: [0, 1] } : { opacity: [0, 1] };
      keys2(spec, [...Object.keys(bounds), ...name === "background" ? ["mode"] : []], `template ${name}`);
      checked[name] = {};
      for (const [k, v] of Object.entries(spec)) {
        if (k === "mode") {
          if (!["solid", "image"].includes(v)) throw Error("Choose a supported background mode.");
        } else number2(v, ...bounds[k], `${name} ${k}`);
        checked[name][k] = v;
      }
    }
    return partial ? checked : mergeComposition(defaults2, checked);
  }
  const result = normalizeFlexibleGroup(group, value, partial);
  if (group === "motif" && Object.hasOwn(result, "id") && result.id !== "none") throw Error("Template motifs must be none.");
  return result;
}
function mapOld(source, hasBackground, partial = false) {
  const out = clone2(source);
  if (source.composition) out.composition = { ...source.composition, ...Object.hasOwn(source.composition, "layout") ? { layout: templateId(source.composition.layout) } : {} };
  if (source.cta) out.cta = { ...source.cta, ...Object.hasOwn(source.cta, "width") ? { width: source.cta.width === "full" ? "column" : source.cta.width } : {} };
  if (!partial || source.motif) out.motif = { ...source.motif ?? {}, id: "none" };
  if (!partial || source.details) out.details = { ...source.details ?? {}, motif: "none", surface: "flat", underline: false };
  if (!partial || source.recipe !== void 0 || source.layers?.background) out.layers = { ...source.layers, background: { ...source.layers?.background, ...!partial || source.recipe !== void 0 ? { mode: source.recipe === "editorial" ? "solid" : hasBackground ? "image" : "solid" } : {} } };
  return out;
}
function upgradePosterTemplate(options = {}, hasBackground = false) {
  const old = normalizePoster(options);
  if (old.compilerVersion === 4) return old;
  const flexible = upgradePosterFlexible(old), next = mapOld(flexible, hasBackground);
  if (flexible.formats) next.formats = Object.fromEntries(Object.entries(flexible.formats).map(([f, p]) => [f, mapOld(p, hasBackground, true)]));
  const upgraded = normalizePoster({ ...next, version: 3, compilerVersion: 4 }), result = clone2(upgraded);
  const fit = (o, f) => {
    const t = o.layers.foreground;
    return t.x === 0.66 && t.y === 0.66 ? { ...t, ...(({ x, y }) => ({ x, y }))(templateForegroundPlacement(o.composition.layout, f, o.composition.density)) } : t;
  };
  result.layers.foreground = fit(upgraded, "square");
  result.formats = { ...result.formats };
  for (const f of formats) {
    const o = resolvePoster(upgraded, f);
    if (f === "square" && !upgraded.formats?.square) continue;
    result.formats[f] = { ...result.formats[f], layers: { ...result.formats[f]?.layers, foreground: fit(o, f) } };
  }
  return normalizePoster(result);
}
function roleReset(typography) {
  return Object.fromEntries(Object.entries(typography).map(([role, spec]) => [role, { ...spec, size: null, lineHeight: null }]));
}
function templateForegroundPlacement(id, format = "square", density = "balanced") {
  const { visual: [x, y, w, h] } = templatePlan(id, format, density), height = { square: 1080, portrait: 1350, story: 1920, landscape: 565.2 }[format];
  return { x: (x + w / 2) / 1080, y: (y + h / 2) / height, scale: 1, rotation: 0 };
}
function selection(o, id, format = "square") {
  const width = id === "bold-backdrop" ? "poster" : ["image-lead", "centered-announcement"].includes(id) ? "fit" : "column";
  return { composition: { ...o.composition, layout: id }, motif: { ...o.motif, id: "none" }, layers: { ...o.layers, foreground: { ...o.layers.foreground, ...templateForegroundPlacement(id, format, o.composition.density) } }, typography: roleReset(o.typography), scale: 1, cta: { ...o.cta, style: id === "bold-backdrop" ? "strip" : o.cta.style, width, align: id === "centered-announcement" ? "center" : "left", paddingX: 24, paddingY: 16 }, details: { ...o.details, motif: "none", surface: "flat", underline: false } };
}
function applyTemplate(poster, id, format = "square", allFormats = false, hasBackground = false) {
  if (!TEMPLATES.some((t) => t.id === id)) throw Error("Choose a supported template layout.");
  if (!formats.includes(format)) throw Error("Choose a supported poster format.");
  const p = upgradePosterTemplate(poster, hasBackground), selected = selection(resolvePoster(p, format), id, format);
  if (!allFormats) return normalizePoster({ ...p, formats: { ...p.formats, [format]: { ...p.formats?.[format], ...selected } } });
  const root = selection({ ...p, typography: p.typography, cta: p.cta }, id), next = { ...p, ...root };
  if (p.formats) {
    next.formats = {};
    for (const [f, overrides] of Object.entries(p.formats)) {
      const q = clone2(overrides);
      delete q.composition;
      delete q.motif;
      delete q.scale;
      if (q.typography) for (const spec of Object.values(q.typography)) {
        delete spec.size;
        delete spec.lineHeight;
      }
      if (q.cta) for (const key of ["style", "width", "align", "paddingX", "paddingY"]) delete q.cta[key];
      if (q.details) for (const key of ["surface", "motif", "underline"]) delete q.details[key];
      const prune = (value) => {
        for (const [key, v] of Object.entries(value)) {
          if (plain2(v)) {
            prune(v);
            if (!Object.keys(v).length) delete value[key];
          }
        }
      };
      prune(q);
      if (Object.keys(q).length) next.formats[f] = q;
    }
  }
  next.formats ??= {};
  for (const f of ["portrait", "story", "landscape"]) {
    const q = next.formats[f] ?? {};
    next.formats[f] = { ...q, layers: { ...q.layers, foreground: { ...q.layers?.foreground, ...templateForegroundPlacement(id, f, next.composition.density) } } };
  }
  if (next.formats.square?.layers?.foreground) Object.assign(next.formats.square.layers.foreground, templateForegroundPlacement(id, "square", next.composition.density));
  return normalizePoster(next);
}
function applyFontPairing(poster, id, format) {
  const p = normalizePoster(poster);
  if (p.compilerVersion !== 4) throw Error("Font pairings require compiler4.");
  if (!formats.includes(format)) throw Error("Choose a supported poster format.");
  resolveFontPairing({ fontPairing: id });
  const effective = resolvePoster(p, format), typography = Object.fromEntries(["headline", "body", "cta", "kicker", "brand"].map((role) => [role, { ...effective.typography[role], fontId: "", weight: null }]));
  return normalizePoster({ ...p, formats: { ...p.formats, [format]: { ...p.formats?.[format], fontPairing: id, typography } } });
}
function applyTemplateLookToFormats(poster, sourceFormat) {
  const p = upgradePosterTemplate(poster);
  if (!formats.includes(sourceFormat)) throw Error("Choose a supported poster format.");
  const result = clone2(resolvePoster(p, sourceFormat));
  delete result.formats;
  const { layout: layout2, density } = result.composition, anchor = templateForegroundPlacement(layout2, sourceFormat, density), t = result.layers.foreground;
  if (Object.entries(anchor).every(([key, value]) => t[key] === value)) {
    result.layers.foreground = { ...t, ...templateForegroundPlacement(layout2, "square", density) };
    result.formats = {};
    for (const f of ["portrait", "story", "landscape"]) result.formats[f] = { layers: { foreground: templateForegroundPlacement(layout2, f, density) } };
  }
  return normalizePoster(result);
}

// poster-model.js
var DEFAULT_POSTER = Object.freeze({
  version: 2,
  recipe: "hero",
  voice: "studio",
  treatment: "brand",
  variation: "balanced",
  emphasis: "",
  kicker: "",
  scale: 1,
  heroScale: 1,
  cropX: 0.5,
  cropY: 0.5,
  alignment: "left"
});
var enums = {
  recipe: ["hero", "showcase", "editorial"],
  voice: ["studio", "impact", "clean"],
  treatment: ["brand", "light", "dark"],
  variation: ["balanced", "type-led", "image-led"],
  alignment: ["left", "center"]
};
var ranges = { scale: [0.85, 1.15], heroScale: [0.8, 1.2], cropX: [0, 1], cropY: [0, 1] };
var formats2 = ["square", "portrait", "story", "landscape"];
var object = (value) => value !== null && typeof value === "object" && !Array.isArray(value) && [Object.prototype, null].includes(Object.getPrototypeOf(value));
function fields(options, partial) {
  if (!object(options)) throw new Error("Poster options must be an object.");
  const result = partial ? {} : { ...DEFAULT_POSTER };
  for (const [key, value] of Object.entries(options)) {
    if (key === "formats" && !partial) continue;
    if (key === "version" && !partial) {
      if (value !== 2) throw new Error("Poster version must be 2.");
    } else if (enums[key]) {
      if (!enums[key].includes(value)) throw new Error(`Choose a supported poster ${key}.`);
    } else if (ranges[key]) {
      const [min, max] = ranges[key];
      if (typeof value !== "number" || !Number.isFinite(value) || value < min || value > max) throw new Error(`Poster ${key} must be between ${min} and ${max}.`);
    } else if (key === "emphasis" || key === "kicker") {
      if (typeof value !== "string" || value.length > 4e3) throw new Error(`Poster ${key} must be text of at most 4000 characters.`);
    } else throw new Error(`Unsupported poster option: ${key}.`);
    result[key] = value;
  }
  return result;
}
function normalizePoster(options = {}) {
  if (options?.version === 3) return normalizePosterV3(options);
  const result = fields(options, false);
  if (Object.hasOwn(options, "formats")) {
    if (!object(options.formats)) throw new Error("Poster formats must be an object.");
    result.formats = {};
    for (const [format, overrides] of Object.entries(options.formats)) {
      if (!formats2.includes(format)) throw new Error("Choose a supported poster format.");
      result.formats[format] = fields(overrides, true);
    }
  }
  return result;
}
var roles = ["headline", "body", "cta", "kicker", "brand"];
var roleSizes = { headline: [48, 260], body: [20, 84], cta: [20, 72], kicker: [18, 64], brand: [20, 64] };
var roleDefault = () => ({ fontId: "", weight: null, size: null, lineHeight: null, tracking: 0 });
function freezeDeep(value) {
  for (const child of Object.values(value)) if (object(child)) freezeDeep(child);
  return Object.freeze(value);
}
var DEFAULT_POSTER_V3 = freezeDeep({
  ...DEFAULT_POSTER,
  version: 3,
  typography: Object.fromEntries(roles.map((role) => [role, roleDefault()])),
  layers: { background: { opacity: 0.35, blur: 0 }, foreground: { x: 0.66, y: 0.66, scale: 1, rotation: 0, shadow: 0.25 }, headlineDepth: "front" },
  details: { motif: "none", text: "", surface: "flat", strength: 0.25, action: "rail", underline: true }
});
var copy = (value) => JSON.parse(JSON.stringify(value));
function bounded(value, min, max, key) {
  if (typeof value !== "number" || !Number.isFinite(value) || value < min || value > max) throw new Error(`Poster ${key} must be between ${min} and ${max}.`);
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
  if (!object(options)) throw new Error("Poster options must be an object.");
  const result = partial ? {} : copy(DEFAULT_POSTER_V3);
  for (const [key, value] of Object.entries(options)) {
    if (key === "formats" && !partial) continue;
    if (key === "version" && !partial) {
      if (value !== 3) throw new Error("Poster version must be 3.");
      result.version = 3;
    } else if (key === "compilerVersion") {
      if (partial || value !== 2) throw new Error("Poster compilerVersion must be 2 at the poster root only.");
      result.compilerVersion = 2;
    } else if (key === "typography") {
      const typed = nested(value, roles, key, (role, spec) => nested(spec, ["fontId", "weight", "size", "lineHeight", "tracking"], role, (field, item) => {
        if (field === "fontId") {
          if (typeof item !== "string" || !/^[A-Za-z0-9:_-]{0,100}$/.test(item)) throw new Error("Invalid poster font identifier.");
        } else if (field === "tracking") bounded(item, -0.04, 0.2, field);
        else if (item !== null) {
          const limits = field === "weight" ? [100, 900] : field === "lineHeight" ? [0.85, 2] : roleSizes[role];
          bounded(item, ...limits, field);
          if (field === "weight" && !Number.isInteger(item)) throw new Error("Poster font weight must be an integer.");
        }
        return item;
      }));
      result.typography = partial ? typed : merge(result.typography, typed);
    } else if (key === "layers") {
      const layer = nested(value, ["background", "foreground", "headlineDepth"], key, (name, spec) => {
        if (name === "headlineDepth") {
          if (!["front", "behind"].includes(spec)) throw new Error("Choose supported headline depth.");
          return spec;
        }
        const bounds = name === "background" ? { opacity: [0, 1], blur: [0, 24] } : { x: [0, 1], y: [0, 1], scale: [0.4, 2], rotation: [-25, 25], shadow: [0, 1] };
        return nested(spec, Object.keys(bounds), name, (field, item) => {
          bounded(item, ...bounds[field], field);
          return item;
        });
      });
      result.layers = partial ? layer : merge(result.layers, layer);
    } else if (key === "details") {
      const details = nested(value, ["motif", "text", "surface", "strength", "action", "underline"], key, (field, item) => {
        const choices = { motif: ["none", "ribbon", "orbit"], surface: ["flat", "tonal"], action: ["rail", "capsule", "text"] };
        if (choices[field] && !choices[field].includes(item)) throw new Error(`Choose supported detail ${field}.`);
        if (field === "text" && (typeof item !== "string" || item.length > 160)) throw new Error("Detail text must be at most 160 characters.");
        if (field === "strength") bounded(item, 0, 1, field);
        if (field === "underline" && typeof item !== "boolean") throw new Error("Detail underline must be boolean.");
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
function normalizePosterV3(options = {}) {
  if (options?.compilerVersion === 4) return normalizePosterTemplate(options);
  if (options?.compilerVersion === 3) return normalizePosterFlexible(options);
  const result = v3Fields(options);
  if (Object.hasOwn(options, "formats")) result.formats = nested(options.formats, formats2, "formats", (_format, value) => v3Fields(value, true));
  return result;
}
function upgradePoster(options = {}) {
  const previous = normalizePoster(options);
  return normalizePosterV3({ ...previous, version: 3, compilerVersion: 2 });
}
function resolvePoster(options = {}, format) {
  const base = normalizePoster(options), override = base.formats?.[format] ?? {};
  return [3, 4].includes(base.compilerVersion) ? mergeComposition(base, override) : base.version === 3 ? merge(base, override) : { ...base, ...override };
}
var DEFAULT_POSTER_FLEX = freezeDeep({ ...copy(DEFAULT_POSTER_V3), compilerVersion: 3, ...copy(FLEX_GROUP_DEFAULTS) });
function flexibleFields(options, partial = false) {
  if (!object(options)) throw new Error("Poster options must be an object.");
  const old = {}, groups = {};
  for (const [key, value] of Object.entries(options)) {
    if (key === "formats" && !partial) continue;
    if (key === "compilerVersion") {
      if (partial || value !== 3) throw new Error("Poster compilerVersion must be 3 at the poster root only.");
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
  if (Object.hasOwn(options, "formats")) result.formats = nested(options.formats, formats2, "formats", (_format, value) => flexibleFields(value, true));
  for (const override of Object.values(result.formats ?? {})) {
    const resolved = mergeComposition(result, override);
    for (const key of Object.keys(FLEX_GROUP_DEFAULTS)) normalizeFlexibleGroup(key, resolved[key]);
  }
  return result;
}
function templateFields(options, partial = false) {
  if (!object(options)) throw new Error("Poster options must be an object.");
  const old = {}, groups = {}, scalars = {};
  for (const [key, value] of Object.entries(options)) {
    if (key === "formats" && !partial) continue;
    if (key === "compilerVersion") {
      if (partial || value !== 4) throw new Error("Poster compilerVersion must be 4 at the poster root only.");
    } else if (key === "fontPairing") {
      resolveFontPairing({ fontPairing: value });
      scalars.fontPairing = value;
    } else if (Object.hasOwn(TEMPLATE_DEFAULTS, key)) groups[key] = normalizeTemplateGroup(key, value, true);
    else old[key] = value;
  }
  const result = v3Fields(old, partial);
  if (!partial) Object.assign(result, copy(TEMPLATE_DEFAULTS), { compilerVersion: 4 });
  Object.assign(result, scalars);
  for (const [key, value] of Object.entries(groups)) result[key] = partial ? value : normalizeTemplateGroup(key, value);
  if (result.details?.surface === "tonal" || result.details?.motif !== void 0 && result.details.motif !== "none") throw new Error("Templates require flat surface and no legacy motif.");
  return result;
}
function normalizePosterTemplate(options) {
  const result = templateFields(options);
  if (Object.hasOwn(options, "formats")) result.formats = nested(options.formats, formats2, "formats", (_format, value) => templateFields(value, true));
  for (const override of Object.values(result.formats ?? {})) {
    const resolved = mergeComposition(result, override);
    for (const key of Object.keys(TEMPLATE_DEFAULTS)) normalizeTemplateGroup(key, resolved[key]);
  }
  return result;
}
function upgradePosterFlexible(options = {}) {
  const previous = normalizePoster(options);
  if (previous.compilerVersion === 3) return previous;
  const map = (source) => {
    const out = copy(source);
    if (source.details?.motif !== void 0) out.motif = { id: { none: "none", ribbon: "ribbon-v1", orbit: "orbit-v1" }[source.details.motif] };
    if (source.details?.strength !== void 0) out.motif = { ...out.motif, opacity: 0.25 + 0.65 * source.details.strength };
    if (source.details?.action !== void 0) out.cta = { style: { rail: "strip", capsule: "pill", text: "text" }[source.details.action] };
    return out;
  };
  const upgraded = map(previous);
  if (previous.formats) upgraded.formats = Object.fromEntries(Object.entries(previous.formats).map(([format, value]) => [format, map(value)]));
  return normalizePoster({ ...upgraded, version: 3, compilerVersion: 3 });
}

// src/fonts-v3.js
var bundled = {
  studio: { url: league_spartan_latin_wght_normal_default, file: "league-spartan-latin-wght-normal.woff2", range: [100, 900] },
  body: { url: source_sans_3_latin_wght_normal_default, file: "source-sans-3-latin-wght-normal.woff2", range: [200, 900] },
  impact: { url: barlow_condensed_latin_800_normal_default, file: "barlow-condensed-latin-800-normal.woff2", range: [800, 800] },
  clean: { url: archivo_latin_wght_normal_default, file: "archivo-latin-wght-normal.woff2", range: [100, 900] },
  cleanBody: { url: manrope_latin_wght_normal_default, file: "manrope-latin-wght-normal.woff2", range: [200, 800] }
};
var voices = { studio: ["studio", "body"], impact: ["impact", "body"], clean: ["clean", "cleanBody"] };
var documents2 = /* @__PURE__ */ new WeakMap();
function unsupportedGlyphs(text, coverage) {
  return [...new Set([...String(text)].filter((c) => !["\n", "\r", "	"].includes(c) && !coverage.some(([a, b]) => c.codePointAt(0) >= a && c.codePointAt(0) <= b)))];
}
function coverageValid(value) {
  return Array.isArray(value) && value.length > 0 && value.length <= 2e4 && value.every((x) => Array.isArray(x) && x.length === 2 && Number.isInteger(x[0]) && Number.isInteger(x[1]) && x[0] >= 0 && x[1] >= x[0] && x[1] <= 1114111);
}
async function bytesFor(url) {
  if (typeof url !== "string" || !/^data:font\/(?:woff2|ttf);base64,[A-Za-z0-9+/=]+$/.test(url)) throw Error("The cached face is not a supported local font file.");
  const raw = atob(url.slice(url.indexOf(",") + 1));
  if (raw.length > 2 * 1024 * 1024) throw Error("The font file exceeds 2 MB.");
  return Uint8Array.from(raw, (c) => c.charCodeAt(0));
}
async function digest(bytes) {
  if (!globalThis.crypto?.subtle) throw Error("Font digest verification is unavailable.");
  return [...new Uint8Array(await crypto.subtle.digest("SHA-256", bytes))].map((b) => b.toString(16).padStart(2, "0")).join("");
}
async function loadRoleFonts({ voice = "studio", typography = {}, fonts = [], getFont, companyId, doc = globalThis.document }) {
  if (!voices[voice] || !doc?.fonts || typeof FontFace === "undefined") throw Error("Required poster font loading is unavailable.");
  const resolved = {};
  let pending = documents2.get(doc);
  if (!pending) {
    pending = /* @__PURE__ */ new Map();
    documents2.set(doc, pending);
  }
  for (const role of ["headline", "body", "cta", "kicker", "brand"]) {
    const style = typography[role] || {}, weight = style.weight ?? (role === "headline" ? 800 : role === "body" ? 400 : 600);
    let source, reference;
    if (style.fontId) {
      const record = fonts.find((f) => f.id === style.fontId);
      if (!record || record.companyId !== companyId) throw Error(`${role}: selected font is missing from this company's frozen font metadata.`);
      const face2 = record.faces?.find((f) => f.weight === weight && f.style === "normal");
      if (!face2 || !coverageValid(face2.coverage) || !/^[a-f0-9]{64}$/.test(face2.sha256)) throw Error(`${role}: the selected normal weight ${weight} or verified cmap metadata is unavailable.`);
      if (typeof getFont !== "function") throw Error(`${role}: the local font loader is unavailable.`);
      source = await getFont(record.id, weight);
      for (const key2 of ["weight", "style", "sha256", "assetId"]) if (source?.[key2] !== face2[key2]) throw Error(`${role}: cached font ${key2} differs from the saved face.`);
      if (JSON.stringify(source.coverage) !== JSON.stringify(face2.coverage)) throw Error(`${role}: cached cmap coverage differs from the saved face.`);
      const bytes = await bytesFor(source.dataUrl);
      if (await digest(bytes) !== face2.sha256 || bytes.length !== face2.bytes) throw Error(`${role}: cached font digest or byte length does not match the saved face.`);
      source = { bytes };
      reference = { fontId: record.id, assetId: face2.assetId, family: record.family, file: face2.assetId, sha256: face2.sha256, coverage: face2.coverage, source: record.source, license: record.license, weight, style: "normal" };
    } else {
      const id = voices[voice][role === "headline" ? 0 : 1], entry = bundled[id];
      if (weight < entry.range[0] || weight > entry.range[1]) throw Error(`${role}: bundled face does not support normal weight ${weight}.`);
      const meta = BUNDLED_FONT_METADATA[entry.file];
      source = { url: entry.url, range: entry.range };
      reference = { fontId: null, assetId: null, family: `BS3 ${id}`, file: entry.file, ...meta, source: "bundled", license: "SIL OFL 1.1", weight, style: "normal" };
    }
    const family = `BS3_${reference.sha256}_${weight}`, key = family;
    let promise = pending.get(key);
    if (!promise) {
      promise = (async () => {
        const face2 = new FontFace(family, source.bytes ? source.bytes.buffer : `url(${JSON.stringify(source.url)})`, { weight: String(weight), style: "normal" });
        let timer;
        try {
          await Promise.race([face2.load(), new Promise((_, reject) => {
            timer = setTimeout(() => reject(Error("Local font loading timed out.")), 8e3);
          })]);
        } finally {
          clearTimeout(timer);
        }
        doc.fonts.add(face2);
        return face2;
      })().catch((e) => {
        pending.delete(key);
        throw e;
      });
      pending.set(key, promise);
    }
    const loaded = await promise;
    if (loaded.status !== "loaded" || !doc.fonts.has(loaded)) throw Error(`${role}: the exact selected font failed to load.`);
    resolved[role] = { ...reference, canvasFamily: family };
  }
  return resolved;
}

// src/poster-renderer-v3.js
var dimensions2 = { square: [1080, 1080], portrait: [1080, 1350], story: [1080, 1920], landscape: [1200, 628] };
var renderTokens2 = /* @__PURE__ */ new WeakMap();
var rect2 = (c, b, color) => {
  c.fillStyle = color;
  c.fillRect(...b);
};
var intersects = (a, b) => a[0] < b[0] + b[2] && a[0] + a[2] > b[0] && a[1] < b[1] + b[3] && a[1] + a[3] > b[1];
function contain2(c, img, box) {
  const [x, y, w, h] = box, s = Math.min(w / img.width, h / img.height), p = [x + (w - img.width * s) / 2, y + (h - img.height * s) / 2, img.width * s, img.height * s];
  c.drawImage(img, ...p);
  return p;
}
async function image2(src, role, errors) {
  if (!src) return null;
  try {
    if (typeof src !== "string" || !/^data:image\/(png|jpeg|webp|svg\+xml)[;,]/.test(src)) throw Error("Only local image data is allowed.");
    return await new Promise((resolve, reject) => {
      const img = new Image();
      const timer = setTimeout(() => reject(Error("Image timeout.")), 12e3);
      img.onload = () => {
        clearTimeout(timer);
        img.naturalWidth ? resolve(img) : reject(Error("Empty image."));
      };
      img.onerror = () => {
        clearTimeout(timer);
        reject(Error("Invalid image."));
      };
      img.src = src;
    });
  } catch (e) {
    errors.push(`${role}: the selected local image could not be opened. ${e.message}`);
    return null;
  }
}
function plan(format, h, recipe) {
  const wide = format === "landscape", story = format === "story", portrait = format === "portrait", m = wide ? 58 : story ? 80 : 64, top = story ? 160 : 54, footer = h - (story ? 160 : 54) - 80;
  let title2 = wide ? [m, 136, 610, 212] : [m, story ? 280 : 172, 1080 - m * 2, story ? 550 : portrait ? 350 : 330];
  let body = wide ? [m, 330, 480, 90] : [m, story ? 1120 : portrait ? 790 : 646, story ? 420 : portrait ? 380 : 370, story ? 390 : portrait ? 250 : 205];
  let visual = wide ? [660, 130, 360, 300] : [m, story ? 790 : portrait ? 590 : 470, 1080 - m * 2, story ? 630 : portrait ? 430 : 330];
  if (recipe === "editorial") {
    title2 = wide ? [m, 150, 490, 230] : [m, story ? 320 : 180, 1080 - m * 2, story ? 560 : portrait ? 450 : 370];
    body = wide ? [610, 150, 410, 280] : [m, story ? 1030 : portrait ? 760 : 650, 1080 - m * 2, footer - (story ? 1030 : portrait ? 760 : 650) - 45];
  }
  if (recipe === "showcase") {
    title2 = wide ? [m, 145, 520, 180] : [m, story ? 280 : 160, 1080 - m * 2, story ? 340 : 230];
    body = wide ? [m, 330, 480, 90] : [m, story ? 1510 : portrait ? 1090 : 832, 1080 - m * 2, story ? 130 : 100];
  }
  return { wide, story, m, top, footer, title: title2, body, visual, size: recipe === "showcase" ? wide ? 84 : 112 : wide ? 88 : story ? 156 : 148 };
}
function setFont(c, s) {
  c.font = `${s.weight} ${s.size}px "${s.canvasFamily}"`;
  c.fontKerning = "normal";
  c.textBaseline = "top";
  c.textAlign = "left";
  c.letterSpacing = `${s.tracking * s.size}px`;
}
function measure(c, text, s) {
  setFont(c, s);
  return c.measureText(text).width;
}
function wrap2(c, value, width, s) {
  const result = [];
  for (const paragraph of String(value).split("\n")) {
    if (!paragraph.trim()) {
      result.push("");
      continue;
    }
    let line = "";
    for (const word of paragraph.trim().split(/\s+/)) {
      const test = line ? line + " " + word : word;
      if (line && measure(c, test, s) > width) {
        result.push(line);
        line = word;
      } else line = test;
    }
    result.push(line);
  }
  return result;
}
function alphaInfo(img, doc) {
  const c = doc.createElement("canvas");
  c.width = img.width;
  c.height = img.height;
  const x = c.getContext("2d", { willReadFrequently: true });
  x.drawImage(img, 0, 0);
  const data = x.getImageData(0, 0, c.width, c.height).data;
  let minX = c.width, minY = c.height, maxX = -1, maxY = -1, transparent = 0, partial = 0;
  for (let y = 0; y < c.height; y++) for (let z = 0; z < c.width; z++) {
    const a = data[(y * c.width + z) * 4 + 3];
    if (a < 255) transparent++;
    if (a > 0 && a < 255) partial++;
    if (a > 8) {
      minX = Math.min(minX, z);
      maxX = Math.max(maxX, z);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    }
  }
  return { hasAlpha: transparent > 0, transparentPixels: transparent, partialPixels: partial, visibleBounds: maxX < 0 ? null : [minX, minY, maxX - minX + 1, maxY - minY + 1] };
}
async function renderPosterV3(target, resources2) {
  const token = Symbol("poster-v3");
  renderTokens2.set(target, token);
  const staging = target.ownerDocument.createElement("canvas");
  const result = await paint(staging, resources2);
  if (renderTokens2.get(target) !== token) return { ...result, stale: true, errors: [...result.errors, "A newer render replaced this drawing. Wait for the current preview."] };
  target.width = staging.width;
  target.height = staging.height;
  target.getContext("2d").drawImage(staging, 0, 0);
  return result;
}
async function paint(canvas, { company = {}, post = {}, design, background, logo, product, foreground, fonts = [], getFont } = {}) {
  const format = dimensions2[post.format] ? post.format : "square", [width, height] = dimensions2[format], unit = width / 1080, h = height / unit;
  canvas.width = width;
  canvas.height = height;
  const c = canvas.getContext("2d"), errors = [], warnings = [], hitRegions = [], layers = [], assets = [];
  const result = () => ({ errors, warnings, width, height, generated: !!design, manifest, hitRegions });
  const refs = { backgroundAssetId: post.backgroundAssetId || "", foregroundAssetId: post.foregroundAssetId || "", logoAssetId: post.logoAssetId ?? company.logoAssetId ?? "", productAssetId: post.productAssetId ?? "" };
  const manifest = { rendererVersion: 3, recipeVersion: 1, format, width, height, coordinateSpace: { width: 1080, height: h, pixelScale: unit, description: "All boxes, styles and transforms use 1080-wide layout units; hitRegions use output pixels." }, assetReferences: refs, copy: { headline: String(post.headline || post.title || ""), body: String(post.body || ""), cta: String(post.cta || ""), kicker: "" }, fonts: {}, assets, layers };
  let o;
  try {
    o = resolvePoster(post.poster || { version: 3 }, format);
    if (o.version !== 3) throw Error("Expected a version 3 poster.");
  } catch (e) {
    errors.push(`Invalid v3 poster: ${e.message}`);
    return result();
  }
  const palette = resolvePalette(company, o), p = plan(format, h, o.recipe);
  if (o.recipe === "hero") p.visual = p.wide ? [700, 136, 320, 280] : [530, p.story ? 1020 : format === "portrait" ? 590 : 510, 1080 - p.m - 530, p.story ? 580 : format === "portrait" ? 520 : 370];
  const variationFactor = o.variation === "type-led" ? 1.05 : o.variation === "image-led" ? 0.9 : 1;
  p.size *= variationFactor;
  if (o.variation === "type-led") {
    p.title[3] += p.wide ? 15 : 60;
    p.visual[1] += p.wide ? 12 : 30;
    p.visual[3] -= p.wide ? 12 : 30;
  }
  if (o.variation === "image-led") {
    p.title[1] += p.wide ? 8 : 20;
    p.visual[1] -= p.wide ? 8 : 20;
    p.visual[3] += p.wide ? 8 : 20;
  }
  manifest.options = o;
  manifest.recipe = o.recipe;
  manifest.palette = palette;
  manifest.copy.kicker = o.kicker;
  manifest.safeRegion = { preset: "Brand Studio conservative composition v3 (not platform certification)", inset: { left: p.m * unit, right: p.m * unit, top: p.top * unit, bottom: (p.story ? 160 : 54) * unit } };
  c.scale(unit, unit);
  rect2(c, [0, 0, 1080, h], palette.field);
  if (contrast(palette.field, palette.text) < 4.5) errors.push("The company palette does not supply readable text contrast.");
  let roleFonts;
  try {
    roleFonts = await loadRoleFonts({ voice: o.voice, typography: o.typography, fonts, getFont, companyId: company.id, doc: canvas.ownerDocument });
  } catch (e) {
    errors.push(`Required v3 fonts failed to load. ${e.message}`);
    return result();
  }
  const sizes = { headline: p.size * o.scale, body: p.wide ? 30 : 36, cta: p.story ? 36 : 32, kicker: 26, brand: 30 };
  for (const role of Object.keys(roleFonts)) {
    const style = o.typography[role];
    manifest.fonts[role] = { ...roleFonts[role], size: style.size ?? sizes[role], lineHeight: style.lineHeight ?? (role === "headline" ? 1.02 : role === "body" ? 1.3 : 1.1), tracking: style.tracking };
  }
  for (const [role, value] of Object.entries({ ...manifest.copy, brand: company.name || "", details: o.details.text })) {
    const font2 = manifest.fonts[role === "details" ? "kicker" : role], missing = unsupportedGlyphs(value, font2.coverage);
    if (missing.length) errors.push(`${role}: selected font cmap does not support ${missing.join(" ")}. Export is blocked; no fallback is used.`);
  }
  if (!manifest.copy.headline.trim()) errors.push("Add a headline before exporting.");
  const [bg, mark, original, fg] = await Promise.all([image2(background, "Backdrop", errors), image2(logo, "Logo", errors), image2(product, "Product / screenshot", errors), image2(foreground, "Foreground", errors)]);
  for (const [key, resource] of [["backgroundAssetId", bg], ["foregroundAssetId", fg], ["logoAssetId", mark], ["productAssetId", original]]) if (refs[key] && !resource) errors.push(`Selected ${key} is missing. Restore the exact resource before exporting.`);
  for (const [key, resource] of [["backgroundAssetId", bg], ["foregroundAssetId", fg], ["logoAssetId", mark], ["productAssetId", original]]) if (resource && !refs[key]) errors.push(`${key}: resource has no explicit selected ID. Bind the exact resource before review; latest-design attribution is never substituted.`);
  if (o.recipe === "showcase" && !original) errors.push("Showcase requires an original product image or screenshot.");
  if (o.recipe === "editorial" && (bg || fg || original)) warnings.push("Editorial is type-only except the original logo. Selected imagery is not drawn; do not commission an editorial backdrop.");
  const addAsset = (role, id, img, box, extra = {}) => {
    const asset = { role, assetId: id || null, x: box[0], y: box[1], width: box[2], height: box[3], sourceWidth: img.width, sourceHeight: img.height, ...extra };
    assets.push(asset);
    if (img.width < box[2] * unit || img.height < box[3] * unit) warnings.push(`${role}: below placed resolution; inspect native PNG.`);
    return asset;
  };
  if (bg && o.recipe !== "editorial") {
    c.save();
    c.globalAlpha = o.layers.background.opacity;
    c.filter = `blur(${o.layers.background.blur}px)`;
    const s = Math.max(1080 / bg.width, h / bg.height) * o.heroScale, bw = bg.width * s, bh = bg.height * s, bx = (1080 - bw) * o.cropX, by = (h - bh) * o.cropY;
    c.drawImage(bg, bx, by, bw, bh);
    c.restore();
    addAsset("backdrop", refs.backgroundAssetId, bg, [bx, by, bw, bh], { opacity: o.layers.background.opacity, blur: o.layers.background.blur, heroScale: o.heroScale, cropX: o.cropX, cropY: o.cropY });
    layers.push({ role: "backdrop", assetId: refs.backgroundAssetId || null });
  }
  if (o.details.surface === "tonal") {
    const gradient = c.createLinearGradient(0, 0, 1080, h);
    gradient.addColorStop(0, palette.field);
    gradient.addColorStop(1, palette.ink);
    c.save();
    c.globalAlpha = 0.12 * o.details.strength;
    c.fillStyle = gradient;
    c.fillRect(0, 0, 1080, h);
    c.restore();
    layers.push({ role: "tonal", strength: o.details.strength });
  }
  const texts = [];
  function prepare(role, value, box, color = palette.text) {
    if (!value) return null;
    const style = manifest.fonts[role], lines = wrap2(c, value, box[2], style), height2 = lines.length * style.size * style.lineHeight, overflow = height2 > box[3] + 0.1 || lines.some((line) => measure(c, line, style) > box[2] + 0.1);
    const layer = { role, text: value, box: [...box], ...style, lines, overflow, color };
    texts.push(layer);
    if (overflow) errors.push(`${role} does not fit at the selected ${style.size}px size/leading/tracking. Explicit styles are never silently shrunk; edit copy or choose another arrangement.`);
    layer.lineBoxes = lines.map((line, index) => {
      if (!line) return null;
      const w = measure(c, line, style), x = o.alignment === "center" && role === "headline" ? box[0] + (box[2] - w) / 2 : box[0];
      return [x, box[1] + index * style.size * style.lineHeight, w, style.size * style.lineHeight];
    }).filter(Boolean);
    return layer;
  }
  const headline = prepare("headline", manifest.copy.headline, p.title);
  const body = prepare("body", manifest.copy.body, p.body);
  const brand = mark ? null : prepare("brand", company.name || "", [p.m, p.top, 500, 70]);
  const kicker = prepare("kicker", manifest.copy.kicker, [620, p.top, 1080 - p.m - 620, 70]);
  const actionStyle = manifest.fonts.cta, actionH = Math.max(80, actionStyle.size * actionStyle.lineHeight + 32), actionY = p.footer + 80 - actionH, actionBox = [p.m, actionY, 1080 - 2 * p.m, actionH];
  const action = prepare("cta", manifest.copy.cta, [p.m + 24, actionY + 16, actionBox[2] - 104, actionH - 32], o.details.action === "text" ? palette.text : palette.actionText);
  const protectedBoxes = [...texts.filter((t) => t !== headline).flatMap((t) => t.lineBoxes), ...mark ? [[p.m, p.top, 260, 64]] : [], ...action ? [actionBox] : [], ...original && o.recipe !== "editorial" ? [p.visual] : []];
  for (let i = 0; i < texts.length; i++) for (let j = i + 1; j < texts.length; j++) if (texts[i].lineBoxes.some((a) => texts[j].lineBoxes.some((b) => intersects(a, b)))) errors.push(`${texts[i].role} overlaps ${texts[j].role}; required copy must remain separate.`);
  for (const text of texts) if (text !== headline && text.lineBoxes.some((b) => b[1] + b[3] > actionY - 16) && text !== action) errors.push(`${text.role} overlaps the protected action safe area.`);
  function drawText(t) {
    if (!t || t.overflow) return;
    setFont(c, t);
    c.fillStyle = t.color;
    for (let i = 0; i < t.lines.length; i++) {
      const line = t.lines[i], w = measure(c, line, t), x = o.alignment === "center" && t.role === "headline" ? t.box[0] + (t.box[2] - w) / 2 : t.box[0];
      if (t.role !== "cta") {
        c.save();
        c.strokeStyle = palette.field;
        c.lineWidth = Math.max(6, t.size * 0.055);
        c.lineJoin = "round";
        c.strokeText(line, x, t.box[1] + i * t.size * t.lineHeight);
        c.restore();
      }
      c.fillText(line, x, t.box[1] + i * t.size * t.lineHeight);
      if (t.role === "headline" && o.emphasis && o.details.underline) {
        const at = line.toLocaleLowerCase().indexOf(o.emphasis.toLocaleLowerCase());
        if (at >= 0) {
          const a = measure(c, line.slice(0, at), t), b = measure(c, line.slice(at, at + o.emphasis.length), t);
          rect2(c, [x + a, t.box[1] + i * t.size * t.lineHeight + t.size * 0.94, b, Math.max(3, t.size * 0.035)], t.color);
        }
      }
    }
    layers.push({ ...t });
    for (const b of t.lineBoxes) hitRegions.push({ role: t.role, x: b[0] * unit, y: b[1] * unit, width: b[2] * unit, height: b[3] * unit });
  }
  function exclude(boxes) {
    for (const [x, y, w, z] of boxes) {
      c.beginPath();
      c.rect(0, 0, 1080, h);
      c.rect(x - 8, y - 8, w + 16, z + 16);
      c.clip("evenodd");
    }
  }
  if (o.details.motif !== "none") {
    c.save();
    exclude([...protectedBoxes, ...headline?.lineBoxes || []]);
    c.globalAlpha = 0.25 + 0.65 * o.details.strength;
    c.strokeStyle = palette.text;
    c.lineWidth = o.details.motif === "ribbon" ? 52 : 3;
    c.beginPath();
    if (o.details.motif === "ribbon") {
      c.moveTo(-80, h * 0.7);
      c.bezierCurveTo(320, h * 0.39, 640, h * 0.95, 1160, h * 0.58);
    } else c.ellipse(690, h * 0.59, 440, h * 0.22, -0.3, 0, Math.PI * 2);
    c.stroke();
    if (o.details.text) {
      const s = manifest.fonts.kicker;
      setFont(c, s);
      c.fillStyle = palette.field;
      c.save();
      c.translate(p.m, h * 0.6);
      c.rotate(-0.12);
      if (measure(c, o.details.text, s) <= 900) c.fillText(o.details.text, 0, 0);
      else warnings.push("Supplied motif text is too long for the ribbon; not drawn.");
      c.restore();
    }
    c.restore();
    layers.push({ role: "motif", motif: o.details.motif, text: o.details.text, strength: o.details.strength });
  }
  if (o.layers.headlineDepth === "behind") drawText(headline);
  if (fg && o.recipe === "hero") {
    const info = alphaInfo(fg, canvas.ownerDocument), t = o.layers.foreground, s = Math.min((p.wide ? 540 : 870) / fg.width, (p.wide ? 300 : p.story ? 1e3 : portraitHeight(format)) * (o.variation === "image-led" ? 1.08 : o.variation === "type-led" ? 0.9 : 1) / fg.height) * t.scale, fw = fg.width * s, fh = fg.height * s, x = t.x * 1080 - fw / 2, y = t.y * h - fh / 2;
    const corners = [[-fw / 2, -fh / 2], [fw / 2, -fh / 2], [fw / 2, fh / 2], [-fw / 2, fh / 2]].map(([a, b]) => {
      const r = t.rotation * Math.PI / 180;
      return [t.x * 1080 + a * Math.cos(r) - b * Math.sin(r), t.y * h + a * Math.sin(r) + b * Math.cos(r)];
    });
    const xs = corners.map((v) => v[0]), ys = corners.map((v) => v[1]), bounds = [Math.min(...xs), Math.min(...ys), Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)];
    const protectedForeground = [...protectedBoxes, ...o.layers.headlineDepth === "behind" ? headline?.lineBoxes || [] : []];
    if (protectedForeground.some((b) => intersects(bounds, b))) warnings.push("Foreground crosses protected copy/logo/action bounds; protective clipping preserves required content. Inspect the silhouette.");
    if (bounds[0] < 0 || bounds[1] < 0 || bounds[0] + bounds[2] > 1080 || bounds[1] + bounds[3] > h) warnings.push("Foreground transform bleeds outside the canvas. Inspect subject clipping.");
    if (!info.hasAlpha) warnings.push("Foreground is opaque: no true alpha detected. No automatic background removal is performed.");
    if (!info.visibleBounds) errors.push("Foreground has no visible pixels.");
    c.save();
    exclude(protectedForeground);
    c.translate(t.x * 1080, t.y * h);
    c.rotate(t.rotation * Math.PI / 180);
    c.shadowColor = `rgba(0,0,0,${t.shadow * 0.45})`;
    c.shadowBlur = 24 * t.shadow;
    c.shadowOffsetY = 12 * t.shadow;
    c.drawImage(fg, -fw / 2, -fh / 2, fw, fh);
    c.restore();
    addAsset("foreground", refs.foregroundAssetId, fg, [x, y, fw, fh], { ...info, transform: { ...t }, rotatedBounds: bounds, protectedExclusions: protectedForeground, protectionIntersectsBounds: protectedForeground.some((b) => intersects(bounds, b)), canvasBoundsClipped: bounds[0] < 0 || bounds[1] < 0 || bounds[0] + bounds[2] > 1080 || bounds[1] + bounds[3] > h, sourceCropped: false });
    layers.push({ role: "foreground", assetId: refs.foregroundAssetId || null, transform: { ...t }, protectedExclusions: protectedForeground });
  } else if (fg && o.recipe === "showcase") warnings.push("Showcase protects its original screenshot; the cutout foreground is not drawn.");
  if (original && o.recipe !== "editorial") {
    const placed = contain2(c, original, p.visual);
    if (texts.some((t) => t.lineBoxes.some((b) => intersects(b, placed)))) errors.push("Original product overlaps required copy; choose another arrangement. The complete screenshot is never cropped or cut out.");
    addAsset("original-product", refs.productAssetId, original, placed, { cropped: false, policy: "contain complete original; no recolouring or perspective" });
    layers.push({ role: "original-product", assetId: refs.productAssetId || null });
  }
  if (o.layers.headlineDepth === "front") drawText(headline);
  for (const t of [body, brand, kicker]) drawText(t);
  if (mark) {
    rect2(c, [p.m - 8, p.top - 8, 276, 80], palette.field);
    addAsset("logo", refs.logoAssetId, mark, contain2(c, mark, [p.m, p.top, 260, 64]), { cropped: false });
    layers.push({ role: "logo", assetId: refs.logoAssetId || null });
  } else warnings.push("No original logo selected. Company name is typeset text, not an authentic logo.");
  if (action) {
    if (o.details.action !== "text") {
      c.fillStyle = palette.action;
      c.beginPath();
      if (o.details.action === "capsule") c.roundRect(...actionBox, actionH / 2);
      else c.rect(...actionBox);
      c.fill();
    } else rect2(c, actionBox, palette.field);
    drawText(action);
    if (!action.overflow) {
      const x = 1080 - p.m - 30, y = actionY + actionH / 2;
      c.strokeStyle = action.color;
      c.lineWidth = 3;
      c.beginPath();
      c.moveTo(x - 22, y);
      c.lineTo(x + 4, y);
      c.moveTo(x - 6, y - 10);
      c.lineTo(x + 4, y);
      c.lineTo(x - 6, y + 10);
      c.stroke();
    }
    layers.push({ role: "action", treatment: o.details.action, box: actionBox });
  }
  manifest.layerOrder = layers.map((l) => l.role);
  manifest.protection = { policy: "Foreground/motif exclude essential text bounds, logo and action; backdrop is atmospheric. Full source pixels remain unchanged.", foregroundExclusions: protectedBoxes };
  for (const region of hitRegions) {
    const inset = manifest.safeRegion.inset;
    if (region.x < inset.left - 0.1 || region.y < inset.top - 0.1 || region.x + region.width > width - inset.right + 0.1 || region.y + region.height > height - inset.bottom + 0.1) errors.push(`${region.role} exceeds this format's conservative safe area.`);
  }
  c.setTransform(1, 0, 0, 1, 0, 0);
  return result();
}
function portraitHeight(format) {
  return format === "portrait" ? 760 : 480;
}

// src/poster-renderer-crisp.js
function resolveCrispPalette(company, poster) {
  const palette = resolvePalette(company, poster);
  if (!Object.hasOwn(company.brandKit || {}, "accent")) return palette;
  const accent = company.brandKit.accent;
  if (typeof accent !== "string" || !/^#[0-9a-fA-F]{6}$/.test(accent)) throw new Error("Choose a six-digit accent colour.");
  return { ...palette, primary: palette.accent, accent, emphasis: contrast(palette.field, accent) >= 3 ? accent : palette.text, action: accent, actionText: contrast(accent, palette.ink) >= contrast(accent, palette.paper) ? palette.ink : palette.paper };
}
var dimensions3 = { square: [1080, 1080], portrait: [1080, 1350], story: [1080, 1920], landscape: [1200, 628] };
var renderTokens3 = /* @__PURE__ */ new WeakMap();
var rect3 = (c, b, color) => {
  c.fillStyle = color;
  c.fillRect(...b);
};
var intersects2 = (a, b) => a[0] < b[0] + b[2] && a[0] + a[2] > b[0] && a[1] < b[1] + b[3] && a[1] + a[3] > b[1];
function contain3(c, img, box) {
  const [x, y, w, h] = box, s = Math.min(w / img.width, h / img.height), p = [x + (w - img.width * s) / 2, y + (h - img.height * s) / 2, img.width * s, img.height * s];
  c.drawImage(img, ...p);
  return p;
}
async function image3(src, role, errors) {
  if (!src) return null;
  try {
    if (typeof src !== "string" || !/^data:image\/(png|jpeg|webp|svg\+xml)[;,]/.test(src)) throw Error("Only local image data is allowed.");
    return await new Promise((resolve, reject) => {
      const img = new Image();
      const timer = setTimeout(() => reject(Error("Image timeout.")), 12e3);
      img.onload = () => {
        clearTimeout(timer);
        img.naturalWidth ? resolve(img) : reject(Error("Empty image."));
      };
      img.onerror = () => {
        clearTimeout(timer);
        reject(Error("Invalid image."));
      };
      img.src = src;
    });
  } catch (e) {
    errors.push(`${role}: the selected local image could not be opened. ${e.message}`);
    return null;
  }
}
function plan2(format, h, recipe) {
  const wide = format === "landscape", story = format === "story", portrait = format === "portrait", m = wide ? 58 : story ? 80 : 64, top = story ? 160 : 54, footer = h - (story ? 160 : 54) - 80;
  let title2 = wide ? [m, 136, 610, 212] : [m, story ? 280 : 172, 1080 - m * 2, story ? 550 : portrait ? 350 : 330];
  let body = wide ? [m, 330, 480, 90] : [m, story ? 1120 : portrait ? 790 : 646, story ? 420 : portrait ? 380 : 370, story ? 390 : portrait ? 250 : 205];
  let visual = wide ? [660, 130, 360, 300] : [m, story ? 790 : portrait ? 590 : 470, 1080 - m * 2, story ? 630 : portrait ? 430 : 330];
  if (recipe === "editorial") {
    title2 = wide ? [m, 150, 490, 230] : [m, story ? 320 : 180, 1080 - m * 2, story ? 560 : portrait ? 450 : 370];
    body = wide ? [610, 150, 410, 280] : [m, story ? 1030 : portrait ? 760 : 650, 1080 - m * 2, footer - (story ? 1030 : portrait ? 760 : 650) - 45];
  }
  if (recipe === "showcase") {
    title2 = wide ? [m, 145, 520, 180] : [m, story ? 280 : 160, 1080 - m * 2, story ? 340 : 230];
    body = wide ? [m, 330, 480, 90] : [m, story ? 1510 : portrait ? 1090 : 832, 1080 - m * 2, story ? 130 : 100];
  }
  return { wide, story, m, top, footer, title: title2, body, visual, size: recipe === "showcase" ? wide ? 84 : 112 : wide ? 88 : story ? 156 : 148 };
}
function setFont2(c, s) {
  c.font = `${s.weight} ${s.size}px "${s.canvasFamily}"`;
  c.fontKerning = "normal";
  c.textBaseline = "top";
  c.textAlign = "left";
  c.letterSpacing = `${s.tracking * s.size}px`;
}
function measure2(c, text, s) {
  setFont2(c, s);
  return c.measureText(text).width;
}
function wrap3(c, value, width, s) {
  const result = [];
  for (const paragraph of String(value).split("\n")) {
    if (!paragraph.trim()) {
      result.push("");
      continue;
    }
    let line = "";
    for (const word of paragraph.trim().split(/\s+/)) {
      const test = line ? line + " " + word : word;
      if (line && measure2(c, test, s) > width) {
        result.push(line);
        line = word;
      } else line = test;
    }
    result.push(line);
  }
  return result;
}
function alphaInfo2(img, doc) {
  const c = doc.createElement("canvas");
  c.width = img.width;
  c.height = img.height;
  const x = c.getContext("2d", { willReadFrequently: true });
  x.drawImage(img, 0, 0);
  const data = x.getImageData(0, 0, c.width, c.height).data;
  let minX = c.width, minY = c.height, maxX = -1, maxY = -1, transparent = 0, partial = 0;
  for (let y = 0; y < c.height; y++) for (let z = 0; z < c.width; z++) {
    const a = data[(y * c.width + z) * 4 + 3];
    if (a < 255) transparent++;
    if (a > 0 && a < 255) partial++;
    if (a > 8) {
      minX = Math.min(minX, z);
      maxX = Math.max(maxX, z);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    }
  }
  return { hasAlpha: transparent > 0, transparentPixels: transparent, partialPixels: partial, visibleBounds: maxX < 0 ? null : [minX, minY, maxX - minX + 1, maxY - minY + 1] };
}
async function renderPosterCrisp(target, resources2) {
  const token = Symbol("poster-v3-compiler-2");
  renderTokens3.set(target, token);
  const staging = target.ownerDocument.createElement("canvas");
  const result = await paint2(staging, resources2);
  if (renderTokens3.get(target) !== token) return { ...result, stale: true, errors: [...result.errors, "A newer render replaced this drawing. Wait for the current preview."] };
  target.width = staging.width;
  target.height = staging.height;
  target.getContext("2d").drawImage(staging, 0, 0);
  return result;
}
async function paint2(canvas, { company = {}, post = {}, design, background, logo, product, foreground, fonts = [], getFont } = {}) {
  const format = dimensions3[post.format] ? post.format : "square", [width, height] = dimensions3[format], unit = width / 1080, h = height / unit;
  canvas.width = width;
  canvas.height = height;
  const c = canvas.getContext("2d"), errors = [], warnings = [], hitRegions = [], layers = [], assets = [];
  const result = () => ({ errors, warnings, width, height, generated: !!design, manifest, hitRegions });
  const refs = { backgroundAssetId: post.backgroundAssetId || "", foregroundAssetId: post.foregroundAssetId || "", logoAssetId: post.logoAssetId ?? company.logoAssetId ?? "", productAssetId: post.productAssetId ?? "" };
  const manifest = { rendererVersion: 3, compilerVersion: 2, recipeVersion: 1, format, width, height, coordinateSpace: { width: 1080, height: h, pixelScale: unit, description: "All boxes, styles and transforms use 1080-wide layout units; hitRegions use output pixels." }, assetReferences: refs, copy: { headline: String(post.headline || post.title || ""), body: String(post.body || ""), cta: String(post.cta || ""), kicker: "" }, fonts: {}, assets, layers };
  let o;
  try {
    o = resolvePoster(post.poster || { version: 3 }, format);
    if (o.version !== 3 || o.compilerVersion !== 2) throw Error("Expected a version 3 poster with compilerVersion 2.");
  } catch (e) {
    errors.push(`Invalid v3 poster: ${e.message}`);
    return result();
  }
  let palette;
  try {
    palette = resolveCrispPalette(company, o);
  } catch (e) {
    errors.push(e.message);
    return result();
  }
  const p = plan2(format, h, o.recipe);
  if (o.recipe === "hero") p.visual = p.wide ? [700, 136, 320, 280] : [530, p.story ? 1020 : format === "portrait" ? 590 : 510, 1080 - p.m - 530, p.story ? 580 : format === "portrait" ? 520 : 370];
  const variationFactor = o.variation === "type-led" ? 1.05 : o.variation === "image-led" ? 0.9 : 1;
  p.size *= variationFactor;
  if (o.variation === "type-led") {
    p.title[3] += p.wide ? 15 : 60;
    p.visual[1] += p.wide ? 12 : 30;
    p.visual[3] -= p.wide ? 12 : 30;
  }
  if (o.variation === "image-led") {
    p.title[1] += p.wide ? 8 : 20;
    p.visual[1] -= p.wide ? 8 : 20;
    p.visual[3] += p.wide ? 8 : 20;
  }
  manifest.options = o;
  manifest.recipe = o.recipe;
  manifest.palette = palette;
  manifest.copy.kicker = o.kicker;
  manifest.safeRegion = { preset: "Brand Studio conservative composition v3 (not platform certification)", inset: { left: p.m * unit, right: p.m * unit, top: p.top * unit, bottom: (p.story ? 160 : 54) * unit } };
  c.scale(unit, unit);
  rect3(c, [0, 0, 1080, h], palette.field);
  if (contrast(palette.field, palette.text) < 4.5) errors.push("The company palette does not supply readable text contrast.");
  if (Object.hasOwn(company.brandKit || {}, "accent") && manifest.copy.cta.trim() && o.details.action !== "text" && contrast(palette.action, palette.actionText) < 4.5) errors.push("Accent and brand ink/paper do not provide readable CTA text contrast. Adjust these company colours before reviewing.");
  let roleFonts;
  try {
    roleFonts = await loadRoleFonts({ voice: o.voice, typography: o.typography, fonts, getFont, companyId: company.id, doc: canvas.ownerDocument });
  } catch (e) {
    errors.push(`Required v3 fonts failed to load. ${e.message}`);
    return result();
  }
  const sizes = { headline: p.size * o.scale, body: p.wide ? 30 : 36, cta: p.story ? 36 : 32, kicker: 26, brand: 30 };
  for (const role of Object.keys(roleFonts)) {
    const style = o.typography[role];
    manifest.fonts[role] = { ...roleFonts[role], size: style.size ?? sizes[role], lineHeight: style.lineHeight ?? (role === "headline" ? 1.02 : role === "body" ? 1.3 : 1.1), tracking: style.tracking };
  }
  for (const [role, value] of Object.entries({ ...manifest.copy, brand: company.name || "", details: o.details.text })) {
    const font2 = manifest.fonts[role === "details" ? "kicker" : role], missing = unsupportedGlyphs(value, font2.coverage);
    if (missing.length) errors.push(`${role}: selected font cmap does not support ${missing.join(" ")}. Export is blocked; no fallback is used.`);
  }
  if (!manifest.copy.headline.trim()) errors.push("Add a headline before exporting.");
  const [bg, mark, original, fg] = await Promise.all([image3(background, "Backdrop", errors), image3(logo, "Logo", errors), image3(product, "Product / screenshot", errors), image3(foreground, "Foreground", errors)]);
  for (const [key, resource] of [["backgroundAssetId", bg], ["foregroundAssetId", fg], ["logoAssetId", mark], ["productAssetId", original]]) if (refs[key] && !resource) errors.push(`Selected ${key} is missing. Restore the exact resource before exporting.`);
  for (const [key, resource] of [["backgroundAssetId", bg], ["foregroundAssetId", fg], ["logoAssetId", mark], ["productAssetId", original]]) if (resource && !refs[key]) errors.push(`${key}: resource has no explicit selected ID. Bind the exact resource before review; latest-design attribution is never substituted.`);
  if (o.recipe === "showcase" && !original) errors.push("Showcase requires an original product image or screenshot.");
  if (o.recipe === "editorial" && (bg || fg || original)) warnings.push("Editorial is type-only except the original logo. Selected imagery is not drawn; do not commission an editorial backdrop.");
  const addAsset = (role, id, img, box, extra = {}) => {
    const asset = { role, assetId: id || null, x: box[0], y: box[1], width: box[2], height: box[3], sourceWidth: img.width, sourceHeight: img.height, ...extra };
    assets.push(asset);
    if (img.width < box[2] * unit || img.height < box[3] * unit) warnings.push(`${role}: below placed resolution; inspect native PNG.`);
    return asset;
  };
  if (bg && o.recipe !== "editorial") {
    c.save();
    c.globalAlpha = o.layers.background.opacity;
    c.filter = `blur(${o.layers.background.blur}px)`;
    const s = Math.max(1080 / bg.width, h / bg.height) * o.heroScale, bw = bg.width * s, bh = bg.height * s, bx = (1080 - bw) * o.cropX, by = (h - bh) * o.cropY;
    c.drawImage(bg, bx, by, bw, bh);
    c.restore();
    addAsset("backdrop", refs.backgroundAssetId, bg, [bx, by, bw, bh], { opacity: o.layers.background.opacity, blur: o.layers.background.blur, heroScale: o.heroScale, cropX: o.cropX, cropY: o.cropY });
    layers.push({ role: "backdrop", assetId: refs.backgroundAssetId || null });
  }
  if (o.details.surface === "tonal") {
    const gradient = c.createLinearGradient(0, 0, 1080, h);
    gradient.addColorStop(0, palette.field);
    gradient.addColorStop(1, palette.ink);
    c.save();
    c.globalAlpha = 0.12 * o.details.strength;
    c.fillStyle = gradient;
    c.fillRect(0, 0, 1080, h);
    c.restore();
    layers.push({ role: "tonal", strength: o.details.strength });
  }
  const texts = [], textBackings = [];
  const needsTextBacking = bg && o.recipe !== "editorial" && o.layers.background.opacity > 0 || o.details.surface === "tonal" && o.details.strength > 0;
  function backText(t) {
    if (!needsTextBacking || t.role === "cta" || !t.lineBoxes.length) return;
    const boxes = [...t.lineBoxes];
    for (let i = 0; i < t.lines.length; i++) {
      const line = t.lines[i];
      if (!line) continue;
      const m = c.measureText(line), w = m.width, x2 = o.alignment === "center" && t.role === "headline" ? t.box[0] + (t.box[2] - w) / 2 : t.box[0], y2 = t.box[1] + i * t.size * t.lineHeight;
      boxes.push([x2 - m.actualBoundingBoxLeft, y2 - m.actualBoundingBoxAscent, m.actualBoundingBoxLeft + m.actualBoundingBoxRight, m.actualBoundingBoxAscent + m.actualBoundingBoxDescent]);
    }
    const x = Math.min(...boxes.map((b) => b[0])) - 8, y = Math.min(...boxes.map((b) => b[1])) - 8, right = Math.max(...boxes.map((b) => b[0] + b[2])) + 8, bottom = Math.max(...boxes.map((b) => b[1] + b[3])) + 8, box = [x, y, right - x, bottom - y];
    c.save();
    rect3(c, box, palette.field);
    c.restore();
    const block = { role: t.role, box, color: palette.field, treatment: "opaque-palette-field-block" };
    textBackings.push(block);
    layers.push({ role: "text-protection", textRole: t.role, box, color: palette.field });
  }
  function prepare(role, value, box, color = palette.text) {
    if (!value) return null;
    const style = manifest.fonts[role], lines = wrap3(c, value, box[2], style), height2 = lines.length * style.size * style.lineHeight, overflow = height2 > box[3] + 0.1 || lines.some((line) => measure2(c, line, style) > box[2] + 0.1);
    const layer = { role, text: value, box: [...box], ...style, lines, overflow, color };
    texts.push(layer);
    if (overflow) errors.push(`${role} does not fit at the selected ${style.size}px size/leading/tracking. Explicit styles are never silently shrunk; edit copy or choose another arrangement.`);
    layer.lineBoxes = lines.map((line, index) => {
      if (!line) return null;
      const w = measure2(c, line, style), x = o.alignment === "center" && role === "headline" ? box[0] + (box[2] - w) / 2 : box[0];
      return [x, box[1] + index * style.size * style.lineHeight, w, style.size * style.lineHeight];
    }).filter(Boolean);
    return layer;
  }
  const headline = prepare("headline", manifest.copy.headline, p.title);
  const body = prepare("body", manifest.copy.body, p.body);
  const brand = mark ? null : prepare("brand", company.name || "", [p.m, p.top, 500, 70]);
  const kicker = prepare("kicker", manifest.copy.kicker, [620, p.top, 1080 - p.m - 620, 70]);
  const actionStyle = manifest.fonts.cta, actionH = Math.max(80, actionStyle.size * actionStyle.lineHeight + 32), actionY = p.footer + 80 - actionH, actionBox = [p.m, actionY, 1080 - 2 * p.m, actionH];
  const action = prepare("cta", manifest.copy.cta, [p.m + 24, actionY + 16, actionBox[2] - 104, actionH - 32], o.details.action === "text" ? palette.text : palette.actionText);
  const protectedBoxes = [...texts.filter((t) => t !== headline).flatMap((t) => t.lineBoxes), ...mark ? [[p.m, p.top, 260, 64]] : [], ...action ? [actionBox] : [], ...original && o.recipe !== "editorial" ? [p.visual] : []];
  for (let i = 0; i < texts.length; i++) for (let j = i + 1; j < texts.length; j++) if (texts[i].lineBoxes.some((a) => texts[j].lineBoxes.some((b) => intersects2(a, b)))) errors.push(`${texts[i].role} overlaps ${texts[j].role}; required copy must remain separate.`);
  for (const text of texts) if (text !== headline && text.lineBoxes.some((b) => b[1] + b[3] > actionY - 16) && text !== action) errors.push(`${text.role} overlaps the protected action safe area.`);
  function drawText(t) {
    if (!t || t.overflow) return;
    setFont2(c, t);
    backText(t);
    c.fillStyle = t.color;
    for (let i = 0; i < t.lines.length; i++) {
      const line = t.lines[i], w = measure2(c, line, t), x = o.alignment === "center" && t.role === "headline" ? t.box[0] + (t.box[2] - w) / 2 : t.box[0];
      c.fillText(line, x, t.box[1] + i * t.size * t.lineHeight);
      if (t.role === "headline" && o.emphasis && o.details.underline) {
        const at = line.toLocaleLowerCase().indexOf(o.emphasis.toLocaleLowerCase());
        if (at >= 0) {
          const a = measure2(c, line.slice(0, at), t), b = measure2(c, line.slice(at, at + o.emphasis.length), t);
          rect3(c, [x + a, t.box[1] + i * t.size * t.lineHeight + t.size * 0.94, b, Math.max(3, t.size * 0.035)], t.color);
        }
      }
    }
    layers.push({ ...t });
    for (const b of t.lineBoxes) hitRegions.push({ role: t.role, x: b[0] * unit, y: b[1] * unit, width: b[2] * unit, height: b[3] * unit });
  }
  function exclude(boxes) {
    for (const [x, y, w, z] of boxes) {
      c.beginPath();
      c.rect(0, 0, 1080, h);
      c.rect(x - 8, y - 8, w + 16, z + 16);
      c.clip("evenodd");
    }
  }
  if (o.details.motif !== "none") {
    c.save();
    exclude([...protectedBoxes, ...headline?.lineBoxes || []]);
    c.globalAlpha = 0.25 + 0.65 * o.details.strength;
    c.strokeStyle = palette.text;
    c.lineWidth = o.details.motif === "ribbon" ? 52 : 3;
    c.beginPath();
    if (o.details.motif === "ribbon") {
      c.moveTo(-80, h * 0.7);
      c.bezierCurveTo(320, h * 0.39, 640, h * 0.95, 1160, h * 0.58);
    } else c.ellipse(690, h * 0.59, 440, h * 0.22, -0.3, 0, Math.PI * 2);
    c.stroke();
    if (o.details.text) {
      const s = manifest.fonts.kicker;
      setFont2(c, s);
      c.fillStyle = palette.field;
      c.save();
      c.translate(p.m, h * 0.6);
      c.rotate(-0.12);
      if (measure2(c, o.details.text, s) <= 900) c.fillText(o.details.text, 0, 0);
      else warnings.push("Supplied motif text is too long for the ribbon; not drawn.");
      c.restore();
    }
    c.restore();
    layers.push({ role: "motif", motif: o.details.motif, text: o.details.text, strength: o.details.strength });
  }
  if (o.layers.headlineDepth === "behind") drawText(headline);
  if (fg && o.recipe === "hero") {
    const info = alphaInfo2(fg, canvas.ownerDocument), t = o.layers.foreground, s = Math.min((p.wide ? 540 : 870) / fg.width, (p.wide ? 300 : p.story ? 1e3 : portraitHeight2(format)) * (o.variation === "image-led" ? 1.08 : o.variation === "type-led" ? 0.9 : 1) / fg.height) * t.scale, fw = fg.width * s, fh = fg.height * s, x = t.x * 1080 - fw / 2, y = t.y * h - fh / 2;
    const corners = [[-fw / 2, -fh / 2], [fw / 2, -fh / 2], [fw / 2, fh / 2], [-fw / 2, fh / 2]].map(([a, b]) => {
      const r = t.rotation * Math.PI / 180;
      return [t.x * 1080 + a * Math.cos(r) - b * Math.sin(r), t.y * h + a * Math.sin(r) + b * Math.cos(r)];
    });
    const xs = corners.map((v) => v[0]), ys = corners.map((v) => v[1]), bounds = [Math.min(...xs), Math.min(...ys), Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)];
    const protectedForeground = [...protectedBoxes, ...o.layers.headlineDepth === "behind" ? headline?.lineBoxes || [] : []];
    if (protectedForeground.some((b) => intersects2(bounds, b))) warnings.push("Foreground crosses protected copy/logo/action bounds; protective clipping preserves required content. Inspect the silhouette.");
    if (bounds[0] < 0 || bounds[1] < 0 || bounds[0] + bounds[2] > 1080 || bounds[1] + bounds[3] > h) warnings.push("Foreground transform bleeds outside the canvas. Inspect subject clipping.");
    if (!info.hasAlpha) warnings.push("Foreground is opaque: no true alpha detected. No automatic background removal is performed.");
    if (!info.visibleBounds) errors.push("Foreground has no visible pixels.");
    c.save();
    exclude(protectedForeground);
    c.translate(t.x * 1080, t.y * h);
    c.rotate(t.rotation * Math.PI / 180);
    c.shadowColor = `rgba(0,0,0,${t.shadow * 0.45})`;
    c.shadowBlur = 24 * t.shadow;
    c.shadowOffsetY = 12 * t.shadow;
    c.drawImage(fg, -fw / 2, -fh / 2, fw, fh);
    c.restore();
    addAsset("foreground", refs.foregroundAssetId, fg, [x, y, fw, fh], { ...info, transform: { ...t }, rotatedBounds: bounds, protectedExclusions: protectedForeground, protectionIntersectsBounds: protectedForeground.some((b) => intersects2(bounds, b)), canvasBoundsClipped: bounds[0] < 0 || bounds[1] < 0 || bounds[0] + bounds[2] > 1080 || bounds[1] + bounds[3] > h, sourceCropped: false });
    layers.push({ role: "foreground", assetId: refs.foregroundAssetId || null, transform: { ...t }, protectedExclusions: protectedForeground });
  } else if (fg && o.recipe === "showcase") warnings.push("Showcase protects its original screenshot; the cutout foreground is not drawn.");
  if (original && o.recipe !== "editorial") {
    const placed = contain3(c, original, p.visual);
    if (texts.some((t) => t.lineBoxes.some((b) => intersects2(b, placed)))) errors.push("Original product overlaps required copy; choose another arrangement. The complete screenshot is never cropped or cut out.");
    addAsset("original-product", refs.productAssetId, original, placed, { cropped: false, policy: "contain complete original; no recolouring or perspective" });
    layers.push({ role: "original-product", assetId: refs.productAssetId || null });
  }
  if (o.layers.headlineDepth === "front") drawText(headline);
  for (const t of [body, brand, kicker]) drawText(t);
  if (mark) {
    rect3(c, [p.m - 8, p.top - 8, 276, 80], palette.field);
    addAsset("logo", refs.logoAssetId, mark, contain3(c, mark, [p.m, p.top, 260, 64]), { cropped: false });
    layers.push({ role: "logo", assetId: refs.logoAssetId || null });
  } else warnings.push("No original logo selected. Company name is typeset text, not an authentic logo.");
  if (action) {
    if (o.details.action !== "text") {
      c.fillStyle = palette.action;
      c.beginPath();
      if (o.details.action === "capsule") c.roundRect(...actionBox, actionH / 2);
      else c.rect(...actionBox);
      c.fill();
    } else rect3(c, actionBox, palette.field);
    drawText(action);
    if (!action.overflow) {
      const x = 1080 - p.m - 30, y = actionY + actionH / 2;
      c.strokeStyle = action.color;
      c.lineWidth = 3;
      c.beginPath();
      c.moveTo(x - 22, y);
      c.lineTo(x + 4, y);
      c.moveTo(x - 6, y - 10);
      c.lineTo(x + 4, y);
      c.lineTo(x - 6, y + 10);
      c.stroke();
    }
    layers.push({ role: "action", treatment: o.details.action, box: actionBox });
  }
  manifest.layerOrder = layers.map((l) => l.role);
  manifest.protection = { policy: "Fill-only glyphs. Visible backdrops and tonal surfaces receive one opaque palette-field rectangle per non-CTA text block. Foreground/motif exclusions and original source pixels remain unchanged.", textRendering: "fill-only", textBlocks: textBackings, foregroundExclusions: protectedBoxes };
  for (const region of hitRegions) {
    const inset = manifest.safeRegion.inset;
    if (region.x < inset.left - 0.1 || region.y < inset.top - 0.1 || region.x + region.width > width - inset.right + 0.1 || region.y + region.height > height - inset.bottom + 0.1) errors.push(`${region.role} exceeds this format's conservative safe area.`);
  }
  c.setTransform(1, 0, 0, 1, 0, 0);
  return result();
}
function portraitHeight2(format) {
  return format === "portrait" ? 760 : 480;
}

// motif-resources.js
var resources = {
  "ribbon-v1": {
    "id": "ribbon-v1",
    "version": 1,
    "sha256": "4e5fe18d3804fb9893f8e322ac704c5b02f6c695f6aa77ec351e9ca6ab6b2f46",
    "viewBox": "0 0 1000 600",
    "svg": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600" width="1000" height="600" role="img" aria-labelledby="ribbon-v1-title ribbon-v1-desc">\n  <title id="ribbon-v1-title">Continuous ribbon</title>\n  <desc id="ribbon-v1-desc">An open folded ribbon suggesting creative continuity.</desc>\n  <g id="ribbon-v1-geometry" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"><path d="M72 344 C170 100 294 100 374 290 S550 492 650 282 S806 104 928 190" stroke-width="48"/></g>\n</svg>\n'
  },
  "orbit-v1": {
    "id": "orbit-v1",
    "version": 1,
    "sha256": "83ee4c54d3adb92bc52078c5274ee64b49ee3a1ec02c5b10e450272a5c2d6770",
    "viewBox": "0 0 1000 600",
    "svg": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600" width="1000" height="600" role="img" aria-labelledby="orbit-v1-title orbit-v1-desc">\n  <title id="orbit-v1-title">Intersecting orbits</title>\n  <desc id="orbit-v1-desc">Three open orbital rings suggesting connected perspectives.</desc>\n  <g id="orbit-v1-geometry" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="500" cy="300" rx="390" ry="134" transform="rotate(-24 500 300)"/><ellipse cx="500" cy="300" rx="330" ry="190" transform="rotate(24 500 300)"/><circle cx="500" cy="300" r="40"/></g>\n</svg>\n'
  },
  "proof-marks-v1": {
    "id": "proof-marks-v1",
    "version": 1,
    "sha256": "d6f0339bd152cf1110828294fcf3762614e0ae0b4c71eb246116f279797525f9",
    "viewBox": "0 0 1000 600",
    "svg": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600" width="1000" height="600" role="img" aria-labelledby="proof-marks-v1-title proof-marks-v1-desc">\n  <title id="proof-marks-v1-title">Proof marks</title>\n  <desc id="proof-marks-v1-desc">Open crop corners and offset registration crosses expressing editorial craft, not approval or proof of a claim.</desc>\n  <g id="proof-marks-v1-geometry" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"><path d="M272 118 H128 V256 M728 118 H872 V256 M128 354 V492 H272 M872 354 V492 H728 M446 240 H510 M478 208 V272 M530 328 H594 M562 296 V360"/></g>\n</svg>\n'
  },
  "responsive-frames-v1": {
    "id": "responsive-frames-v1",
    "version": 1,
    "sha256": "539cfa9e1d288ba25231682cef8c6be3d347df2335a0cb4e82a0b7030c9e2243",
    "viewBox": "0 0 1000 600",
    "svg": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600" width="1000" height="600" role="img" aria-labelledby="responsive-frames-v1-title responsive-frames-v1-desc">\n  <title id="responsive-frames-v1-title">Responsive frames</title>\n  <desc id="responsive-frames-v1-desc">Three nested device-independent frames expressing adaptable design.</desc>\n  <g id="responsive-frames-v1-geometry" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"><rect x="98" y="110" width="700" height="370" rx="14"/><rect x="400" y="176" width="384" height="292" rx="12"/><rect x="728" y="244" width="174" height="246" rx="18"/><path d="M132 150 H356 M760 450 H870"/></g>\n</svg>\n'
  },
  "answer-exchange-v1": {
    "id": "answer-exchange-v1",
    "version": 1,
    "sha256": "31c39e657bb47fcdb19aa10f9986397aa9082cb350368fb5abeb97897d444dc8",
    "viewBox": "0 0 1000 600",
    "svg": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600" width="1000" height="600" role="img" aria-labelledby="answer-exchange-v1-title answer-exchange-v1-desc">\n  <title id="answer-exchange-v1-title">Answer exchange</title>\n  <desc id="answer-exchange-v1-desc">Two open conversation forms connected in an exchange of questions and answers, without invented interface text.</desc>\n  <g id="answer-exchange-v1-geometry" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"><path d="M560 120 H110 V328 H230 V416 L338 328 H604 V226 M666 210 H890 V432 H804 V506 L706 432 H466 V384"/></g>\n</svg>\n'
  },
  "research-folio-v1": {
    "id": "research-folio-v1",
    "version": 1,
    "sha256": "41576f4361fa4f3cc06adba7435627e2f334bfad97ab7a2d114405a27e3a7e8d",
    "viewBox": "0 0 1000 600",
    "svg": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600" width="1000" height="600" role="img" aria-labelledby="research-folio-v1-title research-folio-v1-desc">\n  <title id="research-folio-v1-title">Research folio</title>\n  <desc id="research-folio-v1-desc">Overlapping document sheets and a magnifying lens representing inquiry, not a chart.</desc>\n  <g id="research-folio-v1-geometry" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"><path d="M188 112 L604 76 L636 444 L220 480 Z M290 154 H710 V502 H290 Z M350 216 H598 M350 270 H550 M350 324 H472"/><circle cx="688" cy="370" r="106"/><path d="M764 446 L870 532"/></g>\n</svg>\n'
  },
  "decision-junction-v1": {
    "id": "decision-junction-v1",
    "version": 1,
    "sha256": "c917b5d3fc3f850b7d6d2d28825ea7e3fcd6bd9c12dada64971c9e2728a0aab4",
    "viewBox": "0 0 1000 600",
    "svg": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600" width="1000" height="600" role="img" aria-labelledby="decision-junction-v1-title decision-junction-v1-desc">\n  <title id="decision-junction-v1-title">Decision junction</title>\n  <desc id="decision-junction-v1-desc">A source path branches to two equal destinations without invented scores.</desc>\n  <g id="decision-junction-v1-geometry" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"><path d="M152 300 H400 M500 300 H668 V144 H844 M668 300 V456 H844"/><path d="M400 300 L450 250 L500 300 L450 350 Z"/><circle cx="120" cy="300" r="32"/><rect x="844" y="112" width="64" height="64" rx="8"/><rect x="844" y="424" width="64" height="64" rx="8"/></g>\n</svg>\n'
  },
  "interface-modules-v1": {
    "id": "interface-modules-v1",
    "version": 1,
    "sha256": "8c830f5d9fd52e5566acfd98d2ae854c4251c33a9dffa9ef24635902e495367b",
    "viewBox": "0 0 1000 600",
    "svg": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600" width="1000" height="600" role="img" aria-labelledby="interface-modules-v1-title interface-modules-v1-desc">\n  <title id="interface-modules-v1-title">Interface modules</title>\n  <desc id="interface-modules-v1-desc">Three equal outlined conceptual system modules joined by short explicit ports, without faux interface chrome or text.</desc>\n  <g id="interface-modules-v1-geometry" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"><rect x="96" y="190" width="224" height="220" rx="8"/><rect x="388" y="190" width="224" height="220" rx="8"/><rect x="680" y="190" width="224" height="220" rx="8"/><path d="M320 300 H388 M612 300 H680"/></g>\n</svg>\n'
  }
};
for (const record of Object.values(resources)) Object.freeze(record);
var MOTIF_RESOURCES = Object.freeze(resources);
function motifSvg(id, colour2, opacity = 1) {
  if (!Object.hasOwn(MOTIF_RESOURCES, id)) throw Error("Choose a trusted motif.");
  if (typeof colour2 !== "string" || !/^#[0-9a-f]{6}$/i.test(colour2)) throw Error("Motif colour must be a six-digit hex colour.");
  if (typeof opacity !== "number" || !Number.isFinite(opacity) || opacity < 0 || opacity > 1) throw Error("Motif opacity must be between 0 and 1.");
  return MOTIF_RESOURCES[id].svg.replace('fill="none" stroke="currentColor"', `opacity="${opacity}" fill="none" stroke="${colour2}"`);
}

// src/poster-renderer-flex.js
var dimensions4 = { square: [1080, 1080], portrait: [1080, 1350], story: [1080, 1920], landscape: [1200, 628] };
var tokens = /* @__PURE__ */ new WeakMap();
var intersects3 = (a, b) => a[0] < b[0] + b[2] && a[0] + a[2] > b[0] && a[1] < b[1] + b[3] && a[1] + a[3] > b[1];
var newCanvas = (doc, w, h) => {
  const c = doc.createElement("canvas");
  c.width = w;
  c.height = h;
  return c;
};
function setFont3(c, s) {
  c.font = `${s.weight} ${s.size}px "${s.canvasFamily}"`;
  c.fontKerning = "normal";
  c.textBaseline = "top";
  c.textAlign = "left";
  c.letterSpacing = `${s.tracking * s.size}px`;
}
function wrap4(c, value, width, s) {
  setFont3(c, s);
  const lines = [];
  for (const paragraph of String(value).split("\n")) {
    let line = "";
    for (const word of paragraph.trim().split(/\s+/)) {
      const next = line ? line + " " + word : word;
      if (line && c.measureText(next).width > width) {
        lines.push(line);
        line = word;
      } else line = next;
    }
    lines.push(line);
  }
  return lines;
}
async function image4(src, role, errors) {
  if (!src) return null;
  try {
    if (typeof src !== "string" || !/^data:image\/(png|jpeg|webp|svg\+xml)[;,]/.test(src)) throw Error("Only local image data is allowed.");
    return await new Promise((resolve, reject) => {
      const img = new Image(), timer = setTimeout(() => reject(Error("Image timeout.")), 12e3);
      img.onload = () => {
        clearTimeout(timer);
        img.naturalWidth ? resolve(img) : reject(Error("Empty image."));
      };
      img.onerror = () => {
        clearTimeout(timer);
        reject(Error("Invalid image."));
      };
      img.src = src;
    });
  } catch (e) {
    errors.push(`${role}: selected local image could not be opened. ${e.message}`);
    return null;
  }
}
function contain4(c, img, box) {
  const [x, y, w, h] = box, s = Math.min(w / img.width, h / img.height), placed = [x + (w - img.width * s) / 2, y + (h - img.height * s) / 2, img.width * s, img.height * s];
  c.drawImage(img, ...placed);
  return placed;
}
function paintText(c, t) {
  setFont3(c, t);
  c.fillStyle = t.color || "#ffffff";
  for (let i = 0; i < t.lines.length; i++) c.fillText(t.lines[i], t.positions[i][0], t.positions[i][1]);
}
function lum(r, g, b) {
  const f = (x) => {
    x /= 255;
    return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
function colourLum(hex2) {
  return lum(...hex2.slice(1).match(/../g).map((s) => parseInt(s, 16)));
}
var ratio = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
function shape(c, style, box) {
  const [x, y, w, h] = box;
  c.beginPath();
  if (style === "rounded" || style === "pill") c.roundRect(x, y, w, h, style === "pill" ? h / 2 : Math.min(18, h / 4));
  else if (style === "outline") c.rect(x + 1, y + 1, Math.max(0, w - 2), Math.max(0, h - 2));
  else c.rect(x, y, w, h);
}
async function renderPosterFlexible(target, resources2) {
  const token = Symbol("poster-compiler-3");
  tokens.set(target, token);
  const staging = target.ownerDocument.createElement("canvas"), result = await paint3(staging, resources2);
  if (tokens.get(target) !== token) return { ...result, stale: true, errors: [...result.errors, "A newer render replaced this drawing. Wait for the current preview."] };
  target.width = staging.width;
  target.height = staging.height;
  target.getContext("2d").drawImage(staging, 0, 0);
  return result;
}
async function paint3(canvas, { company = {}, post = {}, design, background, logo, product, foreground, fonts = [], getFont } = {}) {
  const format = dimensions4[post.format] ? post.format : "square", [width, height] = dimensions4[format], unit = width / 1080, h = height / unit, doc = canvas.ownerDocument;
  canvas.width = width;
  canvas.height = height;
  const c = canvas.getContext("2d", { willReadFrequently: true }), errors = [], warnings = [], assets = [], layers = [], hitRegions = [];
  const refs = { backgroundAssetId: post.backgroundAssetId || "", foregroundAssetId: post.foregroundAssetId || "", logoAssetId: post.logoAssetId ?? company.logoAssetId ?? "", productAssetId: post.productAssetId ?? "" };
  const manifest = { rendererVersion: 3, compilerVersion: 3, recipeVersion: 1, format, width, height, coordinateSpace: { width: 1080, height: h, pixelScale: unit, description: "Boxes/styles/transforms use 1080-wide layout units; hitRegions use output pixels." }, assetReferences: refs, copy: { headline: String(post.headline || post.title || ""), body: String(post.body || ""), cta: String(post.cta || ""), kicker: "" }, fonts: {}, assets, layers, protection: { textRendering: "fill-only", textBlocks: [], foregroundExclusions: [], nonCtaBackground: "none", contrast: { method: "opaque-glyph-interior", minimum: 4.5, roles: [] } } };
  const result = () => ({ errors, warnings, width, height, generated: !!design, manifest, hitRegions });
  let o, p, palette;
  try {
    o = resolvePoster(post.poster || {}, format);
    if (o.version !== 3 || o.compilerVersion !== 3) throw Error("Expected poster version 3 / compilerVersion 3.");
    p = layoutPlan(o.composition.layout, format, o.composition.density);
    const oldPalette = resolveCrispPalette(company, o);
    palette = { ...oldPalette, primary: oldPalette.primary ?? oldPalette.accent, accent: company.brandKit?.accent ?? oldPalette.ink };
    palette.action = palette.accent;
    palette.actionText = contrast(palette.action, palette.ink) >= contrast(palette.action, palette.paper) ? palette.ink : palette.paper;
  } catch (e) {
    errors.push(`Invalid flexible poster: ${e.message}`);
    return result();
  }
  manifest.options = o;
  manifest.recipe = o.recipe;
  manifest.palette = palette;
  manifest.copy.kicker = o.kicker;
  manifest.layout = { ...LAYOUT_RESOURCES[o.composition.layout] };
  const motif = o.motif.id === "none" ? { id: "none", version: 1, sha256: null, viewBox: null } : MOTIF_RESOURCES[o.motif.id];
  if (!motif) {
    errors.push("Selected trusted motif is unavailable.");
    return result();
  }
  manifest.motif = { id: motif.id, version: motif.version, sha256: motif.sha256, viewBox: motif.viewBox, opacity: o.motif.opacity, transform: { x: o.motif.x, y: o.motif.y, scale: o.motif.scale, rotation: o.motif.rotation }, painted: false };
  manifest.cta = { style: o.cta.style, width: o.cta.width, align: o.cta.align, fill: null, text: null, shapeBounds: null, textBounds: null, arrow: o.cta.arrow, painted: false };
  manifest.safeRegion = { preset: "Brand Studio authored flexible composition (not platform certification)", inset: { left: (format === "story" ? 80 : format === "landscape" ? 42 : 54) * unit, right: (format === "story" ? 80 : format === "landscape" ? 42 : 54) * unit, top: (format === "story" ? 145 : 40) * unit, bottom: (format === "story" ? 130 : 40) * unit } };
  c.scale(unit, unit);
  c.fillStyle = palette.field;
  c.fillRect(0, 0, 1080, h);
  let roleFonts;
  try {
    roleFonts = await loadRoleFonts({ voice: o.voice, typography: o.typography, fonts, getFont, companyId: company.id, doc });
  } catch (e) {
    errors.push(`Required flexible fonts failed to load. ${e.message}`);
    return result();
  }
  const sizes = { headline: p.headlineSize * o.scale, body: p.bodySize, cta: p.ctaSize, kicker: format === "landscape" ? 18 : 22, brand: format === "landscape" ? 22 : 28 };
  for (const role of Object.keys(roleFonts)) {
    const s = o.typography[role];
    manifest.fonts[role] = { ...roleFonts[role], size: s.size ?? sizes[role], lineHeight: s.lineHeight ?? (role === "headline" ? p.leading : role === "body" ? 1.3 : 1.15), tracking: s.tracking };
  }
  if (p.copyFlow) {
    const headline = manifest.fonts.headline, body = manifest.fonts.body, flow = flowCopyPlan(p, { headlineHeight: wrap4(c, manifest.copy.headline, p.title[2], headline).length * headline.size * headline.lineHeight, bodyHeight: manifest.copy.body.trim() ? wrap4(c, manifest.copy.body, p.body[2], body).length * body.size * body.lineHeight : 0, hasBody: !!manifest.copy.body.trim() }), bottom = p.copyFlow.box[1] + p.copyFlow.box[3];
    p.title[3] = bottom - p.title[1];
    p.body[1] = flow.bodyY;
    p.body[3] = Math.max(0, bottom - flow.bodyY);
    p.cta[1] = flow.ctaY;
    p.cta[3] = Math.max(0, bottom - flow.ctaY);
  }
  for (const [role, value] of Object.entries({ ...manifest.copy, brand: company.name || "", annotation: o.details.text })) {
    const font2 = manifest.fonts[role === "annotation" ? "kicker" : role], missing = unsupportedGlyphs(value, font2.coverage);
    if (missing.length) errors.push(`${role}: selected font cmap does not support ${missing.join(" ")}. Export is blocked; no fallback is used.`);
  }
  if (!manifest.copy.headline.trim()) errors.push("Add a headline before exporting.");
  const [bg, mark, original, fg] = await Promise.all([image4(background, "Backdrop", errors), image4(logo, "Logo", errors), image4(product, "Original product", errors), image4(foreground, "Foreground", errors)]);
  for (const [key, img] of [["backgroundAssetId", bg], ["foregroundAssetId", fg], ["logoAssetId", mark], ["productAssetId", original]]) {
    if (refs[key] && !img) errors.push(`Selected ${key} is missing. Restore the exact resource before exporting.`);
    if (img && !refs[key]) errors.push(`${key}: resource has no explicit selected ID. Bind the exact resource before review.`);
  }
  if (o.recipe === "showcase" && !original) errors.push("Showcase requires a complete original product image or screenshot.");
  if (o.recipe === "editorial" && (bg || fg || original)) warnings.push("Editorial is type-only except the original logo. Selected imagery is not drawn.");
  const addAsset = (role, id, img, box, extra = {}) => {
    assets.push({ role, assetId: id || null, x: box[0], y: box[1], width: box[2], height: box[3], sourceWidth: img.width, sourceHeight: img.height, ...extra });
    if (img.width < box[2] * unit || img.height < box[3] * unit) warnings.push(`${role}: below placed resolution; inspect the native PNG.`);
    layers.push({ role, assetId: id || null, box });
  };
  if (bg && o.recipe !== "editorial") {
    c.save();
    c.globalAlpha = o.layers.background.opacity;
    c.filter = `blur(${o.layers.background.blur}px)`;
    const s = Math.max(1080 / bg.width, h / bg.height) * o.heroScale, bw = bg.width * s, bh = bg.height * s, bx = (1080 - bw) * o.cropX, by = (h - bh) * o.cropY;
    c.drawImage(bg, bx, by, bw, bh);
    c.restore();
    addAsset("backdrop", refs.backgroundAssetId, bg, [bx, by, bw, bh], { opacity: o.layers.background.opacity, blur: o.layers.background.blur });
  }
  if (o.details.surface === "tonal") {
    const gradient = c.createLinearGradient(0, 0, 1080, h);
    gradient.addColorStop(0, palette.field);
    gradient.addColorStop(1, palette.ink);
    c.save();
    c.globalAlpha = 0.12 * o.details.strength;
    c.fillStyle = gradient;
    c.fillRect(0, 0, 1080, h);
    c.restore();
    layers.push({ role: "tonal", strength: o.details.strength });
  }
  if (motif.id !== "none" && o.motif.opacity > 0) {
    const color = o.motif.color === "auto" ? palette.text : palette[o.motif.color];
    const img = await image4("data:image/svg+xml," + encodeURIComponent(motifSvg(motif.id, color, 1)), "Trusted motif", errors);
    if (img) {
      const mw = 650 * o.motif.scale, mh = mw * 0.6;
      c.save();
      c.translate(o.motif.x * 1080, o.motif.y * h);
      c.rotate(o.motif.rotation * Math.PI / 180);
      c.globalAlpha = o.motif.opacity;
      c.drawImage(img, -mw / 2, -mh / 2, mw, mh);
      c.restore();
      manifest.motif.painted = true;
      layers.push({ role: "motif", ...manifest.motif, color });
    }
  }
  let originalBounds = null;
  if (original && o.recipe !== "editorial") {
    originalBounds = contain4(c, original, p.visual);
    addAsset("original-product", refs.productAssetId, original, originalBounds, { cropped: false, sourceCropped: false, policy: "contain complete original; no recolouring or perspective" });
  }
  const texts = [];
  function prepare(role, value, box, align = p.align, fontRole = role) {
    if (!String(value).trim()) return null;
    const s = manifest.fonts[fontRole], lines = wrap4(c, value, box[2], s), positions = lines.map((line, i) => {
      setFont3(c, s);
      const w = c.measureText(line).width;
      return [align === "center" ? box[0] + (box[2] - w) / 2 : align === "right" ? box[0] + box[2] - w : box[0], box[1] + i * s.size * s.lineHeight];
    }), lineBoxes = lines.map((line, i) => [positions[i][0], positions[i][1], c.measureText(line).width, s.size * s.lineHeight]), inkBoxes = lines.map((line, i) => {
      setFont3(c, s);
      const m = c.measureText(line);
      return [positions[i][0] - m.actualBoundingBoxLeft, positions[i][1] - m.actualBoundingBoxAscent, m.actualBoundingBoxLeft + m.actualBoundingBoxRight, m.actualBoundingBoxAscent + m.actualBoundingBoxDescent];
    });
    const overflow = lines.length * s.size * s.lineHeight > box[3] + 0.1 || lineBoxes.some((b) => b[2] > box[2] + 0.1), t = { role, text: String(value), box: [...box], ...s, lines, positions, lineBoxes, inkBoxes, overflow };
    texts.push(t);
    if (overflow) errors.push(`${role} does not fit at selected ${s.size}px size/leading/tracking. Explicit sizes are never silently shrunk; shorten copy or choose another layout.`);
    return t;
  }
  prepare("headline", manifest.copy.headline, p.title);
  prepare("body", manifest.copy.body, p.body);
  const brand = mark ? null : prepare("brand", company.name || "", p.brand, "left");
  prepare("kicker", manifest.copy.kicker, p.kicker, "right");
  if (o.details.text) prepare("annotation", o.details.text, p.annotation, "left", "kicker");
  let action = null, actionBox = null;
  if (manifest.copy.cta.trim()) {
    const s = manifest.fonts.cta, arrowW = o.cta.arrow ? 40 : 0, padX = o.cta.paddingX, padY = o.cta.paddingY;
    setFont3(c, s);
    const natural = Math.max(...manifest.copy.cta.split("\n").map((line) => c.measureText(line).width)) + 2 * padX + arrowW;
    const aw = o.cta.width === "full" ? p.cta[2] : Math.min(p.cta[2], natural), contentW = Math.max(1, aw - 2 * padX - arrowW), lines = wrap4(c, manifest.copy.cta, contentW, s), ah = lines.length * s.size * s.lineHeight + 2 * padY;
    const x = p.cta[0] + (o.cta.align === "center" ? (p.cta[2] - aw) / 2 : o.cta.align === "right" ? p.cta[2] - aw : 0), y = p.cta[1];
    actionBox = [x, y, aw, ah];
    if (ah > p.cta[3] + 0.1) errors.push("CTA full copy exceeds this layout's action zone. Shorten it, reduce explicit size/padding or choose another layout.");
    action = prepare("cta", manifest.copy.cta, [x + padX, y + padY, contentW, Math.max(0, ah - 2 * padY)], "left");
    const fill = o.cta.fill.mode === "custom" ? o.cta.fill.value : palette[o.cta.fill.value];
    manifest.cta.fill = o.cta.style === "text" ? null : fill;
    manifest.cta.shapeBounds = actionBox;
    manifest.cta.textBounds = action.box;
    manifest.cta.painted = true;
  }
  for (let i = 0; i < texts.length; i++) for (let j = i + 1; j < texts.length; j++) if (texts[i].inkBoxes.some((a) => texts[j].inkBoxes.some((b) => intersects3(a, b)))) errors.push(`${texts[i].role} overlaps ${texts[j].role}; required copy must remain separate.`);
  if (originalBounds && texts.some((t) => t.inkBoxes.some((b) => intersects3(b, originalBounds)))) errors.push("Complete original product overlaps required copy; move the image or choose another layout. No rectangular holes or cropping are used.");
  if (actionBox) {
    if (texts.filter((t) => t !== action).some((t) => t.inkBoxes.some((b) => intersects3(b, actionBox)))) errors.push("CTA shape overlaps required non-CTA copy; choose another layout or reduce explicit action padding.");
    if (originalBounds && intersects3(originalBounds, actionBox)) errors.push("CTA shape overlaps the complete original product; choose another layout.");
  }
  const logoBox = mark ? p.brand : null;
  if (mark) {
    const box = contain4(c, mark, logoBox);
    addAsset("logo", refs.logoAssetId, mark, box, { cropped: false, sourceCropped: false, policy: "authentic source pixels; no recolouring or backing" });
    if (texts.some((t) => t.inkBoxes.some((b) => intersects3(b, box)))) errors.push("Original logo overlaps required copy; choose another layout.");
  } else if (brand) warnings.push("No original logo selected. Company name is typeset text, not an authentic logo.");
  if (fg && o.recipe === "hero") {
    const t = o.layers.foreground, s = Math.min(p.visual[2] / fg.width, p.visual[3] / fg.height) * t.scale, fw = fg.width * s, fh = fg.height * s, fc = newCanvas(doc, width, height), f = fc.getContext("2d", { willReadFrequently: true });
    f.scale(unit, unit);
    f.translate(t.x * 1080, t.y * h);
    f.rotate(t.rotation * Math.PI / 180);
    f.drawImage(fg, -fw / 2, -fh / 2, fw, fh);
    const fp = f.getImageData(0, 0, width, height).data;
    const mask = newCanvas(doc, width, height), m = mask.getContext("2d", { willReadFrequently: true });
    m.scale(unit, unit);
    for (const text of texts) paintText(m, text);
    for (const box of [logoBox, actionBox, originalBounds].filter(Boolean)) m.fillRect(...box);
    const mp = m.getImageData(0, 0, width, height).data;
    let overlaps = 0, visible = 0;
    for (let i = 3; i < fp.length; i += 4) {
      if (fp[i] > 8) {
        visible++;
        if (mp[i] > 8) overlaps++;
      }
    }
    if (overlaps) errors.push(`Foreground overlaps required copy/logo/action (${overlaps} native pixels). Move it or choose another layout; no exclusion holes are painted.`);
    if (!visible) errors.push("Foreground has no visible pixels.");
    c.save();
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.drawImage(fc, 0, 0);
    c.restore();
    addAsset("foreground", refs.foregroundAssetId, fg, [t.x * 1080 - fw / 2, t.y * h - fh / 2, fw, fh], { transform: { ...t }, sourceCropped: false, protectedExclusions: [], overlapPixels: overlaps, visiblePixels: visible });
  } else if (fg && o.recipe === "showcase") warnings.push("Showcase keeps the complete original; cutout foreground is not drawn.");
  if (action && o.cta.style !== "text") {
    c.save();
    shape(c, o.cta.style, actionBox);
    if (o.cta.style === "outline") {
      c.strokeStyle = manifest.cta.fill;
      c.lineWidth = 2;
      c.stroke();
    } else {
      c.fillStyle = manifest.cta.fill;
      c.fill();
    }
    c.restore();
    layers.push({ role: "action", style: o.cta.style, box: actionBox, fill: manifest.cta.fill });
  }
  const pixels = c.getImageData(0, 0, width, height).data;
  for (const t of texts) {
    const mask = newCanvas(doc, width, height), m = mask.getContext("2d", { willReadFrequently: true });
    m.scale(unit, unit);
    paintText(m, t);
    const coverage = m.getImageData(0, 0, width, height).data;
    let requested = t.role === "cta" ? o.cta.text : o.textColors[t.role === "annotation" ? "kicker" : t.role], candidates;
    if (t.role === "cta") candidates = requested.mode === "auto" ? [palette.ink, palette.paper] : [requested.mode === "custom" ? requested.value : palette[requested.value]];
    else candidates = requested === "auto" ? [palette.ink, palette.paper] : [palette[requested]];
    const measures = candidates.map((color) => {
      let minimum = Infinity, samples = 0;
      const fgLum = colourLum(color);
      for (let i = 3; i < coverage.length; i += 4) if (coverage[i] >= 250) {
        minimum = Math.min(minimum, ratio(fgLum, lum(pixels[i - 3], pixels[i - 2], pixels[i - 1])));
        samples++;
      }
      return { color, minimum: samples ? minimum : 0, samples };
    }).sort((a, b) => b.minimum - a.minimum), best = measures[0];
    t.color = best.color;
    manifest.protection.contrast.roles.push({ role: t.role, color: t.color, minimum: best.minimum, samples: best.samples, passed: best.minimum >= 4.5 });
    if (best.minimum < 4.5) errors.push(`${t.role}: actual opaque-glyph-interior contrast ${best.minimum.toFixed(2)}:1 is below 4.5:1. Choose another palette role, move imagery/motif, change treatment or use a quieter background; no automatic plates are added.`);
    if (t.role === "cta") manifest.cta.text = t.color;
    if (!t.overflow) {
      paintText(c, t);
      layers.push({ ...t });
      for (const b of t.lineBoxes) hitRegions.push({ role: t.role, x: b[0] * unit, y: b[1] * unit, width: b[2] * unit, height: b[3] * unit });
    }
  }
  if (action && o.cta.arrow && !action.overflow) {
    const x = actionBox[0] + actionBox[2] - o.cta.paddingX - 12, y = actionBox[1] + actionBox[3] / 2;
    c.save();
    c.strokeStyle = action.color;
    c.lineWidth = 2.5;
    c.beginPath();
    c.moveTo(x - 18, y);
    c.lineTo(x + 6, y);
    c.moveTo(x - 3, y - 9);
    c.lineTo(x + 6, y);
    c.lineTo(x - 3, y + 9);
    c.stroke();
    c.restore();
  }
  for (const t of texts) for (const b of t.inkBoxes) {
    const inset = manifest.safeRegion.inset;
    if (b[0] * unit < inset.left - 0.1 || b[1] * unit < inset.top - 0.1 || (b[0] + b[2]) * unit > width - inset.right + 0.1 || (b[1] + b[3]) * unit > height - inset.bottom + 0.1) errors.push(`${t.role} exceeds the format's safe native glyph bounds. Move copy or choose another layout.`);
  }
  manifest.layerOrder = layers.map((l) => l.role);
  c.setTransform(1, 0, 0, 1, 0, 0);
  return result();
}

// assets/fonts/lora-latin-wght-normal.woff2
var lora_latin_wght_normal_default = "data:font/woff2;base64,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";

// assets/fonts/space-grotesk-latin-wght-normal.woff2
var space_grotesk_latin_wght_normal_default = "data:font/woff2;base64,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";

// assets/fonts/dm-sans-latin-wght-normal.woff2
var dm_sans_latin_wght_normal_default = "data:font/woff2;base64,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";

// assets/fonts/oswald-latin-wght-normal.woff2
var oswald_latin_wght_normal_default = "data:font/woff2;base64,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";

// src/fonts-template.js
var urls = { "league-spartan-latin-wght-normal.woff2": league_spartan_latin_wght_normal_default, "source-sans-3-latin-wght-normal.woff2": source_sans_3_latin_wght_normal_default, "barlow-condensed-latin-800-normal.woff2": barlow_condensed_latin_800_normal_default, "archivo-latin-wght-normal.woff2": archivo_latin_wght_normal_default, "manrope-latin-wght-normal.woff2": manrope_latin_wght_normal_default, "lora-latin-wght-normal.woff2": lora_latin_wght_normal_default, "space-grotesk-latin-wght-normal.woff2": space_grotesk_latin_wght_normal_default, "dm-sans-latin-wght-normal.woff2": dm_sans_latin_wght_normal_default, "oswald-latin-wght-normal.woff2": oswald_latin_wght_normal_default };
var documents3 = /* @__PURE__ */ new WeakMap();
function coverageValid2(v) {
  return Array.isArray(v) && v.length > 0 && v.length <= 2e4 && v.every((r) => Array.isArray(r) && r.length === 2 && Number.isInteger(r[0]) && Number.isInteger(r[1]) && r[0] >= 0 && r[1] >= r[0] && r[1] <= 1114111);
}
async function localBytes(url) {
  if (typeof url !== "string" || !/^data:(?:font\/(?:woff2|ttf)|application\/(?:octet-stream|font-woff));base64,[A-Za-z0-9+/=]+$/.test(url)) throw Error("The cached face is not a supported local font file.");
  const raw = atob(url.slice(url.indexOf(",") + 1));
  if (raw.length > 2 * 1024 * 1024) throw Error("The font file exceeds2MB.");
  return Uint8Array.from(raw, (c) => c.charCodeAt(0));
}
async function digest2(bytes) {
  if (!globalThis.crypto?.subtle) throw Error("Font digest verification is unavailable.");
  return [...new Uint8Array(await crypto.subtle.digest("SHA-256", bytes))].map((b) => b.toString(16).padStart(2, "0")).join("");
}
async function loadTemplateRoleFonts({ fontPairing, voice = "studio", typography = {}, fonts = [], getFont, companyId, doc = globalThis.document }) {
  if (!doc?.fonts || typeof FontFace === "undefined") throw Error("Required poster font loading is unavailable.");
  const options = { voice, ...fontPairing === void 0 ? {} : { fontPairing } }, resolved = {};
  let pending = documents3.get(doc);
  if (!pending) {
    pending = /* @__PURE__ */ new Map();
    documents3.set(doc, pending);
  }
  for (const role of ["headline", "body", "cta", "kicker", "brand"]) {
    const selected = getRoleBundledFont(options, role), style = typography[role] || {}, weight = style.weight ?? selected.defaultWeight;
    let bytes, reference;
    if (!Number.isInteger(weight) || weight < 100 || weight > 900) throw Error(`${role}: invalid selected font weight.`);
    if (style.fontId) {
      const record = fonts.find((f) => f.id === style.fontId);
      if (!record || record.companyId !== companyId) throw Error(`${role}: selected font is missing from this company's frozen font metadata.`);
      const face2 = record.faces?.find((f) => f.weight === weight && f.style === "normal");
      if (!face2 || !coverageValid2(face2.coverage) || !/^[a-f0-9]{64}$/.test(face2.sha256)) throw Error(`${role}: the selected normal weight ${weight} or verified cmap metadata is unavailable.`);
      if (typeof getFont !== "function") throw Error(`${role}: the local font loader is unavailable.`);
      const cached = await getFont(record.id, weight);
      for (const key of ["weight", "style", "sha256", "assetId"]) if (cached?.[key] !== face2[key]) throw Error(`${role}: cached font ${key} differs from the saved face.`);
      if (JSON.stringify(cached.coverage) !== JSON.stringify(face2.coverage)) throw Error(`${role}: cached cmap coverage differs from the saved face.`);
      bytes = await localBytes(cached.dataUrl);
      if (bytes.length !== face2.bytes || await digest2(bytes) !== face2.sha256) throw Error(`${role}: cached font digest or byte length does not match the saved face.`);
      reference = { fontId: record.id, assetId: face2.assetId, family: record.family, file: face2.assetId, sha256: face2.sha256, coverage: face2.coverage, source: record.source, license: record.license, weight, style: "normal" };
    } else {
      if (weight < selected.range[0] || weight > selected.range[1]) throw Error(`${role}: bundled face does not support normal weight ${weight}.`);
      if (!coverageValid2(selected.coverage)) throw Error(`${role}: verified bundled cmap metadata is unavailable.`);
      bytes = await localBytes(urls[selected.file]);
      if (await digest2(bytes) !== selected.sha256 || selected.bytes !== void 0 && bytes.length !== selected.bytes) throw Error(`${role}: bundled font digest or byte length does not match its passport.`);
      reference = { fontId: null, assetId: null, family: selected.legacyId ? `BS3 ${selected.legacyId}` : selected.family, file: selected.file, sha256: selected.sha256, coverage: selected.coverage, source: "bundled", license: "SIL OFL1.1", weight, style: "normal" };
      reference.license = "SIL OFL 1.1";
    }
    const family = `BS3_${reference.sha256}_${weight}`;
    let promise = pending.get(family);
    if (!promise) {
      promise = (async () => {
        const face2 = new FontFace(family, bytes.buffer, { weight: String(weight), style: "normal" });
        let timer;
        try {
          await Promise.race([face2.load(), new Promise((_, reject) => {
            timer = setTimeout(() => reject(Error("Local font loading timed out.")), 8e3);
          })]);
        } finally {
          clearTimeout(timer);
        }
        doc.fonts.add(face2);
        return face2;
      })().catch((error) => {
        pending.delete(family);
        throw error;
      });
      pending.set(family, promise);
    }
    const loaded = await promise;
    if (loaded.status !== "loaded" || !doc.fonts.has(loaded)) throw Error(`${role}: the exact selected font failed to load.`);
    resolved[role] = { ...reference, canvasFamily: family };
  }
  return resolved;
}

// src/poster-renderer-template.js
var dimensions5 = { square: [1080, 1080], portrait: [1080, 1350], story: [1080, 1920], landscape: [1200, 628] };
var tokens2 = /* @__PURE__ */ new WeakMap();
var intersects4 = (a, b) => a[0] < b[0] + b[2] && a[0] + a[2] > b[0] && a[1] < b[1] + b[3] && a[1] + a[3] > b[1];
var newCanvas2 = (doc, w, h) => {
  const c = doc.createElement("canvas");
  c.width = w;
  c.height = h;
  return c;
};
function setFont4(c, s) {
  c.font = `${s.weight} ${s.size}px "${s.canvasFamily}"`;
  c.fontKerning = "normal";
  c.textBaseline = "top";
  c.textAlign = "left";
  c.letterSpacing = `${s.tracking * s.size}px`;
}
function wrap5(c, value, width, s, keepPhone = false) {
  setFont4(c, s);
  const lines = [];
  for (const paragraph of String(value).split("\n")) {
    let text = paragraph.trim();
    if (keepPhone) text = text.replace(/\+?\d(?:[\d \u00a0-]{4,}\d)/g, (run) => run.replace(/ /g, "\xA0"));
    let line = "";
    for (const word of text.split(/ +/)) {
      const next = line ? line + " " + word : word;
      if (line && c.measureText(next).width > width) {
        lines.push(line);
        line = word;
      } else line = next;
    }
    lines.push(line);
  }
  return lines;
}
async function image5(src, role, errors) {
  if (!src) return null;
  try {
    if (typeof src !== "string" || !/^data:image\/(png|jpeg|webp|svg\+xml)[;,]/.test(src)) throw Error("Only local image data is allowed.");
    return await new Promise((resolve, reject) => {
      const img = new Image(), timer = setTimeout(() => reject(Error("Image timeout.")), 12e3);
      img.onload = () => {
        clearTimeout(timer);
        img.naturalWidth ? resolve(img) : reject(Error("Empty image."));
      };
      img.onerror = () => {
        clearTimeout(timer);
        reject(Error("Invalid image."));
      };
      img.src = src;
    });
  } catch (e) {
    errors.push(`${role}: selected local image could not be opened. ${e.message}`);
    return null;
  }
}
function contain5(c, img, box) {
  const [x, y, w, h] = box, s = Math.min(w / img.width, h / img.height), placed = [x + (w - img.width * s) / 2, y + (h - img.height * s) / 2, img.width * s, img.height * s];
  c.drawImage(img, ...placed);
  return placed;
}
function paintText2(c, t) {
  setFont4(c, t);
  c.fillStyle = t.color || "#ffffff";
  for (let i = 0; i < t.lines.length; i++) c.fillText(t.lines[i], t.positions[i][0], t.positions[i][1]);
}
function lum2(r, g, b) {
  const f = (x) => {
    x /= 255;
    return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
function colourLum2(hex2) {
  return lum2(...hex2.slice(1).match(/../g).map((s) => parseInt(s, 16)));
}
var ratio2 = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
function shape2(c, style, box) {
  const [x, y, w, h] = box;
  c.beginPath();
  if (style === "rounded" || style === "pill") c.roundRect(x, y, w, h, style === "pill" ? h / 2 : Math.min(18, h / 4));
  else if (style === "outline") c.rect(x + 1, y + 1, Math.max(0, w - 2), Math.max(0, h - 2));
  else c.rect(x, y, w, h);
}
async function renderPosterTemplate(target, resources2) {
  const token = Symbol("poster-compiler-4");
  tokens2.set(target, token);
  const staging = target.ownerDocument.createElement("canvas"), result = await paint4(staging, resources2);
  if (tokens2.get(target) !== token) return { ...result, stale: true, errors: [...result.errors, "A newer render replaced this drawing. Wait for the current preview."] };
  target.width = staging.width;
  target.height = staging.height;
  target.getContext("2d").drawImage(staging, 0, 0);
  return result;
}
async function paint4(canvas, { company = {}, post = {}, design, background, logo, product, foreground, fonts = [], getFont } = {}) {
  const format = dimensions5[post.format] ? post.format : "square", [width, height] = dimensions5[format], unit = width / 1080, h = height / unit, doc = canvas.ownerDocument;
  canvas.width = width;
  canvas.height = height;
  const c = canvas.getContext("2d", { willReadFrequently: true }), errors = [], warnings = [], assets = [], layers = [], hitRegions = [];
  const refs = { backgroundAssetId: post.backgroundAssetId || "", foregroundAssetId: post.foregroundAssetId || "", logoAssetId: post.logoAssetId ?? company.logoAssetId ?? "", productAssetId: post.productAssetId ?? "" };
  const manifest = { rendererVersion: 3, compilerVersion: 4, recipeVersion: 1, format, width, height, coordinateSpace: { width: 1080, height: h, pixelScale: unit, description: "Boxes/styles/transforms use 1080-wide layout units; hitRegions use output pixels." }, assetReferences: refs, copy: { headline: String(post.headline || post.title || ""), body: String(post.body || ""), cta: String(post.cta || ""), kicker: "" }, fonts: {}, assets, layers, protection: { textRendering: "fill-only", textBlocks: [], foregroundExclusions: [], nonCtaBackground: "none", contrast: { method: "opaque-glyph-interior", minimum: 4.5, roles: [] } } };
  const result = () => ({ errors, warnings, width, height, generated: !!design, manifest, hitRegions });
  let o, p, palette;
  try {
    o = resolvePoster(post.poster || {}, format);
    if (o.version !== 3 || o.compilerVersion !== 4) throw Error("Expected poster version 3 / compilerVersion 4.");
    p = templatePlan(o.composition.layout, format, o.composition.density);
    const oldPalette = resolveCrispPalette(company, o);
    palette = { ...oldPalette, primary: oldPalette.primary ?? oldPalette.accent, accent: company.brandKit?.accent ?? oldPalette.ink };
    palette.action = palette.accent;
    palette.actionText = contrast(palette.action, palette.ink) >= contrast(palette.action, palette.paper) ? palette.ink : palette.paper;
  } catch (e) {
    errors.push(`Invalid template poster: ${e.message}`);
    return result();
  }
  manifest.options = o;
  manifest.recipe = o.recipe;
  manifest.palette = palette;
  manifest.copy.kicker = o.kicker;
  manifest.layout = { ...TEMPLATE_RESOURCES[o.composition.layout] };
  const motif = { id: "none", version: 1, sha256: null, viewBox: null };
  if (o.motif.id !== "none") {
    errors.push("Template4 does not render motifs.");
    return result();
  }
  manifest.motif = { id: motif.id, version: motif.version, sha256: motif.sha256, viewBox: motif.viewBox, opacity: o.motif.opacity, transform: { x: o.motif.x, y: o.motif.y, scale: o.motif.scale, rotation: o.motif.rotation }, painted: false };
  manifest.cta = { style: o.cta.style, width: o.cta.width, align: o.cta.align, fill: null, text: null, shapeBounds: null, textBounds: null, arrow: o.cta.arrow, painted: false };
  manifest.safeRegion = { preset: "Brand Studio authored template composition (not platform certification)", inset: { left: (format === "story" ? 80 : format === "landscape" ? 42 : 54) * unit, right: (format === "story" ? 80 : format === "landscape" ? 42 : 54) * unit, top: (format === "story" ? 145 : 40) * unit, bottom: (format === "story" ? 130 : 40) * unit } };
  c.scale(unit, unit);
  c.fillStyle = palette.field;
  c.fillRect(0, 0, 1080, h);
  let roleFonts;
  try {
    roleFonts = await (o.fontPairing === void 0 ? loadRoleFonts : loadTemplateRoleFonts)({ voice: o.voice, ...o.fontPairing === void 0 ? {} : { fontPairing: o.fontPairing }, typography: o.typography, fonts, getFont, companyId: company.id, doc });
  } catch (e) {
    errors.push(`Required template fonts failed to load. ${e.message}`);
    return result();
  }
  const sizes = { headline: p.headlineSize * o.scale, body: p.bodySize, cta: p.ctaSize, kicker: format === "landscape" ? 18 : 22, brand: format === "landscape" ? 22 : 28 };
  for (const role of Object.keys(roleFonts)) {
    const s = o.typography[role];
    manifest.fonts[role] = { ...roleFonts[role], size: s.size ?? sizes[role], lineHeight: s.lineHeight ?? (role === "headline" ? p.leading : role === "body" ? 1.3 : 1.15), tracking: s.tracking };
  }
  const headline = manifest.fonts.headline, body = manifest.fonts.body, measurements = { headlineHeight: wrap5(c, manifest.copy.headline, p.title[2], headline).length * headline.size * headline.lineHeight, bodyHeight: manifest.copy.body.trim() ? wrap5(c, manifest.copy.body, p.body[2], body).length * body.size * body.lineHeight : 0, hasBody: !!manifest.copy.body.trim(), ctaWidth: o.cta.width };
  const flow = templateFlowPlan(p, measurements);
  p.body[1] = flow.bodyY;
  if (p.copyFlow) {
    const bottom = p.copyFlow.box[1] + p.copyFlow.box[3];
    p.body[3] = Math.min(p.body[3], Math.max(0, bottom - flow.bodyY));
  }
  for (const [role, value] of Object.entries({ ...manifest.copy, brand: company.name || "", annotation: o.details.text })) {
    const font2 = manifest.fonts[role === "annotation" ? "kicker" : role], missing = unsupportedGlyphs(value, font2.coverage);
    if (missing.length) errors.push(`${role}: selected font cmap does not support ${missing.join(" ")}. Export is blocked; no fallback is used.`);
  }
  if (!manifest.copy.headline.trim()) errors.push("Add a headline before exporting.");
  const [bg, mark, original, fg] = await Promise.all([o.layers.background.mode === "image" ? image5(background, "Backdrop", errors) : null, image5(logo, "Logo", errors), image5(product, "Original product", errors), image5(foreground, "Foreground", errors)]);
  for (const [key, img] of [["backgroundAssetId", bg], ["foregroundAssetId", fg], ["logoAssetId", mark], ["productAssetId", original]]) {
    if (key === "backgroundAssetId" && o.layers.background.mode !== "image") continue;
    if (refs[key] && !img) errors.push("Selected " + key + " is missing. Restore the exact resource before exporting.");
    if (img && !refs[key]) errors.push(key + ": resource has no explicit selected ID. Bind the exact resource before review.");
  }
  if (o.layers.background.mode === "image" && (!refs.backgroundAssetId || !bg)) errors.push("Image background mode requires the exact selected background resource; choose Solid or restore the image.");
  const addAsset = (role, id, img, box, extra = {}) => {
    assets.push({ role, assetId: id || null, x: box[0], y: box[1], width: box[2], height: box[3], sourceWidth: img.width, sourceHeight: img.height, ...extra });
    if (img.width < box[2] * unit || img.height < box[3] * unit) warnings.push(role + ": below placed resolution; inspect the native PNG.");
    layers.push({ role, assetId: id || null, box });
  };
  if (bg && p.backgroundFit === "contain") {
    c.save();
    c.beginPath();
    c.rect(...p.backgroundBox);
    c.clip();
    c.globalAlpha = o.layers.background.opacity;
    c.filter = "blur(" + o.layers.background.blur + "px)";
    const box = contain5(c, bg, p.backgroundBox);
    c.restore();
    addAsset("backdrop", refs.backgroundAssetId, bg, box, { mode: "image", opacity: o.layers.background.opacity, blur: o.layers.background.blur, clipBox: [...p.backgroundBox], sourceCropped: false, policy: "contain" });
  } else if (bg) {
    const [x, y, w, bh] = p.backgroundBox;
    c.save();
    c.beginPath();
    c.rect(x, y, w, bh);
    c.clip();
    c.globalAlpha = o.layers.background.opacity;
    c.filter = "blur(" + o.layers.background.blur + "px)";
    const scale = Math.max(w / bg.width, bh / bg.height) * o.heroScale, bw = bg.width * scale, hh = bg.height * scale, bx = x + (w - bw) * o.cropX, by = y + (bh - hh) * o.cropY;
    c.drawImage(bg, bx, by, bw, hh);
    c.restore();
    addAsset("backdrop", refs.backgroundAssetId, bg, [bx, by, bw, hh], { mode: "image", opacity: o.layers.background.opacity, blur: o.layers.background.blur, clipBox: [...p.backgroundBox], sourceCropped: true, policy: "cover" });
  }
  let originalBounds = null;
  if (original) {
    c.save();
    c.globalAlpha = o.layers.product.opacity;
    const box = contain5(c, original, p.visual);
    c.restore();
    if (o.layers.product.opacity > 0) originalBounds = box;
    addAsset("original-product", refs.productAssetId, original, box, { opacity: o.layers.product.opacity, cropped: false, sourceCropped: false, policy: "contain" });
  }
  const texts = [];
  function prepare(role, value, box, align = p.align, fontRole = role, keepPhone = false) {
    if (!String(value).trim()) return null;
    const s = manifest.fonts[fontRole], lines = wrap5(c, value, box[2], s, keepPhone), positions = lines.map((line, i) => {
      setFont4(c, s);
      const w = c.measureText(line).width;
      return [align === "center" ? box[0] + (box[2] - w) / 2 : align === "right" ? box[0] + box[2] - w : box[0], box[1] + i * s.size * s.lineHeight];
    }), lineBoxes = lines.map((line, i) => [positions[i][0], positions[i][1], c.measureText(line).width, s.size * s.lineHeight]), inkBoxes = lines.map((line, i) => {
      setFont4(c, s);
      const m = c.measureText(line);
      return [positions[i][0] - m.actualBoundingBoxLeft, positions[i][1] - m.actualBoundingBoxAscent, m.actualBoundingBoxLeft + m.actualBoundingBoxRight, m.actualBoundingBoxAscent + m.actualBoundingBoxDescent];
    });
    const overflow = lines.length * s.size * s.lineHeight > box[3] + 0.1 || lineBoxes.some((b) => b[2] > box[2] + 0.1), t = { role, text: String(value), box: [...box], ...s, lines, positions, lineBoxes, inkBoxes, overflow };
    texts.push(t);
    if (overflow) errors.push(`${role} does not fit at selected ${s.size}px size/leading/tracking. Explicit sizes are never silently shrunk; shorten copy or choose another layout.`);
    return t;
  }
  prepare("headline", manifest.copy.headline, p.title);
  prepare("body", manifest.copy.body, p.body);
  const brand = mark ? null : prepare("brand", company.name || "", p.brand, p.align === "center" ? "center" : "left");
  prepare("kicker", manifest.copy.kicker, p.kicker, p.align === "center" ? "center" : "right");
  if (o.details.text) prepare("annotation", o.details.text, p.annotation, "left", "kicker");
  let action = null, actionBox = null;
  if (manifest.copy.cta.trim()) {
    const s = manifest.fonts.cta, arrowW = o.cta.arrow ? 40 : 0, padX = o.cta.paddingX, padY = o.cta.paddingY;
    setFont4(c, s);
    const keepPhoneCta = ["subject-left", "image-footer", "framed-focus", "type-led", "offset-grid"].includes(o.composition.layout);
    const natural = Math.max(...manifest.copy.cta.split("\n").map((line) => c.measureText(line).width)) + 2 * padX + arrowW;
    const zone = o.cta.width === "poster" ? p.posterCta : p.cta, aw = o.cta.width === "fit" ? Math.min(zone[2], natural) : zone[2], contentW = Math.max(1, aw - 2 * padX - arrowW), lines = wrap5(c, manifest.copy.cta, contentW, s, keepPhoneCta), ah = lines.length * s.size * s.lineHeight + 2 * padY;
    const x = zone[0] + (o.cta.align === "center" ? (zone[2] - aw) / 2 : o.cta.align === "right" ? zone[2] - aw : 0), y = templateFlowPlan(p, { ...measurements, ctaHeight: ah }).ctaY;
    actionBox = [x, y, aw, ah];
    if (ah > zone[3] + 0.1 || y < zone[1] - 0.1 || y + ah > zone[1] + zone[3] + 0.1) errors.push("CTA full copy exceeds this layout's action zone. Shorten it, reduce explicit size/padding or choose another layout.");
    action = prepare("cta", manifest.copy.cta, [x + padX, y + padY, contentW, Math.max(0, ah - 2 * padY)], "left", "cta", keepPhoneCta);
    const fill = o.cta.fill.mode === "custom" ? o.cta.fill.value : palette[o.cta.fill.value];
    manifest.cta.fill = o.cta.style === "text" ? null : fill;
    manifest.cta.shapeBounds = actionBox;
    manifest.cta.textBounds = action.box;
    manifest.cta.painted = true;
  }
  for (let i = 0; i < texts.length; i++) for (let j = i + 1; j < texts.length; j++) if (texts[i].inkBoxes.some((a) => texts[j].inkBoxes.some((b) => intersects4(a, b)))) errors.push(`${texts[i].role} overlaps ${texts[j].role}; required copy must remain separate.`);
  if (originalBounds && texts.some((t) => t.inkBoxes.some((b) => intersects4(b, originalBounds)))) errors.push("Complete original product overlaps required copy; move the image or choose another layout. No rectangular holes or cropping are used.");
  if (actionBox) {
    if (texts.filter((t) => t !== action).some((t) => t.inkBoxes.some((b) => intersects4(b, actionBox)))) errors.push("CTA shape overlaps required non-CTA copy; choose another layout or reduce explicit action padding.");
    if (originalBounds && intersects4(originalBounds, actionBox)) errors.push("CTA shape overlaps the complete original product; choose another layout.");
  }
  const logoBox = mark ? p.brand : null;
  if (mark) {
    const box = contain5(c, mark, logoBox);
    addAsset("logo", refs.logoAssetId, mark, box, { cropped: false, sourceCropped: false, policy: "authentic source pixels; no recolouring or backing" });
    if (texts.some((t) => t.inkBoxes.some((b) => intersects4(b, box)))) errors.push("Original logo overlaps required copy; choose another layout.");
  } else if (brand) warnings.push("No original logo selected. Company name is typeset text, not an authentic logo.");
  if (fg) {
    const t = o.layers.foreground, s = Math.min(p.visual[2] / fg.width, p.visual[3] / fg.height) * t.scale, fw = fg.width * s, fh = fg.height * s, fc = newCanvas2(doc, width, height), f = fc.getContext("2d", { willReadFrequently: true });
    f.scale(unit, unit);
    f.translate(t.x * 1080, t.y * h);
    f.rotate(t.rotation * Math.PI / 180);
    f.globalAlpha = t.opacity;
    f.drawImage(fg, -fw / 2, -fh / 2, fw, fh);
    const theta = t.rotation * Math.PI / 180, corners = [[-fw / 2, -fh / 2], [fw / 2, -fh / 2], [fw / 2, fh / 2], [-fw / 2, fh / 2]].map(([x, y]) => [t.x * 1080 + x * Math.cos(theta) - y * Math.sin(theta), t.y * h + x * Math.sin(theta) + y * Math.cos(theta)]);
    if (t.opacity > 0 && corners.some(([x, y]) => x < -0.1 || x > 1080.1 || y < -0.1 || y > h + 0.1)) errors.push("Foreground source frame exceeds the poster. Move it inward or reduce its explicit scale; no clipping is approved.");
    const fp = f.getImageData(0, 0, width, height).data;
    const mask = newCanvas2(doc, width, height), m = mask.getContext("2d", { willReadFrequently: true });
    m.scale(unit, unit);
    for (const text of texts) paintText2(m, text);
    for (const box of [logoBox, actionBox, originalBounds].filter(Boolean)) m.fillRect(...box);
    const mp = m.getImageData(0, 0, width, height).data;
    let overlaps = 0, visible = 0;
    for (let i = 3; i < fp.length; i += 4) {
      if (fp[i] > 8) {
        visible++;
        if (mp[i] > 8) overlaps++;
      }
    }
    if (overlaps) errors.push(`Foreground overlaps required copy/logo/action (${overlaps} native pixels). Move it or choose another layout; no exclusion holes are painted.`);
    if (!visible && t.opacity > 0) errors.push("Foreground has no visible pixels.");
    c.save();
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.drawImage(fc, 0, 0);
    c.restore();
    addAsset("foreground", refs.foregroundAssetId, fg, [t.x * 1080 - fw / 2, t.y * h - fh / 2, fw, fh], { opacity: t.opacity, transform: { ...t }, sourceCropped: false, protectedExclusions: [], overlapPixels: overlaps, visiblePixels: visible });
  }
  if (action && o.cta.style !== "text") {
    c.save();
    shape2(c, o.cta.style, actionBox);
    if (o.cta.style === "outline") {
      c.strokeStyle = manifest.cta.fill;
      c.lineWidth = 2;
      c.stroke();
    } else {
      c.fillStyle = manifest.cta.fill;
      c.fill();
    }
    c.restore();
    layers.push({ role: "action", style: o.cta.style, box: actionBox, fill: manifest.cta.fill });
  }
  const pixels = c.getImageData(0, 0, width, height).data;
  for (const t of texts) {
    const mask = newCanvas2(doc, width, height), m = mask.getContext("2d", { willReadFrequently: true });
    m.scale(unit, unit);
    paintText2(m, t);
    const coverage = m.getImageData(0, 0, width, height).data;
    let requested = t.role === "cta" ? o.cta.text : o.textColors[t.role === "annotation" ? "kicker" : t.role], candidates;
    if (t.role === "cta") candidates = requested.mode === "auto" ? [palette.ink, palette.paper] : [requested.mode === "custom" ? requested.value : palette[requested.value]];
    else candidates = requested === "auto" ? [palette.ink, palette.paper] : [palette[requested]];
    const measures = candidates.map((color) => {
      let minimum = Infinity, samples = 0;
      const fgLum = colourLum2(color);
      for (let i = 3; i < coverage.length; i += 4) if (coverage[i] >= 250) {
        minimum = Math.min(minimum, ratio2(fgLum, lum2(pixels[i - 3], pixels[i - 2], pixels[i - 1])));
        samples++;
      }
      return { color, minimum: samples ? minimum : 0, samples };
    }).sort((a, b) => b.minimum - a.minimum), best = measures[0];
    t.color = best.color;
    manifest.protection.contrast.roles.push({ role: t.role, color: t.color, minimum: best.minimum, samples: best.samples, passed: best.minimum >= 4.5 });
    if (best.minimum < 4.5) errors.push(`${t.role}: actual opaque-glyph-interior contrast ${best.minimum.toFixed(2)}:1 is below 4.5:1. Choose another palette role, move imagery/motif, change treatment or use a quieter background; no automatic plates are added.`);
    if (t.role === "cta") manifest.cta.text = t.color;
    if (!t.overflow) {
      paintText2(c, t);
      layers.push({ ...t });
      for (const b of t.lineBoxes) hitRegions.push({ role: t.role, x: b[0] * unit, y: b[1] * unit, width: b[2] * unit, height: b[3] * unit });
    }
  }
  if (action && o.cta.arrow && !action.overflow) {
    const x = actionBox[0] + actionBox[2] - o.cta.paddingX - 12, y = actionBox[1] + actionBox[3] / 2;
    c.save();
    c.strokeStyle = action.color;
    c.lineWidth = 2.5;
    c.beginPath();
    c.moveTo(x - 18, y);
    c.lineTo(x + 6, y);
    c.moveTo(x - 3, y - 9);
    c.lineTo(x + 6, y);
    c.lineTo(x - 3, y + 9);
    c.stroke();
    c.restore();
  }
  for (const t of texts) for (const b of t.inkBoxes) {
    const inset = manifest.safeRegion.inset;
    if (b[0] * unit < inset.left - 0.1 || b[1] * unit < inset.top - 0.1 || (b[0] + b[2]) * unit > width - inset.right + 0.1 || (b[1] + b[3]) * unit > height - inset.bottom + 0.1) errors.push(`${t.role} exceeds the format's safe native glyph bounds. Move copy or choose another layout.`);
  }
  manifest.layerOrder = layers.map((l) => l.role);
  c.setTransform(1, 0, 0, 1, 0, 0);
  return result();
}

// src/compositor.js
var FORMATS = { square: { label: "Square feed", w: 1080, h: 1080, ratio: "1:1" }, portrait: { label: "Portrait feed", w: 1080, h: 1350, ratio: "4:5" }, story: { label: "Story / reel cover", w: 1080, h: 1920, ratio: "9:16" }, landscape: { label: "Landscape", w: 1200, h: 628, ratio: "1.91:1" } };
var image6 = (src) => new Promise((resolve, reject) => {
  const i = new Image();
  i.onload = () => resolve(i);
  i.onerror = () => reject(new Error("This image could not be opened. Try another PNG or JPEG."));
  i.src = src;
});
function cover2(ctx, img, x, y, w, h, crop = 0.5) {
  const scale = Math.max(w / img.width, h / img.height), sw = w / scale, sh = h / scale;
  ctx.drawImage(img, Math.max(0, (img.width - sw) * crop), Math.max(0, (img.height - sh) * 0.5), sw, sh, x, y, w, h);
}
function contain6(ctx, img, x, y, w, h) {
  const s = Math.min(w / img.width, h / img.height);
  ctx.drawImage(img, x + (w - img.width * s) / 2, y + (h - img.height * s) / 2, img.width * s, img.height * s);
}
var composeTokens = /* @__PURE__ */ new WeakMap();
async function compose(canvas, resources2) {
  const token = Symbol("composition");
  composeTokens.set(canvas, token);
  const staging = canvas.ownerDocument.createElement("canvas"), result = await composeInternal(staging, resources2);
  if (composeTokens.get(canvas) !== token) return { ...result, stale: true, errors: [...result.errors || [], "A newer composition replaced this drawing. Wait for the current preview."] };
  canvas.width = staging.width;
  canvas.height = staging.height;
  canvas.getContext("2d").drawImage(staging, 0, 0);
  return result;
}
async function composeInternal(canvas, { company, post, design, background, logo, product, foreground, fonts, getFont }) {
  if (post.poster?.version === 3 && post.poster.compilerVersion === 4) return renderPosterTemplate(canvas, { company, post, design, background, logo, product, foreground, fonts, getFont });
  if (post.poster?.version === 3 && post.poster.compilerVersion === 3) return renderPosterFlexible(canvas, { company, post, design, background, logo, product, foreground, fonts, getFont });
  if (post.poster?.version === 3 && post.poster.compilerVersion === 2) return renderPosterCrisp(canvas, { company, post, design, background, logo, product, foreground, fonts, getFont });
  if (post.poster?.version === 3) return renderPosterV3(canvas, { company, post, design, background, logo, product, foreground, fonts, getFont });
  if (post.poster?.version === 2) return renderPoster(canvas, { company, post, design, background, logo, product });
  const f = FORMATS[post.format] || FORMATS.square;
  canvas.width = f.w;
  canvas.height = f.h;
  const c = canvas.getContext("2d"), w = f.w, h = f.h, p = w * 0.065;
  const color = /^#[0-9a-f]{6}$/i.test(company.color) ? company.color : "#17694e";
  c.fillStyle = "#eef1ee";
  c.fillRect(0, 0, w, h);
  const errors = [];
  let bg = null;
  if (background) bg = await image6(background);
  const direction = post.direction || "spotlight";
  let imageBox;
  if (direction === "lifestyle") {
    imageBox = [0, 0, w, h * 0.65];
    c.fillStyle = "#ffffff";
    c.fillRect(0, h * 0.65, w, h * 0.35);
  } else if (direction === "offer") {
    imageBox = [w * 0.52, 0, w * 0.48, h];
    c.fillStyle = "#ffffff";
    c.fillRect(0, 0, w * 0.52, h);
  } else {
    imageBox = [0, h * 0.39, w, h * 0.61];
    c.fillStyle = "#ffffff";
    c.fillRect(0, 0, w, h * 0.39);
  }
  if (bg) cover2(c, bg, ...imageBox, Number(post.cropX ?? 0.5));
  else {
    c.fillStyle = "#e4eae6";
    c.fillRect(...imageBox);
    c.strokeStyle = "#c1cec6";
    c.lineWidth = 2;
    c.strokeRect(imageBox[0] + p, imageBox[1] + p, imageBox[2] - 2 * p, imageBox[3] - 2 * p);
    c.fillStyle = "#586b60";
    c.font = `${w * 0.023}px -apple-system, BlinkMacSystemFont, sans-serif`;
    c.textAlign = "center";
    c.fillText("Your image will appear here", imageBox[0] + imageBox[2] / 2, imageBox[1] + imageBox[3] / 2);
    c.textAlign = "left";
  }
  if (product) {
    const prod = await image6(product);
    contain6(c, prod, imageBox[0] + p, imageBox[1] + p, imageBox[2] - 2 * p, imageBox[3] - 2 * p);
  }
  let tx = p, ty = direction === "lifestyle" ? h * 0.7 : p, tw = direction === "offer" ? w * 0.4 : w - 2 * p;
  const areaBottom = direction === "lifestyle" ? h - p : direction === "offer" ? h - p : h * 0.39 - p * 0.5;
  let y = ty;
  c.textBaseline = "top";
  function text(value, size, weight, fill, maxLines, label) {
    if (!value) return;
    c.font = `${weight} ${size}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
    c.fillStyle = fill;
    const lines = [];
    for (const para of String(value).split("\n")) {
      let line = "";
      for (const word of para.split(/\s+/)) {
        const test = line ? line + " " + word : word;
        if (c.measureText(test).width > tw && line) {
          lines.push(line);
          line = word;
        } else line = test;
      }
      lines.push(line);
    }
    if (lines.length > maxLines || lines.some((l) => c.measureText(l).width > tw) || y + lines.length * size * 1.17 > areaBottom) errors.push(`${label} does not fit. Shorten it or choose another layout.`);
    for (const line of lines) {
      c.fillText(line, tx, y);
      y += size * 1.17;
    }
    y += size * 0.35;
  }
  text(post.headline || post.title, w * 0.052, 700, "#152b22", 3, "Headline");
  text(post.body, w * 0.026, 400, "#384b42", 3, "Supporting text");
  text(post.cta, w * 0.025, 650, color, 2, "Call to action");
  if (logo) {
    const l = await image6(logo);
    const lw = w * 0.14, lh = w * 0.065;
    const x = w - p - lw, ly = h - p - lh;
    c.fillStyle = "#ffffff";
    c.fillRect(x - 10, ly - 10, lw + 20, lh + 20);
    contain6(c, l, x, ly, lw, lh);
  }
  c.textBaseline = "alphabetic";
  return { errors, width: w, height: h, generated: !!design };
}
function downloadCanvas(canvas, name) {
  const a = document.createElement("a");
  a.download = name.replace(/[^a-zA-Z0-9_.-]/g, "-") + ".png";
  a.href = canvas.toDataURL("image/png");
  a.click();
}

// src/flexible-controls.jsx
var import_react3 = __toESM(require("react"), 1);
var title = (value) => value[0].toUpperCase() + value.slice(1);
var clone3 = (value) => JSON.parse(JSON.stringify(value));
function ColourSpec({ Field: Field2, label, value, onChange, allowAuto = false }) {
  const selected = value.mode === "palette" ? value.value : value.mode;
  return /* @__PURE__ */ import_react3.default.createElement("div", { className: "bs-colour-spec" }, /* @__PURE__ */ import_react3.default.createElement(Field2, { label }, /* @__PURE__ */ import_react3.default.createElement("select", { value: selected, onChange: (e) => {
    const v = e.target.value;
    onChange(v === "auto" ? { mode: "auto" } : v === "custom" ? { mode: "custom", value: value.mode === "custom" ? value.value : "#171717" } : { mode: "palette", value: v });
  } }, allowAuto && /* @__PURE__ */ import_react3.default.createElement("option", { value: "auto" }, "Automatic ink / paper"), PALETTE_ROLES.map((role) => /* @__PURE__ */ import_react3.default.createElement("option", { key: role, value: role }, title(role))), /* @__PURE__ */ import_react3.default.createElement("option", { value: "custom" }, "Custom colour"))), value.mode === "custom" && /* @__PURE__ */ import_react3.default.createElement(Field2, { className: "bs-colour-field", label: label + " custom hex" }, /* @__PURE__ */ import_react3.default.createElement("input", { type: "color", value: value.value, onChange: (e) => onChange({ mode: "custom", value: e.target.value }) }), /* @__PURE__ */ import_react3.default.createElement("span", { className: "bs-colour-hex" }, value.value)));
}
function CtaControls({ Field: Field2, options, onChange }) {
  const c = options.cta, patch = (key, value) => onChange("cta", { ...c, [key]: value });
  return /* @__PURE__ */ import_react3.default.createElement("details", { className: "bs-control-group", open: true }, /* @__PURE__ */ import_react3.default.createElement("summary", null, "Call to action"), /* @__PURE__ */ import_react3.default.createElement("p", null, "A separate treatment for your exact CTA words. Empty copy draws no shape."), /* @__PURE__ */ import_react3.default.createElement(Field2, { label: "CTA style" }, /* @__PURE__ */ import_react3.default.createElement("select", { value: c.style, onChange: (e) => onChange("cta", { ...c, style: e.target.value, width: e.target.value === "strip" ? options.compilerVersion === 4 ? "poster" : "full" : "fit" }) }, CTA_STYLES.map((item) => /* @__PURE__ */ import_react3.default.createElement("option", { key: item.id, value: item.id }, item.id === "strip" ? options.compilerVersion === 4 ? "Strip" : "Full strip" : item.id === "text" ? "Text-only link" : item.id === "outline" ? "Outline button" : item.label)))), c.style !== "text" && /* @__PURE__ */ import_react3.default.createElement(ColourSpec, { Field: Field2, label: c.style === "outline" ? "CTA outline colour" : "CTA background colour", value: c.fill, onChange: (v) => patch("fill", v) }), /* @__PURE__ */ import_react3.default.createElement(ColourSpec, { Field: Field2, label: "CTA text colour", value: c.text, onChange: (v) => patch("text", v), allowAuto: true }), /* @__PURE__ */ import_react3.default.createElement("div", { className: "bs-two-fields" }, /* @__PURE__ */ import_react3.default.createElement(Field2, { label: "CTA width" }, /* @__PURE__ */ import_react3.default.createElement("select", { value: c.width, onChange: (e) => patch("width", e.target.value) }, /* @__PURE__ */ import_react3.default.createElement("option", { value: "fit" }, "Fit text"), options.compilerVersion === 4 ? /* @__PURE__ */ import_react3.default.createElement(import_react3.default.Fragment, null, /* @__PURE__ */ import_react3.default.createElement("option", { value: "column" }, "Text column"), /* @__PURE__ */ import_react3.default.createElement("option", { value: "poster" }, "Poster width")) : /* @__PURE__ */ import_react3.default.createElement("option", { value: "full" }, "Full column"))), /* @__PURE__ */ import_react3.default.createElement(Field2, { label: "CTA alignment" }, /* @__PURE__ */ import_react3.default.createElement("select", { value: c.align, onChange: (e) => patch("align", e.target.value) }, ["left", "center", "right"].map((v) => /* @__PURE__ */ import_react3.default.createElement("option", { key: v, value: v }, title(v)))))), /* @__PURE__ */ import_react3.default.createElement("details", null, /* @__PURE__ */ import_react3.default.createElement("summary", null, "CTA padding and arrow"), [["paddingX", "Horizontal padding", 0, 64], ["paddingY", "Vertical padding", 0, 40]].map(([key, label, min, max]) => /* @__PURE__ */ import_react3.default.createElement(Field2, { key, label: "CTA " + label.toLowerCase(), hint: c[key] + " layout units" }, /* @__PURE__ */ import_react3.default.createElement("input", { type: "range", min, max, step: "1", value: c[key], onChange: (e) => patch(key, +e.target.value) }))), /* @__PURE__ */ import_react3.default.createElement("label", { className: "bs-review-check" }, /* @__PURE__ */ import_react3.default.createElement("input", { type: "checkbox", checked: c.arrow, onChange: (e) => patch("arrow", e.target.checked) }), "CTA arrow")));
}
function TextColourControls({ Field: Field2, options, onChange }) {
  return /* @__PURE__ */ import_react3.default.createElement("details", { className: "bs-control-group" }, /* @__PURE__ */ import_react3.default.createElement("summary", null, "Text colours"), /* @__PURE__ */ import_react3.default.createElement("p", null, "No backing rectangles. Automatic ink/paper is checked against the imagery beneath the lettering."), Object.entries(options.textColors).map(([role, value]) => /* @__PURE__ */ import_react3.default.createElement(Field2, { key: role, label: title(role) + " text colour" }, /* @__PURE__ */ import_react3.default.createElement("select", { value, onChange: (e) => onChange("textColors", { ...options.textColors, [role]: e.target.value }) }, /* @__PURE__ */ import_react3.default.createElement("option", { value: "auto" }, "Automatic ink / paper"), PALETTE_ROLES.map((v) => /* @__PURE__ */ import_react3.default.createElement("option", { key: v, value: v }, title(v)))))));
}
function CompanyLanguageControls({ Field: Field2, profile, onChange, renderPreview }) {
  const [open, setOpen] = (0, import_react3.useState)(false), aliases = { lateral: "subject-right", broadside: "bold-backdrop", specimen: "image-lead", centered: "centered-announcement", spread: "service-sheet", cover: "bold-backdrop" }, edit = (patch) => onChange(normalizeCompositionProfile({ ...profile, ...patch }));
  const arrangements = TEMPLATES.map(({ id, label }) => [id, label]), selected = profile ? [...new Set(profile.layouts.map((id) => aliases[id] || id))] : [];
  return /* @__PURE__ */ import_react3.default.createElement("details", { className: "bs-control-group bs-company-language", onToggle: (e) => setOpen(e.currentTarget.open) }, /* @__PURE__ */ import_react3.default.createElement("summary", null, "Preferred arrangements \xB7 optional"), /* @__PURE__ */ import_react3.default.createElement("p", null, "Starting layouts for future posts only. Existing artwork and reviews stay unchanged. No decorative motifs are added by the new templates."), /* @__PURE__ */ import_react3.default.createElement(Field2, { label: "Company design language" }, /* @__PURE__ */ import_react3.default.createElement("select", { value: profile?.id || "", onChange: (e) => {
    const id = e.target.value;
    if (!id) {
      onChange(null);
      return;
    }
    const preset = PROFILE_PRESETS.find((p) => p.id === id);
    onChange(preset ? clone3(preset.profile) : normalizeCompositionProfile({ ...clone3(profile || PROFILE_PRESETS[0].profile), id: "custom" }));
  } }, /* @__PURE__ */ import_react3.default.createElement("option", { value: "" }, "No preference"), PROFILE_PRESETS.map((p) => /* @__PURE__ */ import_react3.default.createElement("option", { key: p.id, value: p.id }, p.id === "creative-modular" ? "Creative studio" : "Research editorial")), /* @__PURE__ */ import_react3.default.createElement("option", { value: "custom" }, "Custom selection"))), profile && /* @__PURE__ */ import_react3.default.createElement(import_react3.default.Fragment, null, /* @__PURE__ */ import_react3.default.createElement("label", { className: "bs-review-check" }, /* @__PURE__ */ import_react3.default.createElement("input", { type: "checkbox", checked: profile.vary, onChange: (e) => edit({ vary: e.target.checked }) }), "Vary new post layouts"), /* @__PURE__ */ import_react3.default.createElement("p", null, profile.vary ? "Cycles these arrangements only when new posts are created. Saved posts never reroll." : "New posts start with the first preferred arrangement.", " Pinned campaign looks take precedence."), /* @__PURE__ */ import_react3.default.createElement("fieldset", { className: "bs-preferred-arrangements" }, /* @__PURE__ */ import_react3.default.createElement("legend", null, "Preferred arrangements"), arrangements.map(([id, label]) => /* @__PURE__ */ import_react3.default.createElement("label", { key: id }, /* @__PURE__ */ import_react3.default.createElement("input", { type: "checkbox", checked: selected.includes(id), disabled: selected.length === 1 && selected.includes(id), onChange: (e) => edit({ id: "custom", layouts: e.target.checked ? [...selected, id] : selected.filter((v) => v !== id) }) }), label))), open && /* @__PURE__ */ import_react3.default.createElement("div", { className: "bs-language-previews", "aria-label": "Company arrangement examples" }, selected.slice(0, 3).map((id, index) => /* @__PURE__ */ import_react3.default.createElement("div", { key: id }, renderPreview({ ...profile, layouts: selected }, index), /* @__PURE__ */ import_react3.default.createElement("strong", null, arrangements.find((a) => a[0] === id)?.[1])))), /* @__PURE__ */ import_react3.default.createElement("p", { className: "bs-small" }, "Illustrative preview copy only\u2014not saved posts or approved client claims.")));
}

// src/look-controls.jsx
var import_react5 = __toESM(require("react"), 1);

// src/template-icon.jsx
var import_react4 = __toESM(require("react"), 1);
var heights = { square: 1080, portrait: 1350, story: 1920, landscape: 565.2 };
function TemplateIcon({ id, format = "square", density = "balanced" }) {
  const plan3 = templatePlan(id, format, density), height = heights[format];
  const lines = (box, count, opacity, kind) => {
    const [x, y, w, h] = box, lineHeight = Math.min(h / (count * 1.7), kind === "title" ? 54 : 24), gap = lineHeight * 0.65;
    return Array.from({ length: count }, (_, i) => /* @__PURE__ */ import_react4.default.createElement("rect", { key: kind + i, x, y: y + i * (lineHeight + gap), width: w * (i === count - 1 ? 0.73 : 1), height: lineHeight, rx: "3", opacity }));
  };
  const photo = plan3.backgroundBox || plan3.visual, action = id === "bold-backdrop" ? plan3.posterCta : plan3.cta;
  return /* @__PURE__ */ import_react4.default.createElement("svg", { className: "bs-arrangement-sketch bs-template-icon", viewBox: `0 0 1080 ${height}`, preserveAspectRatio: "xMidYMid meet", "aria-hidden": "true", focusable: "false", "data-layout-id": id, "data-format": format }, /* @__PURE__ */ import_react4.default.createElement("rect", { x: "4", y: "4", width: "1072", height: height - 8, rx: "24", fill: "var(--bs-surface)", stroke: "currentColor", strokeWidth: "8", opacity: ".7" }), /* @__PURE__ */ import_react4.default.createElement("g", { fill: "currentColor" }, /* @__PURE__ */ import_react4.default.createElement("rect", { x: photo[0], y: photo[1], width: photo[2], height: photo[3], opacity: ".16" }), lines(plan3.title, 2, 0.9, "title"), lines(plan3.body, 3, 0.5, "body"), /* @__PURE__ */ import_react4.default.createElement("rect", { x: action[0], y: action[1], width: action[2], height: Math.min(action[3], 48), rx: "5", opacity: ".85" })));
}

// src/look-controls.jsx
function Percentage({ Field: Field2, label, value, onChange, disabled = false }) {
  const percent = Math.round(value * 1e4) / 100, [text, setText] = (0, import_react5.useState)(String(percent));
  (0, import_react5.useEffect)(() => setText(String(percent)), [percent]);
  return /* @__PURE__ */ import_react5.default.createElement("div", { className: "bs-percentage" }, /* @__PURE__ */ import_react5.default.createElement(Field2, { label, hint: "0% hides this image. 100% shows its full strength; original transparency is preserved." }, /* @__PURE__ */ import_react5.default.createElement("input", { type: "range", min: "0", max: "100", step: "0.01", disabled, value: percent, onChange: (e) => onChange(+e.target.value / 100) })), /* @__PURE__ */ import_react5.default.createElement("label", { className: "bs-percent-number" }, /* @__PURE__ */ import_react5.default.createElement("input", { "aria-label": label + " percent", type: "number", min: "0", max: "100", step: "0.01", disabled, value: text, onChange: (e) => {
    setText(e.target.value);
    const n = Number(e.target.value);
    if (e.target.value !== "" && Number.isFinite(n) && n >= 0 && n <= 100) onChange(n / 100);
  }, onBlur: () => setText(String(percent)) }), /* @__PURE__ */ import_react5.default.createElement("span", null, "%")));
}
function HeadlineSize({ Field: Field2, value, onChange }) {
  const [text, setText] = (0, import_react5.useState)(value === null ? "" : String(value));
  (0, import_react5.useEffect)(() => setText(value === null ? "" : String(value)), [value]);
  return /* @__PURE__ */ import_react5.default.createElement(Field2, { label: "Headline size", hint: value === null ? "Using the arrangement size." : "Custom size for this format." }, /* @__PURE__ */ import_react5.default.createElement("input", { type: "number", min: "48", max: "260", step: "1", value: text, placeholder: "Arrangement default", onChange: (e) => {
    const raw = e.target.value;
    setText(raw);
    if (raw === "") onChange(null);
    else {
      const n = Number(raw);
      if (Number.isFinite(n) && n >= 48 && n <= 260) onChange(n);
    }
  }, onBlur: () => setText(value === null ? "" : String(value)) }));
}
function ImageThumbnail({ id, getAsset, label }) {
  const [src, setSrc] = (0, import_react5.useState)("");
  (0, import_react5.useEffect)(() => {
    let live = true;
    setSrc("");
    if (id) getAsset(id).then((value) => {
      if (live) setSrc(value || "");
    }).catch(() => {
    });
    return () => {
      live = false;
    };
  }, [id, getAsset]);
  return src ? /* @__PURE__ */ import_react5.default.createElement("img", { className: "bs-selected-image", src, alt: label + " selected source" }) : null;
}
function Range({ Field: Field2, label, value, min = 0, max = 1, step = 0.01, onChange }) {
  return /* @__PURE__ */ import_react5.default.createElement(Field2, { label, hint: Number(value).toFixed(2) }, /* @__PURE__ */ import_react5.default.createElement("input", { type: "range", min, max, step, value, onChange: (e) => onChange(+e.target.value) }));
}
function LookControls({ Field: Field2, options, modern, templateMode, format, formatLabel, hasOverrides, onApplyAll, onChooseTemplate, onChoosePairing, onChange, images, getAsset, renderAdvanced, renderActions }) {
  const [role, setRole] = (0, import_react5.useState)("background"), hintId = (0, import_react5.useId)(), pair = resolveFontPairing(options), customFonts = Object.values(options.typography || {}).some((style) => style.fontId), pairings = templateMode ? FONT_PAIRINGS : FONT_PAIRINGS.filter((p) => ["studio", "impact", "clean"].includes(p.id));
  const current = TEMPLATES.find((t) => t.id === options.composition?.layout), selectable = images.filter((i) => i.role === "background" || i.id), selected = selectable.find((i) => i.role === role) || selectable[0];
  const patchLayer = (r, key, value) => onChange("layers", { ...options.layers, [r]: { ...options.layers[r], [key]: value } });
  const backgroundFit = templateMode ? templatePlan(options.composition.layout, format, options.composition.density).backgroundFit || "cover" : "cover";
  const imageMode = templateMode ? options.layers.background.mode === "image" : options.recipe !== "editorial";
  const available = !!selected?.id && (templateMode ? selected.role !== "background" || imageMode : imageMode);
  function selectTemplate(id) {
    if (!templateMode || current?.id !== id) onChooseTemplate(id);
  }
  return /* @__PURE__ */ import_react5.default.createElement("div", { className: "bs-look-controls" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "bs-look-scope" }, /* @__PURE__ */ import_react5.default.createElement("strong", null, "Editing ", formatLabel), /* @__PURE__ */ import_react5.default.createElement("span", null, "Appearance changes affect the poster you see."), hasOverrides && /* @__PURE__ */ import_react5.default.createElement("small", null, "This size has custom settings. The controls show those actual values."), modern && /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: "bs-text-button", onClick: onApplyAll }, "Apply look to other formats"), modern && /* @__PURE__ */ import_react5.default.createElement("small", null, "Applying to other formats replaces their appearance overrides, not words or shared image selections.")), /* @__PURE__ */ import_react5.default.createElement("section", { className: "bs-look-section", "aria-label": "Arrangement" }, /* @__PURE__ */ import_react5.default.createElement("h2", { className: "bs-control-heading" }, "Arrangement"), /* @__PURE__ */ import_react5.default.createElement("p", { id: hintId, className: "bs-small" }, "Click an icon to update this format in the main preview."), /* @__PURE__ */ import_react5.default.createElement("div", { className: "bs-layout-choices bs-template-icons", role: "group", "aria-label": "Choose arrangement" }, TEMPLATES.map((t) => /* @__PURE__ */ import_react5.default.createElement("button", { key: t.id, type: "button", title: t.description, "aria-describedby": hintId, "aria-pressed": templateMode && current?.id === t.id, onClick: () => selectTemplate(t.id) }, /* @__PURE__ */ import_react5.default.createElement(TemplateIcon, { id: t.id, format, density: options.composition?.density || "balanced" }), /* @__PURE__ */ import_react5.default.createElement("strong", null, t.label)))), /* @__PURE__ */ import_react5.default.createElement("p", { className: "bs-selected-template", "aria-live": "polite" }, /* @__PURE__ */ import_react5.default.createElement("strong", null, templateMode ? current?.label || "Custom arrangement" : "Current look"), /* @__PURE__ */ import_react5.default.createElement("span", null, templateMode ? current?.description : "Your earlier composition stays unchanged until you choose an arrangement.")), /* @__PURE__ */ import_react5.default.createElement("p", { className: "bs-small" }, "Choosing an arrangement resets text sizing, subject placement and CTA layout. Your words, image sources, opacity, colours and font pairing stay yours. You can undo it.")), !modern ? /* @__PURE__ */ import_react5.default.createElement("p", { className: "bs-callout" }, "Choose an arrangement to enable the focused image and type controls. Your saved versions remain unchanged.") : /* @__PURE__ */ import_react5.default.createElement(import_react5.default.Fragment, null, /* @__PURE__ */ import_react5.default.createElement("section", { className: "bs-look-section", "aria-label": "Background and images" }, /* @__PURE__ */ import_react5.default.createElement("h2", { className: "bs-control-heading" }, "Background & images"), /* @__PURE__ */ import_react5.default.createElement(Field2, { label: "Background colour" }, /* @__PURE__ */ import_react5.default.createElement("select", { value: options.treatment, onChange: (e) => onChange("treatment", e.target.value) }, /* @__PURE__ */ import_react5.default.createElement("option", { value: "brand" }, "Brand colour"), /* @__PURE__ */ import_react5.default.createElement("option", { value: "light" }, "Brand paper \xB7 light"), /* @__PURE__ */ import_react5.default.createElement("option", { value: "dark" }, "Brand ink \xB7 dark"))), /* @__PURE__ */ import_react5.default.createElement(Field2, { label: templateMode ? "Background source" : "Current image policy", hint: templateMode ? void 0 : "Earlier styles use a combined image policy. Choose a new arrangement for independent image layers." }, /* @__PURE__ */ import_react5.default.createElement("select", { value: imageMode ? "image" : "solid", onChange: (e) => {
    if (templateMode) patchLayer("background", "mode", e.target.value);
    else onChange("recipe", e.target.value === "solid" ? "editorial" : "hero");
  } }, /* @__PURE__ */ import_react5.default.createElement("option", { value: "solid" }, templateMode ? "Solid colour" : "Text only \xB7 imagery hidden"), /* @__PURE__ */ import_react5.default.createElement("option", { value: "image" }, templateMode ? "Image over colour" : "Show imagery"))), images.filter((i) => i.role === "background" || i.id).length > 1 && /* @__PURE__ */ import_react5.default.createElement(Field2, { label: "Image to adjust" }, /* @__PURE__ */ import_react5.default.createElement("select", { value: selected.role, onChange: (e) => setRole(e.target.value) }, images.filter((i) => i.role === "background" || i.id).map((i) => /* @__PURE__ */ import_react5.default.createElement("option", { key: i.role, value: i.role }, i.label)))), /* @__PURE__ */ import_react5.default.createElement("div", { className: "bs-image-identity" }, /* @__PURE__ */ import_react5.default.createElement(ImageThumbnail, { id: selected.id, label: selected.label, getAsset }), /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement("strong", null, selected.label), /* @__PURE__ */ import_react5.default.createElement("small", null, selected.id ? selected.name || "Saved image" : "No image selected"))), /* @__PURE__ */ import_react5.default.createElement(Field2, { label: selected.label + " image", hint: "Image selection is shared across formats. Opacity and positioning affect this size." }, /* @__PURE__ */ import_react5.default.createElement("select", { value: selected.id || "", onChange: (e) => selected.onSelect(e.target.value) }, /* @__PURE__ */ import_react5.default.createElement("option", { value: "" }, "No image"), selected.choices.map((a) => /* @__PURE__ */ import_react5.default.createElement("option", { key: a.id, value: a.id }, a.name || "Saved image " + a.id.slice(0, 8))))), /* @__PURE__ */ import_react5.default.createElement("label", { className: "bs-upload" }, "Replace ", selected.label.toLowerCase(), /* @__PURE__ */ import_react5.default.createElement("input", { "aria-label": "Upload " + selected.label.toLowerCase(), type: "file", accept: "image/png,image/jpeg,image/webp", onChange: (e) => {
    selected.onUpload(e.target.files[0]);
    e.target.value = "";
  } })), !available && /* @__PURE__ */ import_react5.default.createElement("p", { className: "bs-image-explanation" }, !selected.id ? "Select or upload an image to adjust it." : selected.role === "background" ? "This background is not drawn in Solid colour mode. Choose Image over colour to show and adjust it." : "This image is not drawn in the current composition."), available && (selected.role === "background" || templateMode) ? /* @__PURE__ */ import_react5.default.createElement(Percentage, { Field: Field2, label: selected.label + " opacity", value: options.layers[selected.role].opacity, onChange: (v) => patchLayer(selected.role, "opacity", v) }) : available && /* @__PURE__ */ import_react5.default.createElement("p", { className: "bs-small" }, "Choose a new arrangement to independently fade this image. Background opacity does not change it."), available && selected.role === "background" && /* @__PURE__ */ import_react5.default.createElement("details", null, /* @__PURE__ */ import_react5.default.createElement("summary", null, backgroundFit === "contain" ? "Image settings" : "Crop & image settings"), backgroundFit === "contain" ? /* @__PURE__ */ import_react5.default.createElement("p", { className: "bs-small" }, "This arrangement fits the complete image inside its frame. Zoom and crop do not apply; choose another arrangement to crop it.") : /* @__PURE__ */ import_react5.default.createElement(import_react5.default.Fragment, null, /* @__PURE__ */ import_react5.default.createElement(Range, { Field: Field2, label: "Background zoom", value: options.heroScale, min: 0.8, max: 1.2, onChange: (v) => onChange("heroScale", v) }), /* @__PURE__ */ import_react5.default.createElement(Range, { Field: Field2, label: "Background horizontal crop", value: options.cropX, onChange: (v) => onChange("cropX", v) }), /* @__PURE__ */ import_react5.default.createElement(Range, { Field: Field2, label: "Background vertical crop", value: options.cropY, onChange: (v) => onChange("cropY", v) })), /* @__PURE__ */ import_react5.default.createElement(Range, { Field: Field2, label: "Background blur", value: options.layers.background.blur, min: 0, max: 24, step: 1, onChange: (v) => patchLayer("background", "blur", v) })), available && selected.role === "foreground" && /* @__PURE__ */ import_react5.default.createElement("details", null, /* @__PURE__ */ import_react5.default.createElement("summary", null, "Subject placement"), [["x", "Subject horizontal", 0, 1], ["y", "Subject vertical", 0, 1], ["scale", "Subject scale", 0.4, 2], ["rotation", "Subject rotation", -25, 25]].map(([key, label, min, max]) => /* @__PURE__ */ import_react5.default.createElement(Range, { key, Field: Field2, label, value: options.layers.foreground[key], min, max, onChange: (v) => patchLayer("foreground", key, v) })))), /* @__PURE__ */ import_react5.default.createElement("section", { className: "bs-look-section", "aria-label": "Text appearance" }, /* @__PURE__ */ import_react5.default.createElement("h2", { className: "bs-control-heading" }, "Text"), /* @__PURE__ */ import_react5.default.createElement(Field2, { label: "Font pairing", hint: customFonts ? "Custom role fonts are active. Choosing a pairing replaces their families and weights; size and spacing stay yours." : `${pair.headline.family} / ${pair.body.family}` }, /* @__PURE__ */ import_react5.default.createElement("select", { value: customFonts ? "custom-role-fonts" : pair.id, onChange: (e) => onChoosePairing(e.target.value) }, customFonts && /* @__PURE__ */ import_react5.default.createElement("option", { value: "custom-role-fonts", disabled: true }, "Custom role fonts"), pairings.map((p) => /* @__PURE__ */ import_react5.default.createElement("option", { key: p.id, value: p.id }, p.label)))), !templateMode && /* @__PURE__ */ import_react5.default.createElement("p", { className: "bs-small" }, "Choose an arrangement above to unlock all six font pairings. Your earlier look currently uses its original three."), /* @__PURE__ */ import_react5.default.createElement(HeadlineSize, { Field: Field2, value: options.typography.headline.size, onChange: (size) => onChange("typography", { ...options.typography, headline: { ...options.typography.headline, size } }) }), options.typography.headline.size !== null && /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: "bs-text-button", onClick: () => onChange("typography", { ...options.typography, headline: { ...options.typography.headline, size: null } }) }, "Use template headline size"), templateMode && /* @__PURE__ */ import_react5.default.createElement(TextColourControls, { Field: Field2, options, onChange }), /* @__PURE__ */ import_react5.default.createElement("details", null, /* @__PURE__ */ import_react5.default.createElement("summary", null, "Advanced typography"), renderAdvanced()), /* @__PURE__ */ import_react5.default.createElement("p", { className: "bs-small" }, "Your exact words stay in Words. Fonts and copy never shrink silently to fit.")), templateMode ? /* @__PURE__ */ import_react5.default.createElement(CtaControls, { Field: Field2, options, onChange }) : /* @__PURE__ */ import_react5.default.createElement("p", { className: "bs-small" }, "Your current CTA is preserved. Choose a new arrangement for independent CTA styling and poster-width actions.")), renderActions());
}

// src/client.jsx
var emptyAsset = async () => null;
function companyPaintInputs(company) {
  const { compositionProfile, updatedAt, ...paint5 } = company;
  return paint5;
}
function editablePosterCopy(options) {
  return options?.compilerVersion === 4 ? normalizePoster(options) : options?.compilerVersion === 3 ? upgradePosterFlexible(options) : upgradePoster(options);
}
function followMotifPlacement(previous, next, formats3) {
  const result = copy2(next), base = (p) => resolvePoster({ ...p, formats: {} }, "square");
  const placement = (o) => motifPlacementForLayout(o.composition.layout, "square", o.composition.density);
  const automatic = (o, f) => {
    const a = motifPlacementForLayout(o.composition.layout, f, o.composition.density), m = o.motif;
    return ["x", "y", "scale"].every((k) => m[k] === a[k]) || m.id === "none" && m.x === 0.75 && m.y === 0.65 && m.scale === 1;
  };
  const changes = (a, b) => a.composition.layout !== b.composition.layout || a.composition.density !== b.composition.density || a.motif.id === "none" && b.motif.id !== "none";
  const oldBase = base(previous), newBase = base(next);
  if (formats3.length === 4 && changes(oldBase, newBase) && automatic(oldBase, "square")) {
    const { x, y, scale } = placement(newBase);
    result.motif = { ...result.motif, x, y, scale };
  }
  for (const f of formats3) {
    const a = resolvePoster(previous, f), b = resolvePoster(next, f);
    if (changes(a, b) && automatic(a, f)) {
      const { x, y, scale } = motifPlacementForLayout(b.composition.layout, f, b.composition.density);
      result.formats = { ...result.formats, [f]: { ...result.formats?.[f], motif: { ...result.formats?.[f]?.motif, x, y, scale } } };
    }
  }
  return normalizePoster(result);
}
var legacyTemplateIds = { lateral: "subject-right", broadside: "bold-backdrop", specimen: "image-lead", centered: "centered-announcement", spread: "service-sheet", cover: "bold-backdrop" };
function languageExample(company, profile, index) {
  const id = legacyTemplateIds[profile.layouts[index]] || profile.layouts[index] || "bold-backdrop";
  const poster = applyTemplate(upgradePosterTemplate({ version: 3, recipe: "editorial", voice: company.brandKit?.voice || "studio" }), id, "square");
  return /* @__PURE__ */ import_react6.default.createElement(PosterThumbnail, { company: { ...company, name: company.name || "Your company" }, post: { id: "language-example", format: "square", headline: "One clear idea.", body: "A layout that feels like your company.", cta: "Explore more", assetIds: [], poster }, getAsset: emptyAsset });
}
var VOICES2 = [["studio", "Bold studio"], ["impact", "Compact impact"], ["clean", "Clean digital"]];
var VARIATIONS = [["balanced", "Balanced"], ["type-led", "Headline first"], ["image-led", "Subject first"]];
var copy2 = (value) => JSON.parse(JSON.stringify(value));
function legacyScenePost(post, design) {
  const { poster, ...original } = post || {};
  return { ...original, ...design };
}
var inject = ["slots", "layout", "connection"];
function Button({ children, primary = false, icon, ...props }) {
  return /* @__PURE__ */ import_react6.default.createElement("button", { className: "bs-button " + (primary ? "bs-primary" : ""), ...props }, icon && /* @__PURE__ */ import_react6.default.createElement(Icon, { name: icon }), " ", children);
}
function Field({ label, hint, children, className = "" }) {
  const id = (0, import_react6.useId)(), items = import_react6.default.Children.toArray(children);
  return /* @__PURE__ */ import_react6.default.createElement("label", { className: "bs-field " + className, htmlFor: id }, /* @__PURE__ */ import_react6.default.createElement("span", null, label), import_react6.default.cloneElement(items[0], { id, "aria-label": label, "aria-describedby": hint ? id + "-hint" : void 0 }), items.slice(1), hint && /* @__PURE__ */ import_react6.default.createElement("small", { id: id + "-hint" }, hint));
}
function viewportFor(node) {
  let zoom = 1;
  for (let el = node; el; el = el.parentElement) {
    const value = Number.parseFloat(getComputedStyle(el).zoom);
    if (Number.isFinite(value) && value > 0) zoom *= value;
  }
  return { width: (window.visualViewport?.width || window.innerWidth) / zoom, height: (window.visualViewport?.height || window.innerHeight) / zoom, zoom };
}
function Modal({ title: title2, children, onClose }) {
  const ref = (0, import_react6.useRef)(), titleId = (0, import_react6.useId)();
  (0, import_react6.useEffect)(() => {
    const dialog = ref.current;
    function fit() {
      const viewport = viewportFor(dialog);
      dialog.style.setProperty("--bs-dialog-height", `${Math.max(120, viewport.height - 24)}px`);
      dialog.style.setProperty("--bs-dialog-width", `${Math.max(120, viewport.width - 24)}px`);
    }
    fit();
    dialog.showModal();
    window.addEventListener("resize", fit);
    window.visualViewport?.addEventListener("resize", fit);
    const observer = new MutationObserver(fit);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["style"] });
    return () => {
      window.removeEventListener("resize", fit);
      window.visualViewport?.removeEventListener("resize", fit);
      observer.disconnect();
      dialog.close();
    };
  }, []);
  return /* @__PURE__ */ import_react6.default.createElement("dialog", { ref, className: "bs-modal", "aria-labelledby": titleId, onCancel: onClose }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-modal-head" }, /* @__PURE__ */ import_react6.default.createElement("h2", { id: titleId }, title2), /* @__PURE__ */ import_react6.default.createElement("button", { type: "button", className: "bs-icon", "aria-label": "Close dialog", onClick: onClose }, /* @__PURE__ */ import_react6.default.createElement(Icon, { name: "close" }))), children);
}
var EMPTY = { companies: [], campaigns: [], plans: [], posts: [], designs: [], jobs: [], assets: [], settings: {} };
function isoDate(d) {
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
}
function weekFor(tz, weekStart = 1) {
  let ds;
  try {
    ds = new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" }).format(/* @__PURE__ */ new Date());
  } catch {
    ds = new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "2-digit", day: "2-digit" }).format(/* @__PURE__ */ new Date());
  }
  const d = /* @__PURE__ */ new Date(ds + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() - (d.getUTCDay() - Number(weekStart) + 7) % 7);
  return isoDate(d);
}
function shiftWeek(s, n) {
  const d = /* @__PURE__ */ new Date(s + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() + n * 7);
  return isoDate(d);
}
function dateLabel(s) {
  return new Intl.DateTimeFormat(void 0, { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(/* @__PURE__ */ new Date(s + "T12:00:00Z"));
}
function nice(s) {
  return String(s || "planned").replaceAll("-", " ").replace(/^./, (x) => x.toUpperCase());
}
function apply(ctx) {
  const assetCache = /* @__PURE__ */ new Map(), fontCache = /* @__PURE__ */ new Map();
  async function api(endpoint, payload = {}) {
    const response = await fetch(`api/brand-studio/${endpoint}`, { method: "POST", credentials: "same-origin", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
    if (!response.ok) throw new Error(`Studio connection unavailable (HTTP ${response.status}). Reopen this panel after reconnecting.`);
    const r = await response.json();
    if (!r.ok) throw new Error(r.error?.message || "The request could not be completed. Your saved work is safe.");
    return r.value;
  }
  async function getAsset(id) {
    if (!id) return null;
    if (!assetCache.has(id)) assetCache.set(id, api("asset", { id }).then((v) => v.dataUrl).catch((e) => {
      assetCache.delete(id);
      throw e;
    }));
    return assetCache.get(id);
  }
  async function getFont(fontId, weight) {
    const key = fontId + ":" + weight;
    if (!fontCache.has(key)) fontCache.set(key, api("fonts.file", { fontId, weight }).catch((e) => {
      fontCache.delete(key);
      throw e;
    }));
    return fontCache.get(key);
  }
  function App() {
    const [state, setState] = (0, import_react6.useState)(EMPTY), [status, setStatus] = (0, import_react6.useState)(null), [companyId, setCompanyId] = (0, import_react6.useState)(""), [tab, setTab] = (0, import_react6.useState)("Home"), [week, setWeek] = (0, import_react6.useState)(weekFor(Intl.DateTimeFormat().resolvedOptions().timeZone)), [campaignFilter, setCampaignFilter] = (0, import_react6.useState)(""), [editing, setEditing] = (0, import_react6.useState)(null), [historyId, setHistoryId] = (0, import_react6.useState)(""), [dialog, setDialog] = (0, import_react6.useState)(null), [error, setError] = (0, import_react6.useState)(""), [notice, setNotice] = (0, import_react6.useState)(""), [busy, setBusy] = (0, import_react6.useState)(false), [ready, setReady] = (0, import_react6.useState)(false), [selected, setSelected] = (0, import_react6.useState)([]);
    const acceptedState = (0, import_react6.useRef)(EMPTY);
    const acceptState = (0, import_react6.useCallback)((next) => {
      if (!next || !Number.isSafeInteger(next.revision) || next.revision < (acceptedState.current.revision ?? -1)) return false;
      acceptedState.current = next;
      setState(next);
      return true;
    }, []);
    const company = state.companies.find((c) => c.id === companyId), campaigns = state.campaigns.filter((c) => c.companyId === companyId), plans = state.plans.filter((p) => p.companyId === companyId && p.week === week), planIds = new Set(plans.map((p) => p.id)), posts = state.posts.filter((p) => p.companyId === companyId && planIds.has(p.planId) && (!campaignFilter || p.campaignId === campaignFilter)), allPosts = state.posts.filter((p) => p.companyId === companyId), jobs = state.jobs.filter((j) => j.companyId === companyId), activeJobs = state.jobs.filter((j) => ["queued", "running"].includes(j.status));
    const refresh = (0, import_react6.useCallback)(async () => {
      const [s, t] = await Promise.all([api("state"), api("status")]);
      acceptState(s);
      setStatus(t);
      return acceptedState.current;
    }, []);
    (0, import_react6.useEffect)(() => {
      refresh().then((s) => {
        const c = s.companies.find((x) => !x.archived);
        if (c) {
          setCompanyId(c.id);
          setWeek(weekFor(c.timezone, c.weekStart));
        }
        setReady(true);
      }).catch((e) => {
        setError(e.message);
        setReady(true);
      });
    }, []);
    (0, import_react6.useEffect)(() => {
      if (!activeJobs.length) return;
      const timer = setInterval(() => refresh().catch((e) => setError(e.message)), 2500);
      return () => clearInterval(timer);
    }, [activeJobs.length]);
    async function run(fn) {
      setError("");
      setNotice("");
      setBusy(true);
      try {
        return await fn();
      } catch (e) {
        setError(e.message);
        return null;
      } finally {
        setBusy(false);
      }
    }
    async function command(type, data) {
      const v = await api("command", { type, data });
      if (v.state) acceptState(v.state);
      return v;
    }
    function switchCompany(id) {
      setCompanyId(id);
      setCampaignFilter("");
      setEditing(null);
      setSelected([]);
      setHistoryId("");
      setTab("Home");
      const c = state.companies.find((c2) => c2.id === id);
      setWeek(weekFor(c?.timezone, c?.weekStart));
    }
    async function ensurePlan(c, focus = "") {
      return command("plan.ensure", { campaignId: c.id, week, focus });
    }
    async function createOneOff() {
      if (!company) {
        setDialog({ type: "company" });
        return;
      }
      await run(async () => {
        const r = await command("post.save", { companyId, title: "New social post", brief: "", headline: "", body: "", cta: "", format: "portrait", direction: "spotlight", assetIds: [] });
        setEditing(r.id);
        setTab("Create");
      });
    }
    async function confirmGenerate(ids) {
      await run(async () => {
        const r = await api("generate", { postIds: ids, requestId: crypto.randomUUID(), confirmed: true });
        if (r.state) acceptState(r.state);
        setDialog(null);
        setNotice(`${r.jobs.length} design request${r.jobs.length === 1 ? "" : "s"} queued. You can keep planning while images are created.`);
        setSelected([]);
      });
    }
    function openPost(p) {
      setHistoryId("");
      setEditing(p.id);
      setTab("Create");
    }
    const currentPost = state.posts.find((p) => p.id === editing && p.companyId === companyId);
    if (!ready) return /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-loading", role: "status" }, "Opening your studio\u2026"));
    return /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs", "data-bs-accent": "blue" }, /* @__PURE__ */ import_react6.default.createElement("header", { className: "bs-top" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-wordmark" }, /* @__PURE__ */ import_react6.default.createElement("span", { className: "bs-mark" }, /* @__PURE__ */ import_react6.default.createElement(StudioMark, { size: 29 })), /* @__PURE__ */ import_react6.default.createElement("strong", null, "Brand Studio")), /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-top-actions" }, company && /* @__PURE__ */ import_react6.default.createElement(import_react6.default.Fragment, null, /* @__PURE__ */ import_react6.default.createElement("select", { "aria-label": "Active company", value: companyId, onChange: (e) => switchCompany(e.target.value) }, state.companies.filter((c) => !c.archived).map((c) => /* @__PURE__ */ import_react6.default.createElement("option", { key: c.id, value: c.id }, c.name))), /* @__PURE__ */ import_react6.default.createElement("button", { className: "bs-icon", title: "Add company", "aria-label": "Add company", onClick: () => setDialog({ type: "company" }) }, /* @__PURE__ */ import_react6.default.createElement(Icon, { name: "plus" }))), /* @__PURE__ */ import_react6.default.createElement(Button, { icon: "settings", "aria-label": "Image setup", title: "Image setup", "data-bs-utility": true, onClick: () => setDialog({ type: "settings" }) }, /* @__PURE__ */ import_react6.default.createElement("span", { className: "bs-toolbar-label" }, "Image setup")), company && /* @__PURE__ */ import_react6.default.createElement(Button, { icon: "edit", "aria-label": "Company guidelines", title: "Company guidelines", "data-bs-utility": true, onClick: () => setDialog({ type: "company", record: company }) }, /* @__PURE__ */ import_react6.default.createElement("span", { className: "bs-toolbar-label" }, "Company guidelines")))), company && /* @__PURE__ */ import_react6.default.createElement("nav", { className: "bs-tabs", "aria-label": "Studio sections" }, ["Home", "This week", "Campaigns", "Create", "Past designs"].map((t) => /* @__PURE__ */ import_react6.default.createElement("button", { key: t, "aria-current": tab === t ? "page" : void 0, className: tab === t ? "active" : "", onClick: () => setTab(t) }, t))), /* @__PURE__ */ import_react6.default.createElement("main", { className: "bs-main" }, error && /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-alert", role: "alert" }, /* @__PURE__ */ import_react6.default.createElement("span", null, error), /* @__PURE__ */ import_react6.default.createElement("button", { "aria-label": "Dismiss error", onClick: () => setError("") }, /* @__PURE__ */ import_react6.default.createElement(Icon, { name: "close" }))), notice && /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-notice", role: "status" }, notice), !company || tab === "Home" ? /* @__PURE__ */ import_react6.default.createElement(Home, { state, company, onCreate: createOneOff, onOpenPost: (id) => {
      const p = state.posts.find((p2) => p2.id === id && p2.companyId === companyId);
      if (p) openPost(p);
    }, onOpenDesign: (id) => {
      const d = state.designs.find((d2) => d2.id === id && d2.companyId === companyId);
      if (d) {
        setHistoryId(d.id);
        setEditing(d.postId);
        setTab("Create");
      }
    }, onWeek: () => setTab("This week"), onCampaigns: () => setTab("Campaigns"), onSetup: () => setDialog({ type: "settings" }), onCompany: () => setDialog({ type: "company", record: company }), renderThumbnail: (d) => {
      const p = state.posts.find((p2) => p2.id === d.postId);
      const fp = d.scene?.post || legacyScenePost(p, d);
      return /* @__PURE__ */ import_react6.default.createElement(PosterThumbnail, { company: d.scene?.company || company, post: fp, design: d, backgroundId: d.assetId, logoId: d.logoAssetId, productId: d.productAssetId, foregroundId: d.foregroundAssetId || fp.foregroundAssetId, fonts: d.scene?.fonts || [], getAsset, getFont });
    } }) : tab === "This week" ? /* @__PURE__ */ import_react6.default.createElement(import_react6.default.Fragment, null, /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-page-head" }, /* @__PURE__ */ import_react6.default.createElement("div", null, /* @__PURE__ */ import_react6.default.createElement("h1", null, "Your creative week"), /* @__PURE__ */ import_react6.default.createElement("p", null, "One company. Every campaign. A clear next step.")), /* @__PURE__ */ import_react6.default.createElement(Button, { primary: true, icon: "plus", onClick: () => setDialog({ type: "campaign" }) }, "New campaign")), /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-weekbar" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-week-picker" }, /* @__PURE__ */ import_react6.default.createElement("button", { className: "bs-icon", "aria-label": "Previous week", onClick: () => {
      setWeek(shiftWeek(week, -1));
      setSelected([]);
    } }, /* @__PURE__ */ import_react6.default.createElement(Icon, { name: "back" })), /* @__PURE__ */ import_react6.default.createElement(Icon, { name: "calendar" }), /* @__PURE__ */ import_react6.default.createElement("span", null, "Week of ", dateLabel(week)), /* @__PURE__ */ import_react6.default.createElement("button", { className: "bs-icon", "aria-label": "Next week", onClick: () => {
      setWeek(shiftWeek(week, 1));
      setSelected([]);
    } }, /* @__PURE__ */ import_react6.default.createElement(Icon, { name: "arrow" }))), /* @__PURE__ */ import_react6.default.createElement("span", { className: "bs-muted" }, company.timezone, " \xB7 ", posts.length, " planned posts")), !campaigns.filter((c) => c.status === "active").length ? /* @__PURE__ */ import_react6.default.createElement(Empty, { title: "Give your next idea a home", text: "Create a campaign once. Reuse its message, look, and weekly rhythm without starting over.", action: /* @__PURE__ */ import_react6.default.createElement(Button, { primary: true, onClick: () => setDialog({ type: "campaign" }) }, "Create a campaign") }) : /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-campaign-list" }, campaigns.filter((c) => c.status === "active").map((c) => {
      const plan3 = plans.find((p) => p.campaignId === c.id), items = state.posts.filter((p) => p.planId === plan3?.id), done = items.filter((p) => p.status !== "planned").length;
      return /* @__PURE__ */ import_react6.default.createElement("section", { className: "bs-campaign-row", key: c.id }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-campaign-swatch", style: { background: company.color || "#17694e" }, "aria-hidden": "true" }, c.name.slice(0, 1)), /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-campaign-info" }, /* @__PURE__ */ import_react6.default.createElement("h2", null, c.name), /* @__PURE__ */ import_react6.default.createElement("p", null, c.goal), /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-meta" }, /* @__PURE__ */ import_react6.default.createElement("span", null, c.postsPerWeek, " posts / week"), /* @__PURE__ */ import_react6.default.createElement("span", null, plan3 ? `${done} of ${items.length} designs ready` : "Not planned yet"), c.offerExpiry && /* @__PURE__ */ import_react6.default.createElement("span", null, "Offer ends ", c.offerExpiry))), /* @__PURE__ */ import_react6.default.createElement(Button, { disabled: busy, onClick: () => plan3 ? setCampaignFilter(campaignFilter === c.id ? "" : c.id) : setDialog({ type: "plan", campaign: c }) }, plan3 ? campaignFilter === c.id ? "Show all posts" : "View this week" : "Plan this week", /* @__PURE__ */ import_react6.default.createElement(Icon, { name: "arrow" })));
    })), posts.length > 0 && /* @__PURE__ */ import_react6.default.createElement("section", { className: "bs-post-section" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-section-head" }, /* @__PURE__ */ import_react6.default.createElement("div", null, /* @__PURE__ */ import_react6.default.createElement("h2", null, campaignFilter ? campaigns.find((c) => c.id === campaignFilter)?.name : "This week\u2019s posts"), /* @__PURE__ */ import_react6.default.createElement("p", null, "Pick a post to shape its message and design.")), selected.length > 0 && /* @__PURE__ */ import_react6.default.createElement(Button, { primary: true, disabled: busy, onClick: () => setDialog({ type: "generate", ids: selected }) }, "Generate ", selected.length, " selected designs")), /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-post-list" }, posts.map((p) => /* @__PURE__ */ import_react6.default.createElement(PostRow, { key: p.id, post: p, campaign: campaigns.find((c) => c.id === p.campaignId), job: jobs.find((j) => j.postId === p.id && ["queued", "running", "unknown"].includes(j.status)), selected: selected.includes(p.id), onSelect: () => setSelected((x) => x.includes(p.id) ? x.filter((id) => id !== p.id) : [...x, p.id].slice(0, 8)), onOpen: () => openPost(p) }))))) : tab === "Campaigns" ? /* @__PURE__ */ import_react6.default.createElement(import_react6.default.Fragment, null, /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-page-head" }, /* @__PURE__ */ import_react6.default.createElement("div", null, /* @__PURE__ */ import_react6.default.createElement("h1", null, "Campaigns, with continuity"), /* @__PURE__ */ import_react6.default.createElement("p", null, "A lasting brief for every message you want to put out.")), /* @__PURE__ */ import_react6.default.createElement(Button, { primary: true, icon: "plus", onClick: () => setDialog({ type: "campaign" }) }, "New campaign")), !campaigns.length ? /* @__PURE__ */ import_react6.default.createElement(Empty, { title: "Start with one campaign", text: "A product launch, weekly offer, or ongoing story\u2014all begin with a clear goal." }) : /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-campaign-list" }, campaigns.map((c) => /* @__PURE__ */ import_react6.default.createElement("section", { className: "bs-campaign-row", key: c.id }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-campaign-info" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-inline" }, /* @__PURE__ */ import_react6.default.createElement("h2", null, c.name), /* @__PURE__ */ import_react6.default.createElement("span", { className: "bs-badge " + c.status }, nice(c.status))), /* @__PURE__ */ import_react6.default.createElement("p", null, c.goal), /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-meta" }, /* @__PURE__ */ import_react6.default.createElement("span", null, c.postsPerWeek, " posts / week"), /* @__PURE__ */ import_react6.default.createElement("span", null, c.style || "Company visual direction"))), /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-row-actions" }, /* @__PURE__ */ import_react6.default.createElement(Button, { onClick: () => setDialog({ type: "campaign", record: c }) }, "Edit brief"), c.status === "active" ? /* @__PURE__ */ import_react6.default.createElement(Button, { disabled: busy, onClick: () => run(() => command("campaign.status", { id: c.id, status: "paused" })) }, "Pause") : /* @__PURE__ */ import_react6.default.createElement(Button, { disabled: busy, onClick: () => run(async () => {
      await command("campaign.status", { id: c.id, status: "active" });
      setNotice("Campaign active. Plan the current week when you\u2019re ready; no missed weeks will be generated.");
    }) }, "Activate"), /* @__PURE__ */ import_react6.default.createElement(Button, { disabled: busy || c.status !== "active", onClick: () => setDialog({ type: "plan", campaign: c }) }, "Plan week")))))) : tab === "Create" ? /* @__PURE__ */ import_react6.default.createElement(import_react6.default.Fragment, null, currentPost ? /* @__PURE__ */ import_react6.default.createElement(Editor, { key: currentPost.id + historyId, initialDesignId: historyId, post: currentPost, company, campaign: campaigns.find((c) => c.id === currentPost.campaignId), state, status, command, api, getAsset, getFont, run, busy, onGenerate: (id) => setDialog({ type: "generate", ids: [id] }), onSetup: () => setDialog({ type: "settings" }), onBack: () => setTab("Home"), onError: setError, onFontsImported: (v) => acceptState(v.state) }) : /* @__PURE__ */ import_react6.default.createElement(import_react6.default.Fragment, null, /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-page-head" }, /* @__PURE__ */ import_react6.default.createElement("div", null, /* @__PURE__ */ import_react6.default.createElement("h1", null, "What will you create?"), /* @__PURE__ */ import_react6.default.createElement("p", null, "Open a planned post, or make something outside a campaign.")), /* @__PURE__ */ import_react6.default.createElement(Button, { primary: true, onClick: createOneOff, icon: "plus", disabled: busy }, "One-off design")), /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-post-list" }, allPosts.filter((p) => !["exported", "posted", "archived"].includes(p.status)).slice(-20).map((p) => /* @__PURE__ */ import_react6.default.createElement(PostRow, { key: p.id, post: p, campaign: campaigns.find((c) => c.id === p.campaignId), onOpen: () => openPost(p) }))))) : /* @__PURE__ */ import_react6.default.createElement(import_react6.default.Fragment, null, /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-page-head" }, /* @__PURE__ */ import_react6.default.createElement("div", null, /* @__PURE__ */ import_react6.default.createElement("h1", null, "Past designs"), /* @__PURE__ */ import_react6.default.createElement("p", null, "Your creative work, kept with the company it belongs to.")), /* @__PURE__ */ import_react6.default.createElement(Button, { onClick: createOneOff, disabled: busy }, "Create a design")), !state.designs.some((d) => d.companyId === companyId) ? /* @__PURE__ */ import_react6.default.createElement(Empty, { title: "Your first design belongs here", text: "Generated designs are saved automatically. Local layout previews are never passed off as AI results." }) : /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-gallery" }, state.designs.filter((d) => d.companyId === companyId).slice().reverse().map((d) => /* @__PURE__ */ import_react6.default.createElement(HistoryCard, { key: d.id, design: d, post: allPosts.find((p) => p.id === d.postId), company, getAsset, getFont, onOpen: () => {
      setHistoryId(d.id);
      setEditing(d.postId);
      setTab("Create");
    } })))), company && jobs.some((j) => j.status === "unknown") && /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-alert", role: "status" }, "A generation has an unknown outcome. It may have been billed. We will not retry it automatically.")), /* @__PURE__ */ import_react6.default.createElement("footer", { className: "bs-footer" }, /* @__PURE__ */ import_react6.default.createElement("span", null, "Plan first. Create with intention."), /* @__PURE__ */ import_react6.default.createElement("span", null, status?.credentialConfigured ? "Image connection configured" : "Image connection not set up", " \xB7 Nothing is published automatically")), dialog?.type === "company" && /* @__PURE__ */ import_react6.default.createElement(CompanyForm, { record: dialog.record, onClose: () => setDialog(null), busy, onSave: (data) => run(async () => {
      const r = await command("company.save", data);
      setDialog(null);
      switchCompany(r.id);
      const created = r.state?.companies.find((c) => c.id === r.id);
      if (created) setWeek(weekFor(created.timezone, created.weekStart));
    }) }), dialog?.type === "campaign" && /* @__PURE__ */ import_react6.default.createElement(CampaignForm, { record: dialog.record, companyId, busy, onClose: () => setDialog(null), onSave: (data) => run(async () => {
      await command("campaign.save", data);
      setDialog(null);
    }) }), dialog?.type === "plan" && /* @__PURE__ */ import_react6.default.createElement(PlanForm, { campaign: dialog.campaign, week, busy, onClose: () => setDialog(null), onSave: (focus) => run(async () => {
      await ensurePlan(dialog.campaign, focus);
      setCampaignFilter(dialog.campaign.id);
      setTab("This week");
      setDialog(null);
    }) }), dialog?.type === "settings" && /* @__PURE__ */ import_react6.default.createElement(Setup, { status, busy, onModelCheck: () => run(async () => {
      await api("models.check");
      await refresh();
    }), onModelSave: (model) => run(async () => {
      await command("settings.save", { model });
      await refresh();
      setDialog(null);
      setNotice(`Image model changed to ${model}. No image was generated.`);
    }), onClose: () => setDialog(null), onSave: (key) => run(async () => {
      await api("credential.save", { key });
      await refresh();
      setDialog(null);
      setNotice("Image key saved through Harness credentials. It is never included in your briefs.");
    }) }), dialog?.type === "generate" && /* @__PURE__ */ import_react6.default.createElement(Modal, { title: `Create ${dialog.ids.length} design${dialog.ids.length === 1 ? "" : "s"}?`, onClose: () => setDialog(null) }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-dialog-body" }, /* @__PURE__ */ import_react6.default.createElement("p", null, "This sends the selected briefs to OpenAI to generate background images. Original product and logo assets are placed locally; they are not sent to OpenAI in this first edition."), /* @__PURE__ */ import_react6.default.createElement("ul", null, dialog.ids.map((id) => {
      const p = state.posts.find((p2) => p2.id === id);
      return /* @__PURE__ */ import_react6.default.createElement("li", { key: id }, p?.title || "Social post", " \xB7 1 image request");
    })), /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-callout" }, /* @__PURE__ */ import_react6.default.createElement("strong", null, "Paid image generation"), /* @__PURE__ */ import_react6.default.createElement("p", null, status?.model || "gpt-image-2.6-flare", " \xB7 ", dialog.ids.length, " requests \xB7 medium quality. Exact cost is unavailable here; OpenAI bills your API account. No automatic retries.")), !status?.credentialConfigured && /* @__PURE__ */ import_react6.default.createElement("p", { className: "bs-error-text" }, "Set up your image API key before generating."), /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-form-actions" }, /* @__PURE__ */ import_react6.default.createElement(Button, { onClick: () => setDialog(null) }, "Keep planning"), /* @__PURE__ */ import_react6.default.createElement(Button, { primary: true, disabled: busy || !status?.credentialConfigured, onClick: () => confirmGenerate(dialog.ids) }, busy ? "Submitting\u2026" : `Generate ${dialog.ids.length} design${dialog.ids.length === 1 ? "" : "s"}`)))));
  }
  ctx.effect(() => {
    const el = document.createElement("style");
    el.dataset.brandStudio = "true";
    el.textContent = studio_default;
    document.head.appendChild(el);
    return () => el.remove();
  });
  ctx.slots.inject("main", () => ctx.slots.register({ name: "main", key: "brand-studio" }, App));
  ctx.slots.inject("sidebar.panellist", () => ctx.slots.register({ name: "sidebar.panellist", id: "brand-studio", order: 30, label: "Brand Studio" }, () => /* @__PURE__ */ import_react6.default.createElement(StudioMark, { size: 20 })));
}
function Empty({ title: title2, text, action }) {
  return /* @__PURE__ */ import_react6.default.createElement("section", { className: "bs-empty" }, /* @__PURE__ */ import_react6.default.createElement(Icon, { name: "calendar", size: 28 }), /* @__PURE__ */ import_react6.default.createElement("h2", null, title2), /* @__PURE__ */ import_react6.default.createElement("p", null, text), action);
}
function PostRow({ post, campaign, job, selected, onSelect, onOpen }) {
  return /* @__PURE__ */ import_react6.default.createElement("article", { className: "bs-post-row" }, onSelect && /* @__PURE__ */ import_react6.default.createElement("input", { type: "checkbox", "aria-label": `Select ${post.title}`, checked: selected, onChange: onSelect, disabled: ["queued", "running", "unknown"].includes(job?.status) }), /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-format-mini", "aria-hidden": "true" }, /* @__PURE__ */ import_react6.default.createElement("span", { className: "shape " + post.format })), /* @__PURE__ */ import_react6.default.createElement("button", { className: "bs-post-open", onClick: onOpen }, /* @__PURE__ */ import_react6.default.createElement("strong", null, post.title || "Untitled post"), /* @__PURE__ */ import_react6.default.createElement("span", null, campaign?.name || "One-off design", " \xB7 ", FORMATS[post.format]?.label || "Portrait feed", post.intendedDate ? " \xB7 " + post.intendedDate : "")), /* @__PURE__ */ import_react6.default.createElement("span", { className: "bs-badge " + (job?.status || post.status) }, job ? nice(job.status) : nice(post.status)), /* @__PURE__ */ import_react6.default.createElement("button", { className: "bs-icon", "aria-label": `Open ${post.title}`, onClick: onOpen }, /* @__PURE__ */ import_react6.default.createElement(Icon, { name: "chevron" })));
}
function CompanyForm({ record, onClose, onSave, busy }) {
  const [d, setD] = (0, import_react6.useState)(() => record ? copy2(record) : { name: "", description: "", color: "#17694e", brandKit: { accent: "#171717", ink: "#171717", paper: "#f7f5ef" }, guidelines: "", timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, weekStart: 1 });
  const effectiveInk = d.brandKit?.ink ?? "#171717", effectivePaper = d.brandKit?.paper ?? "#f7f5ef";
  const colours = [["Primary colour", d.color || "#17694e", (value) => setD({ ...d, color: value })], ["Accent colour", d.brandKit?.accent ?? effectiveInk, (value) => setD({ ...d, brandKit: { ...d.brandKit, accent: value } })], ["Brand ink", effectiveInk, (value) => setD({ ...d, brandKit: { ...d.brandKit, ink: value } })], ["Brand paper", effectivePaper, (value) => setD({ ...d, brandKit: { ...d.brandKit, paper: value } })]];
  return /* @__PURE__ */ import_react6.default.createElement(Modal, { title: record ? "Company guidelines" : "Tell us about your company", onClose }, /* @__PURE__ */ import_react6.default.createElement("form", { className: "bs-dialog-body", onSubmit: (e) => {
    e.preventDefault();
    onSave(d);
  } }, /* @__PURE__ */ import_react6.default.createElement(Field, { label: "Company name" }, /* @__PURE__ */ import_react6.default.createElement("input", { required: true, maxLength: 160, value: d.name, onChange: (e) => setD({ ...d, name: e.target.value }) })), /* @__PURE__ */ import_react6.default.createElement(Field, { label: "What do you sell or do?", hint: "A sentence or two is enough to start." }, /* @__PURE__ */ import_react6.default.createElement("textarea", { required: true, rows: 3, maxLength: 2e3, placeholder: "We make fresh bread and pastries for our neighbourhood.", value: d.description, onChange: (e) => setD({ ...d, description: e.target.value }) })), /* @__PURE__ */ import_react6.default.createElement("fieldset", { className: "bs-brand-colours" }, /* @__PURE__ */ import_react6.default.createElement("legend", null, "Brand colours"), /* @__PURE__ */ import_react6.default.createElement("p", { className: "bs-muted" }, "Your poster palette. Saved design versions keep their original colours."), /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-two-fields" }, colours.map(([label, value, onChange]) => /* @__PURE__ */ import_react6.default.createElement(Field, { key: label, label, className: "bs-colour-field" }, /* @__PURE__ */ import_react6.default.createElement("input", { type: "color", value, onChange: (e) => onChange(e.target.value) }), /* @__PURE__ */ import_react6.default.createElement("span", { className: "bs-colour-hex" }, value))))), /* @__PURE__ */ import_react6.default.createElement(CompanyLanguageControls, { Field, company: d, profile: d.compositionProfile ?? null, onChange: (profile) => setD({ ...d, compositionProfile: profile }), renderPreview: (profile, index) => languageExample(d, profile, index) }), /* @__PURE__ */ import_react6.default.createElement("details", null, /* @__PURE__ */ import_react6.default.createElement("summary", null, "Optional brand details"), /* @__PURE__ */ import_react6.default.createElement(Field, { label: "Poster typography", hint: "The default type style for new posters." }, /* @__PURE__ */ import_react6.default.createElement("select", { value: d.brandKit?.voice || "studio", onChange: (e) => setD({ ...d, brandKit: { ...d.brandKit, voice: e.target.value } }) }, VOICES2.map(([id, name]) => /* @__PURE__ */ import_react6.default.createElement("option", { key: id, value: id }, name)))), /* @__PURE__ */ import_react6.default.createElement(Field, { label: "Style and brand rules", hint: "Include what to avoid. These instructions follow this company\u2019s designs." }, /* @__PURE__ */ import_react6.default.createElement("textarea", { rows: 4, value: d.guidelines || "", onChange: (e) => setD({ ...d, guidelines: e.target.value }) }))), /* @__PURE__ */ import_react6.default.createElement(Field, { label: "Planning time zone", hint: "Suggested from this browser. Confirm or change it for this company." }, /* @__PURE__ */ import_react6.default.createElement("input", { required: true, value: d.timezone, onChange: (e) => setD({ ...d, timezone: e.target.value }) })), /* @__PURE__ */ import_react6.default.createElement(Field, { label: "Week starts on" }, /* @__PURE__ */ import_react6.default.createElement("select", { value: d.weekStart ?? 1, onChange: (e) => setD({ ...d, weekStart: Number(e.target.value) }) }, /* @__PURE__ */ import_react6.default.createElement("option", { value: 1 }, "Monday"), /* @__PURE__ */ import_react6.default.createElement("option", { value: 0 }, "Sunday"))), /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-form-actions" }, /* @__PURE__ */ import_react6.default.createElement(Button, { type: "button", onClick: onClose }, "Cancel"), /* @__PURE__ */ import_react6.default.createElement(Button, { primary: true, disabled: busy }, busy ? "Saving\u2026" : record ? "Save guidelines" : "Create company"))));
}
function CampaignForm({ record, companyId, onClose, onSave, busy }) {
  const [d, setD] = (0, import_react6.useState)(record || { companyId, name: "", goal: "", audience: "", offer: "", offerExpiry: "", cta: "", style: "", postsPerWeek: 2, status: "active" });
  return /* @__PURE__ */ import_react6.default.createElement(Modal, { title: record ? "Edit campaign brief" : "Give your campaign a clear goal", onClose }, /* @__PURE__ */ import_react6.default.createElement("form", { className: "bs-dialog-body", onSubmit: (e) => {
    e.preventDefault();
    onSave(d);
  } }, /* @__PURE__ */ import_react6.default.createElement(Field, { label: "Campaign name" }, /* @__PURE__ */ import_react6.default.createElement("input", { required: true, maxLength: 160, placeholder: "Weekend favourites", value: d.name, onChange: (e) => setD({ ...d, name: e.target.value }) })), /* @__PURE__ */ import_react6.default.createElement(Field, { label: "What should this campaign achieve?" }, /* @__PURE__ */ import_react6.default.createElement("textarea", { required: true, rows: 2, placeholder: "Bring more local customers into the shop on weekends.", value: d.goal, onChange: (e) => setD({ ...d, goal: e.target.value }) })), /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-two-fields" }, /* @__PURE__ */ import_react6.default.createElement(Field, { label: "Posts per week" }, /* @__PURE__ */ import_react6.default.createElement("select", { value: d.postsPerWeek, onChange: (e) => setD({ ...d, postsPerWeek: Number(e.target.value) }) }, [1, 2, 3, 4, 5, 6, 7].map((n) => /* @__PURE__ */ import_react6.default.createElement("option", { key: n, value: n }, n, " post", n === 1 ? "" : "s")))), /* @__PURE__ */ import_react6.default.createElement(Field, { label: "Campaign status" }, /* @__PURE__ */ import_react6.default.createElement("select", { value: d.status, onChange: (e) => setD({ ...d, status: e.target.value }) }, ["draft", "active", "paused", "completed", "archived"].map((s) => /* @__PURE__ */ import_react6.default.createElement("option", { key: s, value: s }, nice(s)))))), /* @__PURE__ */ import_react6.default.createElement("details", { open: !!record }, /* @__PURE__ */ import_react6.default.createElement("summary", null, "Audience, offer, and creative direction"), /* @__PURE__ */ import_react6.default.createElement(Field, { label: "Who is it for? (optional)" }, /* @__PURE__ */ import_react6.default.createElement("input", { value: d.audience || "", onChange: (e) => setD({ ...d, audience: e.target.value }) })), /* @__PURE__ */ import_react6.default.createElement(Field, { label: "Exact offer details (optional)", hint: "We won\u2019t invent a price or discount." }, /* @__PURE__ */ import_react6.default.createElement("textarea", { rows: 2, value: d.offer || "", onChange: (e) => setD({ ...d, offer: e.target.value }) })), /* @__PURE__ */ import_react6.default.createElement(Field, { label: "Offer valid through (optional)" }, /* @__PURE__ */ import_react6.default.createElement("input", { type: "date", value: d.offerExpiry || "", onChange: (e) => setD({ ...d, offerExpiry: e.target.value }) })), /* @__PURE__ */ import_react6.default.createElement(Field, { label: "What should people do next? (optional)" }, /* @__PURE__ */ import_react6.default.createElement("input", { placeholder: "Visit our shop", value: d.cta || "", onChange: (e) => setD({ ...d, cta: e.target.value }) })), /* @__PURE__ */ import_react6.default.createElement(Field, { label: "Campaign look (optional)", hint: "Adds to company guidelines, without changing other campaigns." }, /* @__PURE__ */ import_react6.default.createElement("textarea", { rows: 2, placeholder: "Natural daylight, simple product scenes, generous space for our headline.", value: d.style || "", onChange: (e) => setD({ ...d, style: e.target.value }) }))), /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-form-actions" }, /* @__PURE__ */ import_react6.default.createElement(Button, { type: "button", onClick: onClose }, "Cancel"), /* @__PURE__ */ import_react6.default.createElement(Button, { primary: true, disabled: busy }, busy ? "Saving\u2026" : record ? "Save campaign" : "Create campaign"))));
}
function PlanForm({ campaign, week, onClose, onSave, busy }) {
  const [focus, setFocus] = (0, import_react6.useState)("");
  return /* @__PURE__ */ import_react6.default.createElement(Modal, { title: "What changed this week?", onClose }, /* @__PURE__ */ import_react6.default.createElement("form", { className: "bs-dialog-body", onSubmit: (e) => {
    e.preventDefault();
    onSave(focus);
  } }, /* @__PURE__ */ import_react6.default.createElement("p", null, /* @__PURE__ */ import_react6.default.createElement("strong", null, campaign.name), /* @__PURE__ */ import_react6.default.createElement("br", null), "Week of ", dateLabel(week), " \xB7 ", campaign.postsPerWeek, " planned posts"), /* @__PURE__ */ import_react6.default.createElement(Field, { label: "This week\u2019s focus (optional)", hint: "Keep the campaign brief, or add what is new this week." }, /* @__PURE__ */ import_react6.default.createElement("textarea", { rows: 3, placeholder: "A new product, a different focus, or details to confirm\u2026", value: focus, onChange: (e) => setFocus(e.target.value) })), /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-callout" }, "Planning creates editable post slots. It does not generate paid images or publish anything."), /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-form-actions" }, /* @__PURE__ */ import_react6.default.createElement(Button, { type: "button", onClick: onClose }, "Cancel"), /* @__PURE__ */ import_react6.default.createElement(Button, { primary: true, disabled: busy }, busy ? "Planning\u2026" : "Plan this week"))));
}
function Setup({ status, onSave, onClose, onModelCheck, onModelSave, busy }) {
  const [key, setKey] = (0, import_react6.useState)(""), [model, setModel] = (0, import_react6.useState)(status?.model || "gpt-image-2.6-flare");
  return /* @__PURE__ */ import_react6.default.createElement(Modal, { title: "Connect image generation", onClose }, /* @__PURE__ */ import_react6.default.createElement("form", { className: "bs-dialog-body", onSubmit: (e) => {
    e.preventDefault();
    onSave(key);
    setKey("");
  } }, /* @__PURE__ */ import_react6.default.createElement("p", null, "Brand Studio uses OpenAI\u2019s Images API. Your chat subscription or chat sign-in does not necessarily include image API access."), /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-callout" }, /* @__PURE__ */ import_react6.default.createElement("strong", null, status?.credentialConfigured ? "An API key is configured" : "An image API key is needed"), /* @__PURE__ */ import_react6.default.createElement("p", null, "Model: ", status?.model || "gpt-image-2.6-flare", /* @__PURE__ */ import_react6.default.createElement("br", null), "Credential reference: ", status?.credentialRef || "BRAND_STUDIO_OPENAI_API_KEY")), /* @__PURE__ */ import_react6.default.createElement(Field, { label: "Image model", hint: "Choose an exact API identifier. Catalogue visibility does not guarantee image endpoint access or parameter compatibility." }, /* @__PURE__ */ import_react6.default.createElement("input", { list: "bs-image-models", value: model, onChange: (e) => setModel(e.target.value), placeholder: "Choose from the checked image models" }), /* @__PURE__ */ import_react6.default.createElement("datalist", { id: "bs-image-models" }, (status?.imageModels || []).map((id) => /* @__PURE__ */ import_react6.default.createElement("option", { key: id, value: id })))), /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-row-actions" }, /* @__PURE__ */ import_react6.default.createElement(Button, { type: "button", disabled: busy || !status?.credentialConfigured, onClick: onModelCheck }, "Check available models"), /* @__PURE__ */ import_react6.default.createElement(Button, { type: "button", primary: true, disabled: busy || !/^gpt-image-[A-Za-z0-9._-]{1,64}$/.test(model), onClick: () => onModelSave(model) }, "Save model")), /* @__PURE__ */ import_react6.default.createElement("p", { className: "bs-muted" }, "This check reads OpenAI\u2019s model catalogue. It does not generate an image or incur an image-generation charge."), status?.imageModels?.length > 0 && /* @__PURE__ */ import_react6.default.createElement("p", { className: "bs-callout" }, "Available image model IDs: ", status.imageModels.join(", "), status.currentAvailable === false ? " \xB7 The configured model is not listed." : ""), status?.error && /* @__PURE__ */ import_react6.default.createElement("p", { className: "bs-error-text" }, status.error), /* @__PURE__ */ import_react6.default.createElement("hr", null), /* @__PURE__ */ import_react6.default.createElement(Field, { label: "OpenAI API key", hint: "Saved through Harness\u2019s owner-only credential store\u2014not in your company data. Local credential storage is not an encrypted keychain." }, /* @__PURE__ */ import_react6.default.createElement("input", { type: "password", required: true, autoComplete: "off", value: key, onChange: (e) => setKey(e.target.value), placeholder: "Paste your API key" })), /* @__PURE__ */ import_react6.default.createElement("p", { className: "bs-muted" }, "Saving a key does not generate an image or incur an image-generation charge. Access and billing are checked when you explicitly generate."), /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-form-actions" }, /* @__PURE__ */ import_react6.default.createElement(Button, { type: "button", onClick: onClose }, "Close"), /* @__PURE__ */ import_react6.default.createElement(Button, { primary: true, disabled: busy || !key.trim() }, busy ? "Saving\u2026" : "Save API key"))));
}
function mergeFields(a, b) {
  const out = { ...a };
  for (const [k, v] of Object.entries(b)) out[k] = v?.mode === "auto" ? copy2(v) : v && typeof v === "object" ? mergeFields(a[k] || {}, v) : v;
  return out;
}
function changedFields(a, b) {
  const out = {};
  for (const [k, v] of Object.entries(b)) {
    if (v && typeof v === "object") {
      const d = changedFields(a?.[k] || {}, v);
      if (Object.keys(d).length) out[k] = d;
    } else if (v !== a?.[k]) out[k] = v;
  }
  return out;
}
function MetricInput({ value, onValue, ...props }) {
  const [text, setText] = (0, import_react6.useState)(value ?? "");
  (0, import_react6.useEffect)(() => setText(value ?? ""), [value]);
  return /* @__PURE__ */ import_react6.default.createElement("input", { ...props, type: "number", value: text, onChange: (e) => setText(e.target.value), onBlur: (e) => {
    if (e.target.validity.valid) {
      const next = text === "" ? null : +text;
      if (next !== (value ?? null)) onValue(next);
    } else setText(value ?? "");
  } });
}
var ROLE_NAMES = { headline: "Headline", body: "Body", cta: "CTA", kicker: "Kicker", brand: "Brand" };
function RoleTypography({ options, fonts, onChange }) {
  const [role, setRole] = (0, import_react6.useState)("headline"), style = options.typography[role], font2 = fonts.find((f) => f.id === style.fontId), bundled2 = options.compilerVersion === 4 ? getRoleBundledFont(options, role) : null, defaultWeight = bundled2?.defaultWeight ?? (role === "headline" ? 800 : role === "body" ? 400 : 600);
  const patch = (key, value) => onChange("typography", { ...options.typography, [role]: { ...style, [key]: value } });
  const ranges2 = { headline: [48, 260], body: [20, 84], cta: [20, 72], kicker: [18, 64], brand: [20, 64] };
  const weights = font2 ? [...new Set(font2.faces.filter((f) => f.style === "normal").map((f) => f.weight))].sort((a, b) => a - b) : Array.from({ length: 9 }, (_, i) => (i + 1) * 100).filter((w) => bundled2 ? w >= bundled2.range[0] && w <= bundled2.range[1] : role === "headline" ? options.voice === "impact" ? w === 800 : true : w >= 200 && (options.voice !== "clean" || w <= 800));
  return /* @__PURE__ */ import_react6.default.createElement("details", { className: "bs-control-group" }, /* @__PURE__ */ import_react6.default.createElement("summary", null, "Typography by role"), /* @__PURE__ */ import_react6.default.createElement("p", { className: "bs-muted bs-small" }, "Independent family, size and rhythm. Blank values inherit the pairing and arrangement; imported weights must exist in the cached family."), /* @__PURE__ */ import_react6.default.createElement(Field, { label: "Text role" }, /* @__PURE__ */ import_react6.default.createElement("select", { value: role, onChange: (e) => setRole(e.target.value) }, Object.entries(ROLE_NAMES).map(([id, name]) => /* @__PURE__ */ import_react6.default.createElement("option", { key: id, value: id }, name)))), /* @__PURE__ */ import_react6.default.createElement(Field, { label: `${ROLE_NAMES[role]} font family` }, /* @__PURE__ */ import_react6.default.createElement("select", { value: style.fontId, onChange: (e) => onChange("typography", { ...options.typography, [role]: { ...style, fontId: e.target.value, weight: e.target.value ? fonts.find((f) => f.id === e.target.value).faces.filter((f) => f.style === "normal").map((f) => f.weight).sort((a, b) => Math.abs(a - defaultWeight) - Math.abs(b - defaultWeight))[0] : null } }) }, /* @__PURE__ */ import_react6.default.createElement("option", { value: "" }, "Inherit curated voice"), fonts.map((f) => /* @__PURE__ */ import_react6.default.createElement("option", { key: f.id, value: f.id }, f.family, " \xB7 cached")))), /* @__PURE__ */ import_react6.default.createElement(Field, { label: `${ROLE_NAMES[role]} weight` }, /* @__PURE__ */ import_react6.default.createElement("select", { value: style.weight ?? "", onChange: (e) => patch("weight", e.target.value === "" ? null : +e.target.value) }, !font2 || weights.includes(defaultWeight) ? /* @__PURE__ */ import_react6.default.createElement("option", { value: "" }, "Recipe default") : style.weight === null ? /* @__PURE__ */ import_react6.default.createElement("option", { value: "", disabled: true }, "Choose a supported weight") : null, style.weight && !weights.includes(style.weight) && /* @__PURE__ */ import_react6.default.createElement("option", { value: style.weight }, style.weight, " \xB7 unavailable"), weights.map((w) => /* @__PURE__ */ import_react6.default.createElement("option", { key: w, value: w }, w)))), /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-two-fields" }, /* @__PURE__ */ import_react6.default.createElement(Field, { label: `${ROLE_NAMES[role]} size`, hint: "1080-wide units; blank = recipe." }, /* @__PURE__ */ import_react6.default.createElement(MetricInput, { key: role + "size", min: ranges2[role][0], max: ranges2[role][1], step: "1", placeholder: "Recipe", value: style.size, onValue: (v) => patch("size", v) })), /* @__PURE__ */ import_react6.default.createElement(Field, { label: `${ROLE_NAMES[role]} leading` }, /* @__PURE__ */ import_react6.default.createElement(MetricInput, { key: role + "leading", min: "0.85", max: "2", step: "0.01", placeholder: "Recipe", value: style.lineHeight, onValue: (v) => patch("lineHeight", v) }))), /* @__PURE__ */ import_react6.default.createElement(Field, { label: `${ROLE_NAMES[role]} tracking`, hint: "Letter spacing in em." }, /* @__PURE__ */ import_react6.default.createElement(MetricInput, { key: role + "tracking", min: "-0.04", max: "0.2", step: "0.005", value: style.tracking, onValue: (v) => patch("tracking", v ?? 0) })));
}
function FontLibrary({ companyId, fonts, api, onImported, onError }) {
  const [catalog, setCatalog] = (0, import_react6.useState)(null), [search, setSearch] = (0, import_react6.useState)(""), [pending, setPending] = (0, import_react6.useState)("");
  async function load() {
    if (catalog) return;
    try {
      const r = await api("fonts.catalog");
      setCatalog(r.families);
    } catch (e) {
      onError(e.message);
    }
  }
  async function add(id) {
    setPending(id);
    try {
      const r = await api("fonts.import", { companyId, catalogId: id });
      onImported(r);
    } catch (e) {
      onError(e.message);
    } finally {
      setPending("");
    }
  }
  return /* @__PURE__ */ import_react6.default.createElement("details", { className: "bs-control-group", onToggle: (e) => {
    if (e.currentTarget.open) load();
  } }, /* @__PURE__ */ import_react6.default.createElement("summary", null, "Import a font family"), /* @__PURE__ */ import_react6.default.createElement("p", { className: "bs-muted bs-small" }, "Search a curated local Google Fonts catalogue, not the full live library. Import downloads licensed normal faces once and caches them locally. No image charge; draft words are not sent."), /* @__PURE__ */ import_react6.default.createElement(Field, { label: "Search font catalogue" }, /* @__PURE__ */ import_react6.default.createElement("input", { type: "search", value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Family or category" })), /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-font-list", "aria-live": "polite" }, catalog ? catalog.filter((f) => (f.family + " " + f.category).toLowerCase().includes(search.toLowerCase())).map((f) => {
    const cached = fonts.some((x) => x.catalogId === f.id);
    return /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-font-row", key: f.id }, /* @__PURE__ */ import_react6.default.createElement("div", null, /* @__PURE__ */ import_react6.default.createElement("strong", null, f.family), /* @__PURE__ */ import_react6.default.createElement("small", null, f.category, " \xB7 ", f.weights.join(" / "))), /* @__PURE__ */ import_react6.default.createElement(Button, { type: "button", disabled: !!pending || cached, onClick: () => add(f.id) }, cached ? "Cached" : pending === f.id ? "Importing\u2026" : "Import"));
  }) : /* @__PURE__ */ import_react6.default.createElement("p", null, "Loading local catalogue\u2026"), catalog && !catalog.some((f) => (f.family + " " + f.category).toLowerCase().includes(search.toLowerCase())) && /* @__PURE__ */ import_react6.default.createElement("p", null, "No matching family. Try another search or keep the bundled voice.")));
}
function PosterThumbnail({ company, post, design, backgroundId, logoId, productId, foregroundId, fonts = [], getAsset, getFont }) {
  const ref = (0, import_react6.useRef)(), [issue, setIssue] = (0, import_react6.useState)("");
  const key = JSON.stringify([company, post, design?.id, backgroundId, logoId, productId, foregroundId, fonts]);
  (0, import_react6.useEffect)(() => {
    let live = true;
    setIssue("");
    const target = document.createElement("canvas");
    Promise.all([getAsset(backgroundId), getAsset(logoId), getAsset(productId), getAsset(foregroundId)]).then(async ([background, logo, product, foreground]) => {
      const result = await compose(target, { company, post: post.poster?.version === 3 ? { ...post, logoAssetId: logoId || "", productAssetId: productId || "" } : post, design, background, logo, product, foreground, fonts, getFont });
      if (!live || !ref.current) return;
      ref.current.width = target.width;
      ref.current.height = target.height;
      ref.current.getContext("2d").drawImage(target, 0, 0);
      if (result.errors?.length) setIssue("Needs adjustment");
    }).catch(() => live && setIssue("Preview unavailable"));
    return () => {
      live = false;
    };
  }, [key]);
  return /* @__PURE__ */ import_react6.default.createElement(import_react6.default.Fragment, null, /* @__PURE__ */ import_react6.default.createElement("canvas", { ref, "aria-label": `${FORMATS[post.format]?.label || "Poster"} composition preview` }), issue && /* @__PURE__ */ import_react6.default.createElement("small", { className: "bs-thumb-issue" }, issue));
}
function Editor({ post, company, campaign, state, status, command, api, getAsset, getFont, run, busy, onGenerate, onSetup, onBack, onError, onFontsImported, initialDesignId = "" }) {
  const designs = state.designs.filter((d) => d.postId === post.id), latest = designs.at(-1);
  const [draft, setDraft] = (0, import_react6.useState)(() => ({ ...post, cropX: post.cropX ?? latest?.cropX ?? 0.5, backgroundAssetId: post.backgroundAssetId ?? (post.poster ? "" : latest?.assetId ?? ""), assetIds: post.assetIds || [] }));
  const [historyId, setHistoryId] = (0, import_react6.useState)(initialDesignId), [saveState, setSaveState] = (0, import_react6.useState)("Saved"), [savedKey, setSavedKey] = (0, import_react6.useState)(""), [issues, setIssues] = (0, import_react6.useState)({ errors: [], warnings: [] }), [rendering, setRendering] = (0, import_react6.useState)(true), [paintKey, setPaintKey] = (0, import_react6.useState)(""), [checked, setChecked] = (0, import_react6.useState)(false), [approval, setApproval] = (0, import_react6.useState)(null), [undo, setUndo] = (0, import_react6.useState)([]), [message, setMessage] = (0, import_react6.useState)(""), [prompt, setPrompt] = (0, import_react6.useState)(""), [auditions, setAuditions] = (0, import_react6.useState)(false), [formatScope, setFormatScope] = (0, import_react6.useState)(true), [action, setAction] = (0, import_react6.useState)(false), [inspector, setInspector] = (0, import_react6.useState)("Words"), [zoom, setZoom] = (0, import_react6.useState)("fit");
  const editorRef = (0, import_react6.useRef)(), previewRef = (0, import_react6.useRef)(), inspectorRef = (0, import_react6.useRef)(), reviewRef = (0, import_react6.useRef)();
  (0, import_react6.useEffect)(() => {
    const editor = editorRef.current, root = editor.closest(".bs");
    function fit() {
      const viewport = viewportFor(editor), top = editor.getBoundingClientRect().top / viewport.zoom;
      const height = Math.max(280, Math.floor(viewport.height - Math.max(top, 16) - 20));
      editor.style.setProperty("--bs-pane-height", height + "px");
      editor.classList.toggle("bs-compact-editor", height < 600 && root.clientWidth > 760);
    }
    fit();
    const observer = new ResizeObserver(fit);
    [root, root.querySelector(".bs-top"), root.querySelector(".bs-tabs"), root.querySelector(".bs-editor-head")].filter(Boolean).forEach((el) => observer.observe(el));
    const changes = new MutationObserver(fit);
    changes.observe(document.documentElement, { attributes: true, attributeFilter: ["style", "class"] });
    changes.observe(document.body, { attributes: true, attributeFilter: ["style", "class", "data-ds-dark-theme"] });
    window.addEventListener("resize", fit);
    window.visualViewport?.addEventListener("resize", fit);
    return () => {
      observer.disconnect();
      changes.disconnect();
      window.removeEventListener("resize", fit);
      window.visualViewport?.removeEventListener("resize", fit);
    };
  }, []);
  function jump(target) {
    const el = target === "Preview" ? previewRef.current : target === "Review" ? reviewRef.current : inspectorRef.current;
    if (el) {
      el.scrollIntoView({ block: "start", behavior: "instant" });
      el.focus({ preventScroll: true });
    }
  }
  const canvas = (0, import_react6.useRef)(), bitmap = (0, import_react6.useRef)(), generation = (0, import_react6.useRef)(0), mounted = (0, import_react6.useRef)(true), queue = (0, import_react6.useRef)(Promise.resolve()), dirty = (0, import_react6.useRef)(false), lastDraft = (0, import_react6.useRef)(draft), saved = (0, import_react6.useRef)(JSON.stringify(draft));
  lastDraft.current = draft;
  const history = designs.find((d) => d.id === historyId), frozen = !!history;
  const assets = state.assets.filter((a) => a.companyId === company.id), job = state.jobs.slice().reverse().find((j) => j.postId === post.id), working = ["queued", "running"].includes(job?.status);
  const viewCompany = history?.scene?.company || company, viewPost = history?.scene?.post || (history ? legacyScenePost(post, history) : draft), v2 = viewPost.poster?.version === 2, v3 = viewPost.poster?.version === 3, modern = v2 || v3;
  const flexible = v3 && viewPost.poster.compilerVersion === 3, templated = v3 && viewPost.poster.compilerVersion === 4;
  const [languagePreview, setLanguagePreview] = (0, import_react6.useState)(null);
  const effectivePoster = viewPost.poster ? resolvePoster(viewPost.poster, viewPost.format) : {}, editorial = modern && !templated && effectivePoster.recipe === "editorial", solidBackground = templated && effectivePoster.layers.background.mode === "solid";
  const options = effectivePoster;
  const backgroundId = history ? history.assetId : draft.backgroundAssetId;
  const legacyMismatch = !modern && !frozen && (!latest || !!latest.scene || backgroundId !== latest.assetId);
  const logoId = history ? history.logoAssetId : assets.find((a) => draft.assetIds.includes(a.id) && a.role === "logo")?.id || company.logoAssetId || "";
  const productId = history ? history.productAssetId : assets.find((a) => draft.assetIds.includes(a.id) && a.role === "product")?.id || "";
  const foregroundId = history ? history.foregroundAssetId || viewPost.foregroundAssetId : draft.foregroundAssetId;
  const fonts = history?.scene?.fonts || state.fonts?.filter((f) => f.companyId === company.id) || [];
  const unusedBackdrop = v2 && (editorial || effectivePoster.recipe === "showcase" || effectivePoster.recipe === "hero" && !!productId);
  const renderKey = JSON.stringify([companyPaintInputs(viewCompany), viewPost, backgroundId, logoId, productId, foregroundId, fonts, history?.id]);
  const draftKey = JSON.stringify(draft), unsaved = !frozen && draftKey !== (savedKey || saved.current), paintReady = !rendering && paintKey === renderKey && !issues.errors.length;
  const reviewed = !!approval && approval.key === renderKey && state.designs.some((d) => d.id === approval.id && d.reviewed);
  function change(next) {
    if (frozen || action) return;
    dirty.current = true;
    setUndo((u) => [...u.slice(-29), copy2(lastDraft.current)]);
    setDraft(next);
    setSaveState("Unsaved changes");
    setApproval(null);
    setMessage("");
  }
  function update(k, v) {
    change({ ...lastDraft.current, [k]: v });
  }
  function posterChange(k, v) {
    const p = lastDraft.current.poster, f = lastDraft.current.format;
    const scoped = v3 && formatScope && typeof v === "object" ? mergeFields(p.formats?.[f]?.[k] || {}, changedFields(effectivePoster[k], v)) : v;
    let next = normalizePoster(formatScope ? { ...p, formats: { ...p.formats, [f]: { ...p.formats?.[f], [k]: scoped } } } : { ...p, [k]: v });
    if (flexible && k === "motif" && !formatScope) {
      const keys3 = ["x", "y", "scale", "rotation"].filter((key) => p.motif[key] !== next.motif[key]);
      for (const format of Object.keys(FORMATS)) {
        const o = resolvePoster(p, format), anchor = motifPlacementForLayout(o.composition.layout, format, o.composition.density), partial = next.formats?.[format]?.motif;
        if (partial) {
          for (const key of keys3) if (partial[key] === anchor[key]) delete partial[key];
        }
      }
    }
    if (flexible && (k === "composition" || k === "motif" && v.id !== options.motif.id)) next = followMotifPlacement(p, next, formatScope ? [f] : Object.keys(FORMATS));
    update("poster", next);
  }
  function auditionPoster(p, format, variation) {
    return normalizePoster({ ...p, formats: { ...p.formats, [format]: { ...p.formats?.[format], variation } } });
  }
  function resetPoster() {
    const defaults2 = normalizePoster({ ...flexible ? DEFAULT_POSTER_FLEX : v3 ? DEFAULT_POSTER_V3 : DEFAULT_POSTER, ...!flexible && draft.poster?.compilerVersion === 2 ? { compilerVersion: 2 } : {}, recipe: options.recipe, voice: company.brandKit?.voice || "studio" });
    if (!formatScope) {
      update("poster", defaults2);
      return;
    }
    const { version, compilerVersion, ...partial } = defaults2;
    update("poster", normalizePoster({ ...draft.poster, formats: { ...draft.poster.formats, [draft.format]: partial } }));
  }
  function save(value = lastDraft.current) {
    const key = JSON.stringify(value);
    const task = queue.current.catch(() => {
    }).then(async () => {
      if (mounted.current) setSaveState("Saving\u2026");
      const result = await command("post.save", value);
      const row = result.state?.posts.find((p) => p.id === post.id);
      const canonical = { ...value, ...Object.fromEntries(["headline", "body", "cta", "brief", "title", "poster", "assetIds", "backgroundAssetId", "foregroundAssetId"].filter((k) => row && Object.hasOwn(row, k)).map((k) => [k, row[k]])) };
      const canonicalKey = JSON.stringify(canonical);
      saved.current = canonicalKey;
      if (mounted.current) {
        setSavedKey(canonicalKey);
        if (JSON.stringify(lastDraft.current) === key) {
          lastDraft.current = canonical;
          if (canonicalKey !== key) setDraft(canonical);
          setSaveState("Saved");
        } else setSaveState("Unsaved changes");
      }
      return result;
    }).catch((e) => {
      if (mounted.current) setSaveState("Not saved");
      throw e;
    });
    queue.current = task;
    return task;
  }
  (0, import_react6.useEffect)(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      if (dirty.current && JSON.stringify(lastDraft.current) !== saved.current) save(lastDraft.current).catch((e) => onError(e.message));
    };
  }, []);
  (0, import_react6.useEffect)(() => {
    if (!dirty.current) return;
    if (JSON.stringify(draft) === saved.current) {
      setSaveState("Saved");
      return;
    }
    const t = setTimeout(() => save(draft).catch((e) => onError(e.message)), 900);
    return () => clearTimeout(t);
  }, [draft]);
  (0, import_react6.useEffect)(() => {
    const token = ++generation.current;
    setRendering(true);
    setChecked(false);
    setIssues({ errors: [], warnings: [] });
    const target = document.createElement("canvas");
    Promise.all([getAsset(backgroundId), getAsset(logoId), getAsset(productId), getAsset(foregroundId)]).then(async ([background, logo, product, foreground]) => {
      const result = await compose(target, { company: viewCompany, post: v3 ? { ...viewPost, logoAssetId: logoId || "", productAssetId: productId || "" } : viewPost, design: history || (!modern ? latest : void 0), background, logo, product, foreground, fonts, getFont });
      if (token !== generation.current || !mounted.current || !canvas.current) return;
      canvas.current.width = target.width;
      canvas.current.height = target.height;
      canvas.current.getContext("2d").drawImage(target, 0, 0);
      bitmap.current = { canvas: target, key: renderKey, manifest: result.manifest };
      setIssues({ errors: result.errors || [], warnings: result.warnings || [] });
      setPaintKey(renderKey);
    }).catch((e) => {
      if (token === generation.current && mounted.current) setIssues({ errors: [e.message], warnings: [] });
    }).finally(() => {
      if (token === generation.current && mounted.current) setRendering(false);
    });
    return () => {
      generation.current++;
    };
  }, [renderKey]);
  async function upload(file, role, activate = false) {
    if (!file) return;
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      onError("Choose a PNG, JPEG, or WebP image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      onError("Choose an image smaller than 5 MB.");
      return;
    }
    await run(async () => {
      const dataUrl = await new Promise((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(r.result);
        r.onerror = () => reject(new Error("The file could not be read."));
        r.readAsDataURL(file);
      });
      const result = await command("asset.save", { companyId: company.id, name: file.name, role, dataUrl });
      if (role === "backdrop" || role === "foreground") {
        if (activate) selectLookImage(role === "backdrop" ? "background" : "foreground", result.assetId);
        else update(role === "backdrop" ? "backgroundAssetId" : "foregroundAssetId", result.assetId);
        return;
      }
      const ids = lastDraft.current.assetIds.filter((id) => assets.find((a) => a.id === id)?.role !== role);
      update("assetIds", [...ids, result.assetId]);
    });
  }
  async function localAction(fn) {
    setAction(true);
    try {
      await run(fn);
    } finally {
      if (mounted.current) setAction(false);
    }
  }
  function assertPaint(key) {
    if (!bitmap.current || bitmap.current.key !== key || generation.current !== renderToken.current) throw new Error("The composition changed. Wait for the new preview, then review it again.");
  }
  const renderToken = (0, import_react6.useRef)();
  if (paintKey === renderKey && !rendering) renderToken.current = generation.current;
  async function review() {
    if (!paintReady || unsaved || !checked || frozen || legacyMismatch) return;
    const key = renderKey, current = copy2(draft);
    await localAction(async () => {
      assertPaint(key);
      let id, receipt, blob;
      if (v3) {
        const target = bitmap.current;
        blob = await new Promise((resolve, reject) => target.canvas.toBlob((b) => b ? resolve(b) : reject(new Error("PNG capture failed. Try reviewing again.")), "image/png"));
        assertPaint(key);
        const bytes = await blob.arrayBuffer();
        receipt = { manifest: copy2(target.manifest), pngSha256: Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", bytes)), (v) => v.toString(16).padStart(2, "0")).join("") };
        assertPaint(key);
      }
      if (modern) {
        const r = await command("design.snapshot", { postId: post.id, ...receipt ? { renderReceipt: receipt } : {}, foregroundAssetId: foregroundId || "", assetId: backgroundId || "", logoAssetId: logoId || "", productAssetId: productId || "", format: current.format, poster: current.poster, headline: current.headline || "", body: current.body || "", cta: current.cta || "" });
        id = r.metadata?.id || r.id;
        if (!id) throw new Error("The design version could not be identified. Save a new version and try again.");
      } else {
        if (!latest) throw new Error("Generate an image first, or create an editable v3 copy for local composition.");
        id = latest.id;
        await command("design.save", { id, headline: current.headline, body: current.body, cta: current.cta, format: current.format, direction: current.direction, cropX: current.cropX ?? 0.5, logoAssetId: logoId || "", productAssetId: productId || "" });
      }
      assertPaint(key);
      await command("design.review", { id, reviewed: true });
      assertPaint(key);
      setApproval({ id, key, blob, pngSha256: receipt?.pngSha256 });
      setMessage("This exact version is reviewed. Later edits need a new review.");
    });
  }
  async function exportDesign() {
    if (!reviewed || !paintReady || unsaved || frozen || legacyMismatch) return;
    const key = renderKey, id = approval.id, target = bitmap.current.canvas;
    await localAction(async () => {
      assertPaint(key);
      await command("post.status", { id: post.id, status: "exported", designId: id, ...approval.pngSha256 ? { pngSha256: approval.pngSha256 } : {} });
      assertPaint(key);
      const name = `${company.name}-${campaign?.name || "one-off"}-${draft.title}-${draft.format}`;
      if (approval.blob) {
        const url = URL.createObjectURL(approval.blob), a = document.createElement("a");
        a.href = url;
        a.download = name.replace(/[^a-z0-9_-]+/gi, "-") + ".png";
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 1e3);
      } else downloadCanvas(target, name);
      setMessage("PNG download requested from the reviewed bitmap. Check your browser downloads.");
    });
  }
  function copyHistory() {
    if (!history || action) return;
    const next = { ...lastDraft.current, headline: viewPost.headline || "", body: viewPost.body || "", cta: viewPost.cta || "", format: viewPost.format, backgroundAssetId: history.assetId || "", assetIds: [history.logoAssetId, history.productAssetId].filter(Boolean), foregroundAssetId: history.foregroundAssetId || viewPost.foregroundAssetId || "", poster: editablePosterCopy(viewPost.poster || campaign?.artDirection || { ...DEFAULT_POSTER, voice: company.brandKit?.voice || "studio" }) };
    dirty.current = true;
    setUndo((u) => lastDraft.current.poster ? [...u.slice(-29), copy2(lastDraft.current)] : []);
    setDraft(next);
    setHistoryId("");
    setApproval(null);
    setSaveState("Unsaved changes");
    setMessage("Crisp editable copy started from this saved version. Current company brand settings apply; inspect and review it anew.");
  }
  function upgrade() {
    change({ ...lastDraft.current, poster: upgradePoster(lastDraft.current.poster || campaign?.artDirection || { ...DEFAULT_POSTER, voice: company.brandKit?.voice || "studio" }) });
    setUndo([]);
    setMessage("Crisp editable copy started. Legacy design versions remain unchanged.");
  }
  function previewCompanyLanguage() {
    const p = lastDraft.current.poster, f = lastDraft.current.format, applied = applyCompositionProfile(upgradePosterFlexible(p), company.compositionProfile, 0), resolved = resolvePoster(applied, f);
    const next = formatScope ? { ...p, formats: { ...p.formats, [f]: { ...p.formats?.[f], composition: resolved.composition, motif: resolved.motif, cta: resolved.cta } } } : applied;
    setLanguagePreview({ poster: normalizePoster(next), scope: formatScope ? "this format" : "all formats" });
  }
  function useFlexibleTools() {
    change({ ...lastDraft.current, poster: upgradePosterFlexible(lastDraft.current.poster || campaign?.artDirection || { ...DEFAULT_POSTER, voice: company.brandKit?.voice || "studio" }) });
    setMessage("New design tools enabled for this editable draft. Saved versions stay unchanged; inspect and review this composition anew.");
  }
  function compareLayouts() {
    setAuditions(true);
    const details = previewRef.current?.querySelector(".bs-preview-extras");
    if (details) {
      details.open = true;
      details.scrollIntoView({ block: "nearest" });
    }
  }
  function layoutAudition(p, format, layout2) {
    const next = normalizePoster({ ...p, formats: { ...p.formats, [format]: { ...p.formats?.[format], composition: { ...p.formats?.[format]?.composition, layout: layout2 } } } });
    return followMotifPlacement(p, next, [format]);
  }
  function fitMotifToArrangement() {
    const p = lastDraft.current.poster, next = copy2(p), formats3 = formatScope ? [lastDraft.current.format] : Object.keys(FORMATS);
    if (!formatScope) next.motif = { ...next.motif, ...motifPlacementForLayout(p.composition.layout, "square", p.composition.density) };
    for (const f of formats3) {
      const o = resolvePoster(p, f);
      next.formats = { ...next.formats, [f]: { ...next.formats?.[f], motif: { ...next.formats?.[f]?.motif, ...motifPlacementForLayout(o.composition.layout, f, o.composition.density) } } };
    }
    update("poster", normalizePoster(next));
  }
  function chooseTemplate(id) {
    update("poster", applyTemplate(lastDraft.current.poster || { version: 3, voice: company.brandKit?.voice || "studio" }, id, lastDraft.current.format, false, !!lastDraft.current.backgroundAssetId));
    setMessage("Arrangement applied to this format. Image sources, opacity, words and colours are preserved; subject placement follows the new layout. Inspect and review again.");
  }
  function chooseFontPairing(id) {
    const current = lastDraft.current, p = current.poster, f = current.format;
    let next;
    if (p.compilerVersion === 4) next = applyFontPairing(p, id, f);
    else {
      const o = resolvePoster(p, f), typography = Object.fromEntries(Object.entries(o.typography).map(([role, style]) => [role, { ...style, fontId: "", weight: null }]));
      next = normalizePoster({ ...p, formats: { ...p.formats, [f]: { ...p.formats?.[f], voice: id, typography } } });
    }
    update("poster", next);
    setMessage("Font pairing applied to this format. Size, spacing, colours and images are preserved. Inspect and review again.");
  }
  function applyLookEverywhere() {
    const p = lastDraft.current.poster;
    if (p?.compilerVersion === 4) update("poster", applyTemplateLookToFormats(p, lastDraft.current.format));
    else {
      const o = resolvePoster(p, lastDraft.current.format), { version, compilerVersion, formats: formats3, ...appearance } = o;
      update("poster", normalizePoster({ ...p, ...appearance, formats: {} }));
    }
    setMessage("This look now applies across formats. Image selections and words are unchanged; inspect each size.");
  }
  function selectLookImage(role, id) {
    const current = lastDraft.current;
    if (role === "product") {
      const ids = current.assetIds.filter((key) => assets.find((a) => a.id === key)?.role !== "product");
      change({ ...current, assetIds: id ? [...ids, id] : ids });
      return;
    }
    const next = { ...current, [role === "background" ? "backgroundAssetId" : "foregroundAssetId"]: id };
    if (role === "background" && id && current.poster?.version === 3) {
      const p = current.poster, f = current.format, o = resolvePoster(p, f);
      if (p.compilerVersion === 4) next.poster = normalizePoster({ ...p, formats: { ...p.formats, [f]: { ...p.formats?.[f], layers: { ...p.formats?.[f]?.layers, background: { ...p.formats?.[f]?.layers?.background, mode: "image" } } } } });
      else if (o.recipe === "editorial") next.poster = normalizePoster({ ...p, formats: { ...p.formats, [f]: { ...p.formats?.[f], recipe: "hero" } } });
    }
    change(next);
  }
  function applyCampaignLook() {
    const look = normalizePoster(campaign.artDirection);
    if (flexible || look.compilerVersion === 3) {
      update("poster", upgradePosterFlexible(look));
      return;
    }
    if (!v3) {
      update("poster", look);
      return;
    }
    const { compilerVersion, ...classic } = upgradePoster(look);
    update("poster", normalizePoster({ ...classic, ...draft.poster.compilerVersion === 2 ? { compilerVersion: 2 } : {} }));
  }
  const unavailable = busy || action;
  return /* @__PURE__ */ import_react6.default.createElement(import_react6.default.Fragment, null, /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-editor-head" }, /* @__PURE__ */ import_react6.default.createElement("button", { className: "bs-text-button", onClick: onBack }, /* @__PURE__ */ import_react6.default.createElement(Icon, { name: "back" }), "Back to Home"), /* @__PURE__ */ import_react6.default.createElement("span", { className: "bs-muted" }, company.name, " / ", campaign?.name || "One-off design", " / ", post.title)), frozen && /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-history-notice", role: "status" }, /* @__PURE__ */ import_react6.default.createElement("div", null, /* @__PURE__ */ import_react6.default.createElement("strong", null, "Saved version \xB7 read only"), /* @__PURE__ */ import_react6.default.createElement("p", null, history.scene ? "Brand, copy, assets, and layout are frozen to this version." : "Legacy version: original brand settings were not captured.", " Return to the draft to edit, review, or export a new version.")), /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-row-actions" }, /* @__PURE__ */ import_react6.default.createElement(Button, { onClick: () => setHistoryId("") }, "Return to editable draft"), /* @__PURE__ */ import_react6.default.createElement(Button, { onClick: copyHistory }, flexible ? "Create editable copy" : "Create crisp editable copy"))), /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-editor-jumps", "aria-label": "Editor shortcuts" }, /* @__PURE__ */ import_react6.default.createElement("button", { type: "button", onClick: () => jump("Preview") }, /* @__PURE__ */ import_react6.default.createElement(Icon, { name: "image" }), "Preview"), /* @__PURE__ */ import_react6.default.createElement("button", { type: "button", onClick: () => jump("Edit") }, /* @__PURE__ */ import_react6.default.createElement(Icon, { name: "edit" }), "Edit"), /* @__PURE__ */ import_react6.default.createElement("button", { type: "button", onClick: () => jump("Review") }, /* @__PURE__ */ import_react6.default.createElement(Icon, { name: "check" }), "Review")), /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-editor", ref: editorRef }, /* @__PURE__ */ import_react6.default.createElement("section", { className: "bs-preview", "aria-label": "Poster preview and review", ref: previewRef, tabIndex: -1 }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-preview-working" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-preview-toolbar" }, /* @__PURE__ */ import_react6.default.createElement(Field, { label: "Output format" }, /* @__PURE__ */ import_react6.default.createElement("select", { disabled: frozen || action, value: viewPost.format, onChange: (e) => update("format", e.target.value) }, Object.entries(FORMATS).map(([id, f]) => /* @__PURE__ */ import_react6.default.createElement("option", { key: id, value: id }, f.label, " \xB7 ", f.w, " \xD7 ", f.h)))), /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-zoom", role: "group", "aria-label": "Preview magnification" }, /* @__PURE__ */ import_react6.default.createElement("button", { type: "button", "aria-pressed": zoom === "fit", onClick: () => setZoom("fit") }, "Fit"), /* @__PURE__ */ import_react6.default.createElement("button", { type: "button", "aria-pressed": zoom === "native", onClick: () => setZoom("native") }, "100%"))), /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-canvas-stage " + (zoom === "native" ? "bs-native-stage" : ""), "aria-busy": rendering, tabIndex: 0, "aria-label": zoom === "native" ? "Native-size preview. Scroll horizontally and vertically to inspect." : "Fit preview" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-canvas-content", style: zoom === "native" ? { width: FORMATS[viewPost.format]?.w + 48, height: FORMATS[viewPost.format]?.h + 48 } : void 0 }, /* @__PURE__ */ import_react6.default.createElement("canvas", { ref: canvas, style: zoom === "native" ? { width: FORMATS[viewPost.format]?.w, height: FORMATS[viewPost.format]?.h } : void 0, "aria-label": `${viewPost.headline || viewPost.title}. ${viewPost.body || ""} ${viewPost.cta || ""}` })), rendering && /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-render-status", role: "status" }, "Composing your poster\u2026")), /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-stage-caption" }, /* @__PURE__ */ import_react6.default.createElement("span", null, FORMATS[viewPost.format]?.w, " \xD7 ", FORMATS[viewPost.format]?.h, " px"), /* @__PURE__ */ import_react6.default.createElement("span", null, zoom === "native" ? "100% \xB7 pan to inspect edges" : "Fit to preview \xB7 full-resolution PNG")), frozen ? /* @__PURE__ */ import_react6.default.createElement("p", { className: "bs-review" }, history.reviewed ? "Reviewed saved version." : "Unreviewed saved version.", " Historical review does not approve the current editable draft.") : /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-review", ref: reviewRef, tabIndex: -1 }, /* @__PURE__ */ import_react6.default.createElement("h2", null, reviewed ? "This version is reviewed" : "Review this exact composition"), /* @__PURE__ */ import_react6.default.createElement("p", null, "Check wording, offers, assets and readability. Review applies to this exact format."), /* @__PURE__ */ import_react6.default.createElement("label", { className: "bs-review-check" }, /* @__PURE__ */ import_react6.default.createElement("input", { type: "checkbox", disabled: !paintReady || action || unsaved, checked, onChange: (e) => setChecked(e.target.checked) }), /* @__PURE__ */ import_react6.default.createElement("span", null, "I\u2019ve inspected this format and confirmed the content and assets.")), /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-row-actions" }, /* @__PURE__ */ import_react6.default.createElement(Button, { disabled: unavailable || !paintReady || unsaved || !checked || reviewed || legacyMismatch, onClick: review }, action ? "Working\u2026" : reviewed ? "Version reviewed" : "Save & review this version"), /* @__PURE__ */ import_react6.default.createElement(Button, { primary: true, icon: "download", disabled: unavailable || !paintReady || unsaved || !reviewed || legacyMismatch, onClick: exportDesign }, "Export reviewed PNG")), unsaved && /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-local-actions" }, /* @__PURE__ */ import_react6.default.createElement("small", null, "Changes must be saved before review or export."), /* @__PURE__ */ import_react6.default.createElement(Button, { disabled: unavailable, onClick: () => localAction(() => save()) }, "Save changes")), !reviewed && !unsaved && /* @__PURE__ */ import_react6.default.createElement("small", null, "Any edit\u2014including a format or brand change\u2014requires a new review."))), v3 && /* @__PURE__ */ import_react6.default.createElement("details", { className: "bs-receipt-details" }, /* @__PURE__ */ import_react6.default.createElement("summary", null, "How this PNG is saved"), /* @__PURE__ */ import_react6.default.createElement("p", null, "Review captures these PNG bytes and a client-computed SHA-256 receipt. Export downloads that capture; the server does not retain or verify the PNG. Technical checks do not certify factual accuracy, aesthetics or accessibility.")), message && /* @__PURE__ */ import_react6.default.createElement("p", { className: "bs-notice", role: "status" }, message), /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-quality", "aria-live": "polite" }, legacyMismatch && /* @__PURE__ */ import_react6.default.createElement("p", { className: "bs-error-text" }, "This legacy draft has no matching saved background version. Create crisp editable copy to choose imagery and review a new composition."), issues.errors.length > 0 ? /* @__PURE__ */ import_react6.default.createElement(import_react6.default.Fragment, null, /* @__PURE__ */ import_react6.default.createElement("h2", null, "Resolve before review"), /* @__PURE__ */ import_react6.default.createElement("ul", null, issues.errors.map((e, i) => /* @__PURE__ */ import_react6.default.createElement("li", { key: i }, typeof e === "string" ? e : e.message || "Composition needs adjustment."))), /* @__PURE__ */ import_react6.default.createElement("p", null, "Try another arrangement, adjust bounded scale, or edit the copy. Nothing is silently shortened.")) : !rendering && /* @__PURE__ */ import_react6.default.createElement("p", null, /* @__PURE__ */ import_react6.default.createElement(Icon, { name: "check" }), " Technical layout checks passed. Human review is still required."), unusedBackdrop && backgroundId && /* @__PURE__ */ import_react6.default.createElement("p", { className: "bs-error-text" }, "Selected background is unused in this v2 composition. Switch to v3 to combine it with your original."), issues.warnings.length > 0 && /* @__PURE__ */ import_react6.default.createElement(import_react6.default.Fragment, null, /* @__PURE__ */ import_react6.default.createElement("h3", null, "Check carefully"), /* @__PURE__ */ import_react6.default.createElement("ul", null, issues.warnings.map((e, i) => /* @__PURE__ */ import_react6.default.createElement("li", { key: i }, typeof e === "string" ? e : e.message || "Inspect this composition manually."))))), !frozen && !templated && /* @__PURE__ */ import_react6.default.createElement("details", { className: "bs-preview-extras" }, /* @__PURE__ */ import_react6.default.createElement("summary", null, "Compare formats and layouts"), modern && /* @__PURE__ */ import_react6.default.createElement(import_react6.default.Fragment, null, /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-section-head bs-format-head" }, /* @__PURE__ */ import_react6.default.createElement("h2", null, "Review the formats"), /* @__PURE__ */ import_react6.default.createElement("span", { className: "bs-muted" }, "Each ratio is composed locally")), /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-format-strip" }, Object.entries(FORMATS).map(([id, f]) => /* @__PURE__ */ import_react6.default.createElement("button", { disabled: action, className: draft.format === id ? "selected" : "", key: id, "aria-pressed": draft.format === id, onClick: () => update("format", id) }, /* @__PURE__ */ import_react6.default.createElement("div", null, /* @__PURE__ */ import_react6.default.createElement(PosterThumbnail, { company, post: { ...draft, format: id }, backgroundId, logoId, productId, foregroundId, fonts, getAsset, getFont })), /* @__PURE__ */ import_react6.default.createElement("strong", null, f.ratio), /* @__PURE__ */ import_react6.default.createElement("small", null, f.label)))), /* @__PURE__ */ import_react6.default.createElement("p", { className: "bs-muted bs-small" }, "Review applies only to the selected format. Other ratios need their own review."), /* @__PURE__ */ import_react6.default.createElement("button", { className: "bs-text-button", "aria-expanded": auditions, onClick: () => setAuditions((v) => !v) }, auditions ? "Hide" : "Compare", " ", flexible ? "arrangements" : "local typography auditions"), auditions && /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-auditions" }, (flexible ? LAYOUTS.map((l) => [l.id, l.label]) : VARIATIONS).map(([id, label]) => {
    const selected = (flexible ? effectivePoster.composition.layout : effectivePoster.variation) === id, candidate = flexible ? layoutAudition(draft.poster, draft.format, id) : auditionPoster(draft.poster, draft.format, id);
    return /* @__PURE__ */ import_react6.default.createElement("button", { key: id, disabled: action, className: selected ? "selected" : "", "aria-pressed": selected, onClick: () => update("poster", candidate) }, /* @__PURE__ */ import_react6.default.createElement(PosterThumbnail, { company, post: { ...draft, poster: candidate }, backgroundId, logoId, productId, foregroundId, fonts, getAsset, getFont }), /* @__PURE__ */ import_react6.default.createElement("strong", null, label));
  })))), designs.length > 0 && /* @__PURE__ */ import_react6.default.createElement(Field, { label: "Saved design history", hint: "Open frozen versions without changing the editable post." }, /* @__PURE__ */ import_react6.default.createElement("select", { value: historyId, disabled: action, onChange: (e) => setHistoryId(e.target.value) }, /* @__PURE__ */ import_react6.default.createElement("option", { value: "" }, "Current editable draft"), designs.slice().reverse().map((d, i) => /* @__PURE__ */ import_react6.default.createElement("option", { key: d.id, value: d.id }, "Version ", designs.length - i, " \xB7 ", FORMATS[d.scene?.post?.format || d.format]?.label, " \xB7 ", d.reviewed ? "reviewed" : "unreviewed"))))), /* @__PURE__ */ import_react6.default.createElement("section", { className: "bs-brief", "aria-label": "Design inspector", ref: inspectorRef, tabIndex: -1 }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-section-head" }, /* @__PURE__ */ import_react6.default.createElement("h1", null, frozen ? "Saved post" : "Shape your post"), /* @__PURE__ */ import_react6.default.createElement("span", { className: "bs-save", role: "status" }, frozen ? "Read only" : saveState)), /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-inspector-tabs", role: "tablist", "aria-label": "Design controls" }, ["Words", "Look", "Assets"].map((name) => /* @__PURE__ */ import_react6.default.createElement("button", { type: "button", role: "tab", id: "bs-tab-" + name, "aria-selected": inspector === name, "aria-controls": "bs-panel-" + name, tabIndex: inspector === name ? 0 : -1, key: name, onKeyDown: (e) => {
    const names = ["Words", "Look", "Assets"], i = names.indexOf(name);
    let next;
    if (e.key === "ArrowRight") next = names[(i + 1) % 3];
    if (e.key === "ArrowLeft") next = names[(i + 2) % 3];
    if (e.key === "Home") next = names[0];
    if (e.key === "End") next = names[2];
    if (next) {
      e.preventDefault();
      setInspector(next);
      document.getElementById("bs-tab-" + next)?.focus();
    }
  }, onClick: () => setInspector(name) }, name === "Words" ? /* @__PURE__ */ import_react6.default.createElement(Icon, { name: "type" }) : name === "Look" ? /* @__PURE__ */ import_react6.default.createElement(Icon, { name: "layers" }) : /* @__PURE__ */ import_react6.default.createElement(Icon, { name: "image" }), name))), /* @__PURE__ */ import_react6.default.createElement("fieldset", { className: "bs-edit-fields", disabled: frozen || action }, /* @__PURE__ */ import_react6.default.createElement("div", { role: "tabpanel", id: "bs-panel-Words", "aria-labelledby": "bs-tab-Words", hidden: inspector !== "Words" }, /* @__PURE__ */ import_react6.default.createElement(Field, { label: "Post name" }, /* @__PURE__ */ import_react6.default.createElement("input", { maxLength: 160, value: viewPost.title || "", onChange: (e) => update("title", e.target.value) })), /* @__PURE__ */ import_react6.default.createElement(Field, { label: "What are you promoting?", hint: "Describe the subject and purpose. This is the image brief, not the poster copy." }, /* @__PURE__ */ import_react6.default.createElement("textarea", { rows: 3, value: viewPost.brief || "", onChange: (e) => update("brief", e.target.value) })), campaign && /* @__PURE__ */ import_react6.default.createElement("details", null, /* @__PURE__ */ import_react6.default.createElement("summary", null, "Campaign guidance", campaign.artDirection ? " \xB7 saved look available" : " \xB7 inherited"), /* @__PURE__ */ import_react6.default.createElement("p", null, campaign.goal), campaign.offer && /* @__PURE__ */ import_react6.default.createElement("p", null, "Offer: ", campaign.offer), /* @__PURE__ */ import_react6.default.createElement("p", null, company.guidelines, " ", campaign.style), campaign.artDirection && modern && /* @__PURE__ */ import_react6.default.createElement(Button, { type: "button", onClick: applyCampaignLook }, "Apply saved campaign look")), /* @__PURE__ */ import_react6.default.createElement("h2", { className: "bs-control-heading" }, "Your exact words"), v3 && /* @__PURE__ */ import_react6.default.createElement(Field, { label: "Header label / website (optional)", hint: "Exact header text for this format. Brand name and logo come from Company guidelines." }, /* @__PURE__ */ import_react6.default.createElement("input", { maxLength: "160", value: options.kicker || "", onChange: (e) => posterChange("kicker", e.target.value) })), /* @__PURE__ */ import_react6.default.createElement(Field, { label: "Headline", hint: "Press Enter for a deliberate line break. Words remain editable, never drawn by AI." }, /* @__PURE__ */ import_react6.default.createElement("textarea", { rows: 3, maxLength: 500, placeholder: "Your headline", value: viewPost.headline || "", onChange: (e) => update("headline", e.target.value) })), /* @__PURE__ */ import_react6.default.createElement(Field, { label: "Supporting text (optional)" }, /* @__PURE__ */ import_react6.default.createElement("textarea", { rows: 3, maxLength: 2e3, value: viewPost.body || "", onChange: (e) => update("body", e.target.value) })), /* @__PURE__ */ import_react6.default.createElement(Field, { label: "What should people do next? (optional)" }, /* @__PURE__ */ import_react6.default.createElement("input", { maxLength: 300, value: viewPost.cta || "", onChange: (e) => update("cta", e.target.value) }))), /* @__PURE__ */ import_react6.default.createElement("div", { role: "tabpanel", id: "bs-panel-Look", "aria-labelledby": "bs-tab-Look", hidden: inspector !== "Look" }, /* @__PURE__ */ import_react6.default.createElement(LookControls, { Field, options, modern: v3, templateMode: templated, format: viewPost.format, formatLabel: FORMATS[viewPost.format].label, hasOverrides: !!viewPost.poster?.formats?.[viewPost.format], onApplyAll: applyLookEverywhere, onChooseTemplate: chooseTemplate, onChoosePairing: chooseFontPairing, onChange: posterChange, getAsset, images: [
    { role: "background", label: "Background", id: backgroundId, name: assets.find((a) => a.id === backgroundId)?.name, choices: assets.filter((a) => ["backdrop", "generated"].includes(a.role)), onSelect: (id) => selectLookImage("background", id), onUpload: (file) => upload(file, "backdrop", true) },
    { role: "foreground", label: "Subject", id: foregroundId, name: assets.find((a) => a.id === foregroundId)?.name, choices: assets.filter((a) => ["foreground", "product"].includes(a.role)), onSelect: (id) => selectLookImage("foreground", id), onUpload: (file) => upload(file, "foreground", true) },
    { role: "product", label: "Product / screenshot", id: productId, name: assets.find((a) => a.id === productId)?.name, choices: assets.filter((a) => a.role === "product"), onSelect: (id) => selectLookImage("product", id), onUpload: (file) => upload(file, "product") }
  ], renderAdvanced: () => v3 ? /* @__PURE__ */ import_react6.default.createElement(import_react6.default.Fragment, null, /* @__PURE__ */ import_react6.default.createElement(RoleTypography, { options, fonts, onChange: posterChange }), /* @__PURE__ */ import_react6.default.createElement(FontLibrary, { companyId: company.id, fonts, api, onImported: onFontsImported, onError })) : null, renderActions: () => /* @__PURE__ */ import_react6.default.createElement(import_react6.default.Fragment, null, /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-local-actions" }, /* @__PURE__ */ import_react6.default.createElement(Button, { type: "button", disabled: !undo.length || unavailable, onClick: () => {
    const previous = undo.at(-1);
    setUndo((u) => u.slice(0, -1));
    dirty.current = true;
    setDraft(previous);
    setSaveState("Unsaved changes");
    setApproval(null);
  } }, "Undo edit"), templated && /* @__PURE__ */ import_react6.default.createElement(Button, { type: "button", disabled: unavailable, onClick: () => chooseTemplate(effectivePoster.composition.layout) }, "Reset arrangement defaults")), templated && /* @__PURE__ */ import_react6.default.createElement("details", null, /* @__PURE__ */ import_react6.default.createElement("summary", null, "Future defaults"), /* @__PURE__ */ import_react6.default.createElement("p", null, "Only newly created posts inherit these settings."), campaign && /* @__PURE__ */ import_react6.default.createElement(Button, { type: "button", disabled: unavailable, onClick: () => localAction(async () => {
    await command("campaign.artDirection", { id: campaign.id, poster: draft.poster });
    setMessage("Campaign look saved for future posts.");
  }) }, "Save this campaign look"), /* @__PURE__ */ import_react6.default.createElement(Button, { type: "button", disabled: unavailable, onClick: () => localAction(async () => {
    await command("company.save", { ...company, brandKit: { ...company.brandKit, poster: draft.poster } });
    setMessage("Company look saved for future posts.");
  }) }, "Save as company look"))) })), /* @__PURE__ */ import_react6.default.createElement("div", { role: "tabpanel", id: "bs-panel-Assets", "aria-labelledby": "bs-tab-Assets", hidden: inspector !== "Assets" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-asset-area" }, /* @__PURE__ */ import_react6.default.createElement("h2", { className: "bs-control-heading" }, "Keep your originals"), /* @__PURE__ */ import_react6.default.createElement("p", null, "Logos and product images are composed locally, never redrawn. PNG, JPEG, or WebP \xB7 up to 5 MB."), editorial && /* @__PURE__ */ import_react6.default.createElement("p", null, "Editorial uses your logo but not product imagery. Image selections stay available for other recipes."), ["logo", "product"].map((role) => /* @__PURE__ */ import_react6.default.createElement("div", { key: role }, /* @__PURE__ */ import_react6.default.createElement(Field, { label: role === "logo" ? "Original logo" : "Real product / screenshot" }, /* @__PURE__ */ import_react6.default.createElement("select", { value: role === "logo" ? logoId : productId, onChange: (e) => {
    const ids = draft.assetIds.filter((id) => assets.find((a) => a.id === id)?.role !== role);
    update("assetIds", e.target.value ? [...ids, e.target.value] : ids);
  } }, /* @__PURE__ */ import_react6.default.createElement("option", { value: "" }, role === "logo" && company.logoAssetId ? "Company logo" : "None selected"), assets.filter((a) => a.role === role).map((a) => /* @__PURE__ */ import_react6.default.createElement("option", { key: a.id, value: a.id }, a.name)))), /* @__PURE__ */ import_react6.default.createElement("label", { className: "bs-upload" }, "Upload ", role === "logo" ? "logo" : "product / screenshot", /* @__PURE__ */ import_react6.default.createElement("input", { type: "file", accept: "image/png,image/jpeg,image/webp", disabled: unavailable || frozen, onChange: (e) => {
    upload(e.target.files[0], role);
    e.target.value = "";
  } }))))), v3 && /* @__PURE__ */ import_react6.default.createElement("details", { className: "bs-layer-assets", open: true }, /* @__PURE__ */ import_react6.default.createElement("summary", null, "Independent image layers"), /* @__PURE__ */ import_react6.default.createElement("p", { className: "bs-muted bs-small" }, "Real alpha is preserved. Upload does not remove backgrounds. Product screenshots keep their separate protected proportions."), ["backdrop", "foreground"].map((role) => /* @__PURE__ */ import_react6.default.createElement("div", { key: role }, role === "foreground" && /* @__PURE__ */ import_react6.default.createElement(Field, { label: "Foreground subject" }, /* @__PURE__ */ import_react6.default.createElement("select", { value: foregroundId || "", onChange: (e) => update("foregroundAssetId", e.target.value) }, /* @__PURE__ */ import_react6.default.createElement("option", { value: "" }, "No foreground"), assets.filter((a) => ["foreground", "product"].includes(a.role)).map((a) => /* @__PURE__ */ import_react6.default.createElement("option", { key: a.id, value: a.id }, a.name)))), /* @__PURE__ */ import_react6.default.createElement("label", { className: "bs-upload" }, "Upload ", role, /* @__PURE__ */ import_react6.default.createElement("input", { "aria-label": `Upload ${role}`, type: "file", accept: "image/png,image/jpeg,image/webp", disabled: unavailable || frozen, onChange: (e) => {
    upload(e.target.files[0], role);
    e.target.value = "";
  } }))))), /* @__PURE__ */ import_react6.default.createElement(Field, { label: "Background version", hint: !modern ? "Legacy backgrounds stay with their saved version. Switch backgrounds in an editable v3 copy." : editorial ? "Unused in this type-only Editorial format. Selection is retained for other recipes." : "Reuse an existing image, or choose a type-only composition. No image request is made." }, /* @__PURE__ */ import_react6.default.createElement("select", { disabled: action || !modern, value: backgroundId || "", onChange: (e) => update("backgroundAssetId", e.target.value) }, /* @__PURE__ */ import_react6.default.createElement("option", { value: "" }, "No backdrop \xB7 brand field only"), assets.filter((a) => a.role === "generated" || v3 && a.role === "backdrop").map((a, i) => /* @__PURE__ */ import_react6.default.createElement("option", { key: a.id, value: a.id }, a.name || `Background ${i + 1}`)))))), /* @__PURE__ */ import_react6.default.createElement("div", { hidden: inspector !== "Assets" }, !frozen && /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-generation-door" }, /* @__PURE__ */ import_react6.default.createElement("h2", null, "Need a new background?"), /* @__PURE__ */ import_react6.default.createElement("p", null, "All composition edits above are local. Only this separate action requests a paid image."), solidBackground && /* @__PURE__ */ import_react6.default.createElement("p", { className: "bs-callout" }, "Choose Image over colour in Look before commissioning a background."), editorial && /* @__PURE__ */ import_react6.default.createElement("p", { className: "bs-callout" }, "Editorial is type-only. Background and product images are not drawn; your original logo is still used. Switch to Hero or Showcase before commissioning an image."), unusedBackdrop && !editorial && /* @__PURE__ */ import_react6.default.createElement("p", { className: "bs-callout" }, "Version 2 ignores backgrounds with this recipe or original product. Paid background generation is disabled. Create crisp editable copy to use independent layers."), !status?.credentialConfigured && /* @__PURE__ */ import_react6.default.createElement("button", { className: "bs-text-button", onClick: onSetup }, "Set up image generation"), /* @__PURE__ */ import_react6.default.createElement(Button, { primary: true, icon: "image", disabled: unavailable || working || unsaved || editorial || solidBackground || unusedBackdrop || !status?.credentialConfigured || !draft.brief?.trim(), onClick: () => onGenerate(post.id) }, working ? "Image request in progress\u2026" : "Generate background\u2026"), unsaved && /* @__PURE__ */ import_react6.default.createElement("small", null, "Save your brief before commissioning imagery."), /* @__PURE__ */ import_react6.default.createElement("details", null, /* @__PURE__ */ import_react6.default.createElement("summary", null, "Inspect the image brief"), /* @__PURE__ */ import_react6.default.createElement("p", { className: "bs-muted" }, "Read-only prompt preview. No image is generated."), /* @__PURE__ */ import_react6.default.createElement(Button, { disabled: unavailable || unsaved, onClick: () => localAction(async () => {
    const r = await api("prompt", { postId: post.id });
    setPrompt(r.prompt);
  }) }, "Show image prompt"), prompt && /* @__PURE__ */ import_react6.default.createElement("pre", { className: "bs-prompt" }, prompt)), job && /* @__PURE__ */ import_react6.default.createElement("p", { className: "bs-muted" }, "Latest request: ", nice(job.status), job.status === "unknown" ? " \xB7 May have been billed. No automatic retry." : "", job.status === "failed" ? ` \xB7 ${job.error || "Your saved draft is safe. Review image setup before trying again."}` : ""))))), languagePreview && /* @__PURE__ */ import_react6.default.createElement(Modal, { title: "Preview company language", onClose: () => setLanguagePreview(null) }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-dialog-body" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-language-apply-preview" }, /* @__PURE__ */ import_react6.default.createElement(PosterThumbnail, { company, post: { ...draft, poster: languagePreview.poster }, backgroundId, logoId, productId, foregroundId, fonts, getAsset, getFont })), /* @__PURE__ */ import_react6.default.createElement("p", null, "Apply the first arrangement, motif and CTA treatment from this company\u2019s language to ", languagePreview.scope, ". Typography and image settings stay unchanged. ", languagePreview.scope === "all formats" ? "Existing arrangement, motif and CTA ratio overrides will be replaced." : "Other formats stay unchanged."), /* @__PURE__ */ import_react6.default.createElement("p", null, "This changes the editable draft and requires a new review. Saved versions stay unchanged."), /* @__PURE__ */ import_react6.default.createElement("div", { className: "bs-form-actions" }, /* @__PURE__ */ import_react6.default.createElement(Button, { type: "button", onClick: () => setLanguagePreview(null) }, "Keep current layout"), /* @__PURE__ */ import_react6.default.createElement(Button, { type: "button", primary: true, onClick: () => {
    update("poster", languagePreview.poster);
    setLanguagePreview(null);
    setMessage("Company language applied. Inspect the new arrangement and review again.");
  } }, "Apply company language")))));
}
function HistoryCard({ design, post, company, getAsset, getFont, onOpen }) {
  const frozenCompany = design.scene?.company || company, frozenPost = design.scene?.post || legacyScenePost(post, design);
  return /* @__PURE__ */ import_react6.default.createElement("button", { className: "bs-history-card", onClick: onOpen }, /* @__PURE__ */ import_react6.default.createElement("div", null, /* @__PURE__ */ import_react6.default.createElement(PosterThumbnail, { company: frozenCompany, post: frozenPost, design, backgroundId: design.assetId, logoId: design.logoAssetId, productId: design.productAssetId, foregroundId: design.foregroundAssetId || frozenPost.foregroundAssetId, fonts: design.scene?.fonts || [], getAsset, getFont })), /* @__PURE__ */ import_react6.default.createElement("strong", null, frozenPost.title || "Social design"), /* @__PURE__ */ import_react6.default.createElement("span", null, new Date(design.createdAt).toLocaleDateString(), " \xB7 ", design.reviewed ? "Reviewed" : "Draft", design.scene ? " \xB7 frozen scene" : " \xB7 legacy"));
}

return module.exports;}});
