import { Controller } from '@nestjs/common';

import { MailIntegratorService } from './mail-integrator.service';
import { ClientProxy, ClientProxyFactory, MessagePattern, Transport } from '@nestjs/microservices';
import { InboxClient } from '@libs/network/dist';
import { lastValueFrom } from 'rxjs';

@Controller()
export class MailIntegratorController {
  // URGENT: client proxy -> network client로 변경
  private client: ClientProxy;
  constructor(
    private readonly mailIntegratorService: MailIntegratorService,
    private readonly inboxClient: InboxClient,
  ) {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: process.env.INBOX_SERVICE_HOST,
        port: parseInt(process.env.INBOX_SERVICE_PORT),
      },
    });
  }

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
    // URGENT: inbox client 호출로 변경
    const inbox = await this.inboxClient.getInbox({ userId: data.userId });
    console.log('inbox', inbox);
    // (await lastValueFrom(this.client.send({ cmd: 'get-inbox' }, { userId: data.userId }))) as {
    //   inboxId: unknown;
    //   subscriptions: {
    //     name: string;
    //     address: string;
    //   }[];
    //   groups: {
    //     name: string;
    //     senders: {
    //       name: string;
    //       address: string;
    //     }[];
    //   }[];
    //   spams: string[];
    //   interests: [string];
    //   createdAt: Date;
    //   updatedAt: Date;
    // };

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
          ...rest,
        };
      }),
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
}
