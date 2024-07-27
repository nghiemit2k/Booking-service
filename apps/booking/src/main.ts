import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import setUpApplication from '@libs/@libs/core/setup';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  const { port, logInfo } = setUpApplication(app);

  await app.listen(port);
  logInfo();
}
bootstrap();
