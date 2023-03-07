import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EducationalProfile } from "./EducationalProfile";



@Entity({name:"EmployeeProfile"})
export class EmployeeProfile {



    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @CreateDateColumn({
        type:'timestamp'
    })
    dob:Date


    @Column()
    gender:string
    
    
    @Column()
    mobile:string


    @Column()
    disability:boolean


    @Column()
    languageproficiency:string



    @Column()
    martialStatus:string


    @Column()
    linkedinlink:string


    @Column()
    pan:string

    @Column()
    gst:string

    @Column()
    idproof:string

    @OneToOne(()=>EducationalProfile)
    educationProfile:EducationalProfile



    
}