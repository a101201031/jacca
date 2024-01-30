import type { MiddlewareConsumer, NestModule, Provider } from '@nestjs/common';
import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { BootstrapModule } from './bootstrap';
import { CafesModule } from './cafes/cafes.module';
import {
  AllExceptionsFilter,
  RequestLoggerMiddleware,
  TransformResponseInterceptor,
} from './common';

const globalProviders: Provider[] = [
  {
    provide: APP_FILTER,
    useClass: AllExceptionsFilter,
  },
  {
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      transform: true,
    }),
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: TransformResponseInterceptor,
  },
];
@Module({
  imports: [BootstrapModule, CafesModule],
  controllers: [],
  providers: [...globalProviders],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
