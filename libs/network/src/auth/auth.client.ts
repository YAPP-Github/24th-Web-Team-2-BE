import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { ReIssueTokenRequest } from '../@types/auth/auth-service.request';
import { AuthCommandToken } from './auth-command.token';
import { ReIssueTokenResponse } from '../@types/auth/auth-service.response';

@Injectable()
export class AuthClient {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  async reIssueToken(request: ReIssueTokenRequest): Promise<ReIssueTokenResponse> {
    console.log('reissue token 시도: ', request.userId);
    return await lastValueFrom(this.client.send({ cmd: AuthCommandToken.ReIssueToken }, request));
  }
}
