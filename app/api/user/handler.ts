import { User } from "@prisma/client";
import { db } from "../../../lib/db";
import { hash } from "bcrypt";

export const getAllUsers = async () => {
    const users = await db.user.findMany();

    return users.map((user) => removeUserPassword(user));
};

export const createUser = async (user: User) => {
    const newUser = await db.user.create({
        data: {
            username: user.username,
            email: user.email,
            password: await generateHash(user.password),
        },
    });
    return removeUserPassword(newUser);
};

export const getUserById = async (id: number) => {
    const user = await db.user.findFirst({
        where: { id: id },
    });
    if (user) return removeUserPassword(user);
    return user;
};
export const getUserByUsername = async (username: string) => {
    return await db.user.findFirst({
        where: { username: username },
    });
};

export const generateHash = async (password: string) =>
    await hash(password, 10);

const removeUserPassword = (user: User) => {
    const { password, ...rest } = user;
    return rest;
};
