/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import fetch from 'node-fetch';
import { InjectRepository } from '@nestjs/typeorm';
import { Domain } from './entities/domain.entity';
import { DomainContact } from './entities/domain-contact.entity';
import { UploadList } from './entities/upload-list.entity';

const HUNTER_API_KEY = '3c5bba51ebec857a91f2449e0218ab295041a1c7';
const DOMAIN_REGEXP = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/gim;

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

  async findAll(limit: number, skip: number) {
    const lists = await this.uploadListRepository
      .createQueryBuilder('e')
      .leftJoinAndSelect('e.domains', 'domain')
      .leftJoinAndSelect('domain.contacts', 'contact')
      .take(limit)
      .skip(skip)
      .getManyAndCount();

    return lists;
  }

  parseDomains(urls: string[]) {
    return urls
      .map(u => {
        const groups = DOMAIN_REGEXP.exec(u);
        return groups ? groups[1] : null;
      })
      .filter(u => !!u);
  }

  async findOrCreateDomainDto(domain: string): Promise<[Domain, boolean]> {
    let domainDto = await this.domainRepository.findOne({
      relations: ['contacts'],
      where: {
        name: domain,
      },
    });

    if (domainDto) {
      return [domainDto, true];
    } else {
      domainDto = await this.domainRepository.save(
        this.domainRepository.create({
          name: domain,
        }),
      );
      return [domainDto, false];
    }
  }

  async loadDomain(domain: string) {
    try {
      const [domainDto, domainCached] = await this.findOrCreateDomainDto(
        domain,
      );

      if (domainCached) {
        return domainDto;
      }

      const res = await fetch(
        `https://api.hunter.io/v2/domain-search?domain=${domain}&api_key=${HUNTER_API_KEY}`,
      );
      const json = await res.json();
      const emails = json.data.emails || [];
      await Promise.all(
        emails.map(email =>
          this.domainContactRepository.insert({
            firstName: email.first_name || '',
            lastName: email.last_name || '',
            email: email.value || '',
            confidence: email.confidence || 0,
            domain: domainDto,
          }),
        ),
      );

      return domainDto;
    } catch (error) {
      console.error(error);
    }
  }

  async createList(data: IListInput) {
    const domains = this.parseDomains(data.urls);
    const domainDtoList = (
      await Promise.all(domains.map(d => this.loadDomain(d)))
    ).filter(g => !!g);
    return await this.uploadListRepository.save(
      this.uploadListRepository.create({
        name: data.name || '',
        uploadTime: new Date(),
        domains: domainDtoList,
      }),
    );
  }
}
