import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity({name:"skill"})
export class Skill {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    skill:string


}