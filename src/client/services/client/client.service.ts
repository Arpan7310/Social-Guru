import { HttpException, HttpStatus, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClientDto } from 'src/client/dtos/CreateClient.dto';
import { Client } from 'src/typeorm/entities/Client';
import { encodePassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class ClientService {

    constructor(@InjectRepository(Client) private clientRepository:Repository<Client>, private mailService:MailerService ) {
     
    }

    async  sendMailTo(email:string,otp:string) {
   
      const res=  await  this.mailService.sendMail({
            to:email,
            from:"asde2wee@gmail.com",
            subject: 'Otp to register',
            text:` Please use ${otp} to register`, 
           })

        
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

           
            await this.clientRepository.save(clientDto);
            return  this.sendMailTo(createUserParams.email,otp);


          }
          else if((foundUser && foundUser.isVerified===false)){
            let email=createUserParams.email;
              clientDto ={
                ...foundUser,
                 otp
             }
           await  this.clientRepository.update({email},{...clientDto})
           return  this.sendMailTo(createUserParams.email,otp);
          }
          else 
          throw new HttpException("message", 400, { cause: new Error("Some Error") }) 
        
         

        }


   
         
     
    }




