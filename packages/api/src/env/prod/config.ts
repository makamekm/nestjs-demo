import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TcpOptions, Transport } from '@nestjs/microservices';

export const DB_CONFIG: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: path.resolve('./database.sqlite'),
  entities: [path.resolve('./') + '/src/**/*.entity{.ts,.js}'],
  synchronize: true,
};
export const CORS = false;

export const MS_CONFIG: TcpOptions = {
  transport: Transport.TCP,
};

// host: 'localhost',
// port: 3306,
// username: 'root',
// password: 'root',
// database: 'test',
