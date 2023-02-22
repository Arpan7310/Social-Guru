import { IoAdapter } from "@nestjs/platform-socket.io"

export class ChatDto {
    
    employeeId:number
    clientId:number
    message:string
    roomId:string
    timestamp:Date
}




