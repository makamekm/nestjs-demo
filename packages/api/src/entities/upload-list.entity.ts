import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Domain } from './domain.entity';

@Entity()
export class UploadList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45 })
  name: string;

  @Column('datetime')
  uploadTime: Date;

  @ManyToMany(
    () => Domain,
    e => e.lists,
    {
      cascade: true,
    },
  )
  @JoinTable()
  domains: Domain[];
}
