import { Injectable } from '@nestjs/common';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async googleLoginCallback({ code }: { code: string }) {
    const googleClientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
    const googleClientSecret = this.configService.get<string>('GOOGLE_CLIENT_SECRET');
    const redirectUri = this.configService.get<string>('GOOGLE_CALLBACK_URL');

    const tokenResponse = this.httpService.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: googleClientId,
      client_secret: googleClientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    });

    const { access_token, refresh_token } = (await firstValueFrom(tokenResponse)).data;

    // sub = 유저 식별값
    // sub와 provider를 같이 사용해서 유저 식별
    // 만약 존재하지 않으면, 새로운 유저를 생성하고
    // 존재하는 유저라면, refreshToken 업데이트?
    const profile = await this.getGoogleProfile(access_token);

    return {
      accessToken: access_token,
      refreshToken: refresh_token,
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
        .pipe(map(async (response) => response.data)),
    );

    return profile;
  }
}
