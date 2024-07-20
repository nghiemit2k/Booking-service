import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Validate } from "class-validator";
import { Match } from "src/common/decorator/match.decorator";
import { EUserRole } from "src/common/interface";
import * as dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
// import { IsEmailUnique } from "src/common/decorator/validate-unique-email.decorator";
// import { IsEmailUnique } from "src/common/decorator/validate-unique-email.decorator";


dayjs.extend(utc);
dayjs.extend(timezone);

export class CreateUserSto {

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    // @IsEmailUnique({ message: 'Email must be unique' })
    email: string;
    // TODO: must have a least 1 uppercase, 1 lowercase, 1 number, 1 special characters
    // option 2: regex
    @IsString()
    @IsNotEmpty()
    @Validate(passwordComplexity, {
        message: 'Password must have at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character'
    })
    password: string;

    @IsString()
    @IsNotEmpty()
    @Match('password',{message:'password not match'})
    password2: string; // confirm password
    @ApiProperty({
        description:"first name"
    })
    firstName: string;
    lastName: string;
// TODO: validate phone number: +841626262 valid, 843773783 invalid, 8412 7373 272 invalid
    @IsString()
    @IsOptional()
    phone?: string;

    // TODO: validate timezoneCode belongs timezone list of dayjs
    //https://stackoverflow.com/questions/73497382/how-to-get-timezone-name-list-using-dayjs
    @IsString()
    @IsOptional()
    timeZoneCode?: string;

    @IsEnum([EUserRole.client, EUserRole.coach])
    role: string;
}

function passwordComplexity(password: string): boolean {
    // Password must have at least 1 uppercase, 1 lowercase, 1 number, and 1 special character
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
}