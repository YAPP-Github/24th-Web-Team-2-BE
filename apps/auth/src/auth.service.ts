import { Inject, Injectable } from '@nestjs/common';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entity/auth.entity';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    @Inject('USER_SERVICE')
    private readonly userClient: ClientProxy,
    @Inject('INBOX_SERVICE')
    private readonly inboxClient: ClientProxy,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async reIssueToken(userId: string, providerType: string) {
    const auth = await this.authRepository.findOne({
      where: {
        userId,
        providerType,
      },
    });
    const params = new URLSearchParams();
    params.append('client_id', this.configService.get<string>('GOOGLE_CLIENT_ID'));
    params.append('client_secret', this.configService.get<string>('GOOGLE_CLIENT_SECRET'));
    params.append('refresh_token', auth.refreshToken);
    params.append('grant_type', 'refresh_token');

    const response = await firstValueFrom(this.httpService.post('https://oauth2.googleapis.com/token', params));
    console.log('re issue 결과:', response.data);
    const newAccessToken = response.data.access_token;

    return newAccessToken;
  }
  async googleLogin(code: string) {
    const tokenData = await this.getGoogleOAuthToken(code);
    const googleUserInfo = await this.getGoogleUserInfo(tokenData.access_token);

    let authInfo = await this.authRepository.findOne({ where: { providerId: googleUserInfo.sub } });

    if (!authInfo) {
      const guestUser = await lastValueFrom(this.userClient.send({ cmd: 'create-guest-user' }, googleUserInfo.name));
      const guestUserData = this.authRepository.create({
        //user 생성 후 들어가야 함
        userId: guestUser.id,
        role: 'userrrr',
        providerType: 'google',
        providerId: googleUserInfo.sub,
        refreshToken: tokenData.refresh_token,
      });
      authInfo = await this.authRepository.save(guestUserData);
      await lastValueFrom(this.inboxClient.send({ cmd: 'create-inbox' }, { userId: authInfo.userId }));
    }

    const auth = {
      authId: authInfo.id,
      userId: authInfo.userId,
      role: authInfo.role,
      providerType: authInfo.providerType,
      accessToken: tokenData.access_token,
    };

    return auth;
  }

  async getGoogleOAuthToken(code: string) {
    const { data } = await lastValueFrom(
      this.httpService.post('https://oauth2.googleapis.com/token', {
        code,
        client_id: this.configService.get<string>('GOOGLE_CLIENT_ID'),
        client_secret: this.configService.get<string>('GOOGLE_CLIENT_SECRET'),
        redirect_uri: this.configService.get<string>('GOOGLE_CALLBACK_URL'),
        grant_type: 'authorization_code',
      }),
    );

    return data;
  }

  async getGoogleUserInfo(accessToken: string) {
    const { data } = await lastValueFrom(
      this.httpService.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    );

    return data;
  }
}
