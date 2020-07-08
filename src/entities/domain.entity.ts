import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { DomainContact } from './domain-contact.entity';
import { UploadList } from './upload-list.entity';

@Entity()
export class Domain {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @OneToMany(
    () => DomainContact,
    photo => photo.domain,
  )
  contacts: DomainContact[];

  @ManyToMany(
    () => UploadList,
    e => e.domains,
  )
  lists: UploadList[];
}
