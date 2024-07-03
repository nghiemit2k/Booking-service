import { Module } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { UserModule } from "../user/user.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";


@Module({
    imports: [ UserModule, JwtModule.register({
        global: true,
        secret: "my-secret-key",
        signOptions: { expiresIn: "1d" },
    })],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule{}