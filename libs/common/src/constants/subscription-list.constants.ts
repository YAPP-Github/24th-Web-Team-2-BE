import { Inject, Injectable } from '@nestjs/common';
import { SubscriptionList } from './subscriptionNewsletterList';

@Injectable()
export class SubscriptionListConstants {
  constructor(
    @Inject('SUBSCRIPTION_LIST')
    private readonly subscriptionNewsletterList: SubscriptionList,
  ) {}

  get subscriptionList() {
    return this.subscriptionNewsletterList;
  }
}
