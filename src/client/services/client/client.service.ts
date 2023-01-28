import { HttpException, HttpStatus, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClientDto } from 'src/client/dtos/CreateClient.dto';
import { Client } from 'src/typeorm/entities/Client';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {

    constructor(@InjectRepository(Client) private clientRepository:Repository<Client> ) {
     
    }

   async createUser(createUserParams:CreateClientDto){

        
          let foundUser= await this.clientRepository.findOne({where:{email:createUserParams.email}});
           console.log(foundUser);
          if(!foundUser ||  (foundUser && foundUser.isVerified===false)){
            
          let otp=Math.random().toString().substring(2,7);
          let clientDto ={
            ...createUserParams,
            otp
           }
        
         return this.clientRepository.save(clientDto);
        }
        else 
        throw new HttpException("message", 400, { cause: new Error("Some Error") }) 
    }
}
