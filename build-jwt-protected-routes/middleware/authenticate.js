import { verifyToken } from "../utils/jwt.js";
import { isBlacklisted } from "../utils/token-blacklist.js";

export default function authenticate(req, res, next) {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "No token provided"
        });
    }

    const token = header.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "No token provided"
        });
    }

    if (isBlacklisted(token)) {
        return res.status(401).json({
            message: "Token has been invalidated. Log in again."
        })
    }

    const verify = verifyToken(token);
    if (!verify) {
        return res.status(401).json({
            message: "Invalid or expired token"
        })
    }

    req.user = verify

    next();
}
