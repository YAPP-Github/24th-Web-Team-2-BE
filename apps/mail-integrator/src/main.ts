import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { MailIntegratorModule } from './mail-integrator.module';

async function bootstrap() {
  const mailIntegratorTcpApp =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      MailIntegratorModule,
      {
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3000,
        },
      },
    );
  await mailIntegratorTcpApp.listen();
}
bootstrap();
