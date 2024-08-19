import { Module } from '@nestjs/common';
import { MailConstants } from './mail.constants';
import { designatedMailSenders } from './designatedMailSenders';
import { privateMailDomains } from './privateMailDomains';

@Module({
  providers: [
    MailConstants,
    {
      provide: 'DESIGNATED_SENDERS',
      useValue: designatedMailSenders,
    },
    {
      provide: 'PRIVATE_MAIL_DOMAINS',
      useValue: privateMailDomains,
    },
  ],
  exports: [MailConstants],
})
export class ConstantsModule {}
