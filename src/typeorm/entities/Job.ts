import { Column, ColumnTypeUndefinedError, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import  {City} from './Cities'
import { Client } from "./Client";
import { Education } from "./Education";
import { Employee } from "./Employee";
import { Experience } from "./Experience";
import { Language } from "./Language";
import {Skill} from './Skills'

@Entity({name:"job"})


export class Job {


    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    jobprofile:string;
    
 
    @Column()
    worklocation:string

    @Column()
    total:number
     
    @Column()
    duration:string

    
    @Column()
    jobdescription:string;




    @ManyToMany(()=>City)
    @JoinTable()
    cities:City[];


    @ManyToMany(()=>Skill)
    @JoinTable()
    skills:Skill[];


   
    @Column()
    compensation:string



    @ManyToOne(()=>Client,client=>client.job)
     client:Client

     @CreateDateColumn({
        type:'timestamp',
      })
      startDate:Date

     @CreateDateColumn({
         type:'timestamp'
      })
     endDate:Date;

     @Column()
     travel:string

     @Column()
     language:string

     @Column() 
     natureofwork:string

     @Column()
     typeofwork:string

     @CreateDateColumn({
        type:'timestamp'
     })
     deadline:Date


    @Column()
    contactname:string


    @Column()
    contactemail:string


    @Column()
    contactNumber:string


    @ManyToMany(()=>Education)
    @JoinTable()
    education:Education[]


    @Column()
    role:string


    @OneToMany(()=>Experience,experience=>experience.job)

    experience:Experience[]


    @Column()
    engagementtype:string


    @Column()
    years:number


}