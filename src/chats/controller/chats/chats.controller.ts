import { Controller } from '@nestjs/common';
import { ChatsService } from 'src/chats/services/chats/chats.service';

@Controller('chats')
export class ChatsController {



    constructor(private chatsService:ChatsService) {

    }





  
}
