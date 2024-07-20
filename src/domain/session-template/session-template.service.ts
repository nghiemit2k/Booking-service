import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { BaseService } from "src/common/service/base.service";
import { DatabaseService } from "src/database/database.service";


@Injectable()
export class SessionTemplateService extends BaseService<
Prisma.SessionTemplateCreateInput,
Prisma.SessionTemplateUpdateInput>
    {
        constructor(databaseService: DatabaseService) {
            super(databaseService, 'sessionTemplate');
        }
}