import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { AxiosError } from 'axios';
import { IAxiosException } from '../interfaces/custom-axios.exception.interface';

@Catch(AxiosError)
export class CustomAxiosExceptionFilter implements ExceptionFilter {
  catch(exception: AxiosError, host: ArgumentsHost): Observable<IAxiosException> {
    return throwError(() => {
      return {
        status: exception.response.status,
        message: exception.code,
        data: exception.response.data,
      };
    });
  }
}
