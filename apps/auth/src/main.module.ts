import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auths } from './entity/auth.entity';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', 'apps/auth/.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'qwer1234',
      database: 'hdwg_dev_auth',
      logging: true,
      synchronize: true,
      entities: [Auths],
    }),
    AuthModule,
  ],
})
export class MainModule {}
