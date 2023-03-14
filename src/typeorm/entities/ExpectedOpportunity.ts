import { Column, ColumnTypeUndefinedError, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn,ManyToOne } from "typeorm";
import { Employee } from "./Employee";



@Entity({name:"ExpectedOpportunity"})



export class ExpectedOpportunity {

    @PrimaryGeneratedColumn()
    id:number


    @Column()
    hours:number

    @Column()
    days:number

    @Column()
    months:number


    @Column()
    desiredtype:string


    @Column()
    traveltype:string


    @Column()
    expectation:number


    @Column()
    location:string


    @Column()
    natureofassigment:string


    @ManyToOne(()=>Employee,e=>e.expectedOpportunity)
    @JoinColumn()
    employee:Employee



  


}
