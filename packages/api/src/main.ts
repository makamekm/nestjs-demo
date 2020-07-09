import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { CORS } from '@env/config';

async function bootstrapMS() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
    },
  );
  app.listen(() => console.log('Microservice is listening...'));
}

async function bootstrapAPI() {
  const app = await NestFactory.create(AppModule, { cors: CORS });
  await app.listen(5000);
}

bootstrapAPI();
bootstrapMS();
