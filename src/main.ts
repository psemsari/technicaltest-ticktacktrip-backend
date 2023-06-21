import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {rawBody: true});
  app.useBodyParser('text')
  await app.listen(process.env.PORT || 1000, process.env.HOST || 'localhost');
}
bootstrap();
