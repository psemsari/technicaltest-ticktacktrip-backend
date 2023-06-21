import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {rawBody: true});
  app.useBodyParser('text')
  console.log('Application is running on : ' + app.getUrl());
  await app.listen(80);
}
bootstrap();
