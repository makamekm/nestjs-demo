import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { CORS, MS_CONFIG } from '@env/config';

async function bootstrapMS() {
  const ms = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    MS_CONFIG,
  );
  await ms.listenAsync();
  console.log('Microservice is listening...');
}

async function bootstrapAPI() {
  const app = await NestFactory.create(AppModule, { cors: CORS });
  const port = process.env.PORT || 5000;
  await app.listen(port);
  console.log('Server is listening...', port);
}

bootstrapAPI();
bootstrapMS();
