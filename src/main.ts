import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import config from './config'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenv.config();
  // setup global prefix
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
  .setTitle('booking api')
  .setDescription('The cats API description')
  .setVersion('1.0')
  .addTag('booking')
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe());

  const appPort = process.env.APP_PORT || 3000;
  await app.listen(appPort);

  console.table({
    port: appPort,
    name: 'Booking API'
  })
}

bootstrap();
