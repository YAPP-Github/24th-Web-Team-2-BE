import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { InboxService } from './inbox.service';
import { SubscriptionDTO } from './dtos/subscription.dto';
import { SpamDTO } from './dtos/spam.dto';
import { InterestDTO } from './dtos/Interest.dto';
import { IAuthInfo } from '../../common/interfaces/auth.interface';
import { AuthInfo } from '../../common/decorators/auth-info.decorator';

@Controller('inbox')
export class InboxController {
  constructor(private readonly inboxService: InboxService) {}

  @Get('/subscriptions')
  async getSubscriptions(@AuthInfo() authInfo: IAuthInfo) {
    return await this.inboxService.getSubscriptions(authInfo.userId);
  }

  @Post('/subscriptions')
  async addSubscription(@AuthInfo() authInfo: IAuthInfo, @Body() subscriptionDTO: SubscriptionDTO) {
    const { subscriptions } = subscriptionDTO;
    return await this.inboxService.addSubscription(authInfo.userId, subscriptions);
  }

  @Get('/spams')
  async getSpams(@AuthInfo() authInfo: IAuthInfo) {
    return await this.inboxService.getSpams(authInfo.userId);
  }

  @Post('/spams')
  async addSpam(@AuthInfo() authInfo: IAuthInfo, @Body() spamDTO: SpamDTO) {
    const { spams } = spamDTO;
    return await this.inboxService.addSpam(authInfo.userId, spams);
  }

  @Post('/interests')
  async addInterest(@AuthInfo() authInfo: IAuthInfo, @Body() interestDTO: InterestDTO) {
    const { interests } = interestDTO;
    return await this.inboxService.addInterest(authInfo.userId, interests);
  }
}
