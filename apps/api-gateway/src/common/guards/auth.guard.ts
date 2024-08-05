import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export interface IRequest extends Request {
  //@TODO: any ㅈㄴ 쓰기 싫은데 뭔가 묘수가 있지 않을까?
  session: any;
}

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<IRequest>();

    return request.session && request.session.user;
  }
}
