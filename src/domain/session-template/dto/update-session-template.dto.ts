import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";

export class UpdateSessionTemplateDto {
    @ApiProperty({
        type: String,
        required: true,
        description: "The name of the session template",
        example: "Session Template 1"
    })
    @MaxLength(50)
    @MinLength(5)
    @IsString()
    @IsOptional()
    
    name?: string;

    @IsOptional()
    @IsNumber()
    @Min(5)

    @ApiProperty({
        type: String,
        required: true,
        description: "The duration of the session template",
        example: 30
    })
    duration?: number;
}