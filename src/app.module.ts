import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegistrationModule } from './registration/registration.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { type } from 'os';
import { Client } from './typeorm/entities/Client';
import { ClientModule } from './client/client.module';
import { MailerModule } from '@nestjs-modules/mailer';


@Module({
  imports: [RegistrationModule,
    TypeOrmModule.forRoot({
    type:'mysql',
    host:'localhost',
    port:3306,
    username:'arpan',
    password:'@Password1234',
    database:'social_guru',
    entities:[Client],
    synchronize:true
  }), 
  MailerModule.forRoot({
    transport:{
    host:'smtp.sendgrid.net',
    auth:{
      user:'apikey',
      pass:'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'
    }
   }
  }),
  ClientModule,

  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
