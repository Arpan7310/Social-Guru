import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegistrationModule } from './registration/registration.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { type } from 'os';
import { Client } from './typeorm/entities/Client';
import { ClientModule } from './client/client.module';
@Module({
  imports: [RegistrationModule,TypeOrmModule.forRoot({
    type:'mysql',
    host:'localhost',
    port:3306,
    username:'arpan',
    password:'@Password1234',
    database:'social_guru',
    entities:[Client],
    synchronize:true
  }), 
  ClientModule,
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
