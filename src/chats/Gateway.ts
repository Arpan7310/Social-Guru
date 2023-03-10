import { HttpException, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets'
import {Server,Socket} from 'socket.io';
import { Repository } from 'typeorm';
import { Chat } from 'src/typeorm/entities/Chat';
import { ChatsService } from './services/chats/chats.service';
import { throwIfEmpty } from 'rxjs';
import { ChatDto } from 'src/client/dtos/ChatDto.dto';


@WebSocketGateway(4001,{cors:true})
export class  ChatGateWay  implements OnModuleInit{
  
  constructor(private chatservice:ChatsService){
  
  }

   onModuleInit() {
       this.server.on('connection',(socket)=>{
       console.log(socket.id);
       })
   }
  
  
    @WebSocketServer()
    server:Server

    
    @SubscribeMessage('newMessage')   
     async onNewMessage (@MessageBody() body:ChatDto) {
     
     try {
      console.log(body);
       await this.chatservice.saveChat(body)
        this.server.to(body.roomId).emit('newMessage',{
         msg:'New Message',
         content:body
        })
           }
      catch(err) {
        throw new HttpException(err.message,err.status)
      }
        
  }

   @SubscribeMessage("joinRoom")
   async joinRoom (client:Socket,room:string) {
     client.join(room)
   }

   @SubscribeMessage('leaveRoom')
    async leaveRoom (client:Socket,room:string) {
    client.leave(room)
   }

    
}