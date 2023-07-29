import "dotenv/config";
import { userRepository } from "@src/db.js";
import bcrypt from "bcrypt";
import jsonwebtoken, { Secret } from "jsonwebtoken";

export class AuthService {
    async signup(reqUsername: string, reqPassword: string) {
        const isRegistered = await userRepository.findOneBy({ username: reqUsername });
        if (isRegistered) throw "Username Already Registered!";
        const pwHash = <string>bcrypt.hashSync(reqPassword, 10);
        const newUser = userRepository.create({
            username: reqUsername,
            password: pwHash
        });
        await userRepository.insert(newUser);
        return `${reqUsername} Created!`;
    }
    
    async login(reqUsername: string, reqPassword: string) {
        const user = await userRepository.findOneBy({ username: reqUsername });
        if (!user) throw "Username Not Found!";
        const trimmedData = {
            username: user.username.trimEnd(),
            password: user.password.trimEnd()
        };
        const { username, password } = trimmedData;
        const isEqual = await bcrypt.compare(reqPassword, password);
        if (!isEqual) throw "Wrong Password!";
        const token = jsonwebtoken.sign({ username: username }, <Secret>process.env.SECRET, { expiresIn: "24h" });
        return token;
    }
}