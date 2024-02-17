import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { CreateUserDto } from './dto';
import { User } from './schema';

interface CreateUserAdditional extends Pick<User, '_id' | 'email'> {}

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(
    createUserDto: CreateUserDto,
    createUserAdditional: CreateUserAdditional,
  ) {
    const { displayName } = createUserDto;
    const { _id, email } = createUserAdditional;
    return this.userModel.create({
      _id,
      displayName,
      email,
    });
  }

  async findOneById(id: string) {
    return this.userModel.findById(id).exec();
  }
}
