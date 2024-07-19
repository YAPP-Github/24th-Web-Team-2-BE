import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
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
    private readonly httpService: HttpService,
  ) {}

  async authInfoCheck(data, provider) {
    const { accessToken } = data;

    if (provider === 'google') {
      const { sub } = await this.getGoogleProfile(accessToken);

      const existAuthInfo = this.authRepository.findOne({
        where: {
          providerType: 'google',
          providerId: sub,
        },
      });

      return existAuthInfo;
    }
  }

  async registerAuthInfo(data, provider) {
    const { accessToken, refreshToken } = data;
    let guestUserInfo;

    if (provider === 'google') {
      const { sub, name } = await this.getGoogleProfile(accessToken);
      guestUserInfo = await lastValueFrom(this.userClient.send({ cmd: 'create-guest-user' }, name));

      const authInfo: Auths = this.authRepository.create({
        userId: guestUserInfo.id,
        role: 'guest',
        providerType: 'google',
        providerId: sub,
        refreshToken: refreshToken,
      });

      return await this.authRepository.save(authInfo);
    }
  }

  private async getGoogleProfile(accessToken: string): Promise<any> {
    const profile = firstValueFrom(
      this.httpService
        .get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .pipe(map((response) => response.data)),
    );

    return profile;
  }
}
