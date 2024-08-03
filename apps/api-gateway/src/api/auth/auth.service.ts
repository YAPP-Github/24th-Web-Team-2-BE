import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { json } from 'stream/consumers';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authClient: ClientProxy,
  ) {}

  async googleLogin(code: string) {
    return lastValueFrom(this.authClient.send({ cmd: 'google_login' }, code));
  }
}
