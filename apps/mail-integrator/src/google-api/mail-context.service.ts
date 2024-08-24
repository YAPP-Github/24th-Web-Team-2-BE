import { Injectable, Scope } from '@nestjs/common';
import { gmail_v1 } from 'googleapis';

// TODO: Context Service 더 안전하게 관리하도록 refactor...
@Injectable({ scope: Scope.REQUEST })
export class MailContextService {
  private _userId: string;
  private messagesFetchOption: gmail_v1.Params$Resource$Users$Messages$Get;
  private messagesListOption: gmail_v1.Params$Resource$Users$Messages$List;

  setUserId(userId: string) {
    this._userId = userId;
  }

  setMessagesFetchOption(option: gmail_v1.Params$Resource$Users$Messages$Get) {
    this.messagesFetchOption = option;
  }

  setMessagesListOption(option: gmail_v1.Params$Resource$Users$Messages$List) {
    this.messagesListOption = option;
  }

  getUserId() {
    return this._userId;
  }

  getMessagesFetchOption() {
    return this.messagesFetchOption;
  }

  getMessagesListOption() {
    return this.messagesListOption;
  }
}
