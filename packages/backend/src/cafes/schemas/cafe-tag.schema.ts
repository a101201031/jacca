import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';

export type CafeTagDocument = HydratedDocument<CafeTag>;

@Schema()
export class CafeTag {
  @Prop({ required: true, unique: true })
  tag: string;
}

export const CafeTagSchema = SchemaFactory.createForClass(CafeTag);
