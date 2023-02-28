import { IoAdapter } from "@nestjs/platform-socket.io"

export class ChatDto {
    
    sender:number
    receiver:number
    message:string
    roomId:string
    timestamp:Date

}




