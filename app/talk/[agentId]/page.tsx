import Talk from '@/components/studio/Talk';
export default async function Page({params}:{params:Promise<{agentId:string}>}){const {agentId}=await params;return <Talk id={agentId}/>;}
