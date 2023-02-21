import { HttpException, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets'
import {Server} from 'socket.io';
import { Repository } from 'typeorm';
import { Chat } from 'src/typeorm/entities/Chat';
import { ChatsService } from './services/chats/chats.service';
import { throwIfEmpty } from 'rxjs';
import { ChatDto } from 'src/client/dtos/ChatDto.dto';


@WebSocketGateway()
export class  ChatGateWay  implements OnModuleInit{
  
  constructor(private chatservice:ChatsService){
    
  }

   onModuleInit() {
       this.server.on('connection',(socket)=>{
       console.log(socket.id) ;
       })
   }
  
  
    @WebSocketServer()
    server:Server

    
    @SubscribeMessage('newMessage')   
     async onNewMessage (@MessageBody() body:ChatDto) {
     
     try {
        await this.chatservice.saveChat(body)
      
       this.server.to(body.roomId.toString()).emit('onMessage',{
         msg:'New Message',
         content:body
        })
        

      }
      catch(err) {
        throw new HttpException(err.message,err.status)
      }
        
  }
    
}