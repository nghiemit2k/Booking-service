
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import  config  from '../config';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  constructor() {
    const databaseUrl =`postgresql://${config.DATABASE_USERNAME}:${config.DATABASE_PASSWORD}@${config.DATABASE_HOST}:${config.DATABASE_PORT}/${config.DATABASE_NAME}?schema=public`
    super({
      datasources: {
        db: {
          url: databaseUrl,
        },
      },
    })
  }
  async onModuleInit() {
    await this.$connect();
  }
}

// # DATABASE_URL="postgresql://postgres:123456@localhost:5432/booking?schema=public"