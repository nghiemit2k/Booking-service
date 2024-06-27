import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { DataBaseModule } from "src/database/database.module";

@Module({
    providers: [UserService],
    controllers: [UserController],
    imports: [DataBaseModule]
})

export class UserModule {}