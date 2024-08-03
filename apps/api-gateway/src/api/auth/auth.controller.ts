import { Controller, Get, Query, Redirect, Req, Res, Session, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { AuthGuard } from './guards/auth.guard';

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
  async googleAuthRedirect(@Query('code') code: string, @Session() session: Record<string, any>, @Res() res: Response) {
    const user = await this.authService.googleLogin(code);
    if (user) {
      session.user = user;
    }

    res.redirect('/');
  }

  @Get('google/re-issue-token')
  async googleReIssueToken(@Session() session, @Res() res: Response) {
    const { userId, providerType } = session.user;
    const accessToken = await this.authService.reIssueToken(userId, providerType);
    session.user.accessToken = accessToken;
    res.send('google access token 재발급');
  }
}
