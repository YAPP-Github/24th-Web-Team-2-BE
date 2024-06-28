import { Injectable } from '@nestjs/common';

@Injectable()
export class MailIntegratorService {
  getHello(): string {
    return 'Hello World!';
  }
}
