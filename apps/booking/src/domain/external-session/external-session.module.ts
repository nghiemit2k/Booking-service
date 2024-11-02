import { Module } from "@nestjs/common";
import { ExternalSessionService } from "./external-session.service";
import { DataBaseModule } from "../../database/database.module";
@Module({
    imports: [DataBaseModule],
    providers: [ExternalSessionService],
    exports: [ExternalSessionService]
})
export class ExternalSessionModule { }