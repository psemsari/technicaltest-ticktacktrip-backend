import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {rawBody: true});
  app.useBodyParser('text')
  console.log('Application is running on : ' + app.getUrl());
  await app.listen(port);
}
bootstrap();
