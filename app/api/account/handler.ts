import { compare } from "bcrypt";
import { use } from "react";
import { getUserByUsername } from "../user/handler";
import { generateToken } from "@/shared/jwt";

export const accountLogin = async ({
    username,
    password,
}: {
    username: string;
    password: string;
}) => {
    const user = await getUserByUsername(username);
    console.log(user);
    if (!user) {
        return null;
    }
    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) return null;

    const { password: userPassword, ...rest } = user;
    const token = generateToken(rest);

    return token;
};
