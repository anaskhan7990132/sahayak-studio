import {refine,failure} from '@/lib/server';
export async function POST(req:Request){try{return await refine(req);}catch(e){return failure(e);}}
