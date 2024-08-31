import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private logger: Logger = new Logger('NestApplication');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, query: queryParams, baseUrl: path } = request;

    // health check or empty path skip logging
    if (path === '' || path === '/') {
      // continue to next middleware or request handler
      return next();
    }

    // logging request
    setImmediate(() => {
      const requestLog = {
        method,
        path,
        queryParams,
        body: request.body,
      };
      this.logger.log(`Request: ${JSON.stringify(requestLog)}`);
    });

    // extracting response's body
    let body = {};
    const chunks = [];
    const oldEnd = response.end;
    response.end = (chunk) => {
      if (chunk) {
        chunks.push(Buffer.from(chunk));
      }
      body = Buffer.concat(chunks).toString('utf8');
      return oldEnd.call(response, body);
    };

    // logging response
    response.on('finish', () => {
      // Skip logging response if the path is empty or root
      if (path === '' || path === '/') {
        return;
      }

      const shouldExcludeBody = path.startsWith('/inbox');

      const responseLog = {
        method,
        path,
        statusCode: response.statusCode,
        ...(shouldExcludeBody ? {} : { body }),
      };

      setTimeout(() => {
        this.logger.log(`Response: ${JSON.stringify(responseLog)}`);
      }, 0);
    });

    next();
  }
}
