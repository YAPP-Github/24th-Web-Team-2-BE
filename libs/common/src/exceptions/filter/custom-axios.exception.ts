import { HttpStatus } from '@nestjs/common';
import { AxiosError } from 'axios';
import { IAxiosException } from '../interfaces/custom-axios.exception.interface';

export class CustomAxiosException extends AxiosError implements IAxiosException {
  constructor(message: string, statusCode: HttpStatus, data: string) {
    super(message);
    this.data = data;
    this.initStatusCode(statusCode);
  }
  public status: number;
  public data: string;

  private initStatusCode(statusCode: HttpStatus) {
    this.status = statusCode;
  }
}
