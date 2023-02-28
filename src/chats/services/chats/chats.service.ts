import { HttpException, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { ChatDto } from 'src/client/dtos/ChatDto.dto';
import { ChatParamsDto } from 'src/client/dtos/ChatParams.dto';
import { Chat } from 'src/typeorm/entities/Chat';
import { Client } from 'src/typeorm/entities/Client';
import { Employee } from 'src/typeorm/entities/Employee';
import { DataSource, In, Repository } from 'typeorm';

@Injectable()
export class ChatsService {

    constructor(@InjectRepository(Chat) private chatRepository:Repository<Chat>,@InjectRepository(Client) private clientRepository:Repository<Client>,
    @InjectRepository(Employee) private employeeRepository:Repository<Employee>,
    @InjectDataSource() private dataSource:DataSource
    ) {
    }

    async saveChat (chatBody:ChatDto) {
      let chat=new Chat();
          chat.sender=chatBody.sender;
          chat.receiver=chatBody.receiver;
          chat.message=chatBody.message;
          chat.timestamp=chatBody.timestamp;
           return this.chatRepository.save(chat)
    }


    async fetchChatConversations (chatParams:ChatParamsDto) {

       let result =await  this.dataSource.query("Select * from chat where sender in (?) and receiver in (?)",[(chatParams.sender,chatParams.receiver),(chatParams.sender,chatParams.receiver)])
       return result;
    
    }


}
