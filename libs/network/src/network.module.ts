import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { InboxClient } from './inbox/inbox.client';
import { AuthClient } from './auth/auth.client';
import { MailIntegratorClient } from './mail-integrator/mail-integrator.client';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'INBOX_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.INBOX_SERVICE_HOST,
          port: parseInt(process.env.INBOX_SERVICE_PORT),
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.AUTH_SERVICE_HOST,
          port: parseInt(process.env.AUTH_SERVICE_PORT),
        },
      },
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

  providers: [InboxClient, AuthClient, MailIntegratorClient],
  exports: [InboxClient, AuthClient, MailIntegratorClient],
})
export class NetworkModule {}
