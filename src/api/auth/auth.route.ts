import { Router } from "express";
import { AuthController } from "@auth/auth.controller.js";

export const authRouter = Router();
const authController = new AuthController();

authRouter.post("/api/auth/signup", authController.signup);
authRouter.post("/api/auth/login", authController.login);