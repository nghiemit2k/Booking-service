import { Controller, Get, Post, Headers, Body } from "@nestjs/common";

@Controller()
export class AppController {

    @Post('/google/watch')
    handleWebhook(@Headers() headers: any, @Body() body: any) {
        console.log('🚀 ~ AppController ~ handleWebhook ~ body:', body);
        console.log('🚀 ~ AppController ~ handleWebhook ~ headers:', headers);
    }
}