export class AuthHelper {
    validate({ username, password }: { username: string, password: string }) {
        if (!username || !password) throw { code: 400, message: "Information Is Missing!" };
        if (password.length < 8) throw { code: 400, message: "Passwords Must Have At Least 8 Characters!" };
    }
}