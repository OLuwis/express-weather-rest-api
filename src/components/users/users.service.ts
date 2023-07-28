import { User } from "@src/components/users/users.model.js";
import AppDataSource from "@src/db.js";
import bcrypt from "bcrypt";

const userRepository = AppDataSource.getRepository(User);

class UserService {
    async signup(username: string, password: string) {
        const isRegistered = await userRepository.findOneBy({ username: username }).then(user => user ? true : false).catch(err => console.log(err));
        if (isRegistered) throw "Username Already Registered!";
        const userHash = <string|void>bcrypt.hashSync(password, 10);
        const newUser = !userHash ? undefined : userRepository.create({
            username: username,
            password: userHash
        });
        if (newUser) await userRepository.insert(newUser);
        return `${username} Created!`;
    }
}

export default UserService;