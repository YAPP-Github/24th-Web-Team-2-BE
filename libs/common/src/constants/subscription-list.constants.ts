import { Inject, Injectable } from '@nestjs/common';
import { SubscriptionList } from './subscriptionNewsletterList';
import { SimpleNewsletter } from './subscriptionSimpleNewsletterList';

@Injectable()
export class SubscriptionListConstants {
  constructor(
    @Inject('SUBSCRIPTION_LIST')
    private readonly subscriptionNewsletterList: SubscriptionList,
    @Inject('SIMPLE_SUBSCRIPTION_LIST')
    private readonly subscriptionSimpleNewsletterList: SimpleNewsletter[],
  ) {}

  get subscriptionList() {
    return this.subscriptionNewsletterList;
  }

  get simpleSubscriptionList() {
    return this.subscriptionSimpleNewsletterList;
  }
}
