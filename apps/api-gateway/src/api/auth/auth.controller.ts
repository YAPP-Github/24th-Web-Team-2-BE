import { Controller, Get, Redirect, Req, Res, Session, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guard/google.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleAuth() {}

  //@TODO: redirect로 변경
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  // @Redirect()
  async googleAuthRedirect(@Req() req, @Res() res) {
    const existAuthInfo = await this.authService.checkAuthInfo(req.user);

    if (existAuthInfo) {
      // return { url: '/content' };
      return res.json({
        message: 'already exist user',
      });
    }

    await this.authService.registerAuthInfo(req.user);

    return res.json({
      message: 'success create guest user',
    });
    // return { url: '/on-boarding' };
  }
}
