import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { RoleType } from '../../../generated/prisma/enums';

@Injectable()
export class UserRoleRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(id: number, role: RoleType): Promise<void> {
    await this.prismaService.role.create({
      data: {
        user_id: id,
        role,
      },
    });
  }
}
