import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformResponseInterceptor
  implements NestInterceptor<any, { data: any; paging?: any }>
{
  intercept(
    _: ExecutionContext,
    next: CallHandler,
  ): Observable<{ data: any; paging?: any }> {
    return next.handle().pipe(
      map((response) => {
        if (this.hasDataAndPaging(response)) {
          const { paging } = response;
          const { data } = response;

          return {
            data,
            paging,
          };
        }
        return { data: response };
      }),
    );
  }

  private hasDataAndPaging(response: any): response is {
    data: [];
    paging: { limit: number; offset: number; total: number };
  } {
    return Array.isArray(response.data) && response.paging !== undefined;
  }
}
