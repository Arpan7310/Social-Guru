import { Body, Controller, Get, HttpException, Post,Query } from '@nestjs/common';
import { AcademicProfileDto } from 'src/client/dtos/AcademicProfileDto.dto';
import { applyJobDto } from 'src/client/dtos/ApplyJobDto.dto';
import { CertificationsDto } from 'src/client/dtos/CeritificateDto.dto';
import { CreateEmployeeDto } from 'src/client/dtos/CreateEmployee.dto';
import { CredentialsDto } from 'src/client/dtos/Credentials.dto';
import { EmployeeBasicProfileDto } from 'src/client/dtos/EmployeeBasicProfile.dto';
import { PublicationsDto } from 'src/client/dtos/PublicationsDto.dto';
import { VerifyOtpDto } from 'src/client/dtos/VerifyOtp.dto';
import { EmployeeService } from 'src/employee/service/employee/employee.service';

@Controller('employee')
export class EmployeeController {

    constructor(private employeeService:EmployeeService){

    }


    @Post()
    async createClient(@Body() createEmployeeDto:CreateEmployeeDto) {
        try {
              await this.employeeService.createEmployee(createEmployeeDto);
              return {
              message:"Employee created successfully"
            }
         }
        catch(err){
         console.log(err);
         throw new HttpException(err.message, err.status) 
        } 
}

    @Post("/verify")
    async verifyClient(@Body() verifyClientDto:VerifyOtpDto) {
         try {
       await this.employeeService.verifyOtp(verifyClientDto);
       return {
        message:"Employee verified successfully"
       }
         }
         catch(err) {
          throw new HttpException(err.message,err.status)
         }
      
  
    }


    @Post("/login")
    async signin(@Body() credentials:CredentialsDto) {
      try {
        
       await this.employeeService.verifyEmployee(credentials);
         return {
          message:"Employee login successful"
         }
         
      }

      catch(err){
        throw new HttpException(err.message,err.status)
      }
    }


    @Get("/test")

    async test() {
      return {
        message:"ui"
      }
    }


    @Get("/find/")
   
    async getDetails(@Query("email") email:string ) {

      try{
      const res= this.employeeService.findEmployee(email);
      return res;
      }
      catch(err){
        throw new HttpException(err.message,err.status)
      }

   
    }


    @Post("/apply")

    async employee(@Body() applyJobDto:applyJobDto) {
      try {
     const res=  await  this.employeeService.applyJob(applyJobDto);

     return {
      message:"Successfully applied to job"
     }
      }
      catch(err) {
        throw new HttpException(err.message,err.status)
      }
    }


    @Get("/findAppliedJobs")

    async getAppliedJobs(@Query("employeeId")  employeeId:number ){
      try {
        const res=  await  this.employeeService.findAppliedJobs(employeeId);
        return res;
         }
         catch(err) {
           throw new HttpException(err.message,err.status)
         }
    }



    @Post("/saveProfile")
    async createProfile (@Body() createProfileDto:EmployeeBasicProfileDto ) {
      try {
        return this.employeeService.createProfile(createProfileDto);
      }
      catch (err){
        throw new HttpException(err.message,err.status)
      }
    }


    @Post("/saveAcademicProfile")
    async saveAcademicProfile (@Body() academicProfile:AcademicProfileDto) {

      try {
         return this.employeeService.createAcademicProfile(academicProfile);
      }
      catch(err) {
        throw new HttpException(err.message,err.status)
      }
    }



    @Post("/saveCertification")

    async saveCertifications(@Body() certificationsDto:CertificationsDto) {
   
      try {
         return this.employeeService.createCertificate(certificationsDto)
        
      }
      catch (err) {
            throw new HttpException(err.message,err.status)
      }
    }



    @Post ("/savePublications")

    async createPublications(@Body() createPublication:PublicationsDto) {

      try {

        return this.employeeService.createPublications(createPublication)
      }
      catch(err) {
        throw new HttpException(err.message,err.status)
      }
    }



   
   
    


}
