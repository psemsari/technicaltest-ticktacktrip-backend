import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {rawBody: true});
  app.useBodyParser('text')

  const config = new DocumentBuilder()
  .setTitle('Justify API')
  .setDescription('Justify API automatically format and align text to ensure visually appealing and consistent results. It provides developers with a seamless solution for justifying text content, eliminating the hassle of manual formatting and alignment.')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
