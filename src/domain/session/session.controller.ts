import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SessionResponseDto } from './dto/session-response.dto';
import { CreateSessionByCoachDto } from './dto/create-session-by-coach.dto';
import { UserReq } from 'src/common/decorator/user.decorator';
import { User } from '@prisma/client';
import { SessionService } from './session.service';
import { ApiOperationDecorator } from 'src/common/api-operation.decorator';

// TODO: will be removed

@ApiTags('Session')
@Controller('sessions')
export class SessionController {
  constructor(private service: SessionService) {}

  @ApiOperationDecorator({
    type: SessionResponseDto,
    summary: 'Get a session template',
    description: 'Get a session template',
  })
  @Get(':sessionTemplateId')
  findById(@Param('sessionTemplateId') sessionTemplateId: string) {
    const id = parseInt(sessionTemplateId, 10);
    return this.service.findById(id);
  }

  // TODO: validate coach/client
  @ApiOperationDecorator({
    type: CreateSessionByCoachDto,
    summary: 'Create a new session template',
    description: 'Create a new session template',
  })

  @Post('by-coach')
  create(@Body() data: CreateSessionByCoachDto, @UserReq() user: User) {
    data.coachId = user.id;
    return this.service.createSession(data);
  }
}