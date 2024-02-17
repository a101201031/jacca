import { Injectable } from '@nestjs/common';
import type { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { UsersRepository } from './users.repository';
import type { CreateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private readonly usesrRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto, { uid, email }: DecodedIdToken) {
    return this.usesrRepository.create(createUserDto, { _id: uid, email });
  }

  async findOne(id: string) {
    return this.usesrRepository.findOneById(id);
  }
}
