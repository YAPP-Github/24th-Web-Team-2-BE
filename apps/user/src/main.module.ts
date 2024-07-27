import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user.module';
import { User } from './entity/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', 'apps/user/.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'qwer1234',
      database: 'hdwg_dev_user',
      logging: true,
      synchronize: true,
      entities: [User],
    }),
    UserModule,
  ],
})
export class MainModule {}
