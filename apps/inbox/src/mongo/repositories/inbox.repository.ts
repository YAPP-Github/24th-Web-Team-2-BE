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
    const inbox = await this.findByUserId(userId);
    inbox.spams.push(...addresses);
    return await inbox.save();
  }

  async addInterests(userId: string, interests: string[]) {
    const inbox = await this.findByUserId(userId);
    inbox.interests.push(...interests);
    return await inbox.save();
  }

  async findByUserId(userId: string) {
    const inbox = await this.inboxModel.findOne({ userId }).exec();
    if (!inbox) {
      throw new Error(`${userId}에 해당하는 Inbox가 존재하지 않음.`);
    }
    return inbox;
  }
}
