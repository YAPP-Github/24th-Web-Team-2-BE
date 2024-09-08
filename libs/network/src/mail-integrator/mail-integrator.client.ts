import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { MailIntegratorCommandToken } from './mail-integrator-command.token';
import {
  AttachAccessTokenRequest,
  GetMailSendersRequest,
  GetMessageRequest,
  GetUnreadMessagesRequest,
  RemoveMessageRequest,
} from '../@types/mail-integrator/mail-integrator-service.request';
import {
  GetMailSendersResponse,
  GetMessageResponse,
  GetUnreadMessagesResponse,
} from '../@types/mail-integrator/mail-integrator-service.response';

@Injectable()
export class MailIntegratorClient {
  constructor(@Inject('MAIL_INTEGRATOR_SERVICE') private client: ClientProxy) {}

  async getMailSenders(request: GetMailSendersRequest): Promise<GetMailSendersResponse> {
    return await lastValueFrom(this.client.send({ cmd: MailIntegratorCommandToken.GET_MAIL_SENDERS }, request));
  }

  async getUnreadMessages(request: GetUnreadMessagesRequest): Promise<GetUnreadMessagesResponse> {
    return await lastValueFrom(this.client.send({ cmd: MailIntegratorCommandToken.GET_UNREAD_MESSAGES }, request));
  }

  async getMessage(request: GetMessageRequest): Promise<GetMessageResponse> {
    return await lastValueFrom(this.client.send({ cmd: MailIntegratorCommandToken.GET_MESSAGE }, request));
  }

  async modifyMessageAsRead(request: GetUnreadMessagesRequest): Promise<void> {
    return await lastValueFrom(this.client.send({ cmd: MailIntegratorCommandToken.MODIFY_MESSAGE_AS_READ }, request));
  }

  async modifyMessageAsUnread(request: GetUnreadMessagesRequest): Promise<void> {
    return await lastValueFrom(this.client.send({ cmd: MailIntegratorCommandToken.MODIFY_MESSAGE_AS_UNREAD }, request));
  }

  async removeMessage(request: RemoveMessageRequest): Promise<void> {
    return await lastValueFrom(this.client.send({ cmd: MailIntegratorCommandToken.REMOVE_MESSAGE }, request));
  }

  async attachAccessToken(request: AttachAccessTokenRequest): Promise<void> {
    return lastValueFrom(this.client.send({ cmd: MailIntegratorCommandToken.ATTACH_ACCESS_TOKEN }, request));
  }
}
