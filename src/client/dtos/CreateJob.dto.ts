import {CityDto} from '../dtos/City.dto';
import { SkillDto } from './Skill.dto';



export class createJobDto {
    
    jobprofile:string;
    workfromhome:boolean
    openings:number;
    duration:number;
    responsibilities:string;
    cities:string[];
    skills:string[];
    stipendtype:string;
    stipendamountmin:number;
    stipendamountmax:number;

    
}
