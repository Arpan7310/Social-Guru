import { table } from 'console';
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'


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

}