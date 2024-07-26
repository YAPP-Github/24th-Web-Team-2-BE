import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', 'apps/auth/.env'],
      isGlobal: true,
    }),
    HttpModule,
    // TypeOrmModule.forRootAsync(TypeOrmConfig),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
