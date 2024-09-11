import { SetMetadata } from '@nestjs/common';

export const MAIL_DOMAIN = 'MAIL_DOMAIN';
export const MailDomain = (domain: string) => SetMetadata(MAIL_DOMAIN, domain);
