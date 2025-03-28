import { Request } from 'express';
import { BaseRepository } from '../../shared/base-repository';
import { DataSource } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import User from './entities/user.entity';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { UserPhoto } from './entities/user-photo.entity';
import { ManagedUpload } from 'aws-sdk/clients/s3';

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

  async findUserById(id: number) {
    return await this.getRepository(User).findOneBy({ id });
  }

  async saveUserPhoto(user: User, upload: ManagedUpload.SendData) {
    return await this.getRepository(UserPhoto).save({
      name: upload.Key,
      url: upload.Location,
      isMain: false,
      user,
    });
  }

  async findUserPhotoByName(name: string) {
    return await this.getRepository(UserPhoto).findOneBy({ name });
  }
}
