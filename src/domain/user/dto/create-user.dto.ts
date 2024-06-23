import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { EUserRole } from "src/common/interface";

export class CreateUserSto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;
    password: string;
    password2: string;
    firstName: string;
    lastName: string;
    @IsString()
    @IsOptional()
    phone?: string;
    timeZoneCode: string;
    @IsEnum([EUserRole.client, EUserRole.coach])
    role: string;
}