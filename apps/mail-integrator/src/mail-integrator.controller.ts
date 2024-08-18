import { Controller } from '@nestjs/common';

import { MailIntegratorService } from './mail-integrator.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class MailIntegratorController {
  constructor(private readonly mailIntegratorService: MailIntegratorService) {}

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
    // TODO inbox API 호출
    const inbox = {} as any; // user Id로 가져온 inbox 엔티티
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
}
