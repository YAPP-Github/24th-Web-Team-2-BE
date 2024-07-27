import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auths } from './entity/auth.entity';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: ['.env', 'apps/auth/.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.AUTH_DB_NAME,
      logging: true,
      synchronize: true,
      entities: [Auths],
    }),
    AuthModule,
  ],
})
export class MainModule {}
