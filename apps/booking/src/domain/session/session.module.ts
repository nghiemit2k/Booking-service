import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { CredentialModule } from '../credential/credential.module';
import { DataBaseModule } from '../../database/database.module';
import { ExternalSessionModule } from '../external-session/external-session.module';
//TODO: should import library globally
@Module({
  imports: [DataBaseModule, CredentialModule, ExternalSessionModule, ScheduleModule.forRoot()],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule { }