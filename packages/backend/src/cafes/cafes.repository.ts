import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { FilterQuery, InferSchemaType } from 'mongoose';
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

  async findAll(
    filterQuery: FilterQuery<Cafe>,
    {
      sortBy,
      orderBy,
    }: { sortBy: 'title' | 'rating' | '_id'; orderBy: 'asc' | 'desc' },
    { limit, offset }: { limit: number; offset: number },
  ) {
    return this.cafeModel
      .find(filterQuery)
      .sort([[sortBy, orderBy]])
      .select({
        title: 1,
        address: 1,
        roadAddress: 1,
        rating: 1,
        tags: 1,
        images: 1,
      })
      .skip(offset)
      .limit(limit)
      .exec();
  }

  async countDocument(filterQuery: FilterQuery<Cafe>) {
    return this.cafeModel.countDocuments(filterQuery).exec();
  }

  async findOneById(id) {
    return this.cafeModel.findById(id).exec();
  }

  async remove(id) {
    await this.cafeModel.findByIdAndDelete(id).exec();
  }
}
