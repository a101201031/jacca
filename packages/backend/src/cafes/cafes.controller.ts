import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CafesService } from './cafes.service';
import { CreateCafeDto } from './dto';

@Controller('cafes')
export class CafesController {
  constructor(private cafesService: CafesService) {}

  @Post()
  async create(@Body() createCafeDto: CreateCafeDto) {
    return this.cafesService.create(createCafeDto);
  }

  @Get()
  async findAll() {
    const cafes = await this.cafesService.findAll();
    return cafes;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const cafe = await this.cafesService.findOneById(id);
    return cafe;
  }
}
