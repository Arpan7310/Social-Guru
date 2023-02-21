import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from 'src/typeorm/entities/Chat';
import { ChatsController } from './controller/chats/chats.controller';
import { ChatsService } from './services/chats/chats.service';
import { ChatGateWay } from './Gateway';
import { Employee } from 'src/typeorm/entities/Employee';
import { Client } from 'src/typeorm/entities/Client';


@Module({
     imports:[TypeOrmModule.forFeature([Chat,Employee,Client])],
     providers:[ChatsService,ChatGateWay],
     controllers: [ChatsController]
})
export class ChatsModule {}
