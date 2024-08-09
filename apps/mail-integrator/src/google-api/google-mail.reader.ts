import { Injectable } from '@nestjs/common';

import { GoogleMailClient } from './google-mail.client';
import { GoogleMailParser } from './google-mail.parser';

@Injectable()
export class GoogleMailReader {
  constructor(
    private readonly googleMailClient: GoogleMailClient,
    private readonly googleMailParser: GoogleMailParser,
  ) {}

  async readMessages() {
    const messages = await this.googleMailClient.messages();
    return messages.map((message) => this.googleMailParser.parse(message)).filter((messages) => messages !== undefined);
  }
}
