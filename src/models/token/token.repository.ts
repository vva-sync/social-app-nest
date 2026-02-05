import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IDeleteResult } from '../../shared/base-repository.interface';
import { IToken, ITokenBase } from './interfaces/token.interface';
import { ITokenRepository } from './interfaces/token.repository.interface';

@Injectable()
export class TokenRepository implements ITokenRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Partial<IToken>): Promise<ITokenBase> {
    return await this.prismaService.token.create({
      data: {
        token: data.token,
        user_id: data.user.id,
      },
    });
  }

  async findById(id: number): Promise<ITokenBase | null> {
    return await this.prismaService.token.findUnique({
      where: { id },
    });
  }

  async findByToken(token: string): Promise<ITokenBase | null> {
    return await this.prismaService.token.findFirst({
      where: { token },
    });
  }

  async findByUserId(userId: number): Promise<ITokenBase | null> {
    return await this.prismaService.token.findFirst({
      where: { user_id: userId },
    });
  }

  async findAll(offset?: number, limit?: number): Promise<ITokenBase[]> {
    return await this.prismaService.token.findMany({
      skip: offset,
      take: limit,
    });
  }

  async update(id: number, data: Partial<IToken>): Promise<ITokenBase> {
    return await this.prismaService.token.update({
      where: { id },
      data: {
        token: data.token,
      },
    });
  }

  async delete(id: number): Promise<ITokenBase> {
    return await this.prismaService.token.delete({
      where: { id },
    });
  }

  async deleteByToken(token: string): Promise<IDeleteResult> {
    const result = await this.prismaService.token.deleteMany({
      where: { token },
    });

    return {
      affected: result.count,
    };
  }
}
