import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RequestWithUser } from '../shared/interfaces/request.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly roles: string[];

  constructor(roles: string[]) {
    this.roles = roles;
  }

  canActivate(context: ExecutionContext): boolean {
    if (this.roles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    return user && this.roles.includes(user.role);
  }
}
