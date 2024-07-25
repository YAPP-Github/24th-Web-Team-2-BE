import { Inject, Injectable } from '@nestjs/common';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Auths } from './entity/auth.entity';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auths)
    private readonly authRepository: Repository<Auths>,
    @Inject('USER_SERVICE')
    private readonly userClient: ClientProxy,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async googleLogin(code: string) {
    const tokenData = await this.getGoogleOAuthToken(code);
    const userInfo = await this.getGoogleUserInfo(tokenData.access_token);

    let user = await this.authRepository.findOne({ where: { providerId: userInfo.sub } });

    if (!user) {
      const guestUserData = this.authRepository.create({
        //user 생성 후 들어가야 함
        userId: 'asdfasd222',
        role: 'guest',
        providerType: 'google',
        providerId: userInfo.sub,
        refreshToken: tokenData.refresh_token,
      });
      user = await this.authRepository.save(guestUserData);
    }

    return user;
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
