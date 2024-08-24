import { Module } from '@nestjs/common';

import { InboxController } from './inbox.controller';
import { MongoModule } from './mongo/mongo.module';
import { InboxReadService } from './services/inbox-read.service';
import { InboxUpdateService } from './services/inbox-update.service';
import { InboxCreateService } from './services/inbox-create.service';
import { ConstantsModule } from '@libs/common';
@Module({
  imports: [MongoModule, ConstantsModule],
  controllers: [InboxController],
  providers: [InboxCreateService, InboxReadService, InboxUpdateService],
})
export class InboxModule {}
