import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { User } from 'src/user/User.schema';
import { Conversation } from './Conversation.schema';
import { ConversationService } from './conversation.service';

@Controller("conversation")
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Get()
  getConversationsByClientId(@Query('clientId') clientId: string) {
    return this.conversationService.getConversationsByClientId(clientId);
  }

  @Get()
  getConversationById(@Query('id') id: string) {
    return this.conversationService.getConversationById(id);
  }
  
  @Get()
  getConversationByUrlLink(@Query('conversationLink') conversationLink: string) {
    return this.conversationService.getConversationByUrlLink(conversationLink);
  }

  @Post()
  addUserByConversationLink(@Query('conversationLink') conversationLink: string, @Body() user: User) {
    return this.conversationService.addUserByConversationLink(conversationLink, user);
  }

  @Post()
  save(@Body() conversation: Conversation) {
    return this.conversationService.save(conversation);
  }

  @Put("/name")
  updateUserName(@Body() user: { id: string, name: string}) {
    return this.conversationService.updateUserName(user.id, user.name);
  }

  @Delete()
  deleteConversation(@Query('id') id: string) {
    return this.conversationService.deleteConversation(id);
  }

  
}