import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entity/auth.entity';
import { AuthModule } from './auth.module';
import { NetworkModule } from '@libs/network/dist';
import { CommonModule } from '@libs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.AUTH_DB_NAME,
      logging: false,
      synchronize: true,
      entities: [Auth],
    }),
    AuthModule,
    NetworkModule,
    CommonModule,
  ],
})
export class MainModule {}
