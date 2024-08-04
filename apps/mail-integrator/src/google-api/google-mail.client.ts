import { Injectable } from '@nestjs/common';
import { GoogleMailFactory } from './google-mail.factory';
import { gmail_v1 } from 'googleapis';

import gmailPageTokenCache from './caches/gmail-pageToken.cache';

@Injectable()
export class GoogleMailClient {
  constructor(private readonly googleMailFactory: GoogleMailFactory) {}

  async messages(): Promise<gmail_v1.Schema$Message[]> {
    const gmail = await this.googleMailFactory.gmail();
    const messageIdentifiers = await this.messageIdentifiers();
    const messagePromise = messageIdentifiers.messages.map((message) => {
      const res = gmail.users.messages.get({
        userId: 'me',
        id: message.id,
        format: 'full',
      });
      return res;
    });
    const messages = await Promise.all(messagePromise);

    return messages.map((message) => message.data);
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
    });
    gmailPageTokenCache.set('userId', res.data.nextPageToken);
    return res.data;
  }
}
