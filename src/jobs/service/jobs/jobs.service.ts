import { HttpException, Inject, Injectable } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { InjectRepository } from '@nestjs/typeorm';
import { Http2ServerRequest } from 'http2';
import { createJobDto } from 'src/client/dtos/CreateJob.dto';
import { City } from 'src/typeorm/entities/Cities';
import { Client } from 'src/typeorm/entities/Client';
import { Job } from 'src/typeorm/entities/Job';
import { Skill } from 'src/typeorm/entities/Skills';
import { Repository } from 'typeorm';

@Injectable()
export class JobsService {



    constructor(@InjectRepository(Job) private jobsRepository:Repository<Job> ,@InjectRepository(City) private cityRepository:Repository<City>,
    @InjectRepository(Skill) private skillRepository:Repository<Skill>,@InjectRepository(Client) private clientRepository:Repository<Client>
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
     
       let foundClient=await this.clientRepository.findOne({where:{id:createJobDto.clientId}});
   
       if(!foundClient){
        throw new HttpException('Client Not Found',400)
       }

       job.client=foundClient;


       

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


    async findAllJobs () {
      let foundPosting=await this.jobsRepository.find();
      return foundPosting;
    }
}
