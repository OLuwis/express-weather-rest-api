import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

@Entity({ name: "Users" })
export class User {
    @PrimaryGeneratedColumn()
    user_id: number

    @Column({ length: 50, type: "varchar" })
    @Index()
    username: string

    @Column({ length: 100, type: "varchar" })
    password: string
}