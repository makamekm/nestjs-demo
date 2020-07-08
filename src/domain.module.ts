import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { DomainService } from './domain.service';
import { Domain } from './entities/domain.entity';
import { DomainContact } from './entities/domain-contact.entity';
import { UploadList } from './entities/upload-list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Domain, DomainContact, UploadList])],
  controllers: [AppController],
  providers: [DomainService],
})
export class DomainModule {}
