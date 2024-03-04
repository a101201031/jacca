import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ThirdPartyConfigModule } from '@src/config';
import { CafesHttpModule } from './cafes-http';
import { CafesController } from './cafes.controller';
import { CafesRepository } from './cafes.repository';
import { CafesService } from './cafes.service';
import { Cafe, CafeSchema, CafeTag, CafeTagSchema } from './schemas';

@Module({
  imports: [
    CafesHttpModule,
    ThirdPartyConfigModule,
    MongooseModule.forFeature([
      { name: Cafe.name, schema: CafeSchema },
      { name: CafeTag.name, schema: CafeTagSchema },
    ]),
  ],
  controllers: [CafesController],
  providers: [CafesService, CafesRepository],
  exports: [CafesService],
})
export class CafesModule {}
