import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./Employee";


@Entity({name:"certificates"})
export class ProfessionalCerficate {

    @PrimaryGeneratedColumn()
    id:number


    @Column({nullable:true})
    course:string

    @Column({nullable:true})
    institute:string


    @Column({nullable:true})
    grade:number


    @CreateDateColumn({
       type:'timestamp'
    })
    startDate:Date

    @CreateDateColumn({
        type:'timestamp'
    })
    endDate:Date


    @ManyToOne(()=>Employee,(employee)=>employee.professionalCertificates)
    employee:Employee
    




}