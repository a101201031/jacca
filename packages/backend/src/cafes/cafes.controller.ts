import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import {
  FirebaseAuthGuard,
  PaginationDto,
  PaginationQuery,
  ApiPaginationQuery,
} from '@src/common';
import { CafesService } from './cafes.service';
import { CreateCafeDto, FindAllCafeRequestDto } from './dto';

@ApiTags('cafes')
@Controller('cafes')
export class CafesController {
  constructor(private cafesService: CafesService) {}

  @ApiBearerAuth('access-token')
  @ApiCreatedResponse()
  @UseGuards(FirebaseAuthGuard)
  @Post()
  async create(@Body() createCafeDto: CreateCafeDto) {
    return this.cafesService.create(createCafeDto);
  }

  @ApiPaginationQuery()
  @Get()
  async findAll(
    @PaginationQuery() pagination: PaginationDto,
    @Query() findAllCafeRequestDto: FindAllCafeRequestDto,
  ) {
    return this.cafesService.findAll(findAllCafeRequestDto, pagination);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const cafe = await this.cafesService.findOneById(id);
    return cafe;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.cafesService.remove(id);
  }
}
