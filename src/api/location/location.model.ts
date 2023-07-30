import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Locations" })
export class Location{
    @PrimaryGeneratedColumn()
    location_id: number

    @Column()
    @Index()
    user_id: number

    @Column({ type: "double" })
    lat: number

    @Column({ type: "double" })
    lon: number

    @Column({ length: 300, type: "varchar" })
    name: string

    @Column({ length: 300, type: "varchar" })
    state: string

    @Column({ length: 300, type: "varchar" })
    country: string
};