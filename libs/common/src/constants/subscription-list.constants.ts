import { Inject, Injectable } from '@nestjs/common';
import { Newsletter, SubscriptionList } from './subscriptionNewsletterList';

@Injectable()
export class SubscriptionListConstants {
  constructor(
    @Inject('SUBSCRIPTION_LIST')
    private readonly subscriptionNewsletterList: SubscriptionList,
    @Inject('SIMPLE_SUBSCRIPTION_LIST')
    private readonly subscriptionSimpleNewsletterList: Newsletter[],
  ) {}

  get subscriptionList() {
    return this.subscriptionNewsletterList;
  }

  get simpleSubscriptionList() {
    return this.subscriptionSimpleNewsletterList;
  }
}
