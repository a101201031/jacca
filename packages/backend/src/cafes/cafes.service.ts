import { Injectable } from '@nestjs/common';
import type { PaginationDto } from '@src/common';
import { CafesHttpService } from './cafes-http';
import { CafesRepository } from './cafes.repository';
import type { CreateCafeDto, FindAllCafeRequestDto } from './dto';

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
    { title, rating, sortBy, orderBy }: FindAllCafeRequestDto,
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
        _id: v._id,
        title: v.title,
        address: v.address,
        roadAddress: v.roadAddress,
        rating: v.rating / 20,
        tags: v.tags,
        images: v.images,
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

  async remove(id) {
    return this.cafesRepository.remove(id);
  }
}
