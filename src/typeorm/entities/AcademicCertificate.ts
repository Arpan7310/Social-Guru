import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EducationalProfile } from "./EducationalProfile";




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


    @ManyToOne(()=>EducationalProfile,educationProfile=>educationProfile.academicCertificate)
    educationalProfile:EducationalProfile






  

}