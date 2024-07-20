import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateSessionTemplateDto} from "./dto/create-session-template.dto";
import { UpdateSessionTemplateDto} from "./dto/update-session-template.dto";
import { ApiBadRequestResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse, ApiUnprocessableEntityResponse } from "@nestjs/swagger";
import { SessionTemplateResponDto } from "./dto/Session-template-response.dto";
import { ApiOperationDecorator } from "src/common/api-operation.decorator";
import { SessionTemplateService } from "./session-template.service";


@ApiTags('SessionTemplate')
@Controller('session-templates')
export class SessionTemplateController {
    constructor(private service: SessionTemplateService){}

    @ApiOperationDecorator({
        type: SessionTemplateResponDto,
        summary: 'Get a  session template',
        description: 'Get a new session template'
    })

    @Get(':sessionTemplateId')
    findById(@Param('sessionTemplateId') sessionTemplateId:string){
        const id = parseInt(sessionTemplateId, 10);
        return this.service.findById(id);
    }

    @ApiOperationDecorator({
        type: SessionTemplateResponDto,
        summary: 'Create a new session template',
        description: 'Create a new session template'
    })

    @Post()
    create(@Body() data: CreateSessionTemplateDto) {
        return this.service.create(data);
    }
    
    @ApiOperationDecorator({
        type: SessionTemplateResponDto,
        summary: 'Update session template',
        description: 'Update a new session template'
    })

    @Patch(':sessionTemplateId')
    updateById(@Param('sessionTemplateId') sessionTemplateId: string, @Body() data: UpdateSessionTemplateDto) {
        const id = parseInt(sessionTemplateId, 10);
        return this.service.updateById(id, data);
    }
    
    @Delete(':sessionTemplateId')
    deleteById(@Param('sessionTemplateId') sessionTemplateId: string) {
        const id = parseInt(sessionTemplateId, 10);
        return this.service.deleteById(id);
    }
    
    @Get()
    getAllSessionTemplates() {
        return this.service.findMany();
    }
}