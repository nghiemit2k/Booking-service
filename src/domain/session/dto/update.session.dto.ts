import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateSessionDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'The name of the session template',
    example: 'Session Template 1',
  })
  @MaxLength(50)
  @MinLength(5)
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'The duration of the session template in minutes',
    example: 30,
  })
  @Min(5)
  @IsNumber()
  @IsOptional()
  duration?: number;
}