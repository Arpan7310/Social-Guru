import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./Employee";




@Entity({name:"AcademicCertificate"})
export class AcademicCerficate {

    @PrimaryGeneratedColumn()
    id:number;


    @Column()
    educationalQualification:string


    @Column()
    course:string

    @Column()
    specialisation:string

    @Column()
    institute:string


    @Column()
    @CreateDateColumn({
        type:'timestamp'
    })
    coursestart:Date


    @Column()
    @CreateDateColumn({
        type:'timestamp'
    })
    courseend:Date


    @Column()
    percentage:number


    @ManyToOne(()=>Employee,employee=>employee.academicCertificate)
    employee:Employee






  

}