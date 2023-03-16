import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProfessionalProfile } from "./ProfessionalProfile";


@Entity({name:"EmployeAchievements"})
export class Achievements {


    @PrimaryGeneratedColumn()
    id:number

    @Column()
    achievement:string


    @ManyToOne(()=>ProfessionalProfile,(tp)=>tp.achievemnets)
    professionalProfile:ProfessionalProfile

}