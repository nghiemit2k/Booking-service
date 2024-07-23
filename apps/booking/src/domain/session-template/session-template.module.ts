import { Module } from "@nestjs/common";
import { SessionTemplateController } from "./session-template.controller";
import { SessionTemplateService } from "./session-template.service";
import { DataBaseModule } from "../../database/database.module";


@Module({
    imports: [DataBaseModule],
    exports: [SessionTemplateService],
    controllers: [SessionTemplateController],
    providers: [SessionTemplateService]
})
export class SessionTemplateModule{}