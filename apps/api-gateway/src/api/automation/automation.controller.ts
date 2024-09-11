import { Body, Controller, Post } from '@nestjs/common';
import { AutomationService } from './automation.service';
import { AutomationSubscribeRequest } from './dtos/automation-subscribe.request';

@Controller('automation')
export class AutomationController {
  constructor(private readonly automationService: AutomationService) {}

  @Post('subscribe/newsletter')
  async automationSubscribe(@Body() subscribeNewsletterRequest: AutomationSubscribeRequest) {
    const { domain, email, nickname } = subscribeNewsletterRequest;
    return await this.automationService.subscribeNewsletter(domain, email, nickname);
  }
}
