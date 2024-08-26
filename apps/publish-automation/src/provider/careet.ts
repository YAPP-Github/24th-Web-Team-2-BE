import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class Careet {
  async publish(email: string) {
    try {
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();

      // 뉴스레터 구독 페이지로 이동
      await page.goto('https://www.careet.net/Subscribe');
      // 이메일 입력
      await page.type('#ApplyEdmEmail', email);
      // 약관 동의 체크 클릭 액션 실행 후 구독하기 버튼 클릭
      await page.click('#frm12 > div.policy-bottom--wrap > div.checkbox--wrap > div:nth-child(1)');
      await page.click('#informationEditPopup > div > div.popup-content > div > div.button-wrap > button');
      await page.click('#frm12 > div.policy-bottom--wrap > div.checkbox--wrap > div:nth-child(2)');
      await page.click('#informationEditPopup > div > div.popup-content > div > div.button-wrap > button');
      await page.click('#btnApplyEdmSave1');
      return 'success for Careet';
    } catch (e) {
      throw new Error('뉴닉 구독 실패');
    }
  }
}
