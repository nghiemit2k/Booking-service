import { Controller, Get, Query } from "@nestjs/common";
import { CredentialService } from "./credential.service";
import { Public } from "../../common/decorator/public.decorator";
import { UserReq } from "../../common/decorator/user.decorator";
import { User } from "@prisma/client";
import { GoogleCalendarService } from "@libs/integrate";


@Controller('credentials')
export class CredentialController {
    constructor(private credentialsService: CredentialService,
        private googleCalendarService: GoogleCalendarService
    ) { }

    @Get('google-auth-url')
    getGoogleAuthUrl() {
        return this.googleCalendarService.getGoogleAuthUrl();
    }

    @Public()
    @Get('google-auth-callback')
    handleGoogleCallback(@Query() query: any) {
        console.log('🚀 ~ CredentialController ~ handleGoogleCallback ~ query:', query);
        return this.credentialsService.handleGoogleAuthCallback(query.code);

    }

    // @Get('/google-events')
    // getListEvents(@UserReq() user: User) {
    //     return this.credentialsService.getListEvents(user.id);
    // }

}