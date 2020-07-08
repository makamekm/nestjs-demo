/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { DomainService, IListInput } from './domain.service';

@Controller('v1')
export class AppController {
  constructor(private readonly domainService: DomainService) {}

  @Get('ping')
  ping(): string {
    return 'pong';
  }

  @Post('add')
  async add(@Body() data: IListInput): Promise<number> {
    console.log(data);
    return await this.domainService.createList(data);
  }

  @Get('fill')
  async fill(): Promise<number> {
    return await this.domainService.fillTestData();
  }

  @Get('list')
  getAll() {
    return this.domainService.findAll();
  }
}
