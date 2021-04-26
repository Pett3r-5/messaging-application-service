import { Injectable } from '@nestjs/common';

@Injectable()
export class ConversationService {
  getHello(): string {
    return 'Hello World!';
  }
}
