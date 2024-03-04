import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { PaginationDto } from '@src/common';
import type {
  ClientSession,
  FilterQuery,
  InferSchemaType,
  UpdateQuery,
} from 'mongoose';
import { Model } from 'mongoose';
import type { CreateCafeDto, FindAllCafesDto } from './dto';
import type { CafeSchema } from './schemas';
import { Cafe } from './schemas';

interface CreateCafeAdditional
  extends Pick<
    InferSchemaType<typeof CafeSchema>,
    'address' | 'images' | 'location' | 'roadAddress'
  > {}

@Injectable()
export class CafesRepository {
  constructor(
    @InjectModel(Cafe.name) private readonly cafeModel: Model<Cafe>,
  ) {}

  async create(
    createCafeDto: CreateCafeDto,
    createCafeAdditional: CreateCafeAdditional,
  ) {
    return this.cafeModel.create({
      ...createCafeDto,
      ...createCafeAdditional,
    });
  }

  async findAll(
    filterQuery: FilterQuery<Cafe>,
    {
      sortBy,
      orderBy,
    }: {
      sortBy: FindAllCafesDto['sortBy'];
      orderBy: FindAllCafesDto['orderBy'];
    },
    { limit, offset }: PaginationDto,
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
      .lean()
      .exec();
  }

  async countDocument(filterQuery: FilterQuery<Cafe>) {
    return this.cafeModel.countDocuments(filterQuery).lean().exec();
  }

  async findOneById(id) {
    return this.cafeModel.findById(id).populate('tags').lean().exec();
  }

  async update(id, updateQuery: UpdateQuery<Cafe>, session?: ClientSession) {
    return this.cafeModel
      .findByIdAndUpdate(id, updateQuery, { new: true })
      .session(session)
      .lean()
      .exec();
  }

  async remove(id) {
    await this.cafeModel.findByIdAndDelete(id).lean().exec();
  }
}
