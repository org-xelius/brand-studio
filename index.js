import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import { imageFailure } from './image-errors.js';
import { StudioError, check, clone, createState, validateState, applyCommand, queueJobs, updateJob, addAsset, addFont, validateFontRecord, finishJob, recoverJobs, compilePrompt, snapshotForPost, generationSize, assertGeneratable } from './model.js';
import { FONT_CATALOG, getCatalogFont } from './font-catalog.js';
import { downloadCatalogFamily, verifyFontFile } from './font-service.js';
import { runWelcomeArtworkTask } from './welcome-artwork-task.js';

export const name = 'brand-studio';
export const inject = ['connection', 'credentials', 'storageDomain', 'webServer'];
const PRIMARY_REF = 'BRAND_STUDIO_OPENAI_API_KEY';
const FALLBACK_REF = 'OPENAI_API_KEY';
const MAX_ASSET_BYTES = 8 * 1024 * 1024;
const MAX_TOTAL_ASSETS = 96 * 1024 * 1024;
const stateSchema = z.unknown().refine(value => { try { validateState(value); return true; } catch { return false; } }, 'Invalid Brand Studio state');
const assetSchema = z.object({ id: z.string(), companyId: z.string(), dataUrl: z.string().max(Math.ceil(MAX_ASSET_BYTES * 4 / 3) + 100), bytes: z.number().int().positive().max(MAX_ASSET_BYTES) });
// DomainSpec is the public structural input to storageDomain.open(). The SDK's
// defineDomain/domainTable helpers return this same shape; use a literal to avoid
// loading duplicate host service modules into an externally linked local bundle.
// Names/version are fixed here; incoming writes are explicitly parsed/validated.
const spec = { name: 'brand_studio', version: 1, tables: { state: { valueSchema: stateSchema }, assets: { valueSchema: assetSchema } } };
// CredentialRef branding is TypeScript-only. These fixed, valid POSIX reference
// names are the runtime values; no caller may supply an arbitrary reference.
const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const safeError = error => error instanceof StudioError ? error.message : 'The operation could not finish. Your saved work is retained. Check the connection and try again.';
const failure = (message, code = 'invalid') => ({ ok: false, error: { code: `brand-studio/${code}`, message, details: {} } });

function inspectImage(dataUrl) {
  check(typeof dataUrl === 'string' && dataUrl.length <= Math.ceil(MAX_ASSET_BYTES * 4 / 3) + 100, 'Choose an image no larger than 8 MB.');
  const match = /^data:(image\/(?:png|jpeg|webp));base64,([A-Za-z0-9+/]+={0,2})$/.exec(dataUrl);
  check(match && match[2].length % 4 === 0, 'Use a base64 PNG, JPEG, or WebP image. SVG and other files are not supported.');
  const bytes = Buffer.from(match[2], 'base64');
  check(bytes.length > 0 && bytes.length <= MAX_ASSET_BYTES && bytes.toString('base64') === match[2], 'The image is invalid or larger than 8 MB.');
  const mime = match[1];
  const valid = mime === 'image/png' ? bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])) : mime === 'image/jpeg' ? bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255 : bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP';
  check(valid, 'The image contents do not match the selected image format.');
  return { mime, bytes: bytes.length };
}

