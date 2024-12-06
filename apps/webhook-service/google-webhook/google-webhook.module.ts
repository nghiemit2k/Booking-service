import { Module } from "@nestjs/common";
import { GoogleWebhookController } from "./google-webhook.controller";
import { DataBaseModule } from "apps/booking/src/database/database.module";
import { GoogleWebhookService } from "./google-webhook.service";
import { GoogleCalendarModule } from "libs/integrate/src/google-calendar/google-calendar.module";
@Module({
    imports: [DataBaseModule, GoogleCalendarModule],
    controllers: [GoogleWebhookController],
    providers: [GoogleWebhookService]
})
export class GoogleWebhookModule { }