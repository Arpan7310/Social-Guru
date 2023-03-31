import { table } from 'console';
import {Column, Entity, PrimaryGeneratedColumn,OneToMany, JoinColumn} from 'typeorm'
import { Job } from './Job';


@Entity({name:"client"})
export class Client {

    @PrimaryGeneratedColumn()
    id:number;
  
    @Column()
    organizationname:string

    @Column()
    sector:string

    @Column()
    email:string

    @Column()
    password:string

    @Column()
    firstname:string

    @Column()
    lastname:string

    @Column()
    phonenumber:string

    @Column()
    otp:string;

    @Column({default:false})
    isVerified:boolean

    @OneToMany(()=>Job,job=>job.client)
    job:Job[]


    @Column({
        nullable:true
    })
    briefofbusiness:string



    @Column({
        nullable:true
    })
    location:string


    @Column({
        nullable:true
    })
    authorizedPerson:string


 
}