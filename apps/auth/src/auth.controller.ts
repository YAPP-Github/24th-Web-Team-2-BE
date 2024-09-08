import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { CustomRpcException } from 'libs/common/dist';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'google_login' })
  async googleLogin(data: string) {
    return await this.authService.googleLogin(data);
  }

  @MessagePattern({ cmd: 're-issue-token' })
  async reIssueToken({ userId, providerType }: { userId: string; providerType: string }) {
    try {
      const accessToken = await this.authService.reIssueToken(userId, providerType);
      return accessToken;
    } catch (error) {
      throw new CustomRpcException('Failed to re-issue token', error);
    }
  }
}
