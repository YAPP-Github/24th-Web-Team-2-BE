import { Controller } from '@nestjs/common';

import { MailIntegratorService } from './mail-integrator.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class MailIntegratorController {
  constructor(private readonly mailIntegratorService: MailIntegratorService) {}

  @MessagePattern({ cmd: 'process-messages-onboarding' })
  async processMessages(data: { userId: string }) {
    await this.mailIntegratorService.processMessagesOnboarding(data.userId);
  }
}
