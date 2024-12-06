import { Controller, Get, Post, Headers, Body } from "@nestjs/common";
import { GoogleWebhookService } from "./google-webhook.service";

@Controller()
export class GoogleWebhookController {
    constructor(private readonly googleWebhookService: GoogleWebhookService) { }
    @Post('/google/watch')
    handleWebhook(@Headers() headers: any) {

        const googleChannelToken = headers['x-goog-channel-token'];
        const credentialId = googleChannelToken.split('.')[1];
        if (!credentialId) {
            return;
        }
        this.googleWebhookService.handle(credentialId);
    }
}