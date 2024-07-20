import { Module } from '@nestjs/common';

import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { DataBaseModule } from 'src/database/database.module';

@Module({
  imports: [DataBaseModule],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {}