import type { NestMiddleware } from '@nestjs/common';
import { Injectable, Logger } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger();

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(
      `request: ${req.method} ${req.originalUrl}`,
      RequestLoggerMiddleware.name,
    );
    next();
  }
}
