import { Body, Controller, Get, Post } from '@nestjs/common';
import { createJobDto } from 'src/client/dtos/CreateJob.dto';
import { JobsService } from 'src/jobs/service/jobs/jobs.service';

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
}

