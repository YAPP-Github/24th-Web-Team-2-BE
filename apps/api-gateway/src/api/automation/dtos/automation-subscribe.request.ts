import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

enum MailDomain {
  NEWNICK = 'NEWNICK',
  CAREET = 'CAREET',
  NUGGET_LETTER = 'NUGGET_LETTER',
}

export class AutomationSubscribeRequest {
  @IsEnum(MailDomain)
  @IsNotEmpty()
  domain: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  nickname?: string;
}
