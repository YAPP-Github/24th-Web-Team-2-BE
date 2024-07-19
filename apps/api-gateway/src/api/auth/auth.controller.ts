import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const existAuthInfo = await this.authService.checkAuthInfo(req.user);

    if (existAuthInfo) {
      return res.redirect('/content');
    }

    await this.authService.registerAuthInfo(req.user);

    return res.json({
      message: 'success',
    });
  }
}
