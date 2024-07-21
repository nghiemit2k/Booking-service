import { BadRequestException, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { google } from "googleapis";
import { EventGoogle } from "src/common/interface/google-calendar.interface";
import { BaseService } from "src/common/service/base.service";
import config from "src/config";
import { DatabaseService } from "src/database/database.service";

const oauth2Client = new google.auth.OAuth2({
    clientId: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    redirectUri: 'http://localhost:3300/api/credentials/google-auth-callback'
    
})

@Injectable()
export class CredentialService extends BaseService<
Prisma.CredentialUncheckedCreateInput,
Prisma.CredentialUpdateInput
> 

{
    constructor(protected databaseService: DatabaseService) {
        super(databaseService, 'credential');
    }

    getGoogleAuthUrl(): {authUrl: string} {
        const authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: ['https://www.googleapis.com/auth/calendar.events.owned']
        })
        return {
            authUrl
        };
    }

    async handleGoogleAuthCallback(code: string) {
       try {
        const { tokens } = await oauth2Client.getToken(code);
       // gg tra ve redirectul chu ko tra ve db
        // store token to database
        await this.create({
            // TODO: replace hardcoded userId
            userId: 2, // replace with actual user id
            integrationType:'google',
            token: tokens.refresh_token,
            data: JSON.stringify(tokens)
        })

        return tokens;
       } catch (error) {
        throw new BadRequestException('Authorization is invalid')
       }
    }

    async createGoogleEvent(userId: number, data: EventGoogle) {
        const credential = await this.databaseService.credential.findFirst({
            where: {
                userId,
                integrationType: 'google'
            }
        });
        if (!credential) {
            throw new BadRequestException('No Google credentials found for this user');
        }
        const { token } = credential;
        oauth2Client.setCredentials({refresh_token: token});
        const calendar = google.calendar({version: 'v3', auth: oauth2Client});

        const response = await calendar.events.insert({
            calendarId: 'primary',
            requestBody: data
        })
        return response.data;
    }
}