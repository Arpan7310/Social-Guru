import { HttpException, HttpStatus, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClientDto } from 'src/client/dtos/CreateClient.dto';
import { Client } from 'src/typeorm/entities/Client';
import { encodePassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {

    constructor(@InjectRepository(Client) private clientRepository:Repository<Client> ) {
     
    }

    async createUser(createUserParams:CreateClientDto){
          let foundUser= await this.clientRepository.findOne({where:{email:createUserParams.email}});
          var clientDto:any;
          let otp=Math.random().toString().substring(2,7);
          const password=await encodePassword(createUserParams.password);
          if(!foundUser){
         
           clientDto ={
            ...createUserParams,
              password,
              otp
           }
           return this.clientRepository.save(clientDto);
          }
          else if((foundUser && foundUser.isVerified===false)){
            let email=createUserParams.email;
              clientDto ={
                ...foundUser,
                 otp
             }
           return  this.clientRepository.update({email},{...clientDto})
          }
          else 
          throw new HttpException("message", 400, { cause: new Error("Some Error") }) 
        
         
        }
        
     
    }




