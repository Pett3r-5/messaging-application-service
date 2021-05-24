import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query, Types, Schema } from 'mongoose'
import { User } from 'src/user/User.schema';
import { Conversation } from './Conversation.schema';

@Injectable()
export class ConversationService {
  constructor(@InjectModel("Conversation") private readonly conversation: Model<Conversation>) { }

  public getConversationsByClientId = (clientId: string) => this.conversation.find({ "users.clientId": clientId })

  public getConversationById = (id: string): Query<Conversation | null, Conversation> => this.conversation.findById(id)

  public getConversationByUrlLink = (conversationLink: string) => this.conversation.findOne({ "conversationLink": conversationLink })

  public getConversationBySubject = (subject: string) => (this.conversation.find({
    isPublic: true,
    subject: new RegExp(subject, 'i')
  }).sort({_id:-1}))

  public async addUserByConversationLink(conversationLink: string, user: User) {
    user.isConversationOwner = false;
    user.isOnline = true;

    const conversationAlreadyHasUser = await this.conversation.findOne({"conversationLink": conversationLink, "users.clientId": user.clientId}).exec()
    if(!!conversationAlreadyHasUser) {
      return conversationAlreadyHasUser
    }

    return (
      this.conversation.findOneAndUpdate({ "conversationLink": conversationLink },
        {
          $push: {
            "users": {
              clientId: user.clientId,
              name: user.name,
              isConversationOwner: false,
              isOnline: true
            }
          }
        },
        { new: true }
      ))
  }

  public create = (conversation: Conversation) => {
    if (!conversation) {
      return Promise.reject("empty conversation to be saved")
    }

    conversation._id = new Types.ObjectId()
    return this.conversation.create(conversation)
  }

  public update = (conversation: Conversation) => {
    if (!conversation || !conversation._id) {
      return Promise.reject("invalid conversation to be updated")
    }

    return this.conversation.findOneAndUpdate(
      { "_id": new Types.ObjectId(conversation._id) },
      {
        "conversationLink": conversation.conversationLink,
        "users": conversation.users,
        "messages": conversation.messages
      },
      { upsert: true, new:true, useFindAndModify: false }
    ).exec()
  }


  public updateUserName = (id: string, name: string) => (this.conversation.updateMany(
    { "users.clientId": id },
    { "users.$.name": name }))

  public deleteConversationByLink = (conversationLink: string) => this.conversation.findOneAndDelete({ "conversationLink": conversationLink })

  public getConversationByClientIdAndPersistStatus = (clientId:string, persist:boolean) => this.conversation.find({"users.clientId": clientId, "persist": persist})

  
}
