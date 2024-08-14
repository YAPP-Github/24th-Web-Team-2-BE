import { Injectable } from '@nestjs/common';

@Injectable()
export class PublishAutomationService {
  getHello(): string {
    return 'Hello World!';
  }
}
