import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'check-auth-info' })
  async authInfoCheck({ data, provider }) {
    return await this.authService.authInfoCheck(data, provider);
  }

  @MessagePattern({ cmd: 'register-auth-info' })
  async registerAuthInfo({ data, provider }) {
    return await this.authService.registerAuthInfo(data, provider);
  }
}
