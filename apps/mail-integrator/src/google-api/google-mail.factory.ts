import { Inject, Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { ProviderToken } from '../provider-tokens';
import { MailContextService } from './mail-context.service';
import gmailAccessTokenCache from './caches/gmail-accessToken.cache';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AuthClient } from '@libs/network/dist';

@Injectable()
export class GoogleMailFactory {
  // URGENT: client proxy -> network client로 변경
  private client: ClientProxy;

  constructor(
    @Inject(ProviderToken.GOOGLE_OAUTH2_CLIENT)
    private readonly googleOAuth2Client: OAuth2Client,
    private readonly mailContextService: MailContextService,
    private readonly authClient: AuthClient,
  ) {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: process.env.AUTH_SERVICE_HOST,
        port: parseInt(process.env.AUTH_SERVICE_PORT),
      },
    });
  }

  // TODO: user id로 access token 받아오기
  // TODO: Cache provider 분리
  async gmail() {
    const accessToken = await this.retrieveAccessToken();
    await this.setCredential(accessToken);
    return google.gmail({ version: 'v1', auth: this.googleOAuth2Client });
  }

  private async setCredential(accessToken: string) {
    this.googleOAuth2Client.setCredentials({ access_token: accessToken });
  }

  private async retrieveAccessToken() {
    const userId = this.mailContextService.getUserId();

    let accessToken = gmailAccessTokenCache.get<string>(userId);
    if (!accessToken) {
      accessToken = await this.fetchAccessToken();
      gmailAccessTokenCache.set(userId, accessToken);
    }
    return accessToken;
  }

  private async fetchAccessToken(): Promise<string> {
    // URGENT: auth client 호출로 변경
    // const res = await lastValueFrom(
    //   this.client.send({ cmd: 're-issue-token' }, { userId: this.mailContextService.getUserId(), providerType: 'google' }),
    // );
    // return res as string;
    const accessToken = await this.authClient.reIssueToken({ userId: this.mailContextService.getUserId(), providerType: 'google' });
    return accessToken;
  }
}
