import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthInfo } from '../../common/decorators/auth-info.decorator';
import { InboxService } from './inbox.service';

interface AuthInfo {
  authId: string;
  userId: string;
  role: string;
  providerType: string;
  accessToken: string;
}

@Controller('inbox')
export class InboxController {
  constructor(private readonly inboxService: InboxService) {}

  @Post('/subscriptions')
  async addSubscription(@AuthInfo() authInfo: AuthInfo, @Body() subscriptionDTO) {
    const { subscriptions } = subscriptionDTO;
    return await this.inboxService.addSubscription(authInfo.userId, subscriptions);
  }

  @Post('/spams')
  async addSpam(@AuthInfo() authInfo: AuthInfo, @Body() spamDTO) {
    const { spams } = spamDTO;
    return await this.inboxService.addSpam(authInfo.userId, spams);
  }

  @Post('/interests')
  async addInterest(@AuthInfo() authInfo: AuthInfo, @Body() interestDTO) {
    const { interests } = interestDTO;
    return await this.inboxService.addInterest(authInfo.userId, interests);
  }

  @Get('/subscriptions')
  async getSubscriptions(@AuthInfo() authInfo: AuthInfo) {
    return await this.inboxService.getSubscriptions(authInfo.userId);
  }

  @Get('/spams')
  async getSpams(@AuthInfo() authInfo: AuthInfo) {
    return await this.inboxService.getSpams(authInfo.userId);
  }
}
