import type Types from 'mongoose';
import { Schema, model } from 'mongoose';

export interface Bookmark {
  _id: string;
  cafes: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const BookmarkSchema = new Schema<Bookmark>(
  {
    _id: { type: String, ref: 'user', required: true, unique: true },
    cafes: [{ type: Schema.Types.ObjectId, ref: 'cafes' }],
  },
  { timestamps: true },
);

export const BookmarkModel = model('bookmark', BookmarkSchema);
