import type { Request, Response } from "express";
import { AuthService } from "@auth/auth.service.js";

const authService = new AuthService();

export class AuthController {
    async signup(req: Request, res: Response) {
        try {
            const response = await authService.signup(req.body);
            return res.status(response.code).send({ message: response.message });
        } catch (err: any) {
            return res.status(err.code).send({ message: err.message });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const response = await authService.login(req.body);
            return res.status(response.code).send({ token: response.token });
        } catch (err: any) {
            return res.status(err.code).send({ message: err.message });
        }
    }
}