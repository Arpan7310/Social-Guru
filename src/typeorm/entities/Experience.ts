import { Column, Entity, EntityMetadata, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Job } from "./Job";


@Entity({name:"Experience"})
export class Experience {


    @PrimaryGeneratedColumn()
    id:number


    @Column()
    experience:string



   
   

  
    
}