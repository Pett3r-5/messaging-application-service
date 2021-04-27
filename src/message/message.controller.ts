import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { Types } from 'mongoose';
import { Message } from './Message.schema';
import { MessageService } from './message.service';

@Controller("message")
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  createMessage(@Body('message') message: Message) {
    return this.messageService.createMessage(message)
  }

  @Put()
  updateMessage(@Body('message') message: Message) {
    return this.messageService.updateMessage(message)
  }

  @Get()
  getMessageById(@Query('id') id: string) {
    return this.messageService.getMessageById(id)
  }

  @Put("populate")
  populateMessages(@Body('messages') messages: Array<Types.ObjectId | string>) {
    return this.messageService.getMessagesByIds(messages)
  }

  @Get()
  updateUserName(@Query('clientId') clientId: string, @Query('name') name: string) {
    return this.messageService.updateUserName(clientId, name)
  }
}