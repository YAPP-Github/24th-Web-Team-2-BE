import { Inject, Injectable } from '@nestjs/common';
import { MailSender } from './designatedMailSenders';

@Injectable()
export class MailConstants {
  constructor(
    @Inject('DESIGNATED_SENDERS')
    private readonly designatedSenders: MailSender[],
  ) {}

  get designatedSenderAddresses() {
    return this.designatedSenders.map((sender) => sender.address);
  }

  get designatedSenderAddressMap() {
    return new Map(this.designatedSenders.map((sender) => [sender.address, sender]));
  }
}
