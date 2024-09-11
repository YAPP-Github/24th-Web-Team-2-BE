import { Controller } from '@nestjs/common';
import { AutomationSubscribeService } from './automation-subscribe.service';
import { MessagePattern } from '@nestjs/microservices';
import { AutomationSubscribeRequest } from './subscribe/dtos/automation-subscribe.request';

@Controller()
export class AutomationController {
  constructor(private readonly automationSubscribeService: AutomationSubscribeService) {}

  @MessagePattern({ cmd: 'automation-subscribe-letter' })
  async automationSubscribeLetter(automationSubscribeRequest: AutomationSubscribeRequest) {
    const { domain, email, nickname } = automationSubscribeRequest;
    return await this.automationSubscribeService.subscribe(domain, email, nickname);
  }
}
