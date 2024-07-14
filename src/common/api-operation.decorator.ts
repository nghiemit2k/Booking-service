import { ApiBadRequestResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse, ApiUnprocessableEntityResponse } from "@nestjs/swagger";
import {applyDecorators} from '@nestjs/common'

interface ApiOperatorOptions{
    type: any,
    summary: string,
    description: string,
    
}
export function ApiOperationDecorator({type,summary,description}: ApiOperatorOptions ){
    return applyDecorators(
        ApiOperation({summary}),

        ApiOkResponse({type, description}),
        ApiUnauthorizedResponse({description: 'Token is valid'}), //401
        ApiForbiddenResponse({description: 'Do not have permissions'}), //403
        ApiBadRequestResponse({description: 'Invalid data'}), //400
        ApiUnprocessableEntityResponse({description: 'Invalid entity'}), // 422
        ApiInternalServerErrorResponse({description:'Internal server error, Please try again'})
    );
  }