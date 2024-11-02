import { Module } from '@nestjs/common';

import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { CredentialModule } from '../credential/credential.module';
import { DataBaseModule } from '../../database/database.module';
import { GoogleCalendarModule } from '@libs/integrate';
import { ExternalSessionModule } from '../external-session/external-session.module';
//TODO: should import library globally
@Module({
  imports: [DataBaseModule, CredentialModule, GoogleCalendarModule, ExternalSessionModule],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule { }