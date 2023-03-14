import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./Employee";



@Entity({name:"EmployeeAwards"})
export class EmployeeAwards {



    @PrimaryGeneratedColumn()
    id:number


    @Column()
    name:string

    @Column()
    recognisedby:string


    @Column()
    @CreateDateColumn({
        type:'timestamp'
    })
    date:Date

    @Column()
    levelofaward:string


    @ManyToOne(()=>Employee,e=>e.employeeAwards)
    @JoinColumn()
    employee:Employee


}