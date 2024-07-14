// validate the environment variable: class-validator
// export environment variable

import { plainToInstance } from "class-transformer";
import { IsNotEmpty, IsOptional, validateSync } from "class-validator";

export class EnvironmentVariables{
    @IsOptional()
    APP_NAME?:string;

    @IsOptional()
    APP_PORT?: number;

    @IsNotEmpty()
    DATABASE_HOST: string;

    @IsNotEmpty()
    APP_KEY: string;

    @IsNotEmpty()
    DATABASE_PORT:number;

    @IsNotEmpty()
    DATABASE_USERNAME: string;

    @IsNotEmpty()
    DATABASE_PASSWORD: string;

    @IsNotEmpty()
    DATABASE_NAME: string;
    
    
}

export function validate(config: Record<string,unknown>) {
    const validateConfig = plainToInstance(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    })
    
    const errors = validateSync(validateConfig, {
        skipMissingProperties: false,
    })

    if(errors.length > 0) {
        throw new Error(errors.toString())
    }
    return validateConfig;
}
const config = {
    APP_NAME: process.env.APP_NAME || 'booking-service',
    APP_PORT: +process.env.APP_PORT || 3000,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_PORT: +process.env.DATABASE_PORT,
    DATABASE_USERNAME: process.env.DATABASE_USERNAME,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_NAME: process.env.DATABASE_NAME,
    APP_KEY: process.env.APP_KEY
}

export default config;