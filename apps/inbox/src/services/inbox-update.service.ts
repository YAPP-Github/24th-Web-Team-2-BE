import { Injectable } from '@nestjs/common';
import { InboxRepository } from '../mongo/repositories/inbox.repository';

@Injectable()
export class InboxUpdateService {
  constructor(private readonly inboxRepository: InboxRepository) {}

  async addSubscriptions(userId: string, subscriptions: { name: string; address: string }[]) {
    return await this.inboxRepository.addSubscriptions(userId, subscriptions);
  }

  async addGroup(userId: string, groupName: string) {
    return await this.inboxRepository.addGroup(userId, groupName);
  }

  async addSenderToGroup(userId: string, groupId: string, sender: { name: string; address: string }) {
    return await this.inboxRepository.addSenderToGroup(userId, groupId, sender);
  }

  async addSpam(userId: string, spams: string[]) {
    return await this.inboxRepository.addSpams(userId, spams);
  }

  async addInterest(userId: string, interests: string[]) {
    return await this.inboxRepository.addInterests(userId, interests);
  }
}
