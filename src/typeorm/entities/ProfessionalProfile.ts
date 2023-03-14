import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Achievements } from "./Achievements";
import { Employee } from "./Employee";
import { Responsibilities } from "./Responsibilities";


@Entity({name:"ProfessionalProfile"})
export class ProfessionalProfile {

    @PrimaryGeneratedColumn()
    id:number;


    @Column()
    type:string

    @Column()
    organization:string



    @Column()
    duration:number

    @Column()
    levelOfexpertise:string



    @Column()
    geography:string

  
    @OneToMany(()=>Achievements,(achievements)=>achievements.professionalProfile)
    achievemnets:Achievements[]



    @ManyToMany(()=>Responsibilities)
    @JoinTable()
    responsibilities:Responsibilities[]
    
  


    @Column()
    sampleofwork:string

    @Column()
    value:string

    @Column()
    income:number
    
    @Column()
    feescharged:number


    @ManyToOne(()=>Employee,e=>e.professionalProfile)
    @JoinColumn()
    employee:Employee


}