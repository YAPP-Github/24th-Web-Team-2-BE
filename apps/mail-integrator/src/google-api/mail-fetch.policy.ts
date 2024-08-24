import { Message } from './google-mail.parser';

export class MailFetchPolicy {
  private readonly fetchThreshold: Date;
  private flag: boolean;

  constructor(configure: { fetchThreshold: Date }) {
    this.flag = true;
    this.fetchThreshold = configure.fetchThreshold;
  }

  checkIfNext(message: Message) {
    try {
      if (message.date < this.fetchThreshold) {
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
