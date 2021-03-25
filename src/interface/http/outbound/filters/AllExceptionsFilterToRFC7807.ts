/* eslint-disable class-methods-use-this */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { mapHttpStatusCodeToDescription } from '@utils/index';

@Catch()
export class AllExceptionsFilterToRFC7807 implements ExceptionFilter {
  public catch(exception: unknown | any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const statusCode = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = statusCode === HttpStatus.INTERNAL_SERVER_ERROR
      ? 'Internal Server Error'
      : exception.response?.error;

    response.set('content-type', 'application/problem+json');

    return response.status(statusCode, message).json({
      statusCode,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
      detail: mapHttpStatusCodeToDescription(statusCode),
    });
  }
}
