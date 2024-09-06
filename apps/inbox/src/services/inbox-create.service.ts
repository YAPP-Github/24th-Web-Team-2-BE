import { Injectable } from '@nestjs/common';
import { InboxRepository } from '../mongo/repositories/inbox.repository';

@Injectable()
export class InboxCreateService {
  constructor(private readonly inboxRepository: InboxRepository) {}

  async createInbox(userId: string) {
    console.log('inbox, service, userId', userId);
    return await this.inboxRepository.createInbox(userId);
  }
}
