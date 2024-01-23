import { Module } from '@nestjs/common';
import { BootstrapModule } from './bootstrap';
import { CafesModule } from './cafes/cafes.module';

@Module({
  imports: [BootstrapModule, CafesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
