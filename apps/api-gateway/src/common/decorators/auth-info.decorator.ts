import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { IRequest } from '../guards/auth.guard';

// express request vs nestjs request 차이는?
// 데코레이터, AOP 정리
export const AuthInfo = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<IRequest>();
  const authInfo = request.session.user;
  return authInfo;
});
