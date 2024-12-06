import { Injectable } from "@nestjs/common";
import { DatabaseService } from "apps/booking/src/database/database.service";
import { GoogleCalendarService } from "libs/integrate/src/google-calendar/google-calendar.service";
@Injectable()
export class GoogleWebhookService {
    constructor(private readonly databaseService: DatabaseService,
        private readonly googleCalendarService: GoogleCalendarService
    ) { }

    async handle(credentialId: number) {
        console.log('🚀 ~ GoogleWebhookService ~ handle ~ credentialId:', credentialId);
        const foundCredential = await this.databaseService.credential.findFirst({
            where: {
                id: credentialId
            }
        })
        if (!foundCredential) {
            return;
        }
        const syncToken = foundCredential.syncToken;
        const syncedeventResponse = await this.googleCalendarService.getSyncedEvents(foundCredential.token, syncToken);
        const syncedEvents = syncedeventResponse.data.items;
        const syncedEventIds = syncedEvents.map((event) => event.id) as string[];
        const externalSession = await this.databaseService.externalSession.findMany({
            where: {
                externalSessionId: { in: syncedEventIds }
            }
        })
        console.log('🚀 ~ GoogleWebhookService ~ handle ~ externalSession:', externalSession);
    }

}