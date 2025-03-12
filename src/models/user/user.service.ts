import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/user.dto';
import User from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  async findUserByEmail(email: string) {
    return await this.userRepository.findUserByEmail(email);
  }

  async createUser(user: CreateUserDto) {
    return await this.userRepository.createUser(user);
  }
}
