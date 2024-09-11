import { IsString, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { MailDomainToken } from '../constants/mail-domain.constant';

export class AutomationSubscribeRequest {
  @IsEnum(MailDomainToken)
  @IsNotEmpty()
  domain: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  nickname?: string;
}
