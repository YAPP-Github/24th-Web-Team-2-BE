import { Injectable } from '@nestjs/common';
import { MailFetchPolicy } from './google-api/mail-fetch.policy';
import { GoogleMailManager } from './google-api/google-mail.manager';
import { Message } from './google-api/google-mail.parser';
import { MailContextService } from './google-api/mail-context.service';
import { MailConstants } from '@libs/common';
import { GmailQueryBuilder } from './google-api/google-mail.querybuilder';

@Injectable()
export class MailIntegratorService {
  constructor(
    private readonly googleMailManager: GoogleMailManager,
    private readonly mailContextService: MailContextService,
    private readonly mailConsants: MailConstants,
  ) {}

  async getMailSenders(userId: string) {
    this.mailContextService.setMessagesFetchOption({
      userId: 'me',
      format: 'full',
    });

    // TODO: date 설정 분리
    const currentDate = new Date();
    const fetchThreshold = new Date(currentDate);
    fetchThreshold.setMonth(currentDate.getMonth() - 1);

    const policy = new MailFetchPolicy({ fetchThreshold });

    // 게인 메일 제외하기
    const queryBuilder = new GmailQueryBuilder();
    const query = queryBuilder
      .excludeFromDomains(this.mailConsants.privateMailDomains)
      .and()
      .excludeLabels(['SENT'])
      .and()
      .newerThan(1, 'm')
      .buildQuery();
    this.mailContextService.setMessagesListOption({ q: query });

    const senderMap = new Map<string, Message>();
    for await (const messages of this.googleMailManager.retrieveMessages(userId, policy)) {
      messages.forEach((message) => {
        if (!senderMap.has(message.from.address)) {
          senderMap.set(message.from.address, message);
        }
      });
    }
    return Array.from(senderMap.values());
  }

  async getUnreadMessages(userId: string, addresses: string[]) {
    // TODO: date 설정 분리
    const currentDate = new Date();
    const fetchThreshold = new Date(currentDate);
    fetchThreshold.setMonth(currentDate.getMonth() - 3);

    const policy = new MailFetchPolicy({ fetchThreshold });
    const query = new GmailQueryBuilder()
      .includeFromDomains(addresses)
      .and()
      .includeLabels(['UNREAD'])
      .and()
      .excludeLabels(['SENT'])
      .and()
      .newerThan(3, 'm')
      .buildQuery();

    this.mailContextService.setMessagesListOption({ userId: 'me', q: query });

    const msgs: Message[] = await this.googleMailManager.retrieveMessagesOnce(userId);

    return msgs;
  }

  async modifyMessageAsRead(userId: string, messageId: string) {
    return await this.googleMailManager.modifyMessageAsRead(userId, messageId);
  }

  async modifyMessageAsUnread(userId: string, messageId: string) {
    return await this.googleMailManager.modifyMessageAsUnread(userId, messageId);
  }

  async removeMessage(userId: string, messageId: string) {
    return await this.googleMailManager.removeMessage(userId, messageId);
  }
}
