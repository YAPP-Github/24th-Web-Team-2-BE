import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { InboxClient } from './inbox/inbox.client';

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
  ],
  providers: [InboxClient],
  exports: [InboxClient],
})
export class NetworkModule {}
