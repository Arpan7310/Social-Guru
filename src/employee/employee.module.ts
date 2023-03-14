import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicCerficate } from 'src/typeorm/entities/AcademicCertificate';
import { Achievements } from 'src/typeorm/entities/Achievements';
import { Author } from 'src/typeorm/entities/Authors';
import { Employee } from 'src/typeorm/entities/Employee';
import { EmployeeAwards } from 'src/typeorm/entities/EmployeeAwards';
import { EmployeeJobHire } from 'src/typeorm/entities/EmployeeJob';
import { ExpectedOpportunity } from 'src/typeorm/entities/ExpectedOpportunity';
import { Job } from 'src/typeorm/entities/Job';
import { ProfessionalCerficate } from 'src/typeorm/entities/ProfessionalCertificates';
import { ProfessionalProfile } from 'src/typeorm/entities/ProfessionalProfile';
import { Publications } from 'src/typeorm/entities/Publications';
import { Responsibilities } from 'src/typeorm/entities/Responsibilities';
import { TypeORMError } from 'typeorm';
import { EmployeeController } from './controllers/employee/employee.controller';
import { EmployeeService } from './service/employee/employee.service';

@Module({
  imports:[TypeOrmModule.forFeature([Employee,Job,
    EmployeeJobHire,AcademicCerficate,
    ProfessionalCerficate,Author,Publications,ProfessionalProfile,
    Responsibilities,Achievements,ExpectedOpportunity,EmployeeAwards])],
  controllers: [EmployeeController],
  providers: [EmployeeService]
})
export class EmployeeModule {}
