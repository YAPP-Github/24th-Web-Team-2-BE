import { Body, Controller, Get, Param, Post, Session, UseGuards } from '@nestjs/common';
import { InboxService } from './inbox.service';
import { SubscriptionDTO } from './dtos/subscription.dto';
import { SpamDTO } from './dtos/spam.dto';
import { InterestDTO } from './dtos/Interest.dto';
import { IAuthInfo } from '../../common/interfaces/auth.interface';
import { AuthInfo } from '../../common/decorators/auth-info.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import { GroupDTO } from './dtos/group.dto';
import { SenderToGroupDTO } from './dtos/sender-to-group.dto';

@Controller('inbox')
@UseGuards(AuthGuard)
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
  async addInterests(@AuthInfo() authInfo: IAuthInfo, @Session() session, @Body() interestDTO: InterestDTO) {
    const { interests } = interestDTO;
    const updateSessionData = await this.inboxService.addInterests(authInfo.userId, interests);
    session.auth = updateSessionData;
    return 'success';
  }

  @Get('/subscriptions-list')
  getSubscriptionsList() {
    return this.inboxService.getSubscriptionsList();
  }

  @Get('/subscriptions-random-list')
  async getSubscriptionsRandomList(@AuthInfo() authInfo: IAuthInfo) {
    const { userId } = authInfo;
    return await this.inboxService.getSubscriptionsRandomList(userId);
  }

  @Get('/groups')
  async getGroups(@AuthInfo() authInfo: IAuthInfo) {
    const { userId } = authInfo;
    return await this.inboxService.getGroups(userId);
  }

  @Post('/groups')
  async addGroup(@AuthInfo() authInfo: IAuthInfo, @Body() groupDTO: GroupDTO) {
    const { groupName } = groupDTO;
    return await this.inboxService.addGroup(authInfo.userId, groupName);
  }

  @Post('/groups/:groupId/senders')
  async addSenderToGroup(@AuthInfo() authInfo: IAuthInfo, @Param('groupId') groupId: string, @Body() SenderToGroupDTO: SenderToGroupDTO) {
    const { name, address } = SenderToGroupDTO;
    return await this.inboxService.addSenderToGroup(authInfo.userId, groupId, { name, address });
  }
}
