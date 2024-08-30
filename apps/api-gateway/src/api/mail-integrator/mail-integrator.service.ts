import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MailIntegratorService {
  constructor(
    @Inject('MAIL_INTEGRATOR_SERVICE')
    private readonly mailClient: ClientProxy,
  ) {}

  async getMailSenders(userId: string) {
    return await lastValueFrom(this.mailClient.send({ cmd: 'get-mail-senders' }, { userId }));
  }

  async getUnreadMessages(userId: string, type: 'SENDER' | 'GROUP' | 'ALL', target?: string) {
    return await lastValueFrom(this.mailClient.send({ cmd: 'get-unread-messages' }, { userId, type, target }));
  }

  async getMessage(userId: string, mailId: string) {
    return await lastValueFrom(this.mailClient.send({ cmd: 'get-message' }, { userId, mailId }));
  }

  async removeMessage(userId: string, mailId: string) {
    return await lastValueFrom(this.mailClient.send({ cmd: 'remove-message' }, { userId, mailId }));
  }

  async modifyMessageAsRead(userId: string, mailId: string) {
    return await lastValueFrom(this.mailClient.send({ cmd: 'modify-message-as-read' }, { userId, mailId }));
  }

  async modifyMessageAsUnread(userId: string, mailId: string) {
    return await lastValueFrom(this.mailClient.send({ cmd: 'modify-message-as-unread' }, { userId, mailId }));
  }
}
