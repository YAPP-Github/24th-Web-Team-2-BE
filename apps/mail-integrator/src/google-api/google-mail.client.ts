import { Injectable } from '@nestjs/common';
import { GoogleMailFactory } from './google-mail.factory';
import { gmail_v1 } from 'googleapis';

import gmailPageTokenCache from './caches/gmail-pageToken.cache';
import { MailContextService } from './mail-context.service';

@Injectable()
export class GoogleMailClient {
  constructor(
    private readonly googleMailFactory: GoogleMailFactory,
    private readonly mailContextService: MailContextService,
  ) {}

  async messages(): Promise<gmail_v1.Schema$Message[]> {
    const gmail = await this.googleMailFactory.gmail();
    const messageIdentifiers = await this.messageIdentifiers();
    const messagePromise = messageIdentifiers.map((message) => {
      const res = gmail.users.messages.get({
        userId: 'me',
        id: message.id,
        format: 'full',
        ...this.mailContextService.getMessagesFetchOption(),
      });
      return res;
    });
    const messages = await Promise.all(messagePromise);

    return messages.map((message) => message.data);
  }

  async addLabelsToMessage(messageId: string, labels: string[]): Promise<void> {
    const gmail = await this.googleMailFactory.gmail();
    await gmail.users.messages.modify({
      userId: 'me',
      id: messageId,
      requestBody: {
        addLabelIds: labels,
      },
    });
  }

  async removeLabelsFromMessage(messageId: string, labels: string[]): Promise<void> {
    const gmail = await this.googleMailFactory.gmail();
    await gmail.users.messages.modify({
      userId: 'me',
      id: messageId,
      requestBody: {
        removeLabelIds: labels,
      },
    });
  }

  async applyFilterBySender(from: string, labels: string[]) {
    const gmail = await this.googleMailFactory.gmail();
    gmail.users.settings.filters.create({
      userId: 'me',
      requestBody: {
        criteria: {
          from,
        },
        action: {
          addLabelIds: labels,
        },
      },
    });
  }

  // TODO: token cache를 별도의 provider로 분리
  private async messageIdentifiers() {
    const gmail = await this.googleMailFactory.gmail();
    const res = await gmail.users.messages.list({
      userId: 'me',
      pageToken: gmailPageTokenCache.get('userId'),
      ...this.mailContextService.getMessagesListOption(),
    });
    gmailPageTokenCache.set('userId', res.data.nextPageToken);

    return res.data.messages ?? [];
  }
}
