import { Module } from '@nestjs/common';
import { MailConstants } from './mail.constants';
import { designatedMailSenders } from './designatedMailSenders';
import { privateMailDomains } from './privateMailDomains';
import { SubscriptionListConstants } from './subscription-list.constants';
import { subscriptionNewsletterList } from './subscriptionNewsletterList';
import { subscriptionSimpleNewsletterList } from './subscriptionSimpleNewsletterList';

@Module({
  providers: [
    MailConstants,
    SubscriptionListConstants,
    {
      provide: 'DESIGNATED_SENDERS',
      useValue: designatedMailSenders,
    },
    {
      provide: 'PRIVATE_MAIL_DOMAINS',
      useValue: privateMailDomains,
    },
    {
      provide: 'SUBSCRIPTION_LIST',
      useValue: subscriptionNewsletterList,
    },
    {
      provide: 'SIMPLE_SUBSCRIPTION_LIST',
      useValue: subscriptionSimpleNewsletterList,
    },
  ],
  exports: [MailConstants, SubscriptionListConstants],
})
export class ConstantsModule {}
