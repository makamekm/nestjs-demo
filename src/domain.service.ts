/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import fetch from 'node-fetch';
import { InjectRepository } from '@nestjs/typeorm';
import { Domain } from './entities/domain.entity';
import { DomainContact } from './entities/domain-contact.entity';
import { UploadList } from './entities/upload-list.entity';

export interface IListInput {
  name: string;
  urls: string[];
}

@Injectable()
export class DomainService {
  constructor(
    @InjectRepository(Domain)
    private readonly domainRepository: Repository<Domain>,
    @InjectRepository(DomainContact)
    private readonly domainContactRepository: Repository<DomainContact>,
    @InjectRepository(UploadList)
    private readonly uploadListRepository: Repository<UploadList>,
  ) {}

  async findAll() {
    const lists = await this.uploadListRepository
      .createQueryBuilder('e')
      .leftJoinAndSelect('e.domains', 'domain')
      .leftJoinAndSelect('domain.contacts', 'contact')
      .getMany();

    return lists;
  }

  async fillTestData(): Promise<number> {
    return await this.createList({
      name: 'Tech Sites',
      urls: ['https://docs.google.com/document/d'],
    });
  }

  // TODO: Refactoring
  apiKey = '3c5bba51ebec857a91f2449e0218ab295041a1c7';

  async createList(data: IListInput) {
    const domains = data.urls
      .map(
        u =>
          /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/gim.exec(u)[1],
      )
      .filter(u => !!u);

    const results = await Promise.all(
      domains.map(async domain => {
        const res = await fetch(
          `https://api.hunter.io/v2/domain-search?domain=${domain}&api_key=${this.apiKey}`,
        );
        const json = await res.json();
        const emails = json.data.emails;

        let domainDto = await this.domainRepository.findOne({
          where: {
            name: domain,
          },
        });

        if (!domainDto) {
          domainDto = await this.domainRepository.save(
            this.domainRepository.create({
              name: domain,
            }),
          );
        }

        await Promise.all(
          emails.map(email => {
            this.domainContactRepository.insert({
              firstName: email.first_name || '',
              lastName: email.last_name || '',
              email: email.value || '',
              confidence: email.confidence || 0,
              domain: domainDto,
            });
          }),
        );

        return domainDto;
      }),
    );

    const list = await this.uploadListRepository.save(
      this.uploadListRepository.create({
        name: data.name || '',
        uploadTime: new Date(),
        domains: results,
      }),
    );

    return list.id;
  }
}
