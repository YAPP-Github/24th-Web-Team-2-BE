import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ICustomRpcException } from '../interfaces/custom-rpc.exception.interface';

export class CustomRpcException extends RpcException implements ICustomRpcException {
  constructor(message: string, statusCode: HttpStatus) {
    super(message);
    this.initStatusCode(statusCode);
  }
  public status: number;

  private initStatusCode(statusCode: HttpStatus) {
    this.status = statusCode;
  }
}
