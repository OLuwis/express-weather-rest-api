import AppDataSource from "@src/db.js";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
class User {
    @PrimaryGeneratedColumn()
    user_id: number

    @Column({ length: 30, type: "char" })
    username: string

    @Column({ length: 300, type: "char" })
    password: string
};

const userRepository = AppDataSource.getRepository(User);

export { User, userRepository };