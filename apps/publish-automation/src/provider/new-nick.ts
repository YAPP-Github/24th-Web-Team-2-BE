import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class NewNick {
  async publish(email: string, nickname: string) {
    try {
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();

      // 뉴스레터 구독 페이지로 이동
      await page.goto('https://newneek.co/subscribe');

      // 이메일, 닉네임 입력
      await page.type('#gosum-beat input[name="email"]', email);
      await page.type('#gosum-beat input[name="nickname"]', nickname);

      // 약관 동의 체크 클릭 액션 실행 후 구독하기 버튼 클릭
      await page.click('#gosum-beat input[name="termService"]');
      await page.click('#gosum-beat input[name="termPrivacy"]');
      await page.click('#gosum-beat button[type="submit"]');

      return 'success for newnick';
    } catch (e) {
      throw new Error('뉴닉 구독 실패');
    }
  }
}
