import { NestFactory } from '@nestjs/core';
import { WebhookServiceModule } from './webhook-service.module';
import { AppModule } from 'apps/booking/src/app.module';
import setUpApplication from '@libs/@libs/core/setup';

async function bootstrap() {
  
  const app = await NestFactory.create(WebhookServiceModule);

  const { port, logInfo } = setUpApplication(app);

  await app.listen(port);
  logInfo();
}
bootstrap();
