import type Types from 'mongoose';
import type { InferSchemaType } from 'mongoose';
import { Schema, model } from 'mongoose';
import { PointSchema } from './GeoJson';

export interface Cafe {
  _id: Types.ObjectId;
  title: string;
  address: string;
  roadAddress: string;
  location: InferSchemaType<typeof PointSchema>;
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
  tags: Types.ObjectId[];
}

const CafeSchema = new Schema<Cafe>(
  {
    title: { type: String, required: true, unique: true },
    address: { type: String },
    roadAddress: { type: String },
    rating: { type: Number, default: 0 },
    location: {
      type: PointSchema,
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
    tags: [{ type: Schema.Types.ObjectId, ref: 'cafeTag' }],
  },
  { timestamps: true, collection: 'cafes' },
);

interface CafeTag {
  _id: Types.ObjectId;
  tag: string;
  createdAt: Date;
  updatedAt: Date;
}

const CafeTagSchema = new Schema<CafeTag>(
  {
    tag: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

export const CafeTagModel = model('cafeTag', CafeTagSchema);

export const CafeModel = model('cafes', CafeSchema);
