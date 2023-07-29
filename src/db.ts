import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "@auth/user.model.js";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    database: "postgres",
    password: process.env.PASSWORD,
    synchronize: true,
    entities: [User]
});

export const userRepository = AppDataSource.getRepository(User);