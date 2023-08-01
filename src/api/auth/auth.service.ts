import "dotenv/config";
import { userRepo } from "@src/db.js";
import bcrypt from "bcrypt";
import jsonwebtoken, { Secret } from "jsonwebtoken";
import { AuthHelper } from "@auth/auth.helper.js";

const { validate } = new AuthHelper();

export class AuthService {
    async signup({ username, password }: { username: string, password: string }) {
        validate({ username, password });
        const isUser = await userRepo.findOneBy({ username: username });
        if (isUser) throw { code: 409, message: "Username Already Registered!" };
        const hash = <string>bcrypt.hashSync(password, 10);
        const newUser = userRepo.create({
            username: username,
            password: hash
        });
        await userRepo.insert(newUser);
        return { code: 201, message: `${username} Created!`};
    }
    
    async login({ username, password }: { username: string, password: string }) {
        validate({ username, password });
        const user = await userRepo.findOneBy({ username: username });
        if (!user) throw { code: 401, message: "Username Not Found!" };
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) throw { code: 401, message: "Wrong Password!" };
        const token = jsonwebtoken.sign({ username: user.username, user_id: user.user_id }, <Secret>process.env.SECRET, { expiresIn: "24h" });
        return { code: 200, token: token };
    }
}