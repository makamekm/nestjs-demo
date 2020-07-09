import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainController } from './domain.controller';
import { DomainService } from './domain.service';
import { Domain } from './entities/domain.entity';
import { DomainContact } from './entities/domain-contact.entity';
import { UploadList } from './entities/upload-list.entity';
import { DomainMSController } from './domain.ms.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Domain, DomainContact, UploadList]),
    ClientsModule.register([
      { name: 'DOMAIN_SERVICE', transport: Transport.TCP },
    ]),
  ],
  controllers: [DomainController, DomainMSController],
  providers: [DomainService],
})
export class DomainModule {}
