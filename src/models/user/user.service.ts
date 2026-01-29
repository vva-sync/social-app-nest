import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../../generated/prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { AwsService } from '../aws/aws.service';
import { CreateUserDto } from './dto/user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly awsService: AwsService,
    private readonly prismaService: PrismaService,
  ) {}

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findUserByEmail(email);
  }

  async findUserPassword(id: number) {
    return await this.userRepository.findUserPassword(id);
  }

  async findUserById(id: number) {
    return await this.userRepository.findUserById(id);
  }

  async findUserByActivationLink(link: string) {
    return await this.prismaService.userConfirmation.findFirst({
      where: {
        activation_link: link,
      },
      include: {
        user: true,
      },
    });
  }

  async isActivatedUser(userId: number) {
    const userActivationInfo =
      await this.userRepository.isActivatedUser(userId);

    return userActivationInfo.isActivated;
  }

  async createUser(userInfo: Omit<CreateUserDto, 'password'>) {
    return await this.prismaService.user.create({
      data: userInfo,
    });
  }

  async saveUserPassword(userId: number, password: string) {
    return await this.prismaService.userPassword.create({
      data: {
        user_id: userId,
        password,
      },
    });
  }

  async saveUserActivationLink(user: User, activationLink: string) {
    return await this.prismaService.userConfirmation.create({
      data: {
        user_id: user.id,
        activation_link: activationLink,
        is_activated: false,
      },
    });
  }

  async activate(link: string) {
    const { user } = await this.findUserByActivationLink(link);

    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.UNAUTHORIZED);
    }

    await this.prismaService.userConfirmation.update({
      where: {
        user_id: user.id,
      },
      data: {
        is_activated: true,
      },
    });

    return {
      message: 'User activated successfully',
    };
  }

  async uploadImage(userId: number, file: Express.Multer.File) {
    const user = await this.userRepository.findUserById(userId);

    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    const isFileExists = await this.userRepository.findUserPhotoByName(
      file.originalname,
    );

    if (isFileExists) {
      throw new HttpException('File already exists', HttpStatus.CONFLICT);
    }

    const result = await this.awsService.uploadFile(file);

    await this.userRepository.saveUserPhoto(user, result);
  }

  async getUsers(search: string, offset: number, limit: number) {
    return await this.userRepository.getUsers(search, offset, limit);
  }
}
