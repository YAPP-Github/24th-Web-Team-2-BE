import { Module } from '@nestjs/common';
import { MailConstants } from './mail.constants';
import { designatedMailSenders } from './designatedMailSenders';

@Module({
  providers: [
    MailConstants,
    {
      provide: 'DESIGNATED_SENDERS',
      useValue: designatedMailSenders,
    },
  ],
  exports: [MailConstants],
})
export class ConstantsModule {}
