import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AutomationModule } from './automation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    AutomationModule,
  ],
})
export class MainModule {}
