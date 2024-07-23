import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/sign-dto";
import { Public } from "../../common/decorator/public.decorator";

@Controller()
export class AuthController {
    constructor(private authService: AuthService){}
    @Public()
    @Post('auth/sign-in')
    signIn(@Body() data: SignInDto) {
       return this.authService.signIn(data.email, data.password);
    }
}