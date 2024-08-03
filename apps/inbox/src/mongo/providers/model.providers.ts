import { ModelTokens } from '../tokens/model.tokens';
import { ConnectionService } from './connection-model.service';

export const modelProviders = [
  {
    provide: ModelTokens.INBOX_MODEL,
    useFactory: (service: ConnectionService) => service.inboxModel(),
    inject: [ConnectionService],
  },
  {
    provide: ModelTokens.MAIL_MODEL,
    useFactory: (service: ConnectionService) => service.mailModel(),
    inject: [ConnectionService],
  },
  {
    provide: ModelTokens.DAILY_MAIL_STATUS_MODEL,
    useFactory: (service: ConnectionService) => service.dailyMailStatusModel(),
    inject: [ConnectionService],
  },
];
