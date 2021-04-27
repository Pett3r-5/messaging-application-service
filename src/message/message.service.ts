import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query, Types } from 'mongoose'
import { User } from 'src/user/User.schema';
import { Message } from './Message.schema';

@Injectable()
export class MessageService {
  constructor(@InjectModel("Message") private readonly message: Model<Message>) { }

  public createMessage(message: Message) {
    if (!message) {
      return Promise.reject("empty Message to be saved")
    }
    message._id = new Types.ObjectId()
    message.createdAt = new Date()
    message.seen = false;
    message.deleted = false;
    return this.message.create(message)
  }

  public updateMessage(message: Message) {
    return (this.message.findOneAndUpdate(
      { "_id": message._id },
      {
        "content": message.content,
        "sentBy": message.sentBy,
        "seen": message.seen || false,
        "deleted": message.deleted
      },
      { upsert: true }
    ))
  }

  public getMessageById(id: string) {
    return this.message.findById(id)
  }

  public getMessagesByIds(messages: Array<Types.ObjectId | string>) {
    let messageRequests: any = []
    messageRequests = messages.map((el: any) => this.message.findById(el))
    return Promise.all(messageRequests)
  }

  public updateUserName = (clientId: string, name: string) => (this.message.updateMany(
    { "sentBy.clientId": clientId },
    { "$set": { "sentBy.name": name } }
  ))
}
