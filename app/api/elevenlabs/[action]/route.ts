import {ApiError,agentPayload,body,eleven,failure,json,key,sameOrigin} from '@/lib/server';
import {agentSchema} from '@/lib/types';
import {voices} from '@/lib/agents';
export async function GET(req:Request,{params}:{params:Promise<{action:string}>}){try{const {action}=await params;const url=new URL(req.url);
 if(action==='status')return json({elevenlabs:!!key(req,'elevenlabs'),gemini:!!key(req,'gemini'),agentId:process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID||'',database:!!(process.env.SUPABASE_URL&&process.env.SUPABASE_SERVICE_ROLE_KEY)});
 if(action==='voices'){if(!key(req,'elevenlabs'))return json({voices,mode:'curated'});return json({...await(await eleven(req,'voices')).json() as object,mode:'live'});}
 if(action==='conversations'){const id=url.searchParams.get('agentId');return json(await(await eleven(req,'convai/conversations'+(id?'?agent_id='+encodeURIComponent(id):''))).json());}
 if(action==='signed-url'){sameOrigin(req);const id=url.searchParams.get('agentId');if(!id||id.length>100)throw new ApiError('An agent ID is required.');return json(await(await eleven(req,'convai/conversation/get-signed-url?agent_id='+encodeURIComponent(id))).json());}
 throw new ApiError('Not found.',404);
 }catch(e){return failure(e);}}
export async function POST(req:Request,{params}:{params:Promise<{action:string}>}){try{const {action}=await params;sameOrigin(req);
 if(action==='stt'){if(Number(req.headers.get('content-length')||0)>12000000)throw new ApiError('Audio must be under 10 MB.',413);const form=await req.formData();const file=form.get('file');if(!(file instanceof File)||file.size>10000000)throw new ApiError('Choose an audio recording under 10 MB.');const upstream=new FormData();upstream.set('file',file);upstream.set('model_id','scribe_v1');return json(await(await eleven(req,'speech-to-text',{method:'POST',body:upstream})).json());}
 const data=await body(req);
 if(action==='tts'||action==='tts-preview'){if(typeof data.text!=='string'||data.text.length>3000||!data.text.trim())throw new ApiError('Supply up to 3,000 characters of speech.');const v=agentSchema.shape.voiceConfig.safeParse(data.voiceConfig);if(!v.success)throw new ApiError('Invalid voice settings.');const r=await eleven(req,`text-to-speech/${encodeURIComponent(v.data.voiceId)}/stream`,{method:'POST',body:JSON.stringify({text:data.text,model_id:v.data.modelId,voice_settings:{stability:v.data.stability,similarity_boost:v.data.similarityBoost,speed:v.data.speed}})});return new Response(r.body,{headers:{'Content-Type':'audio/mpeg','Cache-Control':'no-store'}});}
 if(action==='agent'){const a=agentSchema.safeParse(data.agent);if(!a.success)throw new ApiError('Invalid agent configuration.');const r=await eleven(req,'convai/agents/create',{method:'POST',body:JSON.stringify(agentPayload(a.data))});return json(await r.json());}
 if(action==='knowledge'){if(typeof data.text!=='string'||!data.text.trim()||data.text.length>25000||typeof data.name!=='string')throw new ApiError('A document must contain 1–25,000 characters.');return json(await(await eleven(req,'convai/knowledge-base/text',{method:'POST',body:JSON.stringify({name:data.name.slice(0,200),text:data.text})})).json());}
 throw new ApiError('Not found.',404);
 }catch(e){return failure(e);}}
export async function PATCH(req:Request,{params}:{params:Promise<{action:string}>}){try{if((await params).action!=='agent')throw new ApiError('Not found.',404);const {agent}=await body(req);const parsed=agentSchema.safeParse(agent);if(!parsed.success||!parsed.data.elevenLabsAgentId)throw new ApiError('Provision this agent before syncing.');await eleven(req,'convai/agents/'+encodeURIComponent(parsed.data.elevenLabsAgentId),{method:'PATCH',body:JSON.stringify(agentPayload(parsed.data))});return json({synced:true});}catch(e){return failure(e);}}
