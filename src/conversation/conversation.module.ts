import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
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
    ],
    controllers: [ConversationController],
      providers: [ConversationService]
  })
  export class ConversatioModule {}