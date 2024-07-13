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

    const data = (await firstValueFrom(tokenResponse)).data;
    console.log(data);
    const { access_token, refresh_token } = data;
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
