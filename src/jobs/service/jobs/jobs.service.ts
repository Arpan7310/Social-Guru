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
       let foundClient=await this.clientRepository.findOne({where:{id:createJobDto.clientId}});
   
       if(!foundClient){
        throw new HttpException('Client Not Found',400)
       }
       job.duration=createJobDto.duration;
       job.jobprofile=createJobDto.jobprofile;
       job.openings=createJobDto.openings;
       job.responsibilities=createJobDto.responsibilities;
       job.stipendamountmax=createJobDto.stipendamountmax;
       job.stipendamountmin=createJobDto.stipendamountmin;
       job.workfromhome=createJobDto.workfromhome;
       job.openings=createJobDto.openings;
       job.stipendtype=createJobDto.stipendtype;
     
   

       job.client=foundClient;
       job.cities=createJobDto.cities;
       job.skills=createJobDto.skills;


      

   

        
  

   
       

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
