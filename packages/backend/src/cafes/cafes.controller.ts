import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  ApiPaginationQuery,
  FirebaseAuthGuard,
  PaginationDto,
  PaginationQuery,
} from '@src/common';
import { CafesService } from './cafes.service';
import { CreateCafeDto, FindAllCafesDto } from './dto';

@ApiTags('cafes')
@Controller('cafes')
export class CafesController {
  constructor(private cafesService: CafesService) {}

  @ApiBearerAuth('access-token')
  @UseGuards(FirebaseAuthGuard)
  @Post()
  async create(@Body() createCafeDto: CreateCafeDto) {
    return this.cafesService.create(createCafeDto);
  }

  @ApiPaginationQuery()
  @Get()
  async findAll(
    @PaginationQuery() paginationDto: PaginationDto,
    @Query() findAllCafesDto: FindAllCafesDto,
  ) {
    return this.cafesService.findAll(findAllCafesDto, paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const cafe = await this.cafesService.findOneById(id);
    return cafe;
  }

  @ApiBearerAuth('access-token')
  @UseGuards(FirebaseAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.cafesService.remove(id);
  }
}
