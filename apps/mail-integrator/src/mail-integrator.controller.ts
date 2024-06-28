import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { MailIntegratorService } from './mail-integrator.service';

@Controller()
export class MailIntegratorController {
  constructor(private readonly mailIntegratorService: MailIntegratorService) {}

  @MessagePattern({ cmd: 'helloWorld' })
  async helloWorld(): Promise<string> {
    return this.mailIntegratorService.getHello();
  }
}
