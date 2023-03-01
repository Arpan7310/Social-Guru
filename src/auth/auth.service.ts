import { Injectable } from '@nestjs/common';
import { ClientDto } from 'src/client/dtos/ClientParams.dto';
import { ClientService } from 'src/client/services/client/client.service';
import { isMatch } from 'src/utils/bcrypt';
import {JwtService} from '@nestjs/jwt'
@Injectable()
export class AuthService {


    constructor(private clientService:ClientService,private jwtService:JwtService) {
    }


    async  validateUser (email:string,password:string) {
    
          const result= await this.clientService.findClient(email);

          if(!result){
            return null;
          }
          
         let bool=await isMatch(result.password,password)
          if(bool && result)
          return  result 
          else     
          return null;
    }


    async login (user:any) {
    
        try {
          const payload = { username: user.username, sub: user.id };
         return {
          access_token:this.jwtService.sign(payload)
         }  
        }
        catch (err) {
          console.log(err);
        }
     }
}
