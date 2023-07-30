import "dotenv/config";
import { userRepository } from "@src/db.js";
import bcrypt from "bcrypt";
import jsonwebtoken, { Secret } from "jsonwebtoken";
import { AuthHelper } from "@auth/auth.helper.js";

const authHelper = new AuthHelper();

export class AuthService {
    async signup({ username, password }: { username: string, password: string }) {
        authHelper.validate({ username, password });
        const isUser = await userRepository.findOneBy({ username: username });
        if (isUser) throw { code: 409, message: "Username Already Registered!" };
        const hash = <string>bcrypt.hashSync(password, 10);
        const newUser = userRepository.create({
            username: username,
            password: hash
        });
        await userRepository.insert(newUser);
        return { code: 201, message: `${username} Created!`};
    }
    
    async login({ username, password }: { username: string, password: string }) {
        authHelper.validate({ username, password });
        const user = await userRepository.findOneBy({ username: username });
        if (!user) throw { code: 401, message: "Username Not Found!" };
        const formattedData = authHelper.format({ username: user.username, password: user.password });
        const isEqual = await bcrypt.compare(password, formattedData.password);
        if (!isEqual) throw { code: 401, message: "Wrong Password!" };
        const token = jsonwebtoken.sign({ username: user.username, user_id: user.user_id }, <Secret>process.env.SECRET, { expiresIn: "24h" });
        return { code: 200, token: token };
    }
}