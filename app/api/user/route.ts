
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createUser, getAllUsers, getUserByUsername } from "./handler";

export const GET = async (req: NextRequest) => {
    const users = await getAllUsers();
    return NextResponse.json(users);
};

export const POST = async (req: NextRequest) => {
    try {
        const body: User = await req.json();
        const userExist = await getUserByUsername(body.username);

        if (userExist)
            return NextResponse.json(
                { error: "Username already existed" },
                { status: 500 }
            );
        const newUser = await createUser(body);
        return NextResponse.json(newUser);
    } catch (ex) {
        return NextResponse.json(ex);
    }
};
