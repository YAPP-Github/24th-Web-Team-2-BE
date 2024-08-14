import { Controller, Get } from '@nestjs/common';
import { PublishAutomationService } from './publish-automation.service';

@Controller()
export class PublishAutomationController {
  constructor(private readonly publishAutomationService: PublishAutomationService) {}

  @Get()
  getHello(): string {
    return this.publishAutomationService.getHello();
  }
}
