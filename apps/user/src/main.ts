import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MainModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(MainModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.USER_SERVICE_HOST,
      port: parseInt(process.env.USER_SERVICE_PORT),
    },
  });
  await app.listen();
}
bootstrap();
