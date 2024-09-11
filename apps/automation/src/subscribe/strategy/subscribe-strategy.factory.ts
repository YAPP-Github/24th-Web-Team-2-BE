import { Injectable, BadRequestException } from '@nestjs/common';
import { DiscoveryService, Reflector } from '@nestjs/core';
import { SubscribeStrategy } from './subscribe-strategy.interface';
import { MAIL_DOMAIN } from '../decorator/mail-domain.decorator';

@Injectable()
export class SubscribeStrategyFactory {
  private strategies = new Map<string, SubscribeStrategy>();

  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly reflector: Reflector,
  ) {
    this.initializeStrategies();
  }

  private initializeStrategies() {
    const providers = this.discoveryService.getProviders();
    for (const provider of providers) {
      if (!provider.instance) continue;
      const domain = this.reflector.get<string>(MAIL_DOMAIN, provider.instance.constructor);
      if (domain) {
        this.strategies.set(domain, provider.instance);
      }
    }
  }

  create(mailDomain: string): SubscribeStrategy {
    const strategy = this.strategies.get(mailDomain);
    if (!strategy) {
      throw new BadRequestException(`Unsupported Automation: ${mailDomain}`);
    }
    return strategy;
  }
}
