import { Module } from '@nestjs/common';

import { InboxController } from './inbox.controller';
import { MongoModule } from './mongo/mongo.module';
import { InboxReadService } from './services/inbox-read.service';
import { InboxUpdateService } from './services/inbox-update.service';
import { InboxCreateService } from './services/inbox-create.service';

@Module({
  imports: [MongoModule],
  controllers: [InboxController],
  providers: [InboxCreateService, InboxReadService, InboxUpdateService],
})
export class InboxModule {}
