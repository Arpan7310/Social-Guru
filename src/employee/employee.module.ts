import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'src/typeorm/entities/Employee';
import { TypeORMError } from 'typeorm';
import { EmployeeController } from './controllers/employee/employee.controller';
import { EmployeeService } from './service/employee/employee.service';

@Module({
  imports:[TypeOrmModule.forFeature([Employee])],
  controllers: [EmployeeController],
  providers: [EmployeeService]
})
export class EmployeeModule {}
