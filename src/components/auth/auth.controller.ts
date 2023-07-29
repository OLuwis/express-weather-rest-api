import type { Request, Response } from "express";
import { AuthService } from "@auth/auth.service.js";

const authService = new AuthService();
type bodyData = { username: string, password: string };

export class AuthController {
    signup(req: Request, res: Response) {
        const { username, password }: bodyData = req.body;
        if (!username || !password) return res.status(400).send({ message: "Information Is Missing!" });
        if (password.length < 8) return res.status(400).send({ message: "Passwords Must Have At Least 8 Characters!" });
        return authService.signup(username, password)
        .then(msg => res.status(201).send({ message: msg }))
        .catch(err => res.status(409).send({ message: err }))
    }
}