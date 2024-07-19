import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  async checkAuthInfo(data) {
    return lastValueFrom(this.client.send({ cmd: 'check-auth-info' }, { data, provider: 'google' }));
  }

  async registerAuthInfo(data) {
    return lastValueFrom(this.client.send({ cmd: 'register-auth-info' }, { data, provider: 'google' }));
  }
}
