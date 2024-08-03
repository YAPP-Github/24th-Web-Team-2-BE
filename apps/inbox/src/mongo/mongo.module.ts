import { Module } from '@nestjs/common';

import { InboxRepository } from './repositories/inbox.repository';
import { connectionProvider } from './providers/connection.provider';
import { modelProviders } from './providers/model.providers';
import { ConnectionService } from './providers/connection-model.service';
import { MailRepository } from './repositories/mail.repository';

@Module({
  providers: [...modelProviders, connectionProvider, InboxRepository, ConnectionService, MailRepository],
  exports: [InboxRepository, MailRepository],
})
export class MongoModule {}
