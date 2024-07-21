import { Module } from '@nestjs/common';

import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { DataBaseModule } from 'src/database/database.module';
import { CredentialModule } from '../credential/credential.module';

@Module({
  imports: [DataBaseModule,CredentialModule],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {}