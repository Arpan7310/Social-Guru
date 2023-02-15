import { City } from 'src/typeorm/entities/Cities';
import { Skill } from 'src/typeorm/entities/Skills';
import {CityDto} from '../dtos/City.dto';
import { SkillDto } from './Skill.dto';



export class createJobDto {
    
    jobprofile:string;
    workfromhome:boolean
    openings:number;
    duration:number;
    responsibilities:string;
    cities:City[];
    skills:Skill[];
    stipendtype:string;
    stipendamountmin:number;
    stipendamountmax:number;
    clientId:number;
    startDate:Date;
    endDate:Date;

    
}
