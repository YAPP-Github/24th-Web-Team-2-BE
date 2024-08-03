import { Injectable } from '@nestjs/common';
import { InboxRepository } from '../mongo/repositories/inbox.repository';

@Injectable()
export class InboxCreateService {
  constructor(private readonly inboxRepository: InboxRepository) {}

  async createInbox(userId: string) {
    return await this.inboxRepository.createInbox(userId);
  }
}
