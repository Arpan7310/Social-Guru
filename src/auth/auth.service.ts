import { Injectable } from '@nestjs/common';
import { ClientDto } from 'src/client/dtos/ClientParams.dto';
import { ClientService } from 'src/client/services/client/client.service';
import { isMatch } from 'src/utils/bcrypt';
import {JwtService} from '@nestjs/jwt'
import { EmployeeService } from 'src/employee/service/employee/employee.service';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
@Injectable()
export class AuthService {


    constructor(private clientService:ClientService,private jwtService:JwtService,
      @InjectDataSource() private dataSource:DataSource
      ) {
    }


    async  validateUser (email:string,password:string,req:any) {
        var result;
      
        if(req.body.type==='client'){
        result= await this.clientService.findClient(email);
        }
        else (req.body.type==='employee')
         {
         let x=await this.dataSource.query("Select * from employee where email=? ",[email]);
           result=x[0]
           console.log(result)
        }

          if(!result ){
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
