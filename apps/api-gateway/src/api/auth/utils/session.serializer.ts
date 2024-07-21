import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor() {
    super();
  }

  async serializeUser(payload, done: (err: any, user?: any) => void): Promise<any> {
    const { id, username, email, provider, accessToken } = payload;
    done(null, { id, username, email, provider, accessToken });
  }

  async deserializeUser(payload: any, done: (err: any, user?: any) => void): Promise<any> {
    return payload ? done(null, payload) : done(null, null);
  }
}
