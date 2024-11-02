import { Module } from "@nestjs/common";
import { CredentialController } from "./credential.controller";
import { CredentialService } from "./credential.service";
import { DataBaseModule } from "../../database/database.module";
import { GoogleCalendarModule } from "@libs/integrate";


@Module({
    imports: [DataBaseModule, GoogleCalendarModule],
    controllers: [CredentialController],
    providers: [CredentialService],
    exports: [CredentialService],

})

export class CredentialModule { }