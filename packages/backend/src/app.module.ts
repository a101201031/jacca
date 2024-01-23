import { Module } from '@nestjs/common';
import { BootstrapModule } from './bootstrap';

@Module({
  imports: [BootstrapModule],
  controllers: [],
  providers: [],
})
export class AppModule {}