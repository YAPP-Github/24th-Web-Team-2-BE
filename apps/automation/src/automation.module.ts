import { Module } from '@nestjs/common';
import { AutomationController } from './automation.controller';
import { AutomationSubscribeService } from './automation-subscribe.service';
import { SubscribeStrategyFactory } from './subscribe/strategy/subscribe-strategy.factory';
import { Careet } from './subscribe/strategy/careet';
import { NewNick } from './subscribe/strategy/new-nick';
import { NuggetLetter } from './subscribe/strategy/nugget-letter';
import { DiscoveryService } from '@nestjs/core';

@Module({
  imports: [],
  controllers: [AutomationController],
  providers: [AutomationSubscribeService, SubscribeStrategyFactory, NewNick, Careet, NuggetLetter, DiscoveryService],
})
export class AutomationModule {}
