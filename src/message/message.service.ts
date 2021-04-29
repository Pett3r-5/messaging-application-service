import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query, Types } from 'mongoose'
import { User } from 'src/user/User.schema';
import { Message } from './Message.schema';

@Injectable()
export class MessageService {
  constructor(@InjectModel("Message") private readonly message: Model<Message>) { }

  public createMessage(message: Message) {
    console.log("createMessage")
    console.log(message)
    if (!message) {
      return Promise.reject("trying to save empty Messagesaved")
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
    messageRequests = messages.map((el: any) => this.message.findById(new Types.ObjectId(el)))
    return Promise.all(messageRequests)
  }

  public async populateMessages(messages: Array<Types.ObjectId | string>) {
    console.log("populate")
    console.log(messages)
    
    const stringIds = messages.filter(message=>typeof message==="string")
    const objectMessages = messages.filter(message=>!(typeof message==="string"))
    const populatedMessages:any = await this.getMessagesByIds(stringIds)
    if(!!objectMessages && objectMessages.length> 1) {
      return objectMessages.concat(populatedMessages)
    }
    return populatedMessages
  }

  public updateUserName = (clientId: string, name: string) => (this.message.updateMany(
    { "sentBy.clientId": clientId },
    { "$set": { "sentBy.name": name } }
  ))
}
