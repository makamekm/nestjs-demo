import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CORS } from '@env/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: CORS });
  await app.listen(5000);
}
bootstrap();
