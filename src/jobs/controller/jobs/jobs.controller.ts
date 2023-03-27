import { Body, Controller, Get, HttpException, Post, Query, Req, UseGuards } from '@nestjs/common';
import { applyJobDto } from 'src/client/dtos/ApplyJobDto.dto';
import { createJobDto } from 'src/client/dtos/CreateJob.dto';
import { JobsService } from 'src/jobs/service/jobs/jobs.service';
import { Request } from '@nestjs/common';
import { url } from 'inspector';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('jobs')

export class JobsController {


    constructor(private jobsService:JobsService){
     
    }


    @Post("/save")
    async createJobs(@Body() createJobs:createJobDto){
        return this.jobsService.createJob(createJobs);
        
    }


    @Get("/city")
    async getAllCity(){
        const res=await this.jobsService.getAllCity();
        return res
    }


    @Get("/skills")

    async getAllSkills(){
        const res=await this.jobsService.getAllSkills();
        return res
    }

   
    @Get("/findAll")
     async getAllJobs (@Req() req:Request) {
       
        return this.jobsService.findAllJobs()
    }


    @Post("/hire") 
   
    async hireEmployee(@Body() hireEmployee:applyJobDto) {
        try {
          const res= await this.jobsService.hireEmployee(hireEmployee);
          return res;
        }
        catch(err) {
            throw new HttpException(err.message,err.status);
        }
    }


    @Get("/findEmployees") 
    async findEmployees (@Query("jobId") jobId:number ){
       const res=await  this.jobsService.findEmployees(jobId);
       return res;
    }
    
       
    @Get("/findQualifications")

  
     async findQualifications() {

        return this.jobsService.findQualifications();
    }


    


   
}

