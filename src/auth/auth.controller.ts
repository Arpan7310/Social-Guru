import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ClientDto } from 'src/client/dtos/ClientParams.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {



    constructor(private authService:AuthService) {

    }

    @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login (@Req() clienDto) {
     return  this.authService.login(clienDto.user);
    }

}
