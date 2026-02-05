import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { IBaseRepository } from '../../shared/base-repository.interface';
import { IUserConfirmation } from './userConfirmation.interface';

@Injectable()
export class UserConfirmationRepository
  implements Partial<IBaseRepository<IUserConfirmation>>
{
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: number): Promise<IUserConfirmation> {
    return this.prismaService.userConfirmation.findUnique({
      where: { id },
    });
  }

  async findByUserId(userId: number): Promise<IUserConfirmation | null> {
    return this.prismaService.userConfirmation.findFirst({
      where: { user_id: userId },
    });
  }

  create(data: IUserConfirmation): Promise<IUserConfirmation> {
    return this.prismaService.userConfirmation.create({
      data,
    });
  }

  update(
    id: number,
    data: Partial<IUserConfirmation>,
  ): Promise<IUserConfirmation> {
    return this.prismaService.userConfirmation.update({
      where: { user_id: id },
      data,
    });
  }

  findByActivationLink(link: string): Promise<IUserConfirmation | null> {
    return this.prismaService.userConfirmation.findFirst({
      where: { activation_link: link },
    });
  }
}
