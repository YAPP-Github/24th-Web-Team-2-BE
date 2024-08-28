import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class InboxService {
  constructor(
    @Inject('INBOX_SERVICE')
    private readonly inboxClient: ClientProxy,
  ) {}
  async addSubscriptions(userId: string, subscriptions: { name: string; address: string }[]) {
    return lastValueFrom(this.inboxClient.send({ cmd: 'add-subscriptions' }, { userId, subscriptions }));
  }

  async addInterests(userId: string, interests: { category: string }[]) {
    return lastValueFrom(this.inboxClient.send({ cmd: 'add-interests' }, { userId, interests }));
  }

  async getSubscriptions(userId: string) {
    return lastValueFrom(this.inboxClient.send({ cmd: 'get-subscriptions' }, { userId }));
  }

  async addSpams(userId: string, spams: string[]) {
    return lastValueFrom(this.inboxClient.send({ cmd: 'add-spams' }, { userId, spams }));
  }

  async getSpams(userId: string) {
    return lastValueFrom(this.inboxClient.send({ cmd: 'get-spams' }, { userId }));
  }

  async getSubscriptionsList() {
    return lastValueFrom(this.inboxClient.send({ cmd: 'get-subscriptions-list' }, {}));
  }

  async getGroups(userId: string) {
    return lastValueFrom(this.inboxClient.send({ cmd: 'get-groups' }, { userId }));
  }
}
