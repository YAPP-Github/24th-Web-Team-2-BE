import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  AddGroupRequest,
  AddInterestRequest,
  AddSenderToGroupRequest,
  AddSpamRequest,
  AddSubscriptionRequest,
  CreateInboxRequest,
  GetGroupsRequest,
  GetInboxRequest,
  GetSpamsRequest,
  GetSubscriptionsRequest,
} from '../@types/inbox/inbox-service.request';

import { InboxCommandToken } from './inbox-commad.token';
import { GetInboxResponse } from '../@types/inbox/inbox-service.response';

@Injectable()
export class InboxClient {
  constructor(@Inject('INBOX_SERVICE') private readonly client: ClientProxy) {}

  async createInbox(request: CreateInboxRequest) {
    return lastValueFrom(this.client.send({ cmd: InboxCommandToken.CREATE_INBOX }, request));
  }

  async addSubscription(request: AddSubscriptionRequest) {
    return lastValueFrom(this.client.send({ cmd: InboxCommandToken.ADD_SUBSCRIPTIONS }, request));
  }

  async addGroup(request: AddGroupRequest) {
    return lastValueFrom(this.client.send({ cmd: InboxCommandToken.ADD_GROUP }, request));
  }

  async addSenderToGroup(request: AddSenderToGroupRequest) {
    return lastValueFrom(this.client.send({ cmd: InboxCommandToken.ADD_SENDER_TO_GROUP }, request));
  }

  async addSpams(request: AddSpamRequest) {
    return lastValueFrom(this.client.send({ cmd: InboxCommandToken.ADD_SPAMS }, request));
  }

  async addInterest(request: AddInterestRequest) {
    return lastValueFrom(this.client.send({ cmd: InboxCommandToken.ADD_INTERESTS }, request));
  }

  async getSubscriptions(request: GetSubscriptionsRequest) {
    return lastValueFrom(this.client.send({ cmd: InboxCommandToken.GET_SUBSCRIPTIONS }, request));
  }

  async getGroups(request: GetGroupsRequest) {
    return lastValueFrom(this.client.send({ cmd: InboxCommandToken.GET_GROUPS }, request));
  }

  async getSpams(request: GetSpamsRequest) {
    return lastValueFrom(this.client.send({ cmd: InboxCommandToken.GET_SPAMS }, request));
  }

  async getInbox(request: GetInboxRequest): Promise<GetInboxResponse> {
    return lastValueFrom(this.client.send({ cmd: InboxCommandToken.GET_INBOX }, request));
  }
}
