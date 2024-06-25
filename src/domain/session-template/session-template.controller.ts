import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateSessionTemplateDto} from "../user/dto/create-session-template.dto";
import { UpdateSessionTemplateDto} from "../user/dto/update-session-template.dto";
import { ApiBadRequestResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse, ApiUnprocessableEntityResponse } from "@nestjs/swagger";
import { SessionTemplateResponDto } from "../user/dto/Session-template-response.dto";
import { ApiOperationDecorator } from "src/common/api-operation.decorator";


@ApiTags('SessionTemplate')
@Controller('session-templates')
export class SessionTemplateController {
    constructor(){}
    @ApiOperationDecorator({
        type: SessionTemplateResponDto,
        summary: 'Get a  session template',
        description: 'Get a new session template'
    })
    @Get(':sessionTemplateId')
    findById(){

    }
    @ApiOperationDecorator({
        type: SessionTemplateResponDto,
        summary: 'Create a new session template',
        description: 'Create a new session template'
    })

    @Post()
    create(@Body() data: CreateSessionTemplateDto) {
        console.log(data);
    }
    
    @ApiOperationDecorator({
        type: SessionTemplateResponDto,
        summary: 'Update session template',
        description: 'Update a new session template'
    })

    @Patch(':sessionTemplateId')
    updateById(@Param('sessionTemplateId') sessionTemplateId: number, @Body() data: UpdateSessionTemplateDto) {
        console.log(sessionTemplateId,data);
    }
}