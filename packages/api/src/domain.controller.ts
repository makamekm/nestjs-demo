/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { DomainService, IListInput } from './domain.service';

@Controller('v1')
export class DomainController {
  constructor(private readonly domainService: DomainService) {}

  @Get('ping')
  ping(): string {
    return 'pong';
  }

  @Post('add')
  async add(@Body() data: IListInput): Promise<number> {
    const list = await this.domainService.createList(data);
    return list.id;
  }

  @Get('list')
  async getAll(@Query() query: { limit: number; skip: number }) {
    const [data, total] = await this.domainService.findAll(
      query.limit || 10,
      query.skip || 0,
    );
    return {
      data,
      total,
    };
  }
}
