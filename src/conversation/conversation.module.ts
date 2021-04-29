import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from 'src/message/Message.schema';
import { MessageService } from 'src/message/message.service';
import { ConversationController } from './conversation.controller';
import { ConversationSchema } from './Conversation.schema';
import { ConversationService } from './conversation.service';

@Module({
    imports: [
      MongooseModule.forFeature([
        {
          name: "Conversation",
          schema: ConversationSchema
        },
      ]),
      MongooseModule.forFeature([
        {
          name: "Message",
          schema: MessageSchema
        },
      ])
    ],
    controllers: [ConversationController],
      providers: [ConversationService, MessageService]
  })
  export class ConversatioModule {}