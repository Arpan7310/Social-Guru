import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { CreateEmployeeDto } from 'src/client/dtos/CreateEmployee.dto';
import { Employee } from 'src/typeorm/entities/Employee';
import { DataSource, getConnection, getManager, Repository, TransactionAlreadyStartedError } from 'typeorm';
import { threadId } from 'worker_threads';
import { encodePassword,isMatch } from 'src/utils/bcrypt';
import { VerifyOtpDto } from 'src/client/dtos/VerifyOtp.dto';
import { CredentialsDto } from 'src/client/dtos/Credentials.dto';
import { applyJobDto } from 'src/client/dtos/ApplyJobDto.dto';
import { Job } from 'src/typeorm/entities/Job';
import { EmployeeJobHire } from 'src/typeorm/entities/EmployeeJob';

import { EmployeeBasicProfileDto } from 'src/client/dtos/EmployeeBasicProfile.dto';
import { AcademicProfileDto } from 'src/client/dtos/AcademicProfileDto.dto';
import { AcademicCerficate } from 'src/typeorm/entities/AcademicCertificate';
import { CreateClientDto } from 'src/client/dtos/CreateClient.dto';
import { CertificationsDto } from 'src/client/dtos/CeritificateDto.dto';
import { ProfessionalCerficate } from 'src/typeorm/entities/ProfessionalCertificates';
import { Certificate } from 'crypto';
import { Publications } from 'src/typeorm/entities/Publications';
import { PublicationsDto } from 'src/client/dtos/PublicationsDto.dto';
import { Author } from 'src/typeorm/entities/Authors';
import { ProfessionalProfile } from 'src/typeorm/entities/ProfessionalProfile';
import { Achievements } from 'src/typeorm/entities/Achievements';
import { Responsibilities } from 'src/typeorm/entities/Responsibilities';
import { ProfessionalProfileDto } from 'src/typeorm/dtos/ProfessionalProfile.dto';
import { ExpectedOpportunityDto } from 'src/typeorm/dtos/ExpectedOpportunity.dto';
import { ExpectedOpportunity } from 'src/typeorm/entities/ExpectedOpportunity';
import { EmployeeAwardsDto } from 'src/typeorm/dtos/EmployeeAwards.dto';
import { EmployeeAwards } from 'src/typeorm/entities/EmployeeAwards';



@Injectable()
export class EmployeeService {

