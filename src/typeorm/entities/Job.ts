import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import  {City} from './Cities'
import {Skill} from './Skills'

@Entity({name:"job"})


export class Job {


    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    jobprofile:string;
    
 
    @Column()
    workfromhome:boolean

    @Column()
    openings:number
     
    @Column()
    duration:number

    
    @Column()
    responsibilities:string;


    @ManyToMany(()=>City)
    @JoinTable()
    cities:City[];


    @ManyToMany(()=>Skill)
    @JoinTable()
    skills:Skill[];

    @Column()
    stipendtype:string

    @Column({
        default:0
    })
    stipendamountmin:number

    @Column({
        default:0
    })
    stipendamountmax:number

}