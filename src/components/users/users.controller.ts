import type { Request, Response } from "express";
import UserService from "@users/users.service.js";

const userService = new UserService();

class UserController {
    async signup(req: Request, res: Response) {
        const { reqUsername, reqPassword }: { reqUsername: string, reqPassword: string } = await req.body;
        if (!reqUsername || !reqPassword) return res.status(400).send({ message: "Information Missing!" });
        if (reqPassword.length < 8) return res.status(400).send({ message: "Passwords Must Have At Least 8 Characters!" });
        
    };
};

export default UserController;