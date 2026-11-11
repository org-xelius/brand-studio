// Persist fixed classifications, never raw provider text, prompts, headers or keys.
const CODES = new Set(['unknown_parameter','unsupported_parameter','unsupported_value','invalid_value','invalid_model','model_not_found','billing_hard_limit_reached','billing_not_active','insufficient_quota','rate_limit_exceeded','invalid_api_key','organization_restricted','organization_verification_required','permission_denied','moderation_blocked','content_policy_violation','image_generation_user_error','invalid_request_error']);
const TYPES = new Set(['invalid_request_error','permissions_error','permission_error','rate_limit_error','server_error','authentication_error','insufficient_quota']);
const PARAMS = new Set(['model','prompt','n','size','quality','output_format','stream','moderation','output_compression','partial_images','input_fidelity','response_format','image','mask','user','background']);
async function readError(response) {
  const reader=response.body?.getReader();if(!reader)return {};
  let size=0;const chunks=[];
  try {while(true){const part=await reader.read();if(part.done)break;size+=part.value.length;if(size>65536){await reader.cancel();return {};}chunks.push(part.value);}return JSON.parse(Buffer.concat(chunks).toString('utf8'))?.error||{};}
  catch{return {};}
  finally{reader.releaseLock();}
}
export async function imageFailure(response) {
  const raw=await readError(response),status=response.status;
  const message=typeof raw.message==='string'?raw.message:'';
  let code=CODES.has(raw.code)?raw.code:undefined;
  // Recognise common actionable causes without retaining or displaying arbitrary text.
  if(/organi[sz]ation.{0,100}(verif|verified)|verif.{0,100}organi[sz]ation/i.test(message))code='organization_verification_required';
  else if(!code&&/billing.{0,40}(limit|active|hard)|hard.{0,20}limit/i.test(message))code='billing_hard_limit_reached';
  const type=TYPES.has(raw.type)?raw.type:undefined;
  const param=PARAMS.has(raw.param)?raw.param:undefined;
  const header=response.headers.get('x-request-id');
  const requestId=typeof header==='string'&&/^req_[A-Za-z0-9_-]{1,160}$/.test(header)?header:undefined;
  let error;
  if(status>=500||status===408)error='OpenAI did not confirm the outcome. This request may have been charged. Check OpenAI usage before trying again.';
  else if(code==='organization_verification_required')error='OpenAI requires organisation verification for this image model. Complete verification for the API key’s organisation in OpenAI settings, then try a new confirmed request. No automatic retry was made.';
  else if(param==='model'&&['unknown_parameter','unsupported_parameter','unsupported_value','invalid_value'].includes(code))error='OpenAI rejected the configured image model. Open Image setup, check available models, and save a supported image model before submitting a new confirmed request.';
  else if(['unknown_parameter','unsupported_parameter','unsupported_value','invalid_value'].includes(code)&&param)error=`OpenAI rejected the image request parameter “${param}” (${code}). This is an integration/settings issue; changing your brief alone may not fix it. No automatic retry was made.`;
  else if(code==='model_not_found'||code==='invalid_model')error='OpenAI could not use the configured image model. Check that this API project has access to it. No automatic retry was made.';
  else if(['insufficient_quota','billing_hard_limit_reached','billing_not_active'].includes(code))error='OpenAI declined the image request because API billing or available quota is insufficient. Check the API project’s billing and limits; chat subscriptions do not provide API credits.';
  else if(code==='moderation_blocked'||code==='content_policy_violation')error='OpenAI rejected the request under its image safety rules. Review the brief before submitting a new request.';
  else if(status===401||status===403||code==='invalid_api_key')error='OpenAI rejected the key or account permissions. Check the image API key, project permissions, and model access.';
  else if(status===429)error='OpenAI declined the request because of a rate limit or account quota. Check the API project’s usage and billing before retrying.';
  else error=`OpenAI declined this image request (HTTP ${status}${code?`, ${code}`:''}${param?`, parameter ${param}`:''}). No automatic retry was made. Review the model, inputs, and account access.`;
  return {httpStatus:status,error,...code?{providerCode:code}:{},...type?{providerType:type}:{},...param?{providerParam:param}:{},...requestId?{providerRequestId:requestId}:{}};
}
