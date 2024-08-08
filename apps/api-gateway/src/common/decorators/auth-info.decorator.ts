import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IRequest } from '../interfaces/request.interface';

export const AuthInfo = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<IRequest>();
  const authInfo = request.session.auth;
  return authInfo;
});
