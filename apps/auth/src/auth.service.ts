import { Inject, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Auths } from './entity/auth.entity';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auths)
    private readonly authRepository: Repository<Auths>,
    @Inject('USER_SERVICE')
    private readonly userClient: ClientProxy,
  ) {}

  async authInfoCheck(data) {
    const { id, provider } = data;

    if (provider === 'google') {
      const existAuthInfo = this.authRepository.findOne({
        where: {
          providerType: provider,
          providerId: id,
        },
      });

      return existAuthInfo;
    }
  }

  async registerAuthInfo(data) {
    const { id, username, email, refreshToken, provider } = data;
    let guestUserInfo;

    if (provider === 'google') {
      guestUserInfo = await lastValueFrom(this.userClient.send({ cmd: 'create-guest-user' }, username));

      const authInfo: Auths = this.authRepository.create({
        userId: guestUserInfo.id,
        role: 'guest',
        providerType: 'google',
        providerId: id,
        refreshToken: refreshToken,
      });

      return await this.authRepository.save(authInfo);
    }
  }
}
