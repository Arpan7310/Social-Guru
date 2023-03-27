import { City } from 'src/typeorm/entities/Cities';
import { Client } from 'src/typeorm/entities/Client';
import { Education } from 'src/typeorm/entities/Education';
import { Experience } from 'src/typeorm/entities/Experience';
import { Language } from 'src/typeorm/entities/Language';
import { Skill } from 'src/typeorm/entities/Skills';
import {CityDto} from '../dtos/City.dto';
import { SkillDto } from './Skill.dto';


export class createJobDto {
    
    jobprofile:string;
    worklocation:string
    total:number
    duration:string
    jobdescription:string;
    cities:City[];
    skills:Skill[];
    compensation:string
    client:Client
    startDate:Date
    endDate:Date;
    travel:string
    language:string
    natureofwork:string
    typeofwork:string
    deadline:Date
    contactname:string
    contactemail:string
    contactNumber:string
    education:Education[]
    role:string 
    experience:Experience[]
    engagementtype:string
    clientId:number
    years:number

}
