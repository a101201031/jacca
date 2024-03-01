import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export type ReviewDocument = HydratedDocument<Review>;

@Schema({ collection: 'reviews', timestamps: true })
export class Review {
  @Prop({ ref: 'users' })
  userId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'cafes' })
  cafeId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  score: number;

  @Prop()
  content: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
