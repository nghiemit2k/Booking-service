import { Module } from "@nestjs/common";
import { GoogleWebhookController } from "./google-webhook.controller";
import { DataBaseModule } from "apps/booking/src/database/database.module";
import { GoogleWebhookService } from "./google-webhook.service";
@Module({
    imports: [DataBaseModule],
    controllers: [GoogleWebhookController],
    providers: [GoogleWebhookService]
})
export class GoogleWebhookModule { }