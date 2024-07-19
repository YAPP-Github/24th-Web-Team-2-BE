import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.config';
import { Auths } from './entity/auth.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', 'apps/auth/.env'],
      isGlobal: true,
    }),
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'qwer1234',
      database: 'hdwg_dev_auth',
      synchronize: true,
      entities: [Auths],
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
