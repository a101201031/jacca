import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CafesHttpService } from './cafes-http.service';

@Controller('place')
export class CafesHttpController {
  constructor(private cafesHttpService: CafesHttpService) {}

  @Get()
  async find(@Query('query') query: string) {
    return this.cafesHttpService.findPlace({ query });
  }
}
