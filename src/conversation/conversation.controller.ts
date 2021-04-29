import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Message } from 'src/message/Message.schema';
import { MessageService } from 'src/message/message.service';
import { User } from 'src/user/User.schema';
import { Conversation } from './Conversation.schema';
import { ConversationService } from './conversation.service';

@Controller("conversation")
export class ConversationController {
  constructor(private readonly conversationService: ConversationService,
    private readonly messageService: MessageService) {}

  @Get('clientId/:clientId')
  getConversationsByClientId(@Param('clientId') clientId: string) {
    console.log("getConversationsByClientId");
    return this.conversationService.getConversationsByClientId(clientId);
  }

  @Get('id/:id')
  getConversationById(@Param('id') id: string) {
    console.log("getConversationById");
    return this.conversationService.getConversationById(id);
  }
  
  @Get("conversationLink/:conversationLink")
  async getConversationByUrlLink(@Param('conversationLink') conversationLink: string) {
    const res =await this.conversationService.getConversationByUrlLink(conversationLink);
    
    if(!!res && !!res.messages) {
      res.messages = await this.messageService.populateMessages(res.messages)
    }
    return res
  }

  @Post()
  async create(@Body() conversation: Conversation):Promise<Conversation> {
    return this.conversationService.create(conversation);
  }

  @Put()
  async updateAndPopulate(@Body() conversation: Conversation ):Promise<Conversation> {
    const updatedConv = await this.conversationService.update(conversation);
    if(!!updatedConv && !!updatedConv.messages) {
      updatedConv.messages = await this.messageService.populateMessages(updatedConv.messages)
    }
    return updatedConv;
  }

  @Put("/users")
  async addUserByConversationLink(@Query('conversationLink') conversationLink: string, @Body() user: User) {
    const conversation = await this.conversationService.addUserByConversationLink(conversationLink, user);
    if(!!conversation && !!conversation.messages) {
      conversation.messages = await this.messageService.populateMessages(conversation.messages)
    }
    return conversation
  }

  @Put("/users/name")
  updateUserName(@Body() user: { id: string, name: string}) {
    return this.conversationService.updateUserName(user.id, user.name);
  }

  @Delete()
  deleteConversation(@Query('id') id: string) {
    return this.conversationService.deleteConversation(id);
  }

  
}