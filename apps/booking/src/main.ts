import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import config from './config'
import { SerializeInterceptor } from './interceptor/serialize.intercepter';
import setUpApplication from '@libs/@libs/core/setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  const { port, logInfo } = setUpApplication(app);

  await app.listen(port);
  logInfo();
}
bootstrap();
