/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { DomainService, IListInput } from './domain.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class DomainMSController {
  constructor(private readonly domainService: DomainService) {}

  @MessagePattern({ cmd: 'add' })
  async add(data: IListInput): Promise<number> {
    const list = await this.domainService.createList(data);
    return list.id;
  }

  @MessagePattern({ cmd: 'list' })
  async list(query: { limit: number; skip: number }) {
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
