import { HttpException, HttpStatus, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClientDto } from 'src/client/dtos/CreateClient.dto';
import { Client } from 'src/typeorm/entities/Client';
import { encodePassword, isMatch } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { VerifyOtpDto } from 'src/client/dtos/VerifyOtp.dto';
import { CredentialsDto } from 'src/client/dtos/Credentials.dto';

@Injectable()
export class ClientService {

  constructor(@InjectRepository(Client) private clientRepository: Repository<Client>, private mailService: MailerService) {

  }

  async sendMailTo(email: string, otp: string) {

    const res = await this.mailService.sendMail({
      to: email,
      from: "asde2wee@gmail.com",
      subject: 'Otp to register',
      text: ` Please use ${otp} to register`,
    })


  }




  async createUser(createUserParams: CreateClientDto) {

    let foundUser = await this.clientRepository.findOne({ where: { email: createUserParams.email } });
    var clientDto: any;
    let otp = Math.random().toString().substring(2, 7);
    const password = await encodePassword(createUserParams.password);
    if (!foundUser) {

      clientDto = {
        ...createUserParams,
        password,
        otp
      }


      await this.clientRepository.save(clientDto);
      return this.sendMailTo(createUserParams.email, otp);


    }
    else if ((foundUser && foundUser.isVerified === false)) {
      let email = createUserParams.email;
      clientDto = {
        ...foundUser,
        otp
      }
      await this.clientRepository.update({ email }, { ...clientDto })
      return this.sendMailTo(createUserParams.email, otp);
    }
    else
      throw new HttpException("User already exists",400)

  }


  async verifyOtp(verifyOtpParmas: VerifyOtpDto) {


    let emailParam = verifyOtpParmas.email.trim();
    let otp = verifyOtpParmas.otp;
    let foundUser = await this.clientRepository.findOne({ where: { email: emailParam } });
    if (!foundUser) {
      throw new HttpException("User not found", 400);
    }
    else if (foundUser.otp == otp && !foundUser.isVerified) {
      foundUser.isVerified = true;
      this.clientRepository.update({ email: foundUser.email }, { ...foundUser });

    }
    else if (foundUser.otp !== otp && !foundUser.isVerified) {
      throw new HttpException("Wrong otp entered", 400);
    }

    else if (foundUser.isVerified) {
      throw new HttpException("User already verified", 400);
    }
  }


 
  async verifyClient (credentials:CredentialsDto) {

    let {email,password} =credentials;
    let foundEmployee= await this.clientRepository.findOne({where:{email}});

     if(!foundEmployee){
       throw new HttpException("Client not found", 400) 
     }
    
     let bool=await isMatch(foundEmployee.password,password);
     if(!bool) {
        throw new HttpException("Wrong credentials",400)
     }
    
 }


 async findClient (email:string) {
  let foundClient=await this.clientRepository.findOne({where:{email}})
 
  if(!foundClient){
    throw new HttpException("Client not found",400)
  }
  delete foundClient["password"]
  return foundClient;
 }


 async findJobs(clientId:number) {
  let foundClient=await this.clientRepository.findOne(
    {where:{id:clientId},
      relations:{
        job:{
          skills:true,
          cities:true,
          employees:true
        }

      }
  })
 
  if(!foundClient){
    throw new HttpException("Client not found",400);
  }
  let createdJobs =foundClient.job;

  return createdJobs
 }






}




