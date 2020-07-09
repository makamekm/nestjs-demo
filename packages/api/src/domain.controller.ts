/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get, Post, Body, Query, Inject } from '@nestjs/common';
import { DomainService, IListInput } from './domain.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller('v1')
export class DomainController {
  constructor(
    private readonly domainService: DomainService,
    @Inject('DOMAIN_SERVICE') private client: ClientProxy,
  ) {}

  @Get('ping')
  ping(): string {
    return 'pong';
  }

  @Post('add')
  async add(@Body() data: IListInput) {
    return this.client.send<number>({ cmd: 'add' }, data);
  }

  @Get('list')
  async list(@Query() query: { limit: number; skip: number }) {
    return this.client.send({ cmd: 'list' }, query);
  }
}
