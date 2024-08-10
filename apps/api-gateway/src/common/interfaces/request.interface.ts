import { IAuthInfo } from './auth.interface';

export interface IRequest extends Request {
  session: {
    auth: IAuthInfo;
  };
}
