import { Injectable } from '@nestjs/common';
import { MailFetchPolicy } from './google-api/mail-fetch.policy';
import { GoogleMailManager } from './google-api/google-mail.manager';

@Injectable()
export class MailIntegratorService {
  constructor(private readonly googleMailManager: GoogleMailManager) {}

  async processMessagesOnboarding(userId: string) {
    // TODO: inbox API를 호출해서 하위의 값들을 채워넣는다.
    const lastFetch = new Date();
    const fetchThreshold = new Date();
    const senders = [];

    const policy = new MailFetchPolicy({ lastFetch, fetchThreshold, senders });

    await this.googleMailManager.processMessages(userId, policy);
  }
}
