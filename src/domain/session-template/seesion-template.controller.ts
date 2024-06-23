import { Body, Controller, Param, Patch, Post } from "@nestjs/common";
import { CreateSessionTemplateDto } from "../user/dto/create-session-template.dto";
import { ApiBadRequestResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse, ApiUnprocessableEntityResponse } from "@nestjs/swagger";
import { SessionTemplateResponDto } from "../user/dto/Session-template-response.dto";


@ApiTags('SessionTemplate')
@Controller('session-templates')
export class SessionTemplateController {
    constructor(){}
    @ApiOperation({summary: 'Create a new session template'})
    @ApiOkResponse({type: SessionTemplateResponDto,
        description: 'The session template that was created'
    })
    @ApiUnauthorizedResponse({description: 'Token is valid'}) //401
    @ApiForbiddenResponse({description: 'Do not have permissions'}) //403
    @ApiBadRequestResponse({description: 'Invalid data'}) //400
    @ApiUnprocessableEntityResponse({description: 'Invalid entity'}) // 422
    @ApiInternalServerErrorResponse({description:'Internal server error, Please try again'})
    @Post()
    create(@Body() data: CreateSessionTemplateDto) {
        console.log(data);
    }
    @Patch(':sessionTemplateId')
    updateById(@Param('sessionTemplateId') sessionTemplateId: number) {
        console.log(sessionTemplateId);
    }
}