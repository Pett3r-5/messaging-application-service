
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


export type UserDocument = User & Document;

@Schema()
export class User extends Document {
    @Prop({ required: true })
    clientId: String

    @Prop({ required: true })
    name: string;

    @Prop({ required: false })
    isConversationOwner: boolean

    @Prop({ required: true })
    isOnline: boolean
}

export const UserSchema = SchemaFactory.createForClass(User);