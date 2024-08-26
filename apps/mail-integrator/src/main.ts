import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MailIntegratorModule } from './mail-integrator.module';
import { CustomRpcExceptionFilter } from '@libs/common';
import { CustomAxiosExceptionFilter } from '@libs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(MailIntegratorModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.MAIL_INTEGRATOR_SERVICE_HOST,
      port: parseInt(process.env.MAIL_INTEGRATOR_SERVICE_PORT),
    },
  });
  app.useGlobalFilters(new CustomRpcExceptionFilter());
  app.useGlobalFilters(new CustomAxiosExceptionFilter());
  await app.listen();
}
bootstrap();
