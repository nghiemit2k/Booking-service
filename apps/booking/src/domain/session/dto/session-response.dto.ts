import { ApiProperty } from '@nestjs/swagger';

export class SessionResponseDto {
  @ApiProperty({
    type: Number,
    required: true,
    description: 'The id of the session template',
    example: 1,
  })
  id: number;

  @ApiProperty({
    type: String,
    required: true,
    description: 'The name of the session template',
    example: 'Session Template 1',
  })
  name: string;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'The duration of the session template in minutes',
    example: 30,
  })
  duration: number;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'Session template status',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    type: String,
    required: true,
    description: 'The date and time the session template was created',
    example: '2021-09-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    type: String,
    required: true,
    description: 'The date and time the session template was updated',
    example: '2021-09-01T00:00:00.000Z',
  })
  updatedAt: Date;
}