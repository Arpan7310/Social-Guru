import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from 'src/typeorm/entities/Cities';
import { Client } from 'src/typeorm/entities/Client';
import { Job } from 'src/typeorm/entities/Job';
import { Skill } from 'src/typeorm/entities/Skills';
import { JobsController } from './controller/jobs/jobs.controller';
import { JobsService } from './service/jobs/jobs.service';

@Module({
  imports:[TypeOrmModule.forFeature([Job,City,Skill,Client])],
  controllers: [JobsController],
  providers: [JobsService]
})
export class JobsModule {}