    constructor(@InjectRepository(Employee) private employeeRepository: Repository<Employee>, private mailService: MailerService,
     @InjectRepository(Job) private jobRepository:Repository<Job>,
     @InjectRepository(EmployeeJobHire) private empjobHireRepository:Repository<EmployeeJobHire>,
     @InjectDataSource() private dataSource:DataSource,
     @InjectRepository(AcademicCerficate) private academicCertificate:Repository<AcademicCerficate>,
     @InjectRepository(Publications) private publications:Repository<Publications>,
     @InjectRepository(ProfessionalCerficate) private professionalCertificate:Repository<ProfessionalCerficate>,
     @InjectRepository(Author) private authorRepository:Repository<Author>,
     @InjectRepository(ProfessionalProfile) private professionalProfileRepo:Repository<ProfessionalProfile>,
     @InjectRepository(Achievements) private achievementsRepo:Repository<Achievements>,
     @InjectRepository(Responsibilities) private responsibilitiesRepo:Repository<Responsibilities>,
     @InjectRepository(ExpectedOpportunity) private expectedOpportunityRepo:Repository<ExpectedOpportunity>,
     @InjectRepository(EmployeeAwards) private employeeAwardsRepo:Repository<EmployeeAwards>
    
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

  
     async applyJob (applyJobDto:applyJobDto){



        let res=await this.dataSource.query("Select * from EmployeeJob where jobId=? and employeeId=? ",[applyJobDto.jobId,applyJobDto.employeeId]);
        if(res.length>0){
            throw new HttpException("Already applied to this job",500);
        }
        let foundJob=await this.jobRepository.findOne({
            where:{
               id:applyJobDto.jobId
            }
        })




        if(!foundJob){
            throw new HttpException("Job not found",400)
        }

        let foundEmployee=await this.employeeRepository.findOne({
              where:{
                id:applyJobDto.employeeId
              }
        })

        if(!foundEmployee) {
            throw new HttpException("Employee not found",400)
        }
        let ob=new EmployeeJobHire();
        ob.employee=foundEmployee;
        ob.job=foundJob;
        ob.hired=false;
       return this.empjobHireRepository.save(ob)
     }


     async findAppliedJobs(employeeId:number) {
       const res=await this.dataSource.query("Select * from job left join EmployeeJob on job.id=EmployeeJob.jobId   where employeeId=?   ",[employeeId]);
       return res
     }


     async createProfile (createProfileDto:EmployeeBasicProfileDto) {
        
        let employeeProfile= await this.employeeRepository.findOne({
            where:{
                id:createProfileDto.empId
            }
        })



        if(!employeeProfile) {
            throw new HttpException("Employee not found",400)
        }




        employeeProfile.disability=createProfileDto.disablility;
        employeeProfile.dob=createProfileDto.dob;
        employeeProfile.gender=createProfileDto.gender;
        employeeProfile.gst=createProfileDto.gst;
        employeeProfile.idproof=createProfileDto.idproof;
        employeeProfile.languageProficiencylevel=createProfileDto.languageproficiencyLevel;
        employeeProfile.languageProficieny=createProfileDto.languageproficiency;
        employeeProfile.pan=createProfileDto.pan;
        employeeProfile.linkedinlink=createProfileDto.linkedinlink;
        employeeProfile.martialStatus=createProfileDto.martialStatus;
        employeeProfile.idproof=createProfileDto.idproof;
        return   this.employeeRepository.save(employeeProfile); 
        
        
     }


     async createAcademicProfile  (createAcademicProfileDto:AcademicProfileDto) {
        let academicProfile= new AcademicCerficate();
        let employee= await this.employeeRepository.findOne({
            where:{
              id:createAcademicProfileDto.employeeId  
            }
        })

        if(!employee){
            throw new HttpException("Employee not found",400)
        }
        academicProfile.course=createAcademicProfileDto.course;
        academicProfile.courseend=createAcademicProfileDto.courseend;
        academicProfile.coursestart=createAcademicProfileDto.coursestart;
        academicProfile.educationalQualification=createAcademicProfileDto.educationalQualification;
        academicProfile.percentage=createAcademicProfileDto.percentage;
        academicProfile.specialisation=createAcademicProfileDto.specialisation;
        academicProfile.institute=createAcademicProfileDto.institute;
        academicProfile.employee=employee
        return this.academicCertificate.save(academicProfile);

     }

     async createCertificate (certificationsDto:CertificationsDto) {

        console.log(certificationsDto)
  


        let certificate = new ProfessionalCerficate();
      
        certificate.course=certificationsDto.course;
        certificate.grade=certificationsDto.grade;
        certificate.institute=certificationsDto.institute;
        certificate.startDate=certificationsDto.startDate;
        certificate.endDate=certificationsDto.endDate;

        let foundEmployee= await this.employeeRepository.findOne({
            where:{
                id:certificationsDto.empId
            }
        })


        if(!foundEmployee){
            throw new HttpException("Emloyee Not found",400)
        }
        certificate.employee=foundEmployee;

        

       return this.professionalCertificate.save(certificate);

     }



     async createPublications (publicationsDto:PublicationsDto) {

        
        let publications= new Publications();
     
        let employeeFound=await this.employeeRepository.findOne({
       
            where:{
                id:publicationsDto.empId
            }
        })


        if(!employeeFound) {
            throw new HttpException("Employee not found",400)
        }



        
        publications.book=publicationsDto.book;
        publications.publishedat=publicationsDto.publishedat;
        publications.publisher=publicationsDto.publisher;
        publications.employee=employeeFound
        publications.topic=publicationsDto.topic

        const savedData=  await this.publications.save(publications);
      
        

        publicationsDto.author.forEach( async el=>{
        let author= new Author();
          author.author=el;
          author.publicationId=savedData.id
          await this.authorRepository.save(author)
        })


        return {
            message :"data saved successfully"
        }


     }


     async createProfessionalProfile (professionalProfileDto:ProfessionalProfileDto) {


        let foundEmployee= await this.employeeRepository.findOne({
            where:{
                id:professionalProfileDto.employeeId
                
            },
            transaction:true
        })


        if(!foundEmployee) {
            throw new HttpException("Employee not found",400)
        }


     

      let  professionalProfile= new ProfessionalProfile()

        professionalProfile.duration=professionalProfileDto.duration;
        professionalProfile.feescharged=professionalProfileDto.feescharged;
        professionalProfile.organization=professionalProfileDto.organization;
        professionalProfile.responsibilities=professionalProfileDto.responsibilities;
        professionalProfile.feescharged=professionalProfileDto.feescharged;
        professionalProfile.type=professionalProfileDto.type;
        professionalProfile.income=professionalProfileDto.income;
        professionalProfile.levelOfexpertise=professionalProfileDto.levelOfexpertise;
        professionalProfile.sampleofwork=professionalProfileDto.sampleofwork;
        professionalProfile.value=professionalProfileDto.value;
        professionalProfile.geography=professionalProfileDto.geography;
        professionalProfile.employee=foundEmployee;


        let savedProfessionalProfile=await this.professionalProfileRepo.save(professionalProfile,{
            transaction:true
        });
      
    

     

        professionalProfileDto.achievements.forEach(el=>{
            let achievments=new Achievements();
            achievments.professionalProfile=savedProfessionalProfile;
            achievments.achievement=el
            this.achievementsRepo.save(achievments,{
                transaction:true
            })
        })


     }


     async createExpectedOpportunity (expectedOpportunityDto:ExpectedOpportunityDto) {

   

        let foundEmployee=await this.employeeRepository.findOne({
            where:{
                id:expectedOpportunityDto.empId
            }
        })


        if(!foundEmployee) {
            throw new HttpException("Employee not found",400)
        }




         let expectedOpportunity= new ExpectedOpportunity()



        expectedOpportunity.days=expectedOpportunityDto.days
        expectedOpportunity.desiredtype=expectedOpportunityDto.desiredtype
        expectedOpportunity.employee=foundEmployee;
        expectedOpportunity.expectation=expectedOpportunityDto.expectation
        expectedOpportunity.hours=expectedOpportunityDto.hours
        expectedOpportunity.location=expectedOpportunityDto.location
        expectedOpportunity.months=expectedOpportunityDto.months
        expectedOpportunity.natureofassigment=expectedOpportunityDto.natureofassigment
        expectedOpportunity.traveltype=expectedOpportunityDto.traveltype
        

        return this.expectedOpportunityRepo.save(expectedOpportunity)

     }



     async createAwardsOpportunity (employeeAwardsDto:EmployeeAwardsDto) {



    
        let employeeAward = new EmployeeAwards();
        let foundEmployee= await this.employeeRepository.findOne({
            where:{
                id:employeeAwardsDto.empId
            }
        })


        if(!foundEmployee) {
            throw new HttpException("Employee not found",400)
        }


        employeeAward.date=employeeAwardsDto.date
        employeeAward.levelofaward=employeeAwardsDto.levelofaward
        employeeAward.name=employeeAwardsDto.name
        employeeAward.recognisedby=employeeAwardsDto.recognisedby
        employeeAward.employee=foundEmployee
       

        return this.employeeAwardsRepo.save(employeeAward)
     }


     async getResponsibilities () {
        return this.responsibilitiesRepo.find()
     }


     async fetchAcademicCertificates (empId:number) {
        let results=await this.dataSource.query("Select * from AcademicCertificate where empId in ?",[empId])
        return results;
     }

     async fetchCertificates (empId:number) {
        let results=await this.dataSource.query("Select * from certificates where empId in ?",[empId])
        return results;
     }


     async fetchPublications (empId:number) {
        let results=await this.dataSource.query("Select * from publications where empId in ?",[empId])
        return results
     }


     async fetchProfessionalCertificates (empId:number) {
        let results=await this.dataSource.query("Select * from certificates where empId in ?",[empId])
        return results
     }


     async fetchAuthors (empId:number) {
        let results=await this.dataSource.query("Select * from author where empId in ?",[empId])
        return results
     }


     async fetchAchievements  (empId:number) {
        let results=await this.dataSource.query("Select * from EmployeAchievements where empId in ?",[empId])
        return results
       
     }


     async fetchExpectedOpportunities  (empId:number) {
        let results=await this.dataSource.query("Select * from ExpectedOpportunity  where empId in ? ",[empId])
        return results;
     }


     async fetchEmployeeAwards (empId:number) {
        let results=await this.dataSource.query("Select * from EmployeeAwards  where empId in ? ",[empId])
        return results; 
     }


    

    

     


     
    

}
