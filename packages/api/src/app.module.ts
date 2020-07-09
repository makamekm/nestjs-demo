import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { DomainModule } from './domain.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve('./public'),
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: path.resolve('./database.sqlite'),
      // host: 'localhost',
      // port: 3306,
      // username: 'root',
      // password: 'root',
      // database: 'test',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    DomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
