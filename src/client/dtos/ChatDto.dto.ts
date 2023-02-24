import { IoAdapter } from "@nestjs/platform-socket.io"

export class ChatDto {
    
    from:number
    to:number
    message:string
    roomId:string
    timestamp:Date

}




