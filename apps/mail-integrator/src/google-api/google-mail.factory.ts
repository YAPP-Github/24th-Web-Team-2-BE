import { Inject, Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { ProviderToken } from '../provider-tokens';
import { MailContextService } from './mail-context.service';
import gmailAccessTokenCache from './caches/gmail-accessToken.cache';

@Injectable()
export class GoogleMailFactory {
  constructor(
    @Inject(ProviderToken.GOOGLE_OAUTH2_CLIENT)
    private readonly googleOAuth2Client: OAuth2Client,
    private readonly mailContextService: MailContextService,
  ) {}

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
    return 'token';
  }
}
