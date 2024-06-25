import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserSto } from "./dto/create-user.dto";

@Controller()
export class UserController {
    constructor(private userService: UserService){}
    @Post('/register/')
    register(@Body() data: CreateUserSto) {
        this.userService.register(data);
    }
}