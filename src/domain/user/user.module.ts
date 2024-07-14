import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { DataBaseModule } from "src/database/database.module";
import { DatabaseService } from "src/database/database.service";


@Module({
    imports: [DataBaseModule],
    providers: [UserService, DatabaseService,],
    controllers: [UserController],
    
    exports: [UserService]
})

export class UserModule {}