import { Module } from '@nestjs/common';
import { MailIntegratorController } from './mail-integrator.controller';
import { MailIntegratorService } from './mail-integrator.service';
import { GoogleApiModule } from './google-api/google-api.module';
import { ConstantsModule } from '@libs/common';

@Module({
  imports: [GoogleApiModule, ConstantsModule],
  controllers: [MailIntegratorController],
  providers: [MailIntegratorService],
})
export class MailIntegratorModule {}
