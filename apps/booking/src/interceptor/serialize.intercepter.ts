import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable,of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import _ from 'lodash';
@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    
    
    return next
      .handle()
      .pipe(
        switchMap((response) => {
            if(!response) return of(response);
            return of(this.formatResponse(response));
        })
      );
  }

  // hide password in data results
  formatResponse(response: any) {
    if(response instanceof Object){
        return {
            status: 200,
            message: 'Success',
            data: _.omit(response, 'password')
        }
    }
    return response;
  }
}