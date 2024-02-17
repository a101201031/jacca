import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import type { HydratedDocument } from 'mongoose';
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

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: CafeTag.name }] })
  tags: CafeTag[];

  @Prop([{ title: String, url: String }])
  images: Record<string, any>[];
}

export const CafeSchema = SchemaFactory.createForClass(Cafe);
