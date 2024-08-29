import { Injectable } from '@nestjs/common';
import { GoogleMailReader } from './google-mail.reader';
import { MailFetchPolicy } from './mail-fetch.policy';
import { Message } from './google-mail.parser';

import { MailContextService } from './mail-context.service';
import gmailPageTokenCache from './caches/gmail-pageToken.cache';
import { GoogleMailClient } from './google-mail.client';

@Injectable()
export class GoogleMailManager {
  constructor(
    private readonly googleMailReader: GoogleMailReader,
    private readonly mailContextService: MailContextService,
    private readonly mailClient: GoogleMailClient,
  ) {}

  async *retrieveMessages(userId: string, mailPolicy: MailFetchPolicy) {
    this.mailContextService.setUserId(userId);
    while (mailPolicy.fetchFlag() && gmailPageTokenCache.get('userId') !== null) {
      const messages = await this.googleMailReader.readMessages();
      const includedMessages: Message[] = [];
      messages.forEach((message) => {
        mailPolicy.checkIfNext(message);
        if (mailPolicy.fetchFlag()) {
          includedMessages.push(message);
        }
      });

      if (includedMessages.length > 0) {
        yield includedMessages;
      }
    }
    // TODO: token cache 일괄 관리하도록 수정
    gmailPageTokenCache.del('userId');
  }

  async retrieveMessagesOnce(userId: string) {
    this.mailContextService.setUserId(userId);
    return await this.googleMailReader.readMessages();
  }

  async retrieveMessage(userId: string, messageId: string) {
    this.mailContextService.setUserId(userId);
    return await this.googleMailReader.readMessage(messageId);
  }

  async modifyMessageAsRead(userId: string, messageId: string) {
    this.mailContextService.setUserId(userId);
    return await this.mailClient.removeLabelsFromMessage(messageId, ['UNREAD']);
  }

  async modifyMessageAsUnread(userId: string, messageId: string) {
    this.mailContextService.setUserId(userId);
    return await this.mailClient.addLabelsToMessage(messageId, ['UNREAD']);
  }

  async removeMessage(userId: string, messageId: string) {
    this.mailContextService.setUserId(userId);
    return await this.mailClient.removeMessage(messageId);
  }
}
