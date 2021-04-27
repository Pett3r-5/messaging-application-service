import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../user/User.schema'


export type MessageDocument = Message & Document;

@Schema()
export class Message extends Document {
    @Prop()
    _id: Types.ObjectId

    @Prop({ required: function(message:string):boolean { return !!message } })
    content: string;

    @Prop({ type: User, required: true })
    sentBy: User

    @Prop({ required: true })
    createdAt: Date

    @Prop({ required: false })
    seen: boolean

    @Prop({required: false })
    deleted: boolean
}

export const MessageSchema = SchemaFactory.createForClass(Message);