import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { InboxCreateService } from './services/inbox-create.service';
import { InboxUpdateService } from './services/inbox-update.service';
import { InboxReadService } from './services/inbox-read.service';

@Controller()
export class InboxController {
  constructor(
    private readonly inboxReadService: InboxReadService,
    private readonly inboxCreateService: InboxCreateService,
    private readonly inboxUpdateService: InboxUpdateService,
  ) {}

  @MessagePattern({ cmd: 'create-inbox' })
  async createInbox(data: { userId: string }) {
    return await this.inboxCreateService.createInbox(data.userId);
  }

  @MessagePattern({ cmd: 'add-subscriptions' })
  async addSubscription(data: { userId: string; subscriptions: { name: string; address: string }[] }) {
    return await this.inboxUpdateService.addSubscriptions(data.userId, data.subscriptions);
  }

  @MessagePattern({ cmd: 'add-group' })
  async addGroup(data: { userId: string; groupName: string }) {
    return await this.inboxUpdateService.addGroup(data.userId, data.groupName);
  }

  @MessagePattern({ cmd: 'add-sender-to-group' })
  async addSenderToGroup(data: { userId: string; groupName: string; sender: { name: string; address: string } }) {
    return await this.inboxUpdateService.addSenderToGroup(data.userId, data.groupName, data.sender);
  }

  @MessagePattern({ cmd: 'add-spams' })
  async addSpam(data: { userId: string; spams: string[] }) {
    return await this.inboxUpdateService.addSpam(data.userId, data.spams);
  }

  @MessagePattern({ cmd: 'add-interests' })
  async addInterest(data: { userId: string; interests: { category: string }[] }) {
    console.log('hihihi');
    return await this.inboxUpdateService.addInterest(
      data.userId,
      data.interests.map((interest) => interest.category),
    );
  }

  @MessagePattern({ cmd: 'get-inbox' })
  async getInbox(data: { userId: string }) {
    return await this.inboxReadService.getInbox(data.userId);
  }

  @MessagePattern({ cmd: 'get-subscriptions' })
  async getSubscriptions(data: { userId: string }) {
    const res = await this.inboxReadService.getSubscriptions(data.userId);
    return {
      subscriptions: res,
    };
  }

  @MessagePattern({ cmd: 'get-groups' })
  async getGroups(data: { userId: string }) {
    const res = await this.inboxReadService.getGroups(data.userId);
    return {
      groups: res,
    };
  }

  @MessagePattern({ cmd: 'get-spams' })
  async getSpams(data: { userId: string }) {
    const res = await this.inboxReadService.getSpams(data.userId);
    return {
      spams: res,
    };
  }

  @MessagePattern({ cmd: 'get-subscriptions-list' })
  async getSubscriptionsList() {
    const res = await this.inboxReadService.getSubscriptionsList();
    return {
      subscriptions: res,
    };
  }

  @MessagePattern({ cmd: 'get-subscriptions-random-list' })
  async getSubscriptionsRandomList() {
    const res = await this.inboxReadService.getSubscriptionsRandomList();
    return {
      subscriptions: res,
    };
  }

  @MessagePattern({ cmd: 'delete-interests' })
  async deleteInterests(data: { userId: string }) {
    return await this.inboxUpdateService.deleteInterests(data.userId);
  }
}
