import { createConnection } from 'typeorm';
import * as path from 'path';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    useFactory: async () => {
      return await createConnection({
        type: 'sqlite',
        database: path.resolve('./database.sqlite'),
        // host: 'localhost',
        // port: 3306,
        // username: 'root',
        // password: 'root',
        // database: 'test',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });
    },
  },
];
