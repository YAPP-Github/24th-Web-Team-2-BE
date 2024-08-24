import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { MailIntegratorCommandToken } from './mail-integrator-command.token';
import { GetMailSendersRequest, GetUnreadMessagesRequest } from '../@types/mail-integrator/mail-integrator-service.request';
import { GetMailSendersResponse, GetUnreadMessagesResponse } from '../@types/mail-integrator/mail-integrator-service.response';

@Injectable()
export class MailIntegratorClient {
  constructor(@Inject('MAIL_INTEGRATOR_SERVICE') private client: ClientProxy) {}

  async getMailSenders(request: GetMailSendersRequest): Promise<GetMailSendersResponse> {
    return lastValueFrom(this.client.send({ cmd: MailIntegratorCommandToken.GET_MAIL_SENDERS }, request));
  }

  async getUnreadMessages(request: GetUnreadMessagesRequest): Promise<GetUnreadMessagesResponse> {
    return lastValueFrom(this.client.send({ cmd: MailIntegratorCommandToken.GET_UNREAD_MESSAGES }, request));
  }

  async modifyMessageAsRead(request: GetUnreadMessagesRequest): Promise<void> {
    return lastValueFrom(this.client.send({ cmd: MailIntegratorCommandToken.MODIFY_MESSAGE_AS_READ }, request));
  }

  async modifyMessageAsUnread(request: GetUnreadMessagesRequest): Promise<void> {
    return lastValueFrom(this.client.send({ cmd: MailIntegratorCommandToken.MODIFY_MESSAGE_AS_UNREAD }, request));
  }
}
