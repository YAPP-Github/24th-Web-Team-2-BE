import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { InboxModule } from './inbox.module';
import { CustomRpcExceptionFilter } from '@libs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(InboxModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.INBOX_SERVICE_HOST,
      port: parseInt(process.env.INBOX_SERVICE_HOST),
    },
  });
  app.useGlobalFilters(new CustomRpcExceptionFilter());
  await app.listen();
}
bootstrap();
