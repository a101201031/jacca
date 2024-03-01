import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CafesModule } from '@src/cafes';
import { User, UserSchema } from '@src/users';
import { ReviewsController } from './reviews.controller';
import { ReviewsRepository } from './reviews.repository';
import { ReviewsService } from './reviews.service';
import { Review, ReviewSchema } from './schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Review.name, schema: ReviewSchema },
      { name: User.name, schema: UserSchema },
    ]),
    CafesModule,
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService, ReviewsRepository],
})
export class ReviewsModule {}
