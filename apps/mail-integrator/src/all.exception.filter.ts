import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { CustomRpcException } from '@libs/common';

// TODO: common libs 하위로 대체
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
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