export async function apply(ctx) {
  // Recover our own handle if an earlier failed activation opened storage but never registered cleanup.
  const prior = ctx.storageDomain.get(spec.name);
  if (prior) await prior.close();
  const domain = await ctx.storageDomain.open(spec);
  const states = domain.table('state'), assets = domain.table('assets');
  let state = states.get('main') ?? createState();
  validateState(state);
  let mutation = Promise.resolve();
  let stopped = false;
  let pumping;
  let pumpRequested = false;
  const controllers = new Map();
  const fontImports = new Map();
  const welcomeArtworkAbort = new AbortController();
  let welcomeArtwork;
  let disposeRpc = () => {};
  ctx.effect(() => async () => {
    stopped = true; disposeRpc();
    welcomeArtworkAbort.abort();
    for (const abort of controllers.values()) abort.abort();
    await welcomeArtwork;
    try { await pumping; await Promise.allSettled([...fontImports.values()]); await mutation; await serial(async () => { const next = recoverJobs(state); if (next !== state) await persist(next); }); }
    finally { await domain.close(); }
  });
  async function persist(next) { validateState(next); await states.put('main', next); state = next; }
  function serial(operation) {
    const result = mutation.then(operation);
    mutation = result.then(() => undefined, () => undefined);
    return result;
  }
  const recovered = recoverJobs(state);
  if (recovered !== state || !states.get('main')) await persist(recovered);
  function publicState() {
    // Snapshots contain business context, never credentials. Binary image content is deliberately excluded.
    const result = clone(state);
    result.jobs = result.jobs.map(({ snapshot, ...job }) => job);
    return result;
  }
  async function credentialStatus() {
    const primary = await ctx.credentials.describe(PRIMARY_REF);
    if (primary.configured) return { credentialConfigured: true, credentialRef: PRIMARY_REF, model: state.settings.model, ...state.settings.modelCatalog, ...(state.settings.modelCatalog ? {currentAvailable:state.settings.modelCatalog.error?null:state.settings.modelCatalog.imageModels.includes(state.settings.model)} : {}) };
    const fallback = await ctx.credentials.describe(FALLBACK_REF);
    return { credentialConfigured: fallback.configured, credentialRef: fallback.configured ? FALLBACK_REF : PRIMARY_REF, model: state.settings.model, ...state.settings.modelCatalog, ...(state.settings.modelCatalog ? {currentAvailable:state.settings.modelCatalog.error?null:state.settings.modelCatalog.imageModels.includes(state.settings.model)} : {}) };
  }
  async function resolveKey() {
    for (const ref of [PRIMARY_REF, FALLBACK_REF]) {
      const hit = await ctx.credentials.resolve(ref);
      if (hit?.value) return { value: hit.value, ref };
    }
    throw new StudioError('Add an OpenAI API key in Brand Studio settings before creating images.', 'credential-missing');
  }
  async function discoverModels() {
    const key = await resolveKey();
    let catalogue;
    try {
      const response = await fetch('https://api.openai.com/v1/models', {method:'GET',headers:{authorization:`Bearer ${key.value}`},signal:AbortSignal.timeout(15000)});
      if (!response.ok) { const diagnostic = await imageFailure(response); throw new StudioError(`Model catalogue check failed: ${diagnostic.error}`); }
      const reader=response.body?.getReader();check(reader,'The model catalogue returned no data.');let size=0;const chunks=[];
      try {while(true){const part=await reader.read();if(part.done)break;size+=part.value.length;check(size<=2*1024*1024,'The model catalogue was too large to inspect safely.');chunks.push(part.value);}}
      finally {reader.releaseLock();}
      const body=JSON.parse(Buffer.concat(chunks).toString('utf8'));check(Array.isArray(body.data),'The model catalogue has an unexpected format.');
      const imageModels=[...new Set(body.data.map(m=>m?.id).filter(id=>typeof id==='string'&&/^gpt-image-[A-Za-z0-9._-]{1,64}$/.test(id)))].sort();
      catalogue={imageModels,currentAvailable:imageModels.includes(state.settings.model),checkedAt:new Date().toISOString()};
    } catch(error) {catalogue={imageModels:[],currentAvailable:null,checkedAt:new Date().toISOString(),error:safeError(error)};}
    await serial(async()=>{const next=clone(state);next.settings.imageModels=catalogue.imageModels;next.settings.modelCatalog=catalogue;next.revision++;await persist(next);});
    return catalogue;
  }
  async function saveAsset(companyId, name, role, dataUrl) {
    check(state.companies.some(c => c.id === companyId && !c.archived), 'Choose an active company before saving an image.');
    check(typeof name === 'string' && name.trim().length > 0 && name.length <= 180, 'Give the image a name of 1–180 characters.');
    check(['logo', 'product', 'reference', 'generated', 'backdrop', 'foreground'].includes(role), 'Choose logo, product, reference, backdrop, or foreground as the image role.');
    const info = inspectImage(dataUrl);
    const total = Array.from(assets.entries()).reduce((sum, [, a]) => sum + a.bytes, 0);
    check(total + info.bytes <= MAX_TOTAL_ASSETS, 'The local image library is full (96 MB). This first version does not automatically remove stored images.');
    const id = randomUUID();
    const record = assetSchema.parse({ id, companyId, dataUrl, bytes: info.bytes });
    await assets.put(id, record);
    return { id, companyId, name: name.trim(), role, mime: info.mime, bytes: info.bytes, createdAt: new Date().toISOString() };
  }
  function fontCompany(companyId) {
    check(typeof companyId === 'string' && state.companies.some(c => c.id === companyId && !c.archived), 'Choose an active company before importing fonts.');
  }
  async function importFont(companyId, catalogId) {
    fontCompany(companyId);
    check(typeof catalogId === 'string' && getCatalogFont(catalogId), 'Choose a font from the curated catalogue.');
    const existing = (state.fonts ?? []).find(f => f.companyId === companyId && f.catalogId === catalogId);
    if (existing) return existing.id;
    check((state.fonts ?? []).filter(f => f.companyId === companyId).length < 24, 'A company can import at most 24 font families.');
    const key = `${companyId}:${catalogId}`;
    if (fontImports.has(key)) return fontImports.get(key);
    const abort = new AbortController(); controllers.set(key, abort);
    // Network I/O deliberately sits OUTSIDE the aggregate mutation queue.
    const pending = (async () => {
      const downloaded = await downloadCatalogFamily(catalogId, {signal:abort.signal});
      return serial(async () => {
        check(!stopped, 'Brand Studio closed before the font could be saved.');
        fontCompany(companyId);
        const duplicate = (state.fonts ?? []).find(f => f.companyId === companyId && f.catalogId === catalogId);
        if (duplicate) return duplicate.id;
        check((state.fonts ?? []).filter(f => f.companyId === companyId).length < 24, 'A company can import at most 24 font families.');
        const binaries = new Map(), faces = [];
        for (const {dataUrl, sourceUrl, ...face} of downloaded.faces) {
          const id=randomUUID(), binary=assetSchema.parse({id,companyId,dataUrl,bytes:face.bytes});
          binaries.set(id,binary);
          faces.push({...face,assetId:binary.id});
        }
        const total=Array.from(assets.entries()).reduce((sum,[,a])=>sum+a.bytes,0);
        check(total+[...binaries.values()].reduce((sum,a)=>sum+a.bytes,0)<=MAX_TOTAL_ASSETS, 'The local asset library is full (96 MB, including fonts).');
        const {faces:ignored, ...metadata}=downloaded;
        const id=randomUUID(), record=validateFontRecord({...metadata,id,companyId,faces,importedAt:new Date().toISOString()});
        const next=addFont(state,record), written=[];
        try { for (const binary of binaries.values()) { written.push(binary.id); await assets.put(binary.id,binary); } await persist(next); }
        catch(error) { for(const assetId of written) { try { await assets.delete(assetId); } catch { /* Best effort: never advertise incomplete metadata. */ } } throw error; }
        return id;
      });
    })().finally(()=>{fontImports.delete(key);controllers.delete(key);});
    fontImports.set(key,pending);return pending;
  }
  async function markJob(jobId, patch) { return serial(async () => { await persist(updateJob(state, jobId, patch)); }); }
  async function processJob(jobId) {
    let job = state.jobs.find(j => j.id === jobId);
    if (!job || job.status !== 'queued' || stopped) return;
    let key;
    try { key = await resolveKey(); }
    catch (error) { await markJob(job.id, { status: 'failed', error: safeError(error), finishedAt: new Date().toISOString() }); return; }
    if (stopped) return;
    const abort = new AbortController(); controllers.set(job.id, abort);
    let submitted = false, receivedSuccess = false;
    const timeout = setTimeout(() => abort.abort(), 240000);
    try {
      // Check current lifecycle/offer/brand restrictions after credential lookup, in the same
      // serialized operation that claims this request. Never charge a campaign paused while queued.
      await serial(async () => {
        job = state.jobs.find(j => j.id === jobId);
        check(job && job.status === 'queued' && !stopped, 'This image request is no longer queued.');
        const { company, campaign } = assertGeneratable(state, job.snapshot.post, new Date().toISOString(), job.id);
        check(company.guidelines === job.snapshot.company.guidelines && campaign?.offer === job.snapshot.campaign?.offer && campaign?.offerExpiry === job.snapshot.campaign?.offerExpiry, 'The brand guidelines or offer changed after this design was queued. Review the post before creating it again. No image request was sent.');
        await persist(updateJob(state, job.id, { status: 'running', credentialRef: key.ref, startedAt: new Date().toISOString() }));
      });
      if (stopped) throw new StudioError('Brand Studio closed before this request was submitted. No image request was sent.');
      submitted = true;
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST', signal: abort.signal,
        headers: { 'content-type': 'application/json', authorization: `Bearer ${key.value}` },
        body: JSON.stringify({ model: job.snapshot.model, prompt: compilePrompt(job.snapshot), n: 1, size: generationSize(job.snapshot.post.format), quality: 'medium', output_format: 'png', stream: false })
      });
      if (!response.ok) {
        const diagnostic = await imageFailure(response);
        await markJob(job.id, { status: response.status >= 500 || response.status === 408 ? 'unknown' : 'failed', ...diagnostic, finishedAt: new Date().toISOString() });
        return;
      }
      receivedSuccess = true;
      check(Number(response.headers.get('content-length') || 0) <= 13 * 1024 * 1024, 'The generated image exceeds the 8 MB storage limit. OpenAI may have charged this request.');
      // Read with an explicit cap, including chunked responses with no Content-Length.
      const reader = response.body?.getReader(); check(reader, 'OpenAI returned no image body.');
      let size = 0; const chunks = [];
      try { while (true) { const { done, value } = await reader.read(); if (done) break; size += value.length; check(size <= 13 * 1024 * 1024, 'The generated image exceeds the local size limit. OpenAI may have charged this request.'); chunks.push(value); } }
      finally { reader.releaseLock(); }
      const result = JSON.parse(Buffer.concat(chunks).toString('utf8'));
      check(Array.isArray(result.data) && typeof result.data[0]?.b64_json === 'string', 'OpenAI did not return a usable image. This request may have been charged.');
      await serial(async () => {
        const asset = await saveAsset(job.companyId, `Generated design ${new Date().toISOString().slice(0, 10)}`, 'generated', `data:image/png;base64,${result.data[0].b64_json}`);
        const completed = finishJob(state, job.id, asset);
        await persist(completed.state);
      });
    } catch (error) {
      await markJob(job.id, { status: submitted && !receivedSuccess ? 'unknown' : 'failed', error: receivedSuccess ? 'OpenAI returned a result, but it could not be saved locally. This request may have been charged. No retry was made.' : submitted ? 'The connection ended before OpenAI confirmed the result. This request may have been charged. No retry was made.' : safeError(error), finishedAt: new Date().toISOString() });
    } finally { clearTimeout(timeout); abort.abort(); controllers.delete(job.id); key = undefined; }
  }
  function pump() {
    if (stopped) return;
    if (pumping) { pumpRequested = true; return; }
    pumpRequested = false;
    pumping = (async () => {
      while (!stopped) {
        const job = state.jobs.find(j => j.status === 'queued'); if (!job) break;
        await processJob(job.id);
      }
    })().catch(() => { /* Durable queued/running state is deliberately retained for restart recovery. */ }).finally(() => { pumping = undefined; if (pumpRequested && !stopped) pump(); });
  }
  // Exact Fetch routes use the existing /api carrier's trusted-origin, authentication,
  // and owner-principal checks. The installed generic rpc.handle owner shadow loses
  // its webServer dependency; this supported Fetch registry does not need that seam.
  async function handle(endpoint, payload) {
    if (stopped) return failure('Brand Studio is closing. Reopen it after the host restarts.', 'closing');
    if (!object(payload)) return failure('Supply an object as the request payload.');
    try {
      let value;
      if (endpoint === 'state') value = publicState();
      else if (endpoint === 'status') value = await credentialStatus();
      else if (endpoint === 'models.check') value = await discoverModels();
      else if (endpoint === 'fonts.catalog') {
        check(Object.keys(payload).length === 0, 'The font catalogue takes no parameters.');
        value = {families: clone(FONT_CATALOG)};
      } else if (endpoint === 'fonts.import') {
        check(Object.keys(payload).every(k => ['companyId','catalogId'].includes(k)), 'Only companyId and catalogId are accepted for font imports.');
        const fontId = await importFont(payload.companyId, payload.catalogId);
        value = {state:publicState(),fontId};
      } else if (endpoint === 'fonts.file') {
        check(Object.keys(payload).every(k => ['fontId','weight'].includes(k)), 'Choose an imported font and weight.');
        check(typeof payload.fontId === 'string' && Number.isInteger(payload.weight), 'Choose an imported font and exact weight.');
        const found=(state.fonts ?? []).find(f=>f.id===payload.fontId);check(found,'The imported font no longer exists.','not-found');
        const font=validateFontRecord(found), face=font.faces.find(f=>f.weight===payload.weight&&f.style==='normal');
        check(face,'This weight was not imported.','not-found');
        value=verifyFontFile(assets.get(face.assetId),face,font.companyId);
      }
      else if (endpoint === 'command') {
        check(typeof payload.type === 'string' && object(payload.data), 'Choose an action and supply its data.');
        if (payload.type === 'asset.save') {
          value = await serial(async () => {
            check(payload.data.role !== 'generated', 'Generated image assets can only be created by the backend.');
            const asset = await saveAsset(payload.data.companyId, payload.data.name, payload.data.role ?? 'reference', payload.data.dataUrl);
            await persist(addAsset(state, asset));
            return { state: publicState(), assetId: asset.id };
          });
        } else {
          value = await serial(async () => {
            const result = applyCommand(state, payload.type, payload.data);
            if (result.state !== state) await persist(result.state);
            const { state: ignored, ...metadata } = result;
            return { state: publicState(), ...metadata };
          });
        }
      } else if (endpoint === 'asset') {
        check(typeof payload.id === 'string', 'Choose an image.');
        const metadata = state.assets.find(a => a.id === payload.id); check(metadata, 'The image no longer exists.', 'not-found');
        const record = assets.get(payload.id); check(record && record.companyId === metadata.companyId, 'The image is unavailable.', 'not-found');
        value = { dataUrl: record.dataUrl };
      } else if (endpoint === 'prompt') {
        const snapshot = snapshotForPost(state, payload.postId);
        value = { prompt: compilePrompt(snapshot), model: snapshot.model, size: generationSize(snapshot.post.format) };
      } else if (endpoint === 'credential.save') {
        check(typeof payload.key === 'string' && payload.key.trim().length >= 10 && payload.key.length <= 1024, 'Enter a valid OpenAI API key.');
        await ctx.credentials.set(PRIMARY_REF, payload.key.trim());
        value = await credentialStatus();
      } else if (endpoint === 'credential.delete') {
        await ctx.credentials.unset(PRIMARY_REF); value = await credentialStatus();
      } else if (endpoint === 'generate') {
        // Report and freeze the selected credential reference before accepting paid work; never persist its value.
        const status = await credentialStatus(); check(status.credentialConfigured, 'Add an OpenAI API key before creating images.', 'credential-missing');
        value = await serial(async () => {
          const result = queueJobs(state, payload);
          if (result.state !== state) await persist(result.state);
          const ids = new Set(result.jobs.map(j => j.id));
          return { state: publicState(), jobs: publicState().jobs.filter(j => ids.has(j.id)), existing: !!result.existing };
        });
        pump();
      } else return failure('Unknown studio operation.', 'not-found');
      return { ok: true, value };
    } catch (error) { return failure(safeError(error), error instanceof StudioError ? error.code : 'operation-failed'); }
  }
  const routes = ['state','status','command','asset','prompt','credential.save','credential.delete','generate','models.check','fonts.catalog','fonts.import','fonts.file'].map(endpoint => ctx.connection.fetch.register({
    path: `/api/brand-studio/${endpoint}`, methods: ['POST'], requestBody: 'buffered',
    async fetch(request) {
      if (request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') return Response.json(failure('Use JSON for studio requests.'), {status:415});
      let payload;
      try { payload = await request.json(); }
      catch { return Response.json(failure('Supply valid JSON.'), {status:400}); }
      return Response.json(await handle(endpoint, payload), {headers:{'cache-control':'no-store'}});
    },
  }));
  disposeRpc = () => { for (const dispose of routes) dispose(); };
  // Read-only repair diagnostic after a model rejection; never submits an image request
  // or silently changes model selection. Once recorded, use explicit models.check.
  if (state.jobs.some(j => j.providerParam === 'model') && !state.settings.modelCatalog?.checkedAt) {
    try { await discoverModels(); } catch { /* Missing credentials remain actionable in Image setup. */ }
  }
  // Upgrade the rejected legacy default only when the account actually lists the
  // requested 2.6 model. Preserve deliberate alternatives and every job snapshot.
  if (state.settings.model === 'gpt-image-1' && state.jobs.some(j=>j.providerParam==='model') && state.settings.imageModels?.includes('gpt-image-2.6-flare')) {
    await serial(async()=>{const next=clone(state);next.settings.model='gpt-image-2.6-flare';next.settings.modelCatalog={...next.settings.modelCatalog,currentAvailable:true};next.revision++;await persist(next);});
  }
  // Inert without exact reviewed approval; independent of company/project state.
  welcomeArtwork = runWelcomeArtworkTask({ model: state.settings.model, resolveKey, signal: welcomeArtworkAbort.signal }).catch(() => undefined);
}
