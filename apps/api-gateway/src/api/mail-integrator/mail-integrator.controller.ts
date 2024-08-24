import { Body, Controller, Delete, Get, Param, Patch, Query } from '@nestjs/common';
import { MailIntegratorService } from './mail-integrator.service';
import { AuthInfo } from '../../common/decorators/auth-info.decorator';
import { IAuthInfo } from '../../common/interfaces/auth.interface';
import { ModifyMailDTO } from './dtos/modify-mail.dto';

@Controller('inbox')
export class MailIntegratorController {
  constructor(private readonly mailIntegratorService: MailIntegratorService) {}

  @Get('incoming-senders')
  async getMailSenders(@AuthInfo() authInfo: IAuthInfo) {
    return await this.mailIntegratorService.getMailSenders(authInfo.userId);
  }

  // TODO: 이 부분은 추후에 수정이 필요합니다.
  @Get('unread-mails')
  async getUnreadMessages(
    @AuthInfo() authInfo: IAuthInfo,
    @Query('sender') sender?: string,
    @Query('group') group?: string,
    @Query('target') target?: string,
  ) {
    let type: 'SENDER' | 'GROUP' | 'ALL';

    if (sender) {
      type = 'SENDER';
    }

    if (group) {
      type = 'GROUP';
    }

    if (!sender && !group) {
      type = 'ALL';
    }

    return await this.mailIntegratorService.getUnreadMessages(authInfo.userId, type, target);
  }

  @Delete('mails/:mailId')
  async removeMail(@AuthInfo() authInfo: IAuthInfo, @Param('mailId') mailId: string) {
    return await this.mailIntegratorService.removeMail(authInfo.userId, mailId);
  }

  @Patch('mails/:mailId')
  async modifyMail(@AuthInfo() authInfo: IAuthInfo, @Param('mailId') mailId: string, @Body() modifyMailDTO: ModifyMailDTO) {
    const { action } = modifyMailDTO;

    if (action === 'read') {
      return await this.mailIntegratorService.modifyMailAsRead(authInfo.userId, mailId);
    } else if (action === 'unread') {
      return await this.mailIntegratorService.modifyMailAsUnread(authInfo.userId, mailId);
    }
  }
}