import { NextRequest, NextResponse } from "next/server";
import { accountLogin } from "../handler";

export const POST = async (req: NextRequest) => {
    try{
        const { username, password } = await req.json();
        const token = await accountLogin({ username, password });
        if(token) return NextResponse.json(token);
        return NextResponse.json({ error: 'Ïnvalid username or password' }, { status: 500 })
       
    }
    catch(ex){
        return NextResponse.json({ error: ex }, { status: 500 })
    }
    
};
