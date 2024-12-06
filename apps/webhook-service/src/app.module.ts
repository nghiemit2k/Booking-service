import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { validate } from './config';

import { DataBaseModule } from 'apps/booking/src/database/database.module';
import { GoogleWebhookModule } from '../google-webhook/google-webhook.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate
    }),
    DataBaseModule,
    GoogleWebhookModule
  ],
  controllers: [],

  providers: [

  ],

  exports: [],
})



export class AppModule {


}
