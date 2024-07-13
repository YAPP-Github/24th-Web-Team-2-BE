import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', 'apps/auth/.env'],
      isGlobal: true,
    }),
    PassportModule,
    HttpModule,
  ],
  providers: [AuthService, GoogleStrategy],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
