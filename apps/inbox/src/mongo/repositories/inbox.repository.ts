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

  async addSubscriptions(userId: string, addresses: { name: string; address: string }[]) {
    const inbox = await this.findByUserId(userId);
    inbox.subscriptions.push(...addresses);
    return await inbox.save();
  }

  async addGroup(userId: string, groupName: string) {
    const inbox = await this.findByUserId(userId);
    inbox.groups.push({ name: groupName, senders: [] });
    return await inbox.save();
  }

  async addSenderToGroup(userId: string, groupId: string, sender: { name: string; address: string }) {
    const inbox = await this.findByUserId(userId);
    const group = inbox.groups.id(groupId);
    group.senders.push(sender);
    return await inbox.save();
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

  // TODO: IDK Mongoose
  async deleteInterests(userId: string) {
    const inbox = await this.findByUserId(userId);
    inbox.set('interests', []);
    return await inbox.save();
  }
}
