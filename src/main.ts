import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { Logger, VersioningType } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // TODO: condicionar el Swagger para qa y dev unicamente
  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API')
    .setVersion('1.0')
    .addTag('MicroService')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-docs', app, document);

  app
    .useStaticAssets(join(__dirname, '../public'), {
      prefix: '/api/public/',
      index: false,
      redirect: false,
    })
    .enableCors();

  await app.listen(process.env.PORT || 3000, () => {
    Logger.log(`Listening on port: ${process.env.PORT || 3000}`, 'Accounts');
  });
}

bootstrap();
