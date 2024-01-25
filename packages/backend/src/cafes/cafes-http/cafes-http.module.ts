import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ThirdPartyConfigModule } from '@src/config';
import { CafesHttpService } from './cafes-http.service';
import { CafesHttpController } from './cafes-http.controller';

@Module({
  imports: [HttpModule, ThirdPartyConfigModule],
  controllers: [CafesHttpController],
  providers: [CafesHttpService],
  exports: [CafesHttpService],
})
export class CafesHttpModule {}
