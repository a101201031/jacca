import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { InferSchemaType } from 'mongoose';
import { Model } from 'mongoose';
import type { CreateCafeDto } from './dto';
import type { CafeSchema } from './schemas';
import { Cafe } from './schemas';

interface CreateCafeAdditional
  extends Pick<
    InferSchemaType<typeof CafeSchema>,
    'address' | 'images' | 'location' | 'roadAddress'
  > {}

@Injectable()
export class CafesRepository {
  constructor(@InjectModel(Cafe.name) private cafeModel: Model<Cafe>) {}

  async create(
    createCafeDto: CreateCafeDto,
    createCafeAdditional: CreateCafeAdditional,
  ) {
    const { title } = createCafeDto;
    const { address, roadAddress, location, images } = createCafeAdditional;
    return this.cafeModel.create({
      title,
      address,
      roadAddress,
      location,
      images,
    });
  }

  async findAll() {
    return this.cafeModel.find().exec();
  }

  async findOneById(id) {
    return this.cafeModel.findById(id).exec();
  }
}
