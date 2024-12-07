import { Module } from '@nestjs/common';
import { JobConsumer } from './job.consumer';
import { PostmarkModule } from '@libs/integration/postmark/postmark.module';

@Module({
    imports: [],
    controllers: [],
    imports: [PostmarkModule],
    providers: [JobConsumer],
})
export class AppModule { }