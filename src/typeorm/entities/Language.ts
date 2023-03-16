import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:"language"})
export class Language {
    @PrimaryGeneratedColumn()
    id:number;


    @Column()
    language:string
}