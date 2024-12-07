import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SessionResponseDto } from './dto/session-response.dto';
import { CreateSessionByCoachDto } from './dto/create-session-by-coach.dto';
import { UserReq } from '../../common/decorator/user.decorator';
import { User } from '@prisma/client';
import { SessionService } from './session.service';
import { ApiOperationDecorator } from '../../common/api-operation.decorator';
import { PostmarkService } from '@libs/integrate/postmark/postmark.service';
import { Cron } from '@nestjs/schedule';

// TODO: will be removed

@ApiTags('Session')
@Controller('sessions')
export class SessionController {
  constructor(
    private service: SessionService,
    private postmarkService: PostmarkService
  ) { }

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

  // send email at 7:00 Monday every week
  @Cron('0 0 7 * * 1')
  @Post('send-email')
  sendEmail() {

    return this.postmarkService.sendEmail();
  }
}