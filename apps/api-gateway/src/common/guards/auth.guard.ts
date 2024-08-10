import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { IRequest } from '../interfaces/request.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<IRequest>();
    return !!(request.session && request.session.auth);
  }
}
