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
import { SessionModule } from './domain/session/session.module';
import { CredentialModule } from './domain/credential/credential.module';
import { GoogleCalendarModule } from '@libs/integrate';
import config from './config';
@Module({
  imports: [
    ConfigModule.forRoot({
      validate
    }),
    DataBaseModule,
    UserModule,
    SessionModule,
    SessionTemplateModule,
    CredentialModule,
    AuthModule,
    GoogleCalendarModule.forRoot({
      clientId: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      redirectUri: 'http://localhost:3300/api/credentials/google-auth-callback'
    })],
  controllers: [],

  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],

  exports: [],
})



export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // import middleware for routes
    consumer.apply(LoggerMiddleware).forRoutes('*');
    // consumer.apply(AuthenticationMiddleware).forRoutes('*');
  }

}
