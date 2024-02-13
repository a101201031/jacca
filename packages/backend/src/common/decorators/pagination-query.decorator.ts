import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';

export const PaginationQuery = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { limit, offset } = request.query;

    return {
      limit: Number(limit) || 10,
      offset: Number(offset) || 0,
    };
  },
);
