import express from "express"
import { findByEmail, readUsers, writeUsers } from "../utils/db.js"
import bcrypt from "bcryptjs"
import { randomUUID } from "crypto"
import { signToken } from "../utils/jwt.js"
import authenticate  from "../middleware/authenticate.js"
import { blacklistToken } from "../utils/token-blacklist.js"

const router = express.Router();

router.get("/profile", authenticate, (req, res) => {
    res.json({
        user: req.user
    })
})

router.post("/register", async (req, res) => {
    const users = readUsers();

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        })
    }

    const verify = await findByEmail(email);
    if (verify) {
        return res.status(409).json({
            message: "Email already in use"
        })
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        "id": randomUUID(),
        "email": email,
        "passwordHash": passwordHash,
        "role": "user"
    }

    users.push(user);
    writeUsers(users)

    const payloads = {
        id: user.id,
        email: user.email,
        role: user.role
    };

    const token = signToken(payloads);

    return res.status(201).json({
        message: "Registration successful",
        token: token
    });
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }

    const user = await findByEmail(email);
    if (!user) {
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }


    const match = await bcrypt.compare(password, user.passwordHash);

    if (match) {
        const payloads = {
            id: user.id,
            email: user.email,
            role: user.role
        };

        const token = signToken(payloads);

        return res.status(200).json({
            message: "Registration successful",
            token: token
        });
    } else {
        return res.status(401).json({
            message: "Invalid credentials"
        });
    }
})

router.post("/logout", authenticate, (req,res)=>{
    const header = req.headers.authorization;
    const token = header.split(' ')[1];
    blacklistToken(token);

    return res.json({
        message:"Logged out successfully"
    })
})

export default router;