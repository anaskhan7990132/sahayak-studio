import {chat,failure} from '@/lib/server';
export async function POST(req:Request){try{return await chat(req);}catch(e){return failure(e);}}
