import { Module } from '@nestjs/common';
import { MailIntegratorController } from './mail-integrator.controller';
import { MailIntegratorService } from './mail-integrator.service';
import { GoogleApiModule } from './google-api/google-api.module';
import { ConstantsModule } from '@libs/common';
import { NetworkModule } from '@libs/network/dist';

@Module({
  imports: [GoogleApiModule, ConstantsModule, NetworkModule],
  controllers: [MailIntegratorController],
  providers: [MailIntegratorService],
})
export class MailIntegratorModule {}
