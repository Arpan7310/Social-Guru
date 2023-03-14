import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity({name:"Responsibilities"})
export class Responsibilities {

    @PrimaryGeneratedColumn()
    id:number


    @Column()
    responsibility:string

}