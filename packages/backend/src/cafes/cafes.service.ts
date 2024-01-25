import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CafesHttpService } from './cafes-http';
import type { CreateCafeDto } from './dto';
import { Cafe } from './schemas';

@Injectable()
export class CafesService {
  constructor(
    @InjectModel(Cafe.name) private cafeModel: Model<Cafe>,
    private readonly cafeHttpService: CafesHttpService,
  ) {}

  async create(createCafeDto: CreateCafeDto) {
    const { address, roadAddress, lng, lat } =
      await this.cafeHttpService.findGeocodeByQuery({
        query: createCafeDto.address,
      });
    const images = await this.cafeHttpService.findPlaceImage({
      query: createCafeDto.title,
    });

    const location = { type: 'Point', coordinates: [Number(lng), Number(lat)] };
    return this.cafeModel.create({
      title: createCafeDto.title,
      address,
      roadAddress,
      location,
      images,
    });
  }

  findAll() {
    return this.cafeModel.find().exec();
  }

  findOneById(id) {
    return this.cafeModel.findById(id).exec();
  }
}
