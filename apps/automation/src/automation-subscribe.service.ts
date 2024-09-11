import { Injectable } from '@nestjs/common';
import { SubscribeStrategyFactory } from './subscribe/strategy/subscribe-strategy.factory';

@Injectable()
export class AutomationSubscribeService {
  constructor(private readonly subscribeStrategyFactory: SubscribeStrategyFactory) {}
  async subscribe(mailDomain: string, email: string, nickname?: string) {
    const strategy = this.subscribeStrategyFactory.create(mailDomain);
    return await strategy.subscribe(email, nickname);
  }
}
