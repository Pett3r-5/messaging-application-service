import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConversatioModule } from './conversation/conversation.module';
import { MessageModule } from './message/message.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRoot(process.env.DATABASE_URL), ConversatioModule, MessageModule, UserModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
