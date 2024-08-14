import { Test, TestingModule } from '@nestjs/testing';
import { PublishAutomationController } from './publish-automation.controller';
import { PublishAutomationService } from './publish-automation.service';

describe('PublishAutomationController', () => {
  let publishAutomationController: PublishAutomationController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PublishAutomationController],
      providers: [PublishAutomationService],
    }).compile();

    publishAutomationController = app.get<PublishAutomationController>(PublishAutomationController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(publishAutomationController.getHello()).toBe('Hello World!');
    });
  });
});
