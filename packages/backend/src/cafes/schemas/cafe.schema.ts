import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';
import mongoose from 'mongoose';
import { CafeTag } from './cafe-tag.schema';

export type CafeDocument = HydratedDocument<Cafe>;

@Schema({ collection: 'cafes', timestamps: true })
export class Cafe {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop()
  address: string;

  @Prop()
  roadAddress: string;

  @Prop({ default: 0 })
  rating: number;

  @Prop({
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  })
  location: Record<string, any>;

  @Prop([{ type: mongoose.Types.ObjectId, ref: CafeTag.name }])
  tags: mongoose.Types.ObjectId[];

  @Prop([{ title: String, url: String }])
  images: Record<string, any>[];
}

export const CafeSchema = SchemaFactory.createForClass(Cafe);
