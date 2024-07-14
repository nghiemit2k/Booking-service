import { MiddlewareConsumer, Module, NestModule, Session } from '@nestjs/common';
import { UserModule } from './domain/user/user.module';
import { SessionTemplateModule } from './domain/session-template/session-template.module';
import { AuthModule } from './domain/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './domain/guard/auth.guard';

import { DataBaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { AuthenticationMiddleware } from './middleware/authentication.middleware';


import { UserService } from './domain/user/user.service';
import { DatabaseService } from './database/database.service';



@Module({
  imports: [
    ConfigModule.forRoot({
      validate
    }),
    DataBaseModule,
    UserModule,
    SessionTemplateModule,
    AuthModule],
  controllers: [],
  
  providers: [ 
    {
    provide: APP_GUARD,
    useClass: AuthGuard,
  }, 
 ] ,

 exports: [],
})

 

export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    // import middleware for routes
    consumer.apply(LoggerMiddleware).forRoutes('*');
    // consumer.apply(AuthenticationMiddleware).forRoutes('*');
  }

}
