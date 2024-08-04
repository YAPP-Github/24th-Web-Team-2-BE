import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { MailIntegratorModule } from './mail-integrator.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(MailIntegratorModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.MAIL_INTEGRATOR_HOST_DEV,
      port: parseInt(process.env.MAIL_INTEGRATOR_PORT_DEV),
    },
  });

  await app.listen();
}
bootstrap();
