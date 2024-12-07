import { Injectable } from "@nestjs/common";
import { ServerClient } from "postmark";
@Injectable()
export class PostmarkService {
    private serverToken: string;
    private client: ServerClient;
    constructor() {
        this.serverToken = '24a71f29-77ee-4b6e-bd52-b10e6e576c7b'
        this.client = new ServerClient(this.serverToken);
    }
    sendEmail() {
        return this.client.sendEmail({
            "From": "nghiem.pham@aiquantsystem.com",
            "To": "nghiem.pham@aiquantsystem.com",
            "Subject": "Hello from Postmark",
            "HtmlBody": "<strong>Hello</strong> dear Postmark user.",
            "TextBody": "Hello from Postmark!",
            "MessageStream": "outbound"
        })
    }
}
