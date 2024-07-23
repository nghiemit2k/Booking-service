import {
    Injectable,
    NestMiddleware,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Request, Response, NextFunction } from 'express';
  import _ from 'lodash';
  import config from '../config';
  
  // NOTES: alternative approach to AuthGuard
  @Injectable()
  export class AuthenticationMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
      // authenticate using token
      const token = (_.chain(req)
        .get('headers.authorization')
        .split(' ')
        .last()
        .value() || _.chain(req).get('query.token').value()) as string;
  
      const key = (_.chain(req).get('headers.key').value() ||
        _.chain(req).get('query.key').value()) as string;
  
      // authentication using key
      if (key && key === config.APP_KEY) return next();
  
      if (!token) throw new UnauthorizedException('Token or key is required');
  
      try {
      } catch (error) {
        throw new UnauthorizedException('Token is invalid');
      }
    }
  }