import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CafesHttpService } from './cafes-http.service';

@ApiTags('place')
@Controller('place')
export class CafesHttpController {
  constructor(private cafesHttpService: CafesHttpService) {}

  @Get()
  @ApiOkResponse()
  async find(@Query('query') query: string) {
    return this.cafesHttpService.findPlace({ query });
  }
}
