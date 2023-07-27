import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "@users/users.model.js";

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    database: "postgres",
    password: process.env.PASSWORD,
    synchronize: true,
    entities: [User]
});

AppDataSource.initialize()
.then(() => console.log("Db Connected"))
.catch((err) => console.log(err));

export default AppDataSource;