import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const DB_CONFIG: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: path.resolve('./database.sqlite'),
};

// host: 'localhost',
// port: 3306,
// username: 'root',
// password: 'root',
// database: 'test',
