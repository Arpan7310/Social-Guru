import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegistrationModule } from './registration/registration.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { type } from 'os';
import { Client } from './typeorm/entities/Client';
import { ClientModule } from './client/client.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRoot({
      transport:{
      host:'smtp.sendgrid.net',
      auth:{
        user:process.env.apikey,
        pass:process.env.password
      }
     }
    }),

    RegistrationModule,
    TypeOrmModule.forRoot({
    type:'mysql',
    host:process.env.db_host,
    username:process.env.db_username,
    password:process.env.db_password,
    database:process.env.db_name,
    entities:[Client],
    synchronize:true
  }), 

 
  ClientModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
