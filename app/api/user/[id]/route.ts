import { NextResponse } from "next/server";
import { getAllUsers, getUserById } from "../handler";
import { useRouter } from "next/router";

export const GET = async (req: NextResponse, context: any) => {
    const { params } = context;
    const { id } = params;
    const users = await getUserById(parseInt(id));
    return NextResponse.json(users);
};