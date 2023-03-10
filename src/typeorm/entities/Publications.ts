import { Column, CreateDateColumn, Entity, EntityMetadata, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Author } from "./Authors";
import { Employee } from "./Employee";


@Entity({name:'publications'})
export class Publications {


    @PrimaryGeneratedColumn()
    id:number

 
    @CreateDateColumn({
        type:'timestamp'
    })
    publishedat:Date;


    @Column()
    publisher:string

    @Column()
    topic:string

    @Column()
    book:string


    @ManyToOne(()=>Employee,employee=>employee.publications)
    employee:Employee


}