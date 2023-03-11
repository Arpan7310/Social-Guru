import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn ,ManyToMany, JoinTable,CreateDateColumn,OneToMany, IsNull} from "typeorm";
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
       
    }
)
    dob:Date


    @Column({
        nullable:true
    })
    gender:string
    
    @Column({
        nullable:true
    })
    disability:boolean

    @Column({
        nullable:true
    })
    martialStatus:string


    @Column({
        nullable:true
    })
    linkedinlink:string


    @Column({
        nullable:true
    })
    pan:string

    @Column({
        nullable:true
    })
    gst:string

    @Column({
        nullable:true
    })
    idproof:string


    @Column({nullable:true})
    languageProficieny:string


    @Column({
        nullable:true
    })
    languageProficiencylevel:string





    @OneToMany(()=>Publications,(publications)=>publications.employee)
    publications:Publications[]


    @OneToMany(()=>ProfessionalCerficate,(professionalCertificate)=>professionalCertificate.employee)
    professionalCertificates:ProfessionalCerficate[];


    @OneToMany(()=>AcademicCerficate,(academicCertificate)=>academicCertificate.employee)
    academicCertificate:AcademicCerficate[];

    


}
    


