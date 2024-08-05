import { Module } from '@nestjs/common';
import { InboxController } from './inbox.controller';
import { InboxService } from './inbox.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'INBOX_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.INBOX_HOST_DEV,
          port: parseInt(process.env.INBOX_PORT_DEV),
        },
      },
    ]),
  ],
  controllers: [InboxController],
  providers: [InboxService],
})
export class InboxModule {}
