import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
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


    @Get("/test")

    async test () {
      return {
        name :"mukherjee"
      }
    }


    
}
