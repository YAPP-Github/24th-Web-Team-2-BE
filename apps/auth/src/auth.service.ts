import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Auths } from './entity/auth.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @InjectRepository(Auths)
    private readonly authRepository: Repository<Auths>,
  ) {}

  async googleLoginCallback(data) {
    const { accessToken, refreshToken } = data;

    // sub = 유저 식별값
    // sub와 provider를 같이 사용해서 유저 식별
    // 만약 존재하지 않으면, 새로운 유저를 생성하고
    // 존재하는 유저라면, refreshToken 업데이트?
    const profile = await this.getGoogleProfile(accessToken);

    const existAuthInfo = await this.authRepository.find({
      where: {
        providerType: 'google',
        providerId: profile.providerId,
      },
    });

    if (existAuthInfo) {
      throw new HttpException('이미 존재하는 정보', HttpStatus.CONFLICT);
    }

    const testAuthInfo: Auths = this.authRepository.create({
      role: 'guest',
      providerType: 'google',
      providerId: profile.sub,
      refreshToken: refreshToken,
    });

    await this.authRepository.save(testAuthInfo);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
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
