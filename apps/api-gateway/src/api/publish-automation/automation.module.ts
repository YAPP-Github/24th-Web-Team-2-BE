import { Module } from '@nestjs/common';

import { ClientsModule, Transport } from '@nestjs/microservices';
import { AutomationController } from './automation.controller';
import { AutomationService } from './automation.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTOMATION_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.AUTOMATION_SERVICE_HOST,
          port: parseInt(process.env.AUTOMATION_SERVICE_PORT),
        },
      },
    ]),
  ],
  controllers: [AutomationController],
  providers: [AutomationService],
})
export class AutomationModule {}
