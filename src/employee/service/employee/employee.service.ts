import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmployeeDto } from 'src/client/dtos/CreateEmployee.dto';
import { Employee } from 'src/typeorm/entities/Employee';
import { getManager, Repository } from 'typeorm';
import { threadId } from 'worker_threads';
import { encodePassword,isMatch } from 'src/utils/bcrypt';
import { VerifyOtpDto } from 'src/client/dtos/VerifyOtp.dto';
import { CredentialsDto } from 'src/client/dtos/Credentials.dto';
import { applyJobDto } from 'src/client/dtos/ApplyJobDto.dto';
import { Job } from 'src/typeorm/entities/Job';

@Injectable()
export class EmployeeService {

    constructor(@InjectRepository(Employee) private employeeRepository: Repository<Employee>, private mailService: MailerService,
     @InjectRepository(Job) private jobRepository:Repository<Job>
    ) {
     
    }

  

    async sendMailTo(email: string, otp: string) {
        const res = await this.mailService.sendMail({
            to: email,
            from: "asde2wee@gmail.com",
            subject: 'Otp to register',
            text: ` Please use ${otp} to register`,
        })
    }


    async createEmployee(createEmployeeParams: CreateEmployeeDto) {

        let foundEmployee = await this.employeeRepository.findOne({ where: { email: createEmployeeParams.email } });
        var employeeDto: any;
        let otp = Math.random().toString().substring(2, 7);
        const password = await encodePassword(createEmployeeParams.password);
        if (!foundEmployee) {

            employeeDto = {
                ...createEmployeeParams,
                password,
                otp
            }

            await this.employeeRepository.save(employeeDto);
            return this.sendMailTo(createEmployeeParams.email, otp);


        }
        else if ((foundEmployee && foundEmployee.isVerified === false)) {
            let email = createEmployeeParams.email;
            employeeDto = {
                ...foundEmployee,
                otp
            }
            await this.employeeRepository.update({ email }, { ...employeeDto })
            return this.sendMailTo(createEmployeeParams.email, otp);
        }
        else
            throw new HttpException("Employee already exists", 400)


    }


    async verifyOtp(verifyOtpParmas: VerifyOtpDto) {


        let emailParam = verifyOtpParmas.email.trim();
        let otp = verifyOtpParmas.otp;
        let foundEmployee = await this.employeeRepository.findOne({ where: { email: emailParam } });
        if (!foundEmployee) {
            throw new HttpException("User not found", 400);
        }
        else if (foundEmployee.otp == otp && !foundEmployee.isVerified) {
            foundEmployee.isVerified = true;
            this.employeeRepository.update({ email: foundEmployee.email }, { ...foundEmployee });

        }
        else if (foundEmployee.otp !== otp && !foundEmployee.isVerified) {
            throw new HttpException("Wrong otp entered", 400);
        }

        else if (foundEmployee.isVerified) {
            throw new HttpException("User already verified", 400);
        }

    }



    async verifyEmployee (credentials:CredentialsDto) {

        let {email,password} =credentials;
        let foundEmployee= await this.employeeRepository.findOne({where:{email}});

         if(!foundEmployee){
           throw new HttpException("Employee not found", 400) 
         }
        
         let bool=await isMatch(foundEmployee.password,password);
         if(!bool) {
            throw new HttpException("Wrong credentials",400)
         }
        
     }


     async findEmployee(email:string){
     let foundEmployee=await this.employeeRepository.findOne({where:{email}})
     

     if(!foundEmployee){
        throw new HttpException("Employee not found",400)
     }
     delete foundEmployee["password"]
     return foundEmployee
     }


     async applyJob(applyJobDto:applyJobDto){
        let foundEmployee= await this.employeeRepository.findOne({where:{id:applyJobDto.employeeId},
            relations:{
                job:true
            }
      });

    //   const entityManger=getManager().getRepository('')


    //    const data=await entityManger.query (`Select * from employee_job_job where employeeId=? and   jobId= ?`,[applyJobDto.employeeId,applyJobDto.jobId] );

    //    console.log(data)

        let foundJob= await this.jobRepository.findOne({where:{id:applyJobDto.jobId},
           relations:{
                employees:true
            }
        });
     
        if(!foundEmployee){
            throw new HttpException("expert not found",400);
        }

        if(!foundJob){
            throw new HttpException("opportunity not found",400);
        }

        if(foundJob.employees.includes(foundEmployee)) {
            console.log("hello");
            throw new HttpException("Already applied to this job",400)
        }

        foundEmployee.job.push(foundJob);

       
      return this.employeeRepository.save(foundEmployee);

     }


     async findAppliedJobs(employeeId:number) {
  
     let employeeData=await   this.employeeRepository.findOne({where:{
           id:employeeId
        },
        relations:{
            job:true
        }
    })

    if(!employeeData){
        throw new HttpException("Employee Not found ",400)
    }

    let jobsApplied=employeeData.job;

    return jobsApplied



     }

    



}
