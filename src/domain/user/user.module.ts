import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { DataBaseModule } from "src/database/database.module";

@Module({
    imports: [DataBaseModule],
    providers: [UserService],
    controllers: [UserController],
    
    exports: [UserService]
})

export class UserModule {}