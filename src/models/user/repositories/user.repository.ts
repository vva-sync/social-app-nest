import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateUserDto } from '../dto/user.dto';
import { IUser, IUserRepository } from './user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    data: CreateUserDto | Omit<CreateUserDto, 'password'>,
  ): Promise<IUser> {
    const user = await this.prismaService.user.create({
      data,
    });

    return user;
  }
  async findById(id: number): Promise<IUser> {
    return await this.prismaService.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async delete(id: number) {
    return await this.prismaService.user.delete({ where: { id } });
  }

  async update(id: number, data: Partial<IUser>): Promise<IUser> {
    return await this.prismaService.user.update({
      where: { id },
      data,
    });
  }

  async findAll(offset?: number, limit?: number): Promise<IUser[]> {
    return await this.prismaService.user.findMany({
      skip: offset,
      take: limit,
    });
  }

  async search(
    search: string,
    offset: number,
    limit: number,
  ): Promise<IUser[]> {
    return await this.prismaService.user.findMany({
      where: {
        OR: [
          { username: { contains: search } },
          { first_name: { contains: search } },
          { last_name: { contains: search } },
        ],
      },
      orderBy: {
        username: 'asc',
      },
      take: limit,
      skip: offset,
    });
  }
}
