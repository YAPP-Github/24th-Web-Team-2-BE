import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor() {
    super();
  }

  async serializeUser(user, done: (err: any, user?: any) => void): Promise<any> {
    console.log(user, 'serializeUser');
    done(null, user);
  }

  async deserializeUser(payload: any, done: (err: any, user?: any) => void): Promise<any> {
    console.log(payload, 'deserializeUser');
    return payload ? done(null, payload) : done(null, null);
  }
}
