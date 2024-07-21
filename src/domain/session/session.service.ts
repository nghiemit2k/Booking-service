import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BaseService } from 'src/common/service/base.service';
import { DatabaseService } from 'src/database/database.service';
import { CredentialService } from '../credential/credential.service';
import { CreateSessionByCoachDto } from './dto/create-session-by-coach.dto';
import dayjs from 'dayjs';

@Injectable()
export class SessionService extends BaseService<
  Prisma.SessionCreateInput,
  Prisma.SessionUpdateInput
> {
  constructor(databaseService: DatabaseService,
    private credentialsService:CredentialService
  ) {
    super(databaseService, 'session');
  }

  async createSession(data: CreateSessionByCoachDto) {
      const newSession = await this.create(data)

      // TODO: extract information from database
      await this.credentialsService.createGoogleEvent(data.coachId,{
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
        attendees:[] //coach, client
      })
      return newSession;
  }
}