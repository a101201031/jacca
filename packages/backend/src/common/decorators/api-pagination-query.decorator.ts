import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export function ApiPaginationQuery() {
  return applyDecorators(
    ApiQuery({
      name: 'limit',
      required: false,
      type: Number,
      description: '한 번에 표시할 아이템 개수',
    }),
    ApiQuery({
      name: 'offset',
      required: false,
      type: Number,
      description: '결과 집합 수집을 시작하기 전에 건너뛸 항목 수',
    }),
  );
}
