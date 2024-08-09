import { Injectable } from '@nestjs/common';

import { gmail_v1 } from 'googleapis';

export type Message = {
  messageId: string;
  subject: string;
  date: Date;
  labels: string[];
  snippet: string; // 메일 내용의 일부분
  from: string;
  to: string;
  mimeType: string;
  payload: {
    partId: string;
    mimeType: string;
    body: string;
  }[];
};

@Injectable()
export class GoogleMailParser {
  parse(message: gmail_v1.Schema$Message) {
    const mimeParser = new MimeParser(message);

    const mail: Message = {
      messageId: mimeParser.messageId,
      subject: mimeParser.subject,
      date: new Date(mimeParser.date),
      labels: mimeParser.labels,
      snippet: mimeParser.snippet,
      from: mimeParser.from,
      to: mimeParser.to,
      mimeType: mimeParser.mimeType,
      payload: [],
    };

    try {
      // TODO: multipart/related 처리 로직 추가
      if (mimeParser.mimeType.startsWith('multipart/')) {
        message.payload.parts.map((part) => {
          mail.payload.push({
            partId: part.partId,
            mimeType: part.mimeType,
            body: base64Decode(part.body.data),
          });
        });
      } else {
        // multipart type이 아닌 경우
        mail.payload.push({
          partId: '0',
          mimeType: mimeParser.mimeType,
          body: base64Decode(message.payload.body.data),
        });
      }
    } catch (e) {
      return;
    }
    return mail;
  }

  parseMessages(messages: gmail_v1.Schema$Message[]) {
    return messages.map((messages) => this.parse(messages));
  }
}

class MimeParser {
  constructor(private readonly message: gmail_v1.Schema$Message) {}

  get messageId(): string {
    return this.message.id;
  }

  get snippet(): string {
    return this.message.snippet;
  }

  get labels(): string[] {
    return this.message.labelIds;
  }

  get from(): string {
    const rawFrom = this.getMimeHeader('From');
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const emailMatch = rawFrom.match(emailRegex);
    return emailMatch[0];
  }

  get to(): string {
    return this.getMimeHeader('To');
  }

  get mimeType(): string {
    return this.message.payload.mimeType;
  }

  get subject(): string {
    return this.getMimeHeader('Subject');
  }

  get date(): string {
    return this.getMimeHeader('Date');
  }

  private getMimeHeader(target: string): string {
    return this.message.payload.headers.find((header) => header.name === target).value;
  }
}

function base64Decode(base64String: string) {
  // Buffer 객체를 사용하여 Base64 디코딩
  return Buffer.from(base64String, 'base64').toString('utf-8');
}
