import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn ,ManyToMany, JoinTable,CreateDateColumn,OneToMany} from "typeorm";
import { AcademicCerficate } from "./AcademicCertificate";
import { Job } from "./Job";
import { ProfessionalCerficate } from "./ProfessionalCertificates";
import { Publications } from "./Publications";



@Entity({name:'employee'})
export class Employee {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    firstname:string

    @Column()
    lastname:string

    @Column() 
    email:string

    @Column()
    password:string


    @Column()
    phonenumber:string

    @Column({default:false})
    isVerified:boolean

    @Column()
    otp:string

    @CreateDateColumn({
        type:'timestamp'
    })
    dob:Date


    @Column()
    gender:string
    
    @Column()
    disability:boolean

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


    @Column()
    languageProficieny:string


    @Column()
    languageProficiencylevel:string





    @OneToMany(()=>Publications,(publications)=>publications.employee)
    publications:Publications[]


    @OneToMany(()=>ProfessionalCerficate,(professionalCertificate)=>professionalCertificate.employee)
    professionalCertificates:ProfessionalCerficate[];


    @OneToMany(()=>AcademicCerficate,(academicCertificate)=>academicCertificate.employee)
    academicCertificate:AcademicCerficate[];

    


}
    


