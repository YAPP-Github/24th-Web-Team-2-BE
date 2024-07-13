import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'google_login_callback' })
  async googleAuthRedirect(data) {
    return this.authService.googleLoginCallback(data);
  }
}
