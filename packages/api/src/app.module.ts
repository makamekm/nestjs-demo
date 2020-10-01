import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServeStaticModule } from "@nestjs/serve-static";
import { DomainModule } from "./modules/domain/domain.module";
import { DB_CONFIG, PUBLIC_FOLDER } from "@env/config";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: PUBLIC_FOLDER,
      renderPath: "/",
      exclude: ["/v1/*"]
    }),
    TypeOrmModule.forRoot(DB_CONFIG),
    DomainModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
