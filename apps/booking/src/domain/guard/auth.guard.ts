
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { JwtService } from '@nestjs/jwt';

  import { Request } from 'express';

import { DatabaseService } from '../../database/database.service';
import { IS_PUBLIC_KEY } from '../../common/decorator/public.decorator';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService,
        private dataBaseService: DatabaseService, private reflector: Reflector
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (isPublic) {
        // 💡 See this condition
        return true;
      }
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