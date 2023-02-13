import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { CredentialsDto } from 'src/client/dtos/Credentials.dto';
import { VerifyOtpDto } from 'src/client/dtos/VerifyOtp.dto';
import { ClientService } from 'src/client/services/client/client.service';
import {CreateClientDto} from '../../dtos/CreateClient.dto'

@Controller('client')
export class ClientController {


    constructor(private clientService:ClientService) {}

    @Post()
    async createClient(@Body() createClientDto:CreateClientDto) {
        try {
              await this.clientService.createUser(createClientDto);
           return {
              message:"Client created successfully"
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
       await this.clientService.verifyOtp(verifyClientDto);
       return {
        message:"User verified successfully"
       }
         }
         catch(err) {
          throw new HttpException(err.message,err.status)
         }
      
  
    }


    @Post("/login")
    async signin(@Body() credentials:CredentialsDto) {
      try {
        
       await this.clientService.verifyClient(credentials);
         return {
          message:"Client login successful"
         }
         
      }

      catch(err){
        throw new HttpException(err.message,err.status)
      }
    }


    @Get("/find/")
   
    async getDetails(@Query("email") email:string ) {

      try{
      const res= this.clientService.findClient(email);
      return res;
      }
      catch(err){
        throw new HttpException(err.message,err.status)
      }
   
    }


    @Get("/postedJobs")

    async getPostedJobs (@Query("id") id:number ) {
      try {
         const res=this.clientService.findJobs(id);
         return res;
      }
      catch(err) {
        throw new HttpException(err.message,err.status)
      }
    }



    


    
}
