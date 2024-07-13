import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  async googleLoginCallback(data) {
    return lastValueFrom(this.client.send({ cmd: 'google_login_callback' }, data));
  }
}
