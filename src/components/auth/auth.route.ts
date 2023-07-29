import { Router } from "express";
import { AuthController } from "@auth/auth.controller.js";

export const authRouter = Router();
const authController = new AuthController();

authRouter.post("/user/signup").use(authController.signup);