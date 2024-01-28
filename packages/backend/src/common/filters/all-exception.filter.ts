import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger();

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    this.logging(exception);
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const responseBody = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(request),
    };

    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      responseBody.message = exception.message;
      responseBody.statusCode = statusCode;

      if (this.isClassValidatorResponse(exceptionResponse)) {
        responseBody.message = exceptionResponse.message.join(', ');
      }
    }

    httpAdapter.reply(response, responseBody, responseBody.statusCode);
  }

  private logging(exception) {
    if (exception instanceof Error) {
      this.logger.error(
        `${exception.message}
        ${exception.stack}`,
        AllExceptionsFilter.name,
      );
    }
  }

  private isClassValidatorResponse(
    exceptionResponse: string | object,
  ): exceptionResponse is { message: string[] } {
    return (
      typeof exceptionResponse === 'object' &&
      'message' in exceptionResponse &&
      Array.isArray(exceptionResponse.message)
    );
  }
}
