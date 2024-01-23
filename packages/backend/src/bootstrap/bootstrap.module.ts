import { Module } from '@nestjs/common';
import { AppConfigModule } from '@src/config';

@Module({
  imports: [AppConfigModule],
})
export class BootstrapModule {}
