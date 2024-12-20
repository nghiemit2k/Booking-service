import { Body, Controller, Get, Patch, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserSto } from "./dto/create-user.dto";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import { UserReq } from "../../common/decorator/user.decorator";
import { User } from "@prisma/client";
import { Public } from "../../common/decorator/public.decorator";
import { SerializeInterceptor } from "../../interceptor/serialize.intercepter";


@ApiTags('User')
@Controller()
export class UserController {
    constructor(private userService: UserService) {
    }

    @Get('/users/')
    findMany() {
        return this.userService.findMany();
    }

    @ApiOperation({
        summary: "Register a new user",
    })
    @ApiBadRequestResponse({ description: "Validation error" })
    @ApiCreatedResponse({ description: " User created successfully" })
    @Public()

    @Post('/register/')
    register(@Body() data: CreateUserSto) {
        return this.userService.register(data);
    }

    // @Patch('users/:userId')
    // updateUserInfo(){}

    @Patch('/users/:userId/update-password')
    updatePassword() { }

    // @UseGuards(AuthGuard)
    @UseInterceptors(SerializeInterceptor)
    @Get('/users/me')
    getMe(@UserReq() user: User) {
        return user;
    }

    //TODO: implement API update user info
    @Patch('/users/me')
    updateUserInfo() {
        // const userId
        // update userinfo of the userId
    }
    // TODO: implement API update user password

    @Patch('/users/me/update-password')
    updateUserPassword() {
        // const userId
        // update user password of the userId
    }

    // @Post('/users/')
    // findUserByEmail(email: string){
    //     return this.userService.findByEmail(email);
    // }
}
