import * as path from "path";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Transport, RmqOptions } from "@nestjs/microservices";

export const CORS = false;
export const DB_CONFIG: TypeOrmModuleOptions = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "pb_interview",
  entities: [path.resolve("./") + "/src/**/*.entity{.ts,.js}"],
  synchronize: true
};
export const MS_CONFIG: RmqOptions = {
  transport: Transport.RMQ,
  options: {
    urls: [process.env.MQ],
    queue: "main_queue",
    queueOptions: {
      durable: false
    }
  }
};
export const HUNTER_API_KEY = "3c5bba51ebec857a91f2449e0218ab295041a1c7";
export const PUBLIC_FOLDER = path.resolve("./public");
