import { Message } from './google-mail.parser';

export class MailFetchPolicy {
  private readonly lastFetch: Date;
  private readonly fetchThreshold: Date;
  private readonly designatedSenders: Set<string>;
  private flag: boolean;

  constructor(configure: { lastFetch: Date; fetchThreshold: Date; senders: string[] }) {
    this.flag = true;
    this.lastFetch = configure.lastFetch;
    this.fetchThreshold = configure.fetchThreshold;
    this.designatedSenders = new Set();
    configure.senders.forEach((sender) => this.designatedSenders.add(sender));
  }

  senderIncludeRule(sender: string) {
    return this.designatedSenders.has(sender);
  }

  checkIfNext(message: Message) {
    try {
      if (message.date < this.fetchThreshold || message.date < this.lastFetch) {
        this.flag = false;
      }
    } catch (e) {
      console.log(message);
    }
  }

  fetchFlag() {
    return this.flag;
  }
}
