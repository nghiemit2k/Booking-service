import { Body, Controller, Get, Patch, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserSto } from "./dto/create-user.dto";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

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
    @Post('/register/')
    register(@Body() data: CreateUserSto) {
       return this.userService.register(data);
    }
    @Patch('users/:userId')
    updateUserInfo(){}
    @Patch('/users/:userId/update-password')
    updatePassword(){}



}
