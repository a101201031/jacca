import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Cafe } from '@src/cafes';
import { User } from '@src/users';
import type { HydratedDocument } from 'mongoose';

export type ReviewDocument = HydratedDocument<Review>;

@Schema({ collection: 'reviews', timestamps: true })
export class Review {
  @Prop({ ref: 'users' })
  userId: User;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'cafes' })
  cafeId: Cafe;

  @Prop({ required: true })
  score: number;

  @Prop()
  content: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
