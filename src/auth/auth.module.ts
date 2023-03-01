import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientService } from 'src/client/services/client/client.service';
import { LocalStrategy } from './local.auth';
import { TypeORMError } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/typeorm/entities/Client';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ClientModule } from 'src/client/client.module';


@Module({
  providers: [AuthService,ClientService,LocalStrategy],
  imports:[TypeOrmModule.forFeature([Client]),ClientModule,
   PassportModule,JwtModule.register({
    secret:'secret'
})],
  controllers: [AuthController]
})
export class AuthModule {}
