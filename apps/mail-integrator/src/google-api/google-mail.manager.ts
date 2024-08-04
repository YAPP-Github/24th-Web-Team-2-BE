import { Injectable } from '@nestjs/common';
import { GoogleMailReader } from './google-mail.reader';
import { MailFetchPolicy } from './mail-fetch.policy';
import { Message } from './google-mail.parser';

import { MailContextService } from './mail-context.service';

@Injectable()
export class GoogleMailManager {
  constructor(
    private readonly googleMailReader: GoogleMailReader,
    private readonly mailContextService: MailContextService,
  ) {}

  async processMessages(userId: string, mailPolicy: MailFetchPolicy) {
    this.mailContextService.setUserId(userId);
    while (mailPolicy.fetchFlag()) {
      const includedMessages: Message[] = [];
      const messages = await this.googleMailReader.readMessages();

      messages.forEach((message) => {
        mailPolicy.checkIfNext(message);
        if (mailPolicy.senderIncludeRule(message.from) && mailPolicy.fetchFlag()) {
          includedMessages.push(message);
        }
      });
      // TODO: includedMessage들을 inbox API를 호출해서 DB에 저장
    }

    return;
  }
}
