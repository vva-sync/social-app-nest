import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AwsService } from '../aws/aws.service';
import { CreateUserDto } from './dto/user.dto';
import { UserRepository } from './user.repository';

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

  async createUser(user: CreateUserDto) {
    return await this.userRepository.createUser(user);
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
}
