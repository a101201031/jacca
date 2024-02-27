import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CafesHttpService } from './cafes-http.service';

@ApiTags('place')
@Controller('place')
export class CafesHttpController {
  constructor(private readonly cafesHttpService: CafesHttpService) {}

  @ApiOkResponse()
  @Get()
  async find(@Query('query') query: string) {
    return this.cafesHttpService.findPlace({ query });
  }
}
