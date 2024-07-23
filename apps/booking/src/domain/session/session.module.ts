import { Module } from '@nestjs/common';

import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { CredentialModule } from '../credential/credential.module';
import { DataBaseModule } from '../../database/database.module';

@Module({
  imports: [DataBaseModule,CredentialModule],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {}