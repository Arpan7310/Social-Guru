import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Job } from "./Job";



@Entity({name:"Qualification"})
export  class Education {

    @PrimaryGeneratedColumn()
    id:number
  
    @Column({})
    qualification:string
    

  
}