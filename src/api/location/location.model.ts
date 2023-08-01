import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Locations" })
export class Location{
    @PrimaryGeneratedColumn({ type: "int" })
    location_id: number

    @Column({ type: "int" })
    @Index()
    user_id: number

    @Column({ type: "numeric" })
    lat: number

    @Column({ type: "numeric" })
    lon: number

    @Column({ length: 100, type: "varchar" })
    city: string

    @Column({ length: 100, type: "varchar" })
    state: string

    @Column({ length: 100, type: "varchar" })
    country: string
};