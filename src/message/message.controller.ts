import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Types } from 'mongoose';
import { Message } from './Message.schema';
import { MessageService } from './message.service';

@Controller("message")
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  createMessage(@Body() message: Message) {
    return this.messageService.createMessage(message)
  }

  @Put()
  updateMessage(@Body() message: Message) {
    return this.messageService.updateMessage(message)
  }

  @Get('id/:id')
  getMessageById(@Param('id') id: string) {
    return this.messageService.getMessageById(id)
  }

  @Put("user/name")
  updateUserName(@Body() user: { id: string, name: string}) {
    return this.messageService.updateUserName(user.id, user.name)
  }
}