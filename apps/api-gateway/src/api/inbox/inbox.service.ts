import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CustomRpcException } from 'libs/common/dist/exceptions/filter/custom-rpc.exception';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class InboxService {
  constructor(
    @Inject('INBOX_SERVICE')
    private readonly inboxClient: ClientProxy,
    @Inject('USER_SERVICE')
    private readonly userClient: ClientProxy,
  ) {}
  async addSubscriptions(userId: string, subscriptions: { name: string; address: string }[]) {
    return lastValueFrom(this.inboxClient.send({ cmd: 'add-subscriptions' }, { userId, subscriptions }));
  }

  async addInterests(userId: string, interests: { category: string }[]) {
    try {
      await lastValueFrom(this.inboxClient.send({ cmd: 'add-interests' }, { userId, interests }));
      await lastValueFrom(this.userClient.send({ cmd: 'change-onboarding-steps' }, { userId }));
    } catch (e) {
      /**
       * 보상 트랜잭션이 들어갔지만, 실제 특정 서버가 다운되어 롤백되는 경우 해당 서버에서는 롤백되지 않음
       * 그렇기 때문에, 추후 보상 트랜잭션에 대한 이벤트를 다룰 수 있는 외부의 queue를 사용해야 함
       * TODO: 추후 이벤트 큐를 사용하여 보상 트랜잭션을 다루도록 수정
       */
      await lastValueFrom(this.inboxClient.send({ cmd: 'delete-interests' }, { userId }));
      await lastValueFrom(this.userClient.send({ cmd: 'rollback-onboarding-steps' }, { userId }));
      throw new CustomRpcException('Failed to add interests', HttpStatus.INTERNAL_SERVER_ERROR);
    }
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

  async getSubscriptionsRandomList(userId: string) {
    const subscriptionRandomList = await lastValueFrom(this.inboxClient.send({ cmd: 'get-subscriptions-random-list' }, {}));
    const userSubscriptionList = await lastValueFrom(this.inboxClient.send({ cmd: 'get-subscriptions' }, { userId }));

    userSubscriptionList.subscriptions.forEach((userSubscription) => {
      subscriptionRandomList.subscriptions.forEach((subscription) => {
        if (subscription.name === userSubscription.name) {
          subscription.isSubscribed = true;
        }
      });
    });

    return subscriptionRandomList;
  }

  async getGroups(userId: string) {
    return lastValueFrom(this.inboxClient.send({ cmd: 'get-groups' }, { userId }));
  }

  async addGroup(userId: string, groupName: string) {
    return lastValueFrom(this.inboxClient.send({ cmd: 'add-group' }, { userId, groupName }));
  }

  async addSenderToGroup(userId: string, groupName: string, sender: { name: string; address: string }) {
    return lastValueFrom(this.inboxClient.send({ cmd: 'add-sender-to-group' }, { userId, groupName, sender }));
  }
}
