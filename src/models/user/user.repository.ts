import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import { Request } from 'express';
import { DataSource } from 'typeorm';
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

  async createUser(user: Omit<CreateUserDto, 'password'>) {
    return await this.getRepository(User).save(user);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.getRepository(User).findOneBy({ email });
  }

  async saveUserPassword(id: number, password: string) {
    return (await this.getRepository(UserPassword).query(`
        INSERT INTO user_passwords (id, password) VALUES (${id}, '${password}')
      `)) as { id: number }[] | null;
  }

  async findUserPassword(id: number) {
    const passArray = (await this.getRepository(UserPassword).query(`
        SELECT password
        FROM user_passwords
        WHERE id = ${id};
      `)) as { password: string }[] | null;

    if (!passArray) {
      return null;
    }

    return passArray[0].password;
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

  async getUsers(search: string, offset: number, limit: number) {
    return (await this.getRepository(User).query(
      `
      SELECT *
      FROM "user"
      WHERE username LIKE $1
         OR first_name LIKE $1
         OR last_name LIKE $1
      ORDER BY "username" ASC
      LIMIT $2
      OFFSET $3
      `,
      [`%${search}%`, limit, offset],
    )) as User[] | null;
  }
}
