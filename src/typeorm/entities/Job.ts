import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import  {City} from './Cities'
import { Client } from "./Client";
import { Employee } from "./Employee";
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



     @ManyToOne(()=>Client,client=>client.job)
     client:Client


    

    



}