import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity({name:"author"})
export class Author {

    @PrimaryGeneratedColumn()
    id:number


    @Column()
    author:string;
}