import type Types from 'mongoose';
import type { InferSchemaType } from 'mongoose';
import { Schema, model } from 'mongoose';
import { pointSchema } from './GeoJson';

export interface Cafe {
  _id: Types.ObjectId;
  title: string;
  address: string;
  roadAddress: string;
  location: InferSchemaType<typeof pointSchema>;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  cafeInfo: {
    size: string;
    parking: string;
  };
  images: {
    title: string;
    url: string;
  }[];
}

export const CafeSchema = new Schema<Cafe>(
  {
    title: { type: String, required: true, unique: true },
    address: { type: String },
    roadAddress: { type: String },
    rating: { type: Number },
    location: {
      type: pointSchema,
      index: '2dsphere',
      require: true,
    },
    images: {
      type: [
        {
          title: { type: String },
          url: { type: String },
        },
      ],
    },
  },
  { timestamps: true, collection: 'cafes' },
);

export const CafeModel = model('cafes', CafeSchema);
