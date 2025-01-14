import { Injectable } from '@nestjs/common';
import { InboxRepository } from '../mongo/repositories/inbox.repository';
import { SubscriptionListConstants } from '@libs/common';
@Injectable()
export class InboxReadService {
  constructor(
    private readonly inboxRepository: InboxRepository,
    private readonly subscriptionList: SubscriptionListConstants,
  ) {}

  async getInbox(userId: string) {
    const inbox = await this.inboxRepository.findInboxByUserId(userId);
    return {
      inboxId: inbox._id,
      subscriptions: inbox.subscriptions,
      groups: inbox.groups,
      spams: inbox.spams,
      interests: inbox.interests,
      createdAt: inbox.createdAt,
      updatedAt: inbox.updatedAt,
    };
  }

  async getSubscriptions(userId: string) {
    const inbox = await this.inboxRepository.findInboxByUserId(userId);
    return inbox.subscriptions;
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

  async getSubscriptionsList() {
    return this.subscriptionList.subscriptionList;
  }

  async getSubscriptionsRandomList() {
    const simpleSubscriptionList = this.subscriptionList.simpleSubscriptionList;
    const randomList = simpleSubscriptionList.sort(() => 0.5 - Math.random()).slice(0, 3);
    return randomList;
  }
}
