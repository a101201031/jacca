import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ThirdPartyConfigModule } from '@src/config';
import { CafesHttpModule } from './cafes-http';
import { CafesController } from './cafes.controller';
import { CafesService } from './cafes.service';
import { Cafe, CafeSchema } from './schemas';
import { CafesRepository } from './cafes.repository';

@Module({
  imports: [
    CafesHttpModule,
    ThirdPartyConfigModule,
    MongooseModule.forFeature([{ name: Cafe.name, schema: CafeSchema }]),
  ],
  controllers: [CafesController],
  providers: [CafesService, CafesRepository],
})
export class CafesModule {}
