import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { CreateEmployeeDto } from 'src/client/dtos/CreateEmployee.dto';
import { CredentialsDto } from 'src/client/dtos/Credentials.dto';
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







}
