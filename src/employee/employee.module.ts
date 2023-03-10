import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicCerficate } from 'src/typeorm/entities/AcademicCertificate';
import { Employee } from 'src/typeorm/entities/Employee';
import { EmployeeJobHire } from 'src/typeorm/entities/EmployeeJob';
import { Job } from 'src/typeorm/entities/Job';
import { TypeORMError } from 'typeorm';
import { EmployeeController } from './controllers/employee/employee.controller';
import { EmployeeService } from './service/employee/employee.service';

@Module({
  imports:[TypeOrmModule.forFeature([Employee,Job,EmployeeJobHire,AcademicCerficate])],
  controllers: [EmployeeController],
  providers: [EmployeeService]
})
export class EmployeeModule {}
