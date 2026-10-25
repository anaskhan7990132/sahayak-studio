import {generate,failure} from '@/lib/server';
export async function POST(req:Request){try{return await generate(req);}catch(e){return failure(e);}}
