import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'google_login' })
  async googleLogin(data: string) {
    return await this.authService.googleLogin(data);
  }

  @MessagePattern({ cmd: 're-issue-token' })
  async reIssueToken({ userId, providerType }: { userId: string; providerType: string }) {
    console.log('auth controller 도착: ', userId);
    try {
      const token = await this.authService.reIssueToken(userId, providerType);
      console.log('auth controller 결과: ', token);
      return token;
    } catch (error) {
      console.log('auth controller 에러: ', error);
    }
  }
}
