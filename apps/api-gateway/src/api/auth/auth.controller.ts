import { Controller, Get, Query, Redirect, Req, Res, Session, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { AuthRedirectRO } from './dtos/auth-redirect.response.dto';
import { AuthGuard } from '../../common/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}
  // 클라이언트에게 Google Auth Code를 넘겨받는다.
  // Google Auth Code를 통해 Access Token을 발급한다.
  // Access Token을 통해 Profile 정보를 얻어온다.

  @Get('dev/google')
  googleAuth(@Res() res: Response) {
    const googleClientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
    const redirectUri = this.configService.get<string>('GOOGLE_CALLBACK_URL');
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${googleClientId}&redirect_uri=${redirectUri}&scope=openid%20email%20profile&access_type=offline`;
    res.redirect(authUrl);
  }

  @Get('google')
  async googleAuthRedirect(@Query('code') code: string, @Session() session: Record<string, any>): Promise<AuthRedirectRO> {
    const authInfo = await this.authService.googleLogin(code);
    session.auth = authInfo;

    if (authInfo.role === 'guest') {
      return {
        isGuest: true,
      };
    }

    return {
      isGuest: false,
    };
  }

  @Get('google/re-issue-token')
  @UseGuards(AuthGuard)
  async googleReIssueToken(@Session() session, @Res() res: Response) {
    const { userId, providerType } = session.auth;
    const accessToken = await this.authService.reIssueToken(userId, providerType);
    session.auth.accessToken = accessToken;
    res.send('google access token 재발급');
  }
}
