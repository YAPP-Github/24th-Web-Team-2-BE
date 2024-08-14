import { Module } from '@nestjs/common';
import { PublishAutomationController } from './publish-automation.controller';
import { PublishAutomationService } from './publish-automation.service';

@Module({
  imports: [],
  controllers: [PublishAutomationController],
  providers: [PublishAutomationService],
})
export class PublishAutomationModule {}
