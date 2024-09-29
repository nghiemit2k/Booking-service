import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import setUpApplication from '../../../libs/core/src/setup';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const { port, logInfo } = setUpApplication(app);

  await app.listen(port);
  logInfo();
}
bootstrap();
