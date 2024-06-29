import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): Promise<Observable<string>> {
    return this.authService.getHello();
  }
}
