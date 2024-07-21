import { Controller, Get, Query } from "@nestjs/common";
import { CredentialService } from "./credential.service";
import { Public } from "src/common/decorator/public.decorator";

@Controller('credentials')
export class CredentialController {
    constructor(private credentialsService: CredentialService){}

    @Get('google-auth-url')
    getGoogleAuthUrl() {
        return this.credentialsService.getGoogleAuthUrl();
    }

    @Public()
    @Get('google-auth-callback')
    handleGoogleCallback(@Query() query: any) {
        // handle google callback logic here
        console.log('google auth callback',query);

        return this.credentialsService.handleGoogleAuthCallback(query.code);
    }
}