import { Router } from "express";
import UserController from "./users.controller.js";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/user/signup", (req, res) => userController.signup(req, res));

export default userRouter;