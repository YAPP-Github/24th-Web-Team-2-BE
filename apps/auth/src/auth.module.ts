import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entity/auth.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NetworkModule } from '@libs/network/dist';
import { CommonModule } from '@libs/common';

@Module({
  imports: [
    HttpModule,
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.USER_SERVICE_HOST,
          port: parseInt(process.env.USER_SERVICE_PORT),
        },
      },
      {
        name: 'INBOX_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.INBOX_SERVICE_HOST,
          port: parseInt(process.env.INBOX_SERVICE_PORT),
        },
      },
    ]),
    TypeOrmModule.forFeature([Auth]),
    NetworkModule,
    CommonModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
