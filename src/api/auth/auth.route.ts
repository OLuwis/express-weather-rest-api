import { Router } from "express";
import { AuthController } from "@auth/auth.controller.js";

export const authRouter = Router();
const { signup, login } = new AuthController();

authRouter.post("/api/auth/signup", signup);
authRouter.post("/api/auth/login", login);