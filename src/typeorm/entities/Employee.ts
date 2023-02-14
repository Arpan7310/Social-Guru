import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn ,ManyToMany, JoinTable} from "typeorm";
import { Job } from "./Job";



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



    


}
    


