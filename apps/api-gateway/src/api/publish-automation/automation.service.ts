import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AutomationService {
  constructor(
    @Inject('AUTOMATION_SERVICE')
    private readonly automationClient: ClientProxy,
  ) {}

  async publishNewNick(email: string, nickname: string) {
    return lastValueFrom(this.automationClient.send({ cmd: 'publish-new-nick' }, { email, nickname }));
  }
}
