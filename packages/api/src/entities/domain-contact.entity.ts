import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Domain } from './domain.entity';

@Entity()
export class DomainContact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45 })
  firstName: string;

  @Column({ length: 45 })
  lastName: string;

  @Column({ length: 100 })
  email: string;

  @Column('int')
  confidence: number;

  @ManyToOne(
    () => Domain,
    domain => domain.contacts,
  )
  domain: Domain;

  // @Column('text')
  // description: string;

  // @Column()
  // filename: string;

  // @Column('int')
  // views: number;

  // @Column()
  // isPublished: boolean;
}
