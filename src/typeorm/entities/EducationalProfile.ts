import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AcademicCerficate } from "./AcademicCertificate";
import { EmployeeProfile } from "./EmployeeProfile";
import { ProfessionalCerficate } from "./ProfessionalCertificates";
import { Publications } from "./Publications";




@Entity({name:"EducationalProfile"})
export class EducationalProfile {


    @PrimaryGeneratedColumn()
    id:number

 
 
    @OneToMany(()=>Publications,(publications)=>{publications.educationalProfile})
    publications:Publications[]


    @OneToMany(()=>ProfessionalCerficate,(professionalCertificate)=>professionalCertificate.educationalProfile)
    professionalCertificates:ProfessionalCerficate[];


    @OneToMany(()=>AcademicCerficate,(academicCertificate)=>academicCertificate.educationalProfile)
    academicCertificate:AcademicCerficate[];


    @OneToOne(()=>EmployeeProfile,empProfile=>empProfile.educationProfile)
    employeeProfile:EmployeeProfile


}
