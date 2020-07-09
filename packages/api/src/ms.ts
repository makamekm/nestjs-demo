import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { MS_CONFIG } from '@env/config';

export async function bootstrapMS() {
  const ms = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    MS_CONFIG,
  );
  await ms.listenAsync();
  console.log('Microservice is listening...');
}
