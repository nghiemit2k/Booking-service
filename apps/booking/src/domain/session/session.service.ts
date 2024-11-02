import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CredentialService } from '../credential/credential.service';
import { CreateSessionByCoachDto } from './dto/create-session-by-coach.dto';
import dayjs from 'dayjs';
import { BaseService } from '../../common/service/base.service';
import { DatabaseService } from '../../database/database.service';
import { ExternalSessionService } from '../external-session/external-session.service';

@Injectable()
export class SessionService extends BaseService<
  Prisma.SessionCreateInput,
  Prisma.SessionUpdateInput
> {
  constructor(databaseService: DatabaseService,
    private credentialsService: CredentialService,
    private externalSessionService: ExternalSessionService
  ) {
    super(databaseService, 'session');
  }

  async createSession(data: CreateSessionByCoachDto) {
    const newSession = await this.create(data)
    const foundCredential = await this.credentialsService.findOneByUserId(data.coachId, 'google')
    if (!foundCredential) {
      return newSession;
    }

    // TODO: extract information from database
    const googleEvent = await this.credentialsService.createGoogleEvent(data.coachId, {
      summary: 'Title', // extract from session template
      description: 'description', // extract from session template
      start: {
        dateTime: dayjs(newSession.startAt).format(),
        timeZone: 'Asia/Bangkok',
      },
      end: {

        dateTime: dayjs(newSession.startAt).add(1, 'hour').format(),
        timeZone: 'Asia/Bangkok'
      },
      attendees: [] //coach, client
    })
    await this.externalSessionService.create({
      calendarType: 'google',
      sessionId: newSession.id,
      externalSessionId: googleEvent.id
    })

    return newSession;
  }
}