import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { load } from 'js-yaml';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  try {
    const doc = readFileSync(join(__dirname, '..', 'doc', 'api.yaml'), 'utf-8');

    const swaggerDocument = load(doc) as OpenAPIObject;

    SwaggerModule.setup('doc', app, swaggerDocument);
  } catch (e) {
    console.error(e);
  }
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
