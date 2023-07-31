import type { Request, Response } from "express";
import { AuthService } from "@auth/auth.service.js";

const { signup, login } = new AuthService();

export class AuthController {
    async signup(req: Request, res: Response) {
        try {
            const response = await signup(req.body);
            return res.status(response.code).send({ message: response.message });
        } catch (err: any) {
            return res.status(err.code).send({ message: err.message });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const response = await login(req.body);
            return res.status(response.code).send({ token: response.token });
        } catch (err: any) {
            return res.status(err.code).send({ message: err.message });
        }
    }
}