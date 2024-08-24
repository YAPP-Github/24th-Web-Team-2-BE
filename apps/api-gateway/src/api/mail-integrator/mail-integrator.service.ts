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

  async removeMail(userId: string, mailId: string) {
    return await lastValueFrom(this.mailClient.send({ cmd: 'remove-mail' }, { userId, mailId }));
  }

  async modifyMailAsRead(userId: string, mailId: string) {
    return await lastValueFrom(this.mailClient.send({ cmd: 'modify-mail-as-read' }, { userId, mailId }));
  }

  async modifyMailAsUnread(userId: string, mailId: string) {
    return await lastValueFrom(this.mailClient.send({ cmd: 'modify-mail-as-unread' }, { userId, mailId }));
  }
}
