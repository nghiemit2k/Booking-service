import {  Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { validate } from './config';


@Module({
  imports: [
    ConfigModule.forRoot({
      validate
    }),
   ],
  controllers: [],
  
  providers: [ 
   
 ] ,

 exports: [],
})

 

export class AppModule {


}
