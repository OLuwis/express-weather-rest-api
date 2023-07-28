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

export default AppDataSource;