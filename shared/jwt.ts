import jwt from "jsonwebtoken";

const secret: string = "your_secret_key";

export const generateToken = (payload: any) => {
    return jwt.sign(payload, secret, { expiresIn: "1h" });
};

export const decodeToken = (token: any) => {
    try {
        const decoded = jwt.decode(token);
        return decoded;
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};


