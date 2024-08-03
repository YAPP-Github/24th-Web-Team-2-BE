import { Injectable } from '@nestjs/common';
import { InboxRepository } from '../mongo/repositories/inbox.repository';

@Injectable()
export class InboxUpdateService {
  constructor(private readonly inboxRepository: InboxRepository) {}

  async addSubscription(userId: string, subscriptions: string[]) {
    return await this.inboxRepository.addSubscriptions(userId, subscriptions);
  }

  async addSpam(userId: string, spams: string[]) {
    return await this.inboxRepository.addSpams(userId, spams);
  }

  async addInterest(userId: string, interests: string[]) {
    return await this.inboxRepository.addInterests(userId, interests);
  }
}
