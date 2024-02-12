import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { FirebaseAuthGuard } from '@src/common';
import { CafesService } from './cafes.service';
import { CreateCafeDto } from './dto';

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

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.cafesService.remove(id);
  }
}
