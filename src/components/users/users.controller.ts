import type { Request, Response } from "express";
import UserService from "@users/users.service.js";

const userService = new UserService();
type signupData = { username: string, password: string };

class UserController {
    signup(req: Request, res: Response) {
        const { username, password }: signupData = req.body;
        if (!username || !password) return res.status(400).send({ message: "Information Is Missing!" });
        if (password.length < 8) return res.status(400).send({ message: "Passwords Must Have At Least 8 Characters!" });
        userService.signup(username, password)
        .then(msg => res.status(201).send({ message: msg }))
        .catch(err => res.status(409).send({ message: err }))
    }
}

export default UserController;