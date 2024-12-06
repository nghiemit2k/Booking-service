import { Global, Module } from "@nestjs/common";
import { CredentialController } from "./credential.controller";
import { CredentialService } from "./credential.service";
import { DataBaseModule } from "../../database/database.module";

@Global()
@Module({
    imports: [DataBaseModule],
    controllers: [CredentialController],
    providers: [CredentialService],
    exports: [CredentialService],

})

export class CredentialModule { }