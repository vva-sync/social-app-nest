import { Request } from 'express';
import { BaseRepository } from '../../shared/base-repository';
import { DataSource } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import User from './entities/user.entity';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class UserRepository extends BaseRepository {
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(dataSource, request);
  }

  async createUser(user: CreateUserDto) {
    return await this.getRepository(User).save(user);
  }

  async findUserByEmail(email: string) {
    return await this.getRepository(User).findOneBy({ email });
  }
}
