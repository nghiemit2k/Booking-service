import { Body, Controller, Get, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserSto } from "./dto/create-user.dto";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Public } from "src/common/decorator/public.decorator";
import { UserReq } from "src/common/decorator/user.decorator";
import { User } from "@prisma/client";

@ApiTags('User')
@Controller()
export class UserController {
    constructor(private userService: UserService){}

    @Get('/users/')
    findMany() {
        return this.userService.findMany();
    }
    @ApiOperation({
        summary: "Register a new user",
    })
    @ApiBadRequestResponse({description:"Validation error"})
    @ApiCreatedResponse({description:" User created successfully"})
    @Public()
    @Post('/register/')
    register(@Body() data: CreateUserSto) {
       return this.userService.register(data);
    }
    @Patch('users/:userId')
    updateUserInfo(){}
    @Patch('/users/:userId/update-password')
    updatePassword(){}

    // @UseGuards(AuthGuard)
    @Get('/users/me')
    getMe(@UserReq() user: User) {
  
        return user;
    }


}
