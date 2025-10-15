import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import { Request } from 'express';
import { DataSource, ILike } from 'typeorm';
import { BaseRepository } from '../../shared/base-repository';
import { CreateUserDto } from './dto/user.dto';
import { UserConfirmation } from './entities/user-confirmation.entity';
import { UserPassword } from './entities/user-passwords.entity';
import { UserPhoto } from './entities/user-photo.entity';
import User from './entities/user.entity';

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

  async findUserPassword(id: number) {
    return await this.getRepository(UserPassword).query(`
      SELECT password
      FROM user_passwords
      WHERE id = ${id};
      `)
  }

  async findUserById(id: number) {
    return await this.getRepository(User).findOneBy({ id });
  }

  async saveUserActivationLink(user: User, activationLink: string) {
    return await this.getRepository(UserConfirmation).save({
      user,
      activationLink,
      isActivated: false,
    });
  }

  async isActivatedUser(userId: number) {
    return await this.getRepository(UserConfirmation).findOne({
      where: { user: { id: userId } },
    });
  }

  async findUserByActivationLink(link: string) {
    return await this.getRepository(UserConfirmation).findOne({
      where: { activationLink: link },
      relations: ['user'],
    });
  }

  async saveUserPhoto(user: User, upload: ManagedUpload.SendData) {
    return await this.getRepository(UserPhoto).save({
      name: upload.Key,
      url: upload.Location,
      isMain: true,
      user,
    });
  }

  async findUserPhotoByName(name: string) {
    return await this.getRepository(UserPhoto).findOneBy({ name });
  }
  async activate(userId: number) {
    return await this.getRepository(UserConfirmation).update(
      {
        user: {
          id: userId,
        },
      },
      {
        isActivated: true,
      },
    );
  }

  async getUsers(search: string, offset: number, limit: number) {
    return await this.getRepository(User).find({
      where: {
        username: ILike(`%${search}%`),
      },
      skip: offset,
      take: limit,
    });
  }
}
