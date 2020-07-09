import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { CORS, MS_CONFIG } from '@env/config';

async function bootstrapMS() {
  const ms = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    MS_CONFIG,
  );
  ms.listen(() => console.log('Microservice is listening...'));
}

async function bootstrapAPI() {
  const app = await NestFactory.create(AppModule, { cors: CORS });
  await app.listen(5000);
}

bootstrapAPI();
bootstrapMS();
