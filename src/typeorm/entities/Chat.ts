import { timestamp } from "rxjs";
import internal from "stream";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { Client } from "./Client";
import { Employee } from "./Employee";


@Entity({name:"chat"})

export class Chat {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    from:number

    @Column()
    to:number

    @Column()
    message:string


    @CreateDateColumn({
        type:'timestamp'
    })
    timestamp:Date

    
    


}
