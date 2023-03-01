import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { type } from 'os';
import { Client } from './typeorm/entities/Client';
import { ClientModule } from './client/client.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { EmployeeModule } from './employee/employee.module';
import { Employee } from './typeorm/entities/Employee';
import { City } from './typeorm/entities/Cities';
import { Job } from './typeorm/entities/Job';
import { Skill } from './typeorm/entities/Skills';
import { JobsModule } from './jobs/jobs.module';
import { EmployeeJobHire } from './typeorm/entities/EmployeeJob';
import { Chat } from './typeorm/entities/Chat';
import { ChatsModule } from './chats/chats.module';
import { AuthModule } from './auth/auth.module';



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
     TypeOrmModule.forRoot({
    type:'mysql',
    host:process.env.db_host,
    username:process.env.db_username,
    password:process.env.db_password,
    database:process.env.db_name,
    entities:[Client,Employee,City,Job,Skill,EmployeeJobHire,Chat],
    synchronize:true
  }), 

 
  ClientModule, EmployeeModule, JobsModule,ChatsModule,AuthModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
