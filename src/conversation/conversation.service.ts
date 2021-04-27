import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query, Types } from 'mongoose'
import { User } from 'src/user/User.schema';
import { Conversation } from './Conversation.schema';

@Injectable()
export class ConversationService {
  constructor(@InjectModel("Conversation") private readonly conversation: Model<Conversation>) { }

  public getConversationsByClientId = (clientId: string) => this.conversation.find({ "users.clientId": clientId })

  public getConversationById = (id: string): Query<Conversation | null, Conversation> => this.conversation.findById(id)

  public getConversationByUrlLink = (conversationLink: string) => this.conversation.findOne({ "conversationLink": conversationLink })

  public addUserByConversationLink(conversationLink: string, user: User) {
    user.isConversationOwner = false;
    user.isOnline = true;
    return (
      this.conversation.findOneAndUpdate({ "conversationLink": conversationLink },
        {
          $push:
          {
            clientId: user.clientId,
            name: user.name,
            isConversationOwner: false,
            isOnline: true
          }
        },
        { new: true }
      ))
  }

  public save = (conversation: Conversation) => {
    if (!conversation) {
      return Promise.reject("empty conversation to be saved")
    }

    if (!conversation._id) {
      conversation._id = new Types.ObjectId()
      return this.conversation.create(conversation)
    }
    return this.conversation.findOneAndUpdate(
      { "_id": conversation._id },
      {
        "conversationLink": conversation.conversationLink,
        "users": conversation.users,
        "messages": conversation.messages
      },
      { upsert: true }
    )
  }

  public updateUserName = (id: string, name: string) => (this.conversation.updateMany(
    { "users.clientId": id },
    { "users.$.name": name }))

  public deleteConversation = (id: string) => this.conversation.findByIdAndDelete(id)
}
