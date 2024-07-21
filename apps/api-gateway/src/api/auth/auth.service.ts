import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authClient: ClientProxy,
  ) {}

  async checkAuthInfo(data) {
    return lastValueFrom(this.authClient.send({ cmd: 'check-auth-info' }, { data }));
  }

  async registerAuthInfo(data) {
    return lastValueFrom(this.authClient.send({ cmd: 'register-auth-info' }, { data }));
  }
}
