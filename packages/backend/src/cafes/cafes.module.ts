import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CafesService } from './cafes.service';
import { Cafe, CafeSchema } from './schemas';
import { CafesController } from './cafes.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cafe.name, schema: CafeSchema }]),
  ],
  controllers: [CafesController],
  providers: [CafesService],
})
export class CafesModule {}
