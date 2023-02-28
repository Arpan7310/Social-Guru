import { Body, Controller, Get, HttpException, Param, Post } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { ChatsService } from 'src/chats/services/chats/chats.service';
import { ChatParamsDto } from 'src/client/dtos/ChatParams.dto';

@Controller('chats')
export class ChatsController {



    constructor(private chatsService:ChatsService) {

    }



    @Post("/fetchConversations")

    async fetchConversation (@Body() chatParams:ChatParamsDto) {

        try {
        return   this.chatsService.fetchChatConversations(chatParams);
        }
        catch (err) {
            throw new HttpException(err.message,err.status)
        }
    }




  
}
