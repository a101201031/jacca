import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CafesHttpService } from './cafes-http';
import type { CreateCafeDto } from './dto';
import { Cafe } from './schemas';
import { CafesRepository } from './cafes.repository';

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

  async findAll() {
    return this.cafesRepository.findAll();
  }

  async findOneById(id) {
    return this.cafesRepository.findOneById(id);
  }

  async remove(id) {
    return this.cafesRepository.remove(id);
  }
}
