import { Controller } from '@nestjs/common';

import { MailIntegratorService } from './mail-integrator.service';
import { MessagePattern } from '@nestjs/microservices';
import { AttachAccessTokenRequest, InboxClient, MailIntegratorCommandToken } from '@libs/network/dist';
import gmailAccessTokenCache from './google-api/caches/gmail-accessToken.cache';

@Controller()
export class MailIntegratorController {
  constructor(
    private readonly mailIntegratorService: MailIntegratorService,
    private readonly inboxClient: InboxClient,
  ) {}

  @MessagePattern({ cmd: 'get-mail-senders' })
  async getMailSenders(data: { userId: string }) {
    const result = await this.mailIntegratorService.getMailSenders(data.userId);
    return {
      senders: result.map((sender) => {
        const { messageId, labels, ...rest } = sender;
        return {
          mailId: messageId,
          ...rest,
        };
      }),
    };
  }

  @MessagePattern({ cmd: 'get-unread-messages' })
  async getUnreadMessages(data: { userId: string; type: 'SENDER' | 'GROUP' | 'ALL'; target?: string }) {
    const inbox = await this.inboxClient.getInbox({ userId: data.userId });

    let addresses = [];
    switch (data.type) {
      case 'SENDER':
        addresses.push(data.target);
      case 'GROUP':
        addresses = inbox.groups.find((group) => group.name === data.target).senders.map((sender) => sender.address);
      case 'ALL':
        addresses = inbox.subscriptions.map((sub) => sub.address);
    }

    const messages = await this.mailIntegratorService.getUnreadMessages(data.userId, addresses);
    return {
      mails: messages.map((message) => {
        const { messageId, labels, ...rest } = message;
        return {
          mailId: messageId,
          read: false,
          ...rest,
        };
      }),
    };
  }

  @MessagePattern({ cmd: 'get-message' })
  async getMessage(data: { userId: string; mailId: string }) {
    const message = await this.mailIntegratorService.getMessage(data.userId, data.mailId);
    const { messageId, labels, ...rest } = message;
    return {
      mailId: messageId,
      read: false,
      ...rest,
    };
  }

  @MessagePattern({ cmd: 'remove-message' })
  async removeMessage(data: { userId: string; mailId: string }) {
    const res = await this.mailIntegratorService.removeMessage(data.userId, data.mailId);
    return res;
  }

  @MessagePattern({ cmd: 'modify-message-as-read' })
  async modifyMessageAsRead(data: { userId: string; mailId: string }) {
    const res = await this.mailIntegratorService.modifyMessageAsRead(data.userId, data.mailId);
    return res;
  }

  @MessagePattern({ cmd: 'modify-message-as-unread' })
  async modifyMessageAsUnread(data: { userId: string; mailId: string }) {
    const res = await this.mailIntegratorService.modifyMessageAsUnread(data.userId, data.mailId);
    return res;
  }

  @MessagePattern({ cmd: MailIntegratorCommandToken.ATTACH_ACCESS_TOKEN })
  async attachAccessToken(data: AttachAccessTokenRequest) {
    gmailAccessTokenCache.set(data.userId, data.accessToken);
  }
}
