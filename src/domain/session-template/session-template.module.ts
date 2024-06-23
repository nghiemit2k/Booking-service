import { Module } from "@nestjs/common";
import { SessionTemplateController } from "./seesion-template.controller";

@Module({
    controllers: [SessionTemplateController]
})
export class SessionTemplateModule{}