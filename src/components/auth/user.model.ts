import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "Users", synchronize: true })
export class User {
    @PrimaryGeneratedColumn()
    user_id: number

    @Column({ length: 50, type: "char" })
    username: string

    @Column({ length: 300, type: "char" })
    password: string
}