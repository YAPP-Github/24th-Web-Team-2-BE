import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auths } from './entity/auth.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Auths])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
