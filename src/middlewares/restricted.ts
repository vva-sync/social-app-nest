import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { TokenService } from '../models/token/token.service';

@Injectable()
export class Restricted implements NestMiddleware {
  constructor(private readonly tokenService: TokenService) { }

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      this.tokenService.verifyAccessToken(token);

      next();
    } catch (error) {
      throw new UnauthorizedException({ message: 'Unauthorized' });
    }
  }
}
