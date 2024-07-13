import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth(@Res() res) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    res.json({
      user: req.user,
    });
  }
}
