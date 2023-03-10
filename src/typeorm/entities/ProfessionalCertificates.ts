import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./Employee";


@Entity({name:"certificates"})
export class ProfessionalCerficate {

    @PrimaryGeneratedColumn()
    id:number


    @Column()
    course:string

    @Column()
    institute:string


    @Column()
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