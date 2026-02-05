import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '../../shared/base-repository.interface';
import { IUserPassword } from './userPassword.interface';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class UserPasswordRepository
  implements Partial<IBaseRepository<IUserPassword>>
{
  constructor(private readonly prismaService: PrismaService) {}

  async create(item: IUserPassword) {
    return await this.prismaService.userPassword.create({
      data: item,
    });
  }

  async findById(id: number): Promise<IUserPassword | null> {
    return await this.prismaService.userPassword.findUnique({
      where: { user_id: id },
    });
  }

  async update(id: number, item: IUserPassword): Promise<IUserPassword | null> {
    return await this.prismaService.userPassword.update({
      where: { user_id: id },
      data: item,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prismaService.userPassword.delete({
      where: { user_id: id },
    });
  }
}
