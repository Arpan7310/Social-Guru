import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createJobDto } from 'src/client/dtos/CreateJob.dto';
import { City } from 'src/typeorm/entities/Cities';
import { Job } from 'src/typeorm/entities/Job';
import { Skill } from 'src/typeorm/entities/Skills';
import { Repository } from 'typeorm';

@Injectable()
export class JobsService {



    constructor(@InjectRepository(Job) private jobsRepository:Repository<Job> ,@InjectRepository(City) private cityRepository:Repository<City>,
    @InjectRepository(Skill) private skillRepository:Repository<Skill>
    ){
       
    }


    async createJob(createJobDto:createJobDto) {
       let job=new Job();
       let cities=[],skills=[];
       job.duration=createJobDto.duration;
       job.jobprofile=createJobDto.jobprofile;
       job.openings=createJobDto.openings;
       job.responsibilities=createJobDto.responsibilities;
       job.stipendamountmax=createJobDto.stipendamountmax;
       job.stipendamountmin=createJobDto.stipendamountmin;
       job.workfromhome=createJobDto.workfromhome;
       job.openings=createJobDto.openings;
       job.stipendtype=createJobDto.stipendtype;
       

        for(let  i=0;i<createJobDto.cities.length;i++){
            let foundCity=await this.cityRepository.findOne({where:{city:createJobDto.cities[i]}});
        
          cities.push(foundCity) 
        }
      
   
        for(let  i=0;i<createJobDto.skills.length;i++){
            let foundSkill=await this.skillRepository.findOne({where:{skill:createJobDto.skills[i]}});
        
          skills.push(foundSkill)
        }
       
       job.cities=cities;
       job.skills=skills;

   
       

        return this.jobsRepository.save(job)

    
    }


    async getAllCity () {
      return this.cityRepository.find()
    }


    async getAllSkills () {
        return this.skillRepository.find()
    }
}
