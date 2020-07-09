import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const DB_CONFIG: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: path.resolve('./database.sqlite'),
  entities: [path.resolve('./') + '/src/**/*.entity{.ts,.js}'],
  synchronize: true,
};
