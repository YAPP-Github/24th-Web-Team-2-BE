import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Auths } from './entity/auth.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auths)
    private readonly authRepository: Repository<Auths>,
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

    // 여기에 User Server를 호출해서 회원 생성 진행해야 함
    if (provider === 'google') {
      const { sub } = await this.getGoogleProfile(accessToken);

      const authInfo: Auths = this.authRepository.create({
        role: 'guest',
        providerType: 'google',
        providerId: sub,
        refreshToken: refreshToken,
      });

      return await this.authRepository.save(authInfo);
    }
  }

  private async getGoogleProfile(accessToken: string): Promise<any> {
    const profile = await firstValueFrom(
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
