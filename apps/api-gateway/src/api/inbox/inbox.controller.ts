import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthInfo } from '../../common/decorators/auth-info.decorator';
import { InboxService } from './inbox.service';
import { SubscriptionDTO } from './dtos/subscription.dto';
import { SpamDTO } from './dtos/spam.dto';
import { InterestDTO } from './dtos/Interest.dto';

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

  @Get('/subscriptions')
  async getSubscriptions(@AuthInfo() authInfo: AuthInfo) {
    return await this.inboxService.getSubscriptions(authInfo.userId);
  }

  @Post('/subscriptions')
  async addSubscription(@AuthInfo() authInfo: AuthInfo, @Body() subscriptionDTO: SubscriptionDTO) {
    const { subscriptions } = subscriptionDTO;
    return await this.inboxService.addSubscription(authInfo.userId, subscriptions);
  }

  @Get('/spams')
  async getSpams(@AuthInfo() authInfo: AuthInfo) {
    return await this.inboxService.getSpams(authInfo.userId);
  }

  @Post('/spams')
  async addSpam(@AuthInfo() authInfo: AuthInfo, @Body() spamDTO: SpamDTO) {
    const { spams } = spamDTO;
    return await this.inboxService.addSpam(authInfo.userId, spams);
  }

  @Post('/interests')
  async addInterest(@AuthInfo() authInfo: AuthInfo, @Body() interestDTO: InterestDTO) {
    const { interests } = interestDTO;
    return await this.inboxService.addInterest(authInfo.userId, interests);
  }
}
