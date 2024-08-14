import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PublishAutomationModule } from './publish-automation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    PublishAutomationModule,
  ],
})
export class MainModule {}
