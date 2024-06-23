import { ApiProperty } from "@nestjs/swagger";

export class SessionTemplateResponDto {
    @ApiProperty({
        type: Number,
        required: true,
        description: 'the id of the session template',
        example: 1
    })
    id: number;
    @ApiProperty({
        type: String,
        required: true,
        description: 'The name of the session template',
        example: 'session template 1'
    })
    name: String;
    @ApiProperty({
        type: Number,
        required: true,
        description: 'The duration of the session template in minutes',
        example: 30
    })
    duration: number;
    @ApiProperty({
        type: Number,
        required: true,
        description: 'Session template status',
        example: true
    })
    isActive: boolean;
    @ApiProperty({
        type: String,
        required: true,
        description: 'The date and time the session was created',
        example: "2021-09-01"
    })
    createdAt: Date;
    @ApiProperty({
        type: String,
        required: true,
        description: 'The date and time the session was updated',
        example: "2021-09-01"
    })
    updatedAt: Date;
}