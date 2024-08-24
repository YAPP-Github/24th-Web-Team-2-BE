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
  async addSubscriptions(@AuthInfo() authInfo: IAuthInfo, @Body() subscriptionDTO: SubscriptionDTO) {
    const { subscriptions } = subscriptionDTO;
    return await this.inboxService.addSubscriptions(authInfo.userId, subscriptions);
  }

  @Get('/spams')
  async getSpams(@AuthInfo() authInfo: IAuthInfo) {
    return await this.inboxService.getSpams(authInfo.userId);
  }

  @Post('/spams')
  async addSpams(@AuthInfo() authInfo: IAuthInfo, @Body() spamDTO: SpamDTO) {
    const { spams } = spamDTO;
    return await this.inboxService.addSpams(authInfo.userId, spams);
  }

  @Post('/interests')
  async addInterests(@AuthInfo() authInfo: IAuthInfo, @Body() interestDTO: InterestDTO) {
    const { interests } = interestDTO;
    return await this.inboxService.addInterests(authInfo.userId, interests);
  }

  @Get('/subscriptions-list')
  async getSubscriptionsList() {
    return await this.inboxService.getSubscriptionsList();
  }
}
