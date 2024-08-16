import { Injectable } from '@nestjs/common';
import { InboxRepository } from '../mongo/repositories/inbox.repository';

@Injectable()
export class InboxReadService {
  constructor(private readonly inboxRepository: InboxRepository) {}

  async getSubscriptions(userId: string) {
    const inbox = await this.inboxRepository.findInboxByUserId(userId);
    return inbox.subscriptions.map((sub) => {
      return {
        address: sub,
      };
    });
  }

  async getGroups(userId: string) {
    const inbox = await this.inboxRepository.findInboxByUserId(userId);
    return inbox.groups.map((group) => {
      return {
        groupId: group._id,
        name: group.name,
        senders: group.senders,
      };
    });
  }

  async getSpams(userId: string) {
    const inbox = await this.inboxRepository.findInboxByUserId(userId);
    return inbox.spams.map((spam) => {
      return {
        address: spam,
      };
    });
  }
}
