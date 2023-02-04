import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



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
    


