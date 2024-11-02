import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { validate } from './config';
import { AppController } from './app.controller';


@Module({
  imports: [
    ConfigModule.forRoot({
      validate
    }),
  ],
  controllers: [AppController],

  providers: [

  ],

  exports: [],
})



export class AppModule {


}
