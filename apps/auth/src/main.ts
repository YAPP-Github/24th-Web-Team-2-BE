import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MainModule } from './main.module';
import { CustomRpcExceptionFilter } from '@libs/common';
import { CustomAxiosExceptionFilter } from '@libs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(MainModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.AUTH_SERVICE_HOST,
      port: parseInt(process.env.AUTH_SERVICE_PORT),
    },
  });
  app.useGlobalFilters(new CustomRpcExceptionFilter());
  app.useGlobalFilters(new CustomAxiosExceptionFilter());
  await app.listen();
}
bootstrap();
