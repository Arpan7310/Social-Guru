import { Achievements } from "../entities/Achievements"
import { Responsibilities } from "../entities/Responsibilities"
import { Employee } from "../entities/Employee"

export class ProfessionalProfileDto {
   



    type:string
    organization:string
    duration:number
    levelOfexpertise:string
    geography:string
    achievements:string[]
    responsibilities:Responsibilities[]
    sampleofwork:string
    value:string
    income:number
    feescharged:number
    employeeId:number


}