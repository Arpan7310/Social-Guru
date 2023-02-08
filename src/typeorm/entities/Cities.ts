import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:"city"})
export class City {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    city:string;

    @Column()
    state:string;
}