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
    return this.conversationService.getConversationsByClientId(clientId);
  }

  @Get("persist-false/clientId/:clientId")
  async getConversationByClientIdAndPersistStatus(@Param('clientId') clientId: string) {
    return this.conversationService.getConversationByClientIdAndPersistStatus(clientId, false);
  }

  @Get('id/:id')
  getConversationById(@Param('id') id: string) {
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

  @Get("subject/:subject")
  async getConversationBySubject(@Param('subject') subject: string) {
    return this.conversationService.getConversationBySubject(subject);
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
  

  @Delete("/conversationLink/:conversationLink")
  async deleteConversation(@Param('conversationLink') conversationLink: string) {
    const conv = await this.getConversationByUrlLink(conversationLink)
    conv.messages.forEach((message)=>{
      this.messageService.deleteMessage(message)
    })

    return this.conversationService.deleteConversationByLink(conversationLink);
    
  }

  
}