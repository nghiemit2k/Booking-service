import { BadRequestException, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { google } from "googleapis";
import { v4 as uuidv4 } from 'uuid';
import config from "../../config";
import { DatabaseService } from "../../database/database.service";
import { BaseService } from "../../common/service/base.service";
import { EventGoogle } from "../../common/interface/google-calendar.interface";
import { GoogleCalendarService } from "@libs/integrate/google-calendar/google-calendar.service";

const oauth2Client = new google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: 'http://localhost:3300/api/credentials/google-auth-callback'

})


@Injectable()
export class CredentialService extends BaseService<
    Prisma.CredentialUncheckedCreateInput,
    Prisma.CredentialUpdateInput
> {
    private address: string
    constructor(databaseService: DatabaseService,
        private googleCalendarService: GoogleCalendarService

    ) {
        super(databaseService, 'credential');
        this.address = 'https://fd17-2001-ee0-5195-620-d4d3-9c54-21b1-b524.ngrok-free.app/google/watch'
    }


    async handleGoogleAuthCallback(code: string) {
        try {
            const { tokens } = await oauth2Client.getToken(code);
            console.log('🚀 ~ CredentialService ~ handleGoogleAuthCallback ~ tokens:', tokens);
            const { refresh_token: refreshToken } = tokens;
            // get sync token
            const syncToken = await this.googleCalendarService.getSyncToken(refreshToken);

            // gg tra ve redirectul chu ko tra ve db
            // store token to database
            const newCredential = await this.create({
                // TODO: replace hardcoded userId
                userId: 1, // replace with actual user id
                integrationType: 'google',
                token: tokens.refresh_token,
                syncToken,
                data: JSON.stringify(tokens)
            })
            // register webhook
            await this.googleCalendarService.createWebhookChannel(tokens.refresh_token, {
                id: uuidv4(),
                token: `token.${newCredential.id}`,
                address: this.address
            })
            console.log('🚀 ~ CredentialService ~ handleGoogleAuthCallback ~ newCredential:', newCredential);
            return tokens;
        } catch (error) {
            console.log('Error:', error);
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
        oauth2Client.setCredentials({ refresh_token: token });
        const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

        const response = await calendar.events.insert({
            calendarId: 'primary',
            requestBody: data
        })
        return response.data;
    }


    findOneByUserId(userId: number, integrationType: string) {
        return this.databaseService.credential.findFirst({
            where: { userId, integrationType }
        })
    }
}