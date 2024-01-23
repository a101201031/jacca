import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cafe } from './schemas';

@Injectable()
export class CafesService {
  constructor(@InjectModel(Cafe.name) private cafeModel: Model<Cafe>) {}

  findAll() {
    return this.cafeModel.find().exec();
  }

  findOneById(id) {
    return this.cafeModel.findById(id).exec();
  }
}
