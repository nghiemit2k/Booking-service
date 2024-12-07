import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JobConsumer } from './job.consumer';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);

    const jobConsumer = app.get(JobConsumer);
    jobConsumer.sendEmail();
    await jobConsumer.sendEmail();

    await app.close();
}

bootstrap();