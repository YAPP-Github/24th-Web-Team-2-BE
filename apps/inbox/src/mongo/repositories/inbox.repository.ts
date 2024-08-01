import { Inject, Injectable } from '@nestjs/common';

import { Model } from 'mongoose';

import { ModelTokens } from '../tokens/model.tokens';
import { Inbox } from '../schemas/interfaces/inbox.interface';

@Injectable()
export class InboxRepository {
  constructor(@Inject(ModelTokens.INBOX_MODEL) private readonly inboxModel: Model<Inbox>) {}

  async createInbox(userId: string) {
    const inbox = new this.inboxModel({ userId });
    return await inbox.save();
  }

  async findInboxByUserId(userId: string) {
    return this.inboxModel.findOne({ userId });
  }

  async addSubscriptions(userId: string, addresses: string[]) {
    return this.inboxModel.findOneAndUpdate({ userId }, { $push: { subscriptions: { $each: addresses } } }, { new: true }).exec();
  }

  async addSpams(userId: string, addresses: string[]) {
    return this.inboxModel.findOneAndUpdate({ userId }, { $push: { spams: { $each: addresses } } }, { new: true }).exec();
  }

  async addInterests(userId: string, interests: string[]) {
    return this.inboxModel.findOneAndUpdate({ userId }, { $push: { interests: { $each: interests } } }, { new: true }).exec();
  }
}
