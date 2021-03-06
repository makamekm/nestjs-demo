import * as path from "path";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { TcpOptions, Transport } from "@nestjs/microservices";

export const CORS = false;
export const DB_CONFIG: TypeOrmModuleOptions = {
  type: "sqlite",
  database: path.resolve("./database.sqlite"),
  entities: [path.resolve(__dirname, "../../") + "/**/*.entity{.ts,.js}"],
  synchronize: true
};
export const MS_CONFIG: TcpOptions = {
  transport: Transport.TCP
};
export const HUNTER_API_KEY = "3c5bba51ebec857a91f2449e0218ab295041a1c7";
export const PUBLIC_FOLDER = path.resolve(__dirname, "../../../", "./public");

console.log("here", __dirname, PUBLIC_FOLDER);
