import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BaseService } from 'src/common/service/base.service';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SessionService extends BaseService<
  Prisma.SessionCreateInput,
  Prisma.SessionUpdateInput
> {
  constructor(databaseService: DatabaseService) {
    super(databaseService, 'session');
  }
}