import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { TokenService } from '../models/token/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private reflector: Reflector,
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException({ message: 'Unauthorized' });
    }

    try {
      const user = this.tokenService.verifyAccessToken(token);
      request['user'] = user;

      return true;
    } catch (err) {
      console.error(err);

      throw new UnauthorizedException({ message: 'Unauthorized' });
    }
  }
}
