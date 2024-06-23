import { Module, Session } from '@nestjs/common';
import { UserModule } from './domain/user/user.module';
import { SessionTemplateModule } from './domain/session-template/session-template.module';


@Module({
  imports: [UserModule,SessionTemplateModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
