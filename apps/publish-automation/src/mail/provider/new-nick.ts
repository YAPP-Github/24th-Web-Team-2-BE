import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class NewNick {
  constructor() {}

  async test() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://newneek.co/subscribe');

    await page.type('#gosum-beat input[name="email"]', 'test@test.com');
    await page.type('#gosum-beat input[name="nickname"]', 'test');

    await page.click('#gosum-beat input[name="termService"]');
    await page.click('#gosum-beat input[name="termPrivacy"]');
    await page.click('#gosum-beat button[type="submit"]');
  }
}
