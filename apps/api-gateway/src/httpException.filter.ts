import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { CustomRpcException } from '@libs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('HttpExceptionFilter');

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToRpc();
    const data = ctx.getData();

    const response = {
      status: 'error',
      message: exception.message || 'Internal server error',
      data,
    };

    console.error('**** AllExceptionsFilter -> catch Excption ****\n', response);

    throw new CustomRpcException(response.message, 500);
  }
}
