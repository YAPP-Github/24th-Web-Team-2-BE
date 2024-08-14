import { NestFactory } from '@nestjs/core';
import { PublishAutomationModule } from './publish-automation.module';

async function bootstrap() {
  const app = await NestFactory.create(PublishAutomationModule);
  await app.listen(3000);
}
bootstrap();
