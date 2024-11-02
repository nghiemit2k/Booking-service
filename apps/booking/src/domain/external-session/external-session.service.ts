import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { BaseService } from "../../common/service/base.service";
import { DatabaseService } from "../../database/database.service";

@Injectable()
export class ExternalSessionService extends BaseService<Prisma.ExternalSessionUncheckedCreateInput,
    Prisma.ExternalSessionUpdateInput
> {
    constructor(databaseService: DatabaseService) {
        super(databaseService, 'externalSession')
    }
}