import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { MailIntegratorModule } from './mail-integrator.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(MailIntegratorModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.MAIL_INTEGRATOR_SERVICE_HOST,
      port: parseInt(process.env.MAIL_INTEGRATOR_SERVICE_PORT),
    },
  });

  await app.listen();
}
bootstrap();
