import { Injectable } from '@nestjs/common';
import type { PaginationDto } from '@src/common';
import type { ClientSession, UpdateQuery } from 'mongoose';
import { CafesHttpService } from './cafes-http';
import { CafesRepository } from './cafes.repository';
import type { CreateCafeDto, FindAllCafesDto } from './dto';
import type { Cafe } from './schemas';

@Injectable()
export class CafesService {
  constructor(
    private readonly cafesRepository: CafesRepository,
    private readonly cafesHttpService: CafesHttpService,
  ) {}

  async create(createCafeDto: CreateCafeDto) {
    const { address, roadAddress, lng, lat } =
      await this.cafesHttpService.findGeocodeByQuery({
        query: createCafeDto.address,
      });
    const images = await this.cafesHttpService.findPlaceImage({
      query: createCafeDto.title,
    });
    const location = { type: 'Point', coordinates: [Number(lng), Number(lat)] };

    return this.cafesRepository.create(createCafeDto, {
      address,
      roadAddress,
      images,
      location,
    });
  }

  async findAll(
    { title, rating, sortBy, orderBy }: FindAllCafesDto,
    { limit, offset }: PaginationDto,
  ) {
    const filterQuery = {
      title: title ? { $regex: new RegExp(title, 'i') } : { $exists: true },
      rating: { $gte: rating },
    };
    const cafes = await this.cafesRepository.findAll(
      filterQuery,
      { sortBy, orderBy },
      { limit, offset },
    );
    const total = await this.cafesRepository.countDocument(filterQuery);

    return {
      data: cafes.map((v) => ({
        ...v,
        rating: v.rating / 20,
      })),
      paging: {
        limit,
        offset,
        total,
      },
    };
  }

  async findOneById(id) {
    return this.cafesRepository.findOneById(id);
  }

  async update(id, updateQuery: UpdateQuery<Cafe>, session?: ClientSession) {
    return this.cafesRepository.update(id, updateQuery, session);
  }

  async remove(id) {
    return this.cafesRepository.remove(id);
  }
}
