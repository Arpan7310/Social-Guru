import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { ChatDto } from 'src/client/dtos/ChatDto.dto';
import { Chat } from 'src/typeorm/entities/Chat';
import { Client } from 'src/typeorm/entities/Client';
import { Employee } from 'src/typeorm/entities/Employee';
import { In, Repository } from 'typeorm';

@Injectable()
export class ChatsService {

    constructor(@InjectRepository(Chat) private chatRepository:Repository<Chat>,@InjectRepository(Client) private clientRepository:Repository<Client>,
    @InjectRepository(Employee) private employeeRepository:Repository<Employee>
    ) {
    }

    async saveChat (chatBody:ChatDto) {


        let chat=new Chat();
          chat.from=chatBody.from;
          chat.to=chatBody.to;
          chat.message=chatBody.message;
          chat.timestamp=chatBody.timestamp;
           return this.chatRepository.save(chat)
    }


}
