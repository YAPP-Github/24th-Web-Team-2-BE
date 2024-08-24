import { Module } from '@nestjs/common';
import { MailIntegratorController } from './mail-integrator.controller';
import { MailIntegratorService } from './mail-integrator.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MAIL_INTEGRATOR_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.MAIL_INTEGRATOR_SERVICE_HOST,
          port: parseInt(process.env.MAIL_INTEGRATOR_SERVICE_PORT),
        },
      },
    ]),
  ],
  controllers: [MailIntegratorController],
  providers: [MailIntegratorService],
})
export class MailIntegratorModule {}
