import { Controller } from '@nestjs/common';
import { AutomationService } from './automation.service';
import { PublishNewNickDTO } from './dtos/publish-newnick.dto';

@Controller('automation')
export class AutomationController {
  constructor(private readonly automationService: AutomationService) {}

  async publishNewNick(publishNewNickDTO: PublishNewNickDTO) {
    // TODO : 이메일, 닉네임 추가되어야 함
    const { email, nickname } = publishNewNickDTO;
    return this.automationService.publishNewNick(email, nickname);
  }
}
