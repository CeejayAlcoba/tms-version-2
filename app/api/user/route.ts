import { generateToken } from "@/lib/jwt";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createUser, getAllUsers } from "./handler";

export const GET = async (req: NextRequest) => {
    const users = await getAllUsers();
    return NextResponse.json(users);
};

export const POST = async (req: NextRequest) => {
    try {
        const body: User = await req.json();
        const newUser = await createUser(body);

        const jwt = generateToken(newUser);
        return NextResponse.json(jwt);
    } catch (ex) {
        return NextResponse.json(ex);
    }
};
