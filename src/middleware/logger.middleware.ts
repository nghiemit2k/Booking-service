import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const xForwardedFor = req.headers['x-forwarded-for'];
    const ipAddress = Array.isArray(xForwardedFor) ? xForwardedFor[0] : xForwardedFor || req.ip;
    console.log(`Request: ${req.method} ${req.originalUrl} from ${ipAddress}`); 
    next();
  }
}
