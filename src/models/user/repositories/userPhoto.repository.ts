import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { IUserPhoto, IUserPhotoRepository } from './userPhoto.interface';

@Injectable()
export class UserPhotoRepository implements Partial<IUserPhotoRepository> {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: IUserPhoto): Promise<IUserPhoto> {
    return await this.prismaService.userPhoto.create({ data });
  }

  async delete(id: number): Promise<void> {
    await this.prismaService.userPhoto.delete({ where: { id } });
  }

  async findByUserId(user_id: number): Promise<IUserPhoto[]> {
    return await this.prismaService.userPhoto.findMany({ where: { user_id } });
  }

  async findUserPhotoByName(name: string): Promise<IUserPhoto | null> {
    return await this.prismaService.userPhoto.findFirst({
      where: { url: name },
    });
  }
}
