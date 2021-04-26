
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../user/User.schema'


export type ConversationDocument = Conversation & Document;

@Schema()
export class Conversation {
    @Prop()
    _id: Types.ObjectId

    @Prop({ required: true })
    conversationLink: string;

    @Prop({ required: true })
    subject: string

    @Prop({ required: false })
    isPublic: boolean

    @Prop({ required: false })
    persist: boolean

    @Prop({required: true })
    users: Array<User>

    @Prop({ required: true })
    messages: Array<Types.ObjectId>
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);