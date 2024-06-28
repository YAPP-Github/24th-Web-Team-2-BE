import { Module } from '@nestjs/common';
import { MailIntegratorController } from './mail-integrator.controller';
import { MailIntegratorService } from './mail-integrator.service';

@Module({
  imports: [],
  controllers: [MailIntegratorController],
  providers: [MailIntegratorService],
})
export class MailIntegratorModule {}
