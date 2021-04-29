
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../user/User.schema'


export type ConversationDocument = Conversation & Document;

@Schema({ strict: true })
export class Conversation extends Document {
    @Prop()
    _id: Types.ObjectId

    @Prop({ required: true })
    conversationLink: string;

    @Prop({ required: false })
    subject: string

    @Prop({ required: false })
    isPublic: boolean

    @Prop({ required: false })
    persist: boolean

    @Prop({required: true })
    users: Array<User>

    @Prop({ required: true })
    messages: Types.ObjectId[] | string[]
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);