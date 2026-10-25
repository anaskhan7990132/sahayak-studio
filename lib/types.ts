import { z } from 'zod';
export const flowSchema = z.object({id:z.string(), title:z.string().min(1).max(160), description:z.string().max(1200), condition:z.string().max(300).default('Always')});
export const agentSchema = z.object({
 id:z.string().max(100),name:z.string().min(1).max(100),useCase:z.string().max(100),description:z.string().max(1000),languages:z.array(z.string().max(30)).min(1).max(10),welcomeMessage:z.string().max(1500),systemPrompt:z.string().max(16000),
 conversationFlow:z.array(flowSchema).min(1).max(20),voiceConfig:z.object({voiceId:z.string().max(100),voiceName:z.string().max(100),modelId:z.enum(['eleven_flash_v2_5','eleven_multilingual_v2']),stability:z.number().min(0).max(1),similarityBoost:z.number().min(0).max(1),speed:z.number().min(.7).max(1.2)}),
 guardrails:z.array(z.object({id:z.string(),label:z.string().max(300),enabled:z.boolean(),locked:z.boolean().optional()})).max(30),tools:z.array(z.object({name:z.enum(['check_scheme_eligibility','generate_grievance_draft','escalate_to_human']),description:z.string().max(400),enabled:z.boolean()})),
 knowledge:z.array(z.object({id:z.string(),name:z.string().max(200),text:z.string().max(25000),source:z.string().max(1000).optional(),remoteId:z.string().optional(),sample:z.boolean().optional()})).max(15),elevenLabsAgentId:z.string().max(100).optional(),version:z.number().int().positive(),updatedAt:z.string()
});
export type AgentConfig=z.infer<typeof agentSchema>;
export type Message={id:string;role:'user'|'agent';text:string;language:string;at:string};
export type Grievance={id:string;title:string;category:string;description:string;requestedAction:string;createdAt:string;status:'Unsigned draft'};
export type ToolEvent={id:string;name:string;result:string;at:string;draft?:Grievance};
export type CallLog={id:string;caller:string;at:string;duration:number;language:string;sentiment:string;outcome:string;latency:number|null;sample:boolean;transcript:Message[];tools:ToolEvent[];summary:string;mode:'sample'|'simulation'|'browser'|'elevenlabs'|'text';flagged:boolean};
export type Settings={elevenLabsKey:string;geminiKey:string;agentId:string;rememberKeys:boolean};
export type Voice={voice_id:string;name:string;labels?:Record<string,string>;preview_url?:string};
export type ChatResult={reply:string;language:string;tool?:ToolEvent;mode:'gemini'|'deterministic';latencyMs:number};
