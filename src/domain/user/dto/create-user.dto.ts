import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { EUserRole } from "src/common/interface";

export class CreateUserSto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
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