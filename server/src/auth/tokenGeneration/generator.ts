import jwt from "jsonwebtoken";
import config from "./config";

const tokenGenerator = (id: string, roles: string[]): string => {
    const payload = { id, roles };
    return jwt.sign(payload, config.secret as any, { expiresIn: "1h" });
};

export default tokenGenerator;