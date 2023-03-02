import { HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { CredentialsDto } from "src/client/dtos/Credentials.dto";
import { ClientService } from "src/client/services/client/client.service";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {


    constructor(private authService:AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
          });
    }


    async validate (req:any,email:string,password:string) {

        
      let foundClient= await  this.authService.validateUser(email,password,req)
    
      if(!foundClient) {
        throw new UnauthorizedException();
      }
     return foundClient;
    }

}