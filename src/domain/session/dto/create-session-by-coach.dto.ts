import { IsISO8601, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSessionByCoachDto {
  // get coachId from token
  coachId?: number;

  @IsNumber()
  @IsNotEmpty()
  clientId: number;

  @IsNumber()
  @IsNotEmpty()
  sessionTemplateId: number;

  @IsISO8601({ strictSeparator: true })
  @IsNotEmpty()
  startAt: Date;
}