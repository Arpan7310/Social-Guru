import { EntityMetadata } from "typeorm";



export class AcademicProfileDto {
    educationalQualification:string
    course:string
    specialisation:string
    institute:string
    coursestart:Date
    courseend:Date
    percentage:number
    employeeId:number
}