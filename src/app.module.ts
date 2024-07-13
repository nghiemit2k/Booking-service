import { Module, Session } from '@nestjs/common';
import { UserModule } from './domain/user/user.module';
import { SessionTemplateModule } from './domain/session-template/session-template.module';
import { AuthModule } from './domain/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './domain/guard/auth.guard';

import { DataBaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config';



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
  providers: [ {
    provide: APP_GUARD,
    useClass: AuthGuard,
  }, ] ,
})
export class AppModule {}
