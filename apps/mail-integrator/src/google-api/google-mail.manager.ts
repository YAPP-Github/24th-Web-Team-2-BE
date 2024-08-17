import { Injectable } from '@nestjs/common';
import { GoogleMailReader } from './google-mail.reader';
import { MailFetchPolicy } from './mail-fetch.policy';
import { Message } from './google-mail.parser';

import { MailContextService } from './mail-context.service';
import gmailPageTokenCache from './caches/gmail-pageToken.cache';

@Injectable()
export class GoogleMailManager {
  constructor(
    private readonly googleMailReader: GoogleMailReader,
    private readonly mailContextService: MailContextService,
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
}
