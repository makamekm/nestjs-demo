import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CORS } from '@env/config';

export async function bootstrapAPI() {
  const app = await NestFactory.create(AppModule, { cors: CORS });
  const port = process.env.PORT || 5000;
  await app.listen(port);
  console.log('Server is listening...', port);
}
