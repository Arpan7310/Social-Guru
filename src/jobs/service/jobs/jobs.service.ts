import { HttpException, Inject, Injectable } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { InjectRepository,InjectDataSource } from '@nestjs/typeorm';
import { Http2ServerRequest } from 'http2';
import { applyJobDto } from 'src/client/dtos/ApplyJobDto.dto';
import { createJobDto } from 'src/client/dtos/CreateJob.dto';
import { City } from 'src/typeorm/entities/Cities';
import { Client } from 'src/typeorm/entities/Client';
import { Employee } from 'src/typeorm/entities/Employee';
import { Job } from 'src/typeorm/entities/Job';
import { Skill } from 'src/typeorm/entities/Skills';
import { Not, Repository } from 'typeorm';

@Injectable()
export class JobsService {



    constructor(@InjectRepository(Job) private jobsRepository:Repository<Job> ,@InjectRepository(City) private cityRepository:Repository<City>,
    @InjectRepository(Skill) private skillRepository:Repository<Skill>,@InjectRepository(Client) private clientRepository:Repository<Client>,
    @InjectRepository(Employee) private employeeRepository:Repository<Employee>,
   
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
   
      let foundPosting=await this.jobsRepository.find({  
           relations:{
          cities:true,
          skills:true,
          client:true,
          employees:true
              }}
      )
      return foundPosting;
    }


    async findJob(clientId:number) {

 
      const res=this.jobsRepository.findOne({
        where:{
        client:{
          id:clientId
        }
      }
      })
    }


    async applyToJob(hireJobParams:applyJobDto) {
     
      let foundJob=await this.jobsRepository.findOne({
        where:{
          id:hireJobParams.jobId
          },
          
        })

        let foundEmployee=await this.employeeRepository.findOne({
          where:{
            id:hireJobParams.employeeId
          }
        })


        if(foundJob.openings==0) {
          throw new HttpException("All positions have been filled",400)
        }
        foundJob.openings=foundJob.openings-1;
      
        await this.jobsRepository.save(foundJob);
        await  this.employeeRepository.save(foundEmployee);



    }


}
