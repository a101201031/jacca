import { Controller, Get, Param, Post } from '@nestjs/common';
import { CafesService } from './cafes.service';

@Controller('cafes')
export class CafesController {
  constructor(private cafesService: CafesService) {}

  @Get()
  async findAll() {
    const cafes = await this.cafesService.findAll();
    console.log(cafes);
    return cafes;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const cafe = await this.cafesService.findOneById(id);
    return cafe;
  }
}
