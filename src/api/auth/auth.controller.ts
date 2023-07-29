import type { Request, Response } from "express";
import { AuthService } from "@auth/auth.service.js";

const authService = new AuthService();
type bodyData = { username: string, password: string };

export class AuthController {
    async signup(req: Request, res: Response) {
        const { username, password }: bodyData = req.body;
        if (!username || !password) return res.status(400).send({ message: "Information Is Missing!" });
        if (password.length < 8) return res.status(400).send({ message: "Passwords Must Have At Least 8 Characters!" });
        try {
            const response = await authService.signup(username, password);
            return res.status(201).send({ message: response });
        } catch (err) {
            return res.status(409).send({ message: err });
        }
    }

    async login(req: Request, res: Response) {
        const { username, password }: bodyData = req.body;
        console.log(password);
        console.log(username);
        console.log(req.body);
        try {
            const response = await authService.login(username, password);
            return res.status(200).send({ token: response });
        } catch (err) {
            return res.status(401).send({ message: err });
        }
    }
}