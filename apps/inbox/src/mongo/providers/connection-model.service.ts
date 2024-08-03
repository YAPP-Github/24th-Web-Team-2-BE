import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Connection } from 'mongoose';
import { MongoTokens } from '../tokens/mongo.tokens';
import { InboxSchema } from '../schemas/inbox.schema';
import { MailSchema } from '../schemas/mail.schema';
import { DailyMailStatusSchema } from '../schemas/dailyMailStatus.schema';

@Injectable()
export class ConnectionService implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject(MongoTokens.CONNECTION) private readonly connection: Connection) {}

  inboxModel() {
    return this.connection.model('Inbox', InboxSchema);
  }

  mailModel() {
    return this.connection.model('Mail', MailSchema);
  }

  dailyMailStatusModel() {
    return this.connection.model('DailyMailStatus', DailyMailStatusSchema);
  }

  onModuleInit() {
    console.log('Database connection initialized');
  }

  onModuleDestroy() {
    this.connection.close();
    console.log('Database connection closed');
  }
}
