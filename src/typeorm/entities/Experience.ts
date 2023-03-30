import { Column, Entity, EntityMetadata, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { JoinAttribute } from "typeorm/query-builder/JoinAttribute";
import { Job } from "./Job";


@Entity({name:"Experience"})
export class Experience {


    @PrimaryGeneratedColumn()
    id:number


    @Column()
    experience:string

    @ManyToOne(()=>Job,job=>job.experience)
    @JoinColumn()
    job:Job


   
   

  
    
}