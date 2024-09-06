import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'google_login' })
  async googleLogin(data: string) {
    console.log('auth controller', data);
    return this.authService.googleLogin(data);
  }

  @MessagePattern({ cmd: 're-issue-token' })
  async reIssueToken({ userId, providerType }: { userId: string; providerType: string }) {
    return this.authService.reIssueToken(userId, providerType);
  }
}
