import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class MailContextService {
  private _userId: string;

  setUserId(userId: string) {
    this._userId = userId;
  }

  getUserId() {
    return this._userId;
  }
}
