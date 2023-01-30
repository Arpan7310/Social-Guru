import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
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
          throw new HttpException("message", 400, { cause: new Error("error occured") }) 
        } 
}
}
