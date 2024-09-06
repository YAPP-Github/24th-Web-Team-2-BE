import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MailIntegratorModule } from './mail-integrator.module';
import { CustomRpcExceptionFilter, CustomAxiosExceptionFilter } from '@libs/common';
// TODO: common libs 하위의 filter로 대체
import { AllExceptionsFilter } from './all.exception.filter';

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
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen();
}
bootstrap();
