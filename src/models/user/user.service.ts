import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AwsService } from '../aws/aws.service';
import { CreateUserDto } from './dto/user.dto';
import { UserRepository } from './user.repository';
import User from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly awsService: AwsService,
  ) {}

  async findUserByEmail(email: string) {
    return await this.userRepository.findUserByEmail(email);
  }

  async findUserById(id: number) {
    return await this.userRepository.findUserById(id);
  }

  async findUserByActivationLink(link: string) {
    return await this.userRepository.findUserByActivationLink(link);
  }

  async isActivatedUser(userId: number) {
    const userActivationInfo =
      await this.userRepository.isActivatedUser(userId);

    return userActivationInfo.isActivated;
  }

  async createUser(userInfo: CreateUserDto) {
    return await this.userRepository.createUser(userInfo);
  }

  async saveUserActivationLink(user: User, activationLink: string) {
    return await this.userRepository.saveUserActivationLink(
      user,
      activationLink,
    );
  }

  async activate(link: string) {
    const userConfirmationInfo = await this.findUserByActivationLink(link);

    const { user } = userConfirmationInfo;

    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.UNAUTHORIZED);
    }

    await this.userRepository.activate(user.id);

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
