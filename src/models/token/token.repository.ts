import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { DataSource } from 'typeorm';
import Token from './entity/token.entity';
import User from '../user/entities/user.entity';
import { BaseRepository } from '../../shared/base-repository';

@Injectable({ scope: Scope.REQUEST })
export class TokenRepository extends BaseRepository {
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(dataSource, request);
  }

  async saveRefreshToken(token: string, user: User) {
    await this.getRepository(Token).insert({ token, user });
  }

  async deleteRefreshToken(refreshToken: string) {
    return await this.getRepository(Token).delete({ token: refreshToken });
  }

  async findRefreshToken(refreshToken: string) {
    return await this.getRepository(Token).findOne({
      where: { token: refreshToken },
    });
  }
}
