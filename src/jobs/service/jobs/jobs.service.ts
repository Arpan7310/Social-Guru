import { HttpException, Inject, Injectable } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { InjectRepository,InjectDataSource } from '@nestjs/typeorm';
import { create } from 'domain';

import { Http2ServerRequest } from 'http2';
import { applyJobDto } from 'src/client/dtos/ApplyJobDto.dto';
import { createJobDto } from 'src/client/dtos/CreateJob.dto';
import { City } from 'src/typeorm/entities/Cities';
import { Client } from 'src/typeorm/entities/Client';
import { Education } from 'src/typeorm/entities/Education';
import { Employee } from 'src/typeorm/entities/Employee';
import { EmployeeJobHire } from 'src/typeorm/entities/EmployeeJob';
import { Experience } from 'src/typeorm/entities/Experience';
import { Job } from 'src/typeorm/entities/Job';
import { Skill } from 'src/typeorm/entities/Skills';
import { Not, Repository,DataSource } from 'typeorm';

@Injectable()
export class JobsService {



    constructor(@InjectRepository(Job) private jobsRepository:Repository<Job> ,@InjectRepository(City) private cityRepository:Repository<City>,
    @InjectRepository(Skill) private skillRepository:Repository<Skill>,@InjectRepository(Client) private clientRepository:Repository<Client>,
    @InjectRepository(Employee) private employeeRepository:Repository<Employee>,
    @InjectRepository(EmployeeJobHire) private empJobHireRepository:Repository<EmployeeJobHire>,
    @InjectDataSource() private dataSource:DataSource,
    @InjectRepository(Education) private qualificationRepository:Repository<Education>,
    @InjectRepository(Experience) private experienceRepository:Repository<Experience>
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
       job.compensation=createJobDto.compensation
       job.contactNumber=createJobDto.contactNumber
       job.contactemail=createJobDto.contactemail
       job.contactname=createJobDto.contactemail
       job.deadline=createJobDto.deadline
       job.duration=createJobDto.duration
       job.education=createJobDto.education
       job.engagementtype=createJobDto.engagementtype
       job.jobdescription=createJobDto.jobdescription
       job.jobprofile=createJobDto.jobprofile
       job.natureofwork=createJobDto.natureofwork
       job.role=createJobDto.role
       job.total=createJobDto.total
       job.travel=createJobDto.travel
       job.typeofwork=createJobDto.typeofwork
       job.worklocation=createJobDto.worklocation
       job.client=foundClient;
       job.years=createJobDto.years;
       job.cities=createJobDto.cities;
       job.skills=createJobDto.skills;
       job.startDate=createJobDto.startDate;
       job.endDate=createJobDto.endDate;
       job.language=createJobDto.language;
    

  
      let savedJob=await this.jobsRepository.save(job);

      createJobDto.experience.forEach( async el=>{
        let experience= new Experience();
        experience.experience=el.experience
        await this.experienceRepository.save(experience)
      })
      return savedJob;
    
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
        
              }}
      )
      return foundPosting;
    }

   
    async hireEmployee(applyJobDto:applyJobDto) {
     
    let foundEmp= await  this.employeeRepository.findOne({
      where:{
        id:applyJobDto.employeeId
      }
     })

    if(!foundEmp) {
      throw new HttpException("Employee not found",400)
    }
 


   


    let foundJob=await this.jobsRepository.findOne({
      where:{
        id:applyJobDto.jobId
      }
    })



     if(!foundJob) {
      throw new HttpException("Opportunity not found",400)
    }

    if(foundJob.total>0){
    foundJob.total=foundJob.total-1;

    const foundEmpJobHire=await this.dataSource.query("Select * from EmployeeJob where jobId=? and employeeId=?",[applyJobDto.jobId,applyJobDto.employeeId]);
 
    if(foundEmpJobHire.length===0){
        throw new HttpException("Employee has not applied to this job yet",500)
      }

      if(foundEmpJobHire[0].hired){
        throw new HttpException("Employee already hired",500)
      }
    
       foundEmpJobHire[0].hired=true;
      
    return this.empJobHireRepository.save(foundEmpJobHire[0]);
    }
    else {
      throw new HttpException("No openings are present",500)
    }
    }


  
    async findEmployees (jobId:number) {


      const res= await this.dataSource.query("Select * from employee left join  EmployeeJob on employee.id=EmployeeJob.employeeId where jobId=?",[jobId]);
      return res;
    }



    async findQualifications () {
      return this.qualificationRepository.find()
    }


}
