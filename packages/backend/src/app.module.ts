import type { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { BootstrapModule } from './bootstrap';
import { CafesModule } from './cafes/cafes.module';
import { RequestLoggerMiddleware } from './common';

@Module({
  imports: [BootstrapModule, CafesModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
