import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Job } from "./Job";



@Entity({name:"educationqualification"})
export  class Education {

    @PrimaryGeneratedColumn()
    id:number
  
    @Column()
    educationqualification:string


  
}