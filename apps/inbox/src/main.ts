import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { InboxModule } from './inbox.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(InboxModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.INBOX_HOST_DEV,
      port: parseInt(process.env.INBOX_PORT_DEV),
    },
  });

  await app.listen();
}
bootstrap();
