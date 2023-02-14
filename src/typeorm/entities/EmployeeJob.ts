import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./Employee";
import { Job } from "./Job";

@Entity({name:"EmployeeJob"})

export class EmployeeJobHire {
   @PrimaryGeneratedColumn()
   id:number


   @ManyToOne(()=>Job,job=>job.id)
   job:Job


   @ManyToOne(()=>Employee,employee=>employee.id)
   employee:Employee

   @Column({default:false})
   hired:boolean
   
    
}