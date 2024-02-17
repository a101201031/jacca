import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Cafe } from '@src/cafes';
import { User } from '@src/users';
import type { HydratedDocument } from 'mongoose';
import mongoose from 'mongoose';

export type ReviewDocument = HydratedDocument<Review>;

@Schema({ collection: 'reviews', timestamps: true })
export class Review {
  @Prop({ ref: 'users' })
  userId: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'cafes' })
  cafeId: Cafe;

  @Prop({ required: true })
  score: number;

  @Prop()
  content: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
