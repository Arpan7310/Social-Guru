import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EducationalProfile } from "./EducationalProfile";


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


    @ManyToOne(()=>EducationalProfile,(educationalProfile)=>educationalProfile.professionalCertificates)
    educationalProfile:EducationalProfile





}