import type Types from 'mongoose';
import { Schema, model } from 'mongoose';

export interface Review {
  _id: Types.ObjectId;
  userId: string;
  cafeId: Types.ObjectId;
  score: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<Review>(
  {
    userId: { type: String, ref: 'user' },
    cafeId: { type: Schema.Types.ObjectId, ref: 'cafe' },
    score: { type: Number, required: true },
    content: { type: String },
  },
  { timestamps: true },
);

export const ReviewModel = model('review', ReviewSchema);
