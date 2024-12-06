import { Inject, Injectable } from "@nestjs/common";
import { calendar_v3, google } from "googleapis";
import { GOOGLE_CALENDAR_CONFIG } from "./google-calendar.config";
import { googleCalendarConfig } from "./google-calendar.config";
//TODO: implement config for google calendar module

@Injectable()
export class GoogleCalendarService {
    private oauth2Client: any;
    constructor(@Inject(GOOGLE_CALENDAR_CONFIG) config: googleCalendarConfig) {
        this.oauth2Client = new google.auth.OAuth2({
            clientId: config.clientId,
            clientSecret: config.clientSecret,
            redirectUri: config.redirectUri
        })
    }
    getGoogleAuthUrl(): { authUrl: string } {
        const authUrl = this.oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: ['https://www.googleapis.com/auth/calendar.events.owned'],
            prompt: 'consent'
        })
        return {
            authUrl
        };
    }
    createWebhookChannel(refreshToken: string, {
        id, token, address }: { id: string, token: string, address: string },
    ) {
        this.oauth2Client.setCredentials({ refresh_token: refreshToken });

        const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
        console.log('🚀 ~ GoogleCalendarService ~ createWebhookChannel ~ calendar:', calendar);
        return calendar.events.watch({
            calendarId: 'primary',
            requestBody: {
                id,
                token,
                type: 'webhook',
                address
            }
        })
    }

    getListEvents(refreshToken: string) {
        this.oauth2Client.setCredentials({ refresh_token: refreshToken });
        const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
        return calendar.events.list({
            calendarId: 'primary',
            // singleEvents: true,
            maxResults: 2500,
        })
    }
    async getSyncToken(refreshToken: string) {
        // do while
        const { data } = await this.getListEvents(refreshToken);
        const syncToken = data.nextSyncToken;
        if (!syncToken) {
            throw new Error('Sync token not found');
        }
        return syncToken;
    }

    async createEvent(refreshToken: string, data: calendar_v3.Schema$Event) {

        this.oauth2Client.setCredentials({ refresh_token: refreshToken });
        const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });

        const response = await calendar.events.insert({
            calendarId: 'primary',
            requestBody: data
        })
        return response.data;
    }
    getSyncedEvents(refreshToken: string, syncToken: string) {
        this.oauth2Client.setCredentials({ refresh_token: refreshToken });
        const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
        return calendar.events.list({
            calendarId: 'primary',
            syncToken,
            maxResults: 2500,
        })
    }
}

// 44 phut