import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { DomainModule } from './modules/domain/domain.module';
import { DB_CONFIG } from '@env/config';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve('./public'),
    }),
    TypeOrmModule.forRoot(DB_CONFIG),
    DomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
