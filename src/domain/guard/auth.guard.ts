
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { DatabaseService } from 'src/database/database.service';
  import { Request } from 'express';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService,
        private dataBaseService: DatabaseService
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
     
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
    
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: 'my-secret-key'
          }
        );
     
        const user = await this.dataBaseService.user.findUnique({where: {id: payload.sub},})
      
        request['user'] = user;
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }