import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FirebaseAuthGuard, RequestWithFirebaseAuth } from '@src/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth('access-token')
  @UseGuards(FirebaseAuthGuard)
  @Post()
  async create(
    @Req() req: RequestWithFirebaseAuth,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.usersService.create(createUserDto, req.user);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(FirebaseAuthGuard)
  @Get()
  async findOne(@Req() req: RequestWithFirebaseAuth) {
    return this.usersService.findOne(req.user.uid);
  }
}
