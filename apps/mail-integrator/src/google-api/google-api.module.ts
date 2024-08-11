import { Module, Scope } from '@nestjs/common';
import { google } from 'googleapis';
import { ConstantsModule } from '@libs/common';

import { ProviderToken } from '../provider-tokens';
import { GoogleMailFactory } from './google-mail.factory';
import { GoogleMailClient } from './google-mail.client';
import { GoogleMailParser } from './google-mail.parser';
import { GoogleMailManager } from './google-mail.manager';
import { GoogleMailReader } from './google-mail.reader';
import { MailContextService } from './mail-context.service';

@Module({
  imports: [ConstantsModule],
  controllers: [],
  providers: [
    GoogleMailFactory,
    GoogleMailClient,
    GoogleMailParser,
    GoogleMailManager,
    GoogleMailReader,
    MailContextService,
    {
      provide: ProviderToken.GOOGLE_OAUTH2_CLIENT,
      useFactory: async () => {
        return new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URI);
      },
      scope: Scope.REQUEST,
    },
  ],
  exports: [GoogleMailManager],
})
export class GoogleApiModule {}
