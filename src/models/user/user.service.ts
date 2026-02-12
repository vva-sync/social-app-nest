import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RoleType, User } from '../../generated/prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { AwsService } from '../aws/aws.service';
import { UserRepository } from './repositories/user.repository';
import { IUser } from './repositories/user.repository.interface';
import { UserConfirmationRepository } from './repositories/userConfirmation.repository';
import { UserPasswordRepository } from './repositories/userPassword.repository';
import { UserPhotoRepository } from './repositories/userPhoto.repository';
import { CreateUserDto } from './dto/user.dto';
import { UserRoleRepository } from './repositories/userRole.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly awsService: AwsService,
    private readonly prismaService: PrismaService,
    private readonly userRepository: UserRepository,
    private readonly userPasswordRepository: UserPasswordRepository,
    private readonly userConfirmationRepository: UserConfirmationRepository,
    private readonly userPhotoRepository: UserPhotoRepository,
    private readonly userRoleRepository: UserRoleRepository,
  ) {}

  async findUserByEmail(email: string): Promise<IUser | null> {
    return await this.userRepository.findByEmail(email);
  }

  async findUserPassword(id: number) {
    return await this.userPasswordRepository.findById(id);
  }

  async findUserById(id: number): Promise<IUser | null> {
    return await this.userRepository.findById(id);
  }

  async findUserByActivationLink(link: string) {
    return await this.userConfirmationRepository.findByActivationLink(link);
  }

  async isActivatedUser(userId: number) {
    const userActivationInfo =
      await this.userConfirmationRepository.findByUserId(userId);

    if (!userActivationInfo) {
      return false;
    }

    return userActivationInfo.is_activated;
  }

  async createUser(userInfo: Omit<CreateUserDto, 'password'>) {
    return await this.userRepository.create(userInfo);
  }

  async saveUserPassword(userId: number, password: string) {
    return await this.userPasswordRepository.create({
      user_id: userId,
      password,
    });
  }

  async saveUserActivationLink(user: IUser | User, activationLink: string) {
    return this.userConfirmationRepository.create({
      user_id: user.id,
      activation_link: activationLink,
      is_activated: false,
    });
  }

  async activate(link: string) {
    const { user_id } = await this.findUserByActivationLink(link);

    if (!user_id) {
      throw new HttpException('User does not exist', HttpStatus.UNAUTHORIZED);
    }

    await this.userConfirmationRepository.update(user_id, {
      is_activated: true,
    });

    return {
      message: 'User activated successfully',
    };
  }

  async uploadImage(userId: number, file: Express.Multer.File) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    const isFileExists = await this.userPhotoRepository.findUserPhotoByName(
      file.originalname,
    );

    if (isFileExists) {
      throw new HttpException('File already exists', HttpStatus.CONFLICT);
    }

    const result = await this.awsService.uploadFile(file);

    await this.userPhotoRepository.create({
      url: result.Location,
      isMain: false,
      user_id: user.id,
    });
  }

  async getUsers(search: string, offset: number, limit: number) {
    return await this.userRepository.search(search, offset, limit);
  }

  async assignRole(id: number, role: RoleType) {
    await this.userRoleRepository.create(id, role);
  }
}
