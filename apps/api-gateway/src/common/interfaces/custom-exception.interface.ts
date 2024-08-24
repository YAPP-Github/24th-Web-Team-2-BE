export interface ICustomException {
  message: string;
  status: number | string;
  data?: any;
}
