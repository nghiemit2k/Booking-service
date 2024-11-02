import { Injectable } from "@nestjs/common";
import { google } from "googleapis";
//TODO: implement config for google calendar module
const oauth2Client = new google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: 'http://localhost:3300/api/credentials/google-auth-callback'

})

@Injectable()
export class GoogleCalendarService {
    getGoogleAuthUrl(): { authUrl: string } {
        const authUrl = oauth2Client.generateAuthUrl({
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
        oauth2Client.setCredentials({ refresh_token: refreshToken });

        const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
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
        oauth2Client.setCredentials({ refresh_token: refreshToken });
        const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
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

}

// 44 phut