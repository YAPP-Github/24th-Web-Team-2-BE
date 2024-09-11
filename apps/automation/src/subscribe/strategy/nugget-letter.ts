import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { SubscribeStrategy } from './subscribe-strategy.interface';
import { MailDomain } from '../decorator/mail-domain.decorator';
import { MailDomainToken } from '../constants/mail-domain.constant';

@Injectable()
@MailDomain(MailDomainToken.NUGGET_LETTER)
export class NuggetLetter implements SubscribeStrategy {
  async subscribe(email: string, nickname: string) {
    if (!nickname) {
      throw new Error('nickname이 필요합니다.');
    }

    try {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      console.log('NuggetLetter 구독 시작');
      // 뉴스레터 구독 페이지로 이동
      await page.goto('https://page.stibee.com/subscriptions/132031');

      await page.type('#stb_email', email);
      await page.type('#stb_name', nickname);

      await page.click('#stb_subscribe > form > div:nth-child(8) > label > input[type=checkbox]');
      await page.click('#stb_subscribe > form > div:nth-child(9) > label > input[type=checkbox]');
      await page.click('#stb_subscribe > form > div.stb_form_set_submit > button');

      await browser.close();
      return 'success for NuggetLetter';
    } catch (e) {
      throw new Error('NuggetLetter 구독 실패');
    }
  }
}
